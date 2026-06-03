import { type InvoiceAction, actions } from "document-models/invoice";

interface LoadUBLFileProps {
  file: File;
  dispatch: (action: InvoiceAction) => void;
}

interface UBLConverterConfig {
  dispatch: (action: InvoiceAction) => void;
}

export class UBLConverter {
  private dispatch: (action: InvoiceAction) => void;

  constructor(config: UBLConverterConfig) {
    this.dispatch = config.dispatch;
  }

  convertUBLToInvoice(ublXml: string) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(ublXml, "text/xml");

    // Handle parsing errors
    const parserError = xmlDoc.querySelector("parsererror");
    if (parserError) {
      throw new Error(`Invalid XML: ${parserError.textContent}`);
    }

    // Find Invoice element (handling potential namespace)
    const invoice = xmlDoc.querySelector("Invoice, ubl\\:Invoice");
    if (!invoice) {
      throw new Error("Invalid UBL document: No Invoice element found");
    }

    this.processGeneralData(invoice);
    this.processParties(invoice);
    this.processLineItems(invoice);
  }

  getElementText(
    node: Element,
    selector: string,
    schemeID?: string,
  ): string | null {
    const elements = node.querySelectorAll(selector);
    for (const el of elements) {
      if (!schemeID || el.getAttribute("schemeID") === schemeID) {
        return el.textContent?.trim() ?? null;
      }
    }
    return null;
  }

  private processGeneralData(invoice: Element) {
    // Process basic invoice data
    this.dispatch(
      actions.editInvoice({
        invoiceNo: this.getElementText(invoice, "ID, cbc\\:ID"),
        dateIssued: this.getElementText(invoice, "IssueDate, cbc\\:IssueDate"),
        dateDue: this.getElementText(
          invoice,
          "PaymentDueDate, cbc\\:PaymentDueDate",
        ),
        currency:
          this.getElementText(invoice, "CurrencyCode, cbc\\:CurrencyCode") ||
          this.getElementText(
            invoice,
            "DocumentCurrencyCode, cbc\\:DocumentCurrencyCode",
          ),
      }),
    );
  }

  private processParties(invoice: Element) {
    // Process issuer (AccountingSupplierParty)
    const supplier = invoice.querySelector(
      "AccountingSupplierParty Party, cac\\:AccountingSupplierParty cac\\:Party",
    );
    if (supplier) {
      this.dispatch(
        actions.editIssuer({
          id:
            this.getElementText(
              supplier,
              "PartyIdentification ID, cac\\:PartyIdentification cbc\\:ID",
            ) ||
            this.getElementText(
              supplier,
              "CompanyID, cac\\:CompanyID cbc\\:ID",
            ),
          name: this.getElementText(
            supplier,
            "PartyName Name, cac\\:PartyName cbc\\:Name",
          ),
          streetAddress: this.getElementText(
            supplier,
            "PostalAddress StreetName, cac\\:PostalAddress cbc\\:StreetName",
          ),
          city: this.getElementText(
            supplier,
            "PostalAddress CityName, cac\\:PostalAddress cbc\\:CityName",
          ),
          postalCode: this.getElementText(
            supplier,
            "PostalAddress PostalZone, cac\\:PostalAddress cbc\\:PostalZone",
          ),
          country: this.getElementText(
            supplier,
            "PostalAddress Country IdentificationCode, cac\\:PostalAddress cac\\:Country cbc\\:IdentificationCode",
          ),
          stateProvince: this.getElementText(
            supplier,
            "PostalAddress CountrySubentity, cac\\:PostalAddress cbc\\:CountrySubentity",
          ),
          tel: this.getElementText(
            supplier,
            "Contact Telephone, cac\\:Contact cbc\\:Telephone",
          ),
          email: this.getElementText(
            supplier,
            "Contact ElectronicMail, cac\\:Contact cbc\\:ElectronicMail",
          ),
        }),
      );

      const paymentMeans = invoice.querySelector(
        "PaymentMeans, cac\\:PaymentMeans",
      );

      if (paymentMeans) {
        const financialAccount = paymentMeans.querySelector(
          "PayeeFinancialAccount, cac\\:PayeeFinancialAccount",
        );

        if (financialAccount) {
          const walletAddress = this.getElementText(
            financialAccount,
            "cbc\\:ID, ID",
            "walletAddress",
          );
          if (walletAddress) {
            this.dispatch(
              actions.editIssuerWallet({
                address: walletAddress,
                chainName: this.getElementText(
                  financialAccount,
                  "cbc\\:ID, ID",
                  "chainName",
                ),
                chainId: this.getElementText(
                  financialAccount,
                  "cbc\\:ID, ID",
                  "chainId",
                ),
              }),
            );
          } else {
            this.dispatch(
              actions.editIssuerBank({
                accountNum:
                  this.getElementText(
                    financialAccount,
                    "cbc\\:ID, ID",
                    "IBAN",
                  ) ?? this.getElementText(financialAccount, "cbc\\:ID, ID"),
                BIC: this.getElementText(
                  financialAccount,
                  "cbc\\:ID, ID",
                  "BIC",
                ),
                SWIFT: this.getElementText(
                  financialAccount,
                  "cbc\\:ID, ID",
                  "SWIFT",
                ),
                ABA: this.getElementText(
                  financialAccount,
                  "cbc\\:ID, ID",
                  "ABA",
                ),
                name: this.getElementText(
                  financialAccount,
                  "FinancialInstitutionBranch FinancialInstitution Name, " +
                    "cac\\:FinancialInstitutionBranch cac\\:FinancialInstitution cbc\\:Name",
                ),
                streetAddress: this.getElementText(
                  financialAccount,
                  "cbc\\:StreetName, StreetName",
                  "streetAddress",
                ),
                extendedAddress: this.getElementText(
                  financialAccount,
                  "cbc\\:AdditionalStreetName, AdditionalStreetName",
                  "extendedAddress",
                ),
                city: this.getElementText(
                  financialAccount,
                  "cbc\\:CityName, CityName",
                  "city",
                ),
                stateProvince: this.getElementText(
                  financialAccount,
                  "cbc\\:CountrySubentity, CountrySubentity",
                  "stateProvince",
                ),
                postalCode: this.getElementText(
                  financialAccount,
                  "cbc\\:PostalZone, PostalZone",
                  "postalCode",
                ),
                country: this.getElementText(
                  financialAccount,
                  "cbc\\:IdentificationCode, IdentificationCode",
                  "country",
                ),
              }),
            );
          }
        }
      }
    }

    // Process payer (AccountingCustomerParty)
    const customer = invoice.querySelector(
      "AccountingCustomerParty Party, cac\\:AccountingCustomerParty cac\\:Party",
    );
    if (customer) {
      this.dispatch(
        actions.editPayer({
          id:
            this.getElementText(
              customer,
              "PartyIdentification ID, cac\\:PartyIdentification cbc\\:ID",
            ) ||
            this.getElementText(
              customer,
              "CompanyID, cac\\:CompanyID cbc\\:ID",
            ),
          name: this.getElementText(
            customer,
            "PartyName Name, cac\\:PartyName cbc\\:Name",
          ),
          streetAddress: this.getElementText(
            customer,
            "PostalAddress StreetName, cac\\:PostalAddress cbc\\:StreetName",
          ),
          city: this.getElementText(
            customer,
            "PostalAddress CityName, cac\\:PostalAddress cbc\\:CityName",
          ),
          postalCode: this.getElementText(
            customer,
            "PostalAddress PostalZone, cac\\:PostalAddress cbc\\:PostalZone",
          ),
          country: this.getElementText(
            customer,
            "PostalAddress Country IdentificationCode, cac\\:PostalAddress cac\\:Country cbc\\:IdentificationCode",
          ),
          stateProvince: this.getElementText(
            customer,
            "PostalAddress CountrySubentity, cac\\:PostalAddress cbc\\:CountrySubentity",
          ),
          tel: this.getElementText(
            customer,
            "Contact Telephone, cac\\:Contact cbc\\:Telephone",
          ),
          email: this.getElementText(
            customer,
            "Contact ElectronicMail, cac\\:Contact cbc\\:ElectronicMail",
          ),
        }),
      );

      // Process payer bank details
      const financialAccount = customer.querySelector(
        "FinancialAccount, cac\\:FinancialAccount",
      );
      if (financialAccount) {
        this.dispatch(
          actions.editPayerBank({
            name: this.getElementText(
              financialAccount,
              "FinancialInstitutionBranch FinancialInstitution Name, cac\\:FinancialInstitutionBranch cac\\:FinancialInstitution cbc\\:Name",
            ),
            accountNum: this.getElementText(financialAccount, "ID, cbc\\:ID"),
            SWIFT: this.getElementText(
              financialAccount,
              "FinancialInstitutionBranch FinancialInstitution ID, cac\\:FinancialInstitutionBranch cac\\:FinancialInstitution cbc\\:ID",
            ),
          }),
        );
      }
    }
  }

  private processLineItems(invoice: Element) {
    const invoiceLines = invoice.querySelectorAll(
      "InvoiceLine, cac\\:InvoiceLine",
    );

    invoiceLines.forEach((line) => {
      const taxPercent =
        parseFloat(
          this.getElementText(line, "cbc\\:Percent, Percent") ?? "0",
        ) || 0;

      const quantity =
        parseFloat(
          this.getElementText(
            line,
            "cbc\\:InvoicedQuantity, InvoicedQuantity",
          ) ?? "0",
        ) || 0;

      const unitPriceExcl =
        parseFloat(
          this.getElementText(line, "cbc\\:PriceAmount, PriceAmount") ?? "0",
        ) || 0;

      const unitPriceIncl = unitPriceExcl * (1 + taxPercent / 100);

      this.dispatch(
        actions.addLineItem({
          id: this.getElementText(line, "cbc\\:ID, ID") ?? "",

          description:
            this.getElementText(line, "cbc\\:Description, Description") ||
            this.getElementText(line, "cbc\\:Name, Name") ||
            "No description",

          taxPercent,
          quantity,

          currency:
            line
              .querySelector("cbc\\:PriceAmount, PriceAmount")
              ?.getAttribute("currencyID") ||
            line
              .querySelector("cbc\\:LineExtensionAmount, LineExtensionAmount")
              ?.getAttribute("currencyID") ||
            this.getElementText(invoice, "CurrencyCode, cbc\\:CurrencyCode") ||
            this.getElementText(
              invoice,
              "DocumentCurrencyCode, cbc\\:DocumentCurrencyCode",
            ) ||
            "USD",

          unitPriceTaxExcl: unitPriceExcl,
          unitPriceTaxIncl: unitPriceIncl,
          totalPriceTaxExcl: quantity * unitPriceExcl,
          totalPriceTaxIncl: quantity * unitPriceIncl,
        }),
      );
    });
  }
}

export async function loadUBLFile({
  file,
  dispatch,
}: LoadUBLFileProps): Promise<void> {
  try {
    if (!/text\/xml|application\/xml/.exec(file.type)) {
      throw new Error("Please select a valid XML file");
    }

    const fileContent = await file.text();

    const converter = new UBLConverter({
      dispatch,
    });

    return converter.convertUBLToInvoice(fileContent);
  } catch (error) {
    console.error("Error loading UBL file:", error);
    throw error;
  }
}
