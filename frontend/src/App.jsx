

import { useState } from 'react';
import './App.css';

const LANGUAGES = [
  { code: 'af', name: 'Afrikaans' }, { code: 'sq', name: 'Albanian' }, { code: 'am', name: 'Amharic' },
  { code: 'ar', name: 'Arabic' }, { code: 'hy', name: 'Armenian' }, { code: 'az', name: 'Azerbaijani' },
  { code: 'eu', name: 'Basque' }, { code: 'be', name: 'Belarusian' }, { code: 'bn', name: 'Bengali' },
  { code: 'bs', name: 'Bosnian' }, { code: 'bg', name: 'Bulgarian' }, { code: 'ca', name: 'Catalan' },
  { code: 'ceb', name: 'Cebuano' }, { code: 'ny', name: 'Chichewa' }, { code: 'zh-cn', name: 'Chinese (Simplified)' },
  { code: 'zh-tw', name: 'Chinese (Traditional)' }, { code: 'co', name: 'Corsican' }, { code: 'hr', name: 'Croatian' },
  { code: 'cs', name: 'Czech' }, { code: 'da', name: 'Danish' }, { code: 'nl', name: 'Dutch' },
  { code: 'en', name: 'English' }, { code: 'eo', name: 'Esperanto' }, { code: 'et', name: 'Estonian' },
  { code: 'tl', name: 'Filipino' }, { code: 'fi', name: 'Finnish' }, { code: 'fr', name: 'French' },
  { code: 'fy', name: 'Frisian' }, { code: 'gl', name: 'Galician' }, { code: 'ka', name: 'Georgian' },
  { code: 'de', name: 'German' }, { code: 'el', name: 'Greek' }, { code: 'gu', name: 'Gujarati' },
  { code: 'ht', name: 'Haitian Creole' }, { code: 'ha', name: 'Hausa' }, { code: 'haw', name: 'Hawaiian' },
  { code: 'iw', name: 'Hebrew' }, { code: 'he', name: 'Hebrew' }, { code: 'hi', name: 'Hindi' },
  { code: 'hmn', name: 'Hmong' }, { code: 'hu', name: 'Hungarian' }, { code: 'is', name: 'Icelandic' },
  { code: 'ig', name: 'Igbo' }, { code: 'id', name: 'Indonesian' }, { code: 'ga', name: 'Irish' },
  { code: 'it', name: 'Italian' }, { code: 'ja', name: 'Japanese' }, { code: 'jw', name: 'Javanese' },
  { code: 'kn', name: 'Kannada' }, { code: 'kk', name: 'Kazakh' }, { code: 'km', name: 'Khmer' },
  { code: 'ko', name: 'Korean' }, { code: 'ku', name: 'Kurdish (Kurmanji)' }, { code: 'ky', name: 'Kyrgyz' },
  { code: 'lo', name: 'Lao' }, { code: 'la', name: 'Latin' }, { code: 'lv', name: 'Latvian' },
  { code: 'lt', name: 'Lithuanian' }, { code: 'lb', name: 'Luxembourgish' }, { code: 'mk', name: 'Macedonian' },
  { code: 'mg', name: 'Malagasy' }, { code: 'ms', name: 'Malay' }, { code: 'ml', name: 'Malayalam' },
  { code: 'mt', name: 'Maltese' }, { code: 'mi', name: 'Maori' }, { code: 'mr', name: 'Marathi' },
  { code: 'mn', name: 'Mongolian' }, { code: 'my', name: 'Myanmar (Burmese)' }, { code: 'ne', name: 'Nepali' },
  { code: 'no', name: 'Norwegian' }, { code: 'or', name: 'Odia' }, { code: 'ps', name: 'Pashto' },
  { code: 'fa', name: 'Persian' }, { code: 'pl', name: 'Polish' }, { code: 'pt', name: 'Portuguese' },
  { code: 'pa', name: 'Punjabi' }, { code: 'ro', name: 'Romanian' }, { code: 'ru', name: 'Russian' },
  { code: 'sm', name: 'Samoan' }, { code: 'gd', name: 'Scots Gaelic' }, { code: 'sr', name: 'Serbian' },
  { code: 'st', name: 'Sesotho' }, { code: 'sn', name: 'Shona' }, { code: 'sd', name: 'Sindhi' },
  { code: 'si', name: 'Sinhala' }, { code: 'sk', name: 'Slovak' }, { code: 'sl', name: 'Slovenian' },
  { code: 'so', name: 'Somali' }, { code: 'es', name: 'Spanish' }, { code: 'su', name: 'Sundanese' },
  { code: 'sw', name: 'Swahili' }, { code: 'sv', name: 'Swedish' }, { code: 'tg', name: 'Tajik' },
  { code: 'ta', name: 'Tamil' }, { code: 'te', name: 'Telugu' }, { code: 'th', name: 'Thai' },
  { code: 'tr', name: 'Turkish' }, { code: 'uk', name: 'Ukrainian' }, { code: 'ur', name: 'Urdu' },
  { code: 'ug', name: 'Uyghur' }, { code: 'uz', name: 'Uzbek' }, { code: 'vi', name: 'Vietnamese' },
  { code: 'cy', name: 'Welsh' }, { code: 'xh', name: 'Xhosa' }, { code: 'yi', name: 'Yiddish' },
  { code: 'yo', name: 'Yoruba' }, { code: 'zu', name: 'Zulu' }
];


function App() {
  const [text, setText] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('');
  const [translated, setTranslated] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showBox, setShowBox] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setTranslated('');
    try {
      const response = await fetch('https://ai-text-translator.onrender.com/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, target_language: targetLanguage })
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail || 'Translation failed');
      }
      const data = await response.json();
      setTranslated(data.translated_text);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setText('');
    setTargetLanguage('');
    setTranslated('');
    setError('');
  };

  if (!showBox) return null;

  return (
    <div className="inputbox-bg">
      <div className="inputbox-card">
        <div className="inputbox-header">
          <span className="inputbox-title">Input Field</span>
          <button className="inputbox-close" onClick={() => setShowBox(false)} title="Close">×</button>
        </div>
        <form onSubmit={handleSubmit} className="inputbox-form">
          <input
            className="inputbox-text"
            type="text"
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Enter text to translate"
            required
          />
          <select
            className="inputbox-select"
            value={targetLanguage}
            onChange={e => setTargetLanguage(e.target.value)}
            required
          >
            <option value="">Select language</option>
            {LANGUAGES.map(lang => (
              <option key={lang.code} value={lang.code}>{lang.name}</option>
            ))}
          </select>
          <div className="inputbox-btns">
            <button
              type="button"
              className="inputbox-clear"
              onClick={handleClear}
              tabIndex={-1}
            >CLEAR</button>
            <button
              type="submit"
              className="inputbox-submit"
              disabled={loading}
            >{loading ? 'Translating...' : 'Translate'}</button>
          </div>
        </form>
        {error && <div className="error">{error}</div>}
        {translated && (
          <div className="result">
            <h2>Translated Text:</h2>
            <div className="translated-text">{translated}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
