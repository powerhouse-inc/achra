import type {
  EditIssuerBankInput,
  EditIssuerInput,
  EditIssuerWalletInput,
  EditPayerBankInput,
  EditPayerInput,
  EditPayerWalletInput,
  LegalEntity,
} from "document-models/invoice";
import React, { type ComponentPropsWithRef } from "react";
import { twMerge } from "tailwind-merge";
import { LegalEntityWalletSection } from "./walletSection.js";
import { LegalEntityBankSection } from "./bankSection.js";
import { CountryForm } from "../components/countryForm.js";
import type { ValidationResult } from "../validation/validationManager.js";
import { InputField } from "../components/inputField.js";
import { Select } from "@powerhousedao/document-engineering";

export type EditLegalEntityWalletInput =
  | EditIssuerWalletInput
  | EditPayerWalletInput;

export type EditLegalEntityBankInput = EditIssuerBankInput | EditPayerBankInput;
export type EditLegalEntityInput = EditIssuerInput | EditPayerInput;

const FieldLabel = ({ children }: { readonly children: React.ReactNode }) => (
  <label className="block text-sm font-medium text-gray-700">{children}</label>
);

export const STATE_PROVINCE_OPTIONS = [
  { label: "Alabama", value: "AL" },
  { label: "Alaska", value: "AK" },
  { label: "Arizona", value: "AZ" },
  { label: "Arkansas", value: "AR" },
  { label: "American Samoa", value: "AS" },
  { label: "California", value: "CA" },
  { label: "Colorado", value: "CO" },
  { label: "Connecticut", value: "CT" },
  { label: "Delaware", value: "DE" },
  { label: "District of Columbia", value: "DC" },
  { label: "Florida", value: "FL" },
  { label: "Georgia", value: "GA" },
  { label: "Guam", value: "GU" },
  { label: "Hawaii", value: "HI" },
  { label: "Idaho", value: "ID" },
  { label: "Illinois", value: "IL" },
  { label: "Indiana", value: "IN" },
  { label: "Iowa", value: "IA" },
  { label: "Kansas", value: "KS" },
  { label: "Kentucky", value: "KY" },
  { label: "Louisiana", value: "LA" },
  { label: "Maine", value: "ME" },
  { label: "Maryland", value: "MD" },
  { label: "Massachusetts", value: "MA" },
  { label: "Michigan", value: "MI" },
  { label: "Minnesota", value: "MN" },
  { label: "Mississippi", value: "MS" },
  { label: "Missouri", value: "MO" },
  { label: "Montana", value: "MT" },
  { label: "Nebraska", value: "NE" },
  { label: "Nevada", value: "NV" },
  { label: "New Hampshire", value: "NH" },
  { label: "New Jersey", value: "NJ" },
  { label: "New Mexico", value: "NM" },
  { label: "New York", value: "NY" },
  { label: "North Carolina", value: "NC" },
  { label: "North Dakota", value: "ND" },
  { label: "Northern Mariana Islands", value: "MP" },
  { label: "Ohio", value: "OH" },
  { label: "Oklahoma", value: "OK" },
  { label: "Oregon", value: "OR" },
  { label: "Pennsylvania", value: "PA" },
  { label: "Puerto Rico", value: "PR" },
  { label: "Rhode Island", value: "RI" },
  { label: "South Carolina", value: "SC" },
  { label: "South Dakota", value: "SD" },
  { label: "Tennessee", value: "TN" },
  { label: "Texas", value: "TX" },
  { label: "Trust Territories", value: "TT" },
  { label: "Utah", value: "UT" },
  { label: "Vermont", value: "VT" },
  { label: "Virgin Islands", value: "VI" },
  { label: "Virginia", value: "VA" },
  { label: "Washington", value: "WA" },
  { label: "West Virginia", value: "WV" },
  { label: "Wisconsin", value: "WI" },
  { label: "Wyoming", value: "WY" },
];

export type LegalEntityMainSectionProps = Omit<
  ComponentPropsWithRef<"div">,
  "children"
> & {
  readonly value: EditLegalEntityInput;
  readonly onChange: (value: EditLegalEntityInput) => void;
  readonly disabled?: boolean;
  readonly mainCountryValidation?: ValidationResult | null;
  readonly bankCountryValidation?: ValidationResult | null;
  readonly streetaddressvalidation?: ValidationResult | null;
  readonly cityvalidation?: ValidationResult | null;
  readonly postalcodevalidation?: ValidationResult | null;
  readonly payeremailvalidation?: ValidationResult | null;
};

