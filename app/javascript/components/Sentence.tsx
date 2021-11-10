import React, { useState, useCallback } from "react"

interface WordType {
  english: string
  id: string
  japanese: string
}

interface SentenceType {
  english: string
  id: string
  japanese: string
  sectionId: number
  words: WordType[]
}

const Word: React.FC<{ word: WordType }> = ({ word }) => (
  <div className="sentence__words--row">
    <div className="sentence__words--left">{word.english}</div>
    <div>{word.japanese}</div>
  </div>
)

const Sentence: React.FC<{ sentence: SentenceType }> = ({ sentence }) => {
  const [isWordOpen, setWordOpen] = useState(false)
  const toggleWordOpen = useCallback(() => {
    setWordOpen((prevState) => !prevState)
  }, [])

  return (
    <div className="sentence">
      <div className="sentence__index">
        Section {sentence.sectionId} | {sentence.id}
      </div>
      <div className="sentence__english">{sentence.english}</div>
      <div className="sentence__japanese">
        <div>{sentence.japanese}</div>
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
            <Word word={word} key={word.id} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Sentence
