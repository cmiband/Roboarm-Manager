import { AfterViewInit, Component, ElementRef, ViewChild, signal, output, input } from '@angular/core';
import { RotationChangeEvent } from '../constants';

@Component({
  selector: 'app-joint-rotator',
  imports: [],
  templateUrl: './joint-rotator.html',
  styleUrl: './joint-rotator.css',
})
export class JointRotator implements AfterViewInit {
  currentValue = signal(90);
  valueChange = output<RotationChangeEvent>();
  title = input("");
  type = input("");
  part = input("");
  minRange = input(0)
  maxRange = input(180)

  ngAfterViewInit(): void {

  }

  handleRangeChange(event: Event) {
    const input = event.target as HTMLInputElement;

    const newValue = parseInt(input.value);
    this.currentValue.set(newValue);

    const rotationEvent : RotationChangeEvent = {
      value: newValue,
      part: this.part()
    }
    this.valueChange.emit(rotationEvent);
  }
}
