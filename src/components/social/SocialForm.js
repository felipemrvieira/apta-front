import React, { Component } from 'react';
import api from "../../services/api";
import { Redirect } from 'react-router-dom';
import Select from 'react-select';

class SocialForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            social_network: {
                link: '',
            },
            sn_types: [],
            selectedType: '',
            redirect: false,
            submited: false
        }
        this.handleChange = this.handleChange.bind(this);
    }
    
    loadSnTypes = async () => {
        try {
          const response = await api.get("/sn_types");
          this.setState({ ...this.state, sn_types: response.data })
        } catch (err) {
          console.log(err);
        }
    }

    loadSocial = async () => {
        try {
          const response = await api.get(`/social_networks/${this.props.socialId}`);
          this.setState({ ...this.state, social_network: response.data })
          this.setState({ ...this.state, selectedType: this.renderSelectedType() })

        } catch (err) {
          console.log(err);
        }
    }


    componentDidMount() {
        if (this.props.socialId) {
            this.loadSocial()
        }
        this.loadSnTypes()
    }

    renderTypes = () => {
        const { sn_types } = this.state || []
        const result = sn_types.map(type => ({ value: type.id, label: type.title }))
        return result
    }
    
    renderSelectedType = () => {
        const { sn_type } = this.state.social_network || []
        const result = {value: sn_type.id, label: sn_type.title }
        console.log(result)

        return result
    }

    handleChangeType = selectedType => {
        console.log(selectedType)
        this.setState({
            social_network: {
                ...this.state.social_network,
                sn_type_id: selectedType.value,
            }
            }, () => console.log(`Option selected:`, this.state.social_network)
        );
      };

    handleChange = event => {
        const value = event.target.value

        switch (event.target.id) {
            case 'link':
                this.setState(prevState => ({
                    social_network: {
                        ...prevState.social_network,
                        link: value
                    }
                }))
                break;
            default:
                break;
        }

    }

    editSocial = async (social_network) => {
        try {
          await api.patch(`/social_networks/${this.props.socialId}`, { social_network });
  
          this.setState({
            redirect: true
          })
        } catch (err) {
          console.log(err);
        }
    }

    createSocial = async (social_network) => {
        try {
            const response = await api.post(`/social_networks`, { social_network });
            console.log(response)
      
            this.setState({
              redirect: true
            })
      
          } catch (err) {
            console.log(err);
          }
    }

    handleSubmit = async event => {
        event.preventDefault();
        this.setState({ submited: true })
    
        const social_network = this.state.social_network;
        console.log(this.state.social_network)
        if (this.props.socialId) {
          this.editSocial(social_network);
        } else {
          this.createSocial(social_network);
        }
      }

    comnponentDidUpdate(){
        this.setState({ ...this.state, social_network: this.props.social_network })
        console.log(this.props.social_network)
    }

    render() {

        if (this.state.redirect) {
            return <Redirect to="/agency" />;
        }
        let  { selectedType }  = this.state;
        let { sn_type } = this.state.social_network

        console.log(selectedType)

        return (
            <div className="row">
                <div className="col-md-12">

                    <div className="card shadow mb-4">
                        {/* <!-- Card Body --> */}
                        <div className="card-body">
                            <form onSubmit={this.handleSubmit}>
                                
                                {
                                    !this.props.socialId ?
                                    <div className="form-group">
                                        <label htmlFor="type">Rede Social</label>
                                        <Select
                                            value={sn_type}
                                            onChange={this.handleChangeType}
                                            options={this.renderTypes()}
                                        />
                                    </div>
                                    :
                                    ""
                                }
                                <div className="form-group">
                                    <label htmlFor="social_network">Link</label>
                                    <input type="text"
                                        className="form-control"
                                        id="link"
                                        placeholder="Digite aqui"
                                        onChange={this.handleChange}
                                        value={this.state.social_network.link} />
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-success btn-block"
                                    disabled={ this.state.submited ? "disabled" : "" }
                                    >
                                    { 
                                        this.state.submited ? 
                                        "Aguarde..." :  
                                        this.props.socialId ? "Atualizar Rede Social" : "Cadastrar Rede Social"
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

export default SocialForm;
