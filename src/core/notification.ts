import { Notifications } from "@/store/app";
import { ToastOptions } from "vue3-toastify";
import { Id } from "vue3-toastify";
import { Content } from "vue3-toastify";
import { toast } from "vue3-toastify";

interface notificationData {
  info: noticeDetail[];
  error: noticeDetail[];
  warning: noticeDetail[];
}

interface noticeDetail {
  id: number | string;
  content: string;
}

export interface Notices {
  [key: string]: notificationData;
}

let rawNotice: Notices = {};

export class ToastWrapper {
  header: string

  constructor(header: string) {
    this.header = header
  }

  private addToNotifications(type: keyof notificationData, id: Id, content: any): void {
    rawNotice = Notifications().notices;
    rawNotice[this.header] = rawNotice[this.header] || { info: [], error: [], warning: [] };
    rawNotice[this.header][type].push({
      id: id,
      content: content,
    });
    Notifications().notices = rawNotice;
  }

  info(content: Content, options?: ToastOptions): void {
    this.addToNotifications('info', toast.info(content, options), content);
  }

  error(content: Content, options?: ToastOptions): void {
    this.addToNotifications('error', toast.error(content, options), content);
  }

  warn(content: Content, options?: ToastOptions): void {
    this.addToNotifications('warning', toast.warn(content, options), content);
  }

  success(content: Content, options?: ToastOptions): void {
    toast.success(content, options);
  }
}
