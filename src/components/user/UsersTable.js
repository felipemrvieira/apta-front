import React from 'react';
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import { Link } from 'react-router-dom'

const translations = { pageText: 'Página', ofText: 'de', rowsText: 'Linhas', previousText: 'Anterior', nextText: 'Próxima', loadingText: 'Carregando...' };

const columns = [
  {
    Header: 'Nome',
    accessor: 'attributes.name',
    minWidth: 100
  },
  {
    Header: 'Email',
    accessor: 'attributes.email',
    minWidth: 100
  },
  {
    Header: 'Ações',
    accessor: 'id',
    Cell: row => (
      <div>
        <Link className="btn btn-light btn-icon-split" to={`/users/${row.value}`}>
          <span className="icon text-gray-600">
            <i className="fas fa-arrow-right"></i>
          </span>
          <span className="text">Visualizar</span>
        </Link>
      </div >
    )
  },
]

function UsersTable(props) {
  if (props != null) {
    return (
      <ReactTable className="shadow -striped -highlight mb-4"
        data={props.users}
        columns={columns}
        noDataText="Ainda não existem usuários cadastrados!"
        defaultPageSize={10}
        {...translations}
      />
    );
  } else {
    return (
      <div>
      </div>
    );
  }
}

export default UsersTable;
