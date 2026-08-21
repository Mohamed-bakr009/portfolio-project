import { Injectable, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, tap } from "rxjs";

import { environment } from "../../../environments/environment";

export interface AdminUser {
  _id: string;
  email: string;
}

const STORAGE_KEY = "admin_user";

@Injectable({ providedIn: "root" })
export class AuthService {
  private readonly endpoint = `${environment.apiUrl}/user`;
  readonly currentUser = signal<AdminUser | null>(this.readStoredUser());

  constructor(private http: HttpClient) {}

  login(
    email: string,
    password: string,
  ): Observable<{ message: string; user: AdminUser }> {
    return this.http
      .post<{
        message: string;
        user: AdminUser;
      }>(`${this.endpoint}/login`, { email, password })
      .pipe(
        tap((res) => {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(res.user));
          this.currentUser.set(res.user);
        }),
      );
  }

  logout(): void {
    localStorage.removeItem(STORAGE_KEY);
    this.currentUser.set(null);
  }

  isLoggedIn(): boolean {
    return !!this.currentUser();
  }

  private readStoredUser(): AdminUser | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }
}
