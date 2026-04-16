import { Component, inject, signal, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BluetoothApiService } from '../bluetoothApi.service';
import { ConfigurationObject } from '../constants';

@Component({
  selector: 'app-connection-creator',
  imports: [FormsModule],
  templateUrl: './connection-creator.html',
  styleUrl: './connection-creator.css',
})
export class ConnectionCreator {
  serverAddress = "";
  showValidationError = signal(false);
  configChange = output<ConfigurationObject>();

  bluetoothService = inject(BluetoothApiService);

  handleFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    
    if(input.files?.length === 1) {
      this.deserializeConfigFile(input)
    }
  }

  async deserializeConfigFile(fileInput: HTMLInputElement) {
    if(!fileInput.files || !fileInput.files.length) {
      return;
    }

    const file = fileInput.files[0];
    const content = await file.text();
   
    const configuration = this.parseFileIntoObject(content);
    this.configChange.emit(configuration);
    console.log(content);
  }

  parseFileIntoObject(fileContent: string) : ConfigurationObject {
    const lines = fileContent.split("\n");
    
    const configObject : ConfigurationObject = {
      socketAddress: ""
    };
    lines.forEach((line) => {
      const [key, value] = line.split("=");

      (configObject as any)[key] = value;
    });
    console.log(lines);
    console.log(configObject);

    return configObject;
  }
}
