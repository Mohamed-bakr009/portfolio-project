import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
export interface SocialDoc {
  _id?: string;
  platform: string;
  url: string;
  icon?: string;
  visible?: boolean;
}
@Injectable({ providedIn: "root" })
export class AdminSocialService {
  private readonly endpoint = `${environment.apiUrl}/social`;
  constructor(private http: HttpClient) {}
  getAll(): Observable<SocialDoc[]> {
    return this.http.get<SocialDoc[]>(this.endpoint);
  }
  create(d: SocialDoc): Observable<SocialDoc> {
    return this.http.post<SocialDoc>(`${this.endpoint}/create`, d);
  }
  update(id: string, d: Partial<SocialDoc>): Observable<SocialDoc> {
    return this.http.patch<SocialDoc>(`${this.endpoint}/update/${id}`, d);
  }
  setVisibility(id: string, visible: boolean): Observable<SocialDoc> {
    return this.http.patch<SocialDoc>(`${this.endpoint}/visibility/${id}`, {
      visible,
    });
  }
  delete(id: string): Observable<unknown> {
    return this.http.delete(`${this.endpoint}/delete/${id}`);
  }
}
