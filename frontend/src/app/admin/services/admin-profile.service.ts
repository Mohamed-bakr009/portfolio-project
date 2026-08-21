import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

export interface ProfileShow {
  name?: boolean;
  title?: boolean;
  bio?: boolean;
  location?: boolean;
  email?: boolean;
  phone?: boolean;
  image?: boolean;
}
export interface ProfileDoc {
  _id?: string;
  name: string;
  title: string;
  bio: string;
  location?: string;
  email?: string;
  phone?: string;
  image?: string;
  available?: boolean;
  portfolioVisible?: boolean;
  show?: ProfileShow;
  availabilityTitle?: string;
  availabilityNote?: string;
}

@Injectable({ providedIn: "root" })
export class AdminProfileService {
  private readonly endpoint = `${environment.apiUrl}/profile`;
  constructor(private http: HttpClient) {}
  get(): Observable<ProfileDoc> {
    return this.http.get<ProfileDoc>(this.endpoint);
  }
  create(d: ProfileDoc): Observable<ProfileDoc> {
    return this.http.post<ProfileDoc>(`${this.endpoint}/create`, d);
  }
  update(d: Partial<ProfileDoc>): Observable<ProfileDoc> {
    return this.http.patch<ProfileDoc>(`${this.endpoint}/update`, d);
  }
  toggleAvailability(): Observable<ProfileDoc> {
    return this.http.patch<ProfileDoc>(`${this.endpoint}/availability`, {});
  }
  setPortfolioVisibility(visible: boolean): Observable<ProfileDoc> {
    return this.http.patch<ProfileDoc>(`${this.endpoint}/portfolio`, {
      visible,
    });
  }
  uploadImage(file: File): Observable<ProfileDoc> {
    const f = new FormData();
    f.append("image", file);
    return this.http.post<ProfileDoc>(`${this.endpoint}/upload-image`, f);
  }
}
