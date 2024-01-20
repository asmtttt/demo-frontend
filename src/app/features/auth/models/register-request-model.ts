export interface RegisterModel {
    usagePurpose: string;
    usageType: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    passwordAgain: string;
    isUsageRulesApproved: boolean;
    isContractApproved: boolean;
    roleType?: string;
    birthDate?: string;
    countryCode?: string;
    gsm?: string;
    [key: string]: string | boolean | undefined;
  }