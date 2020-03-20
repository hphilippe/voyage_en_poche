import React from "react";
// Ant design
import { DatePicker, Modal, Form, Input, Select, Icon } from 'antd';
// import graphql query
import { UPDATE_GROUP } from './mutations';
// import moment date
import Moment from 'moment';
const dateFormat = 'YYYY/MM/DD';

const { RangePicker } = DatePicker;
const FormItem = Form.Item;
const Option = Select.Option;
const CollectionCreateForm = Form.create()(
  class extends React.Component {
    render() {
      const {
        visible, onCancel, onCreate, form,
      } = this.props;
      const { getFieldDecorator } = form;
      const dateStartFormat = this.props.datestart ? Moment(this.props.datestart).format('YYYY/MM/DD') : Moment().format('YYYY/MM/DD');
      const dateEndFormat = this.props.dateend ? Moment(this.props.dateend).format('YYYY/MM/DD'): Moment().format('YYYY/MM/DD');
      const bannerId = this.props.banner ? this.props.banner : null;
      const status = this.props.status;
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
          title="Éditer l'évènement"
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
                initialValue: this.props.titleinput,
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
                initialValue: bannerId,
                rules: [{ required: true, message: 'vous devez choisir un type de parpaing' }],
              })(
                <Select
                  showSearch
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
                initialValue: status,
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
                initialValue: [Moment(dateStartFormat, "YYYY/MM/DD"), Moment(dateEndFormat, "YYYY/MM/DD") ],
                rules: [{ required: true, message: 'Vous devez ajouter une date' }],
              })(
                <RangePicker
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
async function editGroupAsync(client, idgroup, value, refetch) {
  const { data, error } = await client.mutate({
    mutation: UPDATE_GROUP,
    variables: {
      title: value.title,
      idbanner: value.banner,
      status: value.status,
      datestart: value.date[0]._d,
      dateend: value.date[1]._d,
      idgroup: idgroup
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

  handleCreate = (client, idgroup, refetch) => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      
      editGroupAsync(client, idgroup, values, refetch);
      form.resetFields();
      this.setState({ visible: false });
    });
  }

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }

  render() {
    const { client, group, refetch } = this.props

    return (
      <div>
        <Icon type="edit" onClick={this.showModal}/>
        <CollectionCreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          titleinput={group.title}
          banner={group.banner.id}
          status={group.groupstatus}
          datestart={group.dateStart}
          dateend={group.dateEnd}
          onCreate={() => this.handleCreate(client, group.id, refetch)}
        />
      </div>
    );
  }
}

export default CreateGroup;