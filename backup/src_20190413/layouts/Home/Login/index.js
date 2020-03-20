import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';

//import { Query } from 'react-apollo';
//import gql from 'graphql-tag'

import '../style.css';
import './style.css';
import logo from '../../../assets/img/logotest.png';

const FormItem = Form.Item;

/*const GET_USER = gql`
  query($email: String!) {
    userses(where: {
      email: $email
    }) {
      password
    }
  }
`*/

/*const GET_VISIBILITY_FILTER = gql`
  {
    visibilityFilter @client
  }
`;*/

class NormalLoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) {
        console.log('Received values of form: ', values);
      } else {
        console.log('Success: ', values);
        if(values.userName === 'Bear' && values.password === 'bear' ){
          localStorage.setItem("username", "Bear");
          localStorage.setItem("email", "bear@gmail.com");
          localStorage.setItem("id", "cjozqjk5zf0ba0932bbfirgvi");
          localStorage.setItem("connect", true);
          window.location.reload();
        } else if (values.userName === 'Satan' && values.password === 'satan' ) {
          localStorage.setItem("username", "Satan");
          localStorage.setItem("email", "aure@gmail.com");
          localStorage.setItem("id", "cjpa7oo4shb670945etg8kicm");
          localStorage.setItem("connect", true);
          window.location.reload();
        } else if (values.userName === 'Guigui' && values.password === 'guigui' ) {
          localStorage.setItem("username", "Guigui");
          localStorage.setItem("email", "guigui@gmail.com");
          localStorage.setItem("id", "cjpa7plhchbcl09457x1q01jv");
          localStorage.setItem("connect", true);
          window.location.reload();
        } else if (values.userName === 'Poney' && values.password === 'poney' ) {
          localStorage.setItem("username", "Poney");
          localStorage.setItem("email", "poney@gmail.com");
          localStorage.setItem("id", "cjpa7r21zhbmg0945rto8xtuo");
          localStorage.setItem("connect", true);
          window.location.reload();
        } else if (values.userName === 'Belz' && values.password === 'belz' ) {
          localStorage.setItem("username", "Belz");
          localStorage.setItem("email", "balz@gmail.com");
          localStorage.setItem("id", "cjr7y8ok9gd420845rq0sxefr");
          localStorage.setItem("connect", true);
          window.location.reload();
          //localStorage.setItem("apikey", values.apiKey);
        } else {
          alert('mot de passe erreur ou identifiant incconu');
        }
        
        /*client.query({
          query: gql`
            query($email: String!) {
              userses(where: {
                email: 'bear@gmail.com'
              }) {
                password
              }
            }
          `
        }).then(response => console.log(response.data))*/
          
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={'body-index'}>
        <div className="body-index-centerHeight">
      <Form onSubmit={this.handleSubmit} style={{ margin: 'auto' }} className="login-form">
          <div className="login-form-logo">
            <img  alt="logo" src={logo} style={{ width: '65px' }}/>
          </div>
          <FormItem>
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: 'Veuillez entrer votre nom d\'utilisateur.' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Veuillez entrer votre mot de passe.' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
            )}
          </FormItem>
          {/*<FormItem>
            {getFieldDecorator('apiKey', {
              rules: [{ required: true, message: 'Veuillez entrer la clé privé' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Private Key" />
            )}
            </FormItem>*/}
          <FormItem>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox>Remember me</Checkbox>
            )}
            <a className="login-form-forgot" href="#ee">Forgot password</a>
            <Button type="primary" htmlType="submit" className="login-form-button" style={{ width: '100%' }}>
              Log in
            </Button>
            Or <a href="#ee">register now!</a>
            
            {/*<Query query={GET_VISIBILITY_FILTER}>
              {({ data, client }) => (
                <Button
                  onClick={() => client.writeData({ data: { visibilityFilter: 'SHOW_ONE' } })}
                >
                  button-test
                </Button>
              )}
            </Query>*/}
            
          </FormItem>
        </Form>
        </div>
      </div>
    );
  }
}

export default Form.create()(NormalLoginForm)