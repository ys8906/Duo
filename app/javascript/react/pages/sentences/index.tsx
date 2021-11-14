import React, { createContext, useState, useCallback } from "react"
import { gql, OperationVariables, useQuery } from "@apollo/client"
import { AllSentencesQuery } from "../../../graphql/types"
import withProvider from "../../../graphqlProvider"
import VisibilityMenu from "../../components/VisiblityMenu"
import SearchBox from "../../components/SearchBox"
import SentenceWrapper from "../../components/SentenceWrapper"
import MyLists from "../../components/MyLists"

const sentencesQuery = gql`
  query allSentences($attributes: SentenceSearchAttributes!) {
    sentences(attributes: $attributes) {
      currentUser {
        id
        email
        myLists {
          id
          name
          myListSentences {
            id
            sentenceId
            myListId
          }
        }
      }
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

export const UserContext = createContext(null)
const SentencesIndex: React.FC = () => {
  const [currentUser, setCurrentUser] = useState(null)

  /**
   * Query attributes
   */
  // OPTIMIZE: use object for attributes
  //  ? avoid infinite loops
  const [currentPage, setCurrentPage] = useState(1)
  const [currentMyListId, setCurrentMyListId] = useState(0)
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
  const { loading, error, data, refetch } = useQuery<
    AllSentencesQuery,
    OperationVariables
  >(sentencesQuery, {
    variables: {
      attributes: {
        currentMyListId,
        currentPage,
        sectionIdMin,
        sectionIdMax,
        idMin,
        idMax,
        keywords,
      },
    },
    onCompleted() {
      setCurrentUser(data.sentences.currentUser)
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
    <UserContext.Provider value={currentUser}>
      <div className="body-wrapper">
        <div className="body-wrapper__left">
          {currentUser && (
            <MyLists
              {...{
                currentMyListId,
                setCurrentMyListId,
                refetch,
                setCurrentUser,
              }}
            />
          )}
        </div>
        <div className="body-wrapper__center">
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
            {...{
              loading,
              error,
              data,
              visibilities,
              currentPage,
              setCurrentPage,
              refetch,
              setCurrentUser,
            }}
          />
          <VisibilityMenu
            {...{ buttonLabels, visibilities, toggleVisibility }}
          />
        </div>
        <div className="body-wrapper__right">{/* Component */}</div>
      </div>
    </UserContext.Provider>
  )
}

export default withProvider(SentencesIndex)
