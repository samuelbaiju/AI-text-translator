
from googletrans import Translator, LANGUAGES
from app.models import TranslationRequest, TranslationResponse
import difflib

translator = Translator()

# ISO 639-2/3 alpha-3 to alpha-2 mapping for supported languages
ALPHA3_TO_ALPHA2 = {
    'afr': 'af', 'alb': 'sq', 'sqi': 'sq', 'amh': 'am', 'ara': 'ar', 'hye': 'hy', 'arm': 'hy', 'aze': 'az',
    'eus': 'eu', 'baq': 'eu', 'bel': 'be', 'ben': 'bn', 'bos': 'bs', 'bul': 'bg', 'cat': 'ca', 'ceb': 'ceb',
    'zho': 'zh-cn', 'chi': 'zh-cn', 'hrv': 'hr', 'ces': 'cs', 'cze': 'cs', 'dan': 'da', 'nld': 'nl', 'dut': 'nl',
    'eng': 'en', 'epo': 'eo', 'est': 'et', 'fil': 'tl', 'fin': 'fi', 'fra': 'fr', 'fre': 'fr', 'glg': 'gl',
    'kat': 'ka', 'geo': 'ka', 'deu': 'de', 'ger': 'de', 'ell': 'el', 'gre': 'el', 'guj': 'gu', 'hat': 'ht',
    'hau': 'ha', 'heb': 'he', 'hin': 'hi', 'hun': 'hu', 'isl': 'is', 'ice': 'is', 'ind': 'id', 'gle': 'ga',
    'ita': 'it', 'jpn': 'ja', 'jav': 'jw', 'kan': 'kn', 'kaz': 'kk', 'khm': 'km', 'kin': 'rw', 'kor': 'ko',
    'kur': 'ku', 'kir': 'ky', 'lao': 'lo', 'lav': 'lv', 'lit': 'lt', 'ltz': 'lb', 'lug': 'lg', 'mkd': 'mk',
    'mac': 'mk', 'mal': 'ml', 'mlt': 'mt', 'mri': 'mi', 'mao': 'mi', 'mar': 'mr', 'msa': 'ms', 'may': 'ms',
    'mya': 'my', 'bur': 'my', 'nep': 'ne', 'nor': 'no', 'oci': 'oc', 'ori': 'or', 'pan': 'pa', 'fas': 'fa',
    'per': 'fa', 'pol': 'pl', 'por': 'pt', 'ron': 'ro', 'rum': 'ro', 'rus': 'ru', 'smo': 'sm', 'srp': 'sr',
    'slk': 'sk', 'slo': 'sk', 'slv': 'sl', 'som': 'so', 'spa': 'es', 'sun': 'su', 'swa': 'sw', 'swe': 'sv',
    'tgl': 'tl', 'tam': 'ta', 'tel': 'te', 'tha': 'th', 'tur': 'tr', 'ukr': 'uk', 'urd': 'ur', 'uzb': 'uz',
    'vie': 'vi', 'cym': 'cy', 'wel': 'cy', 'yor': 'yo', 'zul': 'zu', 'guj': 'gu', 'guj': 'gu', 'guj': 'gu',
    # Add more as needed
}

def get_language_code(language: str) -> str:
    language = language.strip().lower()
    # Accept direct language code
    if language in LANGUAGES:
        return language
    # Accept alpha-3 code
    if language in ALPHA3_TO_ALPHA2:
        return ALPHA3_TO_ALPHA2[language]
    # Accept full language name (case-insensitive)
    for code, name in LANGUAGES.items():
        if name.lower() == language:
            return code
    # Fuzzy match for minor spelling errors in names
    all_names = [name.lower() for name in LANGUAGES.values()]
    close_matches = difflib.get_close_matches(language, all_names, n=1, cutoff=0.7)
    if close_matches:
        match = close_matches[0]
        for code, name in LANGUAGES.items():
            if name.lower() == match:
                return code
    raise ValueError(f"Unsupported language: {language}")

import logging

def translate_text(request: TranslationRequest) -> TranslationResponse:
    try:
        lang_code = get_language_code(request.target_language)
        logging.info(f"Translating '{request.text}' to '{request.target_language}' (code: {lang_code})")
        if not request.text.strip():
            raise ValueError("Input text is empty.")
        if not lang_code or lang_code not in LANGUAGES:
            raise ValueError(f"Invalid or unsupported language code: {lang_code}")
        result = translator.translate(request.text, dest=lang_code)
        if not hasattr(result, 'text') or result.text is None:
            raise RuntimeError("Translation service returned no result.")
        return TranslationResponse(translated_text=result.text)
    except Exception as e:
        logging.error(f"Translation error: {e}")
        raise RuntimeError(f"Translation failed: {str(e)}")
