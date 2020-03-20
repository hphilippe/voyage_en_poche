import React from "react";
import ReactDOM from 'react-dom';

import { Mutation, ApolloConsumer } from 'react-apollo';

import Loading from '../../Loading';
import ErrorMessage from '../../Error';
import TodoCheckbox from './TodoCheckbox.js';

import { Modal, Button, Input, List, Icon, Badge, Popover } from "antd";
import '../style.css';

import { UPDATE_TODO, GET_TODO, DELETE_TODO } from '../mutations';

// await graphql delete then refetch function from query in todolist
async function removeTodoAsync(client, idItem, refetch) {
  const { data, error } = await client.mutate({
    mutation: DELETE_TODO,
    variables: { id: idItem }
  })
  if (data) refetch()
  if (error) refetch()
}

// Modal delete Item
const confirm = Modal.confirm;
function showConfirm(client, id, refetch) {
  confirm({
    title: 'Do you want to delete these items?',
    content: 'When clicked the OK button, this dialog will be closed after 1 second',
    onOk() {
      removeTodoAsync(client, id, refetch);
    },
    onCancel() { },
  });
}

// update
function updateCssEdit(id) {
  if (document.getElementById("TodoItem-form-nb-" + id)) {
    if (document.getElementById("TodoItem-form-nb-" + id).style.display === 'block') {
      document.getElementById("TodoItem-form-nb-" + id).style.display = 'none';
      document.getElementById("TodoItem-nb-" + id).style.display = 'block';
    } else {
      document.getElementById("TodoItem-form-nb-" + id).style.display = 'block';
      document.getElementById("TodoItem-nb-" + id).style.display = 'none';
    }
  }
}

// pophover
const content = (items) => items.map((item,i) => <div style={{ display: 'inline-block' }} key={i}><Button>{item.pseudo}</Button></div> );

const TodoItem = ({
  item,
  refetch,
  idgroup
}) => {
  let input = item.title;
  return (
    // Apolloconsume => client for using manual query in function 
    <ApolloConsumer>
      {client => (
        <List.Item
          className="todo-item"
          actions={[
            <a href="#!">
              <Icon
                type="edit"
                theme="outlined"
                onClick={() => {
                  updateCssEdit(item.id);
                }}
              />
            </a>,
            <a href="#!">
              <Icon
                type="delete"
                theme="outlined"
                onClick={() => {
                  showConfirm(client, item.id, refetch);
                }}
              />
            </a>
          ]}
        >
          <TodoCheckbox
            client={client}
            useritem={item.userses}
            refetch={refetch}
            iditem={item.id}
          />
          <div style={{ paddingRight: '25px' }}>
            <a href="#!">
              <Popover content={content(item.userses)} trigger="click">
                <Badge style={{ backgroundColor: 'rgb(82, 196, 26)' , marginTop:'-2px', marginRight: '-6px', zIndex: 1 }} count={item.userses.length} >
                  <Icon type="user" />
                </Badge>
              </Popover>
            </a>
          </div>
          <span id={"TodoItem-nb-" + item.id}>{item.title}</span>
          <Mutation
            mutation={UPDATE_TODO}
            key={item.id}
            refetchQueries={() => [{ query: GET_TODO, variables: { idgroup: idgroup } }]}
          >
            {(updateTodo, { loading, error }) => {

              if (loading) {
                return <Loading isCenter={true} />;
              }

              if (error) {
                return <ErrorMessage error={error} />;
              }

              return (
                <div>
                  <form
                    id={"TodoItem-form-nb-" + item.id}
                    className="TodoItem-hide"
                    onSubmit={e => {
                      e.preventDefault();
                      updateTodo({ variables: { id: item.id, title: input.value } });
                      updateCssEdit(item.id);
                      input.value = input;
                    }}
                  >
                    <Input
                      ref={node => input = ReactDOM.findDOMNode(node)}
                      defaultValue={input}
                    />
                    <Button style={{ float: 'left' }} htmlType="submit" >Mettre à jour</Button>
                    <Button style={{ float: 'right' }} type="button" onClick={() => updateCssEdit(item.id)}>Annuler</Button>
                  </form>
                </div>
              );

            }}
          </Mutation>
        </List.Item>
      )}
    </ApolloConsumer>
  )
}

export default TodoItem;