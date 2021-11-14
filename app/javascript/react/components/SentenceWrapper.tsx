import React from "react"
import {
  ApolloError,
  OperationVariables,
  ApolloQueryResult,
} from "@apollo/client"
import { AllSentencesQuery } from "../../graphql/types"
import Pagination from "./utilities/Pagination"
import Sentence from "./Sentence"
import Loading from "./utilities/Loading"

interface Props {
  loading: boolean
  error: ApolloError
  data: AllSentencesQuery
  visibilities: object
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  refetch: (
    variables?: Partial<OperationVariables>
  ) => Promise<ApolloQueryResult<AllSentencesQuery>>
  setCurrentUser: React.Dispatch<React.SetStateAction<object>>
}

const SentenceWrapper: React.FC<Props> = ({
  loading,
  error,
  data,
  visibilities,
  currentPage,
  setCurrentPage,
  refetch,
  setCurrentUser,
}) => {
  let mainComponent
  if (loading) {
    mainComponent = <Loading />
  } else if (error) {
    mainComponent = <div className="error">Error</div>
  } else if (data) {
    if (data.sentences.sentences.length) {
      mainComponent = (
        <div>
          {data.sentences.sentences.map((sentence) => (
            <Sentence
              key={sentence.id}
              {...{ sentence, visibilities, refetch, setCurrentUser }}
            />
          ))}
          <Pagination {...{ data, currentPage, setCurrentPage }} />
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
