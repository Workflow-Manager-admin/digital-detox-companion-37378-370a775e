import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// PUBLIC_INTERFACE
@Component({
  standalone: true,
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrl: './checkin.component.css',
  imports: [CommonModule]
})
export class CheckinComponent {
  delivered = false;

  constructor() {}

  // PUBLIC_INTERFACE
  sendCheckin() {
    this.delivered = true;
    globalThis.setTimeout(() => {
      this.delivered = false;
      // business logic/service call goes here
    }, 1000);
  }
}
