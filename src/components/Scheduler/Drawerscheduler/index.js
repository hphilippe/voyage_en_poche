import React from "react";
// Ant Design
import { Drawer, Button, Alert, Modal } from 'antd';
// Moment date 
import moment from 'moment';
// Mutations
import { DELETE_SCHEDULER } from '../mutations';
// Modules
import DrawerschedulerCreate from './DrawerschedulerCreate';
import DrawerschedulerEdit from './DrawerschedulerEdit';

// const
const confirm = Modal.confirm;

// Alert map
const content = (items, client, refetch, idgroup, selectedValue) => items.map((item,i) => 
  <div key={i} style={{ marginBottom: '8px' }} >
    <Alert 
      style={{ display: 'block', marginBottom: '8px' }} 
      description={item.content} message={ item.title + ' - ' + moment(item.dateStart).format('HH:mm') } type={item.type} 
    /> 
    <DrawerschedulerEdit client={client} idschedule={item.id} refetch={refetch} record={item} datechoose={selectedValue} />
    <Button 
      shape="circle" 
      icon="delete" 
      onClick={() => {
        showConfirm(client, item.id, refetch);
      }}>
    </Button>
  </div>
);

// await graphql delete then refetch function from query in todolist
async function removeSchedulerAsync(client, idItem, refetch) {
  const { data, error } = await client.mutate({
    mutation: DELETE_SCHEDULER,
    variables: { id: idItem }
  })
  if (data) refetch()
  if (error) refetch()
}

// Modal delete Item
function showConfirm(client, id, refetch) {
  confirm({
    title: 'Suppression',
    content: 'Cliquer sur "Ok" pour être sûr de surpprimer l\'item',
    onOk() {
      removeSchedulerAsync(client, id, refetch);
    },
    onCancel() { },
  });
}
  
class Drawerscheduler extends React.Component {
  
  state = { 
    visible: false,
    //prevPropsSelectedValue: this.props.selectedValue
  };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };
  
  /*static getDerivedStateFromProps(props, state) {
    // Any time the current user changes,
    // Reset any parts of state that are tied to that user.
    // In this simple example, that's just the email.
    if (props.selectedValue !== state.prevPropsSelectedValue) {
      return {
        prevPropsSelectedValue: props.selectedValue,
        visible: true
      };
    }
    
    return null
  }*/

  render() {
    const { selectedValue, selectedData, client, refetch, idgroup } = this.props

    return (
      <div>
        {/*<Button type="primary" onClick={this.showDrawer}>
          Open
        </Button>*/}
        <Drawer
          title={selectedValue}
          width='40%'
          placement="right"
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
        >
          {/* Content */}
          {content(selectedData, client, refetch, idgroup, selectedValue)}
          
          {/* Space Inline before Footer */}
          <br /><br />
          
          {/* Footer */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              width: '100%',
              borderTop: '1px solid #e8e8e8',
              padding: '10px 16px',
              left: 0,
              background: '#fff',
              borderRadius: '0 0 4px 4px',
            }}
          >
            <DrawerschedulerCreate client={client} idgroup={idgroup} refetch={refetch} datechoose={selectedValue} />
            <Button
              onClick={this.onClose}
              style={{ float: 'right' }}
            >
              Fermer
            </Button>
          </div>
          
        </Drawer>
      </div>
    );
  }
}

export default Drawerscheduler;