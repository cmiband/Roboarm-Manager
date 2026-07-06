import { Component, signal, computed, inject } from '@angular/core'
import { ConnectionCreator } from './connection-creator/connection-creator';
import { ArmManager } from './arm-manager/arm-manager';
import { AfterViewInit } from '@angular/core';
import { ConfigurationObject, RotationChangeEvent } from './constants';
import { BluetoothApiService } from './bluetoothApi.service';

const DEFAULT_CONFIG : ConfigurationObject = {
  serverAddress: '',
  socketEndpoint: '',
  port: ''
};

@Component({
  selector: 'app-root',
  imports: [ArmManager, ConnectionCreator],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  config = signal<ConfigurationObject>(DEFAULT_CONFIG);
  bluetoothService = inject(BluetoothApiService);

  connectedToBluetoothService = signal(false);
  errorMessage = signal("");
  showErrorMessage = computed(() => {
    return this.errorMessage() !== '';
  });
  socketAddress = computed(() => {
    return this.config().serverAddress+':'+this.config().port+'/'+this.config().socketEndpoint;
  });

  async handleConfigChange(config: ConfigurationObject) {
    this.config.set(config);

    const isConnectionValid = await this.bluetoothService.testConnection(this.socketAddress());
    if(isConnectionValid) {
      this.connectedToBluetoothService.set(true);
    } else {
      this.errorMessage.set('Error occured during connection phase! Verify the configuration file.');
    }
  }

  async handleRotationChange(event: RotationChangeEvent) {
    console.log('data send');
    this.bluetoothService.sendDataToWebsocket(event.value, event.part);
  }
}

