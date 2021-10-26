import React from 'react';
import {Route, BrowserRouter} from "react-router-dom";
import {Repos} from "../Components/Repos/Repos";
import {UserList} from "../Components/User/UserList";
import {GithubClient} from "../Api/GithubClient";

function App() {
    const gitHubClient = new GithubClient();
  return (
      <BrowserRouter>
        <Route exact path={"/"}>
          <UserList githubClient={gitHubClient}/>
        </Route>
        <Route exact path={"/users/:login"}>
          <Repos/>
        </Route>
      </BrowserRouter>
  );
}

export default App;
