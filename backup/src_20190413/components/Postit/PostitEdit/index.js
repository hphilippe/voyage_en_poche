import React from "react";
// Ant design
import { Modal, Form, Input, Select, Button } from 'antd';
// import graphql query
import { UPDATE_POSTIT } from '../mutations';
// editor quill
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
// CSS
import '../style.css';

// constante Editor Quill
const FormatsQuill = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video'
]
const EditorQuill = {
  toolbar: [
    [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
    [{size: []}],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, 
     {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image', 'video'],
    ['clean']
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  }
}

const FormItem = Form.Item;
//const { TextArea } = Input;
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
          sm: { span: 4 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 20 },
        },
      };
      return (
        <Modal
          visible={visible}
          title="Mettre à jour le Post it"
          okText="Mettre à jour"
          onCancel={onCancel}
          onOk={onCreate}
          width="80%"
        >
          <Form layout="horizontal">
            <FormItem
              {...formItemLayout}
              label="Titre"
            >
              {getFieldDecorator('title', {
                initialValue: this.props.record.title,
                rules: [{ required: true, message: 'Vous devez ajouter un titre' }],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Contenus"
            >
              {getFieldDecorator('content', {
                initialValue: this.props.record.content,
                rules: [{ required: true, message: 'Vous devez ajouter un contenus' }],
              })(
                //<TextArea />
                <ReactQuill 
                  theme='snow'
                  modules={EditorQuill}
                  formats={FormatsQuill}
                  placeholder="Écrivez quelque chose"
                />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Statut"
            >
              {getFieldDecorator('postitstatus', {
                initialValue: this.props.record.postitstatus,
                rules: [{ required: true, message: 'vous devez choisir un statut' }],
              })(
                <Select
                  showSearch
                  initialValue="Faible"
                  style={{ width: 200 }}
                  optionFilterProp="children"
                  filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  <Option value="Faible">Faible</Option>
                  <Option value="Moyen">Moyen</Option>
                  <Option value="Important">Important</Option>
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
async function editPostitAsync(client, value, iditem, refetch) {
  const { data, error } = await client.mutate({
    mutation: UPDATE_POSTIT,
    variables: {
      title: value.title,
      content: value.content,
      postitstatus: value.postitstatus,
      id: iditem
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

  handleCreate = (client, refetch, iditem) => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      editPostitAsync(client, values, iditem, refetch);
      form.resetFields();
      this.setState({ visible: false });
    });
  }

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }

  render() {
    const { record, client, iditem, refetch } = this.props

    return (
      <div>
        <Button onClick={this.showModal} className="Postit-container-icon-edit" icon="edit">Éditer</Button>
        <CollectionCreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          record={record}
          onCreate={() => this.handleCreate(client, refetch, iditem)}
        />
      </div>
    );
  }
}

export default CreateModule;