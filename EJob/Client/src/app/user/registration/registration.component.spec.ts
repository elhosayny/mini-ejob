import { HttpClientModule } from '@angular/common/http';
import { UserService } from './../../shared/user.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationComponent } from './registration.component';
import { ReactiveFormsModule, AbstractControl } from '@angular/forms';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrationComponent],
      providers: [UserService],
      imports: [ReactiveFormsModule, HttpClientModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should create a form with all the registration controls", () => {
    expect(component.userName).toEqual(jasmine.any(AbstractControl));
    expect(component.firstName).toEqual(jasmine.any(AbstractControl));
    expect(component.lastName).toEqual(jasmine.any(AbstractControl));
    expect(component.email).toEqual(jasmine.any(AbstractControl));
    expect(component.confirmPassword).toEqual(jasmine.any(AbstractControl))
    expect(component.password).toEqual(jasmine.any(AbstractControl));

  });

  it("should require all the fields", () => {
    component.userName.setValue("");
    expect(component.userName.valid).toBeFalsy();
    component.firstName.setValue("");
    expect(component.firstName.valid).toBeFalsy();
    component.lastName.setValue("");
    expect(component.lastName.valid).toBeFalsy();
    component.email.setValue("");
    expect(component.email.valid).toBeFalsy();
    component.password.setValue("");
    expect(component.password.valid).toBeFalsy();
    component.confirmPassword.setValue("");
    expect(component.confirmPassword.valid).toBeFalsy();
  });

  it("should validate the form when the username, firstname and lastname are not empty", () => {

    component.userName.setValue("foo");
    expect(component.userName.valid).toBeTruthy();
    component.firstName.setValue("foo");
    expect(component.firstName.valid).toBeTruthy();
    component.lastName.setValue("foo");
    expect(component.lastName.valid).toBeTruthy();

  });

  it("should not validate the email ", () => {

    component.email.setValue("foo");
    expect(component.email.valid).toBeFalsy();
  })

  it("should validate the email", () => {

    component.email.setValue("foo@example.com");
    expect(component.email.valid).toBeTruthy();
  });

  it("should not validate the password", () => {

    component.password.setValue("12345");
    expect(component.password.valid).toBeFalsy()
  });

  it("should validate the password", () => {

    component.password.setValue("Azerty@123");
    expect(component.password.valid).toBeTruthy()
  });

  it("should not validate the confirm password when it's different than the password", () => {

    component.password.setValue("Azerty@123");
    component.confirmPassword.setValue("Qsdf@123")
    expect(component.confirmPassword.valid).toBeFalsy()
  });

  it("should validate the confirm password when it's identical to the password", () => {

    component.password.setValue("Azerty@123");
    component.confirmPassword.setValue("Azerty@123")
    expect(component.confirmPassword.valid).toBeTruthy()
  });

  it("should validate the form registration",()=>{
    
    component.userName.setValue("username");
    component.firstName.setValue("firstname");
    component.lastName.setValue("lastname");
    component.email.setValue("email@example.com");
    component.password.setValue("P@$$w0rd");
    component.confirmPassword.setValue("P@$$w0rd");
    expect(component.registerForm.valid).toBeTruthy();

  });

});

