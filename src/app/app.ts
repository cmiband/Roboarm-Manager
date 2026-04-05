import { Component, signal } from '@angular/core'
import { ConnectionCreator } from './connection-creator/connection-creator';

@Component({
  selector: 'app-root',
  imports: [ConnectionCreator],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  bluetoothServerAddress = '';
  connectedToBluetoothService = signal(false);

  connectToBluetoothService() {

  }

}

