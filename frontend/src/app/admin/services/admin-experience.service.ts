import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
export interface ExperienceDoc {
  _id?: string;
  company: string;
  position: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  visible?: boolean;
}
@Injectable({ providedIn: "root" })
export class AdminExperienceService {
  private readonly endpoint = `${environment.apiUrl}/exprerience`;
  constructor(private http: HttpClient) {}
  getAll(): Observable<ExperienceDoc[]> {
    return this.http.get<ExperienceDoc[]>(this.endpoint);
  }
  create(d: ExperienceDoc): Observable<ExperienceDoc> {
    return this.http.post<ExperienceDoc>(`${this.endpoint}/create`, d);
  }
  update(id: string, d: Partial<ExperienceDoc>): Observable<ExperienceDoc> {
    return this.http.patch<ExperienceDoc>(`${this.endpoint}/update/${id}`, d);
  }
  setVisibility(id: string, visible: boolean): Observable<ExperienceDoc> {
    return this.http.patch<ExperienceDoc>(`${this.endpoint}/visibility/${id}`, {
      visible,
    });
  }
  delete(id: string): Observable<unknown> {
    return this.http.delete(`${this.endpoint}/${id}`);
  }
}
