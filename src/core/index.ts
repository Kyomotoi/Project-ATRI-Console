import { API } from '@/core/api';
import { useAppStore } from '@/store/app';
import { toast } from 'vue3-toastify';


export async function isCanLogin() {
  const token = localStorage.getItem('token');
  if (token === null) {
    return;
  }
  const isDebug = localStorage.getItem('isDebug');
  const api = new API(token, isDebug === 'y' ? true : false);
  try {
    const result = await api.auth()
    if (result) {
      useAppStore().noATRI = false;
      toast.success('连接成功');
    }
  } catch (error: any) {
    toast.error(error.message);
  }
}
