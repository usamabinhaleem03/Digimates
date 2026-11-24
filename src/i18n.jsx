import { createContext, useContext, useEffect, useState } from 'react'
import { CONTENT, LANGS } from './content'

const KEY = 'digimates-lang'
const LangContext = createContext({ lang: 'de', t: CONTENT.de, setLang: () => {} })

function initialLang() {
  try {
    const saved = localStorage.getItem(KEY)
    if (LANGS.includes(saved)) return saved
  } catch {
    /* storage unavailable */
  }
  return 'de'
}

export function LangProvider({ children }) {
  const [lang, setLangState] = useState(initialLang)

  const setLang = (l) => {
    setLangState(l)
    try {
      localStorage.setItem(KEY, l)
    } catch {
      /* storage unavailable */
    }
  }

  useEffect(() => {
    const t = CONTENT[lang]
    document.documentElement.lang = lang
    document.title = t.meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.meta.description)
  }, [lang])

  return <LangContext.Provider value={{ lang, setLang, t: CONTENT[lang] }}>{children}</LangContext.Provider>
}

export const useLang = () => useContext(LangContext)
