import { Component } from '@angular/core';
import { RegisterModel } from '../../models/register-request-model';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private translateService: TranslateService) {}

  registerModel: RegisterModel = { 
      usagePurpose: '',  
      usageType: '', 
      firstName: '', 
      lastName: '',
      email: '',
      phone: '',
      password: '',
      passwordAgain: '',
      isUsageRulesApproved: false,
      isContractApproved: false
  };

  currentLanguage: string = "tr";
  showEmptyFields = false;

  onRegister(){
    console.log("register model: ", this.registerModel);
    var emptyFields = this.getEmptyFields();

    if (emptyFields.length != 0 && emptyFields.length > 0 ) {
      this.showEmptyFields = true;
    }
    else {
      this.showEmptyFields = false;
      // bu kısımda register servisine istek atılacaktır.
    }
  }

  onUsageRulesCheckboxChange() {
    this.registerModel.isUsageRulesApproved = !this.registerModel.isUsageRulesApproved;
    console.log("Usage Rules checkbox changed: ", this.registerModel.isUsageRulesApproved);
  }

  onContractCheckboxChange() {
    this.registerModel.isContractApproved = !this.registerModel.isContractApproved;
    console.log("Contract checkbox changed: ", this.registerModel.isContractApproved);
  }

  clearRegisterRequestModel(){
    this.registerModel = { 
      usagePurpose: '',  
      usageType: '', 
      firstName: '', 
      lastName: '',
      email: '',
      phone: '',
      password: '',
      passwordAgain: '',
      isUsageRulesApproved: false,
      isContractApproved: false};
  }

  getEmptyFields() {
    var emptyFields: any = [];

    for (var key in this.registerModel) {
      if (this.registerModel.hasOwnProperty(key)) {
        var value = this.registerModel[key];
        if (value === '' || value === false) {
          emptyFields.push(key);
        }
      }
    }
    return emptyFields;
  }

  changeLanguage(lang: string): void {
    this.translateService.use(lang);
    this.currentLanguage = lang;
  }
}
