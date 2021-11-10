import * as React from "react"
import { gql, useQuery } from "@apollo/client"
import { AllSentencesQuery } from "../graphql/types"
import withProvider from "../graphqlProvider"
import Sentence from "./Sentence"

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

  if (loading) {
    return <span>Loading...</span>
  }

  return (
    <div>
      {data.sentences.map((sentence) => (
        <Sentence sentence={sentence} key={sentence.id} />
      ))}
    </div>
  )
}

export default withProvider(SentencesIndex)
