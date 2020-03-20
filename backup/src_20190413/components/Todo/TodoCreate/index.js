import React from "react";
import ReactDOM from 'react-dom';

import { Mutation } from 'react-apollo';

import { Input } from "antd";

import Loading from '../../Loading';
import ErrorMessage from '../../Error';

import { CREATE_TODO, GET_TODO } from '../mutations';

const TodoItem = ({idgroup}) => {
  let input;
  return (
    <Mutation
      mutation={CREATE_TODO}
      variables={{ idgroup: idgroup }}
      refetchQueries={() => [{ query: GET_TODO, variables:{ idgroup: idgroup } }]}
    >
      {(createTodo, { loading, error }) => {

        if (loading) {
          return <Loading isCenter={true} />;
        }
  
        if (error) {
          return <ErrorMessage error={error} />;
        }

        return (
          <div>
            <form
              onSubmit={e => {
                e.preventDefault();
                createTodo({ variables: { title: input.value } });
                input.value = "";
              }}
            >
              <Input
                placeholder="What needs to be done?"
                ref={node => input = ReactDOM.findDOMNode(node)}
              />
            </form>
          </div>
        );

      }}
    </Mutation>
  );
}

export default TodoItem;