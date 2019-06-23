import { MessageService } from './../messageService/message.service';
import { Injectable } from '@angular/core';
import { Hero } from "./../../models/Hero";
import { HEROLIST } from "./../../mocks/HeroList";
import {Observable, of } from "rxjs"

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(
    private messageService: MessageService
  ) { }

  getHeroes(): Observable<Hero[]> {
    this.messageService.add('HeroService: fetched heroes!')
    return of(HEROLIST)
  }
}
