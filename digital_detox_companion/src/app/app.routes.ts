import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./dashboard/dashboard.component').then(m => m.DashboardComponent),
    pathMatch: 'full'
  },
  {
    path: 'result',
    loadComponent: () =>
      import('./result-page/result-page.component').then(m => m.ResultPageComponent)
  },
  {
    path: 'journey-map',
    loadComponent: () =>
      import('./journey-map/journey-map.component').then(m => m.JourneyMapComponent)
  },
  {
    path: 'buddy-streak',
    loadComponent: () =>
      import('./buddy-streak/buddy-streak.component').then(m => m.BuddyStreakComponent)
  },
  {
    path: 'time-reallocation',
    loadComponent: () =>
      import('./time-reallocation/time-reallocation.component').then(m => m.TimeReallocationComponent)
  },
  {
    path: 'detox-modes',
    loadComponent: () =>
      import('./detox-modes/detox-modes.component').then(m => m.DetoxModesComponent)
  },
  {
    path: 'emergency-bypass',
    loadComponent: () =>
      import('./emergency-bypass/emergency-bypass.component').then(m => m.EmergencyBypassComponent)
  },
  {
    path: 'offline-events',
    loadComponent: () =>
      import('./offline-events/offline-events.component').then(m => m.OfflineEventsComponent)
  },
  {
    path: 'mini-games',
    loadComponent: () =>
      import('./mini-games/mini-games.component').then(m => m.MiniGamesComponent)
  },
  {
    path: 'family-dashboard',
    loadComponent: () =>
      import('./family-dashboard/family-dashboard.component').then(m => m.FamilyDashboardComponent)
  },
  {
    path: 'digital-budget',
    loadComponent: () =>
      import('./digital-budget/digital-budget.component').then(m => m.DigitalBudgetComponent)
  },
  {
    path: 'community-circles',
    loadComponent: () =>
      import('./community-circles/community-circles.component').then(m => m.CommunityCirclesComponent)
  },
  {
    path: 'plans',
    loadComponent: () =>
      import('./plans/plans.component').then(m => m.PlansComponent)
  },
  {
    path: 'buddy',
    loadComponent: () =>
      import('./buddy/buddy.component').then(m => m.BuddyComponent)
  },
  {
    path: 'rewards',
    loadComponent: () =>
      import('./rewards/rewards.component').then(m => m.RewardsComponent)
  },
  {
    path: 'checkin',
    loadComponent: () =>
      import('./checkin/checkin.component').then(m => m.CheckinComponent)
  },
  {
    path: 'journal',
    loadComponent: () =>
      import('./journal/journal.component').then(m => m.JournalComponent)
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
