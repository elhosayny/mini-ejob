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
  showSuccessRegistrationAlert:boolean = false;
  showErrorRegistrationAlert:boolean = false;
  alertMessageContent:string;
  isLoading:boolean = false;

  constructor(private formBuilder:FormBuilder,private userService:UserService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      UserName:['',Validators.required],
      FirstName:['',Validators.required],
      LastName:['',Validators.required],
      Email:['',[Validators.required,Validators.email]],
      Passwords:this.formBuilder.group({
        Password:['',[Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\\d$@$!%*?&].{8,}')]],
        ConfirmPassword:['',Validators.required]},{
          validator: comparePasswords
        })
    });
  }

  get formControls() { return this.registerForm.controls}

  onSubmit()
  {
    this.isLoading = true;
    var body = {
      UserName : this.registerForm.value.UserName,
      FirstName : this.registerForm.value.FirstName,
      LastName : this.registerForm.value.LastName,
      Email : this.registerForm.value.Email,
      Password : this.registerForm.value.Passwords.Password
    }
    // This part needs more improvements
    this.userService.register(body).subscribe(
      (res:any) => {
        this.isLoading = false;
        if( res.succeeded)
        {
          this.registerForm.reset();
          this.showSuccessRegistrationAlert = true;
        }else
        {
          this.alertMessageContent = "Des erreurs au niveau serveur sont produit.";
          this.showErrorRegistrationAlert = true;
        }
      },
      err => {
        this.isLoading = false;
        this.alertMessageContent = "Vérifier votre connection internet.";
        this.showErrorRegistrationAlert = true;

      }
    )
  }




}
