import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  items: any[] = [];
  isEditing: boolean = false;
  editingIndex: number = -1;

  addItem(item: any): void {
    this.items.push(item);
  }

  updateItem(index: number, item: any): void {
    this.items[index] = item;
    this.isEditing = false;
    this.editingIndex = -1;
  }

  deleteItem(index: number): void {
    this.items.splice(index, 1);
  }

  getItems(): any[] {
    return this.items;
  }

  getItem(index: number): any {
    return this.items[index];
  }
}
