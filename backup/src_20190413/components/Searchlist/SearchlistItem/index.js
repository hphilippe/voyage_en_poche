import React from "react";

import MicrolinkCard from 'react-microlink'

import { Table, Divider, Popover, Button, Modal, Icon } from 'antd';

import { DELETE_SEARCHLIST } from '../mutations';
import SearchlistEdit from '../SearchlistEdit';

const { Column } = Table;

const content = ( url ) => {
  return (
    <div>
      <MicrolinkCard
        url={url}
        size='large'
      />
    </div>
  )
};

// await graphql delete then refetch function from query in todolist
async function removeSearchlistAsync(client, idItem, refetch) {
  const { data, error } = await client.mutate({
    mutation: DELETE_SEARCHLIST,
    variables: { id: idItem }
  })
  if (data) refetch()
  if (error) refetch()
}

// Modal delete Item
const confirm = Modal.confirm;
function showConfirm(client, id, refetch) {
  confirm({
    title: 'Suppression',
    content: 'Cliquer sur "Ok" pour être sûr de surpprimer l\'item',
    onOk() {
      removeSearchlistAsync(client, id, refetch);
    },
    onCancel() {},
  });
}

const SearchlistItem = ({
  client,
  data,
  refetch,
  idgroup
}) => {
  return (
    <Table dataSource={data.searchses} rowKey='id' pagination={{ pageSize: 10 }}>
      <Column
        title="Titre"
        dataIndex="title"
        width= '50%'
        key="title"
        render={(text, record) => (
          <span>
            <a href={record.slug} rel='noopener noreferrer' target="_blank">{text}</a>
          </span>
        )}
      />
      <Column
        title="Preview"
        dataIndex="slug"
        width= '10%'
        key="slug"
        render={(text, record) => (
          <Popover placement="topRight" title={record.title} content={content(record.slug)} trigger="click">
            <Button>Preview</Button>
          </Popover>
        )}
      />
      <Column
        title="Prix"
        dataIndex="price"
        width= '20%'
        key="price"
      />
      <Column
        title="Action"
        key="action"
        width= '20%'
        render={(text, record) => (
          <span>
            <SearchlistEdit record={record} client={client} refetch={refetch} iditem={record.id} />
            <Divider type="vertical" />
            <a href="#!"
              onClick={() => {
                showConfirm(client, record.id, refetch);
              }}
            >
              <Icon
                type="delete"
                theme="outlined"
              />
            </a>
          </span>
        )}
      />
    </Table>
  )

};

export default SearchlistItem;