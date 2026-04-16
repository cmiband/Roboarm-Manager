import { Component, signal } from '@angular/core'
import { ConnectionCreator } from './connection-creator/connection-creator';
import { ArmManager } from './arm-manager/arm-manager';
import { AfterViewInit } from '@angular/core';
import { ConfigurationObject } from './constants';

@Component({
  selector: 'app-root',
  imports: [ArmManager, ConnectionCreator],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements AfterViewInit{
  bluetoothServerAddress = '';
  connectedToBluetoothService = signal(false);
  config = signal<ConfigurationObject | undefined>(undefined);

  ngAfterViewInit(): void {
  }

  async handleConfigChange(config: ConfigurationObject) {
    this.config.set(config);

    console.log(this.config);
  }

  connectToBluetoothService() {
    
  }
}

