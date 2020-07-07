import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import api from "../../services/api";
import ReactTable from 'react-table'
import 'react-table/react-table.css'

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
            </div >
        )
    },
]

class Category extends Component {
    constructor(props) {
        super(props)
        this.state = {
            category: {
              id: "",
              title: "",
              services: [],
            },
            redirect: false,
            show: false,
            setShow: false
        }
        this.deleteCategory = this.deleteCategory.bind(this);
    }

    loadCategory = async () => {
        try {
            const response = await api.get(`categories/${this.props.idCategory}`);
            const category = response.data;
            console.log(category)
            this.setState({ category: category });
        } catch (err) {
            console.log(err);
        }
    }

    componentDidMount() {
        this.loadCategory();
    }

    deleteCategory = async (category) => {
        try {
            if (window.confirm(`Tem certeza que deseja excluir a categoria: "${category.title}"?`)) {
                await api.delete(`categories/${category.id}`);
                this.setState({
                    redirect: true
                })
            }
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to="/categories" />;
        }

        const category = this.state.category;

        console.log(category)

        return (
            <div className="">

                <div className="row">
                    <div className="col-md-12">
                        {/* Card */}
                        <div className="card shadow mb-4">
                            {/* <!-- Card Header - Dropdown --> */}
                            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                <h6 className="m-0 font-weight-bold text-primary">Informações da Categoria</h6>
                                <div className="dropdown no-arrow">
                                    <div className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                                    </div>
                                    <div id="dropdown-article-new" className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                                        aria-labelledby="dropdownMenuLink" x-placement="bottom-end">
                                        <div className="dropdown-header">Ações da editoria:</div>
                                        <Link className="dropdown-item" to={`/categories/edit/${category.id}`}>
                                            Editar
                                        </Link>
                                        <div className="dropdown-divider"></div>
                                        <div
                                            className="dropdown-item"
                                            href="#"
                                            onClick={() => this.deleteCategory(category)}
                                        >Excluir</div>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- Card Body --> */}
                            <div className="card-body">
                              <p><strong>Ícone:</strong></p>
                              <img
                                className="img-fluid mb-4"
                                src={category.image_url}
                                alt={category.title} />

                                <p><strong>Título: </strong>{category.title}</p>
                                <p><strong>Cor: </strong>{category.color}</p>

                                <hr />

                                <br />
                                <h5><strong>Serviços Relacionados:</strong></h5>
                                <br />
                                <ReactTable className="shadow -striped -highlight mb-4"
                                    data={this.state.category.services}
                                    columns={columns}
                                    noDataText="Ainda não existem serviços relacionados cadastrados!"
                                    defaultPageSize={10}
                                    {...translations}
                                />
                            </div>
                        </div>
                        {/* Card */}
                    </div>
                </div>
            </div>
        );
    }
}
export default Category;

