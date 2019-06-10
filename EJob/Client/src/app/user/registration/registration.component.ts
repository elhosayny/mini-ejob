import { User } from './../../shared/models/user.model';
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
  success:boolean = false;
  error:boolean = false;
  alertMessageContent:string;
  loading:boolean = false;

  constructor(private formBuilder:FormBuilder,private userService:UserService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      userName:['',Validators.required],
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      passwords:this.formBuilder.group({
        password:['',[Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\\d$@$!%*?&].{8,}')]],
        confirmPassword:['',Validators.required]},{
          validator: comparePasswords
        })
    });
  }

  get formControls() { return this.registerForm.controls; }

  get userName(){ return this.registerForm.get("userName"); }

  get firstName(){ return this.registerForm.get("firstName"); }

  get lastName(){ return this.registerForm.get("lastName"); }

  get email(){ return this.registerForm.get("email"); }

  get password(){ return this.registerForm.get("passwords.password"); }

  get confirmPassword(){ return this.registerForm.get("passwords.confirmPassword"); }

  onSubmit()
  {
    this.loading = true;
    var user = new User();
    user.userName = this.userName.value;
    user.firstName = this.firstName.value;
    user.lastName = this.lastName.value;
    user.email = this.email.value;
    user.password = this.password.value;
    
    this.userService.register(user).subscribe(
      (res:any) => {
        this.loading = false;
        if( res.succeeded)
        {
          this.registerForm.reset();
          this.success = true;
        }else
        {
          this.alertMessageContent = "Des erreurs au niveau serveur sont produit.";
          this.error = true;
        }
      },
      err => {
        this.loading = false;
        this.alertMessageContent = "Vérifier votre connection internet.";
        this.error = true;

      }
    )
  }

}
