import gql from 'graphql-tag';

export const GET_SCHEDULER = gql`
  query Schedule($idgroup : ID!) {
    schedules(
      orderBy: dateStart_ASC
      where : {
        cardsGroups: {
          id : $idgroup
        }
      }
    ) {
      id
      title
      content
      dateStart
      type
    },
    postsConnection {
      aggregate {
        count
      }
    }
  }
`;

export const CREATE_SCHEDULER = gql`
  mutation CreateSchedule($title: String!, $content: String!, $status: String!, $datestart: DateTime!, $idgroup: ID!) {
    createSchedule(data: {
      title: $title
      status: PUBLISHED
      type : $status
      content: $content
      dateStart: $datestart
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

export const UPDATE_SCHEDULER = gql`
  mutation UpdateSchedule( $title: String!, $content: String!, $status: String!, $datestart: DateTime!, $id: ID!) {
    updateSchedule(
      where: {
        id: $id
      }
      data: {
        title: $title
        status: PUBLISHED
        type : $status
        content: $content
        dateStart: $datestart
      }
    ) {
      id
      title
    }
  }
`;

export const DELETE_SCHEDULER = gql`
  mutation DeleteSchedule($id: ID!) {
    deleteSchedule(
      where: {
        id: $id
      }
    ) {
      id
    }
  }
`