import { Injectable } from '@angular/core';

const CONNECTION_TEST_ENDPOINT = '/handshake';

@Injectable({ providedIn: 'root' })
export class BluetoothApiService {
  async testConnection(serverAddress: string): Promise<boolean> {
    let result = true;

    await fetch(serverAddress+CONNECTION_TEST_ENDPOINT).then((res) => {
      result = res.status === 200;
    }).catch(() => {
      result = false;
    });
    
    return result;
  }
}