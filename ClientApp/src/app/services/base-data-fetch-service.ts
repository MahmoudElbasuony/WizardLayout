import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, retry } from 'rxjs/operators';

export class BaseDataFetchService {

    protected baseUrl: string;

    constructor(protected http: HttpClient, protected BASE_URL: string) {
        this.baseUrl = `${BASE_URL}` + 'api/';
    }


    protected get<T>(path, id: any): Observable<T> {
        return this.http.get<T>(`${path}${id}`);
    }

    protected getAll<T>(path) {
        return this.http.get<T[]>(`${path}`);
    }

    protected create<T>(path, body) {
        return this.http.post<T>(`${path}`, body);
    }

    protected update<T>(path, id, body) {
        return this.http.put<T>(`${path}${id}`, body);
    }

    protected delete<T>(path, id: any) {
        return this.http.delete<T>(`${path}${id}`);
    }


}