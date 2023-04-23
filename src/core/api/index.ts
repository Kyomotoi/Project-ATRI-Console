import axios, { AxiosResponse } from 'axios';

import { BaseResponse, BlockList } from './models';

export class API {
  token: string;
  isDebug: boolean;

  constructor(token: string, isDebug: boolean = false) {
    this.token = token;
    this.isDebug = isDebug;
  }

  private genDoamin(): string {
    if (this.isDebug) {
      const host = localStorage.getItem('host');
      const port = localStorage.getItem('port');
      return `//${host}:${port}/capi`;
    }
    return '/capi';
  }

  private async handleErrorResponse(error: any): Promise<never> {
    const data = error.response;
    if (data.status === 404) {
      throw new Error('ATRI 实例未找到');
    } else if (data.status === 403) {
      const msg = data.detail;
      throw new Error('密钥验证未通过，信息：' + msg)
    }

    throw new Error(`请求数据失败，节点：${error.config.url}`);
  }

  private async baseRequest(endpoint: string, params = {}): Promise<BaseResponse> {
    const url = this.genDoamin() + endpoint;
    try {
      const resp: AxiosResponse<BaseResponse> = await axios.get(
        url, { params: {...params, token: this.token} }
      );
      if (resp.data.status === 200) {
        return resp.data;
      } else {
        // TODO: 保留自定错误
        throw new Error('...');
      }
    } catch (error: any) {
      await this.handleErrorResponse(error)
      return Promise.reject(error);
    }
  }

  async auth(): Promise<boolean> {
    const resp = await this.baseRequest('/auth');
    return resp?.status === 200 ? true : false;
  }

  async getServiceList() {
    const resp = await this.baseRequest('/service/list');
    return resp.data;
  }

  async editService(service: string, enabled: number, forGlobal: number, userID: number = 0, groupID: number = 0) {
    const params = {
      service: service,
      enabled: enabled,
      for_global: forGlobal,
      user_id: userID,
      group_id: groupID,
    }
    const resp = await this.baseRequest('/service/edit', params);
    return resp.data;
  }

  async getBlockList(): Promise<BlockList> {
    const resp = await this.baseRequest('/block/list');
    return resp.data;
  }

  async editBlockList(enabled: number, userID: number, groupID: number): Promise<BlockList> {
    const params = {
      enabled: enabled,
      user_id: userID,
      group_id: groupID,
    }
    const resp = await this.baseRequest('/block/edit', params);
    return resp.data;
  }

  async getPermList() {
    const resp = await this.baseRequest('/perm/list');
    return resp.data;
  }

  async editPermList(enabled: number, userID: number) {
    const params = {
      enabled: enabled,
      user_id: userID,
    }
    const resp = await this.baseRequest('/perm/edit', params);
    return resp.data;
  }
}
