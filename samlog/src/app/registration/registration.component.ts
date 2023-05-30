
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})



export class RegistrationComponent implements OnInit  {
  
  registrationForm: FormGroup;
  registrationSuccess: boolean = false;
  registrationError: boolean = false;

  // registrationData = {
  //   username: '',
  //   password: '',
  //   email: '',
  //   first_name:'',
  //   last_name:'',
  //   reg_no:'',
  //   phonenumber:'',
  //   address:'',
  //   gender:'',
  //   dob:''
  // };

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {
    this.registrationForm = this.formBuilder.group({
      controlName: ['', Validators.required],
      
    });
  }


  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
     
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      reg_no: ['', Validators.required],
      phonenumber: ['', Validators.required],
      address: ['', Validators.required],
      gender: ['', Validators.required],
      dob: ['', Validators.required]
    });
  }

  

register() {
  this.http.post('https://final-vy64.onrender.com/register', this.registrationForm.value)
    .subscribe(
      (response) => {
      
        console.log('Registration successful');
        this.registrationSuccess = true;
      },
      (error) => {
        
        console.error('Registration failed', error);
        this.registrationError = true;
      }
    );
} 
}