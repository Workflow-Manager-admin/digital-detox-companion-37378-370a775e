import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ResultService } from '../result.service';

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

  constructor(private router: Router, private resultService: ResultService) {}

  // PUBLIC_INTERFACE
  sendCheckin() {
    this.delivered = true;
    globalThis.setTimeout(() => {
      this.delivered = false;
      this.resultService.setResult({
        result: 'Check-in Sent!',
        detail: {
          time: new Date().toLocaleTimeString(),
          action: 'Off-grid check-in sent to your buddy.'
        }
      });
      this.router.navigate(['/result']);
    }, 1000);
  }
}
