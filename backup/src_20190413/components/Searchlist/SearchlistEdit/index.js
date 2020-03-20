import React from "react";
// Ant design
import { Icon, Modal, Form, Input, InputNumber, Select } from 'antd';
// import graphql query
import { UPDATE_SEARCHLIST } from '../mutations';

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
          title="Éditer l'item"
          okText="Mettre à jour"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="horizontal">
            <FormItem
              {...formItemLayout}
              label="Title"
            >
              {getFieldDecorator('title', {
                initialValue: this.props.record.title,
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
                initialValue: this.props.record.slug,
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
                initialValue: this.props.record.price,
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
                initialValue: this.props.record.pin,
                rules: [{ required: true, message: 'Url of your element' }],
              })(
                <Select
                  showSearch
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
async function editSearchlistAsync(client, value, idCard, refetch) {
  const { data, error } = await client.mutate({
    mutation: UPDATE_SEARCHLIST,
    variables: {
      title: value.title,
      slug: value.slug,
      price: value.price,
      pin: value.pin,
      id: idCard
    }
  })
  if (data) refetch();
  if (error) refetch();
}

class EditSearchlist extends React.Component {
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

      editSearchlistAsync(client, values, idCard, refetch);
      form.resetFields();
      this.setState({ visible: false });
    });
  }

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }

  render() {
    const { record, client, refetch, iditem } = this.props

    return (
      <span>
        <a href="#!"
          onClick={this.showModal}
        >
          <Icon
            type="edit"
            theme="outlined"
          />
        </a>
        <CollectionCreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          record={record}
          onCreate={() => this.handleCreate(client, iditem, refetch)}
        />
      </span>
    );
  }
}

export default EditSearchlist;