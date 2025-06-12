import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./dashboard/dashboard.component').then(m => m.DashboardComponent),
    pathMatch: 'full'
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
