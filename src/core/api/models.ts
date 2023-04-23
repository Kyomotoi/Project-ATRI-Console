export interface BaseResponse {
  status: number
  detail: string
  data: any
}

export interface BlockList {
  user: any[]
  group: any[]
  user_total: number
}
