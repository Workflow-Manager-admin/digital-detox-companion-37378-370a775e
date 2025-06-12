import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ResultService } from '../result.service';

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

  constructor(private router: Router, private resultService: ResultService) {}

  // PUBLIC_INTERFACE
  submitReflection() {
    if (!this.reflection.trim()) return;

    this.submitted = true;
    const reflectionText = this.reflection;
    globalThis.setTimeout(() => {
      this.reflection = '';
      this.submitted = false;
      this.resultService.setResult({
        result: 'Reflection Logged',
        detail: {
          text: reflectionText,
          message: 'Your AI journal reflection was saved. Keep noticing your progress!'
        }
      });
      this.router.navigate(['/result']);
    }, 1000);
  }
}
