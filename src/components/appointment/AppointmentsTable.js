import React from 'react';
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'

const translations = {
    pageText: 'Página',
    ofText: 'de',
    rowsText: 'Linhas',
    previousText: 'Anterior',
    nextText: 'Próxima',
    loadingText: 'Carregando...'
};

const columns = [

    {
      Header: 'Serviço',
      accessor: 'service.title',
    },
    {
        Header: 'Horário',
        accessor: 'when',
        Cell: row => (
            <Moment format="DD.MM.YYYY - HH:MM">
                {row.value}
            </Moment>
        )
    },
    {
        Header: 'Status',
        accessor: 'status',
    },
    {
        Header: 'Ações',
        accessor: 'id',
        Cell: row => (
            <div>
                <Link className="btn btn-light btn-icon-split" to={`/appointments/${row.value}`}>
                    <span className="icon text-gray-600">
                        <i className="fas fa-arrow-right"></i>
                    </span>
                    <span className="text">Visualizar</span>
                </Link>
            </div >
        )
    },
]


function AppointmentsTable(props) {
    if (props != null) {
        return (
            <ReactTable className="shadow -striped -highlight mb-4"
                data={props.appointments}
                columns={columns}
                noDataText="Ainda não existem solicitações cadastradas!"
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

export default AppointmentsTable;
