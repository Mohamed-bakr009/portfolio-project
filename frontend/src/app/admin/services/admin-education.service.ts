import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
export interface EducationDoc {
  _id?: string;
  institution: string;
  degree: string;
  field: string;
  startYear?: number;
  endYear?: number;
  description?: string;
  visible?: boolean;
}
@Injectable({ providedIn: "root" })
export class AdminEducationService {
  private readonly endpoint = `${environment.apiUrl}/educaion`;
  constructor(private http: HttpClient) {}
  getAll(): Observable<EducationDoc[]> {
    return this.http.get<EducationDoc[]>(this.endpoint);
  }
  create(d: EducationDoc): Observable<EducationDoc> {
    return this.http.post<EducationDoc>(`${this.endpoint}/create`, d);
  }
  update(id: string, d: Partial<EducationDoc>): Observable<EducationDoc> {
    return this.http.patch<EducationDoc>(`${this.endpoint}/update/${id}`, d);
  }
  setVisibility(id: string, visible: boolean): Observable<EducationDoc> {
    return this.http.patch<EducationDoc>(`${this.endpoint}/visibility/${id}`, {
      visible,
    });
  }
  delete(id: string): Observable<unknown> {
    return this.http.delete(`${this.endpoint}/${id}`);
  }
}
