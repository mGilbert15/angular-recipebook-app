import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent {
  @Input('message') message: string;
  @Output() close = new EventEmitter<void>();

  /**
   * Emits message to close the error message box.
   */
  onClose() {
    this.close.emit();
  }
}
