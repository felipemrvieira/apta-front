import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import api from "../../services/api";
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import { Link } from 'react-router-dom'

const translations = {
  pageText: 'Página',
  ofText: 'de',
  rowsText: 'Linhas',
  previousText: 'Anterior',
  nextText: 'Próxima',
  loadingText: 'Carregando...'
};

const columns = [
  {
    Header: 'Título',
    accessor: 'title',
  },
  {
    Header: 'Ações',
    accessor: 'slug',
    Cell: row => (
      <div>
        <Link className="btn btn-light btn-icon-split" to={`/news/${row.value}`}>
          <span className="icon text-gray-600">
            <i className="fas fa-arrow-right"></i>
          </span>
          <span className="text">Visualizar</span>
        </Link>
      </div >
    )
  },
]

class Gallery extends Component {
  constructor(props) {
    super(props)
    this.state = {
      gallery: {
        images: [],
        gallery_credit: '',
      },
      redirect: false
    }
  }

  loadGallery = async () => {
    try {
      const response = await api.get(`galleries/${this.props.idGallery}`);
      const gallery = response.data.data;
      console.log(gallery)
      this.setState({ gallery: gallery.attributes });
    } catch (err) {
      console.log(err);
    }
  }

  componentDidMount() {
    this.loadGallery();
  }

  deleteGallery = async (gallery) => {
    try {
      if (window.confirm(`Tem certeza que deseja excluir o artigo: "${gallery.title}"?`)) {
        const response = await api.delete(`galleries/${this.props.idGallery}`);
        this.setState({ ...this.state, galleries: response.data })

        this.setState({
          redirect: true
        })
      }
    } catch (err) {
      console.log(err);
    }
  }

  renderImages = () => {
    const images = this.state.gallery.images || []
    return images.map(image => (
      <img
        key={image}
        className="img-fluid mb-4 col-3"
        src={image.url}
        alt={image.id}
      />
    ))
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/galleries" />;
    }

    const gallery = this.state.gallery;

    const articles = this.state.gallery.articles || []

    return (
      <div className="">

        <div className="row">
          <div className="col-md-12">
            {/* Card */}
            <div className="card shadow mb-4">
              {/* <!-- Card Header - Dropdown --> */}
              <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 className="m-0 font-weight-bold text-primary">Informações do Banco de Imagens</h6>
                <div className="dropdown no-arrow">
                  <div className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                  </div>
                  <div id="dropdown-gallery-new" className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                    aria-labelledby="dropdownMenuLink" x-placement="bottom-end">
                    <div className="dropdown-header">Ações do Banco:</div>
                    {/* <div className="dropdown-item" href="#">Publicar</div> */}
                    <Link className="dropdown-item" to={`/galleries/edit/${gallery.id}`}>
                      Editar
                                        </Link>
                    {/* <div className="dropdown-item" href="#">Marcar para revisão</div> */}
                    <div className="dropdown-divider"></div>
                    <div
                      className="dropdown-item"
                      href="#"
                      onClick={() => this.deleteGallery(gallery)}
                    >Excluir</div>
                  </div>
                </div>
              </div>
              {/* <!-- Card Body --> */}
              <div className="card-body">
                <p><strong>Título: </strong>{gallery.title}</p>
                <p><strong>Imagens do Banco de Imagens:</strong></p>
                <div className="row">
                  {this.renderImages()}
                </div>
                <p><strong>Crédito do Banco de Imagens: </strong>{gallery.gallery_credit}</p>

                {/* <p><strong>Publicado: </strong>
                  <Moment format="DD.MM.YYYY - HH:MM">
                    {gallery.published_at}
                  </Moment>
                </p> */}
              </div>
              <div className="card-body">
                <hr />

                <br />
                <h5><strong>Notícias Relacionadas:</strong></h5>
                <br />
                <ReactTable className="shadow -striped -highlight mb-4"
                  data={articles}
                  columns={columns}
                  noDataText="Ainda não existem artigos relacionados cadastrados!"
                  defaultPageSize={10}
                  {...translations}
                />
              </div>
            </div>
            {/* Card */}
          </div>
        </div>

      </div>

    );
  }
}

export default Gallery;

