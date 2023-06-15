import { Component } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  constructor(public dataService: DataService) {}

  deleteItem(index: number): void {
    this.dataService.deleteItem(index);
  }
}

