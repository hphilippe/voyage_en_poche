import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect  } from 'react-router-dom';

// Home Page
import HeaderIndex from "../components/HeaderIndex/index.js";
import FooterIndex from "../components/FooterIndex/index.js";
import indexRoutes from "../routes/index.js";
import BackgroundIndex from "../layouts/Home/Background/index.js";

// Dashboard Page
//import Dashboard from "../layouts/Dashboard/App/index.js";
import dashboardRoutes from "../routes/Dashboard.js";
import HeaderDashboard from "../components/HeaderDashboard/index.js";
import FooterDashboard from "../components/FooterDashboard/index.js";

// Gobal CSS
import './style.css';
import { Layout } from 'antd';
// import { withState } from 'recompose';

const loggedIn = false;

const switchIndexRoutes = (
  <div className="home">
    <HeaderIndex />
    <BackgroundIndex />
    <Switch>
    
      {indexRoutes.map((prop, key) => {
        return (
          <Route path={prop.path} component={prop.component} exact={prop.exact} key={key} />
        );
      })}
      
      return (
      <Route path="/" render={() => (
        loggedIn ? (
          <Redirect to="/app"/>
        ) : (
          <Redirect to="/" />
        )
      )}/>
      );
      
    </Switch>
    <FooterIndex />
  </div>
);

const switchDashboardRoutes = (
  <div>
    <Layout>
      <HeaderDashboard />
      <Switch>
        
        {dashboardRoutes.map((prop, key) => {
          return (
            <Route path={prop.path} component={prop.component} exact={prop.exact} key={key} />
          );
        })}

      return (
        <Route path="/" render={() => (
            <Redirect to="/app"/>
        )}/>
      );
        
      </Switch>
      <FooterDashboard />
    </Layout>
  </div>
);

function UserGreeting(props){
  return (
    <Router>
      <div>
        {switchDashboardRoutes}
      </div>
    </Router>
  ); 
}

function GuestGreeting(props){
  return (
    <Router>
      <div>
        {switchIndexRoutes}
      </div>
    </Router>
  ); 
}

function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}

class App extends Component {
  
  state = {
    isLoggedIn : localStorage.getItem("connect")
  }
  
  render() {
    return <Greeting isLoggedIn={this.state.isLoggedIn} />
  }
}

export default App;
