import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from './shared/user.service';

@Component({
  selector: 'app-register',
  template: `
    <section class="vh-100" style="background-color: #eee;">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-lg-12 col-xl-11">
            <div class="card text-black" style="border-radius: 25px;">
              <div class="card-body p-md-5">
                <div class="row justify-content-center">
                  <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                      Sign up
                    </p>

                    <form #myform="ngForm" method="get" action="#" (submit)="clickHandler(myform, $event)">
                      <div class="mb-3">
                        <label for="username" class="form-label">User Name</label>
                        <input
                          #username="ngModel"
                          [(ngModel)]="registerInfo.name"
                          type="text"
                          required
                          name="uname"
                          class="form-control"
                          id="username"
                        />
                        <div *ngIf="username.touched && username.invalid" class="error form-text">
                          Name
                        </div>
                      </div>
                      
                      <div class="mb-3"><label for="usermail" class="form-label">Email</label>
                        <input
                          #usermail="ngModel"
                          [(ngModel)]="registerInfo.email"
                          type="email"
                          required
                          pattern=".+@.+"
                          name="umail"
                          class="form-control"
                          id="usermail"
                        />
                        <div *ngIf="usermail.touched && usermail.invalid" class="error form-text">
                          Provide your eMail id
                        </div>
                      </div>
                      <div class="mb-3">
                        <label for="userpass" class="form-label">Password</label>
                        <input
                          #userpass="ngModel"
                          [(ngModel)]="registerInfo.password"
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
                          Register
                        </button>
                      </div>
                    </form>
                  </div>
                  <div
                    class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                      class="img-fluid"
                      alt="Sample image"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </section>
  `,
  styles: ``,
})
export class RegisterComponent {
  registerInfo: any = {
    name: '',
    email: '',
    password: '',
  };

  constructor(private router: Router, private uService: UserService) {}

  clickHandler(registerForm: any, evt: any) {
    //evt.preventDefault();
    this.uService.addUser(this.registerInfo).subscribe((res) => {
      console.log(res);
      this.registerInfo = {
        name: '',
        email: '',
        password: ''
      }
    })
    //console.log(registerForm.value);
    this.router.navigateByUrl('dashboard');
  }
}
