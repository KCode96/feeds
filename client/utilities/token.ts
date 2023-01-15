import jwt_decode from 'jwt-decode';

export function decodeToken(token: string) {
    const decoded = jwt_decode<any>(token);

    if (!decoded.user) return;

    return decoded.user;
}

export function storeToken(token: string) {
    if (!token) return;

    localStorage.setItem(`token`, JSON.stringify(token));
}

export function removeToken() {
    localStorage.removeItem(`token`);
}

export function getToken() {
    if (typeof window == 'undefined') return;

    const item = localStorage.getItem('token');
    if (!item) return;

    const token = JSON.parse(item);
    return token;
}
