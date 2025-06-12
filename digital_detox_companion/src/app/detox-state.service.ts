import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * DetoxStateService provides centralized, persistent (localStorage) management
 * for digital detox plans, progress, buddy streaks/messages, check-ins, logged activities,
 * journaling reflections, detox mode, community and family messaging, etc.
 */
// PUBLIC_INTERFACE
@Injectable({ providedIn: 'root' })
export class DetoxStateService {
  private readonly KEY = 'ddc:state';
  private state: DetoxState;
  // RxJS for continuous observation
  private stateSub = new BehaviorSubject<DetoxState>(null as never);
  // For simplified synchronizing in other tabs
  private listenStorage = (event: StorageEvent) => {
    if (event.key === this.KEY) {
      this.reload();
    }
  };

  constructor() {
    this.state = this.read() || this.initialState();
    this.stateSub.next(this.state);
    if (typeof globalThis !== 'undefined' && globalThis.addEventListener) {
      globalThis.addEventListener('storage', this.listenStorage as any);
    }
  }

  private read(): DetoxState | null {
    if (typeof globalThis !== 'undefined' && globalThis.localStorage) {
      try {
        const raw = globalThis.localStorage.getItem(this.KEY);
        return raw ? JSON.parse(raw) : null;
      } catch {
        return null;
      }
    }
    return null;
  }
  private save() {
    if (typeof globalThis !== 'undefined' && globalThis.localStorage) {
      try {
        globalThis.localStorage.setItem(this.KEY, JSON.stringify(this.state));
        this.stateSub.next({ ...this.state });
      } catch {
        // no-op
      }
    }
  }
  private reload() {
    const fresh = this.read();
    if (fresh) {
      this.state = fresh;
      this.stateSub.next({ ...this.state });
    }
  }
  private initialState(): DetoxState {
    return {
      plans: [
        { label: 'Daily Limit', desc: 'Max 1 hour/day social media', checked: true },
        { label: 'Offline Sundays', desc: 'No social media on Sundays', checked: false },
        { label: 'No use after 9pm', desc: 'Screen-free evenings', checked: true }
      ],
      streak: { value: 1, lastActive: Date.now(), lost: false },
      buddy: { name: '🌱 mindful_buddy_717', encouragement: [], lastCheckin: null, messages: [] },
      logs: [],
      reflections: [],
      detoxMode: 'blockAll',
      timeSummary: {
        minutes: 0,
        activities: []
      },
      digitalBudget: {
        totalBudget: 360,
        allocations: [
          { label: 'Social Media', min: 130 },
          { label: 'Video', min: 90 },
          { label: 'Games', min: 50 },
          { label: 'Other', min: 90 }
        ],
        rollover: 0
      },
      community: {
        currentCircle: 'Nature Lovers',
        posts: [
          { user: 'nature_walker', content: 'Tried my first offline hike! 🌲' },
          { user: 'reader101', content: 'Three chapters of my book finished this week.' },
          { user: 'mindfulmum', content: 'Family unplugged Sunday, went great.' }
        ]
      },
      family: {
        messages: [
          { sender: 'self', who: 'Teen', text: 'Can we do a movie night offline?' },
          { sender: 'parent', who: 'Parent', text: '👏 Proud of your effort!' }
        ]
      }
    };
  }

  // PUBLIC_INTERFACE
  getState$() { return this.stateSub.asObservable(); }
  // PUBLIC_INTERFACE
  getState(): DetoxState { return { ...this.state }; }

  // Plans
  // PUBLIC_INTERFACE
  getPlans() { return this.state.plans.map(x => ({ ...x })); }

  // --- JOURNEY MAP Additions ---
  // PUBLIC_INTERFACE
  getJourneyMilestones() {
    // Allow dynamic in-state milestones if previously set, else default
    if ('journey' in this.state && Array.isArray((this.state as any).journey?.milestones)) {
      return (this.state as any).journey.milestones.map((x: any) => ({ ...x }));
    }
    // Default sample
    return [
      { label: "Start", achieved: true, date: Date.now() - 86400 * 1000 * 13, notes: "Decided to start!" },
      { label: "Week 1", achieved: true, date: Date.now() - 86400 * 1000 * 6, notes: "First week strong" },
      { label: "Mid-point", achieved: false, date: null, notes: "" },
      { label: "Current", achieved: false, date: null, notes: "" },
      { label: "Goal", achieved: false, date: null, notes: "1 month detox!" }
    ];
  }

  // PUBLIC_INTERFACE
  setJourneyMilestones(milestones: any[]) {
    if (!('journey' in this.state)) (this.state as any).journey = {};
    (this.state as any).journey.milestones = milestones.map(x => ({ ...x }));
    this.save();
  }

  // PUBLIC_INTERFACE
  getMoodHistory() {
    if ('journey' in this.state && Array.isArray((this.state as any).journey?.moods)) {
      return ((this.state as any).journey.moods).map((x: any) => ({ ...x }));
    }
    return [];
  }

  // PUBLIC_INTERFACE
  addMoodEntry(mood: string) {
    if (!('journey' in this.state)) (this.state as any).journey = {};
    if (!Array.isArray((this.state as any).journey.moods))
      (this.state as any).journey.moods = [];
    (this.state as any).journey.moods.push({
      mood,
      when: Date.now()
    });
    this.save();
  }

