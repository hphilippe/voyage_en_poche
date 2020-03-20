import React from "react";
// Ant design
import { Icon, Modal, Form, Input, InputNumber, Select } from 'antd';
// import graphql query
import { CREATE_SEARCHLIST } from '../mutations';

// Const Formulaire
const FormItem = Form.Item;
const Option = Select.Option;
const CollectionCreateForm = Form.create()(
  // eslint-disable-next-line
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
          title="Rentrer une nouvelle recherche"
          slug=""
          price=""
          pin=""
          okText="Créer"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="horizontal">
            <FormItem
              {...formItemLayout}
              label="Title"
            >
              {getFieldDecorator('title', {
                rules: [{ required: true, message: 'Title of your element' }],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Url"
            >
              {getFieldDecorator('slug', {
                rules: [{ required: true, message: 'Url of your element' }],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Prix"
            >
              {getFieldDecorator('price', {
                initialValue: 0
              })(
                <InputNumber
                  formatter={value => `${value}€`}
                  parser={value => value.replace('€', '')}
                />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Statut"
            >
              {getFieldDecorator('pin', {
                rules: [{ required: true, message: 'Url of your element' }],
              })(
                <Select
                  showSearch
                  initialValue="NoPin"
                  style={{ width: 200 }}
                  placeholder="Select a statut"
                  optionFilterProp="children"
                  filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  <Option value="Pin">Pin</Option>
                  <Option value="NoPin">No Pin</Option>
                </Select>
              )}
            </FormItem>
          </Form>
        </Modal>
      );
    }
  }
);

// await graphql create function from query 
async function createSearchlistAsync(client, item, idgroup, refetch) {
  const { data, error } = await client.mutate({
    mutation: CREATE_SEARCHLIST,
    variables: {
      title: item.title,
      slug: item.slug,
      price: item.price,
      pin: item.pin,
      idgroup: idgroup
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

  handleCreate = (client, idgroup, refetch) => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      createSearchlistAsync(client, values, idgroup, refetch);
      form.resetFields();
      this.setState({ visible: false });
    });
  }

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }

  render() {
    const { client, idgroup, refetch } = this.props

    return (
      <div>
        <a href="#!" onClick={this.showModal} >
          <Icon
            type="edit"
            style={{ height: '100%', verticalAlign: 'middle' }}
          /> Créer une entrée
        </a>
        <CollectionCreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={() => this.handleCreate(client, idgroup, refetch)}
        />
      </div>
    );
  }
}

export default EditModule;