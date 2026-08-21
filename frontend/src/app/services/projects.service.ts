import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, map } from "rxjs";

import { environment } from "../../environments/environment";
import { Project } from "../models/portfolio.models";
import { toAssetUrl } from "../shared/asset-url";

interface ProjectDoc {
  _id: string;
  title: string;
  description: string;
  image?: string;
  technologies?: string[];
  githubUrl?: string;
  liveUrl?: string;
  category?: string;
  visible?: boolean;
}

const FALLBACK_IMAGE = "assets/project-dashboard.svg";

@Injectable({ providedIn: "root" })
export class ProjectsService {
  private readonly endpoint = `${environment.apiUrl}/project`;

  constructor(private http: HttpClient) {}

  getProjects(): Observable<Project[]> {
    return this.http.get<ProjectDoc[]>(this.endpoint).pipe(
      map((docs) =>
        docs
          .filter((d) => d.visible !== false)
          .map((doc, i) => {
            const hasLiveDemo = !!doc.liveUrl;
            return {
              index: `${String(i + 1).padStart(2, "0")} / ${(doc.category || "PROJECT").toUpperCase()}`,
              title: doc.title,
              description: doc.description,
              image: toAssetUrl(doc.image, FALLBACK_IMAGE),
              imageAlt: `${doc.title} preview`,
              tags: doc.technologies || [],
              linkLabel: hasLiveDemo ? "Live Demo" : "GitHub",
              linkIcon: hasLiveDemo
                ? "fa-solid fa-arrow-up-right-from-square"
                : "fa-brands fa-github",
              linkHref: doc.liveUrl || doc.githubUrl || "#",
              featured: i === 0,
            };
          }),
      ),
    );
  }
}
