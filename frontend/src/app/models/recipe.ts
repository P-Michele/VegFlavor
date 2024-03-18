export class Recipe {
  id: number | undefined;
  title: string;
  description: string;
  instructions: string;
  ingredients: { name: string, quantity: number }[];
  quantities: number[];
  prepTime: number;
  cookTime: number;
  servingSize: number;

  constructor(){
    this.title = '';
    this.description = '';
    this.instructions = '';
    this.quantities = [];
    this.ingredients = [];
    this.prepTime = 0;
    this.cookTime = 0;
    this.servingSize = 0;
  }
}
