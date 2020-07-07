import React from 'react';
import Logo from './images/logo.png'
import LogoIcon from './images/logo-icon.png'
import { Link } from 'react-router-dom'

function Sidebar() {
  return (

    <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

      {/* <!--  Sidebar - Brand  --> */}
      <Link className="sidebar-brand d-flex align-items-center justify-content-center" to={"/news"}>
        <div className="sidebar-brand-icon">
          <img src={LogoIcon} alt="logo icone" />
        </div>
        <div className="sidebar-brand-full mx-3">
          <img src={Logo} alt="logo completa" />
        </div>
      </Link>


      {/* <!--  Divider  --> */}
      <hr className="sidebar-divider" />

      {/* <!--  Heading  --> */}
      <div className="sidebar-heading">
        Artigos
      </div>

      {/* <!--  Nav Item - Pages Collapse Menu  --> */}
      <li className="nav-item">
        <div className="nav-link collapsed" href="#" data-toggle="collapse"
          data-target="#collapseNotice" aria-expanded="true" aria-controls="collapseNotice">
          <i className="fas fa-fw fa-cog"></i>
          <span>Notícias</span>
        </div>
        <div id="collapseNotice" className="collapse" aria-labelledby="headingTwo"
          data-parent="#accordionSidebar">
          <div className="bg-white py-2 collapse-inner rounded">
            <h6 className="collapse-header">Opções:</h6>
            <Link className="collapse-item" to={"/news"}>Listar Notícias</Link>
            <Link className="collapse-item" to={"/news/new"}>Cadastrar Notícia</Link>
          </div>
        </div>
      </li>

      {/* <!--  Nav Item - Pages Collapse Menu  --> */}
      <li className="nav-item">
        <div className="nav-link collapsed" href="#" data-toggle="collapse"
          data-target="#collapsePhoto" aria-expanded="true" aria-controls="collapsePhoto">
          <i className="fas fa-fw fa-camera"></i>
          <span>Galerias de Fotos</span>
        </div>
        <div id="collapsePhoto" className="collapse" aria-labelledby="headingTwo"
          data-parent="#accordionSidebar">
          <div className="bg-white py-2 collapse-inner rounded">
            <h6 className="collapse-header">Opções:</h6>
            <Link className="collapse-item" to={"/photos"}>Listar Galerias</Link>
            <Link className="collapse-item" to={"/photos/new"}>Cadastrar Galeria</Link>
          </div>
        </div>
      </li>

      {/* <!--  Nav Item - Pages Collapse Menu  --> */}
      <li className="nav-item">
        <div className="nav-link collapsed" href="#" data-toggle="collapse"
          data-target="#collapseVideo" aria-expanded="true" aria-controls="collapseVideo">
          <i className="fas fa-fw fa-video"></i>
          <span>Vídeos</span>
        </div>
        <div id="collapseVideo" className="collapse" aria-labelledby="headingTwo"
          data-parent="#accordionSidebar">
          <div className="bg-white py-2 collapse-inner rounded">
            <h6 className="collapse-header">Opções:</h6>
            <Link className="collapse-item" to={"/videos"}>Listar Vídeos</Link>
            <Link className="collapse-item" to={"/videos/new"}>Cadastrar Vídeo</Link>
          </div>
        </div>
      </li>

      {/* <!--  Nav Item - Pages Collapse Menu  --> */}
      <li className="nav-item">
        <div className="nav-link collapsed" href="#" data-toggle="collapse"
          data-target="#collapsePodcasts" aria-expanded="true" aria-controls="collapsePodcasts">
          <i className="fas fa-fw fa-podcast"></i>
          <span>Podcasts</span>
        </div>
        <div id="collapsePodcasts" className="collapse" aria-labelledby="headingTwo"
          data-parent="#accordionSidebar">
          <div className="bg-white py-2 collapse-inner rounded">
            <h6 className="collapse-header">Opções:</h6>
            <Link className="collapse-item" to={"/podcasts"}>Listar Podcasts</Link>
            <Link className="collapse-item" to={"/podcasts/new"}>Cadastrar Podcast</Link>
          </div>
        </div>
      </li>

      {/* <!--  Nav Item - Pages Collapse Menu  --> */}
      <li className="nav-item">
        <div className="nav-link collapsed" href="#" data-toggle="collapse"
          data-target="#collapseOthers" aria-expanded="true" aria-controls="collapseOthers">
          <i className="fas fa-fw fa-pager"></i>
          <span>Programas</span>
        </div>
        <div id="collapseOthers" className="collapse" aria-labelledby="headingTwo"
          data-parent="#accordionSidebar">
          <div className="bg-white py-2 collapse-inner rounded">
            <h6 className="collapse-header">Opções:</h6>
            <Link className="collapse-item" to={"/programs"}>Listar Itens de Programas</Link>
            <Link className="collapse-item" to={"/programs/new"}>Cadastrar Programa</Link>
          </div>
        </div>
      </li>

      {/* <!--  Divider  --> */}
      <hr className="sidebar-divider" />

      {/* <!--  Heading  --> */}
      <div className="sidebar-heading">
        Itens de página
      </div>

      {/* <!--  Nav Item - Pages Collapse Menu  --> */}
      {/* <li className="nav-item">
        <div className="nav-link collapsed" href="#" data-toggle="collapse"
          data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
          <i className="fas fa-fw fa-cog"></i>
          <span>Artigos</span>
        </div>
        <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
          <div className="bg-white py-2 collapse-inner rounded">
            <h6 className="collapse-header">Opções:</h6>
            <Link className="collapse-item" to={"/articles"}>Listar Artigos</Link>
            <Link className="collapse-item" to={"/articles/new"}>Cadastrar Artigo</Link>
          </div>
        </div>
      </li> */}

      {/* <!--  Nav Item - Pages Collapse Menu  --> */}
      <li className="nav-item">
        <div className="nav-link collapsed" href="#" data-toggle="collapse"
          data-target="#collapseGallery" aria-expanded="true" aria-controls="collapseGallery">
          <i className="fas fa-fw fa-cog"></i>
          <span>Bancos de Imagens</span>
        </div>
        <div id="collapseGallery" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
          <div className="bg-white py-2 collapse-inner rounded">
            <h6 className="collapse-header">Opções:</h6>
            <Link className="collapse-item" to={"/galleries"}>Listar Bancos</Link>
            <Link className="collapse-item" to={"/galleries/new"}>Cadastrar Banco</Link>
          </div>
        </div>
      </li>

      <li className="nav-item">
        <div className="nav-link collapsed" href="#" data-toggle="collapse"
          data-target="#collapseBanner" aria-expanded="true" aria-controls="collapseBanner">
          <i className="fas fa-fw fa-image"></i>
          <span>Banners</span>
        </div>
        <div id="collapseBanner" className="collapse" aria-labelledby="headingTwo"
          data-parent="#accordionSidebar">
          <div className="bg-white py-2 collapse-inner rounded">
            <h6 className="collapse-header">Opções:</h6>
            <Link className="collapse-item" to={"/banners"}>Listar Banners</Link>
            <Link className="collapse-item" to={"/banners/new"}>Cadastrar Banner</Link>
          </div>
        </div>
      </li>

      {/* <!--  Nav Item - Pages Collapse Menu  --> */}
      <li className="nav-item">
        <div className="nav-link collapsed" href="#" data-toggle="collapse"
          data-target="#collapseEditoria" aria-expanded="true" aria-controls="collapseEditoria">
          <i className="fas fa-fw fa-tag"></i>
          <span>Editorias</span>
        </div>
        <div id="collapseEditoria" className="collapse" aria-labelledby="headingTwo"
          data-parent="#accordionSidebar">
          <div className="bg-white py-2 collapse-inner rounded">
            <h6 className="collapse-header">Opções:</h6>
            <Link className="collapse-item" to={"/categories"}>Listar Editorias</Link>
            <Link className="collapse-item" to={"/categories/new"}>Cadastrar Editoria</Link>
          </div>
        </div>
      </li>

      {/* <!--  Divider  --> */}
      <hr className="sidebar-divider" />

      {/* <!--  Heading  --> */}
      <div className="sidebar-heading">
        Perfil
      </div>


      {/* <!--  Nav Item - Pages Collapse Menu  --> */}
      <li className="nav-item">
        <Link className="nav-link" to={"/agency"}>
          <i className="fas fa-fw fa-id-badge"></i>
          <span>Secretaria</span>
        </Link>
      </li>

      <li className="nav-item">
        <div className="nav-link collapsed" href="#" data-toggle="collapse"
          data-target="#collapsePages" aria-expanded="true" aria-controls="collapseEditoria">
          <i className="fas fa-fw fa-id-badge"></i>
          <span>Páginas Internas</span>
        </div>
        <div id="collapsePages" className="collapse" aria-labelledby="headingTwo"
          data-parent="#accordionSidebar">
          <div className="bg-white py-2 collapse-inner rounded">
            <h6 className="collapse-header">Opções:</h6>
            <Link className="collapse-item" to={"/government"}>Governo</Link>
            <Link className="collapse-item" to={"/press"}>Imprensa</Link>
            <Link className="collapse-item" to={"/informacoes-publicas"}>Informações Públicas</Link>
            <Link className="collapse-item" to={"/solicitacao-de-informacao"}>Solicitação de Informações</Link>
          </div>
        </div>
      </li>

      <li className="nav-item">
        <div className="nav-link collapsed" href="#" data-toggle="collapse"
          data-target="#collapseSecretaria" aria-expanded="true" aria-controls="collapseSecretaria">
          <i className="fas fa-fw fa-id-badge"></i>
          <span>Cadastro</span>
        </div>
        <div id="collapseSecretaria" className="collapse" aria-labelledby="headingTwo"
          data-parent="#accordionSidebar">
          <div className="bg-white py-2 collapse-inner rounded">
            <h6 className="collapse-header">Opções:</h6>
            <Link className="collapse-item" to={"/addresses/new"}>Cadastrar Endereço</Link>
            <Link className="collapse-item" to={"/social/new"}>Cadastrar Rede Social</Link>
            <Link className="collapse-item" to={"/phones/new"}>Cadastrar Telefone</Link>
            <Link className="collapse-item" to={"/users/new"}>Cadastrar Usuário</Link>
            <Link className="collapse-item" to={"/government/new"}>Governo</Link>
            <Link className="collapse-item" to={"/press/new"}>Imprensa</Link>
            <Link className="collapse-item" to={"/informacoes-publicas/new"}>Informações Públicas</Link>
            <Link className="collapse-item" to={"/solicitacao-de-informacao/new"}>Solicitação de Informações</Link>
          </div>
        </div>
      </li>

      {/* <!--  Divider  --> */}
      <hr className="sidebar-divider d-none d-md-block" />

      {/* <!--  Sidebar Toggler (Sidebar)  --> */}
      {/* <div className="text-center d-none d-md-inline">
        <button className="rounded-circle border-0" id="sidebarToggle"></button>
      </div> */}

    </ul>
    //   {/* <!--  End of Sidebar  --> */}


  );
}

export default Sidebar;
