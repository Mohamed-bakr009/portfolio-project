import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { forkJoin, Observable, map } from "rxjs";
import { environment } from "../../environments/environment";
import { PortfolioExtra } from "../models/portfolio.models";
interface Education {
  _id?: string;
  institution: string;
  degree: string;
  field: string;
  startYear?: number;
  endYear?: number;
  visible?: boolean;
}
interface Experience {
  _id?: string;
  company: string;
  position: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  visible?: boolean;
}
@Injectable({ providedIn: "root" })
export class PortfolioContentService {
  constructor(private http: HttpClient) {}
  getExtras(): Observable<PortfolioExtra[]> {
    return forkJoin({
      e: this.http.get<Education[]>(`${environment.apiUrl}/educaion`),
      x: this.http.get<Experience[]>(`${environment.apiUrl}/exprerience`),
    }).pipe(
      map(({ e, x }) => [
        ...e
          .filter((i) => i.visible !== false)
          .map((i) => ({
            title: i.degree,
            org: `${i.institution}${i.field ? " — " + i.field : ""}`,
            date: [i.startYear, i.endYear].filter(Boolean).join(" – "),
            type: "education" as const,
            _id: i._id,
          })),
        ...x
          .filter((i) => i.visible !== false)
          .map((i) => ({
            title: i.position,
            org: i.company,
            date: [i.startDate, i.endDate].filter(Boolean).join(" – "),
            type: "experience" as const,
            _id: i._id,
          })),
      ]),
    );
  }
}
