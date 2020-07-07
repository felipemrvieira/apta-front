import React, { Component } from 'react';
import '../pages.scss';
import api from "../../services/api";
import Sidebar from '../../template/Sidebar';
import Topbar from '../../template/Topbar';
import Footer from '../../template/Footer';
import LogoutModal from '../../template/LogoutModal';
import ServicesTable from '../../components/service/ServicesTable';

class ServicesPage extends Component {
  constructor(props) {
    super(props)
    this.state = { services: [] }
    this.loadServices()
  }

  loadServices = async () => {
    try {
      const response = await api.get("/services");
      this.setState({ ...this.state, services: response.data })
    } catch (err) {
      console.log(err);
    }
  }

  render() {

    return (
      <div className="App">
        <div id="page-top">
          {/* <!-- Page Wrapper  --> */}
          <div id="wrapper">
            <Sidebar />
            {/* <!--  Content Wrapper  --> */}
            <div id="content-wrapper" className="d-flex flex-column">

              {/* <!--  Main Content  --> */}
              <div id="content">
                <Topbar />
                {/* <!--  Begin Page Content  --> */}
                <div className="container-fluid">

                  {/* <!--  Page Heading  --> */}
                  <h1 className="h3 mb-4 text-gray-800">Serviços</h1>
                  <ServicesTable services={this.state.services} />

                </div>
                {/*  /.container-fluid  */}

              </div>
              {/* End of Main Content */}

              <Footer />

            </div>
            {/* <!--  End of Content Wrapper  --> */}

          </div>
          {/* <!--  End of Page Wrapper  --> */}

          {/* <!--  Scroll to Top Button --> */}
          <a className="scroll-to-top rounded" href="#page-top">
            <i className="fas fa-angle-up"></i>
          </a>
          <LogoutModal />
        </div>
      </div>
    );
  }
}

export default ServicesPage;
