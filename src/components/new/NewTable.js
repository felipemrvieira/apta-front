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
        Header: 'Foto de Capa',
        accessor: 'attributes.featured_image_url',
        Cell: row => (
            <img height="40px" src={row.value} alt='destaque' />
        )
    },
    {
        Header: 'Título',
        accessor: 'attributes.title',
        minWidth: 200
    },
    // {
    //     Header: 'Editoria',
    //     accessor: 'attributes.categories',
    //     Cell: ({value}) =>{
    //       const categoriesList = value.map(category=>category.title).join(", ")
    // 	    return <span>{categoriesList}</span>
    //     }
    // },

    {
        Header: 'Criação',
        accessor: 'attributes.published_at',
        Cell: row => (
            <Moment format="DD.MM.YYYY - HH:MM">
                {row.value}
            </Moment>
        )

    },
    {
        Header: 'Ações',
        accessor: 'attributes.slug',
        Cell: row => (
            <div>
                <Link className="btn btn-light btn-icon-split" to={`/news/${row.value}`}>
                    <span className="icon text-gray-600">
                        <i className="fas fa-arrow-right"></i>
                    </span>
                    <span className="text">Visualizar</span>
                </Link>
            </div>
        )
    },
]

function NewTable(props) {
    if (props != null) {
        return (
            <ReactTable className="shadow -striped -highlight mb-4"
                data={props.news}
                columns={columns}
                noDataText="Ainda não existem notícias cadastradas!"
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

export default NewTable;
