import React from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";

import { isAuthenticated } from "./services/auth";

import AddressesNewPage from './pages/Addresses/AddressesNewPage';
import AddressesEditPage from './pages/Addresses/AddressesEditPage';

import AgencyShowPage from './pages/Agency/AgencyShowPage';
import AgencyEditPage from './pages/Agency/AgencyEditPage';

import PressShowPage from './pages/Press/PressShowPage';
import PressNewPage from './pages/Press/PressNewPage';
import PressEditPage from './pages/Press/PressEditPage';

import GovernmentShowPage from './pages/Government/GovernmentShowPage';
import GovernmentNewPage from './pages/Government/GovernmentNewPage';
import GovernmentEditPage from './pages/Government/GovernmentEditPage';

import ArticlesIndexPage from './pages/Articles/ArticlesIndexPage';
import ArticlesNewPage from './pages/Articles/ArticlesNewPage';
import ArticlesEditPage from './pages/Articles/ArticlesEditPage';
import ArticlesShowPage from './pages/Articles/ArticlesShowPage';

import BannersIndexPage from './pages/Banners/BannersIndexPage';
import BannersNewPage from './pages/Banners/BannersNewPage';
import BannersShowPage from './pages/Banners/BannersShowPage';
import BannersEditPage from './pages/Banners/BannersEditPage';

import CategoriesIndexPage from './pages/Categories/CategoriesIndexPage';
import CategoriesNewPage from './pages/Categories/CategoriesNewPage';
import CategoriesShowPage from './pages/Categories/CategoriesShowPage';
import CategoriesEditPage from './pages/Categories/CategoriesEditPage';

import GalleriesIndexPage from './pages/Galleries/GalleriesIndexPage';
import GalleriesNewPage from './pages/Galleries/GalleriesNewPage';
import GalleriesShowPage from './pages/Galleries/GalleriesShowPage';
import GalleriesEditPage from './pages/Galleries/GalleriesEditPage';

import NewsIndexPage from './pages/News/NewsIndexPage';
import NewsNewPage from './pages/News/NewsNewPage';
import NewsShowPage from './pages/News/NewsShowPage';
import NewsEditPage from './pages/News/NewsEditPage';

import PhonesNewPage from './pages/Phones/PhonesNewPage';
import PhonesEditPage from './pages/Phones/PhonesEditPage';

import PhotosIndexPage from './pages/Photos/PhotosIndexPage';
import PhotosNewPage from './pages/Photos/PhotosNewPage';
import PhotosShowPage from './pages/Photos/PhotosShowPage';
import PhotosEditPage from './pages/Photos/PhotosEditPage';

import PodcastsIndexPage from './pages/Podcasts/PodcastsIndexPage';
import PodcastsNewPage from './pages/Podcasts/PodcastsNewPage';
import PodcastsShowPage from './pages/Podcasts/PodcastsShowPage';
import PodcastsEditPage from './pages/Podcasts/PodcastsEditPage';

import ProgramsIndexPage from './pages/Programs/ProgramsIndexPage';
import ProgramsNewPage from './pages/Programs/ProgramsNewPage';
import ProgramsShowPage from './pages/Programs/ProgramsShowPage';
import ProgramsEditPage from './pages/Programs/ProgramsEditPage';

import SicsPublicNewPage from './pages/SicsPublic/SicsPublicNewPage';
import SicsPublicShowPage from './pages/SicsPublic/SicsPublicShowPage';
import SicsPublicEditPage from './pages/SicsPublic/SicsPublicEditPage';

import SicsNewPage from './pages/SicsRequest/SicsNewPage';
import SicsShowPage from './pages/SicsRequest/SicsShowPage';
import SicsEditPage from './pages/SicsRequest/SicsEditPage';

import SocialNewPage from './pages/Social/SocialNewPage';
import SocialEditPage from './pages/Social/SocialEditPage';

import VideosIndexPage from './pages/Videos/VideosIndexPage';
import VideosNewPage from './pages/Videos/VideosNewPage';
import VideosShowPage from './pages/Videos/VideosShowPage';
import VideosEditPage from './pages/Videos/VideosEditPage';

import UsersIndexPage from './pages/Users/UsersIndexPage';
import UsersNewPage from './pages/Users/UsersNewPage';
import UsersShowPage from './pages/Users/UsersShowPage';
import UsersEditPage from './pages/Users/UsersEditPage';

import LoginPage from './pages/Login/LoginPage';


const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
          <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
        )
    }
  />
);

