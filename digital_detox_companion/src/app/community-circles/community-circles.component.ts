import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// PUBLIC_INTERFACE
@Component({
  standalone: true,
  selector: 'app-community-circles',
  templateUrl: './community-circles.component.html',
  styleUrl: './community-circles.component.css',
  imports: [CommonModule],
})
export class CommunityCirclesComponent implements OnDestroy {
  posts = [
    { user: 'nature_walker', content: 'Tried my first offline hike! 🌲' },
    { user: 'reader101', content: 'Three chapters of my book finished this week.' },
    { user: 'mindfulmum', content: 'Family unplugged Sunday, went great.' }
  ];

  private morePosts = [
    { user: 'zen_teacher', content: 'No-screen meditation session at dawn!' },
    { user: 'outdoors_guy', content: "Bike ride without notifications—felt amazing." },
    { user: 'craft_kid', content: 'Built a real birdhouse this weekend!' }
  ];
  private postIndex = 0;
  private intervalId: any = null;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);

    if (this.isBrowser) {
      // Periodically add more posts
      this.intervalId = globalThis.setInterval(() => {
        if (this.postIndex < this.morePosts.length) {
          // type assertion for array literal type
          this.posts.push(this.morePosts[this.postIndex] as { user: string; content: string });
          this.postIndex++;
        }
      }, 3700);
    }
  }

  // PUBLIC_INTERFACE
  ngOnDestroy() {
    if (this.isBrowser && this.intervalId) {
      globalThis.clearInterval(this.intervalId);
    }
  }
}
