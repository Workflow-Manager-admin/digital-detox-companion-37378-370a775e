import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// PUBLIC_INTERFACE
@Component({
  standalone: true,
  selector: 'app-rewards',
  templateUrl: './rewards.component.html',
  styleUrl: './rewards.component.css',
  imports: [CommonModule]
})
export class RewardsComponent {}
