import React from "react";
import { Query } from 'react-apollo';

import Loading from '../../Loading';
import ErrorMessage from '../../Error';

import TodoItem from '../TodoItem';

import { List } from "antd";

import { GET_TODO } from '../mutations';

const TodoList = ({idgroup}) => (
  <Query
    query={GET_TODO}
    variables={{ idgroup: idgroup }}
    notifyOnNetworkStatusChange={true}
  >
    {({ data, loading, error, refetch }) => {

      if (loading) {
        return <Loading isCenter={true} />;
      }

      if (error) {
        return <ErrorMessage error={error} />;
      }

      return (
        <List
          // emptyText sets the text to display in an empty list
          locale={{ emptyText: "No todo items" }}
          dataSource={data.todoes}
          renderItem={todoes => (
            <TodoItem
              item={todoes}
              refetch={refetch}
              idgroup={idgroup}
            />
          )}
        />
      );

    }}
  </Query>
);

export default TodoList;