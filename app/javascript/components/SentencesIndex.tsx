import React, { useState, useCallback } from "react"
import { gql, OperationVariables, useQuery } from "@apollo/client"
import { AllSentencesQuery } from "../graphql/types"
import withProvider from "../graphqlProvider"
import VisibilityMenu from "./VisiblityMenu"
import SearchBox from "./SearchBox"
import SentenceWrapper from "./SentenceWrapper"

const sentencesQuery = gql`
  query allSentences($attributes: SentenceSearchAttributes!) {
    sentences(attributes: $attributes) {
      pageInfo {
        currentPage
        totalPages
      }
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
  }
`

const SentencesIndex = () => {
  /**
   * Query attributes
   */
  // OPTIMIZE: use object for attributes
  //  ? avoid infinite loops
  const [currentPage, setCurrentPage] = useState(1)
  const [sectionIdMin, setSectionIdMin] = useState(1)
  const [sectionIdMax, setSectionIdMax] = useState(45)
  const [idMin, setIdMin] = useState(1)
  const [idMax, setIdMax] = useState(560)
  const [keywords, setKeywords] = useState("")
  const handleAttributes = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPage(1)
    switch (e.target.name) {
      case "reset":
        setSectionIdMin(1)
        setSectionIdMax(45)
        setIdMin(1)
        setIdMax(560)
        setKeywords("")
        break
      case "sectionIdMin":
        setSectionIdMin(Number(e.target.value))
        break
      case "sectionIdMax":
        setSectionIdMax(Number(e.target.value))
        break
      case "idMin":
        setIdMin(Number(e.target.value))
        break
      case "idMax":
        setIdMax(Number(e.target.value))
        break
      case "keywords":
        setKeywords(e.target.value)
        break
      default:
        break
    }
  }

  /**
   * Load query
   */
  const { loading, error, data } = useQuery<
    AllSentencesQuery,
    OperationVariables
  >(sentencesQuery, {
    variables: {
      attributes: {
        currentPage,
        sectionIdMin,
        sectionIdMax,
        idMin,
        idMax,
        keywords,
      },
    },
  })

  /**
   * Handle content options (visibility)
   */
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

  return (
    <div>
      <SearchBox
        {...{
          sectionIdMin,
          sectionIdMax,
          idMin,
          idMax,
          keywords,
          handleAttributes,
        }}
      />
      <SentenceWrapper
        {...{ loading, error, data, visibilities, currentPage, setCurrentPage }}
      />
      <VisibilityMenu {...{ buttonLabels, visibilities, toggleVisibility }} />
    </div>
  )
}

export default withProvider(SentencesIndex)
