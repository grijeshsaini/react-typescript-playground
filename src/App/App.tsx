import React from 'react';
import {Route, BrowserRouter} from "react-router-dom";
import {UserList} from "../Components/User/UserList";
import {GithubClient} from "../Api/GithubClient";
import {UserDetails} from "../Components/User/UserDetails";

function App() {
    const gitHubClient = new GithubClient();
  return (
      <BrowserRouter>
        <Route exact path={"/"}>
          <UserList githubClient={gitHubClient}/>
        </Route>
        <Route exact path={"/users/:login"} render={(props) => (
           <UserDetails login={props.match.params.login} githubClient={gitHubClient} />
        )}/>
      </BrowserRouter>
  );
}

export default App;
