
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
    <div className="translate-bg">
      <div className="translate-card">
        <div className="translate-header">
          <div className="translate-title">AI Text Translator</div>
          <button className="translate-logout" onClick={onLogout} title="Logout">⨉</button>
        </div>
        <form className="translate-form" onSubmit={onTranslate}>
          <textarea
            className="translate-input"
            placeholder="Enter text to translate"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
            style={{ minHeight: 80 }}
          />
          <select
            className="translate-select"
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
          <button className="translate-btn" type="submit" disabled={loading}>
            {loading ? "Translating..." : "Translate"}
          </button>
          <button className="translate-clear" type="button" onClick={onClear}>
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
      </div>
    </div>
  );
};

export default TranslatePage;
