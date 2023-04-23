import { ToastOptions } from "vue3-toastify";
import { Id } from "vue3-toastify";
import { Content } from "vue3-toastify";
import { toast } from "vue3-toastify";

interface notificationData {
  info: any[],
  error: any[],
  warn: any[],
}

export const Notifications: {[key: string]: notificationData} = {};

export class ToastWrapper {
  header: string

  constructor(header: string) {
    this.header = header
  }

  private addToNotifications(type: keyof notificationData, content: any): void {
    Notifications[this.header] = Notifications[this.header] || { info: [], error: [], warn: [] };
    Notifications[this.header][type].push(content);
  }

  info(content: Content, options?: ToastOptions): Id {
    this.addToNotifications('info', content);
    return toast.info(content, options);
  }

  error(content: Content, options?: ToastOptions): Id {
    this.addToNotifications('error', content);
    return toast.error(content, options);
  }

  warn(content: Content, options?: ToastOptions): Id {
    this.addToNotifications('warn', content);
    return toast.warn(content, options);
  }

  success(content: Content, options?: ToastOptions): Id {
    return toast.success(content, options);
  }
}
