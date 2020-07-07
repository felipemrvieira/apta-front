import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import api from "../../services/api";
import 'react-quill/dist/quill.snow.css';

class PhoneForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
        phone: {
            number: ''
        },
        redirect: false,
        submited: false
    }
    this.handleChange = this.handleChange.bind(this);
  }

  loadPhone = async () => {
    try {
      const response = await api.get(`/phones/${this.props.phoneId}`);
      this.setState({ ...this.state, phone: response.data })
    } catch (err) {
      console.log(err);
    }
  }

  componentDidMount() {
    if (this.props.phoneId) {
        this.loadPhone()
    }
  }

  // Captura inputs do form exceto body
  handleChange = event => {
    const value = event.target.value

    switch (event.target.id) {
      case 'number':
        this.setState(prevState => ({
          phone: {
            ...prevState.phone,
            number: value
          }
        }))
        break;
      default:
        break;
    }
  }

  editPhone = async (phone) => {
    try {
      await api.patch(`/phones/${this.props.phoneId}`, { phone });
      
      this.setState({
        redirect: true
      })
    } catch (err) {
      console.log(err);
    }
  }

  createPhone = async (phone) => {
    try {
      const response = await api.post(`/phones`, { phone });
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

    const phone = await this.state.phone;

    if (this.props.phoneId) {
      this.editPhone(phone);
    } else {
      this.createPhone(phone);
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
                                <label htmlFor="titulo">Número</label>
                                <input type="text"
                                    className="form-control"
                                    id="number"
                                    placeholder="Digite aqui"
                                    onChange={this.handleChange}
                                    name="number"
                                    value={this.state.phone.number}
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
                                    this.props.phoneId ? "Atualizar Telefone" : "Cadastrar Telefone"
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

export default PhoneForm;
