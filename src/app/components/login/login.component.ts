import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserCredentials } from 'src/app/models/user-credentials';
import { AuthService } from '../../auth.service';
import { MatSnackBar, MatSnackBarVerticalPosition, MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loading = false;
  horizontalPosition:MatSnackBarHorizontalPosition = 'start';
  verticalPosition:MatSnackBarVerticalPosition ='bottom';
  constructor(private authSvc: AuthService, private route: Router, private _snackBar: MatSnackBar) { }

  loginForm = new FormGroup({
    email: new FormControl('',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    password: new FormControl('',[Validators.required,Validators.minLength(6)])
  });

  ngOnInit() {}

  onLogin(form: UserCredentials) {

    if(this.loginForm.invalid==false){
      try{
        this.authSvc
        .login(form)
        .subscribe(res => {
          console.log('Successfully', res);
          this.fakeLoading()
        },
        (error) => {
          this._snackBar.open('Usuario o Contraseña incorrectos', '', {
            duration: 5000,
            horizontalPosition :'center',
            verticalPosition:'bottom'
          })
          this.loginForm.reset();
        });
      }
      catch(e){
        console.log("error",e);
      }

    }

  }

  fakeLoading(){
    this.loading = true;
    setTimeout(() =>{
      this.route.navigate(['/showInvoices']);
      this.loading = false
    },2000);
  }

}
