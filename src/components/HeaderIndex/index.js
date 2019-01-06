import React from "react";
import { NavLink } from "react-router-dom";

import './style.css';

const HeaderIndex = () => {
  return (
    <div className="headerIndex">
      <div className="headerIndex-title">All In One Dashboard Trips</div>
      <div className="headerIndex-menu">
        <NavLink activeStyle={{ color: '#1890ff' }} exact to="/">Accueil</NavLink>
        <NavLink activeStyle={{ color: '#1890ff' }} to="/register">Inscription</NavLink>
        <NavLink activeStyle={{ color: '#1890ff' }} to="/login">Connexion</NavLink>
        <NavLink activeStyle={{ color: '#1890ff' }} to="/prices">Tarif</NavLink>
        <NavLink activeStyle={{ color: '#1890ff' }} to="/contact">Contact</NavLink>
      </div>
    </div>
  );
}

export default HeaderIndex;