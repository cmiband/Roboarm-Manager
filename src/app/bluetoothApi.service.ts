import { Injectable } from '@angular/core';
import { LOCALHOST_SERVER_ADDRESS } from './constants';

@Injectable({ providedIn: 'root' })
export class DesktopApiService {
  async testConnection(): Promise<boolean> {
    let result = true;

    await fetch(LOCALHOST_SERVER_ADDRESS).catch((err) => {
        console.error(err);
        result = false;
    });

    return result;
  }
}