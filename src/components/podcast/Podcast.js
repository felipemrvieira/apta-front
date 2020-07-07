import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import api from "../../services/api";
import Moment from 'react-moment';
import { Link } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal'

class Podcast extends Component {
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
      const response = await api.get(`articles/${this.props.idPodcast}`);
      const article = response.data.data;
      console.log(article)
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
      if (window.confirm(`Tem certeza que deseja excluir o podcast: "${article.title}"?`)) {
        const response = await api.delete(`articles/${this.props.idPodcast}`);
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

  render() {

    if (this.state.redirect) {
      return <Redirect to="/podcasts" />;
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
                <h6 className="m-0 font-weight-bold text-primary">Informações do Podcast</h6>
                <div className="dropdown no-arrow">
                  <div className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                  </div>
                  <div id="dropdown-article-new" className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                    aria-labelledby="dropdownMenuLink" x-placement="bottom-end">
                    <div className="dropdown-header">Ações do Podcast:</div>
                    {/* <div className="dropdown-item" href="#">Publicar</div> */}
                    <div className="dropdown-item" onClick={() => this.setState({ show: true })}>
                      Pré-Visualizar
                    </div>
                    <Link className="dropdown-item" to={`/podcasts/edit/${article.slug}`}>
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
              <img
                    className="img-fluid mb-4"
                    src={article.featured_image_url}
                    alt={article.title} />
                <br/>

                <audio
                    className="audio_tag"
                    src={article.podcast_audio_url}
                    alt={article.title}
                    controls
                        />
                <hr/>
                <p><strong>Título: </strong>{article.title}</p>
                <p><strong>Corpo: </strong></p>
                <div className="article-body">
                  <div className=""
                    dangerouslySetInnerHTML={{ __html: article.body }} />
                </div>
                <br />
                <p><strong>Crédito da Reportagem: </strong>{article.credit_journalist}</p>
                <p><strong>Publicação destacada na página inicial: </strong>{article.home_page_detached ? 'Sim' : 'Não'}</p>


                <p><strong>Publicado: </strong>
                  <Moment format="DD.MM.YYYY - HH:MM">
                    {article.published_at}
                  </Moment>
                </p>

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
              Pré-vizualização do podcast {this.state.article.id}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <section className="padding-lateral padding-vertical" id="show-noticia">
              <h2 className="titulo-componente">{article.title}</h2>

              <div id="noticia-conteudo">

                <div className="noticia-container">
                  <div className="noticia-imagem-destaque-container">
                    <img className="noticia-imagem-destaque" src={article.featured_image_url}
                      alt={article.title} />
                  </div>
                  <div className="noticia-autoria">
                    <p>Link: </p> {article.link}
                  </div>
                  <div className="noticia-corpo"
                    dangerouslySetInnerHTML={{ __html: article.body }} />
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

export default Podcast;

