import React from 'react';
import { cn } from '@/lib/utils';
import Input, { InputProps } from '../ui/Input';
import Textarea, { TextareaProps } from '../ui/Textarea';
import Select, { SelectProps } from '../ui/Select';

interface BaseFormFieldProps {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  className?: string;
}

type FormFieldInputProps = BaseFormFieldProps & InputProps & { as?: 'input' };
type FormFieldTextareaProps = BaseFormFieldProps & TextareaProps & { as: 'textarea' };
type FormFieldSelectProps = BaseFormFieldProps & SelectProps & { as: 'select' };

export type FormFieldProps = FormFieldInputProps | FormFieldTextareaProps | FormFieldSelectProps;

const FormField = React.forwardRef<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement,
  FormFieldProps
>(({ label, error, helperText, required, className, as = 'input', ...props }, ref) => {
  const id = props.id || `field-${Math.random().toString(36).substr(2, 9)}`;
  const hasError = !!error;

  const renderField = () => {
    switch (as) {
      case 'textarea':
        return (
          <Textarea
            id={id}
            error={hasError}
            ref={ref as React.Ref<HTMLTextAreaElement>}
            aria-invalid={hasError}
            aria-describedby={error ? `${id}-error` : helperText ? `${id}-helper` : undefined}
            {...(props as TextareaProps)}
          />
        );
      case 'select':
        return (
          <Select
            id={id}
            error={hasError}
            ref={ref as React.Ref<HTMLSelectElement>}
            aria-invalid={hasError}
            aria-describedby={error ? `${id}-error` : helperText ? `${id}-helper` : undefined}
            {...(props as SelectProps)}
          />
        );
      default:
        return (
          <Input
            id={id}
            error={hasError}
            ref={ref as React.Ref<HTMLInputElement>}
            aria-invalid={hasError}
            aria-describedby={error ? `${id}-error` : helperText ? `${id}-helper` : undefined}
            {...(props as InputProps)}
          />
        );
    }
  };

  return (
    <div className={cn('space-y-1.5', className)}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}
      {renderField()}
      {error && (
        <p id={`${id}-error`} className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
      {helperText && !error && (
        <p id={`${id}-helper`} className="text-sm text-gray-600">
          {helperText}
        </p>
      )}
    </div>
  );
});

FormField.displayName = 'FormField';

export default FormField;
