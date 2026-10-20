export const byFilter = (projects, key) => (key === "all" ? projects : projects.filter(p => p.cat === key));

export const featured = (projects, slugs) => slugs.map(s => projects.find(p => p.slug === s)).filter(Boolean);
