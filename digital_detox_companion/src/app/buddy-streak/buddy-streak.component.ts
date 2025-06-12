import { Component, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';

// PUBLIC_INTERFACE
@Component({
  standalone: true,
  selector: 'app-buddy-streak',
  templateUrl: './buddy-streak.component.html',
  styleUrl: './buddy-streak.component.css',
  imports: [CommonModule],
})
export class BuddyStreakComponent implements OnDestroy {
  streak = 6;
  private streakDir: 1 | -1 = 1;
  chat: { sender: 'buddy' | 'self'; text: string }[] = [
    { sender: 'buddy', text: `We're nearly at a week—how do you feel?` },
    { sender: 'self', text: 'Feeling stronger together!🎉' }
  ];
  private chatExamples = [
    { sender: 'buddy', text: "Missed you at dinner last night, but proud of us!" },
    { sender: 'self', text: "Just resisted checking socials—thanks for the backup!" },
    { sender: 'buddy', text: "Almost hit our two-week streak!" },
    { sender: 'self', text: "Weekend camping plans: offline mode ON 😄" }
  ];
  private chatIntervalId: any = null;
  private streakIntervalId: any = null;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);

    if (this.isBrowser) {
      // Animate the streak going up and down within a plausible range
      this.streakIntervalId = globalThis.setInterval(() => {
        if (this.streak >= 15) this.streakDir = -1;
        if (this.streak <= 5) this.streakDir = 1;
        this.streak += this.streakDir;
      }, 4000);

      // Periodically inject example messages as if chat is alive
      let chatIndex = 0;
      this.chatIntervalId = globalThis.setInterval(() => {
        if (chatIndex < this.chatExamples.length) {
          this.chat.push(this.chatExamples[chatIndex] as { sender: 'buddy' | 'self'; text: string });
          chatIndex++;
        }
      }, 3500);
    }
  }

  // PUBLIC_INTERFACE
  ngOnDestroy() {
    if (this.isBrowser) {
      if (this.streakIntervalId) globalThis.clearInterval(this.streakIntervalId);
      if (this.chatIntervalId) globalThis.clearInterval(this.chatIntervalId);
    }
  }
}
