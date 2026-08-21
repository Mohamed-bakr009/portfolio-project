import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, map } from "rxjs";
import { environment } from "../../environments/environment";
import { SkillCategory } from "../models/portfolio.models";

interface SkillDoc {
  _id: string;
  name: string;
  category: string;
  icon?: string;
  visible?: boolean;
  showInTechStrip?: boolean;
}
const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  Frontend: "Responsive interfaces & reusable components",
  Backend: "Server logic, APIs & database design",
  Languages: "Core programming foundations",
  "Tools & Platforms": "Workflow, deployment & networking",
};

@Injectable({ providedIn: "root" })
export class SkillsService {
  private readonly endpoint = `${environment.apiUrl}/skills`;
  constructor(private http: HttpClient) {}
  getSkills(): Observable<SkillCategory[]> {
    return this.http.get<SkillDoc[]>(this.endpoint).pipe(
      map((docs) => {
        const visible = docs.filter((d) => d.visible !== false);
        const grouped = new Map<string, SkillDoc[]>();
        visible.forEach((d) =>
          grouped.set(d.category, [...(grouped.get(d.category) || []), d]),
        );
        return Array.from(grouped.entries()).map(([category, items]) => ({
          icon: "fa-solid fa-layer-group",
          title: category,
          description:
            CATEGORY_DESCRIPTIONS[category] ||
            "Tools & technologies I work with",
          count: items.length,
          items: items.map((i) => ({
            icon: i.icon || "fa-solid fa-code",
            iconClass: "",
            label: i.name,
          })),
        }));
      }),
    );
  }
  getTechStrip(): Observable<SkillDoc[]> {
    return this.http
      .get<SkillDoc[]>(this.endpoint)
      .pipe(
        map((d) =>
          d.filter((x) => x.visible !== false && x.showInTechStrip === true),
        ),
      );
  }
}
