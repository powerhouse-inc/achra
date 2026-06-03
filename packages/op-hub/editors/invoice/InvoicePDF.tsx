import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import type {
  InvoiceState,
  InvoiceLineItem as InvoiceLineItemType,
  Maybe,
  PaymentRouting,
} from "document-models/invoice";
import countries from "world-countries";

type Country = {
  name: {
    common: string;
    official: string;
    native?: Record<string, { common: string; official: string }>;
  };
  cca2: string;
};
const countriesArray = countries as unknown as Country[];

function getCountryName(countryCode: string) {
  const country = countriesArray.find((c) => c.cca2 === countryCode);
  return country?.name.common;
}

// Create styles
const styles = StyleSheet.create({
  defaultText: {
    fontFamily: "Helvetica", // Built-in font as fallback
  },
  pageBackground: {
    backgroundColor: "#f8fafc",
  },
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 15,
    margin: 15,
    height: "92%",
    borderRadius: 15,
    borderColor: "#fcfbfb",
    borderWidth: 0.5,
  },
  header: {
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 12,
    fontWeight: "bold",
    fontFamily: "Helvetica",
  },
  invoiceNumber: {
    fontSize: 11,
    marginLeft: 0,
  },
  section: {
    margin: 10,
    padding: 10,
  },
  sectionTitle: {
    marginBottom: 5,
    fontSize: 12,
    marginRight: 4,
    fontFamily: "Helvetica",
    color: "#9ea0a2",
    fontWeight: "normal",
  },
  row: {
    flexDirection: "row",
    marginBottom: 0,
  },
  label: {
    width: 70,
    color: "#4B5563", // text-gray-600
    fontSize: 10,
  },
  value: {
    flex: 1,
    fontSize: 10,
  },
  gridContainer: {
    flexDirection: "row",
    marginHorizontal: 5,
    marginTop: 20,
  },
  gridColumn: {
    flex: 2,
  },
  table: {
    marginTop: 20,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    fontSize: 10,
    textTransform: "uppercase",
    color: "#9ea0a2",
    fontWeight: "normal",
    letterSpacing: 1,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 0,
    paddingVertical: 8,
    fontSize: 10,
    alignItems: "flex-start",
  },
  itemName: {
    fontWeight: "bold",
    fontSize: 10,
    color: "#374151",
    marginBottom: 2,
  },
  itemDescription: {
    fontSize: 10,
    color: "#6B7280",
    fontWeight: "normal",
  },
  tableCol40: {
    width: "30%",
    paddingRight: 8,
  },
  tableCol15: {
    width: "15%",
    textAlign: "right",
  },
  tableCol12: {
    width: "15%",
    textAlign: "right",
  },
  tableCol18: {
    width: "20%",
    textAlign: "right",
  },
  totals: {
    marginTop: 20,
    marginRight: 0,
    alignItems: "flex-end",
    width: "100%",
  },
  totalRow: {
    flexDirection: "row",
    marginBottom: 8,
    justifyContent: "flex-end",
    width: "100%",
  },
  totalLabel: {
    marginRight: 8,
    color: "#6B7280",
    fontSize: 10,
    fontWeight: "normal",
    width: 120,
    textAlign: "right",
  },
  totalValue: {
    width: 160,
    textAlign: "right",
    fontSize: 10,
    fontWeight: "normal",
    color: "#374151",
  },
  totalRowBold: {
    flexDirection: "row",
    justifyContent: "flex-end",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    paddingTop: 8,
    marginTop: 8,
    width: "100%",
  },
  totalLabelBold: {
    marginRight: 8,
    color: "#000",
    fontSize: 10,
    fontWeight: "bold",
    width: 120,
    textAlign: "right",
  },
  totalValueBold: {
    width: 160,
    textAlign: "right",
    fontSize: 10,
    fontWeight: "bold",
    color: "#000",
  },
  status: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#1F2937",
    marginLeft: 4,
  },
  totalAmount: {
    fontSize: 20,
    paddingTop: 7,
    fontWeight: "bold",
    color: "#black",
  },
  paymentSection: {
    marginTop: 10,
    marginBottom: 10,
  },
  paymentTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#1F2937",
  },
  paymentRow: {
    flexDirection: "row",
    marginBottom: 4,
  },
  logo: {
    width: 170,
    marginTop: -15,
    marginLeft: -15,
  },
  invoiceLabel: {
    fontSize: 11,
    marginRight: 2,
    marginBottom: 4,
    fontFamily: "Helvetica",
    color: "#9ea0a2",
    fontWeight: "normal",
  },
  companyInfo: {
    fontSize: 9,
    color: "#4B5563",
    marginBottom: 4,
    flexShrink: 1,
    flexGrow: 1,
    minWidth: 0,
    paddingRight: 1,
    wordBreak: "break-all",
  },
  companyInfoLabel: {
    color: "#9ea0a2",
    fontSize: 9,
    marginRight: 5,
    minWidth: 50,
  },
  companyName: {
    fontSize: 9,
    fontWeight: "bold",
    marginBottom: 4,
  },
  termsTitle: {
    fontSize: 10,
    color: "#6B7280",
    fontWeight: "bold",
    marginTop: 0,
    marginBottom: 4,
    fontFamily: "Helvetica",
  },
  termsText: {
    fontSize: 10,
    color: "#374151",
    fontWeight: "normal",
    fontFamily: "Helvetica",
  },
});

