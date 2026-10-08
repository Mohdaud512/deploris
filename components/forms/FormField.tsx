import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

type BaseProps = {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
};

export const TextField = forwardRef<
  HTMLInputElement,
  BaseProps & React.InputHTMLAttributes<HTMLInputElement>
>(function TextField({ id, label, hint, error, required, className, ...rest }, ref) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium text-brand-900 dark:text-white">
        {label}
        {required && <span className="text-red-600"> *</span>}
      </label>
      <input
        id={id}
        ref={ref}
        required={required}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={hint || error ? `${id}-desc` : undefined}
        className={cn(
          'rounded-lg border border-brand-900/20 bg-white px-3 py-2 text-brand-900 shadow-sm outline-none focus:ring-2 focus:ring-brand-500 dark:border-white/20 dark:bg-white/5 dark:text-white',
          error && 'border-red-500 focus:ring-red-500',
          className,
        )}
        {...rest}
      />
      {(hint || error) && (
        <p id={`${id}-desc`} className={cn('text-xs', error ? 'text-red-600' : 'text-brand-900/80 dark:text-white/60')}>
          {error ?? hint}
        </p>
      )}
    </div>
  );
});

export const TextAreaField = forwardRef<
  HTMLTextAreaElement,
  BaseProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(function TextAreaField({ id, label, hint, error, required, className, ...rest }, ref) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium text-brand-900 dark:text-white">
        {label}
        {required && <span className="text-red-600"> *</span>}
      </label>
      <textarea
        id={id}
        ref={ref}
        required={required}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={hint || error ? `${id}-desc` : undefined}
        rows={5}
        className={cn(
          'rounded-lg border border-brand-900/20 bg-white px-3 py-2 text-brand-900 shadow-sm outline-none focus:ring-2 focus:ring-brand-500 dark:border-white/20 dark:bg-white/5 dark:text-white',
          error && 'border-red-500 focus:ring-red-500',
          className,
        )}
        {...rest}
      />
      {(hint || error) && (
        <p id={`${id}-desc`} className={cn('text-xs', error ? 'text-red-600' : 'text-brand-900/80 dark:text-white/60')}>
          {error ?? hint}
        </p>
      )}
    </div>
  );
});

export function SelectField({
  id,
  label,
  options,
  value,
  onChange,
  required,
}: {
  id: string;
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium text-brand-900 dark:text-white">
        {label}
        {required && <span className="text-red-600"> *</span>}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="rounded-lg border border-brand-900/20 bg-white px-3 py-2 text-brand-900 shadow-sm outline-none focus:ring-2 focus:ring-brand-500 dark:border-white/20 dark:bg-white/5 dark:text-white"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

/** Honeypot an off-screen text input that must remain empty. */
export function Honeypot() {
  return (
    <div aria-hidden className="absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden">
      <label>
        Do not fill this field
        <input type="text" tabIndex={-1} autoComplete="off" name="hp" />
      </label>
    </div>
  );
}
