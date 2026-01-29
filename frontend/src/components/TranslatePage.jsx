

import React from "react";
import "../App.css";

const TranslatePage = ({
  onLogout,
  onTranslate,
  onClear,
  text,
  setText,
  targetLanguage,
  setTargetLanguage,
  languages,
  result,
  loading,
  error
}) => {
  return (
    <div className="login-bg">
      <div className="login-container">
        <div className="login-info-panel">
          <h2>AI Text Translator</h2>
          <p>Translate your text instantly to any language. Fast, efficient, and productive.</p>
        </div>
        <div className="login-form-panel">
          <div className="login-title">Translate</div>
          <form className="login-form" onSubmit={onTranslate}>
            <textarea
              className="login-input"
              placeholder="Enter text to translate"
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
              style={{ minHeight: 80 }}
            />
            <select
              className="login-input"
              value={targetLanguage}
              onChange={(e) => setTargetLanguage(e.target.value)}
              required
            >
              <option value="">Select language</option>
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
            <button className="login-btn" type="submit" disabled={loading}>
              {loading ? "Translating..." : "Translate"}
            </button>
            <button className="login-btn" type="button" style={{background: '#b3cfff', color: '#2563eb'}} onClick={onClear}>
              Clear
            </button>
            {error && <div className="error" style={{marginTop: 12}}>{error}</div>}
          </form>
          {result && (
            <div className="translate-result">
              <h2>Result</h2>
              <div className="translated-text">{result}</div>
            </div>
          )}
          <button className="translate-logout" onClick={onLogout} title="Logout" style={{marginTop: 24, alignSelf: 'flex-end'}}>⨉</button>
        </div>
      </div>
    </div>
  );
};

export default TranslatePage;
