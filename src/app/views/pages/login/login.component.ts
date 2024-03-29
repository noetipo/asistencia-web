import {Component, OnInit} from '@angular/core';
import {OauthService} from "../../../providers/services";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {abcForms} from 'src/environments/generals';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  abcForms: any;
  loginForm = new FormGroup({

    nombreUsuario: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
    password: new FormControl('', [Validators.required]),

  });


  public error = '';

  constructor(private oauthService: OauthService, private router: Router, private modalService: NgbModal,
  ) {
  }

  get f() {
    return this.loginForm.controls;
  }

  ngOnInit() {
    this.abcForms = abcForms;
    if (localStorage.getItem('token')) {
      this.redirectInto();
    } else {
      this.router.navigate(['login']);
    }

  }

  public login(): void {
    if (this.loginForm.valid) {
      this.oauthService.authenticate(this.loginForm.value).subscribe(response => {
        if (response && localStorage.getItem('token')) {
          this.redirectInto();
        }
      });
    }

  }

  redirectInto() {
    this.router.navigate(['pages/dashboard']);
  }

  public open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg'}).result.then((result) => {
      }, (reason) => {
    });
  }
}
