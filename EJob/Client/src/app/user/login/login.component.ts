import { UserService } from './../../shared/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Login } from 'src/app/shared/models/login.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup
  loading: boolean = false;
  success: boolean = true;
  alertMessageContent: string;
  error: boolean = false;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit() {
    if (this.userService.isAuthenticated()) this.router.navigateByUrl("/");
    this.loginForm = this.formBuilder.group({
      userName: ['', [Validators.required]],
      password: ['', Validators.required],
      rememberMe: [false]
    });
  }

  get userName() { return this.loginForm.get("userName"); }
  get password() { return this.loginForm.get("password"); }
  get rememberMe() { return this.loginForm.get("rememberMe"); }

  onSubmit() {
    this.loading = true;
    var login = new Login();
    login.password = this.password.value;
    login.userName = this.userName.value;
    this.userService.login(login).subscribe(
      (res: any) => {
        this.loading = false;
        localStorage.setItem("token", res.token);
        this.router.navigateByUrl("");
      },
      err => {
        this.loading = false;
        this.alertMessageContent = "Vérifier votre connection internet.";
        this.success = false;
        this.error = true;
      }
    );
  }

}