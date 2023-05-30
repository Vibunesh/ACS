import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  forgetPasswordForm!: FormGroup ;
  passwordUpdated: boolean = false;
  passwordHidden: boolean = true;


  constructor(private formBuilder: FormBuilder, private http:HttpClient) { }


  private createForm() {
    this.forgetPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    });
  }
  
  ngOnInit() {
    this.createForm();
  }

  onSubmit() {
   if (this.forgetPasswordForm.invalid) {
      // Display appropriate error messages or perform validation logic
      return;
    }

    // Retrieve the values entered by the user
  

    const payload = {
     "username": this.forgetPasswordForm.value.email,
     "password":this.forgetPasswordForm.value.confirmPassword
    };

    // Send the request to the backend API
    this.http.put('https://final-vy64.onrender.com/forget_password', payload)
      .subscribe(
        (response: any) => {
          // Handle success response
          console.log('Password reset request sent successfully');
          this.passwordUpdated = true;

        },
        (error: any) => {
          // Handle error response
          console.error('Failed to send password reset request:', error);
          // Display error message or perform error handling
        }
      );
  }
  togglePasswordVisibility() {
    this.passwordHidden = !this.passwordHidden;
  }
  togglePasswordVisibilityone() {
    this.passwordHidden = !this.passwordHidden;
  }
 
}
  