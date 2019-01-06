import React from "react";

import PostList from './PostList';

import { Icon, Card, Menu, Dropdown } from "antd";
import './style.css';

const menu = (
  <Menu>
    <Menu.Item key="0">
      <a href="#!">
        <Icon
          type="edit"
          style={{ height: '100%', verticalAlign: 'middle' }}
        /> Créer un article
      </a>
    </Menu.Item>
    <Menu.Item key="1">
      <a href="#!" onClick={resync} >
        <Icon
          type="sync"
          style={{ height: '100%', verticalAlign: 'middle' }}
        /> Resync
      </a>
    </Menu.Item>
  </Menu>
);

function resync() {
  console.log('ahazheee');
}

class Post extends React.Component {

  render() {
    return (

      /* Todo list default card */
      <Card
        title={this.props.titlemodule}
        extra={
          <Dropdown overlay={menu} placement="bottomRight" trigger={['click']}>
            <a className="ant-dropdown-link" href="#!">
              Click me <Icon type="down" style={{ height: '100%', verticalAlign: 'middle' }} />
            </a>
          </Dropdown>
        }
      >

        {/* Todo list composition */}
        <div className="Searchlist-container">
          <PostList />
        </div>
      </Card>

    );
  }
}

export default Post;