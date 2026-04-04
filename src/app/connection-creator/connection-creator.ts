import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-connection-creator',
  imports: [FormsModule],
  templateUrl: './connection-creator.html',
  styleUrl: './connection-creator.css',
})
export class ConnectionCreator {
  serverAddress = "";
  showValidationError = signal(false);

  handleConnect() {
    if(!this.serverAddress) {
      this.showValidationError.set(true);
      return;
    }

    this.showValidationError.set(false);

  }
}
