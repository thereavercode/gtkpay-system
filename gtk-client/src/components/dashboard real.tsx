import React, { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import type {
  ServerToClientEvents,
  ClientToServerEvents,
  Transaction,
} from "./types/socketEvents";

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  "http://localhost:3000"
);

const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    socket.on("transactionUpdate", (transaction) => {
      setTransactions((prev) => [transaction, ...prev]);
    });

    return () => {
      socket.off("transactionUpdate");
    };
  }, []);

  return (
    <div>
      <h1>Real-Time Transactions</h1>
      {transactions.length === 0 ? (
        <p>No transactions yet.</p>
      ) : (
        <ul>
          {transactions.map(
            ({ transactionId, phone, amount, timestamp, status }) => (
              <li key={transactionId}>
                {phone} paid ${amount.toFixed(2)} at{" "}
                {new Date(timestamp).toLocaleString()} ({status})
              </li>
            )
          )}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;
