import React, { Component } from 'react';
import api from "../../services/api";
import { Redirect } from 'react-router-dom';
import Moment from 'react-moment';
import { Link } from 'react-router-dom'

class Banner extends Component {
    constructor(props) {
        super(props)
        this.state = {
            banner: {
                featured_image: {},
                banner_type:'',
            },
            redirect: false,
            show: false,
            setShow: false
        }
        this.deleteBanner = this.deleteBanner.bind(this);
    }

    loadBanner = async () => {
        try {
            const response = await api.get(`banners/${this.props.idBanners}`);
            const banner = response.data.data;
            console.log(banner)
            this.setState({ banner: banner.attributes });
        } catch (err) {
          console.log(err);
        }
      }
    
      componentDidMount() {
        this.loadBanner();
      }

      deleteBanner = async (banner) => {
        try {
          if (window.confirm(`Tem certeza que deseja excluir o banner: "${banner.title}"?`)) {
            const response = await api.delete(`banners/${this.props.idBanners}`);
            this.setState({ ...this.state, banners: response.data })
            // this.loadbanners()
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
            return <Redirect to="/banners" />;
        }

        const banner = this.state.banner;

        return (
            <div className="">

                <div className="row">
                    <div className="col-md-12">
                        {/* Card */}
                        <div className="card shadow mb-4">
                            {/* <!-- Card Header - Dropdown --> */}
                            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                <h6 className="m-0 font-weight-bold text-primary">Informações do Banner</h6>
                                <div className="dropdown no-arrow">
                                    <div className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                                    </div>
                                    <div id="dropdown-banner-new" className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                                        aria-labelledby="dropdownMenuLink" x-placement="bottom-end">
                                        <div className="dropdown-header">Ações do banner:</div>
                                        <div className="dropdown-item" href="#">Publicar</div>
                                        <Link className="dropdown-item" to={`/banners/edit/${banner.id}`}>
                                            Editar
                                        </Link>
                                        <div className="dropdown-item" href="#">Marcar para revisão</div>
                                        <div className="dropdown-divider"></div>
                                        <div
                                            className="dropdown-item"
                                            href="#"
                                            onClick={() => this.deleteBanner(banner)}
                                        >Excluir</div>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- Card Body --> */}
                            <div className="card-body">
                                <p><strong>Título: </strong>{banner.description}</p>
                                
                                <img
                                    className="img-fluid mb-4"
                                    src={banner.featured_image_url}
                                    alt={banner.featured_image_url} />
                                <p><strong>Tipo: </strong>{banner.banner_type.title}</p>
                                <p><strong>Link: </strong>{banner.link}</p>
                                <p><strong>Publicação destacada no Carousel: </strong>{banner.carousel_detached ? 'Sim' : 'Não'}</p>
                                <p><strong>Publicação destacada na página inicial: </strong>{banner.home_page_detached ? 'Sim' : 'Não'}</p>

                                <p><strong>Publicado: </strong>
                                    <Moment format="DD.MM.YYYY - HH:MM">
                                        {banner.published_at}
                                    </Moment>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}
export default Banner;

