import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, forkJoin, map } from "rxjs";
import { environment } from "../../environments/environment";
import { Profile, ProfileShow, SocialLink } from "../models/portfolio.models";
import { toAssetUrl } from "../shared/asset-url";

interface ProfileDoc {
  _id: string;
  name: string;
  title: string;
  bio: string;
  location?: string;
  email?: string;
  phone?: string;
  image?: string;
  available?: boolean;
  portfolioHidden?: boolean;
  portfolioVisible?: boolean;
  availabilityTitle?: string;
  availabilityNote?: string;
  show?: ProfileShow;
}

@Injectable({ providedIn: "root" })
export class ProfileService {
  private readonly profileEndpoint = `${environment.apiUrl}/profile`;
  private readonly socialEndpoint = `${environment.apiUrl}/social`;

  constructor(private http: HttpClient) {}

  getProfile(): Observable<Profile> {
    return forkJoin({
      profile: this.http.get<ProfileDoc>(this.profileEndpoint),
      socials: this.http.get<SocialLink[]>(this.socialEndpoint),
    }).pipe(
      map(({ profile, socials }) => {
        const show = {
          name: profile.show?.name !== false,
          title: profile.show?.title !== false,
          bio: profile.show?.bio !== false,
          location: profile.show?.location !== false,
          email: profile.show?.email !== false,
          phone: profile.show?.phone !== false,
          image: profile.show?.image !== false,
        };
        const visibleSocials = socials.filter((s) => s.visible !== false);
        return {
          name: show.name ? profile.name : "",
          role: show.title ? profile.title : "",
          tagline: "DEVELOPER • DESIGNER • CREATOR",
          heroText: show.bio ? profile.bio : "",
          bio: show.bio ? profile.bio : "",
          location: show.location ? profile.location || "" : "",
          email: show.email ? profile.email || "" : "",
          phone: show.phone ? profile.phone || "" : "",
          image: show.image ? toAssetUrl(profile.image, "") : "",
          portfolioVisible:
            profile.portfolioVisible !== false &&
            profile.portfolioHidden !== true,
          show,
          socials: visibleSocials,
          availability: [
            {
              title:
                profile.availabilityTitle ||
                (profile.available
                  ? "Open to opportunities"
                  : "Not currently available"),
              status: profile.available ? "open" : "closed",
              note:
                profile.availabilityNote ||
                (profile.available
                  ? "Available now — internship or freelance work."
                  : "Not taking new work right now."),
            },
          ],
        };
      }),
    );
  }
}
