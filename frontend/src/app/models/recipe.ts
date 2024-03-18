export class Recipe {
  id: number | undefined;
  title !: string;
  description !: string;
  instructions !: string;
  ingredients !: { name: string, quantity: number }[];
  prepTime !: number;
  cookTime !: number;
  servingSize !: number;
  selectedFile !: File;

  constructor(){
    this.title = '';
    this.description = '';
    this.instructions = '';
    this.ingredients = [];
  }

}
