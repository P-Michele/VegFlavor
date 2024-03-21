
export class Recipe {
  id!: number ;
  title !: string;
  description !: string;
  instructions !: string;
  ingredients !: { name: string, quantity: number }[];
  prepTime !: number;
  cookTime !: number;
  servingSize !: number;
  imageName !: string;

  constructor(){
    this.title = '';
    this.description = '';
    this.instructions = '';
    this.ingredients = [];
    this.imageName = '';
  }

}
