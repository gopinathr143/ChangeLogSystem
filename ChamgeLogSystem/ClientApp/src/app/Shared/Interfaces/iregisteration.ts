export interface registerRequest{
    userId: number,
    firstName: string,
    lastName: string,
    userName: string,
    email:string,
    password:string
  }

  export interface registerResponse extends registerRequest{
    
  }