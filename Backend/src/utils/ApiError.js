class ApiError  {
    constructor(
        statusCode,
        message = "Something went Wrong",
        errors = [],
        stack = ""
    ){
        
         this.statusCode = statusCode
         this.message = message
         this.errors = errors
         this.success = false

        if(stack) {
            this.stack = stack 
        }else{
            Error.captureStackTrace(this, this.constructor)
        }

    }
}

export {ApiError}