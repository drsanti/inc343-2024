export interface QNetWebSocketMessage {
  sender: string;
  topic: string;
  content: any;
}

export interface AnalogData {
  source: string;
  timestamp: string;
  data: {
    count: number;
    values: number[];
  };
}
export interface DigitalData {
  source: string;
  timestamp: string;
  data: {
    count: number;
    values: boolean[];
  };
}
