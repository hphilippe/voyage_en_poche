import React from "react";
import { Query, ApolloConsumer } from 'react-apollo';
// components
import Todo from "../../../components/Todo";
import Post from "../../../components/Post";
import Searchlist from "../../../components/Searchlist";
import Postit from "../../../components/Postit";
import Scheduler from "../../../components/Scheduler";
import Banner from './banner.js';
// Ant design
import { Layout, Row, Col, Card, Icon, Avatar, Modal, BackTop } from 'antd';
// components loading error
import Loading from '../../../components/Loading';
import ErrorMessage from '../../../components/Error';
// Style CSS
import './style.css';
// import graphql query
import { GET_GROUP, DELETE_MODULE } from './mutations';
// import module
import EditModule from './editModule';
import CreateModule from './createModule';

// Constante
const { Content } = Layout;

// show or hide module
function updateCss(id) {
  var divToShow = document.getElementById('main_card_show_' + id);
  if (divToShow.style.display === "none") {
    // hide
    var divsToHide = document.getElementsByClassName("main_card_display");
    for (var i = 0; i < divsToHide.length; i++) {
      divsToHide[i].style.display = "none";
    }
    // show
    divToShow.style.display = "block";
    // smooth scroll
    var top = divToShow.offsetTop;
    window.scrollTo(0, top);
  } else {
    // hide if already show
    divToShow.style.display = "none";
  }
}

// await graphql delete then refetch
async function removeModuleAsync(client, idItem, refetch) {
  const { data, error } = await client.mutate({
    mutation: DELETE_MODULE,
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
    content: 'Cliquer sur "Ok" pour être sûr de surpprimer le module et toutes ces données lui faissant référence',
    onOk() {
      removeModuleAsync(client, id, refetch);
    },
    onCancel() { },
  });
}

const { Meta } = Card;
const Dashboard = ({ match }) => (
  <ApolloConsumer>
    {client => (
      <Query
        query={GET_GROUP}
        variables={{ id: match.params.id }}
        notifyOnNetworkStatusChange={true}
      >
        {({ data, loading, error, refetch }) => {

          if (loading) {
            return <Loading isCenter={true} />;
          }

          if (error) {
            return <ErrorMessage error={error} />;
          }
          
          let cardColor = '#005aff4d';

          // MAP ALL CARD ITEM
          const ColList = (datacol) => datacol.map(({ ...col }) => {
            return (
              <Col lg={6} md={12} xs={24} className="gutter-row" key={col.id}>
                <div className="gutter-box">
                  <div>
                    <Card
                      style={{ marginTop: '10px', borderRadius: '8px 8px 0px 0px', borderColor: cardColor }}
                      bordered={false}
                      hoverable={true}
                      actions={[
                        <Icon type="eye"
                          onClick={() => {
                            updateCss(col.position);
                          }}
                        />,
                        <EditModule client={client} position={col.position} title={col.title} idCard={col.id} refetch={refetch} />,
                        <Icon type="delete"
                          onClick={() => {
                            showDeleteConfirm(client, col.id, refetch);
                          }}
                        />
                      ]}
                    >
                      <Meta
                        avatar={<Avatar src={col.avatar} />}
                        title={col.title}
                        description={
                          <a href="#!"
                            onClick={() => {
                              updateCss(col.position);
                            }}
                          >
                            {col.component}
                          </a>
                        }
                      />
                    </Card>
                  </div>
                </div>
              </Col>
            );
          });

          // MAP ITEM DEPLOY
          const ColListDeploy = (datacol) => datacol.map(({ ...col }) => {
            var componentToRender = col.component;
            var componentLookup = {
              Todo: (<Todo idgroup={col.id} titlemodule={col.title} />),
              Post: (<Post idgroup={col.id} titlemodule={col.title} />),
              Searchlist: (<Searchlist idgroup={col.id} titlemodule={col.title} />),
              Postit: (<Postit idgroup={col.id} titlemodule={col.title} />),
              Scheduler: (<Scheduler idgroup={col.id} titlemodule={col.title} />),
            };
            return (
              <div key={col.position}>
                <div style={{ display: 'none' }} className="main_card_display" id={"main_card_show_" + col.position}>
                  {componentLookup[componentToRender]}
                </div>
              </div>
            );
          });


          // MAP ROW
          const RowList = data.groupses.map(({ ...organisation }) => {
            return (
              <div key={organisation.id}>
                <Row >
                  {ColList(organisation.cardsGroupses)}
                  <CreateModule client={client} refetch={refetch} idgroup={match.params.id} />
                </Row>
                {ColListDeploy(organisation.cardsGroupses)}
                <BackTop>
                  <div className="ant-back-top-inner">UP</div>
                </BackTop>
              </div>
            );
          });

          const bgGround = data.groupses[0].banner.handle
          const dateStart = data.groupses[0].dateStart
          const dateEnd = data.groupses[0].dateEnd
          // RETURN THE CONTENT OF DASHBOARD
          return (
            <div>
              <Banner
                dateStart={dateStart}
                dateEnd={dateEnd}
                bgGround={bgGround}
                matchParams={match}
              />

              <div style={{ padding: '0 20px' }}>
                <Content>
                  {RowList}
                </Content>
              </div>

            </div>
          );

        }}
      </Query>
    )}
  </ApolloConsumer>

)

export default Dashboard;