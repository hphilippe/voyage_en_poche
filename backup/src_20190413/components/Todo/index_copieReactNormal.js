import React from "react";
import { Input, List, Icon } from "antd";

export default class Todo extends React.Component {
  constructor() {
    super();

    // Initialize the state
    this.state = {
      todos: []
    };
  }
  
  handlePressEnter = e => {
    // Create a todo object containing its index and content
    const todo = {
      index: this.state.todos.length,
      content: e.target.value
    };

    // Add the todo to our array
    const newTodos = this.state.todos.concat(todo);

    this.setState({
      todos: newTodos
    });

    // Clear input
    e.target.value = "";
  };

  removeTodo = index => {
    let newTodos = [...this.state.todos];

    // Remove element
    newTodos.splice(index, 1);

    // Decrement greater indexes
    for (let i = index; i < newTodos.length; i++) {
      newTodos[i].index -= 1;
    }

    // Update state
    this.setState({
      todos: newTodos
    });
  };
  
  render() {
    return (
      <div className="Todo-container">
        <h3>Todo Liste</h3>
        
        <Input
          placeholder="What needs to be done?"
          onPressEnter={this.handlePressEnter}
        />
        
        {/* emptyText sets the text to display in an empty list */}
        <List
          locale={{ emptyText: "No todo items" }}
          dataSource={this.state.todos}
          renderItem={item => (
            <TodoItem
              todo={item}
              removeTodo={this.removeTodo}
            />
          )}
        />
      </div>
    );
  }
}

class TodoItem extends React.Component {
  remove = () => {
    // Remove this TodoItem
    this.props.removeTodo(this.props.todo.index);
  };

  render() {
    return (
      <List.Item
        actions={[
          <Icon
            type="close-circle"
            theme="filled"
            onClick={this.remove}
          />
        ]}
      >
        {this.props.todo.content}
      </List.Item>
    );
  }
}