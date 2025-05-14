import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  currentLanguage: string | null | undefined;

  constructor(private authService: AuthService, private translateService: TranslateService, private router: Router) {
    
  }
  ngOnInit(): void {
    this.currentLanguage = localStorage.getItem('language');
  }

  onLogOut() {
    this.authService.logout(); 
  }

  changeLanguage(lang: string): void {
    this.translateService.use(lang);
    this.currentLanguage = lang;
    localStorage.setItem('language', lang);

  }

  navigateToPage(name: string): void {
    this.router.navigate([name]);
  }
  
}
