import React from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
// import Markdown from 'react-markdown'

const Post = ({ data: { loading, error, post } }) => {
  if (error) return <h1>Error fetching the post!</h1>
  if (!loading) {
    const areImages = post.coverImage
    console.log(areImages);
    return (
      <article style={{ padding: '0 50px', marginTop: 64 }}>
        <h1>{post.title}</h1>
        <div className='Post-placeholder'>
          {areImages
            ? <img
              alt={post.title}
              src={`https://media.graphcms.com/resize=w:650,h:366,fit:crop/${post.coverImage.handle}`}
            />
            : ''}
        </div>
        {/*
        <Markdown
          source={post.content}
          escapeHtml={false}
        />
        */}
        <div>
          {post.content}
        </div>
      </article>
    )
  }
  return <h2>Loading post...</h2>
}

export const singlePost = gql`
  query singlePost($id: ID!) {
    post(where: {id: $id}) {
      id
      slug
      title
      coverImage {
        handle
      }
      content
      dateAndTime
    }
  }
`

export default graphql(singlePost, {
  options: ({ match }) => ({
    variables: {
      id: match.params.slug
    }
  })
})(Post)