/**
 * Very small "PDF to JSON" extractor for CVs.
 *
 * This is NOT an AI parser — it works by scanning the raw text pdf-parse
 * gives us for a set of known section headers (EDUCATION, TECHNICAL SKILLS,
 * SOFT SKILLS, ...), then treats everything between one header and the
 * next as that section's content. It also understands a couple of
 * formatting quirks from the reference CV layout:
 *   - Bullet lines starting with "l", "•" or "·" (common PDF bullet glyphs)
 *   - Skill lists written as one dash-separated line: "HTML - CSS - JS"
 *   - A trailing "Languages: Arabic (Native), English (Good)" line that
 *     isn't under its own header
 *
 * That means it works well for CVs formatted like the Digital CV layout on
 * the portfolio site. Very differently formatted CVs will produce partial
 * sections — that's expected, not a bug. You can always fix fields by hand
 * in the admin dashboard after upload.
 */

const SECTION_HEADERS = [
  { key: "summary", patterns: [/^(summary|profile|about me|objective)$/i] },
  { key: "projects", patterns: [/^(selected )?projects?$/i] },
  { key: "education", patterns: [/^education$/i] },
  { key: "training", patterns: [/^(training( ?& ?| and )?certifications?|certifications?|training)$/i] },
  { key: "experience", patterns: [/^(work )?experience$/i] },
  { key: "techSkills", patterns: [/^technical skills?$/i] },
  { key: "softSkills", patterns: [/^soft skills?$/i] },
  { key: "languages", patterns: [/^languages?$/i] },
];

const BULLET_RE = /^[l•·▪‣]\s+/;

function isHeaderLine(line) {
  const clean = line.trim().replace(/[:\-–]+$/, "");
  if (!clean || clean.length > 40) return null;
  for (const section of SECTION_HEADERS) {
    if (section.patterns.some((re) => re.test(clean))) {
      return section.key;
    }
  }
  return null;
}

function stripBullet(line) {
  return line.replace(BULLET_RE, "").trim();
}

/** Removes stray leading/trailing dashes left over from splitting on " - ". */
function trimDashes(str) {
  return str.replace(/^[-–\s]+|[-–\s]+$/g, "").trim();
}

/** "HTML5 - CSS3 - React.js" (possibly wrapped across lines) -> string[] */
function toDashSeparatedList(rawLines) {
  const joined = rawLines.join(" ");
  return joined
    .split(/\s[-–]\s/)
    .map((s) => s.trim())
    .filter(Boolean);
}

/** "Arabic (Native), English (Good)" -> [{name, level}] */
function toLanguageList(text) {
  return text
    .split(",")
    .map((entry) => {
      const match = entry.trim().match(/^([A-Za-z\u0600-\u06FF ]+?)\s*\(([^)]+)\)$/);
      if (match) return { name: match[1].trim(), level: match[2].trim() };
      const trimmed = entry.trim();
      return trimmed ? { name: trimmed, level: "" } : null;
    })
    .filter(Boolean);
}

/**
 * Groups lines into entries for sections like Projects/Training, where each
 * bullet line is "Title – description". Non-bulleted lines are treated as
 * a continuation of the previous entry (PDF line-wrap).
 */
function toBulletedEntryList(rawLines) {
  const entries = [];
  let current = null;

  rawLines.forEach((rawLine) => {
    if (BULLET_RE.test(rawLine)) {
      if (current) entries.push(current);
      const content = stripBullet(rawLine);
      const splitMatch = content.match(/^(.+?)\s[-–]\s(.+)$/);
      current = splitMatch
        ? { title: trimDashes(splitMatch[1]), org: trimDashes(splitMatch[2]) }
        : { title: trimDashes(content), org: "" };
    } else if (current) {
      current.org = current.org ? `${current.org} ${rawLine}` : rawLine;
    }
  });
  if (current) entries.push(current);

  return entries;
}

/**
 * Education (and similar) usually has no bullets: a wrapped title/degree
 * line, then a trailing date-ish line ("Expected Graduation: July 2027").
 * We fold everything into one entry, pulling the date line out separately.
 */
function toParagraphEntry(rawLines) {
  if (!rawLines.length) return [];

  const dateLineIndex = rawLines.findIndex((l) => /\b(19|20)\d{2}\b/.test(l) || /graduat/i.test(l));
  const dateLine = dateLineIndex >= 0 ? rawLines[dateLineIndex] : "";
  const bodyLines = rawLines.filter((_, i) => i !== dateLineIndex);

  if (!bodyLines.length) return [];

  return [
    {
      title: trimDashes(bodyLines[0]),
      org: trimDashes(bodyLines.slice(1).join(" ")),
      date: dateLine,
    },
  ];
}

/**
 * @param {string} text - raw text from pdf-parse's result.text
 * @returns structured CV data matching the shape the Angular CV modal expects
 */
function parseCvText(text) {
  const lines = text
    .split("\n")
    .map((l) => l.trim())
    // Drop pdf-parse's own page-boundary markers like "-- 1 of 1 --" and
    // blank/junk lines so they don't leak into the last item of a section.
    .filter((l) => l.length > 0 && !/^--.*--$/.test(l));

  const buckets = {};
  let currentKey = null;
  let languagesLine = "";

  lines.forEach((line) => {
    const headerKey = isHeaderLine(line);
    if (headerKey) {
      currentKey = headerKey;
      buckets[currentKey] = buckets[currentKey] || [];
      return;
    }
    // Handles CVs where "Languages: ..." is a standalone trailing line
    // rather than its own section.
    const inlineLangMatch = line.match(/^languages?\s*:\s*(.+)$/i);
    if (inlineLangMatch) {
      languagesLine = inlineLangMatch[1].split("|")[0].trim();
      return;
    }
    if (currentKey) {
      buckets[currentKey].push(line);
    }
  });

  const languages = buckets.languages && buckets.languages.length
    ? toLanguageList(buckets.languages.join(", "))
    : toLanguageList(languagesLine);

  return {
    summary: (buckets.summary || []).join(" ").trim(),
    projects: toBulletedEntryList(buckets.projects || []),
    education: toParagraphEntry(buckets.education || []),
    training: toBulletedEntryList(buckets.training || []),
    experience: toBulletedEntryList(buckets.experience || []),
    techSkills: toDashSeparatedList(buckets.techSkills || []),
    softSkills: toDashSeparatedList(buckets.softSkills || []),
    languages,
  };
}

module.exports = { parseCvText };
