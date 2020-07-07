import React, { Component } from 'react';
import '../pages.scss';
import api from "../../services/api";
import Sidebar from '../../template/Sidebar';
import Topbar from '../../template/Topbar';
import Footer from '../../template/Footer';
import LogoutModal from '../../template/LogoutModal';
import Article from '../../components/article/Article';

import ArticlesTable from '../../components/article/ArticlesTable';

class ArticlesPage extends Component {
  constructor(props) {
    super(props)
    this.state = { articles: [] }
    this.loadArticles()
  }

  loadArticles = async () => {
    try {
      const response = await api.get("/articles");
      this.setState({ ...this.state, articles: response.data })
    } catch (err) {
      console.log(err);
    }
  }

  renderArticles() {
    const articlesList = this.state.articles || []

    return articlesList.map(article => (
      <Article key={article.id} article={article} deleteArticle={this.deleteArticle} />
    ))
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
                  <h1 className="h3 mb-4 text-gray-800">Artigos</h1>
                  <ArticlesTable articles={this.state.articles} />

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

export default ArticlesPage;
