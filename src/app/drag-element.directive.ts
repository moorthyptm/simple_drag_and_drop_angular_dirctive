import { Directive, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
  selector: '[appDragElement]'
})
export class DragElementDirective {

  @Output() dragStart = new EventEmitter<PointerEvent | TouchEvent>();
  @Output() dragMove = new EventEmitter<PointerEvent | TouchEvent>();
  @Output() dragEnd = new EventEmitter<PointerEvent | TouchEvent>();

  private dragging = false;

  timer: any; // setTimeout is for to differentiate click and drag

  // pointer events
  @HostListener('pointerdown', ['$event'])
  onPointerDown(event: PointerEvent): void {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.dragging = true;
      this.dragStart.emit(event);
    }, 10);
  }

  @HostListener('document:pointermove', ['$event'])
  onPointerMove(event: PointerEvent): void {
    if (!this.dragging) {
      return;
    }
    this.dragMove.emit(event);
  }

  @HostListener('document:pointerup', ['$event'])
  onPointerUp(event: PointerEvent): void {
    clearTimeout(this.timer);
    if (!this.dragging) {
      return;
    }
    this.dragging = false;
    this.dragEnd.emit(event);
  }

  // touch-events
  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent): void {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.dragging = true;
      this.dragStart.emit(event);
    }, 10);

  }

  @HostListener('document:touchmove', ['$event'])
  onTouchMove(event: TouchEvent): void {
    if (!this.dragging) {
      return;
    }
    this.dragMove.emit(event);
  }

  @HostListener('document:touchend', ['$event'])
  onTouchEnd(event: TouchEvent): void {
    clearTimeout(this.timer);
    if (!this.dragging) {
      return;
    }
    this.dragging = false;
    this.dragEnd.emit(event);
  }
}
