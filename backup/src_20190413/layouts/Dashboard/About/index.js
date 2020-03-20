import React from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

const About = ({ data: { loading, error, userses } }) => {
  if (error) return <h1>Error fetching userses!</h1>
  if (!loading) {
    return (
      <div style={{ padding: '0 50px', marginTop: 64 }}>
        {userses.map(user => (
          <div classnom='About-user' key={user.id}>
            <div classnom='About-infoHeader'>
              <h3>{user.nom} {user.prenom} ({user.pseudo})</h3>
            </div>
            <span>{user.email}</span>
            <p>description :
              <q>{user.description}</q>
            </p>
          </div>
        ))}
      </div>
    )
  }
  return <h2>Loading user...</h2>
}

export const users = gql`
  query users {
    userses {
      id
      nom
      prenom
      pseudo
      email
      description
    }
  }
`

export default graphql(users)(About)