import { AfterViewInit, Component, viewChildren } from '@angular/core';
import { JointRotator } from '../joint-rotator/joint-rotator';

@Component({
  selector: 'app-arm-manager',
  imports: [JointRotator],
  templateUrl: './arm-manager.html',
  styleUrl: './arm-manager.css',
})
export class ArmManager implements AfterViewInit {
  gripperMinRange = 0;
  gripperMaxRange = 45;

  rotators = viewChildren(JointRotator);

  ngAfterViewInit() {
    this.rotators().forEach((joint) => {
      if(joint.type() == "gripper") {
        joint.currentValue.set(0);
      }
    });
  }
}
