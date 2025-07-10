import { Input } from "@angular/core";

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
  inputRestrictions: InputRestrictions;
  input?: (event: Event) => void;
}

export interface InputRestrictions {
  onlyNumbers?: boolean;

}