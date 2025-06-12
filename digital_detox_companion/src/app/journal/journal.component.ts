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

  // PUBLIC_INTERFACE
  submitReflection() {
    this.submitted = true;
    globalThis.setTimeout(() => {
      this.reflection = '';
      this.submitted = false;
    }, 1750);
  }
}
