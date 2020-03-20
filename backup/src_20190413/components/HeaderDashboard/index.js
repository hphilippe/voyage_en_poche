import React from "react";
import { NavLink } from "react-router-dom";
import { Layout, Menu, Icon } from 'antd';
//import './style.css';

// constante
const { Header } = Layout;
const SubMenu = Menu.SubMenu;

const HeaderIndex = () => {
  return (
    <div>

      <Header style={{ zIndex: 10, width: '100%', /*backgroundColor: 'white'*/ }}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item key="1"><NavLink to="/app"><Icon type="home" /> Acceuil</NavLink></Menu.Item>

          <SubMenu
            key="sub1"
            title={<span>Events</span>}
          >
            <Menu.Item key="7"> Skear</Menu.Item>
            <Menu.Item key="8"> Valmenier ski</Menu.Item>
          </SubMenu>

          <Menu.Item key="3"><Icon type="user" /> Profile</Menu.Item>
          <Menu.Item key="4"><NavLink exact to='/about'><Icon type="book" /> About</NavLink></Menu.Item>
          <Menu.Item key="2"><Icon type="setting" /> Configuration</Menu.Item>
          
          <Menu.Item style={{ float: 'right' }} key="6" onClick={() => { localStorage.clear(); window.location.reload(); }}>
            <Icon type="disconnect" /> Logout
          </Menu.Item>

        </Menu>
      </Header>
      {/* <div style={{marginBottom:'64px'}} ></div> */}
    </div>
  );
}

export default HeaderIndex;