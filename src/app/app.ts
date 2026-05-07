import { Component, signal, computed, inject } from '@angular/core'
import { ConnectionCreator } from './connection-creator/connection-creator';
import { ArmManager } from './arm-manager/arm-manager';
import { AfterViewInit } from '@angular/core';
import { ConfigurationObject, RotationChangeEvent } from './constants';
import { BluetoothApiService } from './bluetoothApi.service';

const DEFAULT_CONFIG : ConfigurationObject = {
  socketAddress: ""
};

@Component({
  selector: 'app-root',
  imports: [ArmManager, ConnectionCreator],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements AfterViewInit{
  bluetoothServerAddress = '';
  config = signal<ConfigurationObject>(DEFAULT_CONFIG);
  bluetoothService = inject(BluetoothApiService);

  connectedToBluetoothService = computed(() => {
    //return this.config() !== undefined;
    return true;
  });

  ngAfterViewInit(): void {

  }

  async handleConfigChange(config: ConfigurationObject) {
    this.config.set(config);

    const isConnectionValid = await this.bluetoothService.testConnection(this.config().socketAddress);
  }

  async handleRotationChange(event: RotationChangeEvent) {

  }

  connectToBluetoothService() {
    
  }
}

