export interface CustomInputConfig {
    FormControlName: string;
    label: string;
    placeholder?: string;
    type?: string;
    icon?:string;
    value?: any;

    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    errorMessage?: string;
    options?: { value: string; label: string }[];
    multiple?: boolean;
    disabled?: boolean;
    readonly?: boolean;
}
