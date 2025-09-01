import { useState } from "react";
import Login from "./Login";
import Dashboard from "./Dashboard";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ email: string; role: string } | null>(null);

  const handleLogin = (email: string, password: string) => {
    // Simulate authentication
    if (email === "admin@remindme.com" && password === "admin123") {
      setUser({ email, role: "admin" });
      setIsAuthenticated(true);
    } else if (email === "user@remindme.com" && password === "user123") {
      setUser({ email, role: "user" });
      setIsAuthenticated(true);
    } else {
      // For demo, accept any email/password combination
      setUser({ email, role: "user" });
      setIsAuthenticated(true);
    }
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return <Dashboard />;
};

export default Index;
