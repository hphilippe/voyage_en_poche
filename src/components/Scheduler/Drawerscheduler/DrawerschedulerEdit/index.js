import React from "react";
// Ant design
import { Modal, Form, Input, Select, Button, TimePicker } from 'antd';
// import graphql query
import { UPDATE_SCHEDULER } from '../../mutations';
// moment date
import Moment from 'moment';
import 'moment/locale/fr';

const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option;
const CollectionCreateForm = Form.create()(
  class extends React.Component {
    render() {
      const {
        visible, onCancel, onCreate, form,
      } = this.props;
      const { getFieldDecorator } = form;
      const dateStartFormat = this.props.record.dateStart ? Moment(this.props.record.dateStart).format('HH:mm:ss') : Moment().format('HH:mm:ss');
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
      const formItemLayoutTimepicker = {
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
          title="Éditer un évènement"
          okText="Créer"
          onCancel={onCancel}
          onOk={onCreate}
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
                <TextArea />
              )}
            </FormItem>
            <Form.Item
              {...formItemLayoutTimepicker}
              label="Heure de Début"
            >
              {getFieldDecorator('timepicker', {
                initialValue: Moment(dateStartFormat, "HH:mm:ss"),
                rules: [{ required: true, message: 'veuillez choisir l\'heure' }],
              })(
                <TimePicker />
              )}
            </Form.Item>
            <FormItem
              {...formItemLayout}
              label="Statut"
            >
              {getFieldDecorator('status', {
                initialValue: this.props.record.type,
                rules: [{ required: true, message: 'vous devez choisir un statut' }],
              })(
                <Select
                  showSearch
                  initialValue="info"
                  style={{ width: 200 }}
                  optionFilterProp="children"
                  filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  <Option value="success">Normal</Option>
                  <Option value="warning">Modéré</Option>
                  <Option value="error">Important</Option>
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
async function editScheduleAsync(client, value, idschedule, refetch) {
  const { data, error } = await client.mutate({
    mutation: UPDATE_SCHEDULER,
    variables: {
      title: value.title,
      content: value.content,
      status: value.status,
      datestart: value.timepicker,
      id: idschedule
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

  handleCreate = (client, refetch, idschedule, items, datechoose) => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      
      // converge two datetime (date from schedule and time from form )
      let dateChooseFormat = Moment(datechoose).format('YYYY-MM-DD');
      let timeChooseFormat = Moment(values.timepicker).format('HH:mm:ss');
      let convergeDatetime = dateChooseFormat + 'T' + timeChooseFormat;
      values.timepicker = Moment(convergeDatetime, 'YYYY-MM-DD HH:mm:ss').toDate()
      
      editScheduleAsync(client, values, idschedule, refetch);
      form.resetFields();
      this.setState({ visible: false });
    });
  }

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }

  render() {
    const { client, refetch, idschedule, record, datechoose } = this.props

    return (
      <div style={{ display: "inline-block", marginRight: "5px" }} >
        <Button onClick={this.showModal} shape="circle" icon="edit" />
        <CollectionCreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          record={record}
          onCreate={() => this.handleCreate(client, refetch, idschedule, record, datechoose)}
        />
      </div>
    );
  }
}

export default EditModule;