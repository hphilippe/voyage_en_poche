import gql from 'graphql-tag';

export const GET_TODO = gql`
  query Todoes($idgroup : ID!) {
    todoes(
      orderBy: createdAt_ASC
      where : {
        cardsGroups: {
          id : $idgroup
        }
      }
    ) {
      id
      title
      todostatus
      userses {
        id
        email
        pseudo
      }
    },
    postsConnection {
      aggregate {
        count
      }
    }
  }
`;

export const CREATE_TODO = gql`
  mutation CreateTodo($title: String!, $idgroup: ID!) {
    createTodo(data: {
      title: $title
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

export const UPDATE_TODO = gql`
  mutation UpdateTodo($id: ID!, $title: String!){
    updateTodo(
      where: {
        id: $id
      }
      data: {
        title: $title
      }
    ) {
      id
    }
  }
`;

export const DELETE_TODO = gql`
  mutation DeletePost($id: ID!) {
    deleteTodo(
      where: {
        id: $id
      }
    ) {
      id
    }
  }
`

export const UPDATE_TODO_USER_CHECKBOX = gql`
  mutation UpdateTodoUserCheckbox($id: ID!, $useremail: String!){
    updateTodo(
      where: {
        id: $id
      }
      data: {
				userses: {
          connect: {
            email: $useremail
          }
        }
      }
    ) {
      id
    }
  }
`;

export const DELETE_TODO_USER_CHECKBOX = gql`
  mutation DeleteTodoUserCheckbox($id: ID!, $useremail: String!){
    updateTodo(
      where: {
        id: $id
      }
      data: {
				userses: {
          disconnect: {
            email: $useremail
          }
        }
      }
    ) {
      id
    }
  }
`;