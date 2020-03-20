import React from "react";
import {  Row, Col, Form, Input, Tooltip, Icon, Checkbox, Button } from 'antd';
import '../style.css';
import './style.css';

const FormItem = Form.Item;

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    return (
    <div className={'body-index'}>
      <div className="body-index-centerHeight">
      
      <Row gutter={24} style={{ width: '600px', margin: '0 auto'}}>
        <Col className="gutter-row" span={12}>
        <div className="register-about">
 
             <div class="info-area info-horizontal">
                <div class="icon icon-primary"><i class="now-ui-icons media-2_sound-wave"></i></div>
                <div class="description">
                   <h5 class="info-title">Marketing</h5>
                   <p class="description">We've created the marketing campaign of the website. It was a very interesting collaboration.</p>
                </div>
             </div>
             <div class="info-area info-horizontal">
                <div class="icon icon-primary"><i class="now-ui-icons media-1_button-pause"></i></div>
                <div class="description">
                   <h5 class="info-title">Fully Coded in React 16</h5>
                   <p class="description">We've developed the website with React 16, HTML5 and CSS3. The client has access to the code using GitHub.</p>
                </div>
             </div>
             <div class="info-area info-horizontal">
                <div class="icon icon-info"><i class="now-ui-icons users_single-02"></i></div>
                <div class="description">
                   <h5 class="info-title">Built Audience</h5>
                   <p class="description">There is also a Fully Customizable CMS Admin Dashboard for this product.</p>
                </div>
             </div>

        </div>
        </Col>
        
        <Col className="gutter-row" span={12}>
        <Form onSubmit={this.handleSubmit} style={{ margin: 'auto' }} className="register-form">
          <FormItem
            {...formItemLayout}
            label="E-mail"
          >
            {getFieldDecorator('email', {
              rules: [{
                type: 'email', message: 'The input is not valid E-mail!',
              }, {
                required: true, message: 'Please input your E-mail!',
              }],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Password"
          >
            {getFieldDecorator('password', {
              rules: [{
                required: true, message: 'Please input your password!',
              }, {
                validator: this.validateToNextPassword,
              }],
            })(
              <Input type="password" />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Confirm Password"
          >
            {getFieldDecorator('confirm', {
              rules: [{
                required: true, message: 'Please confirm your password!',
              }, {
                validator: this.compareToFirstPassword,
              }],
            })(
              <Input type="password" onBlur={this.handleConfirmBlur} />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={(
              <span>
                Nickname&nbsp;
                <Tooltip title="What do you want others to call you?">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            )}
          >
            {getFieldDecorator('nickname', {
              rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            {getFieldDecorator('agreement', {
              valuePropName: 'checked',
            })(
              <Checkbox>J\'accepte la <a href="/privacy" target="_blank" kr="">Politique de confidentialité </a>et les <a href="/terms" target="_blank" kr="">Conditions d\'utilisation </a></Checkbox>
            )}
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">Register</Button>
          </FormItem>
        </Form>
        </Col>
      </Row>
      
      </div>
    </div>
    );
  }
}

export default Form.create()(RegistrationForm)