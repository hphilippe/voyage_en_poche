import gql from 'graphql-tag';

export const GET_SEARCHLIST = gql`
  query Searchses($idgroup : ID!) {
    searchses(
      orderBy: createdAt_ASC
      where : {
        cardsGroups: {
          id : $idgroup
        }
      }
    ) {
      id
      title
      slug
      price
      pin
    },
    postsConnection {
      aggregate {
        count
      }
    }
  }
`;

export const CREATE_SEARCHLIST = gql`
  mutation CreateSearchs($title: String!, $slug: String!, $price: Float!, $pin: Searchstatus!, $idgroup: ID!) {
    createSearchs(data: {
      title: $title
      slug: $slug
      price: $price
      pin: $pin
      status: PUBLISHED
      cardsGroups: {
        connect: {
          id: $idgroup
        }
      }
    }) {
      id
      title
    }
  }
`;

export const UPDATE_SEARCHLIST = gql`
  mutation UpdateSearchs($id: ID!, $title: String!, $slug: String!, $price: Float!, $pin: Searchstatus!){
    updateSearchs(
      where: {
        id: $id
      }
      data: {
        title: $title
        slug: $slug
        price: $price
        pin: $pin
        status: PUBLISHED
      }
    ) {
      id
    }
  }
`;

export const DELETE_SEARCHLIST = gql`
  mutation DeletePost($id: ID!) {
    deleteSearchs(
      where: {
        id: $id
      }
    ) {
      id
    }
  }
`