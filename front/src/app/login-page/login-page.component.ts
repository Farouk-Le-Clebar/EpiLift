import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { LoginSystemComponent } from '../Components/login-system/login-system.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [FormsModule, LoginSystemComponent, CommonModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  constructor(private router: Router) { }
  isCreditExpanded = false;

  onCreditsClick() {
    this.isCreditExpanded = !this.isCreditExpanded;
  }
}