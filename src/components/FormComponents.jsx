import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle2, Eye, EyeOff } from 'lucide-react';

const FormInput = ({
    label,
    type = 'text',
    placeholder,
    value,
    onChange,
    onBlur,
    error,
    touched,
    required = false,
    icon: Icon,
    showPasswordToggle = false,
    showPassword,
    onTogglePassword,
    disabled = false,
    className = '',
    ...props
}) => {
    const hasError = error && touched;
    
    return (
        <div className="space-y-2">
            {label && (
                <label className="text-[11px] font-extrabold text-slate-600 uppercase tracking-widest pl-3 flex items-center gap-2">
                    {Icon && <Icon size={14} />}
                    {label}
                    {required && <span className="text-red-500">*</span>}
                </label>
            )}
            <div className="relative group">
                {Icon && (
                    <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
                        hasError ? 'text-red-500' : 'text-slate-400 group-focus-within:text-primary'
                    }`}>
                        <Icon size={20} />
                    </div>
                )}
                <input
                    type={showPasswordToggle ? (showPassword ? 'text' : 'password') : type}
                    placeholder={placeholder}
                    required={required}
                    disabled={disabled}
                    className={`w-full ${Icon ? 'pl-12' : 'pl-6'} ${showPasswordToggle ? 'pr-12' : 'pr-6'} py-4 bg-white border-2 rounded-2xl font-medium text-slate-700 placeholder:text-slate-400 outline-none transition-all duration-300 ${
                        hasError
                            ? 'border-red-300 bg-red-50 focus:border-red-400 focus:ring-4 focus:ring-red-100'
                            : 'border-slate-200 focus:bg-white focus:border-primary/30 focus:ring-4 focus:ring-primary/10 hover:border-slate-300'
                    } ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    {...props}
                />
                {showPasswordToggle && (
                    <button
                        type="button"
                        onClick={onTogglePassword}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                )}
                {hasError && !showPasswordToggle && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                        <AlertCircle size={18} className="text-red-500" />
                    </div>
                )}
                {hasError && showPasswordToggle && (
                    <div className="absolute right-12 top-1/2 -translate-y-1/2">
                        <AlertCircle size={18} className="text-red-500" />
                    </div>
                )}
            </div>
            {hasError && (
                <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs text-red-600 font-medium pl-3 flex items-center gap-1"
                >
                    <AlertCircle size={12} />
                    {error}
                </motion.p>
            )}
        </div>
    );
};

