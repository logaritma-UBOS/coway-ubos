export type LeadAction =
  | 'LEAD_CREATED'
  | 'VISIT_LANDING_PAGE'
  | 'CLICK_WHATSAPP'
  | 'REQUEST_PRICE'
  | 'REQUEST_SIMULATION'
  | 'REQUEST_DEMO';

export const LEAD_ACTION_SCORES: Record<LeadAction, number> = {
  LEAD_CREATED: 10,
  VISIT_LANDING_PAGE: 5,
  CLICK_WHATSAPP: 10,
  REQUEST_PRICE: 20,
  REQUEST_SIMULATION: 25,
  REQUEST_DEMO: 40,
};

export type LeadTemperature = 'Cold' | 'Warm' | 'Hot' | 'Very Hot';

export function calculateLeadScore(actions: LeadAction[]): number {
  return actions.reduce((total, action) => total + (LEAD_ACTION_SCORES[action] || 0), 0);
}

export function getLeadTemperature(score: number): LeadTemperature {
  if (score <= 20) return 'Cold';
  if (score <= 50) return 'Warm';
  if (score <= 75) return 'Hot';
  return 'Very Hot';
}

export function getTemperatureColor(temp: LeadTemperature): string {
  switch (temp) {
    case 'Cold': return 'text-blue-500 bg-blue-50 border-blue-200';
    case 'Warm': return 'text-amber-500 bg-amber-50 border-amber-200';
    case 'Hot': return 'text-orange-500 bg-orange-50 border-orange-200';
    case 'Very Hot': return 'text-red-500 bg-red-50 border-red-200';
    default: return 'text-slate-500 bg-slate-50 border-slate-200';
  }
}
