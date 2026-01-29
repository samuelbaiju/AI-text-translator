
import React from "react";
import "../App.css";

const LoginPage = ({ onLogin, error, loading }) => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <div className="login-bg">
      <div className="login-container">
        <div className="login-info-panel">
          <h2>Fast, Efficient and Productive</h2>
          <p>Welcome to the AI text translator</p>
        </div>
        <div className="login-form-panel">
          <div className="login-title">Sign In</div>
          <form className="login-form" onSubmit={handleSubmit}>
            <input
              className="login-input"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
              required
            />
            <input
              className="login-input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button className="login-btn" type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
            {error && <div className="error" style={{marginTop: 12}}>{error}</div>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
