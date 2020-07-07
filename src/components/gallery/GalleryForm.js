import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import api from "../../services/api";
import 'react-quill/dist/quill.snow.css';
import './Gallery.scss';

class GalleryForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      gallery: {
        id: '',
        attributes: {
          title: '',
          gallery_credit: '',
        },
        images: [],
      },
      files: null,
      redirect: false,
      submited: false
    }
    this.handleChange = this.handleChange.bind(this);
  }

  loadGallery = async () => {
    try {
      const response = await api.get(`/galleries/${this.props.galleryId}`);
      const gallery = response.data.data
      console.log(gallery)

      this.setState({ ...this.state, gallery: gallery })
    } catch (err) {
      console.log(err);
    }
  }

  componentDidMount() {
    if (this.props.galleryId) {
      this.loadGallery()
    }
  }

  fileUpload = (file, id) => {
    const formData = new FormData();
    for (var x = 0; x < this.state.files.length; x++) {
      formData.append('gallery[images][]', this.state.files[x])
    }

    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    return api.patch(
      `/galleries/${id}`, formData, config
    )
  }

  // Captura inputs do form exceto body
  handleChange = event => {
    const value = event.target.value

    switch (event.target.id) {
      case 'title':
        this.setState(prevState => ({
          gallery: {
            attributes: {
              ...prevState.gallery.attributes,
              title: value
            }
          }
        }))
        break;
      case 'gallery_credit':
        this.setState(prevState => ({
          gallery: {
            attributes: {
              ...prevState.gallery.attributes,
              gallery_credit: value
            }
          }
        }))
        break;
      default:
        break;
    }
  }

  onChangeFile = event => {
    this.setState({
      ...this.state,
      files: event.target.files
    });
  }

  editGallery = async (gallery) => {
    console.log(JSON.stringify(gallery))

    try {
      await api.patch(`/galleries/${this.props.galleryId}`, { gallery });

      if (this.state.files !== null) {
        await this.fileUpload(this.state.files, this.props.galleryId)
      }

      this.setState({
        redirect: true
      })
    } catch (err) {
      console.log(err);
    }
  }

  createGallery = async (gallery) => {
    try {
      const response = await api.post(`/galleries`, { gallery });

      console.log(response)

      if (this.state.files !== null) {
        await this.fileUpload(this.state.files, response.data.data.id)
      }

      this.setState({
        redirect: true
      })

    } catch (err) {
      console.log(err);
    }
  }

  handleSubmit = async event => {
    event.preventDefault();
    this.setState({ submited: true })

    const { gallery } = this.state

    if (this.props.galleryId) {
      this.editGallery(gallery.attributes);
    } else {
      this.createGallery(gallery.attributes);
    }
  }

  handleDelete = async (gallery, image) => {
    let images = this.state.gallery.images || []
    if (window.confirm(`Tem certeza que deseja excluir a imagem: "${image}"?`)) {

      try {
        await api.delete(`/delete_image/${gallery}/${image}`)
        let new_images = images.filter(item => item.id !== image);

        this.setState({
          ...this.state,
          gallery: {
            ...this.state.gallery,
            images: new_images
          }
        })
      } catch (error) {
        console.log(error);
      }
    }
  }

  renderImages = () => {
    const images = this.state.gallery.images || []
    return images.map(image => (
      <React.Fragment key={image.id} >
        <img
          className="img-fluid mb-4 col-2"
          src={image.url}
          alt={image.url}
        />
        <div onClick={() => this.handleDelete(this.state.gallery.id, image.id)}>x</div>
      </React.Fragment>
    ))
  }

  render() {
    if (this.state.redirect) { return <Redirect to="/galleries" />; }

    const {
      gallery
    } = this.state;
    console.log(gallery)

    return (
      <div className="row">
        <div className="col-md-12">

          <div className="card shadow mb-4">
            {/* <!-- Card Header - Dropdown --> */}
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold text-primary">Informações do Banco de Imagens</h6>

            </div>

            {/* <!-- Card Body --> */}
            <div className="card-body">
              <form onSubmit={this.handleSubmit}>

                {
                  !this.props.galleryId ?
                    <div className="form-group">
                      <label htmlFor="featured_image">Foto</label> <br />
                      <input
                        type="file"
                        multiple
                        id="featured_image"
                        name="featured_image"
                        onChange={this.onChangeFile}
                        required
                      />
                    </div>
                    :
                    <div className="form-group">
                      <label htmlFor="featured_image">Foto</label> <br />
                      <input
                        type="file"
                        multiple
                        id="featured_image"
                        name="featured_image"
                        onChange={this.onChangeFile}
                      />
                    </div>
                }

                <div className="row">
                  {this.renderImages()}
                </div>

                <div className="form-group">
                  <label htmlFor="titulo">Título</label>
                  <input type="text"
                    className="form-control"
                    maxLength="85"
                    id="title"
                    placeholder="Digite aqui"
                    onChange={this.handleChange}
                    name="title"
                    value={gallery.attributes.title}
                    required
                  />

                </div>

                <div className="form-group">
                  <label htmlFor="credito">Crédito do Banco de Imagens</label>
                  <input type="text"
                    className="form-control"
                    id="gallery_credit"
                    placeholder="Digite aqui"
                    onChange={this.handleChange}
                    name="gallery_credit"
                    value={gallery.attributes.gallery_credit}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-success btn-block"
                  disabled={this.state.submited ? "disabled" : ""}
                >
                  {
                    this.state.submited ?
                      "Aguarde..." :
                      this.props.galleryId ? "Atualizar Galeria" : "Cadastrar Galeria"
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


export default GalleryForm;
