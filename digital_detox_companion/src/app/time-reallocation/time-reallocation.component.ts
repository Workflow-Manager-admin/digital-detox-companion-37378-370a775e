import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// PUBLIC_INTERFACE
@Component({
  standalone: true,
  selector: 'app-time-reallocation',
  templateUrl: './time-reallocation.component.html',
  styleUrl: './time-reallocation.component.css',
  imports: [CommonModule],
})
export class TimeReallocationComponent { }