  // PUBLIC_INTERFACE
  addMilestoneReflection(idx: number, entry: { text: string, mood: string }) {
    if (!('journey' in this.state)) (this.state as any).journey = {};
    if (!Array.isArray((this.state as any).journey.milestones))
      (this.state as any).journey.milestones = this.getJourneyMilestones();
    const milestones = (this.state as any).journey.milestones;
    if (milestones[idx]) {
      if (!Array.isArray(milestones[idx].reflections)) milestones[idx].reflections = [];
      milestones[idx].reflections.push({ ...entry, at: Date.now() });
      this.save();
    }
  }
  // PUBLIC_INTERFACE
  updatePlans(plans: DetoxPlan[]) {
    this.state.plans = plans.map(x => ({ ...x }));
    this.save();
  }

  // Detox Mode
  // PUBLIC_INTERFACE
  getDetoxMode() { return this.state.detoxMode; }
  // PUBLIC_INTERFACE
  setDetoxMode(mode: 'blockAll' | 'appOnly' | 'custom') {
    this.state.detoxMode = mode;
    this.save();
  }

  // Buddy streak logic
  // PUBLIC_INTERFACE
  getStreak() { return { ...this.state.streak }; }
  // PUBLIC_INTERFACE
  updateStreak(ok: boolean = true) {
    // If ok, increment streak, else lose streak.
    if (ok) {
      this.state.streak.value++;
      this.state.streak.lastActive = Date.now();
      this.state.streak.lost = false;
    } else {
      this.state.streak.lost = true;
    }
    this.save();
  }
  // PUBLIC_INTERFACE
  resetStreak() {
    this.state.streak.value = 1;
    this.state.streak.lost = false;
    this.state.streak.lastActive = Date.now();
    this.save();
  }

  // Buddy messages/check-ins
  // PUBLIC_INTERFACE
  getBuddy() { return { ...this.state.buddy }; }
  // PUBLIC_INTERFACE
  sendBuddyMessage(text: string) {
    this.state.buddy.messages.push({
      sender: 'self',
      text, at: Date.now()
    });
    this.save();
  }
  // PUBLIC_INTERFACE
  receiveBuddyMessage(text: string) {
    this.state.buddy.messages.push({
      sender: 'buddy',
      text, at: Date.now()
    });
    this.save();
  }
  // PUBLIC_INTERFACE
  addBuddyEncouragement(msg: string) {
    this.state.buddy.encouragement.push(msg);
    this.save();
  }
  // PUBLIC_INTERFACE
  logCheckin() {
    this.state.buddy.lastCheckin = Date.now();
    this.save();
  }

  // Reflection journal
  // PUBLIC_INTERFACE
  getReflections() { return this.state.reflections.slice(); }
  // PUBLIC_INTERFACE
  addReflection(text: string) {
    this.state.reflections.push({
      text, time: Date.now()
    });
    this.save();
  }

  // Time reallocation logging/summary
  // PUBLIC_INTERFACE
  getTimeSummary() { return { ...this.state.timeSummary }; }
  // PUBLIC_INTERFACE
  logActivity(label: string, min: number) {
    // Add to weekly log
    this.state.logs.push({ label, min, time: Date.now() });
    // Add to time summary
    let found = this.state.timeSummary.activities.find(a => a.label === label);
    if (!found) {
      found = { label, min: 0 };
      this.state.timeSummary.activities.push(found);
    }
    found.min += min;
    this.state.timeSummary.minutes += min;
    this.save();
  }

  // Digital Budget
  // PUBLIC_INTERFACE
  getDigitalBudget() { return { ...this.state.digitalBudget }; }
  // PUBLIC_INTERFACE
  updateDigitalBudget(budget: { totalBudget: number; allocations: any[]; rollover: number }) {
    this.state.digitalBudget = { ...budget };
    this.save();
  }

  // Community Circles
  // PUBLIC_INTERFACE
  getCommunity() { return { ...this.state.community }; }
  // PUBLIC_INTERFACE
  joinCircle(name: string) {
    this.state.community.currentCircle = name;
    this.save();
  }
  // PUBLIC_INTERFACE
  addCommunityPost(user: string, content: string) {
    this.state.community.posts.push({ user, content });
    this.save();
  }

  // Family Dashboard Messaging
  // PUBLIC_INTERFACE
  getFamilyMessages() { return this.state.family.messages.map(x => ({ ...x })) }
  // PUBLIC_INTERFACE
  addFamilyMessage(sender: 'parent' | 'self', who: string, text: string) {
    this.state.family.messages.push({ sender, who, text });
    this.save();
  }
}

// --- Interfaces used for state ---
export interface DetoxPlan {
  label: string;
  desc: string;
  checked: boolean;
}
export interface DetoxState {
  plans: DetoxPlan[];
  streak: { value: number; lastActive: number; lost: boolean };
  buddy: {
    name: string;
    encouragement: string[];
    lastCheckin: number | null;
    messages: { sender: 'self' | 'buddy', text: string, at: number }[];
  };
  logs: { label: string; min: number; time: number }[];
  reflections: { text: string; time: number }[];
  detoxMode: 'blockAll' | 'appOnly' | 'custom';
  timeSummary: {
    minutes: number;
    activities: { label: string; min: number }[];
  };
  digitalBudget: {
    totalBudget: number;
    allocations: { label: string; min: number }[];
    rollover: number;
  };
  community: {
    currentCircle: string;
    posts: { user: string; content: string }[];
  };
  family: {
    messages: { sender: 'parent' | 'self', who: string, text: string }[];
  };
}
