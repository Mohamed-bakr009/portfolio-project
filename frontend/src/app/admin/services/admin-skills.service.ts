import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
export interface SkillDoc {
  _id?: string;
  name: string;
  category: string;
  icon?: string;
  visible?: boolean;
  showInTechStrip?: boolean;
}
@Injectable({ providedIn: "root" })
export class AdminSkillsService {
  private readonly endpoint = `${environment.apiUrl}/skills`;
  constructor(private http: HttpClient) {}
  getAll(): Observable<SkillDoc[]> {
    return this.http.get<SkillDoc[]>(this.endpoint);
  }
  create(d: SkillDoc): Observable<SkillDoc> {
    return this.http.post<SkillDoc>(`${this.endpoint}/create`, d);
  }
  update(id: string, d: Partial<SkillDoc>): Observable<SkillDoc> {
    return this.http.patch<SkillDoc>(`${this.endpoint}/update/${id}`, d);
  }
  setVisibility(id: string, visible: boolean): Observable<SkillDoc> {
    return this.http.patch<SkillDoc>(`${this.endpoint}/visibility/${id}`, {
      visible,
    });
  }
  setTechStrip(id: string, show: boolean): Observable<SkillDoc> {
    return this.http.patch<SkillDoc>(`${this.endpoint}/tech/${id}`, {
      showInTechStrip: show,
    });
  }
  delete(id: string): Observable<unknown> {
    return this.http.delete(`${this.endpoint}/${id}`);
  }
}
