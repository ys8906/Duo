import * as React from 'react'
import '../graphql/types'
import { withProvider } from '../graphqlProvider'
import { AllBooksQuery, useAllBooksQuery } from '../graphql/types'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/client'
const booksQuery = gql`
  query allBooks {
    books {
      id
      title
    }
  }
`

type HelloProps = {
  title?: string
}

const Book: React.FunctionComponent<HelloProps> = ({title}) => {
  return <li>{title}</li>
}

const Books = () => {
  const {data, loading, error} = useQuery<AllBooksQuery>(booksQuery)

  if (loading) {
    return <span>Loading...</span>
  }

  return (
    <div>
      <h1>Books</h1>
      <ul>
        {data.books.map((book) => (
          <Book {...book} key={book.id} />
        ))}
      </ul>
    </div>
  )
}

export default withProvider(Books)