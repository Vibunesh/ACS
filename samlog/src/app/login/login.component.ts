

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../service/auth-service.service';
import { Router } from '@angular/router';
import { AuthService } from './../service/auth-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loginSuccess: boolean = false;
  loginError: boolean = false;
  errorMessage: string = '';
  rememberMe: boolean = false;
  passwordHidden: boolean = true;

  
  constructor(
    private formBuilder: FormBuilder,
    private service: LoginService,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  ngOnInit() {
    const storedEmail = localStorage.getItem('email');
    const storedRememberMe = localStorage.getItem('rememberMe');
  
    if (storedRememberMe && storedRememberMe === 'true' && storedEmail) {
      this.loginForm.addControl('rememberMe', this.formBuilder.control(true));
      this.loginForm.patchValue({ email: storedEmail, password: localStorage.getItem('password') || '' });
      
      this.rememberMe = true;
    } else {
      this.loginForm.addControl('rememberMe', this.formBuilder.control(false));
      localStorage.removeItem('rememberMe');
      localStorage.removeItem('email');
      localStorage.removeItem('password'); 
    }
  }
  

  onSubmit() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    this.rememberMe = this.loginForm.value.rememberMe;
    
    this.service.loginUser(email, password).subscribe(
      (response) => {
        const authToken = response.access_token;
        console.log('Login successful');
        console.log(authToken);
        localStorage.setItem('authToken', authToken);

        const token = authToken; 
        this.authService.setToken(token);
        this.loginSuccess = true;



         // Remember me
         if (this.rememberMe) {
          localStorage.setItem('rememberMe', 'true');
          localStorage.setItem('email', email);
        }
         else {
          localStorage.removeItem('rememberMe');
          localStorage.removeItem('email');
        }

        

        this.router.navigate(['/home']);
      },
      (error) => {
        console.log('Login error');
        console.error(error);
        this.loginError = true;
        this.errorMessage = 'Invalid email or password.';
      }
    );
  }

  togglePasswordVisibility() {
    this.passwordHidden = !this.passwordHidden;
  }

}




// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { LoginService } from '../service/auth-service.service';
// import { Router } from '@angular/router';
// import { AuthService } from './../service/auth-service.service';
// import { AES } from 'crypto-js';



// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent implements OnInit {
//   loginForm!: FormGroup;
//   loginSuccess: boolean = false;
//   loginError: boolean = false;
//   errorMessage: string = '';
//   rememberMe: boolean = false;
//   passwordHidden: boolean = true;

  
//   constructor(
//     private formBuilder: FormBuilder,
//     private service: LoginService,
//     private router: Router,
//     private authService: AuthService
//   ) {
//     this.loginForm = this.formBuilder.group({
//       email: ['', [Validators.required]],
//       password: ['', Validators.required],
//     });
//   }

//   get email() { return this.loginForm.get('email'); }
//   get password() { return this.loginForm.get('password'); }

//   ngOnInit() {
//     const storedEmail = localStorage.getItem('email');
//     const storedRememberMe = localStorage.getItem('rememberMe');
  
//     if (storedRememberMe && storedRememberMe === 'true' && storedEmail) {
//       this.loginForm.addControl('rememberMe', this.formBuilder.control(true));
//       this.loginForm.patchValue({ email: storedEmail, password: localStorage.getItem('password') || '' });
      
//       this.rememberMe = true;
//     } else {
//       this.loginForm.addControl('rememberMe', this.formBuilder.control(false));
//       localStorage.removeItem('rememberMe');
//       localStorage.removeItem('email');
//       localStorage.removeItem('password'); 
//     }
//   }
  

//   onSubmit() {
//     const email = this.loginForm.value.email;
//     const password = this.loginForm.value.password;
//     this.rememberMe = this.loginForm.value.rememberMe;
  
//     // Encrypt the password
//     const encryptedPassword = this.encryptPassword(password);
  
//     this.service.loginUser(email, encryptedPassword).subscribe(
//       (response) => {
//         const authToken = response.access_token;
//         console.log('Login successful');
//         console.log(authToken);
//         localStorage.setItem('authToken', authToken);
  
//         const token = authToken; 
//         this.authService.setToken(token);
//         this.loginSuccess = true;
  
//         // Remember me
//         if (this.rememberMe) {
//           localStorage.setItem('rememberMe', 'true');
//           localStorage.setItem('email', email);
//         }
//         else {
//           localStorage.removeItem('rememberMe');
//           localStorage.removeItem('email');
//         }
  
//         this.router.navigate(['/home']);
//       },
//       (error) => {
//         console.log('Login error');
//         console.error(error);
//         this.loginError = true;
//         this.errorMessage = 'Invalid email or password.';
//       }
//     );
//   }
  
//   private encryptPassword(password: string): string {
//     const encryptionKey = 'YourEncryptionKey'; // Replace with your own encryption key
//     const encryptedPassword = AES.encrypt(password, encryptionKey).toString();
//     return encryptedPassword;
//   }
  
//   togglePasswordVisibility() {
//     this.passwordHidden = !this.passwordHidden;
//   }

// }


