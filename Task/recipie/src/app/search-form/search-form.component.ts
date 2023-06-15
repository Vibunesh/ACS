import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent {
  searchTerm: string='';
  searchResults: any[]=[];
  selectedRecipe: any;
  analyzedRecipe: any;
  showIngredients: boolean = false;
  showInstructions: boolean = false;
  showNutritionalInfo: boolean = false;
  option: string = '';

  constructor(private http: HttpClient) { }

  searchRecipes() {
    const apiKey = '905483832ce547769d40e25a2c3d2a11';
    const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${this.searchTerm}`;

    this.http.get<any>(url).subscribe(response => {
      this.searchResults = response.results;
    
    });
  }

  getRecipeInformation(recipeId: number) {
    const apiKey = '905483832ce547769d40e25a2c3d2a11';
    const url = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`;

    this.http.get<any>(url).subscribe(response => {
      this.selectedRecipe = response;
      this.selectedRecipe.image = response.image;
      this.analyzeRecipe(recipeId);
    });
  }

  analyzeRecipe(recipeId: number) {
    const apiKey = '905483832ce547769d40e25a2c3d2a11';
    const url = `https://api.spoonacular.com/recipes/${recipeId}/nutritionWidget.json?apiKey=${apiKey}`;

    this.http.get<any>(url).subscribe(response => {
      this.analyzedRecipe = response;
    });
  }

  showIngredientsOption() {
    this.option = 'ingredients';
  }

  showInstructionsOption() {
    this.option = 'instructions';
  }

  showNutritionalInfoOption() {
    this.option = 'nutritionalInfo';
  }
  
}
