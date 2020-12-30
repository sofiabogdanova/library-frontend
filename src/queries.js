import { gql  } from '@apollo/client'

export const ALL_AUTHORS = gql`
query {
  allAuthors {
    name
    bookCount
    born
  }
}
`

export const ALL_BOOKS = gql`
query {
  allBooks {
    title
    published
    author
    genres
  }
}
`

export const CREATE_BOOK = gql`
mutation createBook($title: String!, $author: String, $published: Int!, $genres: [String!]!) {
  addBook(
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
  ) {
    title
    published
    author
    id
    genres
  }
}
`

export const EDIT_AUTHOR = gql`
mutation editAuthor($name: String!, $setBornTo: Int!) {
  editAuthor(
    name: $name,
    setBornTo: $setBornTo
  ) {
    name
    born
  }
}
`