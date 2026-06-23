const source = require("../../cv/resume.json");

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function cleanDateParts(value) {
  if (!value) {
    return null;
  }

  const parts = value.split("-");
  const [year, month = "01", day = "01"] = parts;
  return `${year}-${month}-${day}`;
}

function buildHighlights(workItem) {
  const highlights = asArray(workItem.highlights);
  if (highlights.length > 0) {
    return highlights;
  }
  return workItem.summary ? [workItem.summary] : [];
}

module.exports = {
  ...source,
  basics: {
    ...source.basics,
    profiles: asArray(source.basics && source.basics.profiles)
  },
  work: asArray(source.work).map((item) => ({
    ...item,
    startDateRaw: item.startDate || null,
    endDateRaw: item.endDate || null,
    startDate: cleanDateParts(item.startDate),
    endDate: cleanDateParts(item.endDate),
    highlights: buildHighlights(item)
  })),
  education: asArray(source.education).map((item) => ({
    ...item,
    startDateRaw: item.startDate || null,
    endDateRaw: item.endDate || null,
    startDate: cleanDateParts(item.startDate),
    endDate: cleanDateParts(item.endDate)
  })),
  awards: asArray(source.awards).map((item) => ({
    ...item,
    dateRaw: item.date || null,
    date: cleanDateParts(item.date)
  })),
  certifications: asArray(source.certifications),
  skills: asArray(source.skills),
  languages: asArray(source.languages),
  interests: asArray(source.interests),
  projects: asArray(source.projects),
  resumePdfPath: "/assets/sepideh-mansouri-resume.pdf"
};
