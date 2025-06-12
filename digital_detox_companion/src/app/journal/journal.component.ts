import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// PUBLIC_INTERFACE
@Component({
  standalone: true,
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrl: './journal.component.css',
  imports: [CommonModule, FormsModule]
})
export class JournalComponent {
  reflection = '';
  submitted = false;

  constructor() {}

  // PUBLIC_INTERFACE
  submitReflection() {
    if (!this.reflection.trim()) return;

    this.submitted = true;
    globalThis.setTimeout(() => {
      this.reflection = '';
      this.submitted = false;
      // Persist reflection here with new service
    }, 1000);
  }
}
