import React, { Component } from 'react';
import github from "../../api/github";
import { history } from "../../history";

import "./styles.css";

export default class main extends Component {
  state = {
    user: [],
    repos: [],
    followers: [],
    following: []
  }

  backSearch = () => {
    history.push("/select");
  }

  logout = () => {
    localStorage.removeItem("token");
    history.push("/");
  }

  async componentDidMount(){
    const user = localStorage.getItem('user');

    const { data } = await github.get(`/${user}`);
    this.setState({user: data});

    const repositories = await github.get(data.repos_url);
    this.setState({repos: repositories.data});

    const getFollowers = await github.get(data.followers_url);
    this.setState({followers: getFollowers.data});

    const getFollowing = await github.get(`/${user}/following`);
    this.setState({following: getFollowing.data});
  }

  render() {
    const { user, repos, followers, following} = this.state;
    return (
      <div>
        <div className="user-listagem">
          <div className="user-avatar">
            <a href={user.html_url}><img alt="teste" src={user.avatar_url}/></a>
          </div>
          <div className="user-info-container">
            {user.bio != null &&
              <div className="user-bio">
                <p>{user.bio}</p>
              </div>  
            }
            <div className="user-links">
              <div>
                <div className="repositories-div-label"><label>Repositórios</label></div>
                <div className="repositories-div-in">
                  {repos.map(repositories => (
                    <a className="links-artigo" href={`${repositories.html_url}`}>
                      <article className="card-article" key={repositories.id}>
                        <strong>{repositories.name}</strong>
                        <p>{repositories.description}</p>
                      </article>
                    </a>
                  ))}
                </div>
              </div>
              <div>
                <div>
                  <div className="repositories-div-label"><label>Followers</label></div>
                  <div className="repositories-div-in">
                    {followers.map(follow => (
                      <a className="links-artigo" href={`${follow.html_url}`}>
                        <article className="card-article" key={follow.id}>
                          <div>
                            <img alt="teste" className="followers-img" src={follow.avatar_url}/>
                          </div>
                          <div>
                            <strong>{follow.login}</strong>
                            <p>{follow.description}</p>
                          </div>
                        </article>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <div className="repositories-div-label"><label>Following</label></div>
                <div className="repositories-div-in">
                  {following.map(follow => (
                    <a className="links-artigo" href={`${follow.html_url}`}>
                      <article className="card-article" key={follow.id}>
                        <div>
                          <img alt="teste" className="followers-img" src={follow.avatar_url}/>
                        </div>
                        <div>
                          <strong>{follow.login}</strong>
                          <p>{follow.description}</p>
                        </div>
                      </article>
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div className="buttons">
              <button className="search" onClick={this.backSearch}>Pesquisar novamente</button>
              <button className="logout" onClick={this.logout}>Sair</button>
            </div>
          </div>
        </div>
      </div>
    );

  }
}
