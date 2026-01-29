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
    <div className="inputbox-bg">
      <div className="inputbox-card">
        <div className="rainbow-text" style={{marginBottom: "2rem"}}>Sign In</div>
        <form className="inputbox-form" onSubmit={handleSubmit}>
          <input
            className="inputbox-text"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoFocus
            required
          />
          <input
            className="inputbox-text"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="inputbox-submit" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
          {error && <div className="error">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
