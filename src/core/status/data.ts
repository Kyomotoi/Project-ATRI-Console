import { WebUIWebSocket } from "../utils/ws";
import type { WebsocketPerformanceData } from "./models";

const ws = new WebUIWebSocket('/capi/status').init();

function connect() {
  ws.connect();
  if (!ws.client) {
    return;
  }
  ws.client.onmessage = (event) => {
    const data: WebsocketPerformanceData = JSON.parse(event.data);
    
  }
}

connect()
