import React from "react";
// Ant design
import { Avatar, Modal, Form, Col, Input, InputNumber, Select, Card, Icon } from 'antd';
// import graphql query
import { CREATE_MODULE } from './mutations';

const { Meta } = Card;
const FormItem = Form.Item;
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
                  <Option value="Searchlist">Liste des Recherches</Option>
                  <Option value="Postit">Post It/Annonces</Option>
                  <Option value="Scheduler">Planificateur d'évènements</Option>
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
);

// await graphql create function from query 
async function createModuleAsync(client, value, idgroup, refetch) {
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
  if (data) refetch();
  if (error) refetch();
}

class CreateModule extends React.Component {
  state = {
    visible: false,
  };

  showModal = () => {
    this.setState({ visible: true });
  }

  handleCancel = () => {
    this.setState({ visible: false });
  }

  handleCreate = (client, refetch, idgroup) => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      // avatar attribué selon le composant créer
      switch (values.component) {
        case 'Todo':
          values.avatar = 'https://cdn0.iconfinder.com/data/icons/illustricon-tech-iv/512/todo-512.png';
          break;
        case 'Searchlist':
          values.avatar = 'http://www.arbookfind.com//images/search-icon.png';
          break;
        case 'Postit':
          values.avatar = 'http://dynamimed.com/en/wp-content/uploads/2014/03/postit.png';
          break;
        case 'Scheduler':
          values.avatar = 'https://cdn3.iconfinder.com/data/icons/illustricon-tech-ii/512/calendar-512.png';
          break;
        default:
          values.avatar = 'https://cdn2.iconfinder.com/data/icons/flat-pro-imaging-set-2/32/select-none-512.png'
      }

      createModuleAsync(client, values, idgroup, refetch);
      form.resetFields();
      this.setState({ visible: false });
    });
  }

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }

  render() {
    const { client, refetch, idgroup } = this.props

    return (
      <Col lg={6} md={12} xs={24} className="gutter-row" key='f8esf891sef5'>
        <div className="gutter-box">
          <div>
            <Card
              style={{ marginTop: '10px', borderRadius: '8px 8px 0px 0px', borderColor: '#005aff4d' }}
              bordered={false}
              hoverable={true}
              actions={[
                <Icon type="file-add"
                  onClick={this.showModal}
                />
              ]}
            >
              <Meta
                avatar={<Avatar src='https://cdn3.iconfinder.com/data/icons/rest/30/add_order-512.png' />}
                title='Ajouter un module'
                description={
                  <a href="#!"
                    onClick={this.showModal}
                  >
                    Ajouter
              </a>
                }
              />
            </Card>
            <CollectionCreateForm
              wrappedComponentRef={this.saveFormRef}
              visible={this.state.visible}
              onCancel={this.handleCancel}
              onCreate={() => this.handleCreate(client, refetch, idgroup)}
            />
          </div>
        </div>
      </Col>
    );
  }
}

export default CreateModule;