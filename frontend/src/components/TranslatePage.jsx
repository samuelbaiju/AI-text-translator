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
    <div className="inputbox-bg">
      <div className="inputbox-card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div className="rainbow-text">AI Text Translator</div>
          <button className="inputbox-close logout-btn" onClick={onLogout} title="Logout">⨉</button>
        </div>
        <form className="inputbox-form" onSubmit={onTranslate}>
          <textarea
            className="inputbox-text"
            placeholder="Enter text to translate"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
            style={{ minHeight: 80 }}
          />
          <select
            className="inputbox-select"
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
          <div className="inputbox-btns">
            <button className="inputbox-clear" type="button" onClick={onClear}>
              Clear
            </button>
            <button className="inputbox-submit" type="submit" disabled={loading}>
              {loading ? "Translating..." : "Translate"}
            </button>
          </div>
          {error && <div className="error">{error}</div>}
        </form>
        {result && (
          <div className="result">
            <h2>Result</h2>
            <div className="translated-text">{result}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TranslatePage;
