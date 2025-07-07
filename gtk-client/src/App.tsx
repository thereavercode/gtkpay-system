import React, { useState } from "react";
import PaymentForm from "./components/PaymentForm";
import Dashboard from "./components/dashboard";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
function App() {
  const [showDashboard, setShowDashboard] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<PaymentForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
// Note: Ensure that the PaymentForm and Dashboard components are correctly implemented
// and that the necessary socket.io client setup is done in the dashboard component.
