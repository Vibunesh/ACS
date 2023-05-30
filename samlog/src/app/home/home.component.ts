import { Component } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../service/auth-service.service'; 
import { Location } from '@angular/common';
import { HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  tableVisible: boolean = false;
  data: any[] = [];






  

  constructor(private http: HttpClient,private authService: AuthService, private router: Router,private location: Location) {
    
  }
  ngOnInit() {
    
    history.pushState('', '', location.href);
    window.onpopstate = function (_event) {
      // Prevent the user from navigating back to the home component
      history.pushState('', '', location.href);
    };
  }
  

    logout(): void {
      this.authService.removeToken();
    this.router.navigate(['/login']);
    }
    fetchData() {
      this.http.get<any[]>('https://final-vy64.onrender.com/student_list?page=1&page_size=10').subscribe(data => {
        this.data = data;
        this.tableVisible = true; 
      });
    }

    

    
  }
  


