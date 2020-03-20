import React from "react";

import { Checkbox, message } from "antd";

import { UPDATE_TODO_USER_CHECKBOX, DELETE_TODO_USER_CHECKBOX } from '../mutations';

// await graphql remove relation
async function removeTodoUserAsync(client, idItem, refetch) {
  const { data, error } = await client.mutate({
    mutation: DELETE_TODO_USER_CHECKBOX,
    variables: { id: idItem, useremail: localStorage.getItem('email') }
  })
  if (data) message.success('Tâche enlevé');
  if (error) message.warning('problème survenue à l\'enregistrement');
}

// await graphql add relation
async function addTodoUserAsync(client, idItem, refetch) {
  const { data, error } = await client.mutate({
    mutation: UPDATE_TODO_USER_CHECKBOX,
    variables: { id: idItem, useremail: localStorage.getItem('email') }
  })
  if (data) message.success('Tâche accomplie');
  if (error) message.warning('problème survenue à l\'enregistrement');
}

function onChangeFunction(client, iditem, refetch, e) {
  if(e.target.checked === true){
    addTodoUserAsync(client, iditem, refetch);
  } else {
    removeTodoUserAsync(client, iditem, refetch);
  }
}

const TodoCheckbox = ({
  client,
  useritem,
  refetch,
  iditem
}) => {
  let useritemState = false;
  useritem.forEach(function(element) {
    if(element.email === localStorage.getItem('email')){
      useritemState = true;
    }
  });

  return (
    <div>    
      <Checkbox
        defaultChecked={useritemState}
        onChange={(e) => onChangeFunction(client, iditem, refetch, e)}
      > </Checkbox>
      
      {/*<div>
        {useritemState ? (
          <Badge style={{ backgroundColor: 'transparent', boxShadow: '0 0 0 0px #fff0' }} count={<Icon type="like" style={{ color: 'rgb(34, 97, 245)', paddingRight: '19px', paddingBottom: '4px' }} />}>
          <Badge style={{ backgroundColor: 'transparent', boxShadow: '0 0 0 0px #fff0' }} count={<Icon type="like" style={{ color: 'rgb(34, 97, 245)', paddingRight: '19px', paddingBottom: '4px' }} />}>
            <Checkbox
              defaultChecked={useritemState}
              onChange={(e) => onChangeFunction(client, iditem, refetch, e)}
            >  </Checkbox>
          </Badge>
        ) : (
          <Checkbox
            defaultChecked={useritemState}
            onChange={(e) => onChangeFunction(client, iditem, refetch, e)}
          > </Checkbox>
        )}
      </div>*/}
    </div>
  )
}

export default TodoCheckbox;