import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import api from "../../services/api";
import 'react-quill/dist/quill.snow.css';

class AddressForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
        address: {
            street: '',
            number: '',
            neighborhood: '',
            city: ''
        },
        redirect: false,
        submited: false
    }
    this.handleChange = this.handleChange.bind(this);
  }

  loadAddress = async () => {
    try {
      const response = await api.get(`/addresses/${this.props.addressId}`);
      this.setState({ ...this.state, address: response.data })
    } catch (err) {
      console.log(err);
    }
  }

  componentDidMount() {
    if (this.props.addressId) {
        this.loadAddress()
    }
  }

  // Captura inputs do form exceto body
  handleChange = event => {
    const value = event.target.value

    switch (event.target.id) {
      case 'street':
        this.setState(prevState => ({
          address: {
            ...prevState.address,
            street: value
          }
        }))
        break;
      case 'number':
        this.setState(prevState => ({
          address: {
            ...prevState.address,
            number: value
          }
        }))
        break;
      case 'neighborhood':
        this.setState(prevState => ({
          address: {
            ...prevState.address,
            neighborhood: value
          }
        }))
        break;
      case 'city':
          this.setState(prevState => ({
            address: {
              ...prevState.address,
              city: value
            }
          }))
          break;
          
      default:
        break;
    }
  }

  editAddress = async (address) => {
    try {
      await api.patch(`/addresses/${this.props.addressId}`, { address });
      
      this.setState({
        redirect: true
      })
    } catch (err) {
      console.log(err);
    }
  }

  createAddress = async (address) => {
    try {
      const response = await api.post(`/addresses`, { address });
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

    const address = await this.state.address;

    if (this.props.addressId) {
      this.editAddress(address);
    } else {
      this.createAddress(address);
    }
  }


  render() {
    if (this.state.redirect) { return <Redirect to="/agency" />; }

    return (
        <div className="row">
            <div className="col-md-12">

                <div className="card shadow mb-4">
                    {/* <!-- Card Body --> */}
                    <div className="card-body">
                        <form onSubmit={this.handleSubmit}>
                          <div className="form-group">
                                <label htmlFor="rua">Rua</label>
                                <input type="text"
                                    className="form-control"
                                    id="street"
                                    placeholder="Digite aqui"
                                    onChange={this.handleChange}
                                    name="street"
                                    value={this.state.address.street}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="number">Número</label>
                                <input type="text"
                                    className="form-control"
                                    id="number"
                                    placeholder="Digite aqui"
                                    onChange={this.handleChange}
                                    name="number"
                                    value={this.state.address.number}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="bairro">Bairro</label>
                                <input type="text"
                                    className="form-control"
                                    id="neighborhood"
                                    placeholder="Digite aqui"
                                    onChange={this.handleChange}
                                    name="neighborhood"
                                    value={this.state.address.neighborhood}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="cidade">Cidade</label>
                                <input type="text"
                                    className="form-control"
                                    id="city"
                                    placeholder="Digite aqui"
                                    onChange={this.handleChange}
                                    name="city"
                                    value={this.state.address.city}
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-success btn-block"
                                disabled={ this.state.submited ? "disabled" : "" }
                                >
                                { 
                                    this.state.submited ? 
                                    "Aguarde..." :  
                                    this.props.addressId ? "Atualizar Endereço" : "Cadastrar Endereço"
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

export default AddressForm;
