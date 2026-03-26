import { Component, signal } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { Home } from './home/home';

@Component({
  selector: 'app-root',
  imports: [Home],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements AfterViewInit {
  agent = signal("");

  ngAfterViewInit(): void {
    this.agent.set(navigator.userAgent);

  }

  connectToBluetoothService() {

  }
}

