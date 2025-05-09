export type AuthStackParamList = {
  Login: undefined;
  Otp: { phoneNumber: string };
  Register: undefined;
};

export type IncomeStackParamList = {
  AddBill: undefined;
  AddIncome: undefined;
  RecentTransactions: undefined;
};

export type ProfileStackParamList = {
  ProfileHome: undefined;
  MyAccount: undefined;
  Faq: undefined;
  PrivacyAndSecurity: undefined;
};

export type DashboardStackParamList = {
  Home: undefined;
  Statistics: undefined;
  Budgets: undefined;
  Settings: undefined;
};
