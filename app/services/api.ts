

class RedubiaApi {
    base_url = process.env.base_api_url!;

    async call(url: string, args?: RequestInit) {
        return fetch(this.base_url + url, { ...args, cache: 'no-cache' })
    }
}



let client: RedubiaApi;
export default function callApi<T>(url: string, factory: (response: Response) => T, args?: RequestInit) {
    if (!client) client = new RedubiaApi();
    return client.call(url, args).then(factory)
}