import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BluetoothApiService {
  webSocket: WebSocket | undefined;

  async testConnection(serverAddress: string): Promise<boolean> {
    this.webSocket = new WebSocket(serverAddress);
    const result = await this.pollSocketState(this.webSocket);
    
    return result;
  }

  async pollSocketState(socket: WebSocket) {
    return new Promise<boolean>((resolve) => {
      let intervals = 10;
      setInterval(() => {
        if(intervals <= 0) {
          resolve(false);
        }

        const state = socket.readyState;

        if(state !== socket.OPEN) {
          intervals--;
        } else {
          resolve(true);
        }
      }, 500);
    });
  }

  async sendDataToWebsocket(value: number, part: string) {

  }
}