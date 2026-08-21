import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
export interface ProjectDoc {
  _id?: string;
  title: string;
  description: string;
  image?: string;
  technologies?: string[];
  githubUrl?: string;
  liveUrl?: string;
  category?: string;
  visible?: boolean;
}
@Injectable({ providedIn: "root" })
export class AdminProjectsService {
  private readonly endpoint = `${environment.apiUrl}/project`;
  constructor(private http: HttpClient) {}
  getAll(): Observable<ProjectDoc[]> {
    return this.http.get<ProjectDoc[]>(this.endpoint);
  }
  create(d: ProjectDoc): Observable<ProjectDoc> {
    return this.http.post<ProjectDoc>(`${this.endpoint}/create`, d);
  }
  update(id: string, d: Partial<ProjectDoc>): Observable<ProjectDoc> {
    return this.http.patch<ProjectDoc>(`${this.endpoint}/update/${id}`, d);
  }
  setVisibility(id: string, visible: boolean): Observable<ProjectDoc> {
    return this.http.patch<ProjectDoc>(`${this.endpoint}/visibility/${id}`, {
      visible,
    });
  }
  setAllVisibility(visible: boolean): Observable<unknown> {
    return this.http.patch(`${this.endpoint}/visibility-all`, { visible });
  }
  delete(id: string): Observable<unknown> {
    return this.http.delete(`${this.endpoint}/${id}`);
  }
  uploadImage(id: string, file: File): Observable<ProjectDoc> {
    const f = new FormData();
    f.append("image", file);
    return this.http.post<ProjectDoc>(`${this.endpoint}/upload-image/${id}`, f);
  }
}
