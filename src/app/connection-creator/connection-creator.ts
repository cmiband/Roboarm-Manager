import { Component, inject, signal, output, computed } from '@angular/core';
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
  serverAddress = '';
  showValidationError = signal(false);
  fileLoaded = signal(false);
  fileName = signal('');
  parsedAddress = signal('');
  configChange = output<ConfigurationObject>();

  bluetoothService = inject(BluetoothApiService);

  private pendingConfig: ConfigurationObject | null = null;

  handleFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length === 1) {
      this.deserializeConfigFile(input);
    }
  }

  async deserializeConfigFile(fileInput: HTMLInputElement) {
    if (!fileInput.files || !fileInput.files.length) return;

    const file = fileInput.files[0];
    const content = await file.text();
    const configuration = this.parseFileIntoObject(content);

    this.fileName.set(file.name);
    this.pendingConfig = configuration;

    if (configuration.socketAddress) {
      this.parsedAddress.set(configuration.socketAddress.trim());
      this.fileLoaded.set(true);
      this.showValidationError.set(false);
    } else {
      this.showValidationError.set(true);
      this.fileLoaded.set(false);
    }
  }

  emitConfig() {
    if (this.pendingConfig) {
      this.configChange.emit(this.pendingConfig);
    }
  }

  parseFileIntoObject(fileContent: string): ConfigurationObject {
    const lines = fileContent.split('\n');
    const configObject: ConfigurationObject = { socketAddress: '' };
    lines.forEach((line) => {
      const [key, value] = line.split('=');
      if (key && value !== undefined) {
        (configObject as any)[key.trim()] = value.trim();
      }
    });
    return configObject;
  }
}
