import React, { Component } from 'react';
import './Login.scss';
import api from "../../services/api";
import { login, TOKEN_KEY } from "../../services/auth";

class LoginPage extends Component {

  state = {
    user: {
      email: '',
      password: ''
    },
    error: ''
  }

  handleSignIn = async e => {
    e.preventDefault();

    const { email, password } = this.state.user;
    if (!email || !password) {
      this.setState({
        error:
          "Preencha e-mail e senha para continuar!"
      });
    } else {
      try {
        const response = await api.post("/auth/sign_in", { email, password });
        
        const { client, uid } = response.headers;
        const token = response.headers['access-token'];
        
        login(token, client, uid);
        
        // console.log("Token: "  + token);
        // console.log("client: "  + client);
        // console.log("uid: "  + uid);

        this.props.history.push("/");
      } catch (err) {
        this.setState({
          error:
            "Houve um problema com o login, verifique suas credenciais. T.T"
        });
      }
    }

  };

  render() {
    return (
      <div className="login">
        <div id="bg-gradient-primary" className="bg-gradient-primary">

          <div className="container">

            {/* <!-- Outer Row --> */}
            <div className="row justify-content-center">

              <div className="col-xl-10 col-lg-12 col-md-9">

                <div className="card o-hidden border-0 shadow-lg my-5">
                  <div className="card-body p-0">
                    {/* <!-- Nested Row within Card Body --> */}
                    <div className="row">
                      <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                      <div className="col-lg-6">
                        <div className="p-5">
                          <div className="text-center">
                            
                          {process.env.NODE_ENV === "development" ?
                            <small>You are running this application in <b>{process.env.NODE_ENV}</b> mode.</small>:""}

                            <h1 className="h4 text-gray-900 mb-4">Login</h1>
                          </div>
                          <div className="mb-2">
                            { this.state.error }
                          </div>
                          <form className="user"
                            onSubmit={this.handleSignIn}>
                            <div className="form-group">
                              <input type="email"
                                className="form-control form-control-user"
                                id="email"
                                aria-describedby="emailHelp"
                                placeholder="Enter Email Address..."
                                onChange={e => this.setState({ user: { ...this.state.user, email: e.target.value } })}
                                name="email"
                              // value={this.state.user.email} 
                              />
                            </div>
                            <div className="form-group">
                              <input type="password"
                                className="form-control form-control-user"
                                id="password"
                                placeholder="Password"
                                onChange={e => this.setState({ user: { ...this.state.user, password: e.target.value } })}
                                name="password"
                              // value={this.state.user.password} 
                              />
                            </div>
                            <div className="form-group">
                              <div className="custom-control custom-checkbox small">
                                <input type="checkbox"
                                  className="custom-control-input"
                                  id="customCheck" />
                                <label className="custom-control-label"
                                  htmlFor="customCheck">Remember Me</label>
                              </div>
                            </div>

                            <button
                              type="submit"
                              className="btn btn-primary btn-user btn-block">
                              Login
                            </button>

                          </form>


                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </div>

          </div>




        </div>
      </div>
    );
  }


}

export default LoginPage;