const Routes = () => (

  <HashRouter>
    <Switch>

      <PrivateRoute path="/" exact={true} component={NewsIndexPage} />

      {/* Addresses */}
      <PrivateRoute path="/addresses/new" exact={true} component={AddressesNewPage} />
      <PrivateRoute path="/addresses/edit/:id" exact={true} component={AddressesEditPage} />
      {/* Addresses */}
      {/* Agency */}
      <PrivateRoute path="/agency" exact={true} component={AgencyShowPage} />
      <PrivateRoute path="/agency/edit/:id" exact={true} component={AgencyEditPage} />
      {/* Agency */}
      {/* Press */}
      <PrivateRoute path="/press" exact={true} component={PressShowPage} />
      <PrivateRoute path="/press/new" exact={true} component={PressNewPage} />
      <PrivateRoute path="/press/edit/:id" exact={true} component={PressEditPage} />
      {/* Press */}
      {/* Government */}
      <PrivateRoute path="/government" exact={true} component={GovernmentShowPage} />
      <PrivateRoute path="/government/new" exact={true} component={GovernmentNewPage} />
      <PrivateRoute path="/government/edit/:id" exact={true} component={GovernmentEditPage} />
      {/* Government */}
      {/* Articles */}
      <PrivateRoute path="/articles" exact={true} component={ArticlesIndexPage} />
      <PrivateRoute path="/articles/new" exact={true} component={ArticlesNewPage} />
      <PrivateRoute path="/articles/:id" exact={true} component={ArticlesShowPage} />
      <PrivateRoute path="/articles/edit/:id" exact={true} component={ArticlesEditPage} />
      {/* Articles */}
      {/* Banners */}
      <PrivateRoute path="/banners" exact={true} component={BannersIndexPage} />
      <PrivateRoute path="/banners/new" exact={true} component={BannersNewPage} />
      <PrivateRoute path="/banners/:id" exact={true} component={BannersShowPage} />
      <PrivateRoute path="/banners/edit/:id" exact={true} component={BannersEditPage} />
      {/* Banners */}
      {/* Categories */}
      <PrivateRoute path="/categories" exact={true} component={CategoriesIndexPage} />
      <PrivateRoute path="/categories/new" exact={true} component={CategoriesNewPage} />
      <PrivateRoute path="/categories/:id" exact={true} component={CategoriesShowPage} />
      <PrivateRoute path="/categories/edit/:id" exact={true} component={CategoriesEditPage} />
      {/* Categories */}
      {/* Galleries */}
      <PrivateRoute path="/galleries" exact={true} component={GalleriesIndexPage} />
      <PrivateRoute path="/galleries/new" exact={true} component={GalleriesNewPage} />
      <PrivateRoute path="/galleries/:id" exact={true} component={GalleriesShowPage} />
      <PrivateRoute path="/galleries/edit/:id" exact={true} component={GalleriesEditPage} />
      {/* Galleries */}
      {/* News */}
      <PrivateRoute path="/news" exact={true} component={NewsIndexPage} />
      <PrivateRoute path="/news/new" exact={true} component={NewsNewPage} />
      <PrivateRoute path="/news/:id" exact={true} component={NewsShowPage} />
      <PrivateRoute path="/news/edit/:id" exact={true} component={NewsEditPage} />
      {/* News */}
      {/* Fotos */}
      <PrivateRoute path="/photos" exact={true} component={PhotosIndexPage} />Sics
      <PrivateRoute path="/photos/new" exact={true} component={PhotosNewPage} />
      <PrivateRoute path="/photos/:id" exact={true} component={PhotosShowPage} />
      <PrivateRoute path="/photos/edit/:id" exact={true} component={PhotosEditPage} />
      {/* Fotos */}
      {/* Telefones */}
      <PrivateRoute path="/phones/new" exact={true} component={PhonesNewPage} />
      <PrivateRoute path="/phones/edit/:id" exact={true} component={PhonesEditPage} />
      {/* Telefones */}
      {/* Podcasts */}
      <PrivateRoute path="/podcasts" exact={true} component={PodcastsIndexPage} />
      <PrivateRoute path="/podcasts/new" exact={true} component={PodcastsNewPage} />
      <PrivateRoute path="/podcasts/:id" exact={true} component={PodcastsShowPage} />
      <PrivateRoute path="/podcasts/edit/:id" exact={true} component={PodcastsEditPage} />
      {/* Podcasts */}
      {/* Programas */}
      <PrivateRoute path="/programs" exact={true} component={ProgramsIndexPage} />
      <PrivateRoute path="/programs/new" exact={true} component={ProgramsNewPage} />
      <PrivateRoute path="/programs/:id" exact={true} component={ProgramsShowPage} />
      <PrivateRoute path="/programs/edit/:id" exact={true} component={ProgramsEditPage} />
      {/* Programas */}
      {/* SICS Informações Públicas */}
      <PrivateRoute path="/informacoes-publicas/new" exact={true} component={SicsPublicNewPage} />
      <PrivateRoute path="/informacoes-publicas" exact={true} component={SicsPublicShowPage} />
      <PrivateRoute path="/informacoes-publicas/edit/:id" exact={true} component={SicsPublicEditPage} />
      {/* SICS */}
      {/* SICS Solicitação de Informações */}
      <PrivateRoute path="/solicitacao-de-informacao/new" exact={true} component={SicsNewPage} />
      <PrivateRoute path="/solicitacao-de-informacao" exact={true} component={SicsShowPage} />
      <PrivateRoute path="/solicitacao-de-informacao/edit/:id" exact={true} component={SicsEditPage} />
      {/* SICS */}
      {/* SICS */}
      <PrivateRoute path="/social/new" exact={true} component={SocialNewPage} />
      <PrivateRoute path="/social/edit/:id" exact={true} component={SocialEditPage} />
      {/* SICS */}
      {/* Videos */}
      <PrivateRoute path="/videos" exact={true} component={VideosIndexPage} />
      <PrivateRoute path="/videos/new" exact={true} component={VideosNewPage} />
      <PrivateRoute path="/videos/:id" exact={true} component={VideosShowPage} />
      <PrivateRoute path="/videos/edit/:id" exact={true} component={VideosEditPage} />
      {/* Videos */}
      {/* Users */}
      <PrivateRoute path="/users" exact={true} component={UsersIndexPage} />
      <PrivateRoute path="/users/new" exact={true} component={UsersNewPage} />
      <PrivateRoute path="/users/:id" exact={true} component={UsersShowPage} />
      <PrivateRoute path="/users/edit/:id" exact={true} component={UsersEditPage} />
      {/* Users */}
      {/* Login */}
      <Route path="/login" exact={true} component={LoginPage} />
      {/* Login */}



    </Switch>
  </HashRouter>
);

export default Routes;
