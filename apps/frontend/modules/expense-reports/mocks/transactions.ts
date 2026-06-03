import {
  AccountTransactionDirection,
  AccountTransactionFlowType,
  SnapAccountType,
  type SnapshotAccount,
  type SnapshotAccountTransaction,
} from '@/modules/__generated__/graphql/switchboard-generated'

export const mockTransactions: SnapshotAccountTransaction[] = [
  {
    __typename: 'SnapshotAccountTransaction',
    id: 'tx-001',
    datetime: '2025-08-15T10:00:00Z',
    txHash: '0xa1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2',
    amount: {
      __typename: 'TxAmount',
      value: -50000,
      unit: 'DAI',
    },
    counterParty: '0xbe8e3e3717276148e4e706f6df491a72dd4bc3ee',
    counterPartyName: 'Powerhouse Operational Wallet',
    flowType: AccountTransactionFlowType.Internal,
    direction: AccountTransactionDirection.Outflow,
  },
  {
    __typename: 'SnapshotAccountTransaction',
    id: 'tx-002',
    datetime: '2025-07-10T08:30:00Z',
    txHash: '0xd4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5',
    amount: {
      __typename: 'TxAmount',
      value: 100000,
      unit: 'DAI',
    },
    counterParty: '0x87207315bf5b6e6d5a2e0f9cf5e4e5f6a1b2c3d4',
    counterPartyName: 'Sky Protocol',
    flowType: AccountTransactionFlowType.TopUp,
    direction: AccountTransactionDirection.Inflow,
  },
  {
    __typename: 'SnapshotAccountTransaction',
    id: 'tx-003',
    datetime: '2025-06-20T14:00:00Z',
    txHash: '0xf6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1',
    amount: {
      __typename: 'TxAmount',
      value: -30000,
      unit: 'DAI',
    },
    counterParty: '0xc3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4',
    counterPartyName: 'Core Dev Team',
    flowType: AccountTransactionFlowType.Internal,
    direction: AccountTransactionDirection.Outflow,
  },
]

export const mockReserveAccount: SnapshotAccount = {
  __typename: 'SnapshotAccount',
  id: 'account-001',
  name: 'Operational Wallet',
  address: '0xbe8e3e3717276148e4e706f6df491a72dd4bc3ee',
  type: SnapAccountType.Source,
  balances: [
    {
      __typename: 'SnapshotAccountBalance',
      startingBalance: 500000,
      endingBalance: 420000,
      token: {
        __typename: 'Token',
        symbol: 'DAI',
        contractAddress: '0x6b175474e89094c44da98b954eedeac495271d0f',
      },
    },
  ],
  transactions: mockTransactions,
}
