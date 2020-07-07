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
        Serviços
      </div>

      {/* <!--  Nav Item - Pages Collapse Menu  --> */}
      <li className="nav-item">
        <div className="nav-link collapsed" href="#" data-toggle="collapse"
          data-target="#collapseNotice" aria-expanded="true" aria-controls="collapseNotice">
          <i className="fas fa-fw fa-cog"></i>
          <span>Serviços</span>
        </div>
        <div id="collapseNotice" className="collapse" aria-labelledby="headingTwo"
          data-parent="#accordionSidebar">
          <div className="bg-white py-2 collapse-inner rounded">
            <h6 className="collapse-header">Opções:</h6>
            <Link className="collapse-item" to={"/services"}>Listar Serviços</Link>
            <Link className="collapse-item" to={"/services/new"}>Cadastrar Serviço</Link>
          </div>
        </div>
      </li>

         {/* <!--  Nav Item - Pages Collapse Menu  --> */}
         <li className="nav-item">
        <div className="nav-link collapsed" href="#" data-toggle="collapse"
          data-target="#collapseEditoria" aria-expanded="true" aria-controls="collapseEditoria">
          <i className="fas fa-fw fa-tag"></i>
          <span>Categorias</span>
        </div>
        <div id="collapseEditoria" className="collapse" aria-labelledby="headingTwo"
          data-parent="#accordionSidebar">
          <div className="bg-white py-2 collapse-inner rounded">
            <h6 className="collapse-header">Opções:</h6>
            <Link className="collapse-item" to={"/categories"}>Listar Categorias</Link>
            <Link className="collapse-item" to={"/categories/new"}>Cadastrar Categoria</Link>
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
