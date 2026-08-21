import { environment } from "../../environments/environment";
export function toAssetUrl(
  relativePath: string | null | undefined,
  fallback: string,
): string {
  if (!relativePath) return fallback;
  if (relativePath.startsWith("http://") || relativePath.startsWith("https://"))
    return relativePath;
  return `${environment.apiUrl}${relativePath}`;
}
