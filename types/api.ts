import { User } from './auth';

// Generic API Response
export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
}

// Paginated Response
export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// Component types
export interface Component {
  id: string;
  product_name: string;
  category: 'Appliance' | 'Panel' | 'Battery' | 'Inverter';
  sku: string;
  average_wattage: number;
  nominal_voltage: number;
  surge_wattage: number;
  image_url?: string;
  daily_run_time?: number;
  is_ac_load: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateComponentData {
  product_name: string;
  category: 'Appliance' | 'Panel' | 'Battery' | 'Inverter';
  sku: string;
  average_wattage: number;
  nominal_voltage: number;
  surge_wattage?: number;
  image_url?: string;
  daily_run_time?: number;
  is_ac_load?: boolean;
}

export interface ComponentFilters {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
}

export interface ComponentStats {
  total: number;
  byCategory: Array<{ category: string; count: number }>;
  missingWattage: number;
}

// Calculation types
export interface LoadItem {
  id: string;
  name: string;
  wattage: number;
  hoursPerDay: number;
}

export interface SystemInputs {
  backupTime: number;
  peakSunHours: number;
  panelFactor: number;
  depthOfDischarge: number;
  batteryEfficiency: number;
  percentageOnLoad: number;
}

export interface CalculationResults {
  totalLoadPower: number;
  averageDailyUsage: number;
  batteryCapacity?: number;
  solarPanelCapacity?: number;
  inverterSize?: number;
}

export interface Calculation {
  id: string;
  user_id?: string;
  calculation_name?: string;
  loads: LoadItem[];
  system_inputs: SystemInputs;
  results: CalculationResults;
  created_at: string;
}

export interface SaveCalculationData {
  calculation_name?: string;
  loads: LoadItem[];
  system_inputs: SystemInputs;
  results: CalculationResults;
}

// Contact types
export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  status: 'new' | 'in_progress' | 'resolved';
  created_at: string;
  updated_at: string;
}

export interface SubmitContactData {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

// Dashboard types
export interface DashboardStats {
  components: {
    total: number;
    byCategory: Array<{ category: string; count: number }>;
    missingWattage: number;
  };
  inquiries: {
    total: number;
    byStatus: Array<{ status: string; count: number }>;
    lastWeek: number;
  };
  calculations: {
    total: number;
    lastWeek: number;
  };
  users?: {
    total: number;
    admins: number;
    engineers: number;
    viewers: number;
  };
}

export interface Activity {
  type: 'component' | 'calculation' | 'inquiry';
  id: string;
  name: string;
  created_at: string;
  user_name?: string;
  email?: string;
}

export interface UserDashboardStats {
  totalCalculations: number;
  recentCalculations: Array<{
    id: string;
    calculation_name?: string;
    created_at: string;
  }>;
}
