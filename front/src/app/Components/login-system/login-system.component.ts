import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from "@angular/router";
import { environment } from "../../../../environment/environment";

@Component({
  selector: 'app-login-system',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login-system.component.html',
  styleUrl: './login-system.component.scss'
})
export class LoginSystemComponent implements OnInit {
  constructor(private router: Router) { }
  isExpanded = false;

  loginObj: any = {
    email: "",
    password: "",
  };

  ngOnInit() {
    if (typeof localStorage === 'undefined') {
      console.error("localStorage is not defined");
      return;
    }

    const localData = localStorage.getItem("authToken");

    if (localData != null) {
      fetch(`${environment.apiUrl}/auth`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: localData,
        },
      })
        .then((response) => {
          if (response.status == 200) {
            this.router.navigate(["/home"]);
          }
        })
        .catch((error) => {
          console.error("Erreur de requête:", error);
        });
    }
  }

  onConnectClick() {
    this.isExpanded = true;
  }

  onLogin() {
    if (this.isExpanded === false) {
      return;
    }

    if (typeof localStorage === 'undefined') {
      console.error("localStorage is not defined");
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(this.loginObj.email)) {
      this.loginObj.email = '';
      this.loginObj.password = '';
      return;
    }
    if (!this.loginObj.email || !this.loginObj.password) {
      this.loginObj.email = '';
      this.loginObj.password = '';
      return;
    }
    fetch(`${environment.apiUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.loginObj),
    })
      .then((response) => {
        this.loginObj.email = '';
        this.loginObj.password = '';
        if (response.status === 404) {
          return null;
        } else if (response.status === 401) {
          return null;
        } else if (response.status === 200) {
          return response.json().then((data) => {
            const token = data.token;
            localStorage.setItem("authToken", token);
            this.router.navigate(["/home"]);
          });
        }
        return null;
      })
      .catch((error) => {
        console.log('Problème de réseau');
      });
  }
}