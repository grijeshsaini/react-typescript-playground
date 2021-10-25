import React from 'react';
import {Route, BrowserRouter} from "react-router-dom";
import {Repos} from "../Components/Repos/Repos";
import {User} from "../Components/User/User";

function App() {
  return (
      <BrowserRouter>
        <Route exact path={"/"}>
          <User/>
        </Route>
        <Route exact path={"/user/repos"}>
          <Repos/>
        </Route>
      </BrowserRouter>
  );
}

export default App;
