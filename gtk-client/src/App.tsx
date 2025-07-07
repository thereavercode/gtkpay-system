import React, { useState } from "react";
import PaymentForm from "./components/PaymentForm";
import Dashboard from "./components/dashboard";

function App() {
  const [showDashboard, setShowDashboard] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <button
        className="mb-6 px-4 py-2 bg-blue-600 text-white rounded"
        onClick={() => setShowDashboard(!showDashboard)}
      >
        {showDashboard ? "Show Payment Form" : "Show Dashboard"}
      </button>

      {showDashboard ? <Dashboard /> : <PaymentForm />}
    </div>
  );
}

export default App;
// Note: Ensure that the PaymentForm and Dashboard components are correctly implemented
// and that the necessary socket.io client setup is done in the dashboard component.
