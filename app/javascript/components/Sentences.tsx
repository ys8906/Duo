import * as React from "react"
import { gql, useQuery } from "@apollo/client"
import { AllSentencesQuery } from "../graphql/types"
import withProvider from "../graphqlProvider"

const sentencesQuery = gql`
  query allSentences {
    sentences {
      id
      japanese
    }
  }
`

const Sentence: React.FC<{ japanese?: String }> = ({ japanese }) => (
  <li>{japanese}</li>
)

Sentence.defaultProps = {
  japanese: "japanese",
}

const Sentences = () => {
  const { data, loading } = useQuery<AllSentencesQuery>(sentencesQuery)

  if (loading) {
    return <span>Loading...</span>
  }

  return (
    <div>
      <h1>Sentences</h1>
      <ul>
        {data.sentences.map((sentence) => (
          <Sentence japanese={sentence.japanese} key={sentence.id} />
        ))}
      </ul>
    </div>
  )
}

export default withProvider(Sentences)
