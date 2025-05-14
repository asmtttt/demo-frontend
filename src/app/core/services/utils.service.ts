import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor() {}

  isNullOrEmpty(value: string | null | undefined): boolean {
    return !value || value.trim() === '';
  }

  isNullOrFalseOrEmpty(value: any): boolean {
    return value === false || value === null || value === undefined || value === '';
  }
  
}