// Format date to readable string
const formatDate = (dateString: Maybe<string>) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = date
    .toLocaleString("default", { month: "short" })
    .toUpperCase();
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

// Format currency
const formatCurrency = (amount: number, currency: string) => {
  // Format number with appropriate decimal places
  const formattedAmount = formatNumber(amount);
  // Use non-breaking space to keep currency inline with value
  return `${formattedAmount}\u00A0${currency}`;
};

// Helper function to format numbers with appropriate decimal places
function formatNumber(value: number): string {
  // Check if the value has decimal places
  const hasDecimals = value % 1 !== 0;

  // If no decimals or only trailing zeros after 2 decimal places, show 2 decimal places
  if (!hasDecimals || value.toFixed(5).endsWith("000")) {
    return Number(value.toFixed(2)).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  // Otherwise, show actual decimal places up to 5
  const stringValue = value.toString();
  const decimalPart = stringValue.split(".")[1] || "";

  // Determine how many decimal places to show (up to 5)
  const decimalPlaces = Math.min(Math.max(2, decimalPart.length), 5);
  return Number(value).toLocaleString("en-US", {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  });
}

interface InvoicePDFProps {
  invoice: InvoiceState;
  fiatMode: boolean;
}

export const InvoicePDF: React.FC<InvoicePDFProps> = ({
  invoice,
  fiatMode,
}) => {
  const MAX_ITEMS_FIRST_PAGE = 15;
  const MAX_ITEMS_OTHER_PAGES = 20;

  // Helper to chunk line items with different first page size
  function chunkLineItems(
    lineItems: InvoiceLineItemType[],
    firstPageSize: number,
    otherPageSize: number,
  ) {
    if (lineItems.length <= firstPageSize) return [lineItems];
    const chunks = [lineItems.slice(0, firstPageSize)];
    let i = firstPageSize;
    while (i < lineItems.length) {
      chunks.push(lineItems.slice(i, i + otherPageSize));
      i += otherPageSize;
    }
    return chunks;
  }

  const lineItemChunks = chunkLineItems(
    invoice.lineItems,
    MAX_ITEMS_FIRST_PAGE,
    MAX_ITEMS_OTHER_PAGES,
  );
  const totalPages = lineItemChunks.length;

  return (
    <Document>
      {lineItemChunks.map((items, pageIndex) => (
        <Page key={pageIndex} size="A4" style={styles.pageBackground}>
          <View style={styles.page}>
            {/* Only show header and info on first page */}
            {pageIndex === 0 && (
              <>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "column",
                      alignItems: "flex-start",
                      marginRight: 0,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        marginBottom: 20,
                        paddingRight: 100,
                        marginRight: 0,
                      }}
                      hyphenationCallback={(word) => [word]}
                    >
                      {invoice.issuer.name}
                    </Text>

                    <View
                      style={{
                        flexDirection: "row",
                        gap: 10,
                        alignItems: "flex-start",
                        width: "100%",
                        flexWrap: "nowrap",
                      }}
                    >
                      <View style={{ width: "30%" }}>
                        <Text style={styles.invoiceLabel}>Invoice number</Text>
                        <Text style={[styles.invoiceNumber]} wrap>
                          {invoice.invoiceNo}
                        </Text>
                      </View>
                      <View style={{ width: "15%" }}>
                        <Text style={styles.invoiceLabel}>Invoice date</Text>
                        <Text style={styles.invoiceNumber}>
                          {formatDate(invoice.dateIssued)}
                        </Text>
                      </View>
                      {invoice.dateDelivered && (
                        <View style={{ width: "15%" }}>
                          <Text style={styles.invoiceLabel}>Delivery date</Text>
                          <Text style={styles.invoiceNumber}>
                            {formatDate(invoice.dateDelivered)}
                          </Text>
                        </View>
                      )}
                      <View style={{ width: "20%" }}>
                        <Text style={styles.invoiceLabel}>Due date</Text>
                        <Text style={styles.invoiceNumber}>
                          {formatDate(invoice.dateDue)}
                        </Text>
                      </View>
                      <View style={{ width: "20%" }}>
                        <Text style={styles.invoiceLabel}>
                          Invoice of {invoice.currency}
                        </Text>
                        <Text
                          style={[styles.invoiceNumber, { fontWeight: "bold" }]}
                        >
                          {formatNumber(invoice.totalPriceTaxIncl)}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                {/* Issuer and Payer Information */}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 20,
                  }}
                >
                  {/* Issuer */}
                  <View
                    style={{
                      width: "48%",
                      minWidth: 0,
                      flexDirection: "column",
                      paddingRight: 30,
                      marginRight: 20,
                    }}
                  >
                    <Text style={styles.sectionTitle}>Issuer</Text>
                    <View style={styles.row}>
                      <Text style={styles.companyInfoLabel}>Name:</Text>
                      <Text style={styles.companyInfo} wrap>
                        {invoice.issuer.name}
                      </Text>
                    </View>
                    <View style={styles.row}>
                      <Text style={styles.companyInfoLabel}>Tax/Corp ID:</Text>
                      <Text style={styles.companyInfo}>
                        {invoice.issuer.id?.taxId ||
                          invoice.issuer.id?.corpRegId ||
                          ""}
                      </Text>
                    </View>
                    <View style={styles.row}>
                      <Text style={styles.companyInfoLabel}>Address:</Text>
                      <Text style={styles.companyInfo} wrap>
                        {invoice.issuer.address?.streetAddress || ""}
                      </Text>
                    </View>
                    {invoice.issuer.address?.extendedAddress && (
                      <View style={styles.row}>
                        <Text style={styles.companyInfoLabel}></Text>
                        <Text style={styles.companyInfo} wrap>
                          {invoice.issuer.address?.extendedAddress || ""}
                        </Text>
                      </View>
                    )}
                    <View style={styles.row}>
                      <Text style={styles.companyInfoLabel}></Text>
                      <Text style={styles.companyInfo} wrap>
                        {invoice.issuer.address?.city || ""},{" "}
                        {invoice.issuer.address?.stateProvince || ""},{" "}
                        {getCountryName(
                          invoice.issuer.address?.country || "",
                        ) || ""}
                      </Text>
                    </View>
                    <View style={styles.row}>
                      <Text style={styles.companyInfoLabel}>Postcode:</Text>
                      <Text style={styles.companyInfo}>
                        {invoice.issuer.address?.postalCode || "00000"}
                      </Text>
                    </View>
                    {invoice.issuer.contactInfo?.email && (
                      <View style={styles.row}>
                        <Text style={styles.companyInfoLabel}>Email:</Text>
                        <Text style={styles.companyInfo} wrap>
                          {invoice.issuer.contactInfo.email}
                        </Text>
                      </View>
                    )}
                  </View>

                  {/* Payer */}
                  <View
                    style={{
                      width: "48%",
                      minWidth: 0,
                      flexDirection: "column",
                      paddingRight: 0,
                      marginRight: 10,
                    }}
                  >
                    <Text style={styles.sectionTitle}>Payer</Text>
                    <View style={styles.row}>
                      <Text style={styles.companyInfoLabel}>Name:</Text>
                      <Text
                        style={styles.companyInfo}
                        wrap
                        hyphenationCallback={(word) => [word]}
                      >
                        {invoice.payer.name}
                      </Text>
                    </View>
                    <View style={styles.row}>
                      <Text style={styles.companyInfoLabel}>Tax/Corp ID:</Text>
                      <Text style={styles.companyInfo}>
                        {invoice.payer.id?.taxId ||
                          invoice.payer.id?.corpRegId ||
                          ""}
                      </Text>
                    </View>
                    <View style={styles.row}>
                      <Text style={styles.companyInfoLabel}>Address:</Text>
                      <Text
                        style={styles.companyInfo}
                        wrap
                        hyphenationCallback={(word) => [word]}
                      >
                        {invoice.payer.address?.streetAddress || ""}
                      </Text>
                    </View>
                    {invoice.payer.address?.extendedAddress && (
                      <View style={styles.row}>
                        <Text
                          style={styles.companyInfoLabel}
                          hyphenationCallback={(word) => [word]}
                        ></Text>
                        <Text
                          style={styles.companyInfo}
                          wrap
                          hyphenationCallback={(word) => [word]}
                        >
                          {invoice.payer.address?.extendedAddress || ""}
                        </Text>
                      </View>
                    )}
                    <View style={styles.row}>
                      <Text
                        style={styles.companyInfoLabel}
                        hyphenationCallback={(word) => [word]}
                      ></Text>
                      <Text
                        style={styles.companyInfo}
                        wrap
                        hyphenationCallback={(word) => [word]}
                      >
                        {invoice.payer.address?.city || ""},{" "}
                        {invoice.payer.address?.stateProvince || ""},{" "}
                        {getCountryName(invoice.payer.address?.country || "") ||
                          ""}
                      </Text>
                    </View>
                    <View style={styles.row}>
                      <Text style={styles.companyInfoLabel}>Postcode:</Text>
                      <Text
                        style={styles.companyInfo}
                        hyphenationCallback={(word) => [word]}
                      >
                        {invoice.payer.address?.postalCode || ""}
                      </Text>
                    </View>
                    {invoice.payer.contactInfo?.email && (
                      <View style={styles.row}>
                        <Text style={styles.companyInfoLabel}>Email:</Text>
                        <Text style={styles.companyInfo} wrap>
                          {invoice.payer.contactInfo.email}
                        </Text>
                      </View>
                    )}
                  </View>

                  {/* Right column previously held dates; now empty */}
                </View>

                {/* Payment Information */}
                <View style={[styles.paymentSection, { marginLeft: 0 }]}>
                  <Text style={styles.sectionTitle}>Payment Information</Text>
                  {fiatMode ? (
                    <div>
                      <PaymentSectionFiat
                        paymentRouting={invoice.issuer.paymentRouting}
                      />
                    </div>
                  ) : (
                    <PaymentSectionCrypto
                      paymentRouting={invoice.issuer.paymentRouting}
                    />
                  )}
                </View>
              </>
            )}

            {/* Table header and line items for this page */}
            <View style={styles.table}>
              <View style={styles.tableHeader}>
                <Text style={styles.tableCol40}>Description</Text>
                <Text style={styles.tableCol15}>Quantity</Text>
                <Text style={styles.tableCol18}>Unit Price</Text>
                <Text style={styles.tableCol12}>Tax</Text>
                <Text style={styles.tableCol18}>Total</Text>
              </View>
              {items.map((item, index) => (
                <InvoiceLineItem
                  key={index + pageIndex * 1000}
                  item={item}
                  currency={invoice.currency}
                />
              ))}
            </View>

            {/* Totals and terms only on last page */}
            {pageIndex === totalPages - 1 && (
              <>
                <View style={{ flexDirection: "row", gap: 20 }}>
                  {/* Notes Column */}
                  <View
                    style={{
                      flex: 1,
                      marginTop: 20,
                    }}
                  >
                    <Text style={[styles.sectionTitle, { marginBottom: 10 }]}>
                      {invoice.notes ? "Notes" : ""}
                    </Text>
                    <Text style={styles.companyInfo}>
                      {invoice.notes || ""}
                    </Text>
                  </View>

                  {/* Totals Column */}
                  <View style={[styles.totals, { flex: 1 }]}>
                    <View style={styles.totalRow}>
                      <Text style={styles.totalLabel}>Subtotal</Text>
                      <Text style={styles.totalValue}>
                        {formatCurrency(
                          invoice.lineItems.reduce(
                            (sum, item) =>
                              sum + item.quantity * item.unitPriceTaxExcl,
                            0,
                          ),
                          invoice.currency,
                        )}
                      </Text>
                    </View>
                    <View style={styles.totalRow}>
                      <Text style={styles.totalLabel}>Tax</Text>
                      <Text style={styles.totalValue}>
                        {formatCurrency(
                          invoice.lineItems.reduce(
                            (sum, item) =>
                              sum +
                              item.quantity *
                                (item.unitPriceTaxIncl - item.unitPriceTaxExcl),
                            0,
                          ),
                          invoice.currency,
                        )}
                      </Text>
                    </View>
                    <View style={styles.totalRowBold}>
                      <Text style={styles.totalLabelBold}>Total</Text>
                      <Text style={styles.totalValueBold}>
                        {formatCurrency(
                          invoice.lineItems.reduce(
                            (sum, item) =>
                              sum + item.quantity * item.unitPriceTaxIncl,
                            0,
                          ),
                          invoice.currency,
                        )}
                      </Text>
                    </View>
                  </View>
                </View>
              </>
            )}
          </View>
          {/* Terms & Conditions and page number on every page */}
          <View
            style={{
              marginLeft: 40,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: "90%",
            }}
          >
            <View>
              <Text style={styles.termsText}>
                Please pay within 30 days of receiving this invoice.
              </Text>
            </View>
            <Text
              style={{
                fontSize: 10,
                color: "#6B7280",
                textAlign: "right",
                flex: 1,
              }}
            >
              {`${pageIndex + 1}/${totalPages}`}
            </Text>
          </View>
        </Page>
      ))}
    </Document>
  );
};

