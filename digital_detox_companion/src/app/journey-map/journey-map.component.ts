import { Component, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetoxStateService } from '../detox-state.service';
import { isPlatformBrowser } from '@angular/common';

import { animate, style, transition, trigger, state } from '@angular/animations';

// For minimal modals
interface ModalState {
  show: boolean;
  stepIndex: number;
}

@Component({
  standalone: true,
  selector: 'app-journey-map',
  templateUrl: './journey-map.component.html',
  styleUrl: './journey-map.component.css',
  imports: [CommonModule],
  animations: [
    trigger('milestoneExpand', [
      state('collapsed', style({ maxHeight: '38px', overflow: 'hidden', opacity: 0.92 })),
      state('expanded', style({ maxHeight: '160px', boxShadow: '0 2px 16px #b4dab6', opacity: 1 })),
      transition('collapsed <=> expanded', [
        animate('280ms cubic-bezier(0.42,0,0.55,1.4)')
      ])
    ]),
    trigger('milestoneAnim', [
      state('default', style({ transform: 'scale(1)', boxShadow: 'none' })),
      state('achieved', style({ transform: 'scale(1.08)', boxShadow: '0 4px 14px #e5ffe5' })),
      transition('default => achieved', animate('370ms cubic-bezier(0.42,0,0.6,1)')),
      transition('achieved => default', animate('270ms'))
    ]),
    trigger('progressBarAnim', [
      transition(':enter', [
        style({ width: '0%' }),
        animate('1100ms 150ms cubic-bezier(0.43,0.72,0.27,1.13)', style({ width: '*' }))
      ]),
      transition(':leave', [
        animate('180ms', style({ width: '0%' }))
      ])
    ]),
    trigger('modalFade', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(35px) scale(0.95)' }),
        animate('210ms', style({ opacity: 1, transform: 'none' }))
      ]),
      transition(':leave', [
        animate('170ms', style({ opacity: 0, transform: 'translateY(35px) scale(0.97)' }))
      ])
    ]),
    trigger('moodPulse', [
      state('default', style({ filter: 'brightness(1)', transform: 'scale(1)' })),
      state('pulse', style({ filter: 'brightness(1.18)', transform: 'scale(1.10)' })),
      transition('default <=> pulse', animate('240ms cubic-bezier(.85,0,.74,1.16)'))
    ]),
    trigger('colorWiggle', [
      transition('* <=> *', [
        animate('650ms', style({ filter: 'hue-rotate({{hue}}deg)' }))
      ], {params:{hue:0}})
    ]),
    trigger('milestoneModalOverlay', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('180ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('130ms', style({ opacity: 0 }))
      ])
    ]),
  ]
})
export class JourneyMapComponent implements OnDestroy {
  // DATA
  milestones: any[] = [];
  expandState: boolean[] = [];
  achievedAnimState: string[] = [];
  showModal: ModalState = { show: false, stepIndex: 0 };

  // Progress highlighting
  progressPercent = 0;

  // Mood
  mood: string = '😊';
  moodOverlay: string = '';
  moodInput: string = '';
  moodHistory: { mood: string, when: number }[] = [];
  moodPulseState: 'pulse' | 'default' = 'default';
  colorWiggleHue = 0;

  // Modal/reflection
  reflectionText = '';
  reflectionError = '';
  lastCompletionIdx = -1;

  // Animation
  private isBrowser: boolean;
  private progressInterval: any = null;
  private moodCycleInterval: any = null;

  // Track first incomplete for template logic (no assignment in template)
  get currentMilestoneIndex(): number {
    return this.milestones.findIndex(m => !m.achieved);
  }
  // For marker-circle-anim class
  isCurrent(idx: number): boolean {
    return !this.milestones[idx].achieved && idx === this.currentMilestoneIndex;
  }
  // Which milestones should allow expand (not current "in-progress" marker)
  expandAllowed(idx: number): boolean {
    return this.milestones[idx].achieved || idx < this.currentMilestoneIndex;
  }

