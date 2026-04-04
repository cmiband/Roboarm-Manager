import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DesktopApiService {
  async testConnection(): Promise<boolean> {
    let result = true;

    
    return result;
  }
}