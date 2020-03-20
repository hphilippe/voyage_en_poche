import React from "react";
import { Query, ApolloConsumer } from 'react-apollo';
// Ant design
import { Icon, Card, Tabs, Button, Modal } from "antd";
// Module
import Loading from '../Loading';
import ErrorMessage from '../Error';
import PostitCreate from './PostitCreate';
import PostitEdit from './PostitEdit';
// Mutations
import { GET_POSTIT, DELETE_POSTIT } from './mutations';
// CSS
import './style.css';
// convert content to html
import Parser from 'html-react-parser';

// const
const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;

// await graphql delete then refetch function from query in todolist
async function removePostitAsync(client, idItem, refetch) {
  const { data, error } = await client.mutate({
    mutation: DELETE_POSTIT,
    variables: { id: idItem }
  })
  if (data) refetch()
  if (error) refetch()
}

class Postit extends React.Component {

  constructor(props) {
    super(props);
    this.resync = this.resync.bind(this);
    
    this.state = {
      activeKey: '',
    };
  }
  
  onChange = (activeKey) => {
    this.setState({ activeKey });
  }
  
  // Modal delete Item
  showConfirm(client, id, refetch) {
    confirm({
      title: 'Suppression',
      content: 'Cliquer sur "Ok" pour être sûr de surpprimer l\'item',
      onOk() {
        removePostitAsync(client, id, refetch);
      },
      onCancel() { },
    });
  }

  resync() {
    console.log('ahazh');
  }
  
  render() {
    const { idgroup } = this.props

    return (

      /* Postit list default card */
      <ApolloConsumer>
        {client => (
          <Query
            query={GET_POSTIT}
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
                    <a href="#!" onClick={this.resync} >
                      <Icon
                        type="sync"
                        style={{ height: '100%', verticalAlign: 'middle' }}
                      /> Resync
                    </a>
                  }
                >
                
                  {/* Postit content */}
                  <div className="Postit-container">
                    
                    <Tabs
                      tabBarExtraContent={<PostitCreate client={client} idgroup={idgroup} refetch={refetch} />}
                      // hideAdd
                      onChange={this.onChange}
                      // activeKey={this.state.activeKey}
                      // type="editable-card"
                      // onEdit={this.onEdit}
                      // defaultActiveKey="0"
                    >
                      {data.postIts.map((record, index) => 
                        <TabPane tab={record.title} key={index}>
                          {Parser(record.content)}
                          <div className="Postit-container-icon">
                            <PostitEdit record={record} client={client} iditem={record.id} refetch={refetch} />
                            <Button 
                              className="Postit-container-icon-delete" 
                              icon="delete"                 
                              onClick={() => {
                                this.showConfirm(client, record.id, refetch);
                              }}> Supprimer
                            </Button>
                          </div>
                        </TabPane>
                      )}
                    </Tabs>
                    
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

export default Postit;