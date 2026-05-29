// Shared domain types, mirrored from supabase/schema.sql.

export type Role = "consumer" | "mechanic" | "admin";

export type ScanResult = "genuine" | "counterfeit" | "unknown";

export type ReportStatus = "new" | "investigating" | "resolved";

export interface Mechanic {
  id: string;
  name: string;
  shop_name: string;
  city: string;
  country: string;
  certified: boolean;
  scan_count: number;
  counterfeit_finds: number;
  created_at: string;
}

export interface Part {
  id: string;
  qr_code: string;
  part_number: string;
  name: string;
  brand: string; // Peugeot | Citroën | Opel | Fiat
  vehicle_models: string[];
  plant: string;
  batch_number: string | null;
  manufactured_at: string | null;
  created_at: string;
}

export interface Scan {
  id: string;
  qr_code: string;
  result: ScanResult;
  scanned_by_role: Exclude<Role, "admin">;
  mechanic_id: string | null;
  city: string | null;
  country: string | null;
  created_at: string;
}

export interface Report {
  id: string;
  qr_code: string | null;
  seller_name: string;
  seller_location: string;
  price_paid: number | null;
  notes: string | null;
  reporter_role: Role;
  status: ReportStatus;
  created_at: string;
}
