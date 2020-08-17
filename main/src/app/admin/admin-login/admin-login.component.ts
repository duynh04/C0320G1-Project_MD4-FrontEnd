import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  private formLoginAdmin: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    // Thành Long
    const togglePassword = document.querySelector('#togglePassword');
    const password = document.querySelector('#password');
    togglePassword.addEventListener('click', function() {
      const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
      password.setAttribute('type', type);
      this.classList.toggle('fa-eye-slash');
    });

    this.formLoginAdmin = this.formBuilder.group({
      account: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9]{6,16}$')]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*\\d)[0-9a-zA-Z]{6,}$')]]
    });
  }

}
