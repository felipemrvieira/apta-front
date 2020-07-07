import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import api from "../../services/api";
import Moment from 'react-moment';
import { Link } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal'

const divStyle = {
  textAlign: 'center',
  margin: '10px',
  paddingBottom: '10px',
  fontWeight: 'bold',
  fontSize: '18px',
};
const divImgStyle = {
  textAlign: 'center',
  height: '280px',
  alignItemsCenter: 'center',
  paddingBottom: '5px',
};


class Article extends Component {
  constructor(props) {
    super(props)
    this.state = {
      article: {
        featured_image: {},
        categories: [],
        galleries: [],
        types: []
      },
      redirect: false,
      show: false,
      setShow: false
    }
  }

  loadArticle = async () => {
    try {
      const response = await api.get(`articles/${this.props.idPhoto}`);
      const article = response.data.data;
      const included = response.data.included

      const galleries = included.filter((item) => item.type === 'galleries');
      const categories = included.filter((item) => item.type === 'categories');

      this.setState({ article: article.attributes });

    } catch (err) {
      console.log(err);
    }
  }

  componentDidMount() {
    this.loadArticle();
  }

  deleteArticle = async (article) => {
    try {
      if (window.confirm(`Tem certeza que deseja excluir a galeria: "${article.title}"?`)) {
        const response = await api.delete(`articles/${article.id}`);
        this.setState({ ...this.state, articles: response.data })
        // this.loadArticles()
        this.setState({
          redirect: true
        })
      }
    } catch (err) {
      console.log(err);
    }
  }

  renderCategories = () => {
    const { categories } = this.state.article || [{ id: 1, title: "titulo" }];
    // return categories.map(category => (
    //   <div key={category.id} className="col-xl-4 col-md-4 mb-4 ">
    //     <div className="card border-left-primary shadow  h-100 py-2">
    //       <div className="card-body">
    //         <div className="row no-gutters align-items-center">
    //           <div className="col mr-2">
    //             <div className="h5 mb-0 font-weight-bold text-gray-800">
    //               {category.title}
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // ))
  }

  renderTypes = () => {
    const { types } = this.state.article || [{ id: 1, title: "titulo" }];
    return types.map(type => (
      <div key={type.id} className="col-xl-3 col-md-3 mb-3 ">
        <div className="card shadow  h-80 py-1">
          <div className="card-body">
            <div className="row no-gutters align-items-center">
              <div className="col mr-2">
                <div className="h5 mb-0 font-weight-bold text-gray-800">
                  {type.title}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ))
  }

  renderImages = () => {

    const galleries = this.state.article.galleries || []

    console.log(galleries)
    // return galleries.map(gallery => (
    //   <div key={gallery.id} className="col-xl-4 col-md-4 mb-4 ">
    //     <div className="card border-left-primary  h-100 py-2">
    //       <Link className="btn btn-light btn-icon-split" to={`/galleries/${gallery.id}`}>
    //         <div className="col mr-2">
    //           <div className="h6 mb-0 font-weight text-gray-800" style={divStyle}>
    //             {gallery.title}
    //           </div>
    //           <div style={divImgStyle}>
    //             <img
    //               key={gallery.id}
    //               className="img-fluid mb-4 col-12"
    //               // src={gallery.images[0].url}
    //               alt={gallery.title}
    //             />
    //           </div>
    //         </div>
    //       </Link>
    //     </div>
    //   </div>
    // ))
  }

  render() {


    if (this.state.redirect) {
      return <Redirect to="/photos" />;
    }

    const article = this.state.article;

    return (
      <div className="">

        <div className="row">
          <div className="col-md-12">
            {/* Card */}
            <div className="card shadow mb-4">
              {/* <!-- Card Header - Dropdown --> */}
              <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 className="m-0 font-weight-bold text-primary">Informações da Galeria</h6>
                <div className="dropdown no-arrow">
                  <div className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                  </div>
                  <div id="dropdown-article-new" className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                    aria-labelledby="dropdownMenuLink" x-placement="bottom-end">
                    <div className="dropdown-header">Ações da Galeria:</div>
                    {/* <div className="dropdown-item" href="#">Publicar</div> */}
                    <div className="dropdown-item" onClick={() => this.setState({ show: true })}>
                      Pré-Visualizar
                    </div>
                    <Link className="dropdown-item" to={`/photos/edit/${article.slug}`}>
                      Editar
                    </Link>
                    {/* <div className="dropdown-item" href="#">Marcar para revisão</div> */}
                    <div className="dropdown-divider"></div>
                    <div
                      className="dropdown-item"
                      href="#"
                      onClick={() => this.deleteArticle(article)}
                    >Excluir</div>
                  </div>
                </div>
              </div>
              {/* <!-- Card Body --> */}
              <div className="card-body">
                <p><strong>Título: </strong>{article.title}</p>
                <p><strong>Imagem de Capa:</strong></p>
                <img
                  className="img-fluid mb-4"
                  src={article.featured_image_url}
                  alt={article.title} />
                <p><strong>Crédito da Imagem de Capa: </strong>{article.credit_photo}</p>
                <p><strong>Corpo: </strong></p>
                <div className="article-body">
                  <div className=""
                    dangerouslySetInnerHTML={{ __html: article.body }} />
                </div>
                <br />
                <p><strong>Publicação destacada no Carousel: </strong>{article.carousel_detached ? 'Sim' : 'Não'}</p>
                <p><strong>Publicação destacada na página inicial: </strong>{article.home_page_detached ? 'Sim' : 'Não'}</p>

                <p><strong>Publicado: </strong>
                  <Moment format="DD.MM.YYYY - HH:MM">
                    {article.published_at}
                  </Moment>
                </p>
                <p><strong>Banco(s) de Imagens: </strong></p>
                <div className="row">
                  {this.renderImages()}
                </div>

              </div>
            </div>
            {/* Card */}
          </div>
        </div>

        <div className="row">
          {/* {this.renderCategories()} */}
        </div>

        <Modal
          show={this.state.show}
          onHide={() => this.setState({ show: false })}
          dialogClassName="modal-article"
          size="xl"
          aria-labelledby="example-custom-modal-styling-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-custom-modal-styling-title">
              Pré-vizualização da Galeria {this.state.article.id}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <section className="padding-lateral padding-vertical" id="show-noticia">
              <p className="chapeu-componente">{article.hat}</p>
              <h2 className="titulo-componente">{article.title}</h2>
              <p className="bigode-componente">{article.moustache}</p>

              <div id="noticia-conteudo">

                <div className="noticia-container">
                  <div className="noticia-imagem-destaque-container">
                    <img className="noticia-imagem-destaque" src={article.featured_image_url}
                      alt={article.title} />
                    <p className="noticia-imagem-destaque-credito">Crédito da foto: {article.credit_photo}</p>

                  </div>
                  <div className="noticia-autoria">
                    <p>Texto de {article.credit_journalist}</p>
                  </div>
                  <div className="noticia-corpo"
                    dangerouslySetInnerHTML={{ __html: article.body }} />
                </div>

                <div className="side-menu">
                  Menu
                  <p>Item de menu</p>
                  <p>Item de menu</p>
                  <p>Item de menu</p>
                  <p>Item de menu</p>
                  <p>Item de menu</p>
                </div>
                {/* <SideMenu /> */}

              </div>
            </section>
          </Modal.Body>
        </Modal>

      </div>

    );
  }
}

export default Article;

