import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/shared/models/user';
import { map } from 'rxjs/operators'

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
}

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    AUTH:string = 'http://192.168.1.12:8000/api/auth/'

    constructor(private http: HttpClient,
                private router: Router){}

    login(username: string, password: string){
        return this.http.post<any>(this.AUTH, 
            {username, password}, httpOptions).pipe(
                map(user => {
                    if (user && user.token){
                        localStorage.setItem("currentUser", JSON.stringify(user));
                    }
                    return user;
                })
            );
    }

    logout(){
        localStorage.removeItem('currentUser');
        this.router.navigate(['login']);
    }
}