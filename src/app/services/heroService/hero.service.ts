import { MessageService } from './../messageService/message.service';
import { Injectable } from '@angular/core';
import { Hero } from "./../../models/Hero";
import {Observable, of } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroURL = 'api/heroes';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) { }

  /**
   * Get heroes from server
   */
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroURL)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }

  /**
   * get Hero by ID
   * @param id - id of hero
   * @returns Observable<Hero>
   */
  getHeroByID(id: number): Observable<Hero> {
    const url = `${this.heroURL}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero with id = ${id}`)),
      catchError(this.handleError<Hero>(`getHero id = ${id}`))
    )
  }

  /**
   * this function using for update hero.
   * @param hero - hero to be updated
   * @returns - return Observable<any>
   */
  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroURL, hero, this.httpOptions).pipe(
      tap(_ => this.log(`update heroes with id = ${hero.id}`)),
      catchError(this.handleError<any>(`updatehero`))
    )
  }

  /**
   * add message to message service that render messages
   * @param message - message to log
   */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  /**
   * Handle http operation that failed
   * Let the app continue
   * @param operation - name of operator that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      //TODO: log error to console
      console.error(error);
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error}`);
      // let the app keep running by returning an empty result
      return of(result);
    };
  }
}
