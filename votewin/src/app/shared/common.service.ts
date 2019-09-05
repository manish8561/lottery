import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService implements CanActivate {
  public isloggedIn = false;
  public loggedUser: any = {};
  public login_token = '';
  private message = '';
  constructor(private http: HttpClient, private router: Router) {
    if (localStorage.getItem('isLoggedin')) {
      this.isloggedIn = false;
    }
  }
  canActivate() {
    if (localStorage.getItem('isLoggedin')) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
  private formatErrors(error: any) {

    if (error.status === 401) {
      // navigate /delete cookies or whatever
      console.log('handled error ' + error.status);
      // this.router.navigate(['/login']);
      localStorage.removeItem('isLoggedin');
      localStorage.removeItem('user');
      localStorage.removeItem('login_token');
      document.location.reload();
      // this.router.navigate(['/']);
      // return false;
      // if you've caught / handled the error, you don't want to rethrow it
      // unless you also want downstream consumers to have to handle it as well.

    }
    return throwError(error.error);
  }

  get(path: string): Observable<any> {

    if (this.login_token != '') {
      const headers = new HttpHeaders({ 'authorization': 'Token ' + this.login_token });

      return this.http.get(`${environment.api_url}${path}`, { headers: headers })
        .pipe(catchError(this.formatErrors));
    } else {
      return this.http.get(`${environment.api_url}${path}`)
        .pipe(catchError(this.formatErrors));
    }

  }

  post(path: string, body: Object = {}): Observable<any> {
    if (this.login_token != '') {
      const headers = new HttpHeaders({
        'authorization': 'Token ' + this.login_token,
        'Content-Type': 'application/json; charset=utf-8'
      });

      return this.http.post(
        `${environment.api_url}${path}`,
        JSON.stringify(body),
        { headers: headers }
      ).pipe(catchError(this.formatErrors));
    } else {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
      return this.http.post(
        `${environment.api_url}${path}`,
        JSON.stringify(body),
        { headers: headers }
      ).pipe(catchError(this.formatErrors));
    }
  }

  fileUpload(path: string, formData: FormData): Observable<any> {

    if (this.login_token !== '') {
      const headers = new HttpHeaders({
        'authorization': 'Token ' + this.login_token,
        'Content-Type': 'multipart/form-data; charset=utf-8;boundary=***someboundary***'
      });

      return this.http.post(
        `${environment.api_url}${path}`,
        formData
      ).pipe(catchError(this.formatErrors));
    } else {
      const headers = new HttpHeaders({ 'Content-Type': 'multipart/form-data; charset=utf-8;boundary=***someboundary***' });
      return this.http.post(
        `${environment.api_url}${path}`,
        formData
      ).pipe(catchError(this.formatErrors));
    }
  }


  delete(path: string): Observable<any> {
    if (this.login_token !== '') {
      const headers = new HttpHeaders({ 'authorization': 'Token ' + this.login_token });

      return this.http.delete(`${environment.api_url}${path}`, { headers: headers })
        .pipe(catchError(this.formatErrors));
    } else {
      return this.http.delete(`${environment.api_url}${path}`)
        .pipe(catchError(this.formatErrors));
    }

  }
  put(path: string, body: Object = {}): Observable<any> {
    if (this.login_token != '') {
      const headers = new HttpHeaders({
        'authorization': 'Token ' + this.login_token,
        'Content-Type': 'application/json; charset=utf-8'
      });

      return this.http.put(
        `${environment.api_url}${path}`,
        JSON.stringify(body),
        { headers: headers }
      ).pipe(catchError(this.formatErrors));
    } else {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
      return this.http.put(
        `${environment.api_url}${path}`,
        JSON.stringify(body),
        { headers: headers }
      ).pipe(catchError(this.formatErrors));
    }
  }

  changeMessage(string: string) {
    this.message = string;
  }
  getMessage() {
    if (this.message !== '') {
      const m = this.message;
      this.message = '';
      return m;
    } else {
      return false;
    }
  }
  login() {
    this.isloggedIn = true;
    this.loggedUser = { name: 'manish' };
  }
  logout() {
    this.isloggedIn = false;
    this.loggedUser = {};
  }
}
