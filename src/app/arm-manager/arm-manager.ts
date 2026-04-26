import { Component } from '@angular/core';
import { JointRotator } from '../joint-rotator/joint-rotator';

@Component({
  selector: 'app-arm-manager',
  imports: [JointRotator],
  templateUrl: './arm-manager.html',
  styleUrl: './arm-manager.css',
})
export class ArmManager {

}
