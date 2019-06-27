import { Component, OnInit, Input } from '@angular/core';
import { Hero } from "../../models/Hero";
import { ActivatedRoute } from "@angular/router";
import { HeroService } from "./../../services/heroService/hero.service";
import { Location } from "@angular/common";

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {

  hero: Hero

  constructor(
   private route: ActivatedRoute,
   private heroService: HeroService,
   private location: Location
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramsMap => {
      this.getHero(parseInt(paramsMap.get('id')))
    })
  }

  getHero(id: number) {
    this.heroService.getHeroByID(id).subscribe(hero => this.hero = hero)
  }

  goBack() {
    this.location.back()
  }

}
