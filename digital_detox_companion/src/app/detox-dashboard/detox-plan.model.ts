export interface DetoxPlan {
  id?: string;
  title: string;
  type: PlanTypeId;
  targetValue: string;
  startDate: string;
  endDate?: string;
  isActive: boolean;
}
export interface PlanType {
  id: PlanTypeId;
  label: string;
}
export type PlanTypeId = 'daily-limit' | 'app-restriction' | 'offline-day';
