import React from "react";
import { Query, ApolloConsumer } from 'react-apollo';
// Ant design
import { Icon, Card } from "antd";
// Module
import SearchlistList from './SearchlistList';
import Loading from '../Loading';
import ErrorMessage from '../Error';
// graphql
import { GET_SEARCHLIST } from './mutations';
// module component
import SearchlistCreate from './SearchlistCreate';

// Const Formulaire
/*const FormItem = Form.Item;
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
          title="Create a new item"
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
);*/

// await graphql create function from query 
/*async function createSearchlistAsync(client, item, idgroup, refetch) {
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
}*/

// CLASS SEARCHLIST
class Searchlist extends React.Component {

  constructor(props) {
    super(props);
    this.resync = this.resync.bind(this);
  }

  /*state = {
    visible: false,
  };*/

  // Debut Form Ant design
  /*showModal = () => {
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
  }*/
  // Fin Form Ant design

  resync =(refetch) => {
    refetch();
  }

  render() {
    const { idgroup } = this.props

    return (

      /* Searchlist list default card */
      <ApolloConsumer>
        {client => (
          <Query
            query={GET_SEARCHLIST}
            variables={{ idgroup: idgroup }}
            notifyOnNetworkStatusChange={true}
          >
            {({ data, loading, error, refetch }) => {

              if (loading) {
                return <Loading isCenter={true} />;
              }

              if (error) {
                return <ErrorMessage error={error} />;
              }

              return (
                <Card
                  title={this.props.titlemodule}
                  extra={
                    <div>
                      {/*<a href="#!" onClick={this.showModal} >
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
                      />*/}
                      <SearchlistCreate client={client} idgroup={idgroup} refetch={refetch} />
                      <span> &nbsp; </span>
                      <a href="#!" onClick={() => this.resync(refetch)} >
                        <Icon
                          type="sync"
                          style={{ height: '100%', verticalAlign: 'middle' }}
                        /> Resync
                      </a>
                    </div>
                  }
                >

                  {/* Searchlist list composition */}
                  <div className="Searchlist-container">
                    <SearchlistList
                      client={client}
                      id={this.props.id}
                      idgroup={idgroup}
                      data={data}
                      refetch={refetch}
                    />
                  </div>
                </Card>
              );
            }}
          </Query>
        )}
      </ApolloConsumer>

    );
  }
}

export default Searchlist;