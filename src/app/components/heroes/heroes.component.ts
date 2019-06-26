import { HeroService } from '../../services/heroService/hero.service';
import { Hero } from '../../models/Hero';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

  constructor(
    private heroService: HeroService
  ) { }

  ngOnInit() {
    this.getHeroes()
  }

  heroes: Hero[]

  getHeroes() {
    this.heroService.getHeroes().subscribe({
      next: heroesReturned => {
        this.heroes = heroesReturned
      }
    })
  }
}
