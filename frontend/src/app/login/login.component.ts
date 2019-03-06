import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import UserService from '../user.service';



@Component({
  templateUrl: 'login.component.html',
  selector: 'app-login',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    user:any;
    data:any

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private service:UserService
        
    ) {
        // redirect to home if already logged in
     
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    O() {
      this.user={
      username:this.loginForm.controls['username'].value,
      password:this.loginForm.controls['password'].value
      }
      console.log('username'+this.user.username+this.user.password)
      this.service.findUser(this.user.username,this.user.password,(result)=>{
      console.log(result)
      console.log(result[0].username)
      if(result[0].username==this.user.username&&result[0].password==this.user.password){
        this.router.navigate(['/profile']);
      }else
      {
        this.router.navigate([]);
      }
      })
    }
  

    onSubmit() {
        this.submitted = true;
  
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }
        
        else{
          this.user={
            username:this.loginForm.controls['username'].value,
            password:this.loginForm.controls['password'].value
          }
          this.loading=true;
        this.service.fetchUserByName(this.user.username,(data)=>{
          this.data=JSON.parse(data)[0]
          console.log(this.data.username)
          console.log(this.user.password)
          if(this.data.password==this.user.password){
            console.log('checking')
            this.router.navigate(['/profile'])
          }
          else{
            alert('Invalid User or Password')
          }
        })
      }
      
    }
}
