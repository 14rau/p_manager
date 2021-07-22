import axios, { AxiosInstance } from "axios";
import { AppState } from "./AppState";

export class ApiClient {
    private instance: AxiosInstance;
    constructor(private app: AppState) {
        this.instance = axios.create({
            baseURL: 'http://192.168.2.111:3001',
            timeout: 1000,
            headers: {
                'session': this.app.session,
                "content-type": "application/json",
                "Content-Security-Policy": "default-src * 'unsafe-inline' 'unsafe-eval'; script-src * 'unsafe-inline' 'unsafe-eval'; connect-src * 'unsafe-inline'; img-src * data: blob: 'unsafe-inline'; frame-src *; style-src * 'unsafe-inline';"
            },
          });
    }

    public async register(options: { password: string, username: string }) {
        return (await this.instance.post("/register", {
            ...options
        })).data;
    }

    public async login(options: { password: string, username: string }) {
        return (await this.instance.post("/login", {
            ...options
        })).data;
    }

    public async delete(options: { id: string }) {
        return (await this.instance.delete(`/passwords/${options.id}`)).data;
    }

    public async getPasswords() {
        return (await this.instance.get("/passwords")).data;
    }

    public async updatePassword(options: { password: string, login_name: string, application: string }) {
        return (await this.instance.post("/passwords", options)).data;
    }

}