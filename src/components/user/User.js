import React, { Component } from 'react';
import api from "../../services/api";
import { Redirect, Link } from 'react-router-dom';

class User extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {
              attributes: {}
            },
            redirect: false
        }

    }

    loadUser = async () => {
        try {
          const response = await api.get(`users/${this.props.idUser}`);
          const user = response.data.data;

          this.setState({ user });
        } catch (err) {
          console.log(err);
        }
    }

    componentDidMount() {
      this.loadUser();
    }

    deleteUser = async (user) => {
      try {
        if (window.confirm(`Tem certeza que deseja excluir o usuário: "${user.attributes.name}"?`)) {
          await api.delete(`users/${user.id}`);
          this.setState({ redirect: true })
        }
      } catch (err) {
        console.log(err);
      }
    }

    render() {
        if (this.state.redirect) {
          return <Redirect to="/users" />;
        }

        const { user } = this.state;

        return (
            <div className="">

                <div className="row">
                    <div className="col-md-12">
                        {/* Card */}
                        <div className="card shadow mb-4">
                            {/* <!-- Card Header - Dropdown --> */}
                            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                <h6 className="m-0 font-weight-bold text-primary">Informações do Usuário</h6>
                                <div className="dropdown no-arrow">
                                    <div className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                                    </div>
                                    <div id="dropdown-photo-new" className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                                        aria-labelledby="dropdownMenuLink" x-placement="bottom-end">
                                        <div className="dropdown-header">Ações do item:</div>
                                        <Link className="dropdown-item" to={`/users/edit/${user.id}`}>
                                            Editar
                                        </Link>
                                        <div className="dropdown-divider"></div>
                                        <div
                                            className="dropdown-item"
                                            href="#"
                                            onClick={() => this.deleteUser(user)}
                                        >Excluir</div>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- Card Body --> */}
                            <div className="card-body">
                              <img
                                className="img-fluid mb-4"
                                src={user.attributes.image}
                                alt={user.attributes.name}
                              />

                              <p><strong>Nome: </strong>{user.attributes.name}</p>
                              <p><strong>Email: </strong>{user.attributes.email}</p>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default User;

