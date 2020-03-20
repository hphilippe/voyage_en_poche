import React from 'react';
import ReactDOM from 'react-dom';
//import PostItem from '../PostItem';
// GraphQL
import gql from 'graphql-tag'
import { Link } from 'react-router-dom'
import { graphql, Mutation } from 'react-apollo'
// Ant design
import { Button, Input } from 'antd';

// Constante
const POSTS_PER_PAGE = 4

const Home = ({
  data: {
    loading, error, posts, postsConnection, networkStatus, refetch 
  },
  loadMorePosts
}) => {
  if (error) return <h1>Error fetching posts!</h1>
  if (posts && postsConnection) {
    const areMorePosts = posts.length < postsConnection.aggregate.count
    const areImages = posts.coverImage
    let inputTitle;
    let inputUpdate;
    let inputId;
    return (
      <section>
        <ul className='Home-ul'>
          {posts.map(post => (
            <li className='Home-li' key={`post-${post.id}`}>
              <Link to={`/post/${post.id}/${post.title}`} className='Home-link'>
                <div className='Home-placeholder'>
                  {areImages
                    ? <img
                      alt={post.title}
                      className='Home-img'
                      src={`https://media.graphcms.com/resize=w:100,h:100,fit:crop/${post.coverImage.handle}`}
                    />
                    : ''}
                </div>
                <h3>{post.title}</h3>
              </Link>
              <span>
                {/* Here comes your removePost mutation */}
                <Mutation
                  mutation={DELETE_POST}
                  variables={{ id: post.id }}
                  refetchQueries={() => [{ query: GET_POSTS, variables: { skip: 0, first: POSTS_PER_PAGE } }] }
                  onError={ () => refetch() }
                >
                  {(deletePost, { data, loading, error }) => (
                    <Button
                      onClick={deletePost}
                    >
                      Remove Post
                    </Button>
                  )}
                </Mutation>
              </span>
              <span>
                <Button
                  onClick={() => {
                    inputId = post.id;
                  }}
                >
                  Editer cet article
                </Button>
              </span>
            </li>
          ))}
        </ul>
        <div className='Home-showMoreWrapper' >
          {areMorePosts
            ? <button className='Home-button' disabled={loading} onClick={() => loadMorePosts()}>
              {loading ? 'Loading...' : 'Show More Posts'}
            </button>
            : ''}
        </div>
        <div style={{ marginTop: '10px' }}>
          {/* Here comes your createPost mutation */}
          <Mutation
            mutation={CREATE_POST}
            refetchQueries={() => [{ query: GET_POSTS, variables: { skip: 0, first: POSTS_PER_PAGE } }]}
          >
            {(createPost, { data, loading, error }) => (
              <div>
                <form
                  onSubmit={e => {
                    e.preventDefault();
                    createPost({ variables: { title: inputTitle.value } });
                    inputTitle.value = "";
                  }}
                >
                  {/* ref node stateless components */}
                  <Input
                    ref={node => inputTitle = ReactDOM.findDOMNode(node)}
                  />
                  <button type="submit">Add Post</button>
                </form>
              </div>
            )}
          </Mutation>
        </div>
        <div>
          {/* Here comes your updatePost mutation */}
          <Mutation
            mutation={UPDATE_POST}
            refetchQueries={() => [{ query: GET_POSTS, variables: { skip: 0, first: POSTS_PER_PAGE } }]}
          >
            {updatePost => (
              <div>
                <span>update cet article :
                  <form
                    onSubmit={e => {
                      e.preventDefault();
                      console.log(inputId);
                      console.log(inputUpdate.value);
                      updatePost({ variables: { id: inputId, title: inputUpdate.value } });
                      inputUpdate.value = "";
                      inputId = "";
                    }}
                  >
                    <Input
                      ref={node => inputUpdate = ReactDOM.findDOMNode(node)}
                    />
                    <button type="submit">Update Post</button>
                  </form>
                </span>
              </div>
            )}
          </Mutation>
        </div>
        <div style={{ marginTop: '10px' }}>
          <Button onClick={() => refetch()}>Forcer une Resynchronisation!</Button>
        </div>
      </section>
    )
  }
  return <h2 style={{ padding: '0 50px', marginTop: 64 }}>Loading posts...</h2>
}

const GET_POSTS = gql`
  query posts($first: Int!, $skip: Int!) {
    posts(orderBy: dateAndTime_DESC, first: $first, skip: $skip) {
      id
      slug
      title
      dateAndTime
      coverImage {
        handle
      }
    },
    postsConnection {
      aggregate {
        count
      }
    }
  }
`

const posts = gql`
  query posts($first: Int!, $skip: Int!) {
    posts(orderBy: dateAndTime_DESC, first: $first, skip: $skip) {
      id
      slug
      title
      dateAndTime
      coverImage {
        handle
      }
    },
    postsConnection {
      aggregate {
        count
      }
    }
  }
`

const UPDATE_POST = gql`
  mutation UpdatePost($id: ID!, $title: String!){
    updatePost(
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

const CREATE_POST = gql`
  mutation createPost($title: String!) {
    createPost(data: {
      title: $title
      status: DRAFT
      content: "yoloo"
      users: {
        connect: {
          email: "bear@gmail.com"
        }
      }
    }) {
      id
      users {
        nom
      }
    }
  }
`

const DELETE_POST = gql`
  mutation deletePost($id: ID!) {
    deletePost(
      where: {
        id: $id
      }
    ) {
      id
    }
  }
`

const postsQueryVars = {
  skip: 0,
  first: POSTS_PER_PAGE
}

export default graphql (posts, {
  options: {
    variables: postsQueryVars
  },
  props: ({ data }) => ({
    data,
    loadMorePosts: () => {
      return data.fetchMore({
        variables: {
          skip: data.posts.length
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return previousResult
          }
          return Object.assign({}, previousResult, {
            posts: [...previousResult.posts, ...fetchMoreResult.posts]
          })
        }
      })
    }
  })
})(Home)

//export default PostList;
