export interface ToastAction {
  label: string;
  onClick: () => void;
}

export interface ToastOptions {
  description?: string;
  duration?: number;
  icon?: string;
  action?: ToastAction;
  type?: 'default' | 'success' | 'error' | 'warning' | 'info' | 'loading';
}

export interface ToastConfigOptions {
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  duration?: number;
  maxVisible?: number;
  maxToasts?: number;
  /** Show a "dismiss all" button beside the stack when 2+ toasts are showing. Default false. */
  clearAll?: boolean;
  /** Label for the dismiss-all button. Default "Dismiss all". */
  clearAllLabel?: string;
}

export interface PromiseStates<T> {
  loading?: string;
  success?: string | ((data: T) => string);
  error?: string | ((error: any) => string);
}

export interface Toast {
  (message: string, options?: ToastOptions): number;
  success(message: string, options?: Omit<ToastOptions, 'type'>): number;
  error(message: string, options?: Omit<ToastOptions, 'type'>): number;
  warning(message: string, options?: Omit<ToastOptions, 'type'>): number;
  info(message: string, options?: Omit<ToastOptions, 'type'>): number;
  loading(message: string, options?: Omit<ToastOptions, 'type'>): number;
  promise<T>(promise: Promise<T>, states?: PromiseStates<T>): Promise<T>;
  dismiss(id?: number): void;
  /** Dismiss every toast except loading ones. */
  dismissAll(): void;
  configure(opts: ToastConfigOptions): void;
}

export declare const toast: Toast;
export default toast;
