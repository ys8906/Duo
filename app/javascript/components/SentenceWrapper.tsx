import { ApolloError } from "@apollo/client"
import React from "react"
import { AllSentencesQuery } from "../graphql/types"
import Sentence from "./Sentence"
import Loading from "./utilities/Loading"

interface Props {
  loading: boolean
  error: ApolloError
  data: AllSentencesQuery
  visibilities: object
}

const SentenceWrapper: React.FC<Props> = ({
  loading,
  error,
  data,
  visibilities,
}) => {
  let mainComponent
  if (loading) {
    mainComponent = <Loading />
  } else if (error) {
    mainComponent = <div className="error">Error</div>
  } else if (data) {
    if (data.sentences.length) {
      mainComponent = (
        <div>
          {data.sentences.map((sentence) => (
            <Sentence key={sentence.id} {...{ sentence, visibilities }} />
          ))}
        </div>
      )
    } else
      mainComponent = (
        <div className="sentence-wrapper__no-result">
          一致する検索結果がありませんでした。
        </div>
      )
  } else mainComponent = <div>検索しましょう！</div>

  return <div className="sentence-wrapper">{mainComponent}</div>
}

export default SentenceWrapper
