import React from "react";
/*import { Query } from 'react-apollo';

import Loading from '../../Loading';
import ErrorMessage from '../../Error';*/

import SearchlistItem from '../SearchlistItem';

// import { GET_SEARCHLIST } from '../mutations';

const SearchlistList = ({
  client,
  idgroup,
  refetch,
  data
}) => (
    <SearchlistItem
      data={data}
      refetch={refetch}
      client={client}
      idgroup={idgroup}
    />
  );

export default SearchlistList;