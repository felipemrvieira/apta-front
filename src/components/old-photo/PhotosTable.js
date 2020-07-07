import React from 'react';
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'

const translations = {pageText:'Página', ofText: 'de', rowsText: 'Linhas', previousText: 'Anterior', nextText: 'Próxima', loadingText: 'Carregando...'};

const columns = [
    {
        Header: 'Image',
        accessor: 'featured_image.thumb.url',
        Cell: row => (
            <img src={row.value} alt='destaque' />
        )
    },
    {
        Header: 'Title',
        accessor: 'title',
        minWidth: 200
    },
    {
        Header: 'Published',
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
                <Link className="btn btn-light btn-icon-split" to={`/photos/${row.value}`}>
                    <span className="icon text-gray-600">
                        <i className="fas fa-arrow-right"></i>
                    </span>
                    <span className="text">Visualizar</span>
                </Link>
            </div >
        )
    },
]

function PhotosTable(props) {
    return (
        <ReactTable className="shadow -striped -highlight mb-4"
            data={props.photos}
            columns={columns}
            noDataText="Ainda não existem fotos cadastradas!"
            defaultPageSize={10}
            {...translations}
        />
    );
}

export default PhotosTable;
