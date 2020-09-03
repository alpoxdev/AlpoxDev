// 400
export const BadRequest = (message: any) => message;

// 401
export const NoAuthorization = () => `Authorization Failure`;
export const NoPermission = (message: string = null) =>
    `Authroization Failure : ${message ? `${message}` : ''}`;

// 404
export const NotFound = (object: string) => `NotFound Error : ${object}`;
