import { ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { By } from '@angular/platform-browser'
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from 'src/app/shared/user.service';
import { from, throwError } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let submitButtonDe: DebugElement;
  let userService: UserService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [UserService],
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    submitButtonDe = fixture.debugElement.query(By.css("button[type=submit]"));
    userService = TestBed.get(UserService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should create form with all login controls", () => {
    expect(component.userName).toEqual(jasmine.any(AbstractControl));
    expect(component.password).toEqual(jasmine.any(AbstractControl));
    expect(component.rememberMe).toEqual(jasmine.any(AbstractControl));
  });

  it("should valid return false when userName is empty", () => {
    component.userName.setValue("");
    expect(component.userName.valid).toBeFalsy();
  });

  it("should require the password", () => {
    component.password.setValue("");
    expect(component.password.valid).toBeFalsy();
  });

  it("should disable the submit button when the form is not valid", () => {

    expect(submitButtonDe.nativeElement.disabled).toBeTruthy();
  });

  it("should enable the submit button when the form is valid", () => {
    component.userName.setValue("username");
    component.password.setValue("P@$$w0rd");
    fixture.detectChanges();
    expect(submitButtonDe.nativeElement.disabled).toBeFalsy();
  });

  it("should call onSubmit when the form is submited", fakeAsync(() => {
    component.userName.setValue("username");
    component.password.setValue("P@$$w0rd");
    fixture.detectChanges();
    spyOn(component, "onSubmit");
    submitButtonDe.nativeElement.click();
    expect(component.onSubmit).toHaveBeenCalled();
  }));

  it("should success be truthy and error to be falsy", () => {
    spyOn(userService, "login").and.callFake(() => {
      return from([{ token: "token" }])
    });
    component.onSubmit();
    expect(component.success).toBeTruthy();
    expect(component.error).toBeFalsy();

  });

  it("should error be truthy and success to be falsy", () => {
    spyOn(userService, "login").and.callFake((user) => {
      return throwError(new Error('404 NOT FOUND'));
    });
    component.onSubmit();
    expect(component.success).toBeFalsy();
    expect(component.error).toBeTruthy();

  });
});
