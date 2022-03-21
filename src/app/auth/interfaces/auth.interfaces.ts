export interface AuthResponse{
    ok:     true,
    uid?:   string,
    name?:  string,
    token?: string;
    msg:    string;
}
export interface User{
    uid:  string;
    name: string;
}