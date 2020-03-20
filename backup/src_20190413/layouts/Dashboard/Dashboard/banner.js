import React from "react";
import { ApolloConsumer } from 'react-apollo';
// Ant design
import { Avatar, Icon, Divider, /*Modal, Form, Input, InputNumber, Select*/ } from 'antd';
// Style CSS
import './style.css';
// moment
import Moment from 'react-moment';
import 'moment/locale/fr';
// import graphql query
// import { CREATE_MODULE } from './mutations';

/*const FormItem = Form.Item;
const Option = Select.Option;
const CollectionCreateForm = Form.create()(
  class extends React.Component {
    render() {
      const {
        visible, onCancel, onCreate, form,
      } = this.props;
      const { getFieldDecorator } = form;
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
      return (
        <Modal
          visible={visible}
          title="Ajouter un nouveau module"
          okText="Créer"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="horizontal">
            <FormItem
              {...formItemLayout}
              label="Titre du module"
            >
              {getFieldDecorator('title', {
                rules: [{ required: true, message: 'Vous devez ajouter un titre' }],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Module Position"
            >
              {getFieldDecorator('position', {
                initialValue: 0,
                rules: [{ required: true, message: 'le module doit avoir une position' }],
              })(
                <InputNumber />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Module Type"
            >
              {getFieldDecorator('component', {
                rules: [{ required: true, message: 'vous devez choisir un type de module' }],
              })(
                <Select
                  showSearch
                  initialValue="Todo"
                  style={{ width: 200 }}
                  optionFilterProp="children"
                  filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  <Option value="Todo">Liste des tâches</Option>
                  <Option value="Searchlist">Liste de Recherche</Option>
                </Select>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Module Position"
              style={{ display: "none" }}
            >
              {getFieldDecorator('size', {
                initialValue: 12
              })(
                <InputNumber />
              )}
            </FormItem>
          </Form>
        </Modal>
      );
    }
  }
);*/

// await graphql create function from query 
/*async function createModuleAsync(client, value, idgroup) {
  const { data, error } = await client.mutate({
    mutation: CREATE_MODULE,
    variables: {
      title: value.title,
      size: value.size,
      position: value.position,
      component: value.component,
      avatar: value.avatar,
      idgroup: idgroup
    }
  })
  if (data) console.log('ok');
  if (error) console.log('error');
}*/

class Banner extends React.Component {
  state = {
    visible: false,
    visibleBanner : true
  };

  /*showModal = () => {
    this.setState({ visible: true });
  }

  handleCancel = () => {
    this.setState({ visible: false });
  }

  handleCreate = (client, idgroup) => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      // avatar attribué selon le composant créer
      switch(values.component) {
        case 'Todo':
          values.avatar = 'https://cdn0.iconfinder.com/data/icons/illustricon-tech-iv/512/todo-512.png';
          break;
        case 'Searchlist':
          values.avatar = 'http://www.arbookfind.com//images/search-icon.png';
          break;
        default:
          values.avatar = 'https://cdn2.iconfinder.com/data/icons/flat-pro-imaging-set-2/32/select-none-512.png'
      }

      createModuleAsync(client, values, idgroup);
      form.resetFields();
      this.setState({ visible: false });
    });
  }*/

  handleBanner = () => {
    if(this.state.visibleBanner === true){
      this.setState({ visibleBanner: false });
      document.getElementById("dashboard_banner").style.height = "85px";
      // dashboard_banner_right_side
      document.getElementById("dashboard_banner_right_side").style.visibility = "hidden";
      document.getElementById("dashboard_banner_right_side").style.opacity = "0";
      // dashboard_banner_bottom_left
      document.getElementById("dashboard_banner_bottom_left").style.visibility = "hidden";
      document.getElementById("dashboard_banner_bottom_left").style.opacity = "0";
      // Arrow
      document.getElementById("dashboard_banner_bottom_center_up").style.display = "none";
      document.getElementById("dashboard_banner_bottom_center_down").style.display = "block";
    } else {
      this.setState({ visibleBanner: true });
      document.getElementById("dashboard_banner").style.height = "275px";
      // dashboard_banner_right_side
      document.getElementById("dashboard_banner_right_side").style.visibility = "visible";
      document.getElementById("dashboard_banner_right_side").style.opacity = "1";
      // dashboard_banner_bottom_left
      document.getElementById("dashboard_banner_bottom_left").style.visibility = "visible";
      document.getElementById("dashboard_banner_bottom_left").style.opacity = "1";
      // Arrow
      document.getElementById("dashboard_banner_bottom_center_up").style.display = "block";
      document.getElementById("dashboard_banner_bottom_center_down").style.display = "none";
    }
    
  }

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }

  render() {
    const { dateStart, dateEnd, bgGround, matchParams } = this.props

    // convert url without underscore
    const titleGroup = matchParams.params.title.split("_").join(" ")

    const style_dashboard_banner = {
      height: '275px',
      backgroundImage: 'url("https://media.graphcms.com/' + bgGround + '")',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
    };

    return (
      <ApolloConsumer>
        {client => (
          <div className="dashboard_banner" id="dashboard_banner" style={style_dashboard_banner} >
            <div className="dashboard_banner_layer">
              <div className="dashboard_banner_right_side" id="dashboard_banner_right_side">
                <h3 className="dashboard_banner_right_side_title">Modules</h3>
                <ul>
                  <a href="#!"><li>Tous afficher</li></a>
                  <a href="#!"><li>Liste des tâches</li></a>
                  <a href="#!"><li>Liste des recherches</li></a>
                  {/*<hr />
                  <a href="#!"><li><Icon type="tool" />  Modifier l'ordre des modules</li></a>
                  <a href="#!" onClick={this.showModal}>
                    <li><Icon type="dashboard" />  Ajouter un module</li>
                  </a>
                  <CollectionCreateForm
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={() => this.handleCreate(client, mainIdGroup)}
                  />*/}
                </ul>
              </div>
              <div className="dashboard_banner_top_left">
                <h1>{titleGroup}</h1>
                <p> {dateStart ? <Moment date={dateStart} format="DD MMMM YYYY" /> : ''} - {dateEnd ? <Moment date={dateEnd} format="DD MMMM YYYY" /> : ''} </p>
              </div>
              <div className="dashboard_banner_bottom_left" id="dashboard_banner_bottom_left">
                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>hp</Avatar>
                <Avatar style={{ backgroundColor: '#87d068' }} icon="user-add" />
                <Divider type="vertical" />
                <a href="#!"><Icon type="usergroup-add" /> Ajouter un utilisateur</a>
              </div>
              <div className="dashboard_banner_bottom_center">
                <a href="#!" onClick={this.handleBanner} ><Icon id="dashboard_banner_bottom_center_up" type="up" /></a>
                <a href="#!" onClick={this.handleBanner} ><Icon id="dashboard_banner_bottom_center_down" style={{ display: 'none' }} type="down" /></a>
              </div>
            </div>
          </div>
        )}
      </ApolloConsumer>
    );
  }
}

export default Banner;