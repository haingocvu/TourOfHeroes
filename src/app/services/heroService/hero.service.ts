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

  // getHeroByID(id: number): Observable<Hero> {
  //   return of(HEROLIST.find(hero => hero.id === id))
  // }

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
