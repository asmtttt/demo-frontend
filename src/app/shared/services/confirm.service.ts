import { Injectable } from '@angular/core';

export interface ConfirmOptions {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  danger?: boolean;
}

@Injectable({ providedIn: 'root' })
export class ConfirmService {
  options: ConfirmOptions | null = null;
  private resolveFn?: (v: boolean) => void;

  confirm(options: ConfirmOptions): Promise<boolean> {
    this.options = options;
    return new Promise(resolve => { this.resolveFn = resolve; });
  }

  resolve(value: boolean): void {
    this.options = null;
    this.resolveFn?.(value);
  }
}
