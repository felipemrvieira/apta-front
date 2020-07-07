import React, { Component } from 'react';
import DateTimePicker from 'react-datetime-picker';
import { Redirect } from 'react-router-dom';
import api from "../../services/api";
import Select from 'react-select';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import moment from 'moment';

class VideoForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      article: {
        id: '',
        type: '',
        attributes: {
          title: '',
          subtitle: '',
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
      selectedCategories: [],
      selectedGalleries: [],
      selectedTypes: [{ value: 3, label: "Vídeo" }],
      submited: false,
      date: new Date()
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeBody = this.handleChangeBody.bind(this);

  }

  loadCategories = async () => {
    try {
      const response = await api.get("/categories");
      const categories = response.data.data;
      this.setState({ ...this.state, categories: categories })
    } catch (err) {
      console.log(err);
    }
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
      const response = await api.get(`/articles/${this.props.videoId}`);
      const article = response.data.data
      const included = response.data.included

      const categories = included.filter((item) => item.type === 'categories');

      console.log(article)
      this.setState({ ...this.state, article: article })
      this.setState({ ...this.state, selectedCategories: this.renderSelectedCategories(categories) })
      this.setState({ ...this.state, selectedTypes: this.renderSelectedTypes() })

    } catch (err) {
      console.log(err);
    }
  }

  componentDidMount() {
    if (this.props.videoId) {
      this.loadArticle()
    }
    this.loadTypes();
    this.loadCategories();
  }

  handleChangeSelectMultiCategories = selectedCategories => {
    this.setState(
      { selectedCategories },
      () => console.log(`Option selected:`, this.state.selectedCategories)
    );
  };

  // lista as categorias cadastradas para o select do form
  renderCategories = () => {
    const categories = this.state.categories || []
    const result = categories.map(category => ({ value: category.id, label: category.attributes.title }))
    return result
  }

  renderTypes = () => {
    const { types } = this.state || []
    const result = types.map(type => ({ value: type.id, label: type.attributes.title }))
    return result
  }

  // lista as categorias cadastradas para o select do form
  renderSelectedCategories = (categories) => {
    const result = categories.map(category => ({ value: category.id, label: category.attributes.title }))
    return result
  }

  renderSelectedTypes = () => {
    const { types } = this.state.article || []
    const result = types.map(type => ({ value: type.id, label: type.title }))
    return result
  }

  // Handler do componente de data
  onChanonChangeDate = date => this.setState({
    article: {
      ...this.state.article,
      attributes: {
        ...this.state.article.attributes,
        published_at: date
      }
    }
  })

  onChange = date => this.setState({
    date
  })

  // Captura inputs do form exceto body
  handleChange = event => {
    const value = event.target.value

    switch (event.target.id) {
      case 'title':
        this.setState(prevState => ({
          article: {
            attributes: {
              ...prevState.article.attributes,
              title: value
            }
          }
        }))
        break;
      case 'link':
        this.setState(prevState => ({
          article: {
            attributes: {
              ...prevState.article.attributes,
              link: value
            }
          }
        }))
        break;
      case 'home_page_detached':
        this.setState(prevState => ({
          article: {
            attributes: {
              ...prevState.article.attributes,
              home_page_detached: !prevState.article.attributes.home_page_detached
            }
          }
        }))
        break;
      default:
        break;
    }
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

  // get categories ids and set to categories before submit
  async setIdsFromRelationship() {

    const { selectedCategories, selectedTypes } = this.state;

    const ids_list = selectedCategories ?
      (selectedCategories.map(category => (category.value))) :
      this.state.article.categories = []

    const types_ids_list = selectedTypes ?
      (selectedTypes.map(type => (type.value))) :
      this.state.article.types = []

    await this.setState({
      article: {
        ...this.state.article,
        attributes: {
          ...this.state.article.attributes,
          category_ids: ids_list,
          type_ids: types_ids_list
        }
      }
    })
    return this.state.article
  }

  editArticle = async (article) => {
    console.log(JSON.stringify(article))

    console.log(this.props.videoId)

    try {
      await api.patch(`/articles/${this.props.videoId}`, { article });

      if (this.state.audio !== null) {
        await this.audioUpload(this.state.audio, this.props.VideoId)
      }

      this.setState({
        redirect: true
      })
    } catch (err) {
      console.log(err);
    }
  }

  createArticle = async (article) => {
    try {
      const response = await api.post(`/articles`, { article });

      if (this.state.audio !== null) {
        await this.audioUpload(this.state.audio, response.data.data.id)
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

    const article = await this.setIdsFromRelationship();

    if (this.props.videoId) {
      this.editArticle(article.attributes);
      console.log("Edita video")
    } else {
      this.createArticle(article.attributes);
      console.log("Cria video")
    }
  }

  render() {
    if (this.state.redirect) { return <Redirect to="/videos" />; }

    const {
      selectedCategories = [],
      article
    } = this.state;

    return (
      <div className="row">
        <div className="col-md-12">

          <div className="card shadow mb-4">
            {/* <!-- Card Header - Dropdown --> */}
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold text-primary">Informações do Vídeo</h6>
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
                  <label htmlFor="titulo">Título</label>
                  <input type="text"
                    className="form-control"
                    maxLength="85"
                    id="title"
                    placeholder="Digite aqui"
                    onChange={this.handleChange}
                    name="title"
                    value={article.attributes.title}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="link-video">Link</label>
                  <input type="text"
                    className="form-control"
                    id="link"
                    placeholder="Digite aqui"
                    onChange={this.handleChange}
                    value={article.attributes.link}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="corpo">Corpo <strong>(Opcional)</strong></label>

                  <ReactQuill
                    theme={this.state.theme}
                    onChange={this.handleChangeBody}
                    value={article.attributes.body || ''}
                    modules={VideoForm.modules}
                    formats={VideoForm.formats}
                    // bounds={'.app'}
                    placeholder='Digite aqui'
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="editoria">Editoria</label>

                  <Select
                    value={selectedCategories}
                    isMulti
                    onChange={this.handleChangeSelectMultiCategories}
                    options={this.renderCategories()}
                  />
                </div>

                <div className="form-group ">
                  <label htmlFor="publicacao" >Data de Publicação</label>
                  <br />
                  <DateTimePicker
                    onChange={this.onChangeDate}
                    // value={this.state.date}
                    value={moment(article.attributes.published_at).toDate()}
                  />

                  <br />

                </div>

                <div className="form-group ">
                  <label className="mr-2" htmlFor="home_page_detached" >Destaque página inicial:</label>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input"
                      type="checkbox"
                      name="inlineRadioOptions"
                      id="home_page_detached"
                      onChange={this.handleChange}
                      checked={(article.attributes.home_page_detached)}
                    />
                    <label className="form-check-label" htmlFor="home_page_detached">Destacar</label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-success btn-block"
                  disabled={this.state.submited ? "disabled" : ""}
                >
                  {
                    this.state.submited ?
                      "Aguarde..." :
                      this.props.videoId ? "Atualizar Vídeo" : "Cadastrar Vídeo"
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

VideoForm.modules = {
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
VideoForm.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video'
]

export default VideoForm;
