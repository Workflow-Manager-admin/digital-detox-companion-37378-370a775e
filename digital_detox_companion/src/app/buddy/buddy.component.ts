import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

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
}
