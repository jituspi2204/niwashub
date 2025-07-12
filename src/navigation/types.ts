import { UserTypes } from "../types";

export type AuthStackParamList = {
  Login: undefined;
  Otp: {
    phoneNumber: string;
    verificationId: string;
    isEmulator?: boolean;
    otpFor: 'REGISTER' | 'FORGOT_PASSWORD';
  };
  Register: {
    registrationToken: string;
  };
  UserFlats : {
    loginToken : string,
    userDetails : any
  },
  ChangePassword : {
    forgotPasswordToken : string
  }
  
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
