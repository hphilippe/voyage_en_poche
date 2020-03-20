import gql from 'graphql-tag';

export const GET_POSTIT = gql`
  query Postits($idgroup : ID!) {
    postIts(
      orderBy: createdAt_ASC
      where : {
        cardsGroups: {
          id : $idgroup
        }
      }
    ) {
      id
      title
      postitstatus
      content
    },
    postsConnection {
      aggregate {
        count
      }
    }
  }
`;

export const CREATE_POSTIT = gql`
  mutation CreatePostit($title: String!, $content: String!, $postitstatus: Postit!, $idgroup: ID!) {
    createPostIt(data: {
      title: $title
      status: PUBLISHED
      postitstatus : $postitstatus
      content: $content
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

export const UPDATE_POSTIT = gql`
  mutation UpdatePostit($id: ID!, $title: String!, $content: String!, $postitstatus: Postit!){
    updatePostIt(
      where: {
        id: $id
      }
      data: {
        title: $title
        postitstatus : $postitstatus
      	content: $content
      }
    ) {
      id
    }
  }
`;

export const DELETE_POSTIT = gql`
  mutation DeletePostit($id: ID!) {
    deletePostIt(
      where: {
        id: $id
      }
    ) {
      id
    }
  }
`