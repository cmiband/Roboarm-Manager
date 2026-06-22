import { AfterViewInit, Component, signal, output, input, computed } from '@angular/core';
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
  title = input('');
  type = input('');
  part = input('');
  minRange = input(0);
  maxRange = input(180);

  gripperArcPath = computed(() => {
    if (this.type() !== 'gripper') return '';
    const val = this.currentValue();
    const range = this.maxRange() - this.minRange();
    if (range === 0 || val === this.minRange()) return '';
    const pct = (val - this.minRange()) / range;
    const r = 16, cx = 22, cy = 22;
    const startAngle = -90;
    const endAngle = startAngle + pct * 360;
    const start = this.polarToCartesian(cx, cy, r, startAngle);
    const end = this.polarToCartesian(cx, cy, r, endAngle);
    const largeArc = pct > 0.5 ? 1 : 0;
    return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y}`;
  });

  ngAfterViewInit(): void {}

  handleRangeChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const newValue = parseInt(input.value);
    this.currentValue.set(newValue);
    this.valueChange.emit({ value: newValue, part: this.part() });
  }

  private polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
    const rad = (angleDeg - 90) * Math.PI / 180;
    return {
      x: +(cx + r * Math.cos(rad)).toFixed(3),
      y: +(cy + r * Math.sin(rad)).toFixed(3),
    };
  }
}
