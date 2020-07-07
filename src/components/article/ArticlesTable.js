import React from 'react';
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'

const translations = { pageText: 'Página', ofText: 'de', rowsText: 'Linhas', previousText: 'Anterior', nextText: 'Próxima', loadingText: 'Carregando...' };

const columns = [
    {
        Header: 'Imagem',
        accessor: 'featured_image_url',
        Cell: row => (
            <img height="40px" src={row.value} alt='destaque' />
        )
    },
    {
        Header: 'Título',
        accessor: 'title',
        minWidth: 200
    },
    {
        Header: 'Tipo',
        accessor: 'types',
        Cell: ({ value }) => {
            const typesList = value.map(type => type.title).join(", ")

            return <span>{typesList}</span>
        }
    },
    {
        Header: 'Editoria',
        accessor: 'categories',
        Cell: ({ value }) => {
            const categoriesList = value.map(category => category.title).join(", ")

            return <span>{categoriesList}</span>
        }
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
                <Link className="btn btn-light btn-icon-split" to={`/articles/${row.value}`}>
                    <span className="icon text-gray-600">
                        <i className="fas fa-arrow-right"></i>
                    </span>
                    <span className="text">Visualizar</span>
                </Link>
            </div>
        )
    },
]

function ArticlesTable(props) {
    if (props != null) {
        return (
            <ReactTable className="shadow -striped -highlight mb-4"
                data={props.articles}
                columns={columns}
                noDataText="Ainda não existem artigos cadastrados!"
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

export default ArticlesTable;