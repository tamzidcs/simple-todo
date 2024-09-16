
export abstract class CustomError extends Error {
    statusCode: number;
    constructor(message: string,statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, CustomError.prototype);
    }
    abstract serialize(): {message: string};
}

export class NotFoundError extends CustomError {
    constructor(message: string,statusCode: number) {
        super(message,statusCode);
        Object.setPrototypeOf(this, NotFoundError.prototype)
    }
    statusCode = 404;
    serialize() {
        return {message: this.message}
    }
}

export class BadRequestError extends CustomError {
    constructor(message: string,statusCode: number) {
        super(message,statusCode);
        Object.setPrototypeOf(this, BadRequestError.prototype)
    }
    statusCode = 400;
    serialize() {
        return {message: this.message}
    }
}

export class AuthenticationError extends CustomError {
    constructor(message: string,statusCode: number) {
        super(message,statusCode);
        Object.setPrototypeOf(this, AuthenticationError.prototype)
    }
    statusCode = 403;
    serialize() {
        return {message: this.message}
    }
}

export class DatabaseError extends CustomError {
    constructor(message: string, statusCode: number) {
        super(message,statusCode);
        Object.setPrototypeOf(this, DatabaseError.prototype)
    }
    serialize() {
        return {message: this.message}
    }
}