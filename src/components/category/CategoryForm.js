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
        type: '',
        attributes: {
          title: '',
          articles_related: "",
          articles: [],
        },
      },
    }
  }

  loadCategory = async () => {
    try {
      const response = await api.get(`/categories/${this.props.categoryId}`);
      const category = response.data.data
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
            attributes: {
              ...prevState.category.attributes,
              title: value
            }
          }
        }))
        break;
      default:
        break;
    }
  }

  editCategory = async (category) => {
    console.log(JSON.stringify(category))

    try {
      await api.patch(`/categories/${this.props.categoryId}`, { category });

      this.setState({
        redirect: true
      })
    } catch (err) {
      console.log(err);
    }
  }

  createCategory = async (category) => {
    try {
      await api.post(`/categories`, { category });

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
      this.editCategory(category.attributes);
      console.log("Edita informações publicas")
    } else {
      this.createCategory(category.attributes);
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
                  <label htmlFor="titulo">Título</label>
                  <input type="text"
                    className="form-control"
                    id="title"
                    placeholder="Digite aqui"
                    onChange={this.handleChange}
                    name="title"
                    value={category.attributes.title}
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
