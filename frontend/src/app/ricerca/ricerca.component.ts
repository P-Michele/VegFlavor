import { Component } from '@angular/core';

@Component({
  selector: 'app-ricerca',
  standalone: true,
  imports: [],
  templateUrl: './ricerca.component.html',
  styleUrl: './ricerca.component.scss'
})

export class AppComponent {
  title = 'ricerca-ricette';
  public search: string = '';
  public veganrecipes = [
    'Ricetta 1','Ricetta 2','Ricetta 3','Ricetta 4','Ricetta 5',
    'Ricetta 6','Ricetta 7','Ricetta 8','Ricetta 9','Ricetta 10'
  ]
}
export class RicercaComponent {
  public search: string = '';
  public veganrecipes = [
    'Ricetta 1','Ricetta 2','Ricetta 3','Ricetta 4','Ricetta 5',
    'Ricetta 6','Ricetta 7','Ricetta 8','Ricetta 9','Ricetta 10'
  ]
  public searchRecipes() {
    return this.veganrecipes.filter(
      x => x.toLowerCase().includes(this.search.toLowerCase())
    )
  }
  public clearSearch() {
    this.search = '';
  }
}
