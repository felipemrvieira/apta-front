import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import api from "../../services/api";
import 'react-quill/dist/quill.snow.css';

class CategoryForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      category: {
        id: '',
        title: '',
        color: '',
        icon_url: '',
        services: [],
      },
      file: null,
    }
  }

  loadCategory = async () => {
    try {
      const response = await api.get(`/categories/${this.props.categoryId}`);
      const category = response.data
      console.log(category)

      this.setState({ ...this.state, category: category })
    } catch (err) {
      console.log(err);
    }
  }

  componentDidMount() {
    if (this.props.categoryId) {
      this.loadCategory()
    }
  }

  handleChange = event => {
    const value = event.target.value

    switch (event.target.id) {
      case 'title':
        this.setState(prevState => ({
          category: {
            ...prevState.category,
            title: value
          }
        }))
        break;
        case 'color':
        this.setState(prevState => ({
          category: {
            ...prevState.category,
            color: value
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

  fileUpload = (file, id) => {
    const formData = new FormData();
    formData.append('category[icon]', file)
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    return api.patch(
      `/categories/${id}`, formData, config
    )
  }

  editCategory = async (category) => {
    console.log(JSON.stringify(category))

    try {
      await api.patch(`/categories/${this.props.categoryId}`, { category });

      if (this.state.file !== null) {
        await this.fileUpload(this.state.file, this.props.categoryId)
        console.log(this.state.category)
      }

      this.setState({
        redirect: true
      })
    } catch (err) {
      console.log(err);
    }
  }

  createCategory = async (category) => {
    try {
      const response = await api.post(`/categories`, { category });

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

    const category = await this.state.category;

    if (this.props.categoryId) {
      this.editCategory(category);
      console.log("Edita informações publicas")
    } else {
      this.createCategory(category);
      console.log("Cria informações publicas")
    }
  }

  render() {
    if (this.state.redirect) { return <Redirect to="/categories" />; }

    const { category } = this.state;

    return (
      <div className="row">
        <div className="col-md-12">

          <div className="card shadow mb-4">

            {/* <!-- Card Body --> */}
            <div className="card-body">
              <form onSubmit={this.handleSubmit}>

              <div className="form-group">
                  <label htmlFor="image">Ícone</label> <br />
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
                    id="title"
                    placeholder="Digite aqui"
                    onChange={this.handleChange}
                    name="title"
                    value={category.title}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="titulo">Cor</label>
                  <input type="text"
                    className="form-control"
                    id="color"
                    placeholder="Digite aqui"
                    onChange={this.handleChange}
                    name="color"
                    value={category.color}
                    required
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
                      this.props.categoryId ? "Atualizar Editoria" : "Cadastrar Editoria"
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
export default CategoryForm;
