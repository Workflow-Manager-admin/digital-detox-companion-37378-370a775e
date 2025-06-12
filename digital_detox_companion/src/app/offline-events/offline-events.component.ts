import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// PUBLIC_INTERFACE
@Component({
  standalone: true,
  selector: 'app-offline-events',
  templateUrl: './offline-events.component.html',
  styleUrl: './offline-events.component.css',
  imports: [CommonModule],
})
export class OfflineEventsComponent { }
