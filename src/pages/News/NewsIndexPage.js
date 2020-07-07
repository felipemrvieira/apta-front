import React, { Component } from 'react';
import '../pages.scss';
import api from "../../services/api";
import Sidebar from '../../template/Sidebar';
import Topbar from '../../template/Topbar';
import Footer from '../../template/Footer';
import LogoutModal from '../../template/LogoutModal';

import NewTable from '../../components/new/NewTable';

class NewsPage extends Component {
  constructor(props) {
    super(props)
    this.state = { news: [] }
    this.loadNews()
  }

  loadNews = async () => {
    try {
      const response = await api.get("/news");
      this.setState({ ...this.state, news: response.data.data })
      console.log(response.data.data)
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
                  <h1 className="h3 mb-4 text-gray-800">Notícias</h1>
                  <NewTable news={this.state.news} />
                </div>

              </div>
              {/* End of Main Content */}
              <Footer />
            </div>
            {/* <!--  End of Content Wrapper  --> */}
          </div>

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
export default NewsPage;