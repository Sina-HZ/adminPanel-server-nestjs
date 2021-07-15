export interface UserData {
    username: string;
    email: string;
    token: string;
  }
  
  export interface UserRO {
    user: UserData;
  }

  export interface JwtDecode {
    id: string,
    username: string,
    email: string,
    exp: number,
    iat: number
  }