import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from './shared/user.service';

@Component({
    selector: 'app-register',
    template: `

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
  `,
    styles: ``,
    standalone: false
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
