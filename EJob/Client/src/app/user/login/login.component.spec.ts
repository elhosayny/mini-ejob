import { ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { By } from '@angular/platform-browser'
import { DebugElement } from '@angular/core';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let submitButtonDe: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    submitButtonDe = fixture.debugElement.query(By.css("button[type=submit]"));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should create form with all login controls", () => {
    expect(component.email).toEqual(jasmine.any(AbstractControl));
    expect(component.password).toEqual(jasmine.any(AbstractControl));
    expect(component.rememberMe).toEqual(jasmine.any(AbstractControl));
  });

  it("should valid return false when email is not valid", () => {
    component.email.setValue("");
    expect(component.email.valid).toBeFalsy();
    component.email.setValue("foo");
    expect(component.email.valid).toBeFalsy();
  });

  it("should valid return true when the email is valid", () => {
    component.email.setValue("foo@example.com");
    expect(component.email.valid).toBeTruthy();
  });

  it("should require the password", () => {
    component.password.setValue("");
    expect(component.password.valid).toBeFalsy();
  });

  it("should disable the submit button when the form is not valid", () => {

    expect(submitButtonDe.nativeElement.disabled).toBeTruthy();
  });

  it("should enable the submit button when the form is valid", () => {
    component.email.setValue("foo@example.com");
    component.password.setValue("P@$$w0rd");
    fixture.detectChanges();
    expect(submitButtonDe.nativeElement.disabled).toBeFalsy();
  });
});
