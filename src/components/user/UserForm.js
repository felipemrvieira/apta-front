import React, { Component } from 'react';
import api from "../../services/api";
import { Redirect } from 'react-router-dom';

class UserForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: {
              attributes: {}
            },
            redirect: false,
            submited: false
        }
    }

    loadUser = async () => {
        try {
          const response = await api.get(`/users/${this.props.userId}`);
          const user = response.data.data;
          this.setState({ ...this.state, user})

          console.log(user)
        } catch (err) {
            console.log(err);
        }
    }

    componentDidMount() {
      this.loadUser()
    }


    handleChange = event => {
        const value = event.target.value

        switch (event.target.id) {
            case 'name':
                this.setState(prevState => ({
                    user: {
                        ...prevState.user,
                        attributes:{
                          ...prevState.user.attributes,
                          name: value
                        }
                    }
                }))
                break;

            case 'email':
                this.setState(prevState => ({
                    user: {
                        ...prevState.user,
                        attributes:{
                          ...prevState.user.attributes,
                          email: value
                        }
                    }
                }))
                break;

            case 'password':
                this.setState(prevState => ({
                    user: {
                        ...prevState.user,
                        attributes:{
                          ...prevState.user.attributes,
                          password: value
                        }
                    }
                }))
                break;

                case 'password_confirmation':
                this.setState(prevState => ({
                    user: {
                        ...prevState.user,
                        attributes:{
                          ...prevState.user.attributes,
                          password_confirmation: value
                        }
                    }
                }))
                break;

            default:
                break;
        }

    }

    editUser = async (user) => {
      try {
        await api.patch(`/users/${this.props.userId}`, { user });
        this.setState({
          redirect: true
        })
      } catch (err) {
        console.log(err);
      }
    }

    createUser = async (user) => {
      try {
        await api.post(`/users`, { user });
        this.setState({
          redirect: true
        })
      } catch (err) {
        console.log(err);
      }
    }

    handleSubmit = event => {
        event.preventDefault();
        this.setState({ submited: true })

        const { user } = this.state;

        if (this.props.userId) {
          this.editUser(user.attributes);
        } else {
          this.createUser(user.attributes);
        }
    }

    render() {

        if (this.state.redirect) {
          return <Redirect to="/users" />;
        }

        return (
            <div className="row">
                <div className="col-md-12">

                    <div className="card shadow mb-4">
                        {/* <!-- Card Header - Dropdown --> */}
                        {/* <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                            <h6 className="m-0 font-weight-bold text-primary">Informações di Item de SIC</h6>
                            <div className="dropdown no-arrow">
                                <div className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                                </div>
                                <div id="dropdown-photo-new" className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                                    aria-labelledby="dropdownMenuLink" x-placement="bottom-end">
                                    <div className="dropdown-header">Dropdown Header:</div>
                                    <div className="dropdown-item" href="#">Action</div>
                                    <div className="dropdown-item" href="#">Another action</div>
                                    <div className="dropdown-divider"></div>
                                    <div className="dropdown-item" href="#">Something else here</div>
                                </div>
                            </div>
                        </div> */}

                        {/* <!-- Card Body --> */}
                        <div className="card-body">
                            <form onSubmit={this.handleSubmit}>

                                <div className="form-group">
                                    <label htmlFor="titulo">Nome</label>
                                    <input type="text"
                                        className="form-control"
                                        id="name"
                                        placeholder="Digite aqui"
                                        onChange={this.handleChange}
                                        name="name"
                                        value={this.state.user.attributes.name}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="titulo">Email</label>
                                    <input type="email"
                                        className="form-control"
                                        id="email"
                                        placeholder="Digite aqui"
                                        onChange={this.handleChange}
                                        name="email"
                                        value={this.state.user.attributes.email}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="titulo">Senha</label>
                                    <input type="password"
                                        className="form-control"
                                        id="password"
                                        placeholder="Digite aqui"
                                        onChange={this.handleChange}
                                        name="password"
                                        value={this.state.user.attributes.password || ""}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="titulo">Confirmação de Senha</label>
                                    <input type="password"
                                        className="form-control"
                                        id="password_confirmation"
                                        placeholder="Digite aqui"
                                        onChange={this.handleChange}
                                        name="password_confirmation"
                                        value={this.state.user.attributes.password_confirmation || ""}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-success btn-block"
                                    disabled={this.state.submited ? "disabled" : ""}
                                >
                                    {
                                        this.state.submited ?
                                            "Aguarde..." :
                                            this.props.userId ? "Atualizar Usuário" : "Cadastrar Usuário"
                                    }
                                </button>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default UserForm;
