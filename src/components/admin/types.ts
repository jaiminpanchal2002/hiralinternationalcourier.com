export type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "checkbox"
  | "select"
  | "date"
  | "datetime";

export type Field = {
  name: string;
  label: string;
  type: FieldType;
  options?: { value: string; label: string }[];
  placeholder?: string;
  required?: boolean;
  colSpan?: 1 | 2;
  help?: string;
  rows?: number;
};

export type ManagerItem = {
  id: string;
  values: Record<string, string | number | boolean>;
  primary: string;
  secondary?: string;
  meta?: string[];
  published?: boolean;
  href?: string; // optional deep link (e.g. shipment timeline)
};
