import React, { useState, useCallback } from "react"

interface WordType {
  english: string
  id: string
  japanese: string
}

interface WordProps {
  word: WordType
  showTextOrHidden: Function
}

interface SentenceType {
  english: string
  id: string
  japanese: string
  sectionId: number
  words: WordType[]
}

interface SentenceProps {
  sentence: SentenceType
  visibilities: object
}

const Word: React.FC<WordProps> = ({ word, showTextOrHidden }) => (
  <div className="sentence__words--row">
    <div className="sentence__words--left">
      {showTextOrHidden(word, "word", "english")}
    </div>
    <div>{showTextOrHidden(word, "word", "japanese")}</div>
  </div>
)

const Sentence: React.FC<SentenceProps> = ({ sentence, visibilities }) => {
  const [isWordOpen, setWordOpen] = useState(false)
  const toggleWordOpen = useCallback(() => {
    setWordOpen((prevState) => !prevState)
  }, [])

  const showTextOrHidden = (text, textType, language) => {
    const state = language === "english" ? `${textType}En` : `${textType}Jp`
    return visibilities[state] ? text[language] : "XXXXXXXXXX"
  }

  return (
    <div className="sentence">
      <div className="sentence__index">
        Section {sentence.sectionId} | {sentence.id}
      </div>
      <div className="sentence__english">
        {showTextOrHidden(sentence, "sentence", "english")}
      </div>
      <div className="sentence__japanese">
        <div>{showTextOrHidden(sentence, "sentence", "japanese")}</div>
        <button
          type="button"
          className="sentence__toggle"
          onClick={toggleWordOpen}
        >
          {isWordOpen ? "▲" : "▼"}
        </button>
      </div>
      {isWordOpen && (
        <div className="sentence__words">
          {sentence.words.map((word) => (
            <Word
              word={word}
              showTextOrHidden={showTextOrHidden}
              key={word.id}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Sentence
