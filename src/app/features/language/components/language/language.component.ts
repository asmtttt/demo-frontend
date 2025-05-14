import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { PageService } from 'src/app/core/services/page.service';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css']
})
export class LanguageComponent implements OnInit {

  currentLanguage: string = "tr";

  constructor(private translateService: TranslateService, private fb: FormBuilder,
      private pageService: PageService) {
  
    }
  
    ngOnInit(): void {
      localStorage.setItem('language', this.currentLanguage);
  }

  changeLanguage(lang: string): void {
    this.translateService.use(lang);
    this.currentLanguage = lang;
    localStorage.setItem('language', lang);

  }

}
