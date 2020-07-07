import React, { Component } from 'react';
import api from "../../services/api";
import { Redirect } from 'react-router-dom';
import Select from 'react-select';

class BannerForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            banner: {
                id: '',
                type: "",
                attributes: {
                    description: '',
                    link: '',
                    published_at: new Date(),
                    carousel_detached: false,
                    home_page_detached: false
                },
                relationships: {},
                // featured_image: '',
            },
            file: null,
            banner_types: [],
            selectedTypes: '',
            redirect: false,
            submited: false,
            isLoading: false
        }
        this.handleChange = this.handleChange.bind(this);
    }

    loadBannerTypes = async () => {
        try {
            const response = await api.get("/banner_types");
            const banner_types = response.data.data;
            this.setState({ ...this.state, banner_types: banner_types, isLoading: false })
        } catch (err) {
            console.log(err);
        }
    }

    loadBanner = async () => {
        try {

            const response = await api.get(`/banners/${this.props.bannerId}`);
            const banner = response.data.data
            console.log(banner)

            this.setState({ ...this.state, banner: banner })
            this.setState({ ...this.state, selectedTypes: this.renderSelectedType(), isLoading: false })
        } catch (err) {
            console.log(err);
        }
    }

    componentDidMount() {
        this.setState({ isLoading: true });

        if (this.props.bannerId) {
            this.loadBanner()
        }
        this.loadBannerTypes()
    }

    renderTypes = () => {
        const { banner_types } = this.state || []
        const result = banner_types.map(type => ({ value: type.id, label: type.attributes.title }))
        return result
    }

    renderSelectedType = () => {
        const banner_types = this.state.banner.attributes.banner_type || []
        const result = banner_types.map(banner_type => ({ value: banner_type.id, label: banner_type.title }))
        console.log(result)
        return result
    }

    handleChangeType = selectedTypes => {
        // console.log(selectedTypes)
        this.setState(
            { selectedTypes },
            () => console.log(`Option selected:`, this.state.selectedTypes)
        );
        // this.setState({
        //     banner: {
        //         ...this.state.banner,
        //         banner_type_id: selectedTypes.value,
        //         banner_type: selectedTypes
        //     }
        // }, () => console.log(`Option selected:`, this.state.banner)
        // );
    };

    //Handler do componente de data
    onChangeDate = date => this.setState({
        banner: {
            ...this.state.banner,
            attributes: {
                ...this.state.banner.attributes,
                published_at: date
            }
        }
    });

    onChangeFile = event => {
        this.setState({
            ...this.state,
            file: event.target.files[0]
        });
        console.log(this.state.file)
    }

    fileUpload = (file, id) => {
        const formData = new FormData();
        formData.append('banner[featured_image]', file)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }

        try {
            api.patch(
                `/banners/${id}`, formData, config
            )
        } catch (err) {
            console.log(err);
        }
        return
    }

    handleChange = event => {
        const value = event.target.value

        switch (event.target.id) {
            case 'description':
                this.setState(prevState => ({
                    banner: {
                        attributes: {
                            ...prevState.banner.attributes,
                            description: value
                        }
                    }
                }))
                break;
            case 'link':
                this.setState(prevState => ({
                    banner: {
                        attributes: {
                            ...prevState.banner.attributes,
                            link: value
                        }
                    }
                }))
                break;
            case 'carousel_detached':
                this.setState(prevState => ({
                    banner: {
                        attributes: {
                            ...prevState.banner.attributes,
                            carousel_detached: !prevState.banner.attributes.carousel_detached
                        }
                    }
                }))
                break;
            case 'home_page_detached':
                this.setState(prevState => ({
                    banner: {
                        attributes: {
                            ...prevState.banner.attributes,
                            home_page_detached: !prevState.banner.attributes.home_page_detached
                        }
                    }
                }))
                break;
            default:
                break;
        }
    }

    editBanner = async (banner) => {
        console.log(JSON.stringify(banner))

        try {
            await api.patch(`/banners/${this.props.bannerId}`, { banner });

            if (this.state.file !== null) {
                await this.fileUpload(this.state.file, this.props.bannerId)
                console.log(this.state.banner)
            }

            this.setState({
                redirect: true
            })
        } catch (err) {
            console.log(err);
        }
    }

    createBanner = async (banner) => {
        try {
            const response = await api.post(`/banners`, { banner });

            if (this.state.file !== null) {
                await this.fileUpload(this.state.file, response.data.data.id)
            }

            this.setState({
                redirect: true
            })

        } catch (err) {
            console.log(err);
        }
    }

    async setIdsFromRelationship() {

        const { selectedTypes } = this.state;

        const ids_list = selectedTypes ?
            (selectedTypes.map(type => (type.value))) :
            this.state.banner.types = []

        await this.setState({
            banner: {
                ...this.state.banner,
                attributes: {
                    ...this.state.banner.attributes,
                    type_ids: ids_list
                }
            }
        })
        return this.state.banner
    }

    handleSubmit = async event => {
        event.preventDefault();
        this.setState({ submited: true })

        const banner = await this.setIdsFromRelationship();

        if (this.props.bannerId) {
            this.editArticle(banner.attributes);
            console.log("Edita banner")
        } else {
            this.createArticle(banner.attributes);
            console.log("Cria banner")
        }
    }

    // handleSubmit = async event => {
    //     event.preventDefault();
    //     this.setState({ submited: true })

    //     const { banner } = this.state;
    //     console.log(banner)

    //     if (this.props.bannerId) {
    //         this.editBanner(banner.attributes);
    //         console.log("Edita banner")
    //     } else {
    //         this.createBanner(banner.attributes);
    //         console.log("Cria banner")
    //     }
    // }

    comnponentDidUpdate() {
        this.setState({ ...this.state, banner: this.props.banner })
        console.log(this.props.banner)
    }

    render() {

        if (this.state.redirect) { return <Redirect to="/banners" />; }

        // let { selectedTypes } = this.state;
        let { banner_type } = this.state.banner
        const {
            selectedTypes,
            banner
        } = this.state;

        console.log(selectedTypes)
        console.log(banner_type)

        // if (isLoading) {
        //     return <p>Loading ...</p>;
        //   }

        return (
            <div className="row">
                <div className="col-md-12">

                    <div className="card shadow mb-4">

                        {/* <!-- Card Body --> */}
                        <div className="card-body">
                            <form onSubmit={this.handleSubmit}>

                                <div className="form-group">
                                    <label htmlFor="type">Tipo de Banner</label>
                                    <Select
                                        value={banner_type}
                                        onChange={this.handleChangeType}
                                        options={this.renderTypes()}
                                    />
                                </div>

                                {
                                    !this.props.bannerId ?
                                        <div className="form-group">
                                            <label htmlFor="titulo">Imagem</label> <br />
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
                                            <label htmlFor="titulo">Imagem</label> <br />
                                            <input
                                                type="file"
                                                id="featured_image"
                                                name="featured_image"
                                                onChange={this.onChangeFile}
                                            />
                                        </div>
                                }


                                <div className="form-group">
                                    <label htmlFor="descricao">Título</label>
                                    <input type="text"
                                        className="form-control"
                                        id="description"
                                        placeholder="Digite aqui"
                                        onChange={this.handleChange}
                                        name="description"
                                        value={banner.attributes.description}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="banner">Link</label>
                                    <input type="text"
                                        className="form-control"
                                        id="link"
                                        placeholder="Digite aqui"
                                        onChange={this.handleChange}
                                        value={banner.attributes.link}
                                        required
                                    />
                                </div>

                                <div className="form-group ">
                                    <label className="mr-2" htmlFor="carousel_detached" >Destaque rotativo:</label>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input"
                                            type="checkbox"
                                            name="inlineRadioOptions"
                                            id="carousel_detached"
                                            onChange={this.handleChange}
                                            checked={(banner.attributes.carousel_detached)}
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
                                            checked={(banner.attributes.home_page_detached)}
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
                                            this.props.bannerId ? "Atualizar Banner" : "Cadastrar Banner"
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

export default BannerForm;
