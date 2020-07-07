import React, { Component } from 'react';
import api from "../../services/api";
import { Redirect } from 'react-router-dom';
import avatar from '../../template/images/user-icon.png';
import { Link } from 'react-router-dom';


class Agency extends Component {
    constructor(props) {
        super(props)
        this.state = {
            agency: {
                attributes: {
                    title: '',
                    logo: '',
                    social_networks: [],
                    phones_attributes: [Object.assign({})],
                    addresses_attributes: [Object.assign({})]
                },
                relationships: {
                    users: {},
                    phones: {},
                    addresses: {},
                    social_networks: {
                        attributes: {
                            link: "",
                        },
                        relationships: {
                            sn_type: {},
                        }
                    }
                }
            },
            redirect: false
        }
    }

    loadAgency = async () => {
        try {
            const response = await api.get(`agency`);
            const agency = response.data.data;
            const users = response.data.included;

            this.setState({ agency, users });
            console.log(this.state)
        } catch (err) {
            console.log(err);
        }
    }

    componentDidMount() {
        this.loadAgency();
    }

    renderPhones = () => {
        const phones = this.state.agency.relationships.phones.data || []
        console.log(phones)

        return phones.map(phone => (
            <div key={phone.id} className="col-xl-4 col-md-4 mb-4">
                <div className="card border-left-primary shadow h-100 py-1">
                    {/* <!-- Card Header - Dropdown --> */}
                    <div className="card-header py-2 d-flex flex-row align-items-center justify-content-between">
                        <h6 className="m-0 font-weight-bold text-primary">Telefone {phone.id}</h6>
                        <div className="dropdown no-arrow">
                            <div className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                            </div>
                            <div id="dropdown-agency-new" className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                                aria-labelledby="dropdownMenuLink" x-placement="bottom-end">
                                <div className="dropdown-header">Opções:</div>
                                <Link className="dropdown-item" to={`/phones/edit/${phone.id}`}>
                                    Editar
                                </Link>
                                <div className="dropdown-divider"></div>
                                <div
                                    className="dropdown-item"
                                    href="#"
                                    onClick={() => this.deletePhone(phone)}
                                >Excluir</div>

                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="row no-gutters align-items-center">
                            <div className="col mr-1">
                                <p>{phone.number}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        ))
    }

    renderAddresses = () => {
        const addresses = this.state.agency.relationships.addresses.data || []
        console.log(addresses)

        return addresses.map(address => (
            <div key={address.id} className="col-xl-4 col-md-4 mb-4">
                <div className="card border-left-primary shadow  h-100 py-1">
                    {/* <!-- Card Header - Dropdown --> */}
                    <div className="card-header py-2 d-flex flex-row align-items-center justify-content-between">
                        <h6 className="m-0 font-weight-bold text-primary">Endereço {address.id}</h6>
                        <div className="dropdown no-arrow">
                            <div className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                            </div>
                            <div id="dropdown-agency-new" className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                                aria-labelledby="dropdownMenuLink" x-placement="bottom-end">
                                <div className="dropdown-header">Opções:</div>
                                <Link className="dropdown-item" to={`/addresses/edit/${address.id}`}>
                                    Editar
                                </Link>
                                <div className="dropdown-divider"></div>
                                <div
                                    className="dropdown-item"
                                    href="#"
                                    onClick={() => this.deleteAddress(address)}
                                >Excluir</div>

                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="row no-gutters align-items-center">
                            <div className="col mr-1">
                                <p><strong>Rua: </strong> {address.street}</p>
                                <p><strong>Número: </strong> {address.number}</p>
                                <p><strong>Bairro: </strong> {address.neighborhood}</p>
                                <p><strong>Cidade: </strong> {address.city}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        ))
    }

    renderUsers = () => {
        const users = this.state.agency.relationships.users.data || []
        console.log(users)
        
        return users.map(user => (
            <div key={user.id} className="col-xl-4 col-md-4 mb-4 ">
                <div className="card border-left-primary shadow  h-100 py-2">
                    {/* <!-- Card Header - Dropdown --> */}
                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <img className="" width="40px" src={avatar} alt="Avatar" />

                        <h6 className="m-0 font-weight-bold text-primary">{user.name}</h6>
                        <div className="dropdown no-arrow">
                            <div className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                            </div>
                            <div id="dropdown-agency-new" className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                                aria-labelledby="dropdownMenuLink" x-placement="bottom-end">
                                <div className="dropdown-header">Ações em usuário:</div>
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
                    <div className="card-body">
                        <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                                <p><strong>Email: </strong> {user.email}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ))
    }

