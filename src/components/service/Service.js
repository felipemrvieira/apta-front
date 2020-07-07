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


class Service extends Component {
  constructor(props) {
    super(props)
    this.state = {
      service: {
        image_url: {},
        categories: [],
        ratings: [],
      },
      redirect: false,
      setShow: false
    }
  }

  loadService = async () => {
    try {
      const response = await api.get(`services/${this.props.idService}`);
      const service = response.data;
      console.log(service)
      this.setState({ service: service });
    } catch (err) {
      console.log(err);
    }
  }

  componentDidMount() {
    this.loadService();
  }

  deleteService = async (service) => {
    try {
      if (window.confirm(`Tem certeza que deseja excluir o serviço: "${service.title}"?`)) {
        const response = await api.delete(`services/${this.props.idService}`);
        this.setState({ ...this.state, services: response.data })
        this.setState({
          redirect: true
        })
      }
    } catch (err) {
      console.log(err);
    }
  }

  renderCategories = () => {
    const { categories } = this.state.service || [{ id: 1, title: "titulo" }];
    return categories.map(category => (
      <div key={category.id} className="col-xl-4 col-md-4 mb-4 ">
        <div className="card border-left-primary shadow  h-100 py-2">
          <div className="card-body">
            <div className="row no-gutters align-items-center">
              <div className="col mr-2">
                <div className="h5 mb-0 font-weight-bold text-gray-800">
                  {category.title}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ))
  }

  renderRatings = () => {
    const { ratings } = this.state.service;
    console.log(ratings)
    return ratings.map(rating => (
      <div key={rating.id} className="col-xl-4 col-md-4 mb-4 ">
        <div className="card border-left-primary shadow  h-100 py-2">
          <div className="card-body">
            <div className="row no-gutters align-items-center">
              <div className="col mr-2">
                <p><strong>Título: </strong>{rating.comment}</p>
                <p><strong>Descrição: </strong>{rating.stars}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    ))
  }

  render() {

    if (this.state.redirect) {
      return <Redirect to="/services" />;
    }

    const service = this.state.service;

    return (
      <div className="">

        <div className="row">
          <div className="col-md-12">
            {/* Card */}
            <div className="card shadow mb-4">
              {/* <!-- Card Header - Dropdown --> */}
              <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 className="m-0 font-weight-bold text-primary">Informações do Serviço</h6>
                <div className="dropdown no-arrow">
                  <div className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                  </div>
                  <div id="dropdown-article-new" className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                    aria-labelledby="dropdownMenuLink" x-placement="bottom-end">
                    <div className="dropdown-header">Ações do serviço:</div>
                    <Link className="dropdown-item" to={`/services/edit/${service.id}`}>
                      Editar
                    </Link>
                    {/* <div className="dropdown-item" href="#">Marcar para revisão</div> */}
                    <div className="dropdown-divider"></div>
                    <div
                      className="dropdown-item"
                      href="#"
                      onClick={() => this.deleteService(service)}
                    >Excluir</div>
                  </div>
                </div>
              </div>
              {/* <!-- Card Body --> */}
              <div className="card-body">
                <p><strong>Foto:</strong></p>
                <img
                  className="img-fluid mb-4"
                  src={service.image_url}
                  alt={service.title} />
                <p><strong>Título: </strong>{service.title}</p>
                <p><strong>Descrição: </strong>{service.description}</p>
                <p><strong>Preço: </strong>{service.price}</p>
                <p><strong>Pontuação: </strong>{service.stars ? service.stars : "Ainda não existem avaliações"}</p>

              </div>
            </div>
            {/* Card */}
          </div>
        </div>

        <h3 className="h5 mb-2 text-gray-800">Categorias</h3>
        <div className="row">
          {this.renderCategories()}
        </div>

        <h3 className="h5 mb-2 text-gray-800">Avaliações</h3>
        <div className="row">
          {this.renderRatings()}
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
              Pré-vizualização do serviço {this.state.service.id}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <section className="padding-lateral padding-vertical" id="show-noticia">
              <p className="chapeu-componente">{service.hat}</p>
              <h2 className="titulo-componente">{service.title}</h2>
              <p className="bigode-componente">{service.moustache}</p>

              <div id="noticia-conteudo">

                <div className="noticia-container">
                  <div className="noticia-imagem-destaque-container">
                    <img className="noticia-imagem-destaque" src={service.featured_image_url}
                      alt={service.title} />
                    <p className="noticia-imagem-destaque-credito">Crédito da foto: {service.credit_photo}</p>

                  </div>
                  <div className="noticia-autoria">
                    <p>Texto de {service.credit_journalist}</p>
                  </div>
                  <div className="noticia-corpo"
                    dangerouslySetInnerHTML={{ __html: service.body }} />
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

export default Service;

