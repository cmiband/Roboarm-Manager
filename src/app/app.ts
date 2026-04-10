import { Component, signal } from '@angular/core'
import { ConnectionCreator } from './connection-creator/connection-creator';
import { AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [ConnectionCreator],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements AfterViewInit{
  bluetoothServerAddress = '';
  connectedToBluetoothService = signal(false);

  connectToBluetoothService() {

  }

  ngAfterViewInit(): void {
    const ws = new WebSocket("ws://localhost:8080/ws");

    ws.onopen = () => {
      console.log('connected');
    }

    
  }
}

