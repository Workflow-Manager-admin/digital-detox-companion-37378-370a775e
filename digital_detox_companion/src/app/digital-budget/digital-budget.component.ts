import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// PUBLIC_INTERFACE
@Component({
  standalone: true,
  selector: 'app-digital-budget',
  templateUrl: './digital-budget.component.html',
  styleUrl: './digital-budget.component.css',
  imports: [CommonModule],
})
export class DigitalBudgetComponent { }
