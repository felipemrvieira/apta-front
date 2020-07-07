import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import api from "../../services/api";
import Select from 'react-select';
import 'react-quill/dist/quill.snow.css';
import './Service.scss';

class ServiceForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      service: {
        title: '',
        description: '',
        price: '',
        // category_ids: [],
        // image: '',

      },
      file: null,
      categories: [],
      redirect: false,
      selectedCategories: [],
      submited: false,
    }
  }

  loadCategories = async () => {
    try {
      const response = await api.get("/categories");
      this.setState({ ...this.state, categories: response.data })
    } catch (err) {
      console.log(err);
    }
  }

  loadService = async () => {
    try {
      const response = await api.get(`/services/${this.props.serviceId}`);
      this.setState({ ...this.state, service: response.data })
      this.setState({ ...this.state, selectedCategories: this.renderSelectedCategories() })
      this.setState({ ...this.state, selectedGalleries: this.renderSelectedGalleries() })
      this.setState({ ...this.state, selectedTypes: this.renderSelectedTypes() })

    } catch (err) {
      console.log(err);
    }
  }

  componentDidMount() {
    if (this.props.serviceId) {
      this.loadService()
    }
    this.loadCategories();
  }

  handleChangeSelectMulti = selectedCategories => {
    this.setState(
      { selectedCategories },
      () => console.log(`Option selected:`, this.state.selectedCategories)
    );
  };


  // lista as categorias cadastradas para o select do form
  renderCategories = () => {
    const categories = this.state.categories || []
    const result = categories.map(category => ({ value: category.id, label: category.title }))
    return result
  }

  // lista as categorias cadastradas para o select do form
  renderSelectedCategories = () => {
    const categories = this.state.service.categories || []
    const result = categories.map(category => ({ value: category.id, label: category.title }))
    return result
  }

  // Captura inputs do form exceto body
  handleChange = event => {
    const value = event.target.value

    switch (event.target.id) {
      case 'title':
        this.setState(prevState => ({
          service: {
            ...prevState.service,
            title: value
          }
        }))
        break;
      case 'description':
        this.setState(prevState => ({
          service: {
            ...prevState.service,
            description: value
          }
        }))
        break;
        case 'price':
        this.setState(prevState => ({
          service: {
            ...prevState.service,
            price: value
          }
        }))
        break;



      default:
        break;
    }
  }


  onChangeFile = event => {
    this.setState({
      ...this.state,
      file: event.target.files[0]
    });
    console.log(this.state.file)
  }


  // get categories ids and set to categories before submit
  async setIdsFromRelationship() {

    const { selectedCategories } = this.state;

    const ids_list = selectedCategories ?
      (selectedCategories.map(category => (category.value))) :
      this.state.service.categories = []

    // await this.setState({
    //   service: {
    //     ...this.state.service,
    //     category_ids: ids_list,
    //   }
    // })
    return this.state.service
  }

  fileUpload = (file, id) => {
    const formData = new FormData();
    formData.append('service[featured_image]', file)
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    return api.patch(
      `/services/${id}`, formData, config
    )
  }

  editService = async (service) => {
    console.log(JSON.stringify(service))

    try {
      await api.patch(`/services/${this.props.serviceId}`, { service });

      if (this.state.file !== null) {
        await this.fileUpload(this.state.file, this.props.serviceId)
        console.log(this.state.service)
      }

      this.setState({
        redirect: true
      })
    } catch (err) {
      console.log(err);
    }
  }

  createService = async (service) => {
    try {
      const response = await api.post(`/services`, { service });

      if (this.state.file !== null) {
        await this.fileUpload(this.state.file, response.data.id)
      }

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

    const service = await this.setIdsFromRelationship();

    if (this.props.serviceId) {
      this.editService(service);
    } else {
      this.createService(service);
    }
  }


  render() {
    if (this.state.redirect) { return <Redirect to="/services" />; }

    return (
      <div className="row">
        <div className="col-md-12">

          <div className="card shadow mb-4">
            {/* <!-- Card Header - Dropdown --> */}
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold text-primary">Informações do Serviço</h6>
              <div className="dropdown no-arrow">
                <div className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  {/* <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i> */}
                </div>
              </div>
            </div>

            {/* <!-- Card Body --> */}
            <div className="card-body">
              <form onSubmit={this.handleSubmit}>

                <div className="form-group">
                  <label htmlFor="image">Imagem</label> <br />
                  <input
                    type="file"
                    id="image"
                    name="image"
                    onChange={this.onChangeFile}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="titulo">Título</label>
                  <input type="text"
                    className="form-control"
                    maxLength="85"
                    id="title"
                    placeholder="Digite aqui"
                    onChange={this.handleChange}
                    name="title"
                    value={this.state.service.title}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="bigode">Descrição</label>
                  <input type="text"
                    className="form-control"
                    id="description"
                    placeholder="Digite aqui"
                    onChange={this.handleChange}
                    value={this.state.service.description} />
                </div>

                <div className="form-group">
                  <label htmlFor="bigode">Preço</label>
                  <input type="number"
                    className="form-control"
                    id="price"
                    placeholder="Digite aqui"
                    onChange={this.handleChange}
                    value={this.state.service.price} />
                </div>

                {/* <div className="form-group">
                  <label htmlFor="editoria">Editoria</label>

                  <Select
                    value={selectedCategories}
                    isMulti
                    onChange={this.handleChangeSelectMulti}
                    options={this.renderCategories()}
                  />

                </div> */}

                <button
                  type="submit"
                  className="btn btn-success btn-block"
                  disabled={this.state.submited ? "disabled" : ""}
                >
                  {
                    this.state.submited ?
                      "Aguarde..." :
                      this.props.serviceId ? "Atualizar Serviço" : "Cadastrar Serviço"
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

export default ServiceForm;
