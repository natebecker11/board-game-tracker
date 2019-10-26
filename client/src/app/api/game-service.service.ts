import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class GameServiceService {

  constructor(
    private _http: HttpClient
  ) {
   }

  private _baseUrl: string = "http://localhost:3000/Game/";

  public ListByName(searchText: string): Observable<any> {
    const url = this._baseUrl + "listByName/" + searchText;
    //
    return this._http.get(url, null).pipe(
      map((response: any) => (response)),
      catchError(this.HandleError)
    );
  }

  private HandleError(error: any): Observable<never>
  {
    console.error(error);
    return throwError(error.error || "Server error");
  }
}
