import React from 'react';
import ReactTable from 'react-table'
import 'react-table/react-table.css'
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
        Header: 'Imagem',
        accessor: 'attributes.featured_image_url',
        Cell: row => (
            <img height="40px" src={row.value} alt='destaque' />
        )
    },
    {
        Header: 'Título',
        accessor: 'attributes.description',
        minWidth: 200
    },
    {
        Header: 'Tipo',
        accessor: 'attributes.banner_type.title',
        minWidth: 200

    },
    {
        Header: 'Ações',
        accessor: 'id',
        Cell: row => (
            <div>
                <Link className="btn btn-light btn-icon-split" to={`/banners/${row.value}`}>
                    <span className="icon text-gray-600">
                        <i className="fas fa-arrow-right"></i>
                    </span>
                    <span className="text">Visualizar</span>
                </Link>
            </div>
        )
    },
]

function BannersTable(props) {
    if (props != null) {

        return (
            <ReactTable className="shadow -striped -highlight mb-4"
                data={props.banners}
                columns={columns}
                noDataText="Ainda não existem banners cadastrados!"
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

export default BannersTable;