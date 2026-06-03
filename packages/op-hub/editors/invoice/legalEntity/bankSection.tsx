import {
  type ComponentPropsWithRef,
  forwardRef,
  type Ref,
  useCallback,
  useState,
  useEffect,
  useMemo,
} from "react";
import { twMerge } from "tailwind-merge";
import type { EditLegalEntityBankInput } from "./legalEntity.js";
import { CountryForm } from "../components/countryForm.js";
import { InputField } from "../components/inputField.js";
import type { ValidationResult } from "../validation/validationManager.js";
import { Select } from "@powerhousedao/document-engineering";
import { isValidIBAN } from "../validation/validationRules.js";
import { STATE_PROVINCE_OPTIONS } from "./legalEntity.js";

const ACCOUNT_TYPES = ["CHECKING", "SAVINGS", "TRUST"] as const;

export type LegalEntityBankSectionProps = Omit<
  ComponentPropsWithRef<"div">,
  "children"
> & {
  readonly value: EditLegalEntityBankInput;
  readonly onChange: (value: EditLegalEntityBankInput) => void;
  readonly disabled?: boolean;
  readonly countryvalidation?: ValidationResult | null;
  readonly ibanvalidation?: ValidationResult | null;
  readonly bicvalidation?: ValidationResult | null;
  readonly routingNumbervalidation?: ValidationResult | null;
  readonly banknamevalidation?: ValidationResult | null;
  readonly accountNumbervalidation?: ValidationResult | null;
  readonly currency: string;
};

function flattenBankInput(value: any) {
  return {
    ...value,
    ...(value.address && {
      streetAddress: value.address.streetAddress ?? "",
      extendedAddress: value.address.extendedAddress ?? "",
      city: value.address.city ?? "",
      postalCode: value.address.postalCode ?? "",
      country: value.address.country ?? "",
      stateProvince: value.address.stateProvince ?? "",
    }),
    ...(value.intermediaryBank && {
      ABAIntermediary: value.intermediaryBank.ABA ?? "",
      BICIntermediary: value.intermediaryBank.BIC ?? "",
      SWIFTIntermediary: value.intermediaryBank.SWIFT ?? "",
      accountNumIntermediary: value.intermediaryBank.accountNum ?? "",
      accountTypeIntermediary: value.intermediaryBank.accountType ?? "",
      beneficiaryIntermediary: value.intermediaryBank.beneficiary ?? "",
      memoIntermediary: value.intermediaryBank.memo ?? "",
      nameIntermediary: value.intermediaryBank.name ?? "",
      streetAddressIntermediary:
        value.intermediaryBank.address?.streetAddress ?? "",
      extendedAddressIntermediary:
        value.intermediaryBank.address?.extendedAddress ?? "",
      cityIntermediary: value.intermediaryBank.address?.city ?? "",
      postalCodeIntermediary: value.intermediaryBank.address?.postalCode ?? "",
      countryIntermediary: value.intermediaryBank.address?.country ?? "",
      stateProvinceIntermediary:
        value.intermediaryBank.address?.stateProvince ?? "",
    }),
  };
}

