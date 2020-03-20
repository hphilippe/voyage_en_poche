import React from "react";
import { Query, ApolloConsumer } from 'react-apollo';
// Ant design
import { Layout, Row, Col, Card, Icon, Modal, Tag  } from 'antd';
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
// Tags
const CheckableTag = Tag.CheckableTag;
const tagsFromServer = ['Tous', 'Actif', 'Archivé'];

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

// module fitler Active
function moduleFilterActive(state){
  let appStatusActive = document.getElementsByClassName('Active');
  if(state === 'show'){
    for (let i = 0; i < appStatusActive.length; i ++) {
      appStatusActive[i].style.display = 'block';
    }
  } else {
    for (let i = 0; i < appStatusActive.length; i ++) {
      appStatusActive[i].style.display = 'none';
    }
  }
}

// module fitler Archived
function moduleFilterArchived(state){
  let appStatusArchived = document.getElementsByClassName('Archive');
  if(state === 'show'){
    for (let i = 0; i < appStatusArchived.length; i ++) {
      appStatusArchived[i].style.display = 'block';
    }
  } else {
    for (let i = 0; i < appStatusArchived.length; i ++) {
      appStatusArchived[i].style.display = 'none';
    }
  }
}


// CLASS APP
class App extends React.Component {

  state = {
    selectedTags: ["Actif"],
  };

  // Tags Status button filter
  handleChange(tag, checked) {
    const { selectedTags } = this.state;
    const nextSelectedTags = checked
      ? [tag]
      : selectedTags.filter(t => t !== tag);
    //console.log('You are interested in: ', nextSelectedTags);

    switch(nextSelectedTags.toString()) {
      case "Tous":
        moduleFilterActive("show");
        moduleFilterArchived("show");
        break;
      case "Actif":
        moduleFilterActive("show");
        moduleFilterArchived("none");
        break;
      case "Archivé":
        moduleFilterActive("none");
        moduleFilterArchived("show");
        break;
      default:
        moduleFilterActive("show");
        moduleFilterArchived("show");
    }

    this.setState({ selectedTags: nextSelectedTags });
  }

  // Status show
  renderStatus(status) {
    switch(status) {
        case 'Active':
            return <Tag color="#87d068">Actif</Tag>
        case 'Archive':
            return <Tag color="#f50">Archivé</Tag>
        default:
            return <Tag color="#2db7f5">Aucun Status</Tag>
    }
  }

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
              const moduleStyleActif = group.groupstatus === 'Active' ? true : false;
                return (
                  <Col lg={6} md={12} xs={24} className={"gutter-row " + group.groupstatus} key={group.id} style={ moduleStyleActif ? { display:'block'} : {display : 'none'} }  >
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
                      <div className="group_date">
                        {group.dateStart ? <Moment date={group.dateStart} format="DD MMMM YYYY" /> : ''} - {group.dateEnd ? <Moment date={group.dateEnd} format="DD MMMM YYYY" /> : ''}
                      </div>
                      <div className="group_status">
                        {this.renderStatus(group.groupstatus)}
                      </div>
                    </Card>
                  </Col>
                );
              });

              // RETURN THE CONTENT OF DASHBOARD
              const { selectedTags } = this.state;
              return (
                <div style={{ padding: '0 50px' }}>
                  <Content>
                    {/* Filters */}
                    <Row>
                      <Col lg={24} md={24} xs={24} className="gutter-row app_categorie_groups">
                        <h6 style={{ marginRight: 8, display: 'inline' }}>Module à afficher :</h6>
                        {tagsFromServer.map(tag => (
                          <CheckableTag
                            key={tag}
                            checked={selectedTags.indexOf(tag) > -1}
                            onChange={checked => this.handleChange(tag, checked)}
                          >
                            {tag}
                          </CheckableTag>
                        ))}
                      </Col>
                    </Row>
                    
                    {/* Cards */}
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