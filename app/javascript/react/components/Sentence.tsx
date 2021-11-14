import React, { useState, useCallback, useContext } from "react"
import {
  gql,
  useMutation,
  ApolloQueryResult,
  OperationVariables,
} from "@apollo/client"
import { AllSentencesQuery } from "../../graphql/types"
import { UserContext } from "../pages/sentences/index"

const createMyListSentenceQuery = gql`
  mutation CreateMyListSentence($input: CreateMyListSentenceInput!) {
    createMyListSentence(input: $input) {
      myListSentence {
        id
        sentenceId
        myListId
      }
    }
  }
`

const deleteMyListSentenceQuery = gql`
  mutation DeleteMyListSentence($input: DeleteMyListSentenceInput!) {
    deleteMyListSentence(input: $input) {
      myListSentence {
        id
      }
    }
  }
`

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
  setCurrentUser: React.Dispatch<React.SetStateAction<object>>
  refetch: (
    variables?: Partial<OperationVariables>
  ) => Promise<ApolloQueryResult<AllSentencesQuery>>
}

interface MyListSelectProps {
  sentenceId: string
  setCurrentUser: React.Dispatch<React.SetStateAction<object>>
  refetch: (
    variables?: Partial<OperationVariables>
  ) => Promise<ApolloQueryResult<AllSentencesQuery>>
}

interface MyListSentenceType {
  id: string
  sentenceId: string
  myListId: string
}

interface MyListType {
  id: string
  name: string
  myListSentences: MyListSentenceType[]
}

interface MyListSelectItemProps {
  sentenceId: string
  list: MyListType
  setCurrentUser: React.Dispatch<React.SetStateAction<object>>
  refetch: (
    variables?: Partial<OperationVariables>
  ) => Promise<ApolloQueryResult<AllSentencesQuery>>
}

const Word: React.FC<WordProps> = ({ word, showTextOrHidden }) => (
  <div className="sentence__words--row">
    <div className="sentence__words--left">
      {showTextOrHidden(word, "word", "english")}
    </div>
    <div>{showTextOrHidden(word, "word", "japanese")}</div>
  </div>
)

function MyListSelectItem({
  sentenceId,
  list,
  setCurrentUser,
  refetch,
}: MyListSelectItemProps) {
  const checked =
    list.myListSentences &&
    !!list.myListSentences.find((mls) => mls.sentenceId === sentenceId)
  // OPTIMIZE: Integrate into the common method
  async function updateCurrentUser() {
    const { data } = await refetch()
    setCurrentUser(data.sentences.currentUser)
  }
  const [deleteMyListSentence] = useMutation(deleteMyListSentenceQuery, {
    onCompleted() {
      updateCurrentUser()
    },
  })
  const submitDeleteMyListSentence = () => {
    deleteMyListSentence({
      variables: { input: { sentenceId, myListId: list.id } },
    })
  }
  const [createMyListSentence] = useMutation(createMyListSentenceQuery, {
    onCompleted() {
      updateCurrentUser()
    },
  })
  const submitCreateMyListSentence = () => {
    createMyListSentence({
      variables: { input: { sentenceId, myListId: list.id } },
    })
  }
  const handleSubmitMyListSentence = () => {
    if (checked) {
      submitDeleteMyListSentence()
    } else {
      submitCreateMyListSentence()
    }
  }
  return (
    <div className="sentence__my-list-select--row" key={list.name}>
      <input
        type="checkbox"
        name={`my_list_${list.id}`}
        id={list.id.toString()}
        className="sentence__my-list-select--checkbox"
        checked={checked}
        onChange={handleSubmitMyListSentence}
      />
      <div className="sentence__my-list-select--name">{list.name}</div>
    </div>
  )
}

function MyListSelect({
  sentenceId,
  setCurrentUser,
  refetch,
}: MyListSelectProps) {
  const user = useContext(UserContext)
  const [isOpenSelectList, setIsOpenSelectList] = useState(false)
  return (
    <div className="sentence__my-list">
      {/* TODO: Close with clicking outside window */}
      <button
        type="button"
        className="sentence__my-list--button"
        onClick={() => setIsOpenSelectList((prevState) => !prevState)}
      >
        マイリストに登録
      </button>
      {isOpenSelectList && (
        <div className="sentence__my-list-select">
          {/* eslint-disable-next-line react/destructuring-assignment */}
          {user.myLists.map((list) => (
            <MyListSelectItem
              sentenceId={sentenceId}
              list={list}
              refetch={refetch}
              setCurrentUser={setCurrentUser}
              key={list.name}
            />
          ))}
        </div>
      )}
    </div>
  )
}

const Sentence: React.FC<SentenceProps> = ({
  sentence,
  visibilities,
  refetch,
  setCurrentUser,
}) => {
  const user = useContext(UserContext)
  const [isWordOpen, setWordOpen] = useState(false)
  const toggleWordOpen = useCallback(() => {
    setWordOpen((prevState) => !prevState)
  }, [])

  const showTextOrHidden = (text, textType, language) => {
    const state = language === "english" ? `${textType}En` : `${textType}Jp`
    return visibilities[state]
      ? text[language].replace("\\n", "\n")
      : "XXXXXXXXXX"
  }

  return (
    <div className="sentence">
      <div className="sentence__header">
        <div className="sentence__index">
          Section {sentence.sectionId} | {sentence.id}
        </div>
        {user && user.myLists.length > 0 && (
          <MyListSelect
            sentenceId={sentence.id}
            refetch={refetch}
            setCurrentUser={setCurrentUser}
          />
        )}
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
