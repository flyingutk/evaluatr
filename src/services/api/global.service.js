import { httpClient } from "./base.service";


export function getEnviroment() {
    return httpClient.request({
        // `url` is the server URL that will be used for the request
        url: '/env',
        // `method` is the request method to be used when making the request
        method: 'get', // default

        // `baseURL` will be prepended to `url` unless `url` is absolute.
        // It can be convenient to set `baseURL` for an instance of axios to pass relative URLs
        // to methods of that instance.
        baseURL: 'http://localhost:8080',
        // `headers` are custom headers to be sent
        headers: { "Content-Type": "application/json" },
    })
}