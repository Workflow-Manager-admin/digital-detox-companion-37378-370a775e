import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// PUBLIC_INTERFACE
@Component({
  standalone: true,
  selector: 'app-buddy-streak',
  templateUrl: './buddy-streak.component.html',
  styleUrl: './buddy-streak.component.css',
  imports: [CommonModule],
})
export class BuddyStreakComponent { }
