import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** An ISO 8601-encoded datetime */
  ISO8601DateTime: any;
};

/** Mutation */
export type Mutation = {
  __typename?: 'Mutation';
  /** An example field added by the generator */
  testField: Scalars['String'];
};

/** Pagination data */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** Kaminari method current_page */
  currentPage: Scalars['Int'];
  /** Kaminari method total_pages */
  totalPages: Scalars['Int'];
};

/** Query */
export type Query = {
  __typename?: 'Query';
  /** Sentence index page */
  sentences: Sentences;
};


/** Query */
export type QuerySentencesArgs = {
  attributes: SentenceSearchAttributes;
};

/** Sentence */
export type Sentence = {
  __typename?: 'Sentence';
  /** created_at */
  createdAt: Scalars['ISO8601DateTime'];
  /** Sentence in English */
  english: Scalars['String'];
  /** id */
  id: Scalars['ID'];
  /** Sentence in Japanese */
  japanese: Scalars['String'];
  /** Section id */
  sectionId: Scalars['Int'];
  /** updated_at */
  updatedAt: Scalars['ISO8601DateTime'];
  /** Words in the sentence */
  words: Array<Word>;
};

/** Attributes for filtering and sorting sentences */
export type SentenceSearchAttributes = {
  /** current_page */
  currentPage?: Maybe<Scalars['Int']>;
  /** id_max */
  idMax?: Maybe<Scalars['Int']>;
  /** id_min */
  idMin?: Maybe<Scalars['Int']>;
  /** keywords */
  keywords?: Maybe<Scalars['String']>;
  /** section_id_max */
  sectionIdMax?: Maybe<Scalars['Int']>;
  /** section_id_min */
  sectionIdMin?: Maybe<Scalars['Int']>;
};

/** Sentence */
export type Sentences = {
  __typename?: 'Sentences';
  /** Pagination data */
  pageInfo?: Maybe<PageInfo>;
  /** Sentences */
  sentences: Array<Sentence>;
};

/** Word */
export type Word = {
  __typename?: 'Word';
  /** created_at */
  createdAt: Scalars['ISO8601DateTime'];
  /** Word in English */
  english: Scalars['String'];
  /** id */
  id: Scalars['ID'];
  /** Word in Japanese */
  japanese: Scalars['String'];
  /** updated_at */
  updatedAt: Scalars['ISO8601DateTime'];
};

export type AllSentencesQueryVariables = Exact<{
  attributes: SentenceSearchAttributes;
}>;


export type AllSentencesQuery = { __typename?: 'Query', sentences: { __typename?: 'Sentences', pageInfo?: { __typename?: 'PageInfo', currentPage: number, totalPages: number } | null | undefined, sentences: Array<{ __typename?: 'Sentence', id: string, sectionId: number, english: string, japanese: string, words: Array<{ __typename?: 'Word', id: string, japanese: string, english: string }> }> } };


export const AllSentencesDocument = gql`
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
    `;

/**
 * __useAllSentencesQuery__
 *
 * To run a query within a React component, call `useAllSentencesQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllSentencesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllSentencesQuery({
 *   variables: {
 *      attributes: // value for 'attributes'
 *   },
 * });
 */
export function useAllSentencesQuery(baseOptions: Apollo.QueryHookOptions<AllSentencesQuery, AllSentencesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllSentencesQuery, AllSentencesQueryVariables>(AllSentencesDocument, options);
      }
export function useAllSentencesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllSentencesQuery, AllSentencesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllSentencesQuery, AllSentencesQueryVariables>(AllSentencesDocument, options);
        }
export type AllSentencesQueryHookResult = ReturnType<typeof useAllSentencesQuery>;
export type AllSentencesLazyQueryHookResult = ReturnType<typeof useAllSentencesLazyQuery>;
export type AllSentencesQueryResult = Apollo.QueryResult<AllSentencesQuery, AllSentencesQueryVariables>;