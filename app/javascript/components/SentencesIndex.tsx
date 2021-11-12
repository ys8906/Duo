import React, { useState, useEffect, useCallback } from "react"
import { gql, useLazyQuery } from "@apollo/client"
import { AllSentencesQuery, AllSentencesQueryVariables } from "../graphql/types"
import withProvider from "../graphqlProvider"
import VisibilityMenu from "./VisiblityMenu"
import SearchBox from "./SearchBox"
import SentenceWrapper from "./SentenceWrapper"

const sentencesQuery = gql`
  query allSentences($attributes: SentenceSearchAttributes!) {
    sentences(attributes: $attributes) {
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
  /**
   * Query attributes
   */
  // OPTIMIZE: use object for attributes
  //  ? avoid infinite loops
  const [sectionIdMin, setSectionIdMin] = useState("")
  const [sectionIdMax, setSectionIdMax] = useState("")
  const [idMin, setIdMin] = useState("")
  const [idMax, setIdMax] = useState("")
  const [keywords, setKeywords] = useState("")
  const handleAttributes = (e) => {
    switch (e.target.name) {
      case "sectionIdMin":
        setSectionIdMin(e.target.value)
        break
      case "sectionIdMax":
        setSectionIdMax(e.target.value)
        break
      case "idMin":
        setIdMin(e.target.value)
        break
      case "idMax":
        setIdMax(e.target.value)
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
  const [getSentences, { loading, error, data }] = useLazyQuery<
    AllSentencesQuery,
    AllSentencesQueryVariables
  >(sentencesQuery)
  const fetchSentences = (e = null) => {
    // OPTIMIZE: click once to reset and refetch at the same time
    if (e && e.target.value === "true") {
      setSectionIdMin("")
      setSectionIdMax("")
      setIdMin("")
      setIdMax("")
      setKeywords("")
    }
    getSentences({
      variables: {
        attributes: { sectionIdMin, sectionIdMax, idMin, idMax, keywords },
      },
    })
  }

  // use only on componentDidMount, componentWillUnmount
  // https://ja.reactjs.org/docs/hooks-reference.html#conditionally-firing-an-effect
  useEffect(() => fetchSentences(), [])

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
          fetchSentences,
        }}
      />
      <SentenceWrapper {...{ loading, error, data, visibilities }} />
      <VisibilityMenu {...{ buttonLabels, visibilities, toggleVisibility }} />
    </div>
  )
}

export default withProvider(SentencesIndex)
