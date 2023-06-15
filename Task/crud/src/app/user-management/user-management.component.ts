import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'role', 'actions'];
  dataSource: MatTableDataSource<User>;
  users: User[] = [];
  newUser: User = { id: 0, name: '', email: '', role: '' };
  selectedUser: User | null = null; 

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor() {
    this.dataSource = new MatTableDataSource(this.users);
  }

  ngOnInit(): void {
    this.loadData();
    this.dataSource.paginator = this.paginator;
  }

  loadData(): void {
    const storedData = localStorage.getItem('users');
    if (storedData) {
      this.users = JSON.parse(storedData);
      this.dataSource.data = this.users;
    }
  }

  saveData(): void {
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  addUser(): void {
    this.newUser.id = this.users.length + 1;
    this.users.push({ ...this.newUser });
    this.dataSource.data = this.users;
    this.newUser = { id: 0, name: '', email: '', role: '' };
    this.saveData(); 
  }

  updateUser(user: User): void {
    this.selectedUser = user; 
    this.newUser = { ...user }; 
  }

  saveUpdate(): void {
    if (this.selectedUser) {
      const index = this.users.findIndex(u => u.id === this.selectedUser!.id);
      if (index > -1) {
        this.users[index] = { ...this.newUser };
        this.dataSource.data = [...this.users]; 
        this.selectedUser = null; 
        this.newUser = { id: 0, name: '', email: '', role: '' }; 
        this.saveData(); 
      }
    }
  }

  cancelUpdate(): void {
    this.selectedUser = null; 
    this.newUser = { id: 0, name: '', email: '', role: '' }; 
  }

  deleteUser(user: User): void {
    const index = this.users.findIndex(u => u.id === user.id);
    if (index > -1) {
      this.users.splice(index, 1);
      this.dataSource.data = this.users;
      this.saveData(); 
    }
  }
}
