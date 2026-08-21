import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, map } from "rxjs";
import { environment } from "../../environments/environment";
import { CvEntry } from "../models/portfolio.models";
import { toAssetUrl } from "../shared/asset-url";

export interface CvLanguage {
  name: string;
  level: string;
}

export interface CvData {
  summary: string;
  projects: CvEntry[];
  education: CvEntry[];
  training: CvEntry[];
  experience: CvEntry[];
  techSkills: string[];
  softSkills: string[];
  languages: CvLanguage[];
  pdfUrl: string;
  available: boolean;
}

interface CvDoc {
  _id?: string;
  fileName: string;
  filePath: string;
  parsedData?: {
    summary?: string;
    projects?: CvEntry[];
    education?: CvEntry[];
    training?: CvEntry[];
    experience?: CvEntry[];
    techSkills?: string[];
    softSkills?: string[];
    languages?: CvLanguage[];
  };
  visible?: boolean;
  deleted?: boolean;
}

const EMPTY: CvData = {
  summary: "",
  projects: [],
  education: [],
  training: [],
  experience: [],
  techSkills: [],
  softSkills: [],
  languages: [],
  pdfUrl: "",
  available: false,
};

@Injectable({ providedIn: "root" })
export class CvService {
  private readonly endpoint = `${environment.apiUrl}/cv`;

  constructor(private http: HttpClient) {}

  getCv(): Observable<CvData> {
    return this.http.get<CvDoc[]>(this.endpoint).pipe(
      map((docs) => {
        const cv = docs.find(
          (doc) => doc.visible !== false && doc.deleted !== true,
        );
        if (!cv) return EMPTY;

        const parsed = cv.parsedData ?? {};

        return {
          summary: parsed.summary ?? "",
          projects: parsed.projects ?? [],
          education: parsed.education ?? [],
          training: parsed.training ?? [],
          experience: parsed.experience ?? [],
          techSkills: parsed.techSkills ?? [],
          softSkills: parsed.softSkills ?? [],
          languages: parsed.languages ?? [],
          pdfUrl: toAssetUrl(cv.filePath, ""),
          available: true,
        };
      }),
    );
  }
}
