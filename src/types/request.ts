// src/types/request.ts

export type RequestStatus = 'pending' | 'approved' | 'denied';
export type UrgencyLevel = 'critical' | 'high' | 'medium' | 'low';

export interface HospitalNeedRequest {
  id: string;
  submittedBy: string; // User ID
  submitterName: string;
  submitterEmail: string;
  submitterRole: 'local_user' | 'hospital';
  
  // Hospital & Equipment Details
  hospitalName: string;
  hospitalDistrict: string;
  equipmentName: string;
  equipmentCategory: string;
  quantity: number;
  estimatedCost: number;
  urgency: UrgencyLevel;
  
  // Request Details
  description: string;
  reason: string;
  expectedBeneficiaries: number;
  currentCondition?: string;
  
  // Status & Tracking
  status: RequestStatus;
  submittedAt: Date;
  reviewedAt?: Date;
  reviewedBy?: string;
  adminNotes?: string;
  
  // If approved, this becomes a donation item
  approvalDetails?: {
    approvedAmount: number;
    targetAmount: number;
    currentRaised: number;
    donationId?: string;
  };
}

export interface RequestFilters {
  status?: RequestStatus;
  urgency?: UrgencyLevel;
  district?: string;
  hospital?: string;
  dateRange?: {
    from: Date;
    to: Date;
  };
}

export interface RequestStats {
  total: number;
  pending: number;
  approved: number;
  denied: number;
  byDistrict: { [district: string]: number };
  byUrgency: { [urgency: string]: number };
  byHospital: { [hospital: string]: number };
}
