import jwt_decode from 'jwt-decode';

export function decodeToken(token: string) {
    const decoded = jwt_decode<any>(token);
    return decoded.user;
}

export function storeToken(token: string) {
    localStorage.setItem(`token`, JSON.stringify(token));
}

export function removeToken() {
    localStorage.removeItem(`token`);
}

export function getToken(): string {
    const token = JSON.parse(localStorage.getItem('token') as string);
    return token;
}
