import type { InvoicePartiesOperations } from "document-models/invoice/v1";

function getStateValue<T>(
  input: T | undefined,
  currentValue: T | null,
): T | null {
  return input === undefined ? currentValue : input;
}

export const invoicePartiesOperations: InvoicePartiesOperations = {
  editIssuerOperation(state, action) {
    if (
      "address" in state.issuer &&
      ("city" in action.input ||
        "country" in action.input ||
        "extendedAddress" in action.input ||
        "postalCode" in action.input ||
        "stateProvince" in action.input ||
        "streetAddress" in action.input)
    ) {
      state.issuer.address = {
        ...state.issuer.address,
        city:
          action.input.city !== undefined
            ? action.input.city
            : (state.issuer.address?.city ?? null),
        country:
          action.input.country !== undefined
            ? action.input.country
            : (state.issuer.address?.country ?? null),
        extendedAddress:
          action.input.extendedAddress !== undefined
            ? action.input.extendedAddress
            : (state.issuer.address?.extendedAddress ?? null),
        postalCode:
          action.input.postalCode !== undefined
            ? action.input.postalCode
            : (state.issuer.address?.postalCode ?? null),
        stateProvince:
          action.input.stateProvince !== undefined
            ? action.input.stateProvince
            : (state.issuer.address?.stateProvince ?? null),
        streetAddress:
          action.input.streetAddress !== undefined
            ? action.input.streetAddress
            : (state.issuer.address?.streetAddress ?? null),
      };
    }

    if (
      "contactInfo" in state.issuer &&
      ("tel" in action.input || "email" in action.input)
    ) {
      state.issuer.contactInfo = {
        ...state.issuer.contactInfo,
        tel:
          action.input.tel !== undefined
            ? action.input.tel
            : (state.issuer.contactInfo?.tel ?? null),
        email:
          action.input.email !== undefined
            ? action.input.email
            : (state.issuer.contactInfo?.email ?? null),
      };
    }

    if ("country" in action.input) {
      state.issuer.country =
        action.input.country !== undefined
          ? action.input.country
          : (state.issuer.country ?? null);
    }
    if ("id" in action.input) {
      state.issuer.id = action.input.id
        ? { corpRegId: action.input.id, taxId: null }
        : null;
    }
    if ("name" in action.input) {
      state.issuer.name =
        action.input.name !== undefined
          ? action.input.name
          : (state.issuer.name ?? null);
    }
  },
  editIssuerBankOperation(state, action) {
    if (!state.issuer.paymentRouting) {
      state.issuer.paymentRouting = {
        bank: null,
        wallet: null,
      };
    }

    state.issuer.paymentRouting.bank = {
      ABA: getStateValue(
        action.input.ABA,
        state.issuer.paymentRouting.bank?.ABA ?? null,
      ),
      BIC: getStateValue(
        action.input.BIC,
        state.issuer.paymentRouting.bank?.BIC ?? null,
      ),
      SWIFT: getStateValue(
        action.input.SWIFT,
        state.issuer.paymentRouting.bank?.SWIFT ?? null,
      ),
      accountNum:
        action.input.accountNum ??
        state.issuer.paymentRouting.bank?.accountNum ??
        "",
      accountType: getStateValue(
        action.input.accountType,
        state.issuer.paymentRouting.bank?.accountType ?? null,
      ),
      address: {
        city: getStateValue(
          action.input.city,
          state.issuer.paymentRouting.bank?.address.city ?? null,
        ),
        country: getStateValue(
          action.input.country,
          state.issuer.paymentRouting.bank?.address.country ?? null,
        ),
        extendedAddress: getStateValue(
          action.input.extendedAddress,
          state.issuer.paymentRouting.bank?.address.extendedAddress ?? null,
        ),
        postalCode: getStateValue(
          action.input.postalCode,
          state.issuer.paymentRouting.bank?.address.postalCode ?? null,
        ),
        stateProvince: getStateValue(
          action.input.stateProvince,
          state.issuer.paymentRouting.bank?.address.stateProvince ?? null,
        ),
        streetAddress: getStateValue(
          action.input.streetAddress,
          state.issuer.paymentRouting.bank?.address.streetAddress ?? null,
        ),
      },
      beneficiary: getStateValue(
        action.input.beneficiary,
        state.issuer.paymentRouting.bank?.beneficiary ?? null,
      ),
      name: action.input.name ?? state.issuer.paymentRouting.bank?.name ?? "",
      memo: getStateValue(
        action.input.memo,
        state.issuer.paymentRouting.bank?.memo ?? null,
      ),
      intermediaryBank: {
        ABA: getStateValue(
          action.input.ABAIntermediary,
          state.issuer.paymentRouting.bank?.intermediaryBank?.ABA ?? null,
        ),
        BIC: getStateValue(
          action.input.BICIntermediary,
          state.issuer.paymentRouting.bank?.intermediaryBank?.BIC ?? null,
        ),
        SWIFT: getStateValue(
          action.input.SWIFTIntermediary,
          state.issuer.paymentRouting.bank?.intermediaryBank?.SWIFT ?? null,
        ),
        accountNum:
          action.input.accountNumIntermediary ??
          state.issuer.paymentRouting.bank?.intermediaryBank?.accountNum ??
          "",
        accountType: getStateValue(
          action.input.accountTypeIntermediary,
          state.issuer.paymentRouting.bank?.intermediaryBank?.accountType ??
            null,
        ),
        address: {
          city: getStateValue(
            action.input.cityIntermediary,
            state.issuer.paymentRouting.bank?.intermediaryBank?.address.city ??
              null,
          ),
          country: getStateValue(
            action.input.countryIntermediary,
            state.issuer.paymentRouting.bank?.intermediaryBank?.address
              .country ?? null,
          ),
          extendedAddress: getStateValue(
            action.input.extendedAddressIntermediary,
            state.issuer.paymentRouting.bank?.intermediaryBank?.address
              .extendedAddress ?? null,
          ),
          postalCode: getStateValue(
            action.input.postalCodeIntermediary,
            state.issuer.paymentRouting.bank?.intermediaryBank?.address
              .postalCode ?? null,
          ),
          stateProvince: getStateValue(
            action.input.stateProvinceIntermediary,
            state.issuer.paymentRouting.bank?.intermediaryBank?.address
              .stateProvince ?? null,
          ),
          streetAddress: getStateValue(
            action.input.streetAddressIntermediary,
            state.issuer.paymentRouting.bank?.intermediaryBank?.address
              .streetAddress ?? null,
          ),
        },
        beneficiary: getStateValue(
          action.input.beneficiaryIntermediary,
          state.issuer.paymentRouting.bank?.intermediaryBank?.beneficiary ??
            null,
        ),
        name:
          action.input.nameIntermediary ??
          state.issuer.paymentRouting.bank?.intermediaryBank?.name ??
          "",
        memo: getStateValue(
          action.input.memoIntermediary,
          state.issuer.paymentRouting.bank?.intermediaryBank?.memo ?? null,
        ),
      },
    };
  },
  editIssuerWalletOperation(state, action) {
    if (!state.issuer.paymentRouting) {
      state.issuer.paymentRouting = {
        bank: null,
        wallet: null,
      };
    }

    state.issuer.paymentRouting.wallet = {
      address:
        action.input.address ??
        state.issuer.paymentRouting.wallet?.address ??
        null,
      chainId:
        action.input.chainId ??
        state.issuer.paymentRouting.wallet?.chainId ??
        null,
      chainName:
        action.input.chainName ??
        state.issuer.paymentRouting.wallet?.chainName ??
        null,
      rpc: action.input.rpc ?? state.issuer.paymentRouting.wallet?.rpc ?? null,
    };
  },
  editPayerOperation(state, action) {
    if (
      "address" in state.payer &&
      ("city" in action.input ||
        "country" in action.input ||
        "extendedAddress" in action.input ||
        "postalCode" in action.input ||
        "stateProvince" in action.input ||
        "streetAddress" in action.input)
    ) {
      state.payer.address = {
        ...state.payer.address,
        city:
          action.input.city !== undefined
            ? action.input.city
            : (state.payer.address?.city ?? null),
        country:
          action.input.country !== undefined
            ? action.input.country
            : (state.payer.address?.country ?? null),
        extendedAddress:
          action.input.extendedAddress !== undefined
            ? action.input.extendedAddress
            : (state.payer.address?.extendedAddress ?? null),
        postalCode:
          action.input.postalCode !== undefined
            ? action.input.postalCode
            : (state.payer.address?.postalCode ?? null),
        stateProvince:
          action.input.stateProvince !== undefined
            ? action.input.stateProvince
            : (state.payer.address?.stateProvince ?? null),
        streetAddress:
          action.input.streetAddress !== undefined
            ? action.input.streetAddress
            : (state.payer.address?.streetAddress ?? null),
      };
    }

    if (
      "contactInfo" in state.payer &&
      ("tel" in action.input || "email" in action.input)
    ) {
      state.payer.contactInfo = {
        ...state.payer.contactInfo,
        tel:
          action.input.tel !== undefined
            ? action.input.tel
            : (state.payer.contactInfo?.tel ?? null),
        email:
          action.input.email !== undefined
            ? action.input.email
            : (state.payer.contactInfo?.email ?? null),
      };
    }

    if ("country" in action.input) {
      state.payer.country =
        action.input.country !== undefined
          ? action.input.country
          : (state.payer.country ?? null);
    }
    if ("id" in action.input) {
      state.payer.id = action.input.id
        ? { taxId: action.input.id, corpRegId: null }
        : null;
    }
    if ("name" in action.input) {
      state.payer.name =
        action.input.name !== undefined
          ? action.input.name
          : (state.payer.name ?? null);
    }
  },
  editPayerBankOperation(state, action) {
    if (!state.payer.paymentRouting) {
      state.payer.paymentRouting = {
        bank: null,
        wallet: null,
      };
    }

    state.payer.paymentRouting.bank = {
      ABA: getStateValue(
        action.input.ABA,
        state.payer.paymentRouting.bank?.ABA ?? null,
      ),
      BIC: getStateValue(
        action.input.BIC,
        state.payer.paymentRouting.bank?.BIC ?? null,
      ),
      SWIFT: getStateValue(
        action.input.SWIFT,
        state.payer.paymentRouting.bank?.SWIFT ?? null,
      ),
      accountNum:
        action.input.accountNum ??
        state.payer.paymentRouting.bank?.accountNum ??
        "",
      accountType: getStateValue(
        action.input.accountType,
        state.payer.paymentRouting.bank?.accountType ?? null,
      ),
      address: {
        city: getStateValue(
          action.input.city,
          state.payer.paymentRouting.bank?.address.city ?? null,
        ),
        country: getStateValue(
          action.input.country,
          state.payer.paymentRouting.bank?.address.country ?? null,
        ),
        extendedAddress: getStateValue(
          action.input.extendedAddress,
          state.payer.paymentRouting.bank?.address.extendedAddress ?? null,
        ),
        postalCode: getStateValue(
          action.input.postalCode,
          state.payer.paymentRouting.bank?.address.postalCode ?? null,
        ),
        stateProvince: getStateValue(
          action.input.stateProvince,
          state.payer.paymentRouting.bank?.address.stateProvince ?? null,
        ),
        streetAddress: getStateValue(
          action.input.streetAddress,
          state.payer.paymentRouting.bank?.address.streetAddress ?? null,
        ),
      },
      beneficiary: getStateValue(
        action.input.beneficiary,
        state.payer.paymentRouting.bank?.beneficiary ?? null,
      ),
      name: action.input.name ?? state.payer.paymentRouting.bank?.name ?? "",
      memo: getStateValue(
        action.input.memo,
        state.payer.paymentRouting.bank?.memo ?? null,
      ),
      intermediaryBank: {
        ABA: getStateValue(
          action.input.ABAIntermediary,
          state.payer.paymentRouting.bank?.intermediaryBank?.ABA ?? null,
        ),
        BIC: getStateValue(
          action.input.BICIntermediary,
          state.payer.paymentRouting.bank?.intermediaryBank?.BIC ?? null,
        ),
        SWIFT: getStateValue(
          action.input.SWIFTIntermediary,
          state.payer.paymentRouting.bank?.intermediaryBank?.SWIFT ?? null,
        ),
        accountNum:
          action.input.accountNumIntermediary ??
          state.payer.paymentRouting.bank?.intermediaryBank?.accountNum ??
          "",
        accountType: getStateValue(
          action.input.accountTypeIntermediary,
          state.payer.paymentRouting.bank?.intermediaryBank?.accountType ??
            null,
        ),
        address: {
          city: getStateValue(
            action.input.cityIntermediary,
            state.payer.paymentRouting.bank?.intermediaryBank?.address.city ??
              null,
          ),
          country: getStateValue(
            action.input.countryIntermediary,
            state.payer.paymentRouting.bank?.intermediaryBank?.address
              .country ?? null,
          ),
          extendedAddress: getStateValue(
            action.input.extendedAddressIntermediary,
            state.payer.paymentRouting.bank?.intermediaryBank?.address
              .extendedAddress ?? null,
          ),
          postalCode: getStateValue(
            action.input.postalCodeIntermediary,
            state.payer.paymentRouting.bank?.intermediaryBank?.address
              .postalCode ?? null,
          ),
          stateProvince: getStateValue(
            action.input.stateProvinceIntermediary,
            state.payer.paymentRouting.bank?.intermediaryBank?.address
              .stateProvince ?? null,
          ),
          streetAddress: getStateValue(
            action.input.streetAddressIntermediary,
            state.payer.paymentRouting.bank?.intermediaryBank?.address
              .streetAddress ?? null,
          ),
        },
        beneficiary: getStateValue(
          action.input.beneficiaryIntermediary,
          state.payer.paymentRouting.bank?.intermediaryBank?.beneficiary ??
            null,
        ),
        name:
          action.input.nameIntermediary ??
          state.payer.paymentRouting.bank?.intermediaryBank?.name ??
          "",
        memo: getStateValue(
          action.input.memoIntermediary,
          state.payer.paymentRouting.bank?.intermediaryBank?.memo ?? null,
        ),
      },
    };
  },
  editPayerWalletOperation(state, action) {
    if (!state.payer.paymentRouting) {
      state.payer.paymentRouting = {
        bank: null,
        wallet: null,
      };
    }

    state.payer.paymentRouting.wallet = {
      address:
        action.input.address ??
        state.payer.paymentRouting.wallet?.address ??
        null,
      chainId:
        action.input.chainId ??
        state.payer.paymentRouting.wallet?.chainId ??
        null,
      chainName:
        action.input.chainName ??
        state.payer.paymentRouting.wallet?.chainName ??
        null,
      rpc: action.input.rpc ?? state.payer.paymentRouting.wallet?.rpc ?? null,
    };
  },
};
