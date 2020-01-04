import { TestBed} from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { UserService } from '../shared/user.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';


describe('AuthGuard', () => {
  let guard:AuthGuard;
  let userService: UserService;
  let routeMock:any = {snapshot:{}};
  let routeStateMock:any = {snapshot:{},url:'/'};
  let routerMock = { navigate: jasmine.createSpy('navigate')};

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserService,{provide:Router,useValue:routerMock}],
      imports:[RouterTestingModule,HttpClientModule]
    });
     guard = TestBed.get(AuthGuard);
     userService = TestBed.get(UserService);
  });

  it("should create an instance of AuthGuard",()=>{
    expect(guard).toBeTruthy();
  });

  it("should return true when user is authenticated",()=>{
    spyOn(userService,"isAuthenticated").and.callFake(()=>{
      return true;
    })
    let result = guard.canActivate(null,null);
    expect(result).toBeTruthy();
  });

  it("should return false when user is not authenticated",()=>{
    spyOn(userService,"isAuthenticated").and.callFake(()=>{
      return false;
    })
    let result = guard.canActivate(null,null);
    expect(result).toBeFalsy();
  });

  it("should redirect the user to login when it's not authenticated",()=>
  {
    spyOn(userService,"isAuthenticated").and.callFake(()=>{
      return false;
    })
    expect(guard.canActivate(routeMock,routeStateMock)).toEqual(false);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/user/login']);
  });


});
