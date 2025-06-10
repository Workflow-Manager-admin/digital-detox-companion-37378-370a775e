import { Component } from '@angular/core';
import { DetoxPlan, PlanType } from './detox-plan.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/**
 * DetoxDashboardComponent
 * Main dashboard for personalized digital detox plans.
 * Minimalist, themed as specified. Other dashboard features are placeholders only.
 */
// PUBLIC_INTERFACE
@Component({
  selector: 'app-detox-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './detox-dashboard.component.html',
  styleUrl: './detox-dashboard.component.css'
})
export class DetoxDashboardComponent {
  detoxPlans: DetoxPlan[] = [];
  planTypes: PlanType[] = [
    { id: 'daily-limit', label: 'Daily Time Limit' },
    { id: 'app-restriction', label: 'App Restriction' },
    { id: 'offline-day', label: 'Offline Day' }
  ];

  adding: boolean = false;
  newPlan: DetoxPlan = this.getEmptyPlan();

  /**
   * Get type label by plan type string
   * Used by template to disallow logic in HTML.
   */
  // PUBLIC_INTERFACE
  planTypeLabel(typeId: string): string {
    const typeObj = this.planTypes.find(t => t.id === typeId);
    return typeObj ? typeObj.label : typeId;
  }

  // PUBLIC_INTERFACE
  getEmptyPlan(): DetoxPlan {
    return {
      title: '',
      type: 'daily-limit',
      targetValue: '',
      startDate: '',
      endDate: '',
      isActive: true
    };
  }

  // PUBLIC_INTERFACE
  addPlan() {
    if (!this.newPlan.title || !this.newPlan.targetValue || !this.newPlan.startDate) return;
    this.detoxPlans.push({ ...this.newPlan, id: Date.now().toString() });
    this.newPlan = this.getEmptyPlan();
    this.adding = false;
  }

  // PUBLIC_INTERFACE
  removePlan(planId: string) {
    this.detoxPlans = this.detoxPlans.filter(p => p.id !== planId);
  }

  // PUBLIC_INTERFACE
  togglePlanActive(plan: DetoxPlan) {
    plan.isActive = !plan.isActive;
  }

  // PUBLIC_INTERFACE
  editPlan(plan: DetoxPlan) {
    // For simplicity in this minimal version, just remove and place into input
    this.removePlan(plan.id!);
    this.newPlan = { ...plan };
    this.adding = true;
  }
}
