import { Injectable } from "@angular/core";

@Injectable()

export class TokenService {
    private TOKEN_KEY = `id_token`;
    constructor() { }
    setAccessToken(token: string) {
        localStorage.setItem(this.TOKEN_KEY, token);
    }
    getAccessToken(): string {
        return localStorage.getItem(this.TOKEN_KEY);
    }
}
