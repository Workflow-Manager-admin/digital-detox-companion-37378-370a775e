import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ResultService } from '../result.service';

// PUBLIC_INTERFACE
@Component({
  standalone: true,
  selector: 'app-buddy',
  templateUrl: './buddy.component.html',
  styleUrl: './buddy.component.css',
  imports: [CommonModule]
})
export class BuddyComponent {
  buddyName = '🌱 mindful_buddy_717';
  status = 'Online';
  encouragement = [
    "Keep going—real life is out there 😊",
    "Try an in-person walk today!",
    "Short offline challenge next weekend?"
  ];

  constructor(private router: Router, private resultService: ResultService) {}

  // PUBLIC_INTERFACE
  sendSupport() {
    this.resultService.setResult({
      result: 'Support Sent!',
      detail: {
        to: this.buddyName,
        time: new Date().toLocaleTimeString(),
        message: 'Sent a positive nudge to your accountability buddy 🌱.'
      }
    });
    this.router.navigate(['/result']);
  }
}
