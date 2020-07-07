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

class Cart extends Component {
    constructor(props) {
        super(props)
        this.state = {
          cart: {
            id: "",
            services: [],
          },
          redirect: false,
          show: false,
          setShow: false
        }
    }

    loadCart = async () => {
        try {
            const response = await api.get(`carts/${this.props.idCart}`);
            const cart = response.data;
            console.log(cart)
            this.setState({ cart: cart });
        } catch (err) {
            console.log(err);
        }
    }

    componentDidMount() {
      this.loadCart();
    }

    deleteCart = async (cart) => {
        try {
            if (window.confirm(`Tem certeza que deseja excluir a categoria: "${cart.id}"?`)) {
                await api.delete(`categories/${cart.id}`);
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
            return <Redirect to="/carts" />;
        }

        const cart = this.state.cart;

        console.log(cart)

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
                                        <div className="dropdown-header">Ações do Carrinho:</div>
                                        <Link className="dropdown-item" to={`/carts/edit/${cart.id}`}>
                                            Editar
                                        </Link>
                                        <div className="dropdown-divider"></div>
                                        <div
                                            className="dropdown-item"
                                            href="#"
                                            onClick={() => this.deleteCart(cart)}
                                        >Excluir</div>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- Card Body --> */}
                            <div className="card-body">

                              <p><strong>Cliente: </strong>{cart.customer_name}</p>
                              <p><strong>Data da Solicitação: </strong>{cart.created_at}</p>
                              <p><strong>Método de pagamento: </strong>{cart.payment_method}</p>
                              <p><strong>Orçamento: </strong>{cart.budget}</p>
                              <p><strong>Status: </strong>{cart.status}</p>

                              <hr />

                              <br />
                              <h5><strong>Serviços Relacionados:</strong></h5>
                              <br />
                              <ReactTable className="shadow -striped -highlight mb-4"
                                  data={this.state.cart.appointments}
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
export default Cart;