    renderSocials = () => {
        const social_networks = this.state.agency.social_networks || []
        console.log(social_networks)

        return social_networks.map(social_network => (
            <div key={social_network.id} className="col-xl-4 col-md-4 mb-4">
                <div className="card border-left-primary shadow  h-100 py-1">
                    {/* <!-- Card Header - Dropdown --> */}
                    <div className="card-header py-2 d-flex flex-row align-items-center justify-content-between">
                        <h6 className="m-0 font-weight-bold text-primary">{social_network.attribute.sn_type.title}</h6>
                        <div className="dropdown no-arrow">
                            <div className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                            </div>
                            <div id="dropdown-agency-new" className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                                aria-labelledby="dropdownMenuLink" x-placement="bottom-end">
                                <div className="dropdown-header">Ações em rede social:</div>
                                <Link className="dropdown-item" to={`/social/edit/${social_network.attribute.id}`}>
                                    Editar
                                </Link>
                                <div className="dropdown-divider"></div>
                                <div
                                    className="dropdown-item"
                                    href="#"
                                    onClick={() => this.deleteSocial(social_network)}
                                >Excluir</div>

                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="row no-gutters align-items-center">
                            <div className="col mr-1">
                                <p>{social_network.link}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        ))
    }

    deleteUser = async (user) => {
        try {
            if (window.confirm(`Tem certeza que deseja excluir o usuário: "${user.attributes.name}"?`)) {
                await api.delete(`users/${user.id}`);
                // this.setState({ ...this.state, users: response.data })
                this.setState({
                    redirect: true
                })
            }
        } catch (err) {
            console.log(err);
        }
    }

    deletePhone = async (phone) => {
        try {
            if (window.confirm(`Tem certeza que deseja excluir o número: "${phone.number}"?`)) {
                await api.delete(`phones/${phone.id}`);
                this.setState({
                    redirect: true
                })
            }
        } catch (err) {
            console.log(err);
        }
    }

    deleteAddress = async (address) => {
        try {
            if (window.confirm(`Tem certeza que deseja excluir o endereço: "${address.street}"?`)) {
                await api.delete(`addresses/${address.id}`);

                // this.setState({ ...this.state, users: response.data })
                this.setState({
                    redirect: true
                })
            }
        } catch (err) {
            console.log(err);
        }
    }


    deleteSocial = async (social_network) => {
        try {
            if (window.confirm(`Tem certeza que deseja excluir a rede social: "${social_network.link}"?`)) {
                await api.delete(`social_networks/${social_network.id}`);

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
            return <Redirect to="/agency" />;
        }

        const agency = this.state.agency;
        console.log(agency)
        const {  users } = this.state;

        return (
            <div className="">

                <div className="row">
                    <div className="col-md-12">
                        {/* Card */}
                        <div className="card shadow mb-4">
                            {/* <!-- Card Header - Dropdown --> */}
                            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                <h6 className="m-0 font-weight-bold text-primary">Informações da Secretaria</h6>
                                <div className="dropdown no-arrow">
                                    <div className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                                    </div>
                                    <div id="dropdown-agency-new" className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                                        aria-labelledby="dropdownMenuLink" x-placement="bottom-end">
                                        <div className="dropdown-header">Ações em secretaria:</div>
                                        <Link className="dropdown-item" to={`/agency/edit/${agency.id}`}>
                                            Editar
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- Card Body --> */}
                            <div className="card-body">
                                <p><strong>Secretaria: </strong> {agency.attributes.title}</p>
                                <p><strong>Logo:</strong></p>
                                <img
                                    className="img-fluid mb-4"
                                    src={agency.attributes.logo}
                                    alt={agency.attributes.title} />
                                <p><strong>Telefone(s): </strong></p>
                                <div className="row">
                                    {this.renderPhones()}
                                </div>
                                <p><strong>Endereço(s): </strong></p>
                                <div className="row">
                                    {this.renderAddresses()}
                                </div>
                                <p><strong>Redes Sociais:</strong></p>
                                <div className="row">
                                    {this.renderSocials()}
                                </div>

                            </div>
                        </div>
                        {/* Card */}
                    </div>
                </div>

                <h2 className="h4 mb-4 text-gray-700">Usuários</h2>
                <div className="row">
                    {this.renderUsers(users)}
                </div>

            </div>

        );
    }
}

export default Agency;

