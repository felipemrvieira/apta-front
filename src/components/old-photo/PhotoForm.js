import React, { Component } from 'react';
import DateTimePicker from 'react-datetime-picker';
import api from "../../services/api";
import { Redirect } from 'react-router-dom';
import FileBase64 from 'react-file-base64';

class PhotoForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            photo: {
                id: '',
                title: '',
                body: '',
                published_at: new Date(),
                featured_image: '',
                detached: false
            },
            redirect: false,
            submited: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.getFiles = this.getFiles.bind(this);

    }

    loadPhoto = async () => {
        try {
          const response = await api.get(`/photos/${this.props.photoId}`);
          this.setState({ ...this.state, photo: response.data })
        } catch (err) {
          console.log(err);
        }
    }

    componentDidMount() {
        if (this.props.photoId) {
            this.loadPhoto()
        }
    }

    //Handler do componente de data
    onChangeDate = date => this.setState({
        photo: {
            ...this.state.photo,
            published_at: date
        }
    });

    //Callback do input do filebase64
    getFiles(files) {
        this.setState({
            photo: {
                ...this.state.photo,
                featured_image: files.base64
            }
        })
    }

    handleChange = event => {
        const value = event.target.value

        switch (event.target.id) {
            case 'title':
                this.setState(prevState => ({
                    photo: {
                        ...prevState.photo,
                        title: value
                    }
                }))
                break;
            case 'body-summernote':
                this.setState(prevState => ({
                    photo: {
                        ...prevState.photo,
                        body: value
                    }
                }))
                break;

            case 'detached':
                this.setState(prevState => ({
                    photo: {
                        ...prevState.photo,
                        detached: value
                    }
                }))
                console.log(value)
                break;
            default:
                break;
        }

    }

    editPhoto = async (photo) => {
        try {
          await api.patch(`/photos/${this.props.photoId}`, { photo });
          this.setState({
            redirect: true
          })
        } catch (err) {
          console.log(err);
        }
    }

    createPhoto = async (photo) => {
        try {
          const response = await api.post(`/photos`, { photo });
          console.log(response)
          this.setState({
            redirect: true
          })
        } catch (err) {
          console.log(err);
        }
    }

    handleSubmit = event => {
        event.preventDefault();
        this.setState({ submited: true })

        const photo = this.state.photo;
        console.log(photo)

        if (this.props.photoId) {
            this.editPhoto(photo);
        } else {
            this.createPhoto(photo);
        }
        
    }

    comnponentDidUpdate(){
        this.setState({ ...this.state, photo: this.props.photo })
        console.log(this.props.photo)
    }

    render() {

        if (this.state.redirect) {
            return <Redirect to="/photos" />;
        }


        return (
            <div className="row">
                <div className="col-md-12">

                    <div className="card shadow mb-4">
                        {/* <!-- Card Header - Dropdown --> */}
                        {/* <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                            <h6 className="m-0 font-weight-bold text-primary">Informações da Foto</h6>
                            <div className="dropdown no-arrow">
                                <div className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                                </div>
                                <div id="dropdown-photo-new" className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                                    aria-labelledby="dropdownMenuLink" x-placement="bottom-end">
                                    <div className="dropdown-header">Dropdown Header:</div>
                                    <div className="dropdown-item" href="#">Action</div>
                                    <div className="dropdown-item" href="#">Another action</div>
                                    <div className="dropdown-divider"></div>
                                    <div className="dropdown-item" href="#">Something else here</div>
                                </div>
                            </div>
                        </div> */}

                        {/* <!-- Card Body --> */}
                        <div className="card-body">
                            <form onSubmit={this.handleSubmit}>

                                <div className="form-group">
                                    <label htmlFor="titulo">Título</label>
                                    <input type="text"
                                        className="form-control"
                                        id="title"
                                        placeholder="Digite aqui"
                                        onChange={this.handleChange}
                                        name="title"
                                        value={this.state.photo.title}
                                    />

                                </div>
                                <div className="form-group">
                                    <label htmlFor="corpo">Corpo</label>
                                    <textarea className="form-control"
                                        id="body-summernote"
                                        rows="7"
                                        onChange={this.handleChange}
                                        value={this.state.photo.body}
                                    ></textarea>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="titulo">Imagem</label> <br/>
                                    <FileBase64
                                        multiple={false}
                                        onDone={this.getFiles.bind(this)}
                                        />
                                </div>
                                <div className="form-group ">
                                    <label htmlFor="publicacao" >Data de publicação</label>
                                    <DateTimePicker
                                        id="published_at"
                                        onChange={this.onChangeDate}
                                        value={this.state.photo.published_at}
                                    />
                                </div>
                                <div className="form-group ">
                                    <label className="mr-2" htmlFor="detached" >Publicação destacada:</label>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input"
                                            type="radio"
                                            name="inlineRadioOptions"
                                            id="detached"
                                            onChange={this.handleChange}
                                            checked = {(this.state.photo.detached) === true}
                                            // checked = {(this.state.photo.detached) ? true : false}
                                            value="true" />
                                        <label className="form-check-label" htmlFor="inlineRadio1">Destacar</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input"
                                            type="radio"
                                            name="inlineRadioOptions"
                                            id="detached"
                                            onChange={this.handleChange}
                                            checked = {(this.state.photo.detached) === false}
                                            // checked = {!(this.state.photo.detached ? true : false)}
                                            value="false" />
                                        <label className="form-check-label" htmlFor="inlineRadio2">Não destacar</label>
                                    </div>

                                </div>
                                
                                <button
                                    type="submit"
                                    className="btn btn-success btn-block"
                                    disabled={ this.state.submited ? "disabled" : "" }
                                    >
                                    { 
                                        this.state.submited ? 
                                        "Aguarde..." :  
                                        this.props.photoId ? "Atualizar Foto" : "Cadastrar Foto"
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

export default PhotoForm;
