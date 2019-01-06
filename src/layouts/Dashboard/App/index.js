import React from "react";
import { Query, ApolloConsumer } from 'react-apollo';
// Ant design
import { Layout, Row, Col, Card, Icon, Modal } from 'antd';
// components loading error
import Loading from '../../../components/Loading';
import ErrorMessage from '../../../components/Error';
// CSS
import '../style.css';
import './style.css';
// import app module
import CreateGroup from './createGroup.js';
import EditGroup from './editGroup';
// import graphql query
import { GET_GROUP, DELETE_GROUP } from './mutations';
// moment
import Moment from 'react-moment';
import 'moment/locale/fr';

// Constante
const { Content } = Layout;
const { Meta } = Card;
const userEmail = localStorage.getItem("email");

// Redirect group select, custom url
function GroupSelect(item) {
  localStorage.setItem("groupSelectId", item.id);
  var titleUnderscore = item.title.split(" ").join("_");
  window.location.pathname = '/dashboard/' + item.id + '/' + titleUnderscore
}

// await graphql delete then refetch
async function removeGroupAsync(client, idItem, refetch) {
  const { data, error } = await client.mutate({
    mutation: DELETE_GROUP,
    variables: { id: idItem }
  })
  if (data) refetch()
  if (error) refetch()
}

// Modal delete Item
const confirm = Modal.confirm;
function showDeleteConfirm(client, id, refetch) {
  confirm({
    title: 'Suppression',
    content: 'Cliquer sur "Ok" pour être sûr de surpprimer l\'évènement et toutes ces données lui faissant référence',
    onOk() {
      removeGroupAsync(client, id, refetch);
    },
    onCancel() { },
  });
}

// CLASS APP
class App extends React.Component {

  render() {

    return (
      <ApolloConsumer>
        {client => (
          <Query
            query={GET_GROUP}
            variables={{ email: userEmail }}
            notifyOnNetworkStatusChange={true}
          >
            {({ data, loading, error, refetch }) => {

              if (loading) {
                return <Loading isCenter={true} />;
              }

              if (error) {
                return <ErrorMessage error={error} />;
              }

              // STORE INFORMATION OF GROUP
              localStorage.setItem("GET_GROUP", data.groupses);

              // MAP ALL ITEM
              const ColList = data.groupses.map(({ ...group }) => {
                const areImages = group.banner
                return (
                  <Col lg={6} md={12} xs={24} className="gutter-row" key={group.id}>
                    <Card
                      hoverable
                      style={{ maxWidth: '250px', textAlign: 'center', marginLeft: 'auto', marginRight: 'auto' }}
                      actions={[
                        <EditGroup client={client} group={group} refetch={refetch} />,
                        <Icon type="delete" 
                          onClick={() => {
                            showDeleteConfirm(client, group.id, refetch);
                          }}
                        />
                      ]}
                      cover={
                        areImages
                          ? <img style={{ minHeight: '250px', objectFit: 'cover', maxWidth: '250px' }} alt="example" src={`https://media.graphcms.com/${group.banner.handle}`} onClick={() => { GroupSelect(group) }} />
                          : <img style={{ minHeight: '250px', objectFit: 'cover', maxWidth: '250px' }} alt="example" src={`http://www.lombez-gers.com/photos-lombez/commun/noPicture.png`} onClick={() => { GroupSelect(group) }} />
                      }
                    >
                      <Meta
                        onClick={() => { GroupSelect(group) }}
                        title={group.title}
                      />
                      {group.dateStart ? <Moment date={group.dateStart} format="DD MMMM YYYY" /> : ''} - {group.dateEnd ? <Moment date={group.dateEnd} format="DD MMMM YYYY" /> : ''}
                    </Card>
                  </Col>
                );
              });

              // RETURN THE CONTENT OF DASHBOARD
              return (
                <div style={{ padding: '0 50px' }}>
                  <Content>
                    <Row>
                      {ColList}

                      <CreateGroup client={client} refetch={refetch}/>

                    </Row>
                  </Content>
                </div>
              );

            }}
          </Query>
        )}
      </ApolloConsumer>
    );
  }
}

export default App;