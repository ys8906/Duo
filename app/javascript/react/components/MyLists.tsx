import React, { useState, useContext } from "react"
import {
  gql,
  useMutation,
  ApolloQueryResult,
  OperationVariables,
} from "@apollo/client"
import { AllSentencesQuery } from "../../graphql/types"
import { UserContext } from "../pages/sentences/index"

const createMyListQuery = gql`
  mutation CreateMyList($input: CreateMyListInput!) {
    createMyList(input: $input) {
      myList {
        id
        name
      }
    }
  }
`

const deleteMyListQuery = gql`
  mutation DeleteMyList($input: DeleteMyListInput!) {
    deleteMyList(input: $input) {
      myList {
        id
      }
    }
  }
`

interface MyListsProps {
  currentMyListId: number
  setCurrentMyListId: React.Dispatch<React.SetStateAction<number>>
  refetch: (
    variables?: Partial<OperationVariables>
  ) => Promise<ApolloQueryResult<AllSentencesQuery>>
  setCurrentUser: React.Dispatch<React.SetStateAction<object>>
}

interface MyListType {
  id: number
  name: string
}

interface MyListProps {
  list: MyListType
  currentMyListId: number
  setCurrentMyListId: React.Dispatch<React.SetStateAction<number>>
  refetch: (
    variables?: Partial<OperationVariables>
  ) => Promise<ApolloQueryResult<AllSentencesQuery>>
  setCurrentUser: React.Dispatch<React.SetStateAction<object>>
}

interface MyNewListProps {
  setIsOpenNewList: React.Dispatch<React.SetStateAction<Boolean>>
  refetch: (
    variables?: Partial<OperationVariables>
  ) => Promise<ApolloQueryResult<AllSentencesQuery>>
  setCurrentUser: React.Dispatch<React.SetStateAction<object>>
}

function MyList({
  list,
  currentMyListId,
  setCurrentMyListId,
  setCurrentUser,
  refetch,
}: MyListProps) {
  const listId = Number(list.id)
  // OPTIMIZE: Integrate into the common method
  async function updateCurrentUser() {
    const { data } = await refetch()
    setCurrentUser(data.sentences.currentUser)
  }
  const [deleteMyList] = useMutation(deleteMyListQuery, {
    onCompleted() {
      updateCurrentUser()
    },
  })
  const submitDeleteMyList = (id) => {
    deleteMyList({ variables: { input: { id } } })
  }
  return (
    <li className="my-lists__list">
      <button
        type="button"
        onClick={() => setCurrentMyListId(Number(listId))}
        className={`my-lists__list--button${
          currentMyListId === listId ? " selected" : ""
        }`}
      >
        {list.name}
      </button>
      <button
        type="button"
        className="my-lists__list--button"
        onClick={() => submitDeleteMyList(list.id)}
      >
        -
      </button>
    </li>
  )
}

function MyNewList({
  setIsOpenNewList,
  setCurrentUser,
  refetch,
}: MyNewListProps) {
  const [newListName, setNewListName] = useState("")
  // OPTIMIZE: Integrate into the common method
  async function updateCurrentUser() {
    const { data } = await refetch()
    setCurrentUser(data.sentences.currentUser)
  }
  const [createMyList] = useMutation(createMyListQuery, {
    onCompleted() {
      setNewListName("")
      setIsOpenNewList(false)
      updateCurrentUser()
    },
  })
  const submitCreateMyList = () => {
    createMyList({ variables: { input: { name: newListName } } })
  }
  return (
    <li className="my-lists__list">
      <input
        type="text"
        name="new-list"
        id="new-list"
        className="my-lists__input"
        placeholder="リスト名を入力"
        value={newListName}
        onChange={(e) => setNewListName(e.target.value)}
      />
      <button
        type="button"
        className="my-lists__title--plus"
        onClick={submitCreateMyList}
      >
        +
      </button>
    </li>
  )
}

const MyLists: React.FC<MyListsProps> = ({
  currentMyListId,
  setCurrentMyListId,
  refetch,
  setCurrentUser,
}) => {
  const user = useContext(UserContext)
  const [isOpenNewList, setIsOpenNewList] = useState(false)

  return (
    <div className="my-lists">
      <div className="my-lists__title">
        <div>マイリスト</div>
        <button
          type="button"
          className="my-lists__title--plus"
          onClick={() => setIsOpenNewList((prevState) => !prevState)}
        >
          {isOpenNewList ? "-" : "+"}
        </button>
      </div>
      <ul className="my-lists__list-container">
        {isOpenNewList && (
          <MyNewList {...{ setIsOpenNewList, refetch, setCurrentUser }} />
        )}
        <li className="my-lists__list">
          <button
            type="button"
            onClick={() => setCurrentMyListId(0)}
            className={`my-lists__list--button${
              currentMyListId === 0 ? " selected" : ""
            }`}
          >
            全て
          </button>
        </li>
        {user.myLists.map((list) => (
          <MyList
            {...{
              list,
              currentMyListId,
              setCurrentMyListId,
              setCurrentUser,
              refetch,
            }}
            key={list.id}
          />
        ))}
      </ul>
    </div>
  )
}

export default MyLists
