import { Component } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  name: string='';
  description: string='';

  constructor(public dataService: DataService) {}

  addItem(): void {
    if (this.dataService.isEditing) {
      this.dataService.updateItem(this.dataService.editingIndex, {
        name: this.name,
        description: this.description
      });
      this.dataService.isEditing = false;
      this.dataService.editingIndex = -1;
    } else {
      this.dataService.addItem({
        name: this.name,
        description: this.description
      });
    }
    this.name = '';
    this.description = '';
  }
}