export const LegalEntityBankSection = forwardRef(
  function LegalEntityBankSection(
    props: LegalEntityBankSectionProps,
    ref: Ref<HTMLDivElement>,
  ) {
    const {
      value,
      onChange,
      disabled,
      countryvalidation,
      ibanvalidation,
      bicvalidation,
      routingNumbervalidation,
      banknamevalidation,
      accountNumbervalidation,
      currency,
      ...divProps
    } = props;
    const [showIntermediary, setShowIntermediary] = useState<boolean>(false);

    const [localState, setLocalState] = useState(flattenBankInput(value));

    useEffect(() => {
      setLocalState(flattenBankInput(value));

      // Check if there's any intermediary bank data
      const hasIntermediaryData = !!(
        localState.accountNumIntermediary ||
        localState.nameIntermediary ||
        localState.beneficiaryIntermediary ||
        localState.ABAIntermediary ||
        localState.BICIntermediary ||
        localState.SWIFTIntermediary ||
        localState.streetAddressIntermediary ||
        localState.cityIntermediary ||
        localState.countryIntermediary
      );

      setShowIntermediary(hasIntermediaryData);
    }, [value]);

    const handleInputChange = useCallback(function handleInputChange(
      field: keyof EditLegalEntityBankInput,
      event: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) {
      setLocalState((prevState: ReturnType<typeof flattenBankInput>) => ({
        ...prevState,
        [field]: event.target.value,
      }));
    }, []);

    const handleBlur = useCallback(
      function handleBlur(
        field: keyof EditLegalEntityBankInput,
        event: React.FocusEvent<
          HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >,
      ) {
        onChange({
          [field]: event.target.value,
        } as Partial<EditLegalEntityBankInput>);
      },
      [onChange],
    );

    const handleIntermediaryToggle = useCallback(
      function handleIntermediaryToggle(
        event: React.ChangeEvent<HTMLInputElement>,
      ) {
        setShowIntermediary(event.target.checked);
      },
      [showIntermediary],
    );

    function createInputHandler(field: keyof EditLegalEntityBankInput) {
      return function handleFieldChange(
        event: React.ChangeEvent<
          HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >,
      ) {
        handleInputChange(field, event);
      };
    }

    function createBlurHandler(field: keyof EditLegalEntityBankInput) {
      return function handleFieldBlur(
        event: React.FocusEvent<
          HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >,
      ) {
        handleBlur(field, event);
      };
    }

    const SEPA_SWIFT_CURRENCIES = ["EUR", "DKK", "GBP", "CHF", "JPY"];

    const usdIbanPayment = useMemo(
      () => isValidIBAN(localState.accountNum ?? "") && currency === "USD",
      [localState.accountNum, currency],
    );

    return (
      <div
        {...divProps}
        className={twMerge(
          "rounded-lg border border-gray-200 bg-white p-6",
          props.className,
        )}
        ref={ref}
      >
        <h3 className="mb-4 text-lg font-semibold text-gray-900">
          Banking Information
        </h3>
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Account Number
                  {isValidIBAN(localState.accountNum ?? "") && (
                    <span className="ml-2 text-green-600 font-medium">
                      IBAN
                    </span>
                  )}
                </label>
                <InputField
                  // input={localState.accountNum ?? ""}
                  value={localState.accountNum ?? ""}
                  placeholder="Account Number"
                  onBlur={createBlurHandler("accountNum")}
                  handleInputChange={createInputHandler("accountNum")}
                  className="h-10 w-full text-md mb-2"
                  validation={
                    // Prefer the first failing validation between IBAN and generic account number
                    (() => {
                      const firstInvalid =
                        (ibanvalidation &&
                          !ibanvalidation.isValid &&
                          ibanvalidation) ||
                        (accountNumbervalidation &&
                          !accountNumbervalidation.isValid &&
                          accountNumbervalidation);
                      return (
                        firstInvalid ||
                        ibanvalidation ||
                        accountNumbervalidation ||
                        null
                      );
                    })()
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Select
                    className="h-10 w-full text-md mb-2"
                    label="Account Type"
                    options={ACCOUNT_TYPES.map((type) => ({
                      label: type,
                      value: type,
                    }))}
                    value={localState.accountType ?? ""}
                    onChange={(value) => {
                      // Update local state
                      setLocalState(
                        (prevState: ReturnType<typeof flattenBankInput>) => ({
                          ...prevState,
                          accountType: value as string,
                        }),
                      );
                      // Dispatch to parent component
                      onChange({
                        accountType: value as string,
                      } as Partial<EditLegalEntityBankInput>);
                    }}
                  />
                </div>
                <div className="space-y-2">
                  {SEPA_SWIFT_CURRENCIES.includes(currency) ? (
                    <InputField
                      value={(localState.BIC || localState.SWIFT) ?? ""}
                      label="SWIFT/BIC"
                      placeholder="SWIFT/BIC"
                      onBlur={createBlurHandler("BIC")}
                      handleInputChange={createInputHandler("BIC")}
                      className="h-10 w-full text-md mb-2"
                      validation={bicvalidation}
                    />
                  ) : (
                    <div>
                      <InputField
                        value={localState.ABA ?? ""}
                        label="Routing Number (ABA/ACH)"
                        placeholder="Routing Number (ABA/ACH)"
                        onBlur={createBlurHandler("ABA")}
                        handleInputChange={createInputHandler("ABA")}
                        className="h-10 w-full text-md mb-2"
                        validation={
                          usdIbanPayment ? null : routingNumbervalidation
                        }
                      />
                      <InputField
                        value={(localState.BIC || localState.SWIFT) ?? ""}
                        label="SWIFT/BIC"
                        placeholder="SWIFT/BIC"
                        onBlur={createBlurHandler("SWIFT")}
                        handleInputChange={createInputHandler("SWIFT")}
                        className="h-10 w-full text-md mb-2"
                        validation={bicvalidation}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <InputField
              // input={localState.beneficiary ?? ""}
              value={localState.beneficiary ?? ""}
              label="Beneficiary Information"
              placeholder="Beneficiary Name"
              onBlur={createBlurHandler("beneficiary")}
              handleInputChange={createInputHandler("beneficiary")}
              className="h-10 w-full text-md mb-2"
            />
          </div>

          <div className="space-y-4">
            <InputField
              // input={localState.name ?? ""}
              value={localState.name ?? ""}
              label="Bank Details"
              placeholder="Bank Name"
              onBlur={createBlurHandler("name")}
              handleInputChange={createInputHandler("name")}
              className="h-10 w-full text-md mb-2"
              validation={banknamevalidation}
            />
          </div>

          <div className="space-y-4">
            <div className="space-y-4 rounded-lg">
              <InputField
                // input={localState.streetAddress ?? ""}
                value={localState.streetAddress ?? ""}
                label="Bank Address"
                placeholder="Street Address"
                onBlur={createBlurHandler("streetAddress")}
                handleInputChange={createInputHandler("streetAddress")}
                className="h-10 w-full text-md mb-2"
              />
              <InputField
                // input={localState.extendedAddress ?? ""}
                value={localState.extendedAddress ?? ""}
                placeholder="Extended Address"
                onBlur={createBlurHandler("extendedAddress")}
                handleInputChange={createInputHandler("extendedAddress")}
                className="h-10 w-full text-md mb-2"
              />
              <div className="grid grid-cols-2 gap-2">
                <InputField
                  // input={localState.city ?? ""}
                  value={localState.city ?? ""}
                  label="City"
                  placeholder="City"
                  onBlur={createBlurHandler("city")}
                  handleInputChange={createInputHandler("city")}
                  className="h-10 w-full text-md mb-2"
                />
                <div className="space-y-2">
                  {localState.country === "US" ? (
                    <>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        State/Province
                      </label>
                      <Select
                        options={STATE_PROVINCE_OPTIONS}
                        value={localState.stateProvince ?? ""}
                        onChange={(value) => {
                          createBlurHandler("stateProvince")({
                            target: { value: value as string },
                          } as React.FocusEvent<HTMLInputElement>);
                        }}
                        className="h-10 w-full text-md mb-2"
                        searchable={true}
                      />
                    </>
                  ) : (
                    <InputField
                      // input={localState.stateProvince ?? ""}
                      value={localState.stateProvince ?? ""}
                      label="State/Province"
                      placeholder="State/Province"
                      onBlur={createBlurHandler("stateProvince")}
                      handleInputChange={createInputHandler("stateProvince")}
                      className="h-10 w-full text-md mb-2"
                    />
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <InputField
                  // input={localState.postalCode ?? ""}
                  value={localState.postalCode ?? ""}
                  label="Postal Code"
                  placeholder="Postal Code"
                  onBlur={createBlurHandler("postalCode")}
                  handleInputChange={createInputHandler("postalCode")}
                  className="h-10 w-full text-md mb-2"
                />
                <CountryForm
                  label="Country"
                  country={localState.country ?? ""}
                  handleInputChange={createInputHandler("country")}
                  handleBlur={createBlurHandler("country")}
                  className="h-10 w-full text-md mb-2"
                  validation={countryvalidation}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <InputField
              // input={localState.memo ?? ""}
              value={localState.memo ?? ""}
              label="Memo"
              placeholder="Memo"
              onBlur={createBlurHandler("memo")}
              handleInputChange={createInputHandler("memo")}
              className="h-10 w-full text-md mb-2"
            />
          </div>

          <div className="pt-4">
            <label className="flex items-center space-x-2">
              <input
                checked={showIntermediary}
                className="size-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
                id="showIntermediary"
                onChange={handleIntermediaryToggle}
                type="checkbox"
              />
              <span className="text-sm font-medium text-gray-700">
                Include Intermediary Bank
              </span>
            </label>
          </div>

          {showIntermediary ? (
            <div className="bg-blue-50 mt-4 space-y-6 rounded-lg border border-blue-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Intermediary Bank Details
              </h3>
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <InputField
                      // input={localState.accountNumIntermediary ?? ""}
                      value={localState.accountNumIntermediary ?? ""}
                      label="Account Number"
                      placeholder="Intermediary Account Number"
                      onBlur={createBlurHandler("accountNumIntermediary")}
                      handleInputChange={createInputHandler(
                        "accountNumIntermediary",
                      )}
                      className="h-10 w-full text-md mb-2"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-2">
                        <Select
                          className="h-10 w-full text-md mb-2"
                          label="Account Type"
                          options={ACCOUNT_TYPES.map((type) => ({
                            label: type,
                            value: type,
                          }))}
                          value={localState.accountType ?? ""}
                          onChange={(value) => {
                            // Update local state
                            setLocalState(
                              (
                                prevState: ReturnType<typeof flattenBankInput>,
                              ) => ({
                                ...prevState,
                                accountType: value as string,
                              }),
                            );
                            // Dispatch to parent component
                            onChange({
                              accountType: value as string,
                            } as Partial<EditLegalEntityBankInput>);
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        {SEPA_SWIFT_CURRENCIES.includes(currency) ? (
                          <InputField
                            value={
                              (localState.SWIFTIntermediary ||
                                localState.BICIntermediary) ??
                              ""
                            }
                            label="SWIFT/BIC"
                            placeholder="SWIFT/BIC"
                            onBlur={createBlurHandler("BICIntermediary")}
                            handleInputChange={createInputHandler(
                              "BICIntermediary",
                            )}
                            className="h-10 w-full text-md mb-2"
                            validation={bicvalidation}
                          />
                        ) : (
                          <div>
                            <InputField
                              value={localState.ABAIntermediary ?? ""}
                              label="Routing Number (ABA/ACH)"
                              placeholder="Routing Number (ABA/ACH)"
                              onBlur={createBlurHandler("ABAIntermediary")}
                              handleInputChange={createInputHandler(
                                "ABAIntermediary",
                              )}
                              className="h-10 w-full text-md mb-2"
                            />
                            <InputField
                              value={
                                (localState.SWIFTIntermediary ||
                                  localState.BICIntermediary) ??
                                ""
                              }
                              label="SWIFT/BIC"
                              placeholder="SWIFT/BIC"
                              onBlur={createBlurHandler("SWIFTIntermediary")}
                              handleInputChange={createInputHandler(
                                "SWIFTIntermediary",
                              )}
                              className="h-10 w-full text-md mb-2"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <InputField
                    // input={localState.beneficiaryIntermediary ?? ""}
                    value={localState.beneficiaryIntermediary ?? ""}
                    label="Beneficiary Information"
                    placeholder="Intermediary Beneficiary Name"
                    onBlur={createBlurHandler("beneficiaryIntermediary")}
                    handleInputChange={createInputHandler(
                      "beneficiaryIntermediary",
                    )}
                    className="h-10 w-full text-md mb-2"
                  />
                </div>

                <div className="space-y-4">
                  <InputField
                    // input={localState.nameIntermediary ?? ""}
                    value={localState.nameIntermediary ?? ""}
                    label="Bank Details"
                    placeholder="Intermediary Bank Name"
                    onBlur={createBlurHandler("nameIntermediary")}
                    handleInputChange={createInputHandler("nameIntermediary")}
                    className="h-10 w-full text-md mb-2"
                  />
                </div>

                <div className="space-y-4">
                  <div className="space-y-4 rounded-lg">
                    <InputField
                      // input={localState.streetAddressIntermediary ?? ""}
                      value={localState.streetAddressIntermediary ?? ""}
                      label="Bank Address"
                      placeholder="Street Address"
                      onBlur={createBlurHandler("streetAddressIntermediary")}
                      handleInputChange={createInputHandler(
                        "streetAddressIntermediary",
                      )}
                      className="h-10 w-full text-md mb-2"
                    />
                    <InputField
                      // input={localState.extendedAddressIntermediary ?? ""}
                      value={localState.extendedAddressIntermediary ?? ""}
                      placeholder="Extended Address"
                      onBlur={createBlurHandler("extendedAddressIntermediary")}
                      handleInputChange={createInputHandler(
                        "extendedAddressIntermediary",
                      )}
                      className="h-10 w-full text-md mb-2"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <InputField
                        // input={localState.cityIntermediary ?? ""}
                        value={localState.cityIntermediary ?? ""}
                        label="City"
                        placeholder="City"
                        onBlur={createBlurHandler("cityIntermediary")}
                        handleInputChange={createInputHandler(
                          "cityIntermediary",
                        )}
                        className="h-10 w-full text-md mb-2"
                      />
                      <div className="space-y-2">
                        {localState.countryIntermediary === "US" ? (
                          <>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                              State/Province
                            </label>
                            <Select
                              options={STATE_PROVINCE_OPTIONS}
                              value={localState.stateProvinceIntermediary ?? ""}
                              onChange={(value) => {
                                createBlurHandler("stateProvinceIntermediary")({
                                  target: { value: value as string },
                                } as React.FocusEvent<HTMLInputElement>);
                              }}
                              className="h-10 w-full text-md mb-2"
                              searchable={true}
                            />
                          </>
                        ) : (
                          <InputField
                            // input={localState.stateProvince ?? ""}
                            value={localState.stateProvinceIntermediary ?? ""}
                            label="State/Province"
                            placeholder="State/Province"
                            onBlur={createBlurHandler(
                              "stateProvinceIntermediary",
                            )}
                            handleInputChange={createInputHandler(
                              "stateProvince",
                            )}
                            className="h-10 w-full text-md mb-2"
                          />
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <InputField
                        // input={localState.postalCodeIntermediary ?? ""}
                        value={localState.postalCodeIntermediary ?? ""}
                        label="Postal Code"
                        placeholder="Postal Code"
                        onBlur={createBlurHandler("postalCodeIntermediary")}
                        handleInputChange={createInputHandler(
                          "postalCodeIntermediary",
                        )}
                        className="h-10 w-full text-md mb-2"
                      />
                      <CountryForm
                        label="Country"
                        country={localState.countryIntermediary ?? ""}
                        handleInputChange={createInputHandler(
                          "countryIntermediary",
                        )}
                        handleBlur={createBlurHandler("countryIntermediary")}
                        className="h-10 w-full text-md mb-2"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <InputField
                    // input={localState.memoIntermediary ?? ""}
                    value={localState.memoIntermediary ?? ""}
                    label="Memo"
                    placeholder="Memo"
                    onBlur={createBlurHandler("memoIntermediary")}
                    handleInputChange={createInputHandler("memoIntermediary")}
                    className="h-10 w-full text-md mb-2"
                  />
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  },
);
