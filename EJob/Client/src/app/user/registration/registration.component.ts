import { UserService } from './../../shared/user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { comparePasswords } from 'src/app/validators/password.validator';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registerForm:FormGroup;

  constructor(private formBuilder:FormBuilder,private userService:UserService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      FirstName:['',Validators.required],
      LastName:['',Validators.required],
      Email:['',[Validators.required,Validators.email]],
      Passwords:this.formBuilder.group({
        Password:['',[Validators.required,Validators.minLength(8)]],
        ConfirmPassword:['',Validators.required]},{
          validator: comparePasswords
        })
    });
  }

  get formControls() { return this.registerForm.controls}

  onSubmit()
  {
    var body = {
      FirstName : this.registerForm.value.FirstName,
      LastName : this.registerForm.value.LastName,
      Email : this.registerForm.value.Email,
      Password : this.registerForm.value.Password
    }
    this.userService.register(body)
  }




}
