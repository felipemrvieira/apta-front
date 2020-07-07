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
    // {
    //     Header: 'Imagem de Capa',
    //     accessor: 'attributes.images.',
    //     Cell: row => (
    //         <img height="40px" src={row.value} alt='destaque' />
    //     )
    // },
    {
        Header: 'Título',
        accessor: 'attributes.title',
        minWidth: 200
    },
    {
        Header: 'Notícias Relacionadas',
        accessor: 'attributes.articles_related',
    },
    {
        Header: 'Ações',
        accessor: 'id',
        Cell: row => (
            <div>
                <Link className="btn btn-light btn-icon-split" to={`/galleries/${row.value}`}>
                    <span className="icon text-gray-600">
                        <i className="fas fa-arrow-right"></i>
                    </span>
                    <span className="text">Visualizar</span>
                </Link>
            </div >
        )
    },
]

function GalleriesTable(props) {
    if (props != null) {
        return (
            <ReactTable className="shadow -striped -highlight mb-4"
                data={props.galleries}
                columns={columns}
                noDataText="Ainda não existem bancos de imagens cadastrados!"
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

export default GalleriesTable;