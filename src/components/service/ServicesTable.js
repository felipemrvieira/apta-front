import React from 'react';
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'

const translations = { pageText: 'Página', ofText: 'de', rowsText: 'Linhas', previousText: 'Anterior', nextText: 'Próxima', loadingText: 'Carregando...' };

const columns = [
    {
        Header: 'Imagem',
        accessor: 'image_url',
        Cell: row => (
            <img height="40px" src={row.value} alt='service' />
        )
    },
    {
        Header: 'Título',
        accessor: 'title',
        minWidth: 200
    },
    {
        Header: 'Criação',
        accessor: 'published_at',
        Cell: row => (
            <Moment format="DD.MM.YYYY - HH:MM">
                {row.value}
            </Moment>
        )
    },
    {
        Header: 'Ações',
        accessor: 'id',
        Cell: row => (
            <div>
                <Link className="btn btn-light btn-icon-split" to={`/services/${row.value}`}>
                    <span className="icon text-gray-600">
                        <i className="fas fa-arrow-right"></i>
                    </span>
                    <span className="text">Visualizar</span>
                </Link>
            </div>
        )
    },
]

function ServicesTable(props) {
    if (props != null) {
        return (
            <ReactTable className="shadow -striped -highlight mb-4"
                data={props.services}
                columns={columns}
                noDataText="Ainda não existem serviços cadastrados!"
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

export default ServicesTable;
