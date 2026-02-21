
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8fafc",
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
  },

  card: {
    width: "400px",
    backgroundColor: "#ffffff",
    borderRadius: "28px",
    padding: "50px 40px",
    textAlign: "center",
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02)",
    border: "1px solid #e2e8f0",
  },

  logo: {
    width: "180px",
    marginBottom: "2.5rem",
  },

  title: {
    fontSize: "1.5rem",
    fontWeight: "800",
    color: "#0f172a",
    marginBottom: "0.5rem",
    letterSpacing: "-0.02em",
  },

  subtitle: {
    fontSize: "0.95rem",
    color: "#64748b",
    marginBottom: "2.5rem",
  },

  inputGroup: {
    textAlign: "left",
    marginBottom: "20px",
  },

  label: {
    display: "block",
    fontSize: "0.875rem",
    fontWeight: "600",
    color: "#475569",
    marginBottom: "8px",
    paddingLeft: "4px",
  },

  input: {
    width: "100%",
    padding: "14px 18px",
    borderRadius: "14px",
    border: "1px solid #e2e8f0",
    backgroundColor: "#ffffff",
    fontSize: "1rem",
    color: "#1e293b",
    outline: "none",
    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    boxSizing: "border-box",
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
  },

  inputFocus: {
    borderColor: "#3b82f6",
    boxShadow: "0 0 0 4px rgba(59, 130, 246, 0.1), 0 1px 2px rgba(0, 0, 0, 0.05)",
  },

  primaryButton: {
    width: "100%",
    padding: "16px",
    borderRadius: "16px",
    backgroundColor: "#0f172a",
    color: "#ffffff",
    border: "none",
    fontSize: "1rem",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    boxShadow: "0 10px 15px -3px rgba(15, 23, 42, 0.15)",
    marginTop: "10px",
  },

  secondaryButton: {
    width: "100%",
    padding: "14px",
    borderRadius: "16px",
    backgroundColor: "transparent",
    color: "#64748b",
    border: "1px solid #e2e8f0",
    fontSize: "0.95rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s",
    marginTop: "16px",
  },
};

const Login = () => {
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPassFocused, setIsPassFocused] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.setItem("isLoggedIn", "true");
    navigate("/");
    window.location.reload();
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
          <img
            src="/ChatGPT Image Feb 21, 2026, 11_17_22 AM.png"
            alt="Fleet Flow Logo"
            style={styles.logo}
          />
        </div>

        <h2 style={styles.title}>Welcome back</h2>
        <p style={styles.subtitle}>Enter your details to access your fleet.</p>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Username</label>
          <input
            type="text"
            placeholder="Enter your username"
            style={{
              ...styles.input,
              ...(isEmailFocused ? styles.inputFocus : {})
            }}
            onFocus={() => setIsEmailFocused(true)}
            onBlur={() => setIsEmailFocused(false)}
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Password</label>
          <input
            type="password"
            placeholder="••••••••"
            style={{
              ...styles.input,
              ...(isPassFocused ? styles.inputFocus : {})
            }}
            onFocus={() => setIsPassFocused(true)}
            onBlur={() => setIsPassFocused(false)}
          />
        </div>

        <button
          style={styles.primaryButton}
          onClick={handleLogin}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = "#1e293b";
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 20px 25px -5px rgba(15, 23, 42, 0.2)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = styles.primaryButton.backgroundColor;
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = styles.primaryButton.boxShadow;
          }}
        >
          Login
        </button>

        <button
          style={styles.secondaryButton}
          onClick={() => navigate("/register")}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = "#f8fafc";
            e.currentTarget.style.borderColor = "#cbd5e1";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.borderColor = "#e2e8f0";
          }}
        >
          Create new account
        </button>
      </div>
    </div>
  );
};

export default Login;
