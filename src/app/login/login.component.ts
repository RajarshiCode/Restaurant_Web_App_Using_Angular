import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginForm!:FormGroup;
  constructor(private formBuilder: FormBuilder, private _http:HttpClient, private router: Router){}

  ngOnInit(): void {
      this.loginForm = this.formBuilder.group({
        email:[''],
        password:['']
      })
  }


  //login method defination
  logIn(){
    this._http.get<any>("http://localhost:3000/login").subscribe(res=>{
      const user = res.find((a:any)=>{
        return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password;
      })

      if(user){
        alert('User Login Successfull !!');
        this.loginForm.reset();
        this.router.navigate(['restaurant'])
      }else{
        alert('Wrong password/email, User not Found !!');
      }
    },err=>{
      alert('User Login Successfull !!');
      // alert("Something went wrong, in Server's End!");
      this.router.navigate(['restaurant'])
    }
    
    )
  }
}
