import { observer } from "mobx-react";
import * as React from "react";
import { Pane } from "../components/Pane";
import { Button, Input } from "../components";
import { Eye } from "react-feather";
import { appStateCtx } from "../lib/AppState";



export const Login: React.FC = observer(() => {
    const [ showPw, setShowPw ] = React.useState<boolean>();
    const app = React.useContext(appStateCtx);

    const [ username, setUsername ] = React.useState<string>();
    const [ password, setPassword ] = React.useState<string>();



    return <Pane style={{ display: "flex", flexDirection: "column", padding: 32 }}>
        <h3>Passwort Manager</h3>
        <Input onChange={e => setUsername(e.target.value)} placeholder="Login" style={{ padding: 12 }}/>
        <Input onChange={e => setPassword(e.target.value)} type={showPw ? "text" : "password"} placeholder="Password" style={{ padding: 12 }}/>
        <div style={{ position: "relative" }}>
            <Eye onClick={() => setShowPw(!showPw)} style={{ position: "absolute", right:27, top: -54, color: "black", cursor: "pointer" }}/>
        </div>
        <div>
            <Button onClick={() => {
                app.api.register({
                    password,
                    username,
                })
            }} variant="primary">Register</Button>
            <Button onClick={() => {
                app.api.login({
                    password,
                    username,
                }).then(e => app.setSession(e.session))
            }}  variant="primary" inverse>Login</Button>
        </div>
    </Pane>
})