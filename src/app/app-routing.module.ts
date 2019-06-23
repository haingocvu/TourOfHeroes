import { RouterModule, Routes } from "@angular/router"
import { NgModule } from '@angular/core';
import { HeroesComponent } from "./components/heroes/heroes.component"
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'heroes',
    component: HeroesComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  }
]

// you must initialize th router and start it listening

@NgModule({
  // we dont declared the component so we'll remove these line
  // declarations: [],
  // imports: [
  //   CommonModule
  // ]
  // Add an @NgModule.exports array with RouterModule in it. 
  // Exporting RouterModule makes router directives available for use 
  // in the AppModule components that will need them.
  imports: [RouterModule.forRoot(routes)],
  // always exported RouterModule for appRoutingModule????
  exports: [RouterModule]
})

export class AppRoutingModule { }
