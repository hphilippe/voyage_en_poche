import React from "react";
// Ant design
import { DatePicker, Modal, Form, Col, Input, Select, Card } from 'antd';
// import graphql query
import { CREATE_GROUP } from './mutations';
// import moment date
import Moment from 'moment';
const dateFormat = 'YYYY/MM/DD';
const curentDate = new Date();
const dayDate = curentDate.getDate();
const monthDate = curentDate.getMonth()+1; 
const yearDate = curentDate.getFullYear(); 

const { RangePicker } = DatePicker;
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
          title="Ajouter un nouvel évènement"
          okText="Créer"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="horizontal">
            <FormItem
              {...formItemLayout}
              label="Titre de l'évènement"
            >
              {getFieldDecorator('title', {
                rules: [{ required: true, message: 'Vous devez ajouter un titre' }],
              })(
                <Input />
              )}
            </FormItem>
            {/*<FormItem
              {...formItemLayout}
              label="Bannière image url"
            >
              {getFieldDecorator('slug', {
                rules: [{ required: true, message: 'Vous devez ajouter une url d\'image' }],
              })(
                <Input />
              )}
            </FormItem>*/}
            <FormItem
              {...formItemLayout}
              label="Bannière"
            >
              {getFieldDecorator('banner', {
                rules: [{ required: true, message: 'vous devez choisir un type de parpaing' }],
              })(
                <Select
                  showSearch
                  initialValue="cjph06cyi477a0945vdg12tn1"
                  style={{ width: 200 }}
                  optionFilterProp="children"
                  filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  <Option value="cjph06cyi477a0945vdg12tn1">Voyage Ski/Snow</Option>
                  <Option value="cjphbkezm72b00945t85zmefe">Skear Logo</Option>
                  <Option value="cjp7hr75rs4p70945swzc49vn">Stargate Atlantis</Option>
                </Select>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Status"
            >
              {getFieldDecorator('status', {
                initialValue: "Active",
                rules: [{ required: true, message: 'vous devez choisir un type de status' }],
              })(
                <Select
                  showSearch
                  style={{ width: 200 }}
                  optionFilterProp="children"
                >
                  <Option value="Active">Actif</Option>
                  <Option value="Archive">Archivé</Option>
                </Select>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Date"
            >
              {getFieldDecorator('date', {
                rules: [{ required: true, message: 'Vous devez ajouter une date' }],
              })(
                <RangePicker
                  initialValue={[Moment(yearDate+'/'+monthDate+'/'+dayDate, dateFormat), Moment(yearDate+'/'+monthDate+'/'+dayDate, dateFormat)]}
                  format={dateFormat}
                />
              )}
            </FormItem>
          </Form>
        </Modal>
      );
    }
  }
);

// await graphql create function from query 
async function createGroupAsync(client, value, refetch) {
  const { data, error } = await client.mutate({
    mutation: CREATE_GROUP,
    variables: {
      title: value.title,
      idbanner: value.banner,
      status: value.status,
      datestart: value.date[0]._d,
      dateend: value.date[1]._d,
      email: localStorage.getItem("email")
    }
  })
  if (data) refetch();
  if (error) refetch();
}

class CreateGroup extends React.Component {
  state = {
    visible: false,
  };

  showModal = () => {
    this.setState({ visible: true });
  }

  handleCancel = () => {
    this.setState({ visible: false });
  }

  handleCreate = (client, refetch) => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      createGroupAsync(client, values, refetch);
      form.resetFields();
      this.setState({ visible: false });
    });
  }

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }

  render() {
    const { client, refetch } = this.props

    return (
      <Col lg={6} md={12} xs={24} className="gutter-row">
        <Card
          onClick={this.showModal}
          hoverable
          style={{ maxWidth: '250px', textAlign: 'center', marginLeft: 'auto', marginRight: 'auto' }}
          cover={<img style={{ minHeight: '250px', objectFit: 'cover', maxWidth: '250px' }} alt="example" src="https://cdn1.iconfinder.com/data/icons/freeline/32/add_cross_new_plus_create-512.png" />}
        >
          <Meta
            title='Créer un évènement'
            description='content event'
          />
        </Card>
        <CollectionCreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={() => this.handleCreate(client, refetch)}
        />
      </Col>
    );
  }
}

export default CreateGroup;