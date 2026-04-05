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
}
