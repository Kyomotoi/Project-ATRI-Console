export interface WebsocketPerformanceData {
  status: number
  detail: string
  data: Data
}

interface Data {
  platform: Platform
  cpu: Cpu
  mem: Mem
  disk: Disk
  net: Net
}

interface Platform {
  name: string
  struct: string
  type: string
}

interface Cpu {
  name: string
  count: number
  max_freq: string
  current_freq: string
  percent: number
  process: number
}

interface Mem {
  total: number
  available: number
  percent: number
  used: number
  free: number
  swap_total: number
  swap_used: number
  swap_free: number
  swap_percent: number
  swap_sin: number
  swap_sout: number
}

interface Disk {
  name: string
  total: number
  used: number
  free: number
  drive: number
}

interface Net {
  speed: number[]
  sent_total: number
  recv_total: number
  package_sent: number
  package_recv: number
}
