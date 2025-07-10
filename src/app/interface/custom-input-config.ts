export interface CustomInputConfig {
  FormControlName: string;
  label: string;
  placeholder?: string;
  type?: string;
  icon?: string;
  value?: any;
  disabled?: boolean;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  errorMessage?: string;
  options?: { value: string; label: string }[];
  multiple?: boolean;
  readonly?: boolean;
  onlyNumbers?: boolean;
  input?: (event: Event) => void;
}
