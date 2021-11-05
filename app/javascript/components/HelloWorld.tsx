import * as React from 'react';
const data = {
  books: [
    {
      id: '1',
      title: 'Active Rails',
    },
  ],
}

interface HelloProps {
  title: string;
}

const loading = false
const Book: React.FunctionComponent<HelloProps> = ({title}) => {
  return <li>{title}</li>
}
const Books = () => {
  if (loading) {
    return <span>"Loading..."</span>
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
export default Books