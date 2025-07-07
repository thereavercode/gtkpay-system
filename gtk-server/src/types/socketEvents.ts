// src/types/socketEvents.ts
export interface ServerToClientEvents {
  transactionUpdate: (transaction: Transaction) => void;
}

export interface ClientToServerEvents {
  // define client-to-server events if any
}

export interface Transaction {
  transactionId: string;
  amount: number;
  phone: string;
  timestamp: string;
  status: string;
}
