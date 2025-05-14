import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { MessageService } from 'src/app/core/services/message.service';
import { PageService } from 'src/app/core/services/page.service';
import { GetUserRequestModel } from 'src/app/features/profile/models/get-user-request-model';
import { User } from '../../models/get-user-response-model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  
  localStorage: any;
  result: any;
  user: User | undefined;
  
  constructor(private authService: AuthService, private translateService: TranslateService, 
      private messageService: MessageService, private router: Router, private pageService: PageService) { }
    
      

  ngOnInit(): void {
    this.getUser();
  }

  getUser(){
    this.localStorage = this.authService.getLocalStorage();
    var requestModel = {
      "user_id": this.localStorage.user_id,
      "username": this.localStorage.username,

    }

    console.log("requestModel: ", requestModel);

    this.pageService.getUser(requestModel).subscribe({
      next: (response) => {
        this.user = response.result[0];  
        console.log("user: ", this.user);
              
      },
      error: (error) => {
      }
    });
  }

 

  
}
