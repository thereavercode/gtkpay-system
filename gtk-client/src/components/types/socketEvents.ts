// src/types/socketEvents.ts
export interface ServerToClientEvents {
  transactionUpdate: (transaction: Transaction) => void;
}

export interface ClientToServerEvents {
  // define events sent from client if needed
}

export interface Transaction {
  transactionId: string;
  amount: number;
  phone: string;
  timestamp: string;
  status: string;
}
