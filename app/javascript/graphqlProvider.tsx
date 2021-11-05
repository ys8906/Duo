import * as React from "react"
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from "@apollo/client"

const csrfToken = document
  .querySelector("meta[name=csrf-token]")
  .getAttribute("content")
const client = new ApolloClient({
  link: new HttpLink({
    credentials: "same-origin",
    headers: {
      "X-CSRF-Token": csrfToken,
    },
  }),
  cache: new InMemoryCache(),
})
const withProvider =
  (WrappedComponent: React.ComponentType, props: any = {}) =>
  () =>
    (
      <ApolloProvider client={client}>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <WrappedComponent {...props} />
      </ApolloProvider>
    )

export { withProvider as default }
