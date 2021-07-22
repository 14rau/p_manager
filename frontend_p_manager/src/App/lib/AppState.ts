import { autorun, computed, observable } from "mobx";
import * as React from "react";
import { ApiClient } from "./ApiClient";

export const appStateCtx = React.createContext<AppState>(null)

export class AppState {
    @observable
    public session: string;

    @observable
    public passwords: any[];

    @computed
    public get isLoggedIn(): boolean {
        return !!this.session;
    }

    constructor() {
        this.session = localStorage.getItem("session");
        autorun(() => {
            this.session;
            if(this.session) {
                setTimeout(() => this.loadPasswords(), 1000);
            }
        });
    }
    public api = new ApiClient(this);

    public setSession(session: string): void {
        localStorage.setItem("session", session)
        this.session = session;
    }

    public async loadPasswords() {
        this.passwords = await this.api.getPasswords()
    }


}