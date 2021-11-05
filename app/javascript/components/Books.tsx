import * as React from "react"
import { gql, useQuery } from "@apollo/client"
import { AllBooksQuery } from "../graphql/types"
import withProvider from "../graphqlProvider"

const booksQuery = gql`
  query allBooks {
    books {
      id
      title
    }
  }
`

const Book: React.FunctionComponent<{ title?: String }> = ({ title }) => (
  <li>{title}</li>
)

Book.defaultProps = {
  title: "title",
}

const Books = () => {
  const { data, loading } = useQuery<AllBooksQuery>(booksQuery)

  if (loading) {
    return <span>Loading...</span>
  }

  return (
    <div>
      <h1>Books</h1>
      <ul>
        {data.books.map((book) => (
          <Book title={book.title} key={book.id} />
        ))}
      </ul>
    </div>
  )
}

export default withProvider(Books)
