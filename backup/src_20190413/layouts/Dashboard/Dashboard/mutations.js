import gql from 'graphql-tag';

export const GET_GROUP = gql`
query Groupses($id : ID!) {
  groupses(where: {id: $id }) {
    id
    title
    banner {
      handle
    }
    organisations
    dateStart
    dateEnd
    cardsGroupses(orderBy: position_ASC) {
      id
      title
      position
      size
      component
      avatar
    }
  }
  postsConnection {
    aggregate {
      count
    }
  }
}
`;

export const CREATE_MODULE = gql`
  mutation CreateCardsGroup($title: String!, $avatar: String!, $component: String!, $idgroup: ID!, $size: Int!, $position: Int!) {
    createCardsGroups(data: {
      title: $title
      size: $size
      position: $position
      component: $component
      status: PUBLISHED
      avatar: $avatar
      groupses: {
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

export const UPDATE_MODULE = gql`
  mutation UpdateCardsGroups($id: ID!, $title: String!, $position: Int!){
    updateCardsGroups(
      where: {
        id: $id
      }
      data: {
        title: $title
        position: $position
      }
    ) {
      id
    }
  }
`;

export const DELETE_MODULE = gql`
  mutation DeleteCardsGroups($id: ID!) {
    deleteCardsGroups(
      where: {
        id: $id
      }
    ) {
      id
    }
  }
`