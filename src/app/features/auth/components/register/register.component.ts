import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PageService } from 'src/app/core/services/page.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { RegisterRequestModel } from '../../models/register-request-model';
import { GENDER_OPTIONS } from 'src/app/core/enums/Gender';
import { LOCATION_TYPE_OPTIONS } from 'src/app/core/enums/LocationType';
import { USER_TYPE_OPTIONS } from 'src/app/core/enums/UserType';
import { UtilsService } from 'src/app/core/services/utils.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  signUpForm: any;
  showError: boolean = false;
  errMsg: string = "";

  genderOptions = GENDER_OPTIONS;
  locationTypeOptions = LOCATION_TYPE_OPTIONS;
  userTypeOptions = USER_TYPE_OPTIONS;
  
  constructor(private cdr: ChangeDetectorRef, private translateService: TranslateService, private fb: FormBuilder,
    private pageService: PageService, private authService: AuthService, private utilsService: UtilsService) {

  }

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      Name: new FormControl("", [
        Validators.required
      ]),
      LastName: new FormControl("", [
        Validators.required
      ]),
      UserName: new FormControl("", [
        Validators.required
      ]),
      Mail: new FormControl("", [
        Validators.required,
        Validators.maxLength(128),
        Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
      ]),
      Password: new FormControl("", [
        Validators.required
      ]),
      PasswordAgain: new FormControl("", [
        Validators.required
      ]),
      Phone: new FormControl("", [
        Validators.required
      ]),
      Gender: new FormControl("", [
        Validators.required
      ]),
      BirthDate: new FormControl("", [
        Validators.required
      ]),
      Country: new FormControl("", [
        Validators.required
      ]),
      City: new FormControl("", [
        Validators.required
      ]),
      District: new FormControl("", [
        Validators.required
      ]),
      ZipCode: new FormControl("", [
        Validators.required
      ]),
      LocationName: new FormControl("", [
        Validators.required
      ]),
      LocationType: new FormControl("", [
        Validators.required
      ]),
      AddressText: new FormControl("", [
        Validators.required
      ]),
      IsUsageRulesConfirm: new FormControl("", [
        Validators.required
      ]),
      IsContractConfirm: new FormControl("", [
        Validators.required
      ])
    });

    this.signUpForm.get('password')?.valueChanges.subscribe(() => {
      this.signUpForm.get('passwordAgain')?.updateValueAndValidity();
    });
  }

  currentLanguage: string = "tr";
  showEmptyFields = false;

  changeLanguage(lang: string): void {
    this.translateService.use(lang);
    this.currentLanguage = lang;
  }

  matchPassword(control: FormControl): { [key: string]: boolean } | null {
    if (this.signUpForm) {
      const password = this.signUpForm.get('password')?.value;
      const passwordAgain = control.value;

      return password === passwordAgain ? null : { 'passwordMismatch': true };
    }
    return { 'passwordMismatch': false };
  }


  onSubmit(): void {
    this.errMsg = "";

    console.log("this signupform: ", this.signUpForm );
    this.utilsService.isNullOrFalseOrEmpty(this.signUpForm.value.IsUsageRulesConfirm)
    this.utilsService.isNullOrFalseOrEmpty(this.signUpForm.value.IsContractConfirm)

    if (this.signUpForm.invalid || !this.isValidContracts(this.signUpForm.value.IsUsageRulesConfirm, this.signUpForm.value.IsContractConfirm, )) {
      this.showError = true;
      this.errMsg = this.translateService.instant("VALIDATION_ERROR_ALL_FIELDS")
            
      return;
    }
    
    const request: RegisterRequestModel = this.signUpForm.value;
    request.BirthDate = new Date(this.signUpForm.value.BirthDate);
    
    this.authService.register(request).subscribe({
      next: (result) => {
        if (result.result_code === 200){
          this.showError = false;
        }
        else { 
          this.showError = true;
        }

        this.errMsg = this.translateService.instant(result.result_message)
      },
      error: (err) => {
        this.showError = true;
        this.errMsg = this.translateService.instant("ERROR_DURING_PROCESS");;

      }
    });
  }

  isValidContracts(isUsageRulesConfirm: any, isContractConfirm: any){
    return !this.utilsService.isNullOrFalseOrEmpty(isUsageRulesConfirm) || !this.utilsService.isNullOrFalseOrEmpty(isContractConfirm)
  }
}