export const LegalEntityMainSection = (props: LegalEntityMainSectionProps) => {
  const {
    value,
    onChange,
    disabled,
    mainCountryValidation,
    bankCountryValidation,
    streetaddressvalidation,
    cityvalidation,
    postalcodevalidation,
    payeremailvalidation,
    ...divProps
  } = props;

  const handleInputChange =
    (field: keyof EditLegalEntityInput) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      // No-op
    };

  const handleBlur =
    (field: keyof EditLegalEntityInput) =>
    (e: React.FocusEvent<HTMLInputElement>) => {
      if (e.target.value !== value[field]) {
        onChange({ [field]: e.target.value });
      }
    };

  const handleTextareaChange =
    (field: keyof EditLegalEntityInput) =>
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      // No-op
    };

  const handleTextareaBlur =
    (field: keyof EditLegalEntityInput) =>
    (e: React.FocusEvent<HTMLTextAreaElement>) => {
      if (e.target.value !== value[field]) {
        onChange({ [field]: e.target.value });
      }
    };

  return (
    <div
      {...divProps}
      className={twMerge(
        "rounded-lg border border-gray-200 bg-white p-6 mb-2",
        props.className,
      )}
    >
      <h3 className="mb-4 text-lg font-semibold text-gray-900">
        Basic Information
      </h3>
      <div className="space-y-6">
        <div className="space-y-2">
          <InputField
            value={value.name ?? ""}
            label="Name"
            placeholder="Legal Entity Name"
            onBlur={handleTextareaBlur("name")}
            handleInputChange={handleTextareaChange("name")}
            className="h-10 w-full text-md mb-2"
          />
        </div>

        <div className="space-y-2">
          <InputField
            value={value.id ?? ""}
            label="Tax ID / Corp. Reg"
            placeholder="332..."
            onBlur={handleTextareaBlur("id")}
            handleInputChange={handleTextareaChange("id")}
            className="h-10 w-full text-md mb-2"
          />
        </div>

        <div className="space-y-4">
          <div className="space-y-4">
            <InputField
              value={value.streetAddress ?? ""}
              label="Address"
              placeholder="Street Address"
              onBlur={handleTextareaBlur("streetAddress")}
              handleInputChange={handleTextareaChange("streetAddress")}
              className="h-10 w-full text-md mb-2"
              validation={streetaddressvalidation}
            />
            <InputField
              value={value.extendedAddress ?? ""}
              placeholder="Extended Address"
              onBlur={handleTextareaBlur("extendedAddress")}
              handleInputChange={handleTextareaChange("extendedAddress")}
              className="h-10 w-full text-md mb-2"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <InputField
                value={value.city ?? ""}
                label="City"
                placeholder="City"
                onBlur={handleTextareaBlur("city")}
                handleInputChange={handleTextareaChange("city")}
                className="h-10 w-full text-md mb-2"
                validation={cityvalidation}
              />
            </div>
            <div className="space-y-2">
              {value.country === "US" ? (
                <>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    State/Province
                  </label>
                  <Select
                    options={STATE_PROVINCE_OPTIONS}
                    value={value.stateProvince ?? ""}
                    onChange={(value) => {
                      handleBlur("stateProvince")({
                        target: { value: value as string },
                      } as React.FocusEvent<HTMLInputElement>);
                    }}
                    className="h-10 w-full text-md mb-2"
                    searchable={true}
                  />
                </>
              ) : (
                <InputField
                  value={value.stateProvince ?? ""}
                  label="State/Province"
                  placeholder="State/Province"
                  onBlur={handleTextareaBlur("stateProvince")}
                  handleInputChange={handleTextareaChange("stateProvince")}
                  className="h-10 w-full text-md mb-2"
                />
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <InputField
                value={value.postalCode ?? ""}
                label="Postal Code"
                placeholder="Postal Code"
                onBlur={handleTextareaBlur("postalCode")}
                handleInputChange={handleTextareaChange("postalCode")}
                className="h-10 w-full text-md mb-2"
                validation={postalcodevalidation}
              />
            </div>
            <div className="space-y-2">
              <FieldLabel>Country</FieldLabel>
              <CountryForm
                country={value.country ?? ""}
                handleInputChange={handleInputChange("country")}
                handleBlur={handleBlur("country")}
                className="h-10 w-full text-md mb-2"
                validation={mainCountryValidation}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <InputField
              value={value.email ?? ""}
              label="Email"
              placeholder="Email"
              onBlur={handleTextareaBlur("email")}
              handleInputChange={handleTextareaChange("email")}
              className="h-10 w-full text-md mb-2"
              validation={payeremailvalidation}
            />
          </div>
          <div className="space-y-2">
            <InputField
              value={value.tel ?? ""}
              label="Telephone"
              placeholder="Telephone"
              onBlur={handleTextareaBlur("tel")}
              handleInputChange={handleTextareaChange("tel")}
              className="h-10 w-full text-md mb-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

type LegalEntityFormProps = {
  readonly legalEntity: LegalEntity;
  readonly onChangeInfo?: (info: EditLegalEntityInput) => void;
  readonly onChangeBank?: (bank: EditLegalEntityBankInput) => void;
  readonly onChangeWallet?: (wallet: EditLegalEntityWalletInput) => void;
  readonly basicInfoDisabled?: boolean;
  readonly bankDisabled?: boolean;
  readonly walletDisabled?: boolean;
  readonly currency: string;
  readonly status: string;
  readonly walletvalidation?: ValidationResult | null;
  readonly chainvalidation?: ValidationResult | null;
  readonly mainCountryValidation?: ValidationResult | null;
  readonly bankCountryValidation?: ValidationResult | null;
  readonly ibanvalidation?: ValidationResult | null;
  readonly bicvalidation?: ValidationResult | null;
  readonly banknamevalidation?: ValidationResult | null;
  readonly streetaddressvalidation?: ValidationResult | null;
  readonly cityvalidation?: ValidationResult | null;
  readonly postalcodevalidation?: ValidationResult | null;
  readonly payeremailvalidation?: ValidationResult | null;
  readonly routingNumbervalidation?: ValidationResult | null;
  readonly accountNumbervalidation?: ValidationResult | null;
};

// Helper to flatten LegalEntity to EditLegalEntityInput
function flattenLegalEntityToEditInput(
  legalEntity: LegalEntity,
): EditLegalEntityInput {
  const id = legalEntity.id?.taxId ?? legalEntity.id?.corpRegId ?? "";
  return {
    id,
    name: legalEntity.name ?? "",
    streetAddress: legalEntity.address?.streetAddress ?? "",
    extendedAddress: legalEntity.address?.extendedAddress ?? "",
    city: legalEntity.address?.city ?? "",
    postalCode: legalEntity.address?.postalCode ?? "",
    country: legalEntity.address?.country ?? "",
    stateProvince: legalEntity.address?.stateProvince ?? "",
    tel: legalEntity.contactInfo?.tel ?? "",
    email: legalEntity.contactInfo?.email ?? "",
  };
}

export function LegalEntityForm({
  legalEntity,
  onChangeInfo,
  onChangeBank,
  onChangeWallet,
  basicInfoDisabled,
  bankDisabled,
  walletDisabled,
  currency,
  status,
  walletvalidation,
  chainvalidation,
  mainCountryValidation,
  bankCountryValidation,
  ibanvalidation,
  bicvalidation,
  banknamevalidation,
  streetaddressvalidation,
  cityvalidation,
  postalcodevalidation,
  payeremailvalidation,
  routingNumbervalidation,
  accountNumbervalidation,
}: LegalEntityFormProps) {
  // Handler for main info section
  const handleChangeInfo = (update: Partial<EditLegalEntityInput>) => {
    if (!onChangeInfo) return;
    onChangeInfo(update);
  };

  return (
    <div className="space-y-8">
      {!basicInfoDisabled && !!onChangeInfo && (
        <LegalEntityMainSection
          onChange={handleChangeInfo}
          value={flattenLegalEntityToEditInput(legalEntity)}
          mainCountryValidation={mainCountryValidation}
          streetaddressvalidation={streetaddressvalidation}
          cityvalidation={cityvalidation}
          postalcodevalidation={postalcodevalidation}
          payeremailvalidation={payeremailvalidation}
        />
      )}
      {!walletDisabled && !!onChangeWallet && (
        <LegalEntityWalletSection
          onChange={onChangeWallet}
          value={legalEntity.paymentRouting?.wallet || {}}
          currency={currency}
          status={status}
          walletvalidation={walletvalidation}
          chainvalidation={chainvalidation}
        />
      )}
      {!bankDisabled && !!onChangeBank && (
        <LegalEntityBankSection
          onChange={onChangeBank}
          currency={currency}
          value={legalEntity.paymentRouting?.bank || {}}
          countryvalidation={bankCountryValidation}
          ibanvalidation={ibanvalidation}
          bicvalidation={bicvalidation}
          routingNumbervalidation={routingNumbervalidation}
          banknamevalidation={banknamevalidation}
          accountNumbervalidation={accountNumbervalidation}
        />
      )}
    </div>
  );
}
