import { executeTransferProposal } from "./gnosisTransactionBuilder.js";
import dotenv from "dotenv";
dotenv.config();

async function testBatchTransfer() {
  try {
    const payerWallet = {
      rpc: "https://mainnet.base.org", // Base mainnet RPC
      chainName: "Base",
      chainId: "8453",
      address: "0x1FB6bEF04230d67aF0e3455B997a28AFcCe1F45e",
    };

    const paymentDetails = [
      {
        payeeWallet: {
          address: "0x48f208afD0Abeacd4e7C8839Ea19e3CcCF0433DE",
        },
        token: {
          symbol: "USDS",
          evmAddress: "0x820C137fa70C8691f0e44Dc420a5e53c168921Dc",
          decimals: 6,
        },
        amount: "10",
      },
      {
        payeeWallet: {
          address: "0x48f208afD0Abeacd4e7C8839Ea19e3CcCF0433DE",
        },
        token: {
          symbol: "USDS",
          evmAddress: "0x820C137fa70C8691f0e44Dc420a5e53c168921Dc",
          decimals: 6,
        },
        amount: "15.5",
      },
    ];

    const result = await executeTransferProposal(
      payerWallet.chainName,
      paymentDetails,
    );
    console.log("\n✅ Batch transaction proposed successfully:");
    console.log(result);
  } catch (err) {
    console.error("\n❌ Batch transaction test failed:", err);
  }
}

testBatchTransfer();
