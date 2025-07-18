export interface InputOTPProps {
    length?: number;
    value?: string;
    onChange?: (value: string) => void;
    onComplete?: (value: string) => void;
    variant?: 'default' | 'error' | 'success';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    autoFocus?: boolean;
    type?: 'text' | 'number';
    placeholder?: string;
    className?: string;
    brutalistShadow?: boolean;
}
export declare const InputOTP: import("react").ForwardRefExoticComponent<InputOTPProps & import("react").RefAttributes<HTMLDivElement>>;
