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
        Header: 'Título',
        accessor: 'title',
    },
    {
        Header: 'Criação',
        accessor: 'created_at',
        Cell: row => (
            <Moment format="DD.MM.YYYY - HH:MM">
                {row.value}
            </Moment>
        )
    },
    {
        Header: 'Serviços Relacionados',
        accessor: 'how_many_services',
    },
    {
        Header: 'Ações',
        accessor: 'id',
        Cell: row => (
            <div>
                <Link className="btn btn-light btn-icon-split" to={`/categories/${row.value}`}>
                    <span className="icon text-gray-600">
                        <i className="fas fa-arrow-right"></i>
                    </span>
                    <span className="text">Visualizar</span>
                </Link>
            </div >
        )
    },
]


function CategoriesTable(props) {
    if (props != null) {
        return (
            <ReactTable className="shadow -striped -highlight mb-4"
                data={props.categories}
                columns={columns}
                noDataText="Ainda não existem editorias cadastradas!"
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

export default CategoriesTable;
