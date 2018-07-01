class APICaller {
    setToken(_token){
        this.token = _token;
    }
    apiRequest(options) {
        let { url, method, data, headers } = options;
        let newHeaders = Object.assign({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-access-token': this.token
        }, headers);
        return fetch(url, { method: method || "GET", headers: newHeaders, body: data });
    }
    
}
export default new APICaller();
