import React, { useEffect, useState } from "react";

// Define the shape of a transaction object
interface Transaction {
  transactionId: string;
  amount: string; // kept as string because of toFixed()
  phone: string;
  timestamp: string;
  status: string;
}

const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const dummyTransaction: Transaction = {
        transactionId: Math.random().toString(36).substring(2, 10),
        amount: (Math.random() * 1000).toFixed(2),
        phone: "+2547" + Math.floor(Math.random() * 10000000),
        timestamp: new Date().toISOString(),
        status: "success",
      };
      setTransactions((prev) => [dummyTransaction, ...prev]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1>Real-Time Transactions (Dummy Data)</h1>
      <ul>
        {transactions.map(
          ({ transactionId, phone, amount, timestamp, status }) => (
            <li key={transactionId}>
              {phone} paid ${amount} at{" "}
              {new Date(timestamp).toLocaleTimeString()} ({status})
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default Dashboard;
