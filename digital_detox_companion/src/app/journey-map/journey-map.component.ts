import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// PUBLIC_INTERFACE
@Component({
  standalone: true,
  selector: 'app-journey-map',
  templateUrl: './journey-map.component.html',
  styleUrl: './journey-map.component.css',
  imports: [CommonModule],
})
export class JourneyMapComponent implements OnDestroy {
  timeline = ['Start', 'Week 1', 'Mid-point', 'Current', 'Goal'];
  markerIndex = 3; // "Current"
  moodStates = ['😊', '😐', '😞'];
  currentMoodIndex = 0;
  private journeyIntervalId: any = null;
  private moodIntervalId: any = null;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);

    if (this.isBrowser) {
      // Animate the "current" marker to simulate progression
      this.journeyIntervalId = globalThis.setInterval(() => {
        if (this.markerIndex < this.timeline.length - 2) {
          this.markerIndex++;
        } else {
          this.markerIndex = 3; // reset to "Current" for looped animation
        }
      }, 6000);

      // "Live" mood swings every few seconds, as if user is checking in
      this.moodIntervalId = globalThis.setInterval(() => {
        this.currentMoodIndex = (this.currentMoodIndex + 1) % this.moodStates.length;
      }, 4000);
    }
  }

  get mood() {
    return this.moodStates[this.currentMoodIndex];
  }

  // PUBLIC_INTERFACE
  ngOnDestroy() {
    if (this.isBrowser) {
      if (this.journeyIntervalId) globalThis.clearInterval(this.journeyIntervalId);
      if (this.moodIntervalId) globalThis.clearInterval(this.moodIntervalId);
    }
  }
}
