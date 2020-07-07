import React, { Component } from 'react';
import api from "../../services/api";
import { Redirect } from 'react-router-dom';

class AgencyForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            agency: {
                id: '',
                type: '',
                attributes: {
                    title: '',
                    logo: '',
                },
                relationships: {}
            },
            file: null,
            redirect: false,
            submited: false,
        }
        this.handleChange = this.handleChange.bind(this);
    }

    loadAgency = async () => {
        try {
            const response = await api.get(`/agencies/${this.props.agencyId}`);
            const agency = response.data.data
            console.log(agency)

            this.setState({ ...this.state, agency: agency })
        } catch (err) {
            console.log(err);
        }
    }

    componentDidMount() {
        this.loadAgency()
        console.log(this.state.agency)

    }

    onChangeFile = event => {
        this.setState({
            ...this.state,
            file: event.target.files[0]
        });
        console.log(this.state.file)
    }

    fileUpload = (file, id) => {
        const formData = new FormData();
        formData.append('agency[logo]', file)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }

        try {
            api.patch(
                `/agencies/${id}`, formData, config
            )
        } catch (err) {
            console.log(err);
        }
        return
    }

    handleChange = event => {
        // const value = event.target.value
        const { value } = event.target;

        switch (event.target.id) {
            case 'title':
                this.setState(prevState => ({
                    agency: {
                        attributes: {
                            ...prevState.agency.attributes,
                            title: value
                        }
                    }
                }), () => console.log(this.state.agency.attributes.title))
                break;
            default:
                break;
        }
    }

    // editAgency = async (agency) => {
    //     try {
    //         console.log(agency)
    //         delete agency.id
    //         delete agency.users
    //         delete agency.addresses
    //         delete agency.phones
    //         delete agency.logo
    //         console.log(agency)

    //         await api.patch(`/agencies/${this.props.agencyId}`, { agency });

    //         if (this.state.file !== null) {
    //             await this.fileUpload(this.state.file, this.props.agencyId)
    //         }

    //         this.setState({
    //             redirect: true
    //         })
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }

    editAgency = async (agency) => {
        console.log(JSON.stringify(agency))

        try {
            await api.patch(`/agencies/${this.props.agencyId}`, { agency });

            if (this.state.file !== null) {
                await this.fileUpload(this.state.file, this.props.agencyId)
                console.log(this.state.agency)
            }

            this.setState({
                redirect: true
            })
        } catch (err) {
            console.log(err);
        }
    }

    createAgency = async (agency) => {
        try {
            const response = await api.post(`/agencies`, { agency });
            console.log(response)
            this.setState({
                redirect: true
            })
        } catch (err) {
            console.log(err);
        }
    }

    fileUpload = (file, id) => {
        const formData = new FormData();
        formData.append('agency[logo]', file)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return api.patch(
            `/agencies/${id}`, formData, config
        )
    }

    handleSubmit = async event => {
        event.preventDefault();
        this.setState({ submited: true })

        const agency = this.state.agency;

        if (this.props.agencyId) {
            this.editAgency(agency.attributes);
            console.log("Edita secretaria")
        } else {
            this.createAgency(agency.attributes);
            console.log("Cria secretaria")
        }
    }

    render() {

        if (this.state.redirect) {
            return <Redirect to="/agency" />;
        }

        const { agency } = this.state;

        return (
            <div className="row">
                <div className="col-md-12">

                    <div className="card shadow mb-4">
                        {/* <!-- Card Header - Dropdown --> */}
                        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                            <h6 className="m-0 font-weight-bold text-primary">Informações da Secretaria</h6>
                        </div>

                        {/* <!-- Card Body --> */}
                        <div className="card-body">
                            <form onSubmit={this.handleSubmit}>

                                <div className="form-group">
                                    <label htmlFor="title">Secretaria</label>
                                    <input type="text"
                                        className="form-control"
                                        id="title"
                                        placeholder="Digite aqui"
                                        onChange={this.handleChange}
                                        name="title"
                                        value={agency.attributes.title}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="logo">Logo</label> <br />
                                    <input
                                        type="file"
                                        id="logo"
                                        name="logo"
                                        onChange={this.onChangeFile}
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
                                            this.props.agencyId ? "Atualizar Secretaria" : "Cadastrar Secretaria"
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

export default AgencyForm;
