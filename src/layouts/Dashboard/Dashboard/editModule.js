import React from "react";
// Ant design
import { Icon, Modal, Form, Input, InputNumber } from 'antd';
// import graphql query
import { UPDATE_MODULE } from './mutations';

const FormItem = Form.Item;
const CollectionCreateForm = Form.create()(
  class extends React.Component {
    render() {
      const {
        visible, onCancel, onCreate, form
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
          title="Éditer le module"
          okText="Mettre à jour"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="horizontal">
            <FormItem
              {...formItemLayout}
              label="Titre du module"
            >
              {getFieldDecorator('title', {
                initialValue: this.props.titleinput,
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
                initialValue: this.props.position,
                rules: [{ required: true, message: 'le module doit avoir une position' }],
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
async function editModuleAsync(client, value, idCard, refetch) {
  const { data, error } = await client.mutate({
    mutation: UPDATE_MODULE,
    variables: {
      title: value.title,
      position: value.position,
      id: idCard
    }
  })
  if (data) refetch();
  if (error) refetch();
}

class EditModule extends React.Component {
  state = {
    visible: false,
  };

  showModal = () => {
    this.setState({ visible: true });
  }

  handleCancel = () => {
    this.setState({ visible: false });
  }

  handleCreate = (client, idCard, refetch) => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      editModuleAsync(client, values, idCard, refetch);
      form.resetFields();
      this.setState({ visible: false });
    });
  }

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }

  render() {
    const { client, position, title, idCard, refetch } = this.props

    return (
      <div>
        <Icon type="edit" onClick={this.showModal}/>
        <CollectionCreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          titleinput={title}
          position={position}
          onCreate={() => this.handleCreate(client, idCard, refetch)}
        />
      </div>
    );
  }
}

export default EditModule;