import { AfterViewInit, Component, ElementRef, ViewChild, signal, output, input } from '@angular/core';

@Component({
  selector: 'app-joint-rotator',
  imports: [],
  templateUrl: './joint-rotator.html',
  styleUrl: './joint-rotator.css',
})
export class JointRotator implements AfterViewInit {
  currentValue = signal(90);
  valueChange = output<number>();
  title = input("");
  type = input("");
  minRange = input(0)
  maxRange = input(180)

  ngAfterViewInit(): void {

  }

  handleRangeChange(event: Event) {
    const input = event.target as HTMLInputElement;

    const newValue = parseInt(input.value);
    this.currentValue.set(newValue);
    this.valueChange.emit(newValue);
  }
}
