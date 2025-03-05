import { Component } from '@angular/core';
import { UserService } from './shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  template: `
    <section class="vh-100">
      <div class="container-fluid">
        <div class="row">
          <div class="col-sm-6 text-black">
            <div
              class="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
              <form style="width: 23rem;">
                <h3 class="fw-normal mb-3 pb-3" style="letter-spacing: 1px;">
                  Log in
                </h3>

                <form #myform="ngForm" method="get" action="#" (submit)="clickHandler(myform, $event)">
                      <div class="mb-3">
                        <label for="useremail" class="form-label">Email</label>
                        <input
                          #useremail="ngModel"
                          [(ngModel)]="loginInfo.email"
                          type="text"
                          required
                          name="uemail"
                          class="form-control"
                          id="useremail"
                        />
                        <div *ngIf="useremail.touched && useremail.invalid" class="error form-text">
                          Name
                        </div>
                      </div>  
                      <div class="mb-3">
                        <label for="userpass" class="form-label">Password</label>
                        <input
                          #userpass="ngModel"
                          [(ngModel)]="loginInfo.password"
                          type="text"
                          required
                          name="pass"
                          class="form-control"
                          id="userpass"
                        />
                        <div *ngIf="userpass.touched && userpass.invalid" class="error form-text">
                          Password
                        </div>
                      </div>
                      <div class="mb-3">
                        <button type="submit" class="btn btn-primary">
                          LOGIN
                        </button>
                      </div>
                    </form>
                <p>
                  Don't have an account?
                  <a routerLink="/register" class="link-info">Register here</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: ``,
})
export class LoginComponent {

  constructor(private uService: UserService, private router: Router){}

  loginInfo = {
      email: '',
      password: ''
  }

  clickHandler(myForm: any, evt: Event) {
    
    console.log(myForm.value);
    this.uService.getUser(this.loginInfo).subscribe(
      (response) => {
        //console.log(res);
        this.router.navigateByUrl('dashboard');
      },
      (err) => {
        console.error(err);
        this.router.navigateByUrl('register');
      }
    );     
  }
}
