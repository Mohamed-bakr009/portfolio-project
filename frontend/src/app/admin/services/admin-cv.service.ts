import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

export interface CvParsedData {
  summary: string;
  projects: { title: string; org: string; date?: string }[];
  education: { title: string; org: string; date?: string }[];
  training: { title: string; org: string; date?: string }[];
  experience: { title: string; org: string; date?: string }[];
  techSkills: string[];
  softSkills: string[];
  languages: { name: string; level: string }[];
}

export interface CvDoc {
  _id?: string;
  fileName: string;
  filePath: string;
  parsedData?: CvParsedData;
  visible?: boolean;
  deleted?: boolean;
}

@Injectable({ providedIn: "root" })
export class AdminCvService {
  private readonly endpoint = `${environment.apiUrl}/cv`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<CvDoc[]> {
    return this.http.get<CvDoc[]>(this.endpoint);
  }

  upload(file: File): Observable<CvDoc> {
    const form = new FormData();
    form.append("cv", file);
    return this.http.post<CvDoc>(`${this.endpoint}/upload`, form);
  }

  hide(): Observable<CvDoc> {
    return this.http.put<CvDoc>(`${this.endpoint}/hide`, {});
  }

  setVisibility(visible: boolean): Observable<CvDoc> {
    return visible
      ? this.http.put<CvDoc>(`${this.endpoint}/show`, {})
      : this.hide();
  }

  delete(): Observable<unknown> {
    return this.http.put(`${this.endpoint}/delete`, {});
  }

  reparse(): Observable<CvDoc> {
    return this.http.post<CvDoc>(`${this.endpoint}/reparse`, {});
  }
}
