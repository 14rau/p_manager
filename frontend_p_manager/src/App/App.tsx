import * as React from "react";
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { appStateCtx } from "./lib/AppState";
import { observer } from "mobx-react";
import { PasswordPage } from "./pages/PasswordPage";
import { Login } from "./pages/Login";


export const App: React.FC = observer(function App(){
    const app = React.useContext(appStateCtx);
    return <Router>
        {app.isLoggedIn ? <Routes>
            <Route path="/">
               <PasswordPage/>
            </Route>
        </Routes> : 
        <Routes>
            <Route path="/">
                <Login/>
            </Route>
        </Routes>
        }
    </Router>
});