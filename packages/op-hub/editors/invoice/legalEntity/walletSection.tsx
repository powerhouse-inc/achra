import { type ComponentProps, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import type { EditLegalEntityWalletInput } from "./legalEntity.js";
import { InputField } from "../components/inputField.js";
import type { ValidationResult } from "../validation/validationManager.js";
import { Select } from "@powerhousedao/document-engineering";
import { getAllChainConfigs } from "../utils/utils.js";

export type LegalEntityWalletSectionProps = Omit<
  ComponentProps<"div">,
  "children" | "onChange"
> & {
  readonly value: EditLegalEntityWalletInput;
  readonly onChange: (value: EditLegalEntityWalletInput) => void;
  readonly disabled?: boolean;
  readonly currency: string;
  readonly status: string;
  readonly walletvalidation?: ValidationResult | null;
  readonly chainvalidation?: ValidationResult | null;
};

export const LegalEntityWalletSection = (
  props: LegalEntityWalletSectionProps,
) => {
  const {
    value,
    onChange,
    disabled,
    currency,
    status,
    walletvalidation,
    chainvalidation,
    ...divProps
  } = props;
  const [localState, setLocalState] = useState(value);

  useEffect(() => {
    setLocalState(value);
  }, [value]);

  const handleInputChange = (
    field: keyof EditLegalEntityWalletInput,
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setLocalState((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleBlur = (
    field: keyof EditLegalEntityWalletInput,
    event: React.FocusEvent<HTMLTextAreaElement>,
  ) => {
    const newValue = event.target.value;
    onChange({
      // ...localState,
      [field]: newValue,
    });
  };

  const CHAIN_PRESETS = getAllChainConfigs().map((config) => ({
    chainName: config.chainName,
    chainId: config.chainId,
  }));

  // Map CHAIN_PRESETS to Select options
  const chainOptions = CHAIN_PRESETS.map((preset) => ({
    label: preset.chainName,
    value: preset.chainId,
  }));

  // Find the selected option by chainId
  const selectedChain = chainOptions.find(
    (opt) => opt.value === localState.chainId,
  )?.value;

  const handleChainChange = (value: string | string[]) => {
    const chainId = Array.isArray(value) ? value[0] : value;
    const preset = CHAIN_PRESETS.find((p) => p.chainId === chainId);
    if (preset) {
      setLocalState((prev) => ({
        ...prev,
        chainId: preset.chainId,
        chainName: preset.chainName,
      }));
      onChange({
        ...localState,
        chainId: preset.chainId,
        chainName: preset.chainName,
      });
    }
  };

  return (
    <div
      {...divProps}
      className={twMerge(
        "rounded-lg border border-gray-200 bg-white p-6",
        props.className,
      )}
    >
      <div className="grid grid-cols-2 gap-4 items-center">
        <h3 className="mb-4 text-lg font-semibold text-black-200">
          Wallet Information
        </h3>
        <div>
          <Select
            style={{ width: "100%" }}
            options={chainOptions}
            value={selectedChain || ""}
            onChange={handleChainChange}
            placeholder="Select Chain"
          />
          {chainvalidation && !chainvalidation.isValid && (
            <p className="mt-1 text-xs text-yellow-600">
              {chainvalidation.message}
            </p>
          )}
        </div>
      </div>
      <div className="space-y-6">
        <div className="space-y-4">
          <InputField
            value={localState.address ?? ""}
            label="Wallet Address"
            placeholder="0x..."
            onBlur={(e) => handleBlur("address", e)}
            handleInputChange={(e) => handleInputChange("address", e)}
            validation={walletvalidation}
          />
        </div>
      </div>
    </div>
  );
};
