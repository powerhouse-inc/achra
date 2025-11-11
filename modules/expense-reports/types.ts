export enum CommonTabSection {
  ACCOUNT_SNAPSHOT = 'account-snapshot',
}

export enum DefaultTabSection {
  ACTUALS = 'actuals',
}

export enum AuditorTabSection {
  EXPENSE_REPORTS = 'expense-reports',
}

export type TabSection = CommonTabSection | DefaultTabSection | AuditorTabSection

export enum ViewMode {
  DEFAULT = 'default',
  AUDITOR = 'auditor',
}