  // Service
  constructor(
    private state: DetoxStateService,
    @Inject(PLATFORM_ID) platformId: object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.load();
    if (this.isBrowser) {
      this.progressInterval = globalThis.setInterval(() => this.simulateProgressAnim(), 3900);
      this.moodCycleInterval = globalThis.setInterval(() => this.cycleMoodOverlay(), 4200);
    }
  }

  load() {
    this.milestones = this.state.getJourneyMilestones();
    this.expandState = this.milestones.map(() => false);
    this.achievedAnimState = this.milestones.map(m => (m.achieved ? 'achieved' : 'default'));
    const moods = this.state.getMoodHistory();
    if (moods.length) this.mood = moods[moods.length - 1].mood;
    this.moodHistory = moods;
    // Set progress based on first incomplete
    const completeCount = this.milestones.filter(m => m.achieved).length;
    this.progressPercent = Math.round((completeCount / this.milestones.length) * 100);
  }

  toggleExpand(idx: number) {
    if (!this.expandAllowed(idx)) return;
    this.expandState[idx] = !this.expandState[idx];
  }

  // ----- MODAL POPUP -----
  openMilestoneModal(idx: number) {
    this.showModal = { show: true, stepIndex: idx };
    this.reflectionText = '';
    this.reflectionError = '';
  }
  closeMilestoneModal() {
    this.showModal = { show: false, stepIndex: 0 };
    this.reflectionText = '';
  }
  // -----
  // Animate progress
  simulateProgressAnim() {
    // Simulate achievement once in a while (unless at end)
    const idx = this.milestones.findIndex(m => !m.achieved);
    if (idx >= 0 && Math.random() > 0.7) {
      this.completeMilestone(idx);
    }
  }
  completeMilestone(idx: number) {
    this.milestones[idx].achieved = true;
    this.achievedAnimState[idx] = 'achieved';
    globalThis.setTimeout(() => (this.achievedAnimState[idx] = 'default'), 1500);
    this.progressPercent = Math.round((this.milestones.filter(m => m.achieved).length / this.milestones.length) * 100);
    this.state.setJourneyMilestones(this.milestones);
    this.lastCompletionIdx = idx;
    globalThis.setTimeout(() => (this.lastCompletionIdx = -1), 2000);
  }

  // Mood Overlay Animation/cycling
  cycleMoodOverlay() {
    const moods = ['😊', '🙂', '😐', '😞', '🥳', '😃', '😴', '🤔'];
    this.moodOverlay = moods[Math.floor(Math.random() * moods.length)];
    this.moodPulseState = this.moodPulseState === 'default' ? 'pulse' : 'default';
    this.colorWiggleHue = Math.floor(Math.random() * 22) - 6;
    globalThis.setTimeout(() => this.moodOverlay = '', 1200);
  }

  // Log/journal mood
  setMood(m: string) {
    this.mood = m;
    this.state.addMoodEntry(m);
    this.moodHistory.push({ mood: m, when: Date.now() });
    this.moodPulseState = 'pulse';
    globalThis.setTimeout(() => this.moodPulseState = 'default', 600);
  }

  // Reflection modal logic
  submitReflection(idx: number) {
    const txt = this.reflectionText.trim();
    if (!txt) {
      this.reflectionError = 'Reflection can’t be empty.';
      return;
    }
    if (txt.length > 200) {
      this.reflectionError = 'Max 200 chars.';
      return;
    }
    const mood = this.mood;
    this.state.addMilestoneReflection(idx, { text: txt, mood });
    this.reflectionText = '';
    this.reflectionError = '';
    // Feedback overlay
    this.closeMilestoneModal();
    this.achievedAnimState[idx] = 'achieved';
    globalThis.setTimeout(() => (this.achievedAnimState[idx] = 'default'), 900);
  }

  ngOnDestroy() {
    if (this.isBrowser) {
      if (this.progressInterval) globalThis.clearInterval(this.progressInterval);
      if (this.moodCycleInterval) globalThis.clearInterval(this.moodCycleInterval);
    }
  }
}
