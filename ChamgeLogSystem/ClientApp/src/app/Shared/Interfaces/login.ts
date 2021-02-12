export interface LoginRequest {
    userName: string;
    password: string;
}

export interface LoginResponse {
    userId : number,
    firstName : string,
    lastName : string,
    userName : string,
    jwtToken : string
}