const FormSelect = ({
    label,
    value,
    onChange,
    onBlur,
    error,
    touched,
    required = false,
    icon: Icon,
    options = [],
    disabled = false,
    className = '',
    placeholder = "Select an option",
    ...props
}) => {
    const hasError = error && touched;
    
    return (
        <div className="space-y-2">
            {label && (
                <label className="text-[11px] font-extrabold text-slate-600 uppercase tracking-widest pl-3 flex items-center gap-2">
                    {Icon && <Icon size={14} />}
                    {label}
                    {required && <span className="text-red-500">*</span>}
                </label>
            )}
            <div className="relative">
                {Icon && (
                    <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
                        hasError ? 'text-red-500' : 'text-slate-400'
                    }`}>
                        <Icon size={20} />
                    </div>
                )}
                <select
                    className={`w-full appearance-none ${Icon ? 'pl-12' : 'pl-6'} pr-12 py-4 bg-white border-2 rounded-2xl font-medium text-slate-700 outline-none transition-all duration-300 ${
                        hasError
                            ? 'border-red-300 bg-red-50 focus:border-red-400 focus:ring-4 focus:ring-red-100'
                            : 'border-slate-200 focus:bg-white focus:border-primary/30 focus:ring-4 focus:ring-primary/10 hover:border-slate-300'
                    } ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    disabled={disabled}
                    {...props}
                >
                    {placeholder && <option value="">{placeholder}</option>}
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M3.5 5.25L7 8.75L10.5 5.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
                {hasError && (
                    <div className="absolute right-12 top-1/2 -translate-y-1/2">
                        <AlertCircle size={18} className="text-red-500" />
                    </div>
                )}
            </div>
            {hasError && (
                <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs text-red-600 font-medium pl-3 flex items-center gap-1"
                >
                    <AlertCircle size={12} />
                    {error}
                </motion.p>
            )}
        </div>
    );
};

const FormTextarea = ({
    label,
    placeholder,
    value,
    onChange,
    onBlur,
    error,
    touched,
    required = false,
    icon: Icon,
    rows = 4,
    disabled = false,
    className = '',
    ...props
}) => {
    const hasError = error && touched;
    
    return (
        <div className="space-y-2">
            {label && (
                <label className="text-[11px] font-extrabold text-slate-600 uppercase tracking-widest pl-3 flex items-center gap-2">
                    {Icon && <Icon size={14} />}
                    {label}
                    {required && <span className="text-red-500">*</span>}
                </label>
            )}
            <div className="relative group">
                {Icon && (
                    <div className={`absolute left-4 top-6 transition-colors duration-300 ${
                        hasError ? 'text-red-500' : 'text-slate-400 group-focus-within:text-primary'
                    }`}>
                        <Icon size={20} />
                    </div>
                )}
                <textarea
                    placeholder={placeholder}
                    required={required}
                    disabled={disabled}
                    rows={rows}
                    className={`w-full ${Icon ? 'pl-12' : 'pl-6'} pr-6 py-4 bg-white border-2 rounded-2xl font-medium text-slate-700 placeholder:text-slate-400 outline-none transition-all duration-300 resize-none ${
                        hasError
                            ? 'border-red-300 bg-red-50 focus:border-red-400 focus:ring-4 focus:ring-red-100'
                            : 'border-slate-200 focus:bg-white focus:border-primary/30 focus:ring-4 focus:ring-primary/10 hover:border-slate-300'
                    } ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    {...props}
                />
                {hasError && (
                    <div className="absolute right-4 top-6">
                        <AlertCircle size={18} className="text-red-500" />
                    </div>
                )}
            </div>
            {hasError && (
                <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs text-red-600 font-medium pl-3 flex items-center gap-1"
                >
                    <AlertCircle size={12} />
                    {error}
                </motion.p>
            )}
        </div>
    );
};

const FormCheckbox = ({
    label,
    checked,
    onChange,
    onBlur,
    error,
    touched,
    required = false,
    disabled = false,
    className = '',
    ...props
}) => {
    const hasError = error && touched;
    
    return (
        <div className="space-y-2">
            <div className="flex items-center gap-3">
                <div className="relative">
                    <input
                        type="checkbox"
                        checked={checked}
                        onChange={onChange}
                        onBlur={onBlur}
                        disabled={disabled}
                        className={`w-5 h-5 rounded border-2 transition-all duration-300 ${
                            hasError
                                ? 'border-red-300 text-red-500 focus:border-red-400 focus:ring-4 focus:ring-red-100'
                                : 'border-slate-300 text-primary focus:border-primary/30 focus:ring-4 focus:ring-primary/10'
                        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
                        {...props}
                    />
                    {checked && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <CheckCircle2 size={16} className="text-primary" />
                        </div>
                    )}
                </div>
                {label && (
                    <label className="text-sm font-medium text-slate-700 cursor-pointer flex items-center gap-2">
                        {label}
                        {required && <span className="text-red-500">*</span>}
                    </label>
                )}
            </div>
            {hasError && (
                <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs text-red-600 font-medium pl-8 flex items-center gap-1"
                >
                    <AlertCircle size={12} />
                    {error}
                </motion.p>
            )}
        </div>
    );
};

const PasswordStrengthIndicator = ({ password }) => {
    const checks = [
        {
            label: 'At least 8 characters',
            valid: password.length >= 8
        },
        {
            label: 'Uppercase, lowercase & number',
            valid: /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)
        },
        {
            label: 'Special character',
            valid: /(?=.*[!@#$%^&*])/.test(password)
        }
    ];

    const strength = checks.filter(check => check.valid).length;

    return (
        <div className="mt-3 space-y-2">
            <div className="flex gap-1">
                {[1, 2, 3].map((level) => (
                    <div
                        key={level}
                        className={`h-2 flex-1 rounded-full transition-colors duration-300 ${
                            level <= strength
                                ? strength === 1
                                    ? 'bg-red-500'
                                    : strength === 2
                                    ? 'bg-yellow-500'
                                    : 'bg-green-500'
                                : 'bg-slate-200'
                        }`}
                    />
                ))}
            </div>
            {checks.map((check, index) => (
                <div key={index} className="flex items-center gap-2 text-xs">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                        check.valid ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-400'
                    }`}>
                        {check.valid && <CheckCircle2 size={12} />}
                    </div>
                    <span className={check.valid ? 'text-green-600 font-medium' : 'text-slate-500'}>
                        {check.label}
                    </span>
                </div>
            ))}
        </div>
    );
};

const FormError = ({ error, title = "Error" }) => {
    if (!error) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-sm font-medium flex items-start gap-3"
        >
            <AlertCircle size={20} className="text-red-500 flex-shrink-0 mt-0.5" />
            <div>
                <div className="font-semibold">{title}</div>
                <div className="text-red-600 mt-1">{error}</div>
            </div>
        </motion.div>
    );
};

export {
    FormInput,
    FormSelect,
    FormTextarea,
    FormCheckbox,
    PasswordStrengthIndicator,
    FormError
};
