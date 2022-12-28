import jwt_decode from 'jwt-decode';

export function decodeToken(token: string) {
    const decoded = jwt_decode<any>(token);

    if (!decoded.user) return;
    
    return decoded.user;
}

export function storeToken(token: string) {
    localStorage.setItem(`token`, JSON.stringify(token));
}

export function removeToken() {
    localStorage.removeItem(`token`);
}

export function getToken() {
    const item = localStorage.getItem('token');
    if (item == undefined) return;

    const token = JSON.parse(item);
    return token;
}
