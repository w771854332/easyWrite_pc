import React from 'react';
import LoginBack from '../../components/LoginBack';
import { connect } from 'dva';
import './style.less';
import { Form, Icon, Input, Button } from 'antd';

const FormItem = Form.Item;

class Login extends React.PureComponent {
  componentDidMount() {
    this.props.dispatch({ type: 'route/hide', payload: { hideTop: true, hideLeft: true } });
    window.common.writeCookie('USERID', '');
  }
  componentWillUnmount() {
    this.props.dispatch({ type: 'route/hide', payload: { hideTop: false, hideLeft: false } });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.dispatch({ type: 'user/Login', payload: { ...values } });
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const size = 'large';
    return (
      <LoginBack className="login-container">
        <img src={require('../../assets/images/logo.png')} alt=""/>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: '请输入您的账号！' }],
            })(
              <Input prefix={<Icon type="user" size={size} style={{ fontSize: 13 }} />} placeholder="账号" />,
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入您的密码！' }],
            })(
              <Input prefix={<Icon type="lock" size={size} style={{ fontSize: 13 }} />} type="password" placeholder="密码" />,
            )}
          </FormItem>
          <FormItem>
            <Button loading={this.props.loading} type="primary" htmlType="submit" className="login-form-button">
              登录
            </Button>
          </FormItem>
        </Form>
      </LoginBack>
    );
  }
}

const LoginForm = Form.create()(Login);

function mapStateToProps({ loading: { models: { user }}}) {
  return {
    loading: user
  };
}


export default connect(mapStateToProps)(LoginForm);
