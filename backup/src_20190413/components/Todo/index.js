import React from "react";

import { Icon, Card } from "antd";

import TodoList from './TodoList';
import TodoCreate from './TodoCreate';

class Todo extends React.Component {

  constructor(props) {
    super(props);
    this.resync = this.resync.bind(this);
  }

  resync() {
    console.log('ahazh');
  }
  
  render() {
    return (

      /* Todo list default card */
      <Card
        title={this.props.titlemodule}
        extra={
          <a href="#!" onClick={this.resync} >
            <Icon
              type="sync"
              style={{ height: '100%', verticalAlign: 'middle' }}
            /> Resync
          </a>
        }
      >
      
        {/* Todo list composition */}
        <div className="Todo-container">
          <TodoCreate idgroup={this.props.idgroup}/>
          <TodoList idgroup={this.props.idgroup}/>
        </div>
      </Card>

    );
  }
}

export default Todo;