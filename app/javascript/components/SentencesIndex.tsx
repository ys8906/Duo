import React, { useState, useCallback } from "react"
import { gql, useQuery } from "@apollo/client"
import { AllSentencesQuery } from "../graphql/types"
import withProvider from "../graphqlProvider"
import Sentence from "./Sentence"
import VisibilityMenu from "./VisiblityMenu"

const sentencesQuery = gql`
  query allSentences {
    sentences {
      id
      sectionId
      english
      japanese
      words {
        id
        japanese
        english
      }
    }
  }
`

const SentencesIndex = () => {
  const { data, loading } = useQuery<AllSentencesQuery>(sentencesQuery)

  const buttonLabels = [
    { name: "sentenceEn", label: "Sentences" },
    { name: "sentenceJp", label: "例文" },
    { name: "wordEn", label: "Words" },
    { name: "wordJp", label: "単語" },
  ]
  const buttonLabelStates = buttonLabels.reduce(
    (pre, cur) => ({ ...pre, [cur.name]: true }),
    {}
  )
  const [visibilities, setVisibility] = useState(buttonLabelStates)
  const toggleVisibility = useCallback((e) => {
    const { target } = e
    const { name } = target
    setVisibility((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }))
  }, [])

  if (loading) {
    return <span>Loading...</span>
  }

  return (
    <div>
      {data.sentences.map((sentence) => (
        <Sentence key={sentence.id} {...{ sentence, visibilities }} />
      ))}
      <VisibilityMenu {...{ buttonLabels, visibilities, toggleVisibility }} />
    </div>
  )
}

export default withProvider(SentencesIndex)
