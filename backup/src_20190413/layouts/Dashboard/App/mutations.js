import gql from 'graphql-tag';

export const GET_GROUP = gql`
query Groupses ($email : String!) {
  groupses(where: {userses_some: {email: $email}} orderBy: dateStart_ASC) {
    id
    title
    banner {
      id
      handle
    }
    dateStart
    dateEnd
    groupstatus
  }
  postsConnection {
    aggregate {
      count
    }
  }
}
`;

export const CREATE_GROUP = gql`
  mutation CreateGroupses($title: String!, $dateend: DateTime!, $datestart: DateTime!, $idbanner: ID!, $email: String!, $status: GroupStatus!) {
    createGroups(data: {
      title: $title
      dateEnd: $dateend
      dateStart: $datestart
      groupstatus: $status
      banner: {
        connect: {
          id : $idbanner
        }
      }
      userses: {
        connect: {
          email: $email
        }
      }
    }) {
      id
      title
    }
  }
`;

export const UPDATE_GROUP = gql`
  mutation UpdateGroups($idgroup: ID!, $title: String!, $dateend: DateTime!, $datestart: DateTime!, $idbanner: ID!, $status: GroupStatus!){
    updateGroups(
      where: {
        id: $idgroup
      }
      data: {
        title: $title
        dateEnd: $dateend
        dateStart: $datestart
        groupstatus: $status
        banner: {
          connect: {
            id : $idbanner
          }
        }
      }
    ) {
      id
    }
  }
`;

export const DELETE_GROUP = gql`
  mutation DeleteGroups($id: ID!) {
    deleteGroups(
      where: {
        id: $id
      }
    ) {
      id
    }
  }
`