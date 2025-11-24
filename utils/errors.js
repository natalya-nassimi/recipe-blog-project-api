export class HttpError extends Error {
    constructor(status, message) {
        super(message)
        this.status = status
        this.name = this.constructor.name
    }
}

export class NotFound extends HttpError {
    constructor(message = 'Not Found'){
        super(404, message)
    }
}

export class Forbidden extends HttpError {
    constructor(message = 'Forbidden') {
        super(403, message)
    }
}

export class Unauthorised extends HttpError {
    constructor(message = 'Unauthorised') {
        super(401, message)
    }
}