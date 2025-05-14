import { Gender } from "src/app/core/enums/Gender";
import { LocationType } from "src/app/core/enums/LocationType";
import { UserType } from "src/app/core/enums/UserType";

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
    birthDate?: string;
    countryCode?: string;
    gsm?: string;
    [key: string]: string | boolean | undefined;
  }

  export interface RegisterRequestModel {
    Name: string;
    LastName: string;
    UserName: string;
    Mail: string;
    Password: string;
    Phone: string;
    Gender: Gender;
    BirthDate: Date;
    LocationName: string;
    LocationType: LocationType;
    Country: string;
    City: string;
    District: string;
    ZipCode: number;
    AddressText: string;
    IsUsageRulesConfirm: boolean;
    IsContractConfirm: boolean;

  }
  