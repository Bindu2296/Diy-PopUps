import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import UserService from '../user.service'



@Component({templateUrl: 'register.component.html'})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;
    user:any

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private service:UserService
        
    ) { 
        // redirect to home if already logged in
      
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;
        if(this.registerForm.status !='INVALID'){
          //alert(JSON.stringify(this.userForm.value))
          this.user={
            firstname: this.registerForm.controls['firstName'].value,
            lastname: this.registerForm.controls['lastName'].value,
            username: this.registerForm.controls['username'].value,
            password: this.registerForm.controls['password'].value
          }
          // Add a new User 
          this.service.createUser({ 
            firstName:this.user.firstname,
            lastName:this.user.lastname,
            username:this.user.username,
            password:this.user.password},
        // stop here if form is invalid
         (err)=>{
           err
         } )
       if(this.submitted){
   this.router.navigate(['/login'])
       }

      }
    }
}
