import { Component, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";

import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-admin-login",
  standalone: true,
  imports: [FormsModule],
  templateUrl: "./admin-login.component.html",
  styleUrl: "./admin-login.component.css",
})
export class AdminLoginComponent {
  email = "";
  password = "";
  loading = signal(false);
  error = signal("");

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}

  submit(): void {
    if (!this.email || !this.password) return;
    this.loading.set(true);
    this.error.set("");

    this.auth.login(this.email, this.password).subscribe({
      next: () => {
        this.loading.set(false);
        this.router.navigate(["/admin"]);
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set(
          err.error?.message || "Login failed. Check your email and password.",
        );
      },
    });
  }
}
