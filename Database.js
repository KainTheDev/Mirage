let { default: fetch } = require("node-fetch")
module.exports = class Database{
    /**
     * @param {String} key key of the data
     * @param {Number} value value of the data
     * @returns {Database}
     **/
    async execute(method, key, value) {
        let response = await fetch(`https://database-api.soulviral.repl.co/${method}${key ? `?key=${key}` : ""}${value ? `&value=${value}` : ""}`)
        let data = await response.json()
        return data
    }
    /**
     * @param {String} key key of the data
     * @param {Number} value value of the data
     * @returns {Database}
     **/
    async get(key) {
        let data = await this.execute(this.get.name, key)
        if(data.error) data = false
        return data.value;
    }
    async get_all() {
        let data = await this.execute(this.get_all.name.replace("_", "/"))
        if(data.error) data = false
        return data;
    }
    /**
     * @param {String} key key of the data
     * @param {Number} value value of the data
     * @returns {Database}
     **/
    async set(key, value) {
        let data = await this.execute(this.set.name, key, value)
        if(data.error) data = false
        return data;
    }
    /**
     * @param {String} key key of the data
     * @param {Number} value value of the data
     * @returns {Database}
     **/
    async delete(key) {
        let data = await this.execute(this.delete.name, key)
        if(data.error) data = false
        return data;
    }
    async delete_all() {
        let data = await this.execute(this.delete_all.name.replace("_", "/"))
        if(data.error) data = false
        return data;
    }
}