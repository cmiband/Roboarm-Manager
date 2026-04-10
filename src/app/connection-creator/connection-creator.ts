import { Component, inject, signal, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BluetoothApiService } from '../bluetoothApi.service';

@Component({
  selector: 'app-connection-creator',
  imports: [FormsModule],
  templateUrl: './connection-creator.html',
  styleUrl: './connection-creator.css',
})
export class ConnectionCreator {
  serverAddress = "";
  showValidationError = signal(false);

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
   
    console.log(content);
  }
}