{
  /* New component for fiat payment section */
}
const PaymentSectionFiat: React.FC<{
  paymentRouting: Maybe<PaymentRouting>;
}> = ({ paymentRouting }) => {
  if (!paymentRouting) return null;
  console.log("paymentRouting", paymentRouting.bank);
  return (
    <View style={[styles.gridContainer, { marginTop: 0, marginLeft: 0 }]}>
      <View style={styles.gridColumn}>
        <View style={styles.row}>
          <Text style={styles.companyInfoLabel}>Bank Name:</Text>
          <Text style={styles.companyInfo}>
            {paymentRouting.bank?.name || ""}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.companyInfoLabel}>Address:</Text>
          <Text style={styles.companyInfo}>
            {paymentRouting.bank?.address?.streetAddress || ""}
          </Text>
        </View>
        {paymentRouting.bank?.address?.extendedAddress && (
          <View style={styles.row}>
            <Text style={styles.companyInfoLabel}></Text>
            <Text style={styles.companyInfo}>
              {paymentRouting.bank?.address?.extendedAddress}
            </Text>
          </View>
        )}
        <View style={styles.row}>
          <Text style={styles.companyInfoLabel}></Text>
          <Text style={styles.companyInfo}>
            {paymentRouting.bank?.address?.city || ""},{" "}
            {paymentRouting.bank?.address?.stateProvince || ""},{" "}
            {getCountryName(paymentRouting.bank?.address?.country || "") || ""}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.companyInfoLabel}>Postcode:</Text>
          <Text style={styles.companyInfo}>
            {paymentRouting.bank?.address?.postalCode || "00000"}
          </Text>
        </View>
      </View>
      <View style={[styles.gridColumn, { paddingLeft: 12 }]}>
        <View style={styles.row}>
          <Text style={styles.companyInfoLabel}>Beneficiary:</Text>
          <Text style={styles.companyInfo}>
            {paymentRouting.bank?.beneficiary || ""}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.companyInfoLabel}>Acct No:</Text>
          <Text style={styles.companyInfo}>
            {paymentRouting.bank?.accountNum || ""}
          </Text>
        </View>
        {paymentRouting.bank?.ABA && (
          <View style={styles.row}>
            <Text style={styles.companyInfoLabel}>ABA/ACH:</Text>
            <Text style={styles.companyInfo}>{paymentRouting.bank?.ABA}</Text>
          </View>
        )}
        <View style={styles.row}>
          <Text style={styles.companyInfoLabel}>BIC/SWIFT:</Text>
          <Text style={styles.companyInfo}>
            {paymentRouting.bank?.BIC || paymentRouting.bank?.SWIFT || ""}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.companyInfoLabel}>Acct Type:</Text>
          <Text style={styles.companyInfo}>
            {paymentRouting.bank?.accountType || ""}
          </Text>
        </View>
        {paymentRouting.bank?.intermediaryBank?.accountNum && (
          <>
            <View style={styles.row}>
              <Text style={styles.companyInfoLabel}>Intermediary Bank:</Text>
              <Text style={styles.companyInfo}>
                {paymentRouting.bank?.intermediaryBank?.name}
              </Text>
            </View>
            {paymentRouting.bank?.intermediaryBank?.accountNum && (
              <View style={styles.row}>
                <Text style={styles.companyInfoLabel}>Intermediary Acct:</Text>
                <Text style={styles.companyInfo}>
                  {paymentRouting.bank?.intermediaryBank?.accountNum}
                </Text>
              </View>
            )}
            {paymentRouting.bank?.intermediaryBank?.accountType && (
              <View style={styles.row}>
                <Text style={styles.companyInfoLabel}>Intermediary Type:</Text>
                <Text style={styles.companyInfo}>
                  {paymentRouting.bank?.intermediaryBank?.accountType}
                </Text>
              </View>
            )}
            {paymentRouting.bank?.intermediaryBank?.beneficiary && (
              <View style={styles.row}>
                <Text style={styles.companyInfoLabel}>
                  Intermediary Beneficiary:
                </Text>
                <Text style={styles.companyInfo}>
                  {paymentRouting.bank?.intermediaryBank?.beneficiary}
                </Text>
              </View>
            )}
            {paymentRouting.bank?.intermediaryBank?.ABA && (
              <View style={styles.row}>
                <Text style={styles.companyInfoLabel}>Intermediary ABA:</Text>
                <Text style={styles.companyInfo}>
                  {paymentRouting.bank?.intermediaryBank?.ABA}
                </Text>
              </View>
            )}
            {(paymentRouting.bank?.intermediaryBank?.BIC ||
              paymentRouting.bank?.intermediaryBank?.SWIFT) && (
              <View style={styles.row}>
                <Text style={styles.companyInfoLabel}>
                  Intermediary BIC/SWIFT:
                </Text>
                <Text style={styles.companyInfo}>
                  {paymentRouting.bank?.intermediaryBank?.BIC ||
                    paymentRouting.bank?.intermediaryBank?.SWIFT}
                </Text>
              </View>
            )}
            {paymentRouting.bank?.intermediaryBank?.address?.streetAddress && (
              <View style={styles.row}>
                <Text style={styles.companyInfoLabel}>
                  Intermediary Address:
                </Text>
                <Text style={styles.companyInfo}>
                  {
                    paymentRouting.bank?.intermediaryBank?.address
                      ?.streetAddress
                  }
                  {paymentRouting.bank?.intermediaryBank?.address
                    ?.extendedAddress &&
                    `, ${paymentRouting.bank?.intermediaryBank?.address?.extendedAddress}`}
                </Text>
              </View>
            )}
            {(paymentRouting.bank?.intermediaryBank?.address?.city ||
              paymentRouting.bank?.intermediaryBank?.address?.stateProvince ||
              paymentRouting.bank?.intermediaryBank?.address?.postalCode) && (
              <View style={styles.row}>
                <Text style={styles.companyInfoLabel}>
                  Intermediary Location:
                </Text>
                <Text style={styles.companyInfo}>
                  {[
                    paymentRouting.bank?.intermediaryBank?.address?.city,
                    paymentRouting.bank?.intermediaryBank?.address
                      ?.stateProvince,
                    paymentRouting.bank?.intermediaryBank?.address?.postalCode,
                  ]
                    .filter(Boolean)
                    .join(", ")}
                </Text>
              </View>
            )}
            {paymentRouting.bank?.intermediaryBank?.address?.country && (
              <View style={styles.row}>
                <Text style={styles.companyInfoLabel}>
                  Intermediary Country:
                </Text>
                <Text style={styles.companyInfo}>
                  {paymentRouting.bank?.intermediaryBank?.address?.country}
                </Text>
              </View>
            )}
            {paymentRouting.bank?.intermediaryBank?.memo && (
              <View style={styles.row}>
                <Text style={styles.companyInfoLabel}>Intermediary Memo:</Text>
                <Text style={styles.companyInfo}>
                  {paymentRouting.bank?.intermediaryBank?.memo}
                </Text>
              </View>
            )}
          </>
        )}
      </View>
    </View>
  );
};

