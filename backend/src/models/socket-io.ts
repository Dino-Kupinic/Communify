/**
 * Represents the events that can be sent from the server to the client.
 */
export interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
}

/**
 * Represents the events sent from the client to the server.
 */
export interface ClientToServerEvents {
  hello: () => void;
}

/**
 * Represents the interface for Inter-Server Events.
 * @interface
 */
export interface InterServerEvents {
  ping: () => void;
}

/**
 * Represents data to be sent/received over a socket connection.
 * @interface
 */
export interface SocketData {
  name: string;
  age: number;
}