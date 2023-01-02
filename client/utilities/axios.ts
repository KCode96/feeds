export function getAxiosConfig(token?: string, limit?: number, offset?: number) {
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: {
            limit,
            offset,
        },
    };
}