{
  /* New component for crypto payment section */
}
const PaymentSectionCrypto: React.FC<{
  paymentRouting: Maybe<PaymentRouting>;
}> = ({ paymentRouting }) => {
  if (!paymentRouting) return null;
  return (
    <View style={styles.row}>
      <View style={styles.gridColumn}>
        <View style={styles.row}>
          <Text style={styles.companyInfoLabel}>Chain:</Text>
          <Text style={styles.companyInfo}>
            {paymentRouting.wallet?.chainName || ""}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.companyInfoLabel}>Address:</Text>
          <Text style={styles.companyInfo}>
            {paymentRouting.wallet?.address || ""}
          </Text>
        </View>
      </View>
    </View>
  );
};

{
  /* New component for line items */
}
const InvoiceLineItem: React.FC<{
  item: InvoiceLineItemType;
  currency: string;
}> = ({ item, currency }) => (
  <View style={styles.tableRow}>
    <View style={styles.tableCol40}>
      <Text style={styles.itemName} hyphenationCallback={(word) => [word]}>
        {item.description}
      </Text>
    </View>
    <Text style={styles.tableCol15}>{item.quantity.toFixed(2)}</Text>
    <Text style={styles.tableCol18}>
      {formatCurrency(item.unitPriceTaxExcl, currency)}
    </Text>
    <Text style={styles.tableCol12}>
      {formatNumber(item.unitPriceTaxIncl - item.unitPriceTaxExcl)}
    </Text>
    <Text style={styles.tableCol18}>
      {formatCurrency(item.quantity * item.unitPriceTaxIncl, currency)}
    </Text>
  </View>
);
