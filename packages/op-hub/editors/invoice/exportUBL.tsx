import type { InvoiceState, LegalEntity, Maybe } from "document-models/invoice";

interface ExportUBLOptions {
  invoice: InvoiceState;
  filename?: string;
  pdfBlob?: Blob;
}

// Helper function to format numbers with appropriate decimal places
function formatNumber(value: number): string {
  // Check if the value has decimal places
  const hasDecimals = value % 1 !== 0;

  // If no decimals or only trailing zeros after 2 decimal places, show 2 decimal places
  if (!hasDecimals || value.toFixed(5).endsWith("000")) {
    return value.toFixed(2);
  }

  // Otherwise, show actual decimal places up to 5
  const stringValue = value.toString();
  const decimalPart = stringValue.split(".")[1] || "";

  // Determine how many decimal places to show (up to 5)
  const decimalPlaces = Math.min(Math.max(2, decimalPart.length), 5);
  return value.toFixed(decimalPlaces);
}

export class UBLExporter {
  private invoice: InvoiceState;
  private pdfBlob?: Blob;

  constructor(invoice: InvoiceState, pdfBlob?: Blob) {
    this.invoice = invoice;
    this.pdfBlob = pdfBlob;
  }

  /**
   * Convert the invoice state to UBL XML format
   * @returns UBL XML string
   */
  async convertInvoiceToUBL(): Promise<string> {
    const issueDate = this.formatDate(this.invoice.dateIssued ?? null);
    const dueDate = this.formatDate(this.invoice.dateDue ?? null);

    // Generate PDF attachment section first
    const pdfAttachmentSection = await this.generatePDFAttachment();

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<Invoice xmlns:cbc="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2" 
         xmlns:cac="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2" 
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
         xsi:schemaLocation="urn:oasis:names:specification:ubl:schema:xsd:Invoice-2 UBL-Invoice-2.1.xsd" 
         xmlns="urn:oasis:names:specification:ubl:schema:xsd:Invoice-2">
  <cbc:UBLVersionID>2.1</cbc:UBLVersionID>
  <cbc:ID>${this.escapeXml(this.invoice.invoiceNo || "")}</cbc:ID>
  <cbc:IssueDate>${issueDate}</cbc:IssueDate>
  ${dueDate ? `<cbc:DueDate>${dueDate}</cbc:DueDate>` : ""}
  <cbc:InvoiceTypeCode listID="UNCL1001" listAgencyID="6">380</cbc:InvoiceTypeCode>
  <cbc:DocumentCurrencyCode listID="ISO4217" listAgencyID="6">${this.escapeXml(this.invoice.currency || "")}</cbc:DocumentCurrencyCode>
  ${this.invoice.payer?.name ? `<cbc:BuyerReference>${this.escapeXml(this.invoice.payer.name)}</cbc:BuyerReference>` : ""}
  ${pdfAttachmentSection}
  ${this.generateSupplierParty(this.invoice.issuer)}
  ${this.generateCustomerParty(this.invoice.payer)}
  ${this.generatePaymentMeans()}
  ${this.generatePaymentTerms()}
  ${this.generateTaxSummary()}
  ${this.generateLegalMonetaryTotal()}
  ${this.generateInvoiceLines()}
</Invoice>`;

    return xml;
  }

  /**
   * Export the invoice to a UBL file
   * @param options Export options
   * @returns Promise resolving to the generated file
   */
  async exportToFile({
    filename = "invoice.xml",
  }: { filename?: string } = {}): Promise<File> {
    const ublXml = await this.convertInvoiceToUBL();
    const blob = new Blob([ublXml], { type: "application/xml" });
    return new File([blob], filename, { type: "application/xml" });
  }

  /**
   * Trigger download of the UBL file in the browser
   */
  async downloadUBL(filename = "invoice.xml"): Promise<void> {
    const ublXml = await this.convertInvoiceToUBL();
    const blob = new Blob([ublXml], { type: "application/xml" });

    // Create download link and trigger click
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  /**
   * Format date as YYYY-MM-DD for UBL format
   */
  private formatDate(dateString: string | null): string {
    if (!dateString) return "";

    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "";

      return date.toISOString().split("T")[0];
    } catch (e) {
      return "";
    }
  }

  /**
   * Escape special XML characters
   */
  private escapeXml(str: string): string {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");
  }

  /**
   * Generate the AccountingSupplierParty section
   */
  private generateSupplierParty(issuer: LegalEntity | null): string {
    if (!issuer) return "";

    const taxId = issuer.id?.taxId;
    const corpRegId = issuer.id?.corpRegId;
    const companyId = taxId || corpRegId;

    return `<cac:AccountingSupplierParty>
  <cac:Party>
    ${companyId ? `<cbc:EndpointID schemeID="0106">${this.escapeXml(companyId)}</cbc:EndpointID>` : ""}
    ${
      issuer.name
        ? `<cac:PartyName>
      <cbc:Name>${this.escapeXml(issuer.name)}</cbc:Name>
    </cac:PartyName>`
        : ""
    }
    <cac:PostalAddress>
      ${issuer.address?.streetAddress ? `<cbc:StreetName>${this.escapeXml(issuer.address?.streetAddress)}</cbc:StreetName>` : ""}
      ${issuer.address?.city ? `<cbc:CityName>${this.escapeXml(issuer.address?.city)}</cbc:CityName>` : ""}
      ${issuer.address?.postalCode ? `<cbc:PostalZone>${this.escapeXml(issuer.address?.postalCode)}</cbc:PostalZone>` : ""}
      ${
        issuer.country
          ? `<cac:Country>
        <cbc:IdentificationCode listID="ISO3166-1:Alpha2" listAgencyID="6">${this.escapeXml(issuer.country)}</cbc:IdentificationCode>
      </cac:Country>`
          : ""
      }
    </cac:PostalAddress>
    ${
      taxId && issuer.country
        ? `<cac:PartyTaxScheme>
      <cbc:CompanyID schemeID="${issuer.country}:VAT">${this.escapeXml(taxId)}</cbc:CompanyID>
      <cac:TaxScheme>
        <cbc:ID schemeID="UN/ECE 5153">VAT</cbc:ID>
      </cac:TaxScheme>
    </cac:PartyTaxScheme>`
        : ""
    }
    <cac:PartyLegalEntity>
      <cbc:RegistrationName>${this.escapeXml(issuer.name || "")}</cbc:RegistrationName>
      ${companyId ? `<cbc:CompanyID schemeID="0106">${this.escapeXml(companyId)}</cbc:CompanyID>` : ""}
    </cac:PartyLegalEntity>
    ${
      issuer.contactInfo?.email
        ? `<cac:Contact>
      <cbc:ElectronicMail>${this.escapeXml(issuer.contactInfo.email)}</cbc:ElectronicMail>
    </cac:Contact>`
        : ""
    }
  </cac:Party>
</cac:AccountingSupplierParty>`;
  }

  /**
   * Generate the AccountingCustomerParty section
   */
  private generateCustomerParty(payer: LegalEntity | null): string {
    if (!payer) return "";

    return `<cac:AccountingCustomerParty>
  <cac:Party>
    ${
      payer.name
        ? `<cac:PartyName>
      <cbc:Name>${this.escapeXml(payer.name)}</cbc:Name>
    </cac:PartyName>`
        : ""
    }
    <cac:PostalAddress>
      ${payer.address?.streetAddress ? `<cbc:StreetName>${this.escapeXml(payer.address?.streetAddress)}</cbc:StreetName>` : ""}
      ${payer.address?.city ? `<cbc:CityName>${this.escapeXml(payer.address?.city)}</cbc:CityName>` : ""}
      ${payer.address?.postalCode ? `<cbc:PostalZone>${this.escapeXml(payer.address?.postalCode)}</cbc:PostalZone>` : ""}
      ${
        payer.country
          ? `<cac:Country>
        <cbc:IdentificationCode listID="ISO3166-1:Alpha2" listAgencyID="6">${this.escapeXml(payer.country)}</cbc:IdentificationCode>
      </cac:Country>`
          : ""
      }
    </cac:PostalAddress>
    <cac:PartyLegalEntity>
      <cbc:RegistrationName>${this.escapeXml(payer.name || "")}</cbc:RegistrationName>
    </cac:PartyLegalEntity>
    ${
      payer.contactInfo?.email
        ? `<cac:Contact>
    </cac:Contact>`
        : ""
    }
  </cac:Party>
</cac:AccountingCustomerParty>`;
  }

  /**
   * Generate payment terms section
   */
  private generatePaymentTerms(): string {
    const dueDate = this.formatDate(this.invoice.dateDue ?? null);
    const amount = this.invoice.lineItems.reduce(
      (sum, item) => sum + item.totalPriceTaxIncl,
      0,
    );
    const currency = this.invoice.currency;
    const paymentRef = `RF47${this.invoice.invoiceNo?.replace(/[^a-zA-Z0-9]/g, "")}`;

    if (!dueDate || !currency) return "";

    const note = `We kindly request you to pay the above amount of ${currency}${amount} before ${dueDate} to our bank account with the description ${paymentRef}. For questions you can contact us by email.`;

    return `<cac:PaymentTerms>
      <cbc:Note>${this.escapeXml(note)}</cbc:Note>
    </cac:PaymentTerms>`;
  }

  /**
   * Generate the PaymentMeans section with bank details
   */
  private generatePaymentMeans(): string {
    const bank = this.invoice.issuer?.paymentRouting?.bank;
    if (!bank?.accountNum) return "";

    const dueDate = this.formatDate(this.invoice.dateDue ?? null);
    // Generate a payment reference based on invoice number
    const paymentRef = `RF47${this.invoice.invoiceNo?.replace(/[^a-zA-Z0-9]/g, "")}`;

    return `<cac:PaymentMeans>
      <cbc:PaymentMeansCode listID="UNCL4461" listAgencyID="6">30</cbc:PaymentMeansCode>
      ${dueDate ? `<cbc:PaymentDueDate>${dueDate}</cbc:PaymentDueDate>` : ""}
      ${paymentRef ? `<cbc:PaymentID>${this.escapeXml(paymentRef)}</cbc:PaymentID>` : ""}
      <cac:PayeeFinancialAccount>
        <cbc:ID schemeID="IBAN">${this.escapeXml(bank.accountNum)}</cbc:ID>
        ${
          bank.BIC || bank.SWIFT
            ? `<cac:FinancialInstitutionBranch>
          <cac:FinancialInstitution>
            <cbc:ID schemeID="BIC">${this.escapeXml(bank.BIC || bank.SWIFT || "")}</cbc:ID>
          </cac:FinancialInstitution>
        </cac:FinancialInstitutionBranch>`
            : ""
        }
      </cac:PayeeFinancialAccount>
    </cac:PaymentMeans>`;
  }

  /**
   * Generate tax summary section
   */
  private generateTaxSummary(): string {
    if (!this.invoice.currency) return "";
    const currency = this.invoice.currency;
    const taxGroups = new Map<number, number>();

    // Group tax amounts by tax rate
    for (const item of this.invoice.lineItems) {
      const taxRate = item.taxPercent;
      const taxAmount = item.totalPriceTaxIncl - item.totalPriceTaxExcl;

      if (taxGroups.has(taxRate)) {
        taxGroups.set(taxRate, (taxGroups.get(taxRate) || 0) + taxAmount);
      } else {
        taxGroups.set(taxRate, taxAmount);
      }
    }

    if (taxGroups.size === 0) return "";

    const taxTotalAmount = Array.from(taxGroups.values()).reduce(
      (sum, amount) => sum + amount,
      0,
    );

    // Add tax totals
    let xml = `<cac:TaxTotal>
<cbc:TaxAmount currencyID="${this.escapeXml(currency)}">${formatNumber(taxTotalAmount)}</cbc:TaxAmount>`;

    // Add tax subtotals for each tax rate
    const taxSubtotals: Record<
      string,
      { taxableAmount: number; taxAmount: number }
    > = {};

    for (const item of this.invoice.lineItems) {
      const taxRate = item.taxPercent.toString();
      const taxableAmount = item.totalPriceTaxExcl;
      const taxAmount = item.totalPriceTaxIncl - item.totalPriceTaxExcl;

      if (taxSubtotals[taxRate]) {
        taxSubtotals[taxRate].taxableAmount += taxableAmount;
        taxSubtotals[taxRate].taxAmount += taxAmount;
      } else {
        taxSubtotals[taxRate] = { taxableAmount, taxAmount };
      }
    }

    // Add tax subtotals for each tax rate
    for (const [taxRate, { taxableAmount, taxAmount }] of Object.entries(
      taxSubtotals,
    )) {
      xml += `
<cac:TaxSubtotal>
<cbc:TaxableAmount currencyID="${this.escapeXml(currency)}">${formatNumber(taxableAmount)}</cbc:TaxableAmount>
<cbc:TaxAmount currencyID="${this.escapeXml(currency)}">${formatNumber(taxAmount)}</cbc:TaxAmount>
<cac:TaxCategory>
<cbc:ID schemeID="UNCL5305">S</cbc:ID>
<cbc:Percent>${taxRate}</cbc:Percent>
<cac:TaxScheme>
<cbc:ID schemeID="UN/ECE 5153">VAT</cbc:ID>
</cac:TaxScheme>
</cac:TaxCategory>
</cac:TaxSubtotal>`;
    }

    xml += `
</cac:TaxTotal>`;

    return xml;
  }

  /**
   * Generate the LegalMonetaryTotal section
   */
  private generateLegalMonetaryTotal(): string {
    if (!this.invoice.currency) return "";
    const currency = this.invoice.currency;

    // Calculate totals
    const lineExtensionAmount = this.invoice.lineItems.reduce(
      (sum, item) => sum + item.totalPriceTaxExcl,
      0,
    );

    const taxExclusiveAmount = lineExtensionAmount;
    const taxInclusiveAmount = this.invoice.lineItems.reduce(
      (sum, item) => sum + item.totalPriceTaxIncl,
      0,
    );
    const allowanceTotalAmount = 0; // Add if we implement allowances
    const payableAmount = taxInclusiveAmount;

    return `<cac:LegalMonetaryTotal>
  <cbc:LineExtensionAmount currencyID="${this.escapeXml(currency)}">${formatNumber(lineExtensionAmount)}</cbc:LineExtensionAmount>
  <cbc:TaxExclusiveAmount currencyID="${this.escapeXml(currency)}">${formatNumber(taxExclusiveAmount)}</cbc:TaxExclusiveAmount>
  <cbc:TaxInclusiveAmount currencyID="${this.escapeXml(currency)}">${formatNumber(taxInclusiveAmount)}</cbc:TaxInclusiveAmount>
  <cbc:AllowanceTotalAmount currencyID="${this.escapeXml(currency)}">${formatNumber(allowanceTotalAmount)}</cbc:AllowanceTotalAmount>
  <cbc:PayableAmount currencyID="${this.escapeXml(currency)}">${formatNumber(payableAmount)}</cbc:PayableAmount>
</cac:LegalMonetaryTotal>`;
  }

  /**
   * Generate InvoiceLine sections for each line item
   */
  private generateInvoiceLines(): string {
    if (!this.invoice.lineItems.length || !this.invoice.currency) return "";
    const currency = this.invoice.currency;

    return this.invoice.lineItems
      .map((item, index) => {
        const lineId = item.id || (index + 1).toString();

        return `<cac:InvoiceLine>
  <cbc:ID>${this.escapeXml(lineId)}</cbc:ID>
  <cbc:InvoicedQuantity unitCode="ZZ" unitCodeListID="UNECERec20">${formatNumber(item.quantity)}</cbc:InvoicedQuantity>
  <cbc:LineExtensionAmount currencyID="${currency}">${formatNumber(item.totalPriceTaxExcl)}</cbc:LineExtensionAmount>
  <cac:Item>
    <cbc:Description>${this.escapeXml(item.description || "")}</cbc:Description>
    <cbc:Name>${this.escapeXml(item.description || "")}</cbc:Name>
    <cac:ClassifiedTaxCategory>
      <cbc:ID schemeID="UNCL5305">S</cbc:ID>
      <cbc:Percent>${item.taxPercent || 0}</cbc:Percent>
      <cac:TaxScheme>
        <cbc:ID schemeID="UN/ECE 5153">VAT</cbc:ID>
      </cac:TaxScheme>
    </cac:ClassifiedTaxCategory>
  </cac:Item>
  <cac:Price>
    <cbc:PriceAmount currencyID="${currency}">${formatNumber(item.unitPriceTaxExcl)}</cbc:PriceAmount>
  </cac:Price>
</cac:InvoiceLine>`;
      })
      .join("\n");
  }

  /**
   * Generate PDF attachment section if a PDF blob is available
   */
  private async generatePDFAttachment(): Promise<string> {
    if (!this.pdfBlob) return "";

    try {
      // Convert PDF blob to base64
      const base64Data = await this.blobToBase64(this.pdfBlob);
      const filename = `${this.invoice.invoiceNo || "invoice"}.pdf`;

      return `<cac:AdditionalDocumentReference>
  <cbc:ID>${filename}</cbc:ID>
  <cbc:DocumentType>PrimaryImage</cbc:DocumentType>
  <cac:Attachment>
    <cbc:EmbeddedDocumentBinaryObject mimeCode="application/pdf" filename="${filename}">
      ${base64Data}
    </cbc:EmbeddedDocumentBinaryObject>
  </cac:Attachment>
</cac:AdditionalDocumentReference>`;
    } catch (error) {
      console.error("Error embedding PDF in UBL:", error);
      return "";
    }
  }

  /**
   * Convert a Blob to base64 string
   */
  private blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result as string;
        // Remove data URL prefix if present
        const base64Content = base64data.split(",")[1] || base64data;
        resolve(base64Content);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }
}

/**
 * Export an invoice to UBL format
 * @param options Export options
 * @returns Promise resolving to the generated file
 */
export async function exportToUBL({
  invoice,
  filename = "invoice.xml",
  pdfBlob,
}: ExportUBLOptions): Promise<File> {
  const exporter = new UBLExporter(invoice, pdfBlob);
  return exporter.exportToFile({ filename });
}

/**
 * Export and download an invoice as UBL
 * @param options Export options
 */
export async function downloadUBL({
  invoice,
  filename = "invoice.xml",
  pdfBlob,
}: ExportUBLOptions): Promise<void> {
  const exporter = new UBLExporter(invoice, pdfBlob);
  return exporter.downloadUBL(filename);
}
