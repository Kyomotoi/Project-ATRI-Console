function getWebSocketURL(path: string): string {
  const isDebug = localStorage.getItem('isDebug');
  let host, port;
  if (isDebug) {
    host = localStorage.getItem('host');
    port = localStorage.getItem('port');
  }
  const token = localStorage.getItem('token');
  return `${isDebug ? `ws://${host}:${port}` : window.location.origin.replace(/^http/, 'ws')}${path}?token=${token}`;
}

export class WebUIWebSocket {
  path: string;
  client?: WebSocket;

  constructor(path: string) {
    this.path = path;
  }

  init(): WebUIWebSocket {
    const wsURL = getWebSocketURL(this.path);
    this.client = new WebSocket(wsURL);
    return this;
  }

  connect() {
    return new Promise<WebSocket>((resolve, reject) => {
      if (!this.client) {
        reject('WebSocket 未初始化');
        return;
      }
      this.client.addEventListener('open', () => {
        resolve(this.client as WebSocket);
      });
      this.client.addEventListener('error', (event) => {
        reject(event);
      });
    })
  }
}