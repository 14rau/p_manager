import * as React from "react";

import { clipboard } from "electron";
import { observer } from "mobx-react";

import toast from "react-hot-toast";
import styled from "styled-components";
import { appStateCtx } from "../lib/AppState";
import { Content, Sidebar } from "../components/Layout";
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import { Formik } from "formik";
import { LogOut, Minus, Plus, Trash, Shuffle, Clipboard } from "react-feather";
import { Outlet } from "react-router";
import { Button, Input } from "../components";

export const PasswordPage: React.FC = observer(function PasswordPage(){
    const app = React.useContext(appStateCtx);

    const [ showForm, setShowForm ] = React.useState(false);

    return <div>
       <div style={{ display: "flex", overflow: "hidden" }}>
            <Content>
                <div>
                    <Button onClick={() => app.setSession("")} size="x0" variant="danger">
                        <LogOut/>
                    </Button>
                    <Button variant="success" size="x0" onClick={() => setShowForm(e => !e)}>
                        {showForm ? <Minus/> : <Plus/>}
                    </Button>
                </div>
                <div style={{ height: "100%" }} className="ag-theme-alpine-dark">
                    <AgGridReact
                        defaultColDef={{
                            resizable: true,
                        }}
                        onCellValueChanged={async e => {
                            await app.api.updatePassword({ password: e.data.password, login_name: e.data.login_name, application: e.data.application })
                        }}
                        rowData={app.passwords}
                        frameworkComponents={{
                            "password": function password(params) {
                                return <div style={{ display: "flex" }}><BluryTitle>{params.value}</BluryTitle>&nbsp;<Button size="x0" onClick={() => {
                                    clipboard.writeText(params.value)
                                    toast("Passwort kopiert!");
                                }}><Clipboard size={16}/></Button></div>
                            },
                            "name": function name(params) {
                                return <div style={{ display: "flex" }}>
                                    <div style={{ flex: "1 1 80%" }}>{params.value}</div>&nbsp;
                                    <Button size="x0" onClick={() => {
                                        clipboard.writeText(params.value);
                                        toast("Name kopiert!");
                                    }}><Clipboard size={16}/></Button>
                                </div>
                            },
                            "Delete": function Delete(params) {
                                return <Button inverse size="x0" onClick={async () => {
                                        await app.api.delete({ id: params.data.id });
                                        app.loadPasswords();
                                    }}><Trash size={16}/></Button>
                                
                            },
                        }}
                    >
                        <AgGridColumn cellRenderer="Delete" field="id" headerName=""/>
                        <AgGridColumn cellRenderer="app" field="application" headerName="Webseite"/>
                        <AgGridColumn editable cellRenderer="password" field="password" headerName="Passwort"/>
                        <AgGridColumn flex={1} cellRenderer="name" editable field="login_name" headerName="Name"/>
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
            <Input value={formik.values.application} onChange={(e) => formik.setFieldValue("application", e.target.value)}/>
            <label>Login</label>
            <Input value={formik.values.login_name} onChange={(e) => formik.setFieldValue("login_name", e.target.value)}/>
            <label>Password</label>
            <div style={{ position: "relative" }}>
                <Input value={formik.values.password} onChange={(e) => formik.setFieldValue("password", e.target.value)}/>
                <Button style={{ position: "absolute", right: 0, top: 0 }} size="x0" onClick={() => {
                    const id = genPassword(16)
                    formik.setFieldValue("password", id);
                }}>
                    <Shuffle/>
                </Button>
            </div>
            <Button disabled={formik.isSubmitting} onClick={() => formik.handleSubmit()}>Speichern</Button>
        </>}
    </Formik>
}
// https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
function genPassword(length: number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!"§$%&/()=?;:_,.-#+*~><|';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}


const BluryTitle: any = styled.div`
filter: blur(8px);
transition: .3s;
:hover {
	filter: blur(0px);
}
flex: 1 1 80%;
`;