import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import api from "../../services/api";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

class SicsPublicForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      article: {
        id: '',
        type: '',
        attributes: {
          title: '',
          subtitle:'',
          moustache: '',
          body: '',
          link: '',
          published_at: new Date(),
          carousel_detached: false,
          home_page_detached: false,
          credit_photo: '',
          credit_journalist: '',
          slug: '',
        },
        relationships: {},
        category_ids: [],
        gallery_ids: [],
        categories: [],
        galleries: [],
      },
      file: null,
      audio: null,
      categories: [],
      galleries: [],
      types: [],
      redirect: false,
      theme: 'snow',
      selectedTypes: [{value: 7, label: "Informações Públicas"}],
      selectedCategories: [],
      selectedGalleries: [],
      submited: false,
      date: new Date()
    }
    this.handleChangeBody = this.handleChangeBody.bind(this);
  }

  loadTypes = async () => {
    try {
      const response = await api.get("/types");
      const types = response.data.data;
      this.setState({ ...this.state, types: types })
    } catch (err) {
      console.log(err);
    }
  }

  loadArticle = async () => {
    try {
      const response = await api.get(`/articles/${this.props.sicpublicId}`);
      const article = response.data.data
      console.log(article)

      this.setState({ ...this.state, article: article })
      this.setState({ ...this.state, selectedTypes: this.renderSelectedTypes() })
    } catch (err) {
      console.log(err);
    }
  }

  componentDidMount() {
    if (this.props.sicpublicId) {
      this.loadArticle()
    }
    this.loadTypes();
  }

  renderTypes = () => {
    const { types } = this.state || []
    const result = types.map(type => ({ value: type.id, label: type.attributes.title }))
    return result
  }

  renderSelectedTypes = () => {
    const { types } = this.state.article || []
    const result = types.map(type => ({ value: type.id, label: type.title }))
    return result
  }


  // Handler do componente editor
  handleChangeBody(html) {
    this.setState({
      ...this.state,
      editorHtml: html,
      article: {
        attributes: {
          ...this.state.article.attributes,
          body: html
        }
      }
    });
  }

  async setIdsFromRelationship() {

    const { selectedTypes } = this.state;

    const types_ids_list = selectedTypes ?
      (selectedTypes.map(type => (type.value))) :
      this.state.article.types = []

    await this.setState({
      article: {
        ...this.state.article,
        attributes: {
          ...this.state.article.attributes,
          type_ids: types_ids_list
        }
      }
    })
    return this.state.article
  }


  editArticle = async (article) => {
    console.log(JSON.stringify(article))

    try {
      await api.patch(`/articles/${this.props.sicpublicId}`, { article });
      
      this.setState({
        redirect: true
      })
    } catch (err) {
      console.log(err);
    }
  }

  createArticle = async (article) => {
    try {
      await api.post(`/articles`, { article });

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

    const article = await this.setIdsFromRelationship();

    if (this.props.sicpublicId) {
      this.editArticle(article.attributes);
      console.log("Edita informações publicas")
    } else {
      this.createArticle(article.attributes);
      console.log("Cria informações publicas")
    }
  }


  render() {
    if (this.state.redirect) { return <Redirect to="/informacoes-publicas" />; }
   
    const { article } = this.state;

    return (
      <div className="row">
        <div className="col-md-12">

          <div className="card shadow mb-4">
            {/* <!-- Card Header - Dropdown --> */}
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold text-primary">Informações da Página de Informações Públicas </h6>
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
                  <label htmlFor="corpo">Corpo</label>
                  
                  <ReactQuill
                    theme={this.state.theme}
                    onChange={this.handleChangeBody}
                    value={article.attributes.body || ''}
                    modules={SicsPublicForm.modules}
                    formats={SicsPublicForm.formats}
                    // bounds={'.app'}
                    placeholder='Digite aqui'
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
                      this.props.sicpublicId ? "Atualizar Página de Informações Públicas" : "Cadastrar Página de Informações Públicas"
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

SicsPublicForm.modules = {
  toolbar: [
    [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' },
    { 'indent': '-1' }, { 'indent': '+1' }],
    ['link', 'image', 'video'],
    ['clean']
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  }
}
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
SicsPublicForm.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video'
]

export default SicsPublicForm;
