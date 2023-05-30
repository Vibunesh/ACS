import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';




import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';

import { HomeComponent } from './home/home.component';

import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { AuthService } from './service/auth-service.service';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { AuthGuard } from './home/guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';


const routes:Routes = [
  {path:'' ,component:LoginComponent},
  {path:'login' ,component:LoginComponent},
  {path:'registration' ,component:RegistrationComponent},
   {path:'home' ,component:HomeComponent,canActivate: [AuthGuard]},
   {path:'forget-password' ,component:ForgetPasswordComponent},
   
  
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    HomeComponent,
    ForgetPasswordComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
