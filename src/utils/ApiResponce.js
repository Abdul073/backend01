class ApiResponce {
    constructor(statusCode, data, messsge= "Success"){
        this.statusCode = statusCode
        this.data = data
        this.messsge = messsge
        this.success = statusCode < 400
    }
}

export {ApiResponce}