import { computed, observable } from "mobx";
import * as React from "react";
import { ApiClient } from "./ApiClient";

export const appStateCtx = React.createContext<AppState>(null)

export class AppState {
    @observable
    private session: string;

    @observable
    public passwords: any[];

    @computed
    public get isLoggedIn(): boolean {
        return !!this.session;
    }

    constructor() {
        this.session = localStorage.getItem("session");
    }
    public api = new ApiClient();

    public setSession(session: string): void {
        localStorage.setItem("session", session)
        this.session = session;
    }

    public async loadPasswords() {
        this.passwords = await this.api.getPasswords()
    }


}