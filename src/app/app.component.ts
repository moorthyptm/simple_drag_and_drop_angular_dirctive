import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  title = 'Drag and drop';

  @ViewChild('box') drag?: ElementRef;

  screenX = 500;
  screenY = 500;

  /**
   * @method StyleObj
   */
  public StyleObj = () => {
    const style = {
      width: `${this.screenX}px`,
      height: `${this.screenY}px`,
    };

    return style;
  }

  ngAfterViewInit(): void {}

  /**
   * @method onDragStart
   * @param $e event
   */
  onDragStart($e: any): void {
    console.log('onDragStart');
  }

  /**
   * @method onDragMove
   * @param $e event
   */
  onDragMove($e: any): void {
    let X: number;
    let Y: number;

    if ($e.type === 'touchmove') {
      X = $e.changedTouches[0].clientX;
      Y = $e.changedTouches[0].clientY;
    } else {
      X = $e.clientX;
      Y = $e.clientY;
    }

    if (this.screenY - 10 > Y && Y > 10 && this.drag) {
      this.drag.nativeElement.style.top = `${Y}px`;
    }
    if (this.screenX - 10 > X && X > 10 && this.drag) {
      this.drag.nativeElement.style.left = `${X}px`;
    }
  }

  /**
   * @method onDragEnd
   * @param $e event
   */
  onDragEnd($e: any): void {
    console.log('onDragEnd');
  }
}
