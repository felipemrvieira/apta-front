import React, { Component } from 'react';
import api from "../../services/api";
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';

class Press extends Component {
    constructor(props) {
        super(props)
        this.state = {
            press: {
                featured_image: {},
                categories: [],
                types: []
            },
            redirect: false,
            show: false,
            setShow: false
        }
    }

    loadPress = async () => {
        try {
            const response = await api.get(`presses/`);
            const press = response.data.data[0];
            console.log(press)
            this.setState({ press: press.attributes });
        } catch (err) {
            console.log(err);
        }
    }

    componentDidMount() {
        this.loadPress();
        console.log(this.state.press)

    }

    render() {
        if (this.state.redirect) {
            return <Redirect to="/press" />;
        }

        const press = this.state.press;

        return (
            <div className="">

                <div className="row">
                    <div className="col-md-12">
                        {/* Card */}
                        <div className="card shadow mb-4">
                            {/* <!-- Card Header - Dropdown --> */}
                            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                <h6 className="m-0 font-weight-bold text-primary">Informações da Página de Imprensa</h6>
                                <div className="dropdown no-arrow">
                                    <div className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                                    </div>
                                    <div id="dropdown-agency-new" className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                                        aria-labelledby="dropdownMenuLink" x-placement="bottom-end">
                                        <div className="dropdown-header">Ações em Imprensa:</div>
                                        <Link className="dropdown-item" to={`/press/edit/${press.slug}`}>
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
                                        dangerouslySetInnerHTML={{ __html: press.body }} />
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

export default Press;

