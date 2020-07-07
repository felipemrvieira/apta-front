import React, { Component } from 'react';
import api from "../../services/api";
import { Redirect } from 'react-router-dom';
import Moment from 'react-moment';
import { Link } from 'react-router-dom'

class Photo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            photo: {
                featured_image: {
                    big: {}
                }
            },
            redirect: false
        }
        this.deletePhoto = this.deletePhoto.bind(this);

    }
    
    loadPhoto = async () => {
        try {
          const response = await api.get(`photos/${this.props.idPhoto}`);
          const photo = response.data;
    
          this.setState({ photo });
        } catch (err) {
          console.log(err);
        }
    }

    componentDidMount() {
        this.loadPhoto();
    }

    deletePhoto = async (photo) => {
        try {
          if (window.confirm(`Tem certeza que deseja excluir a foto: "${photo.title}"?`)) {
            const response = await api.delete(`photos/${this.props.idPhoto}`);
            this.setState({ ...this.state, photos: response.data })
            // this.loadphotos()
            this.setState({
              redirect: true
            })
          }
        } catch (err) {
          console.log(err);
        }
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to="/photos" />;
        }

        const photo = this.state.photo;

        return (
            <div className="">

                <div className="row">
                    <div className="col-md-12">
                        {/* Card */}
                        <div className="card shadow mb-4">
                            {/* <!-- Card Header - Dropdown --> */}
                            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                <h6 className="m-0 font-weight-bold text-primary">Informações da Foto</h6>
                                <div className="dropdown no-arrow">
                                    <div className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                                    </div>
                                    <div id="dropdown-photo-new" className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                                        aria-labelledby="dropdownMenuLink" x-placement="bottom-end">
                                        <div className="dropdown-header">Ações da foto:</div>
                                        <div className="dropdown-item" href="#">Publicar</div>
                                        <Link className="dropdown-item" to={`/photos/edit/${photo.id}`}>
                                            Editar
                                        </Link>
                                        <div className="dropdown-item" href="#">Marcar para revisão</div>
                                        <div className="dropdown-divider"></div>
                                        <div
                                            className="dropdown-item"
                                            href="#"
                                            onClick={() => this.deletePhoto(photo)}
                                        >Excluir</div>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- Card Body --> */}
                            <div className="card-body">
                                <img
                                    className="img-fluid mb-4"
                                    src={photo.featured_image.big.url}
                                    alt={photo.title} />
                                <p><strong>Título: </strong>{photo.title}</p>
                                <p><strong>Corpo: </strong>{photo.body}</p>
                                <p><strong>Publicado: </strong>
                                    <Moment format="DD.MM.YYYY - HH:MM">
                                        {photo.published_at}
                                    </Moment>
                                </p>
                                <p><strong>Publicação destacada: </strong>{photo.detached ? 'Sim' : 'Não'}</p>


                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default Photo;

