import Fuse from "fuse.js";
import {
  getPublications,
  getSkills,
  getAwards,
  getVolunteering,
  getBlogPosts,
  getExperienceItems,
  type Publication,
  type SkillCategory,
  type Award,
  type Volunteering,
  type BlogPost,
  type ExperienceItem,
} from "./contentLoader";

export type SearchResult = {
  type: string;
  title: string;
  slug: string;
  description?: string;
  category?: string;
};

function createSearchableItems() {
  const items: SearchResult[] = [];

  // Publications
  getPublications().forEach((pub) => {
    items.push({
      type: "publication",
      title: pub.title,
      slug: pub.slug,
      description: pub.abstract,
      category: pub.venueShort,
    });
  });

  // Skills
  getSkills().forEach((skill) => {
    items.push({
      type: "skill",
      title: skill.category,
      slug: skill.category.toLowerCase().replace(/\s+/g, "-"),
      description: skill.summary,
      category: "Skills",
    });
  });

  // Experience Items (includes programs, research, internships, engineering projects)
  getExperienceItems().forEach((item) => {
    items.push({
      type: "experience",
      title: item.title,
      slug: item.slug,
      description: item.summary,
      category: item.type,
    });
  });

  // Awards
  getAwards().forEach((award) => {
    items.push({
      type: "award",
      title: award.title,
      slug: award.title.toLowerCase().replace(/\s+/g, "-"),
      description: award.description,
      category: award.organization,
    });
  });

  // Volunteering
  getVolunteering().forEach((vol) => {
    items.push({
      type: "volunteering",
      title: vol.title,
      slug: vol.title.toLowerCase().replace(/\s+/g, "-"),
      description: vol.description,
      category: vol.organization,
    });
  });

  // Blog Posts
  getBlogPosts().forEach((post) => {
    items.push({
      type: "blog",
      title: post.title,
      slug: post.slug,
      description: post.excerpt,
      category: "Blog",
    });
  });

  return items;
}

const searchableItems = createSearchableItems();

const fuseOptions = {
  keys: [
    { name: "title", weight: 0.7 },
    { name: "description", weight: 0.3 },
    { name: "category", weight: 0.2 },
  ],
  threshold: 0.4,
  includeScore: true,
};

const fuse = new Fuse(searchableItems, fuseOptions);

export function searchContent(query: string, category: string = "All"): SearchResult[] {
  if (!query.trim()) {
    return [];
  }

  const results = fuse.search(query);
  let filteredResults = results.map((result) => result.item);

  if (category !== "All") {
    const categoryMap: Record<string, string> = {
      Publications: "publication",
      Skills: "skill",
      Experience: "experience",
      Blog: "blog",
      Awards: "award",
      Volunteering: "volunteering",
    };
    const typeFilter = categoryMap[category];
    if (typeFilter) {
      filteredResults = filteredResults.filter((item) => item.type === typeFilter);
    }
  }

  return filteredResults.slice(0, 20); // Limit to 20 results
}
