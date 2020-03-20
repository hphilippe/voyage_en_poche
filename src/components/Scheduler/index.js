import React from "react";
import { Query, ApolloConsumer } from 'react-apollo';
// Ant design
import { Card, Calendar, Badge, Icon } from "antd";
// Moment date 
import moment from 'moment';
// Module
import Loading from '../Loading';
import ErrorMessage from '../Error';
import Drawerscheduler from './Drawerscheduler';
// Mutations
import { GET_SCHEDULER } from './mutations';
// CSS
import './style.css';

// celle renderer
/*function getListData(value) {
  let listData;
  //console.log(value.format('YYYY-MM-DD'))
  switch (value.format('YYYY-MM-DD')) {
    case '2019-01-25':
      listData = [
        { type: 'warning', content: 'rdv lyon', date: '20h' },
      ]; break;
    case '2019-01-26':
      listData = [
        { type: 'error', content: 'sandwich à prendre', date: '6h25' },
        { type: 'warning', content: 'Récupération matériel', date: '8h45' },
        { type: 'warning', content: 'Récupération clé appart', date: '9h' },
        { type: 'success', content: 'Debut snow', date: '9h30' },
        { type: 'error', content: 'sandwich mangey', date: '12h 30' },
        { type: 'success', content: 'snow aprem', date: '13h' },
        { type: 'success', content: 'raclette', date: '20h' },
      ]; break;
    case '2019-01-27':
      listData = [
        { type: 'success', content: 'pâtes', date: '20h' },
      ]; break;
    case '2019-01-28':
      listData = [
        { type: 'success', content: 'fondue', date: '20h' },
      ]; break;
    case '2019-01-29':
      listData = [
        { type: 'warning', content: 'fin snow', date: '17h' },
      ]; break;
    default:
  }
  return listData || [];
}*/

function dateCellRender(data, value) {
  // const listData = getListData(value);
  let listData = [];
  // traitement
  let cellValue = value.format('YYYY-MM-DD');
  data.schedules.forEach(function(element) {
    let dateTarget = moment(element.dateStart).format('YYYY-MM-DD');
    if(cellValue === dateTarget){
      listData.push(element);
    }
  });

  // return
  return (
    <ul className="events">
      {
        listData.map(item => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))
      }
    </ul>
  );
}

/*function getMonthData(value) {
  if (value.month() === 8) {
    return 1394;
  }
}

function monthCellRender(value) {
  const num = getMonthData(value);
  return num ? (
    <div className="notes-month">
      <section>{num}</section>
      <span>Backlog number</span>
    </div>
  ) : null;
}*/

class Scheduler extends React.Component {

  constructor(props) {
    super(props);
    this.resync = this.resync.bind(this);
    this.drawerState = React.createRef();
  }
  
  state = {
    value: moment(),
    selectedValue: moment(),
    selectedData: [],
  }
  
  onSelect = (data, value) => {
    // traitement
    let listData = [];
    let cellValue = value.format('YYYY-MM-DD');
    data.schedules.forEach(function(element) {
      let dateTarget = moment(element.dateStart).format('YYYY-MM-DD');
      if(cellValue === dateTarget){
        listData.push(element);
      }
    });

    // SetState
    this.setState({
      value,
      selectedValue: value,
      selectedData: listData
    });
    this.drawerState.current.showDrawer();
  }
  
  onPanelChange = (value) => {
    this.setState({ value });
  }
  
  resync() {
    console.log('ahazh');
  }
  
  render() {
    const { idgroup } = this.props
    const { value, selectedValue, selectedData } = this.state;

    return (

      /* Scheduler list default card */
      <ApolloConsumer>
        {client => (
          <Query
            query={GET_SCHEDULER}
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
                   
                  {/* Scheduler content */}
                  <div className="Scheduler-container">
                    
                    {/*<Alert message={`You selected date: ${selectedValue && selectedValue.format('YYYY-MM-DD')}`} />*/}
                    <Calendar 
                      value={value}
                      onSelect={(value) => this.onSelect(data, value)}
                      onPanelChange={this.onPanelChange} 
                      dateCellRender={(value) => dateCellRender(data, value)} 
                      mode='month'
                      // monthCellRender={monthCellRender}
                    />
                    
                    <Drawerscheduler 
                      ref={this.drawerState} 
                      selectedValue={selectedValue.format('YYYY-MM-DD')} 
                      selectedData={selectedData} 
                      client={client}
                      refetch={refetch}
                      idgroup={idgroup}
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

export default Scheduler;