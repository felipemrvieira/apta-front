import React, { Component } from 'react';
import api from "../../services/api";
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';

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

class Government extends Component {
    constructor(props) {
        super(props)
        this.state = {
          government: {
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

    loadGovernment = async () => {
        try {
            const response = await api.get(`government/`);
            const government = response.data.data[0];
            console.log(government)
            this.setState({ government: government.attributes });
        } catch (err) {
            console.log(err);
        }
    }

    componentDidMount() {
        this.loadGovernment();
        console.log(this.state.government)

    }

    renderImages = () => {

        const galleries = this.state.government.galleries || []

        console.log(galleries)
        return galleries.map(gallery => (
            <div key={gallery.id} className="col-xl-4 col-md-4 mb-4 ">
                <div className="card border-left-primary  h-100 py-2">
                    <Link className="btn btn-light btn-icon-split" to={`/galleries/${gallery.id}`}>
                        <div className="col mr-2">
                            <div className="h6 mb-0 font-weight text-gray-800" style={divStyle}>
                                {gallery.title}
                            </div>
                            <div style={divImgStyle}>
                                <img
                                    key={gallery.id}
                                    className="img-fluid mb-4 col-12"
                                    // src={gallery.images[0].url}
                                    alt={gallery.title}
                                />
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        ))
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to="/government" />;
        }

        const government = this.state.government;

        return (
            <div className="">

                <div className="row">
                    <div className="col-md-12">
                        {/* Card */}
                        <div className="card shadow mb-4">
                            {/* <!-- Card Header - Dropdown --> */}
                            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                <h6 className="m-0 font-weight-bold text-primary">Informações da Página do Governo</h6>
                                <div className="dropdown no-arrow">
                                    <div className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                                    </div>
                                    <div id="dropdown-agency-new" className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                                        aria-labelledby="dropdownMenuLink" x-placement="bottom-end">
                                        <div className="dropdown-header">Ações em Governo:</div>
                                        <Link className="dropdown-item" to={`/government/edit/${government.slug}`}>
                                            Editar
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- Card Body --> */}
                            <div className="card-body">
                                <p><strong>Corpo: </strong></p>
                                <div className="article-body">
                                    <div className=""
                                        dangerouslySetInnerHTML={{ __html: government.body }} />
                                </div>
                                <br />
                                <p><strong>Galerias: </strong></p>
                                <div className="row">
                                    {this.renderImages()}
                                </div>
                            </div>
                        </div>
                        {/* Card */}
                    </div>
                </div>
            </div>

        );
    }
}

export default Government;

