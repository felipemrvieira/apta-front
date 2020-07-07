import React, { Component } from 'react';
import DateTimePicker from 'react-datetime-picker';
import { Redirect } from 'react-router-dom';
import api from "../../services/api";
import Select from 'react-select';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import moment from 'moment';

class ArticleForm extends Component {
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
      selectedCategories: [],
      selectedGalleries: [],
      selectedTypes: [{ value: 1, label: "Notícia" }],
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

  loadGalleries = async () => {
    try {
      const response = await api.get("/galleries");
      const galleries = response.data.data;
      this.setState({ ...this.state, galleries: galleries })
      console.log(galleries)
    } catch (err) {
      console.log(err);
    }
  }

  loadTypes = async () => {
    try {
      const response = await api.get("/types");
      const types = response.data.data;
      this.setState({ ...this.state, types: types })
      console.log(this.state.types)
    } catch (err) {
      console.log(err);
    }
  }

  loadArticle = async () => {
    try {
      const response = await api.get(`/articles/${this.props.newsId}`);
      const article = response.data.data
      const included = response.data.included
      console.log(included)

      const galleries = included.filter((item) => item.type === 'galleries');
      const categories = included.filter((item) => item.type === 'categories');

      console.log(categories)
      console.log(galleries)

      this.setState({ ...this.state, article: article })
      this.setState({ ...this.state, selectedCategories: this.renderSelectedCategories(categories) })
      this.setState({ ...this.state, selectedGalleries: this.renderSelectedGalleries(galleries) })

      this.setState({ ...this.state, selectedTypes: this.renderSelectedTypes() })

    } catch (err) {
      console.log(err);
    }
  }

  componentDidMount() {
    if (this.props.newsId) {
      this.loadArticle()
    }
    this.loadCategories();
    this.loadGalleries();
    this.loadTypes();

  }

  handleChangeSelectMultiCategories = selectedCategories => {
    this.setState(
      { selectedCategories },
      () => console.log(`Option selected:`, this.state.selectedCategories)
    );
  };

  handleChangeSelectMultiGalleries = selectedGalleries => {
    this.setState(
      { selectedGalleries },
      () => console.log(`Option selected:`, this.state.selectedGalleries)
    );
  };

  handleChangeType = selectedTypes => {
    this.setState(
      { selectedTypes },
      () => console.log(`Option selected:`, this.state.selectedTypes)
    );
  };

  // lista as categorias cadastradas para o select do form
  renderCategories = () => {
    const categories = this.state.categories || []
    const result = categories.map(category => ({ value: category.id, label: category.attributes.title }))
    return result
  }

