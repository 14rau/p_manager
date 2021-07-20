import * as React from "react";
import { Login } from "./modules";
import { HashRouter as Router, Outlet, Route, Routes } from 'react-router-dom';
import { appStateCtx } from "./lib/AppState";
import { observer } from "mobx-react";
import styled from "styled-components";
import {AgGridColumn, AgGridReact} from 'ag-grid-react';
import { LogOut, Minus, Plus } from "react-feather";
import { Button, Input } from "./components";
import { Formik } from "formik";

export const App: React.FC = observer(function App(){
    const app = React.useContext(appStateCtx);
    return <Router>
        {app.isLoggedIn ? <Routes>
            <Route path="/">
               <InnerApp/>
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




const Sidebar = styled.div`
border-left: 1px solid #ddd;
background-color: ${props => props.theme["panelBackground"]};
flex: 1 1 30%;
max-width: 250px;
height: 100vh;
`

const Content = styled.div`
background-color: ${props => props.theme["appBg"]};
flex: 1 1 70%;
height: 100vh;
`

export const InnerApp: React.FC = observer(function InnerApp(){
    const app = React.useContext(appStateCtx);

    const [ showForm, setShowForm ] = React.useState(false);

    React.useEffect(() => {
        app.loadPasswords();
    }, []);

    return <div>
       <div style={{ display: "flex", overflow: "hidden" }}>
            <Content>
                <div>
                    <Button size="x0" variant="danger">
                        <LogOut/>
                    </Button>
                    <Button variant="success" size="x0" onClick={() => setShowForm(e => !e)}>
                        {showForm ? <Minus/> : <Plus/>}
                    </Button>
                </div>
                <div style={{ height: "100%" }} className="ag-theme-alpine-dark">
                    <AgGridReact
                        onCellValueChanged={async e => {
                            await app.api.updatePassword({ password: e.data.password, login_name: e.data.login_name, application: e.data.application })
                        }}
                        rowData={app.passwords}
                        frameworkComponents={{
                            "password": function password(params) {
                                return <BluryTitle>{params.value}</BluryTitle>
                            }
                        }}
                    >
                        <AgGridColumn cellRenderer="app" field="application" headerName="Webseite"/>
                        <AgGridColumn editable cellRenderer="password" field="password" headerName="Passwort"/>
                        <AgGridColumn editable field="login_name" headerName="Name"/>
                    </AgGridReact>
                </div>
            </Content>
            {showForm && <Sidebar>
                <PasswordForm onClose={() => {
                    setShowForm(false);
                    app.loadPasswords();
                }}/>
            </Sidebar>}
       </div>
       <Outlet/>
    </div>
});

const PasswordForm: React.FC<{onClose: () => void}> = ({ onClose }) => {
    const app = React.useContext(appStateCtx);
    return <Formik
        initialValues={{
            application: "",
            password: "",
            login_name: "",
        }}
        onSubmit={async(e) => {
            await app.api.updatePassword({
                application: e.application,
                login_name: e.login_name,
                password: e.password,
            });
            onClose();
        }}
    >
        {formik => <>
            <label>Webseite</label>
            <Input onChange={(e) => formik.setFieldValue("application", e.target.value)}/>
            <label>Login</label>
            <Input onChange={(e) => formik.setFieldValue("login_name", e.target.value)}/>
            <label>Password</label>
            <Input onChange={(e) => formik.setFieldValue("password", e.target.value)}/>
            <Button disabled={formik.isSubmitting} onClick={() => formik.handleSubmit()}>Speichern</Button>
        </>}
    </Formik>
}


const BluryTitle: any = styled.div`
filter: blur(8px);
transition: .3s;
:hover {
	filter: blur(0px);
}
`;