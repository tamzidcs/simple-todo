
export abstract class CustomError extends Error {
    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, CustomError.prototype);
    }
    abstract statusCode: number;
    abstract serialize(): {message: string};
}

export class NotFoundError extends CustomError {
    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, NotFoundError.prototype)
    }
    statusCode = 404;
    serialize() {
        return {message: this.message}
    }
}

export class BadRequestError extends CustomError {
    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, BadRequestError.prototype)
    }
    statusCode = 400;
    serialize() {
        return {message: this.message}
    }
}

export class AuthenticationError extends CustomError {
    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, AuthenticationError.prototype)
    }
    statusCode = 403;
    serialize() {
        return {message: this.message}
    }
}