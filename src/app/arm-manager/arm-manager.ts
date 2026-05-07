import { AfterViewInit, Component, viewChildren, output } from '@angular/core';
import { JointRotator } from '../joint-rotator/joint-rotator';
import { GRIPPER_MAX_RANGE, GRIPPER_MIN_RANGE, RotationChangeEvent } from '../constants';

@Component({
  selector: 'app-arm-manager',
  imports: [JointRotator],
  templateUrl: './arm-manager.html',
  styleUrl: './arm-manager.css',
})
export class ArmManager implements AfterViewInit {
  gripperMinRange = GRIPPER_MIN_RANGE;
  gripperMaxRange = GRIPPER_MAX_RANGE;

  rotators = viewChildren(JointRotator);
  rotationChange = output<RotationChangeEvent>();

  ngAfterViewInit() {
    this.rotators().forEach((joint) => {
      if(joint.type() == "gripper") {
        joint.currentValue.set(0);
      }
    });
  }

  handleRotatorValueChange(value: RotationChangeEvent) {
    this.rotationChange.emit(value);
  }
}