  renderGalleries = () => {
    const galleries = this.state.galleries || []
    const result = galleries.map(gallery => ({ value: gallery.id, label: gallery.attributes.title }))
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

  renderSelectedGalleries = (galleries) => {
    const result = galleries.map(gallery => ({ value: gallery.id, label: gallery.attributes.title }))
    return result
  }

  renderSelectedTypes = () => {
    const { types } = this.state.article || []
    const result = types.map(type => ({ value: type.id, label: type.title }))
    return result
  }

  // Handler do componente de data
  onChangeDate = date => this.setState({
    article: {
      ...this.state.article,
      attributes:{
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
      case 'subtitle':
        this.setState(prevState => ({
          article: {
            attributes: {
              ...prevState.article.attributes,
              subtitle: value
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
      case 'credit_photo':
        this.setState(prevState => ({
          article: {
            attributes: {
              ...prevState.article.attributes,
              credit_photo: value
            }
          }
        }))
        break;
      case 'credit_journalist':
        this.setState(prevState => ({
          article: {
            attributes: {
              ...prevState.article.attributes,
              credit_journalist: value
            }
          }
        }))
        break;
      case 'moustache':
        this.setState(prevState => ({
          article: {
            attributes: {
              ...prevState.article.attributes,
              moustache: value
            }
          }
        }))
        break;
      case 'carousel_detached':
        this.setState(prevState => ({
          article: {
            attributes: {
              ...prevState.article.attributes,
              carousel_detached: !prevState.article.attributes.carousel_detached
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

  onChangeFile = event => {
    this.setState({
      ...this.state,
      file: event.target.files[0]
    });
    console.log(this.state.file)
  }

  onChangeAudio = event => {
    this.setState({
      ...this.state,
      audio: event.target.files[0]
    });
    console.log(this.state.audio)
  }

  // get categories ids and set to categories before submit
  async setIdsFromRelationship() {

    const { selectedCategories, selectedGalleries, selectedTypes } = this.state;

    const ids_list = selectedCategories ?
      (selectedCategories.map(category => (category.value))) :
      this.state.article.categories = []

    const gallery_ids_list = selectedGalleries ?
      (selectedGalleries.map(gallery => (gallery.value))) :
      this.state.article.galleries = []

    const types_ids_list = selectedTypes ?
      (selectedTypes.map(type => (type.value))) :
      this.state.article.types = []

    await this.setState({
      article: {
        ...this.state.article,
        attributes:{
          ...this.state.article.attributes,
          category_ids: ids_list,
          gallery_ids: gallery_ids_list,
          type_ids: types_ids_list
        }
      }
    })
    return this.state.article
  }

  fileUpload = (file, id) => {
    const formData = new FormData();
    formData.append('article[featured_image]', file)
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }

    try {
      api.patch(
        `/articles/${id}`, formData, config
      )
    } catch (err) {
      console.log(err);
    }
    return
  }

  audioUpload = (audio, id) => {
    const formData = new FormData();
    formData.append('article[podcast_audio]', audio)
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    return api.patch(
      `/articles/${id}`, formData, config
    )
  }

  editArticle = async (article) => {
    console.log(JSON.stringify(article))

    try {
      await api.patch(`/articles/${this.props.newsId}`, { article });

      if (this.state.file !== null) {
        await this.fileUpload(this.state.file, this.props.newsId)
        console.log(this.state.article)
      }
      if (this.state.audio !== null) {
        await this.audioUpload(this.state.audio, this.props.newsId)
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

      if (this.state.file !== null) {
        await this.fileUpload(this.state.file, response.data.data.id)
      }
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

    if (this.props.newsId) {
      this.editArticle(article.attributes);
      console.log("Edita noticia")
    } else {
      this.createArticle(article.attributes);
      console.log("Cria noticia")
    }
  }


  render() {
    if (this.state.redirect) { return <Redirect to="/news" />; }

    const {
      selectedCategories = [],
      selectedGalleries = [],
      selectedTypes = [],
      article
    } = this.state;

    return (
      <div className="row">
        <div className="col-md-12">

          <div className="card shadow mb-4">
            {/* <!-- Card Header - Dropdown --> */}
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold text-primary">Informações da Notícia</h6>
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
                  <label htmlFor="bigode">Bigode</label>
                  <input type="text"
                    className="form-control"
                    id="moustache"
                    placeholder="Digite aqui"
                    onChange={this.handleChange}

                    value={article.attributes.moustache}

                    required
                  />
                </div>

                {
                  !this.props.newsId ?
                    <div className="form-group">
                      <label htmlFor="featured_image">Foto de Capa</label> <br />
                      <input
                        type="file"
                        id="featured_image"
                        name="featured_image"
                        onChange={this.onChangeFile}
                        required
                      />
                    </div>
                    :
                    <div className="form-group">
                      <label htmlFor="featured_image">Foto de Capa</label> <br />
                      <input
                        type="file"
                        id="featured_image"
                        name="featured_image"
                        onChange={this.onChangeFile}
                      />
                    </div>
                }

                <div className="form-group">
                  <label htmlFor="credit_photo">Crédito da Foto</label>
                  <input type="text"
                    className="form-control"
                    id="credit_photo"
                    placeholder="Digite aqui"
                    onChange={this.handleChange}
                    name="credit"
                    value={article.attributes.credit_photo}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="titulo">Legenda da Foto <strong>(Opcional)</strong></label>
                  <input type="text"
                    className="form-control"
                    maxLength="65"
                    id="subtitle"
                    placeholder="Digite aqui"
                    onChange={this.handleChange}
                    name="subtitle"
                    value={article.attributes.subtitle}
                  />
                </div>


                <div className="form-group">
                  <label htmlFor="corpo">Corpo</label>

                  <ReactQuill
                    theme={this.state.theme}
                    onChange={this.handleChangeBody}
                    value={article.attributes.body || ''}
                    modules={ArticleForm.modules}
                    formats={ArticleForm.formats}
                    // bounds={'.app'}
                    placeholder='Digite aqui'
                  />

                </div>

                <div className="form-group">
                  <label htmlFor="credit_photo">Crédito da Reportagem</label>
                  <input type="text"
                    className="form-control"
                    id="credit_journalist"
                    placeholder="Digite aqui"
                    onChange={this.handleChange}
                    name="title"
                    value={article.attributes.credit_journalist}
                    required
                  />
                </div>

                {/* <div className="form-group">
                  <label htmlFor="editoria">Tipo</label>

                  <Select
                    value={selectedTypes}
                    isMulti
                    onChange={this.handleChangeType}
                    options={this.renderTypes()}
                  />

                </div> */}

                <div className="form-group">
                  <label htmlFor="editoria">Editoria</label>

                  <Select
                    value={selectedCategories}
                    isMulti
                    onChange={this.handleChangeSelectMultiCategories}
                    options={this.renderCategories()}
                  />

                </div>

                <div className="form-group">
                  <label htmlFor="galeria">Galeria</label>

                  <Select
                    value={selectedGalleries}
                    isMulti
                    onChange={this.handleChangeSelectMultiGalleries}
                    options={this.renderGalleries()}
                  />

                </div>

                <div className="form-group ">
                  <label htmlFor="publicacao" >Data de Publicação</label>
                  <br />
                  <DateTimePicker
                    onChange={this.onChangeDate}
                    value={moment(article.attributes.published_at).toDate()}
                  />
                  <br />
                </div>

                <div className="form-group ">
                  <label className="mr-2" htmlFor="carousel_detached" >Destaque rotativo:</label>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input"
                      type="checkbox"
                      name="inlineRadioOptions"
                      id="carousel_detached"
                      onChange={this.handleChange}
                      checked={(article.attributes.carousel_detached)}
                    />
                    <label className="form-check-label" htmlFor="carousel_detached">Destacar</label>
                  </div>
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
                      this.props.newsId ? "Atualizar Notícia" : "Cadastrar Notícia"
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


/*
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
ArticleForm.modules = {
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
ArticleForm.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video'
]

export default ArticleForm;
