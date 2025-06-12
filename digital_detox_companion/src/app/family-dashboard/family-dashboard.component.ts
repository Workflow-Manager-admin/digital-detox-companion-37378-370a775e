import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// PUBLIC_INTERFACE
@Component({
  standalone: true,
  selector: 'app-family-dashboard',
  templateUrl: './family-dashboard.component.html',
  styleUrl: './family-dashboard.component.css',
  imports: [CommonModule],
})
export class FamilyDashboardComponent implements OnDestroy {
  supportMessages: { sender: 'parent' | 'self'; who: string; text: string }[] = [
    { sender: 'self', who: 'Teen', text: 'Can we do a movie night offline?' },
    { sender: 'parent', who: 'Parent', text: '👏 Proud of your effort!' }
  ];
  private moreMsgs = [
    { sender: 'parent', who: 'Parent', text: 'Let’s bake together Sunday afternoon.' },
    { sender: 'self', who: 'Teen', text: 'Read one chapter—no screens! 🎉' },
    { sender: 'parent', who: 'Parent', text: "Great job staying off the phone at dinner!" }
  ];
  private msgIndex = 0;
  private intervalId: any = null;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);

    if (this.isBrowser) {
      this.intervalId = globalThis.setInterval(() => {
        if (this.msgIndex < this.moreMsgs.length) {
          this.supportMessages.push(this.moreMsgs[this.msgIndex] as { sender: 'self' | 'parent'; who: string; text: string });
          this.msgIndex++;
        }
      }, 4400);
    }
  }

  // PUBLIC_INTERFACE
  ngOnDestroy() {
    if (this.isBrowser && this.intervalId) {
      globalThis.clearInterval(this.intervalId);
    }
  }
}
