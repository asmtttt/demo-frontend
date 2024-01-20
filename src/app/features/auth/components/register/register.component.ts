import { Component } from '@angular/core';
import { RegisterModel } from '../../models/register-request-model';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

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
      isContractApproved: false};

  onRegister(){
    console.log("register model: ", this.registerModel);
    
  }

  onUsageRulesCheckboxChange() {
    this.registerModel.isUsageRulesApproved = !this.registerModel.isUsageRulesApproved;
    console.log("Usage Rules checkbox changed: ", this.registerModel.isUsageRulesApproved);
  }

  onContractCheckboxChange() {
    this.registerModel.isContractApproved = !this.registerModel.isContractApproved;
    console.log("Contract checkbox changed: ", this.registerModel.isContractApproved);
  }
}
