import publicationsData from "@/data/publications.json";
import skillsData from "@/data/skills.json";
import educationData from "@/data/education.json";
import awardsData from "@/data/awards.json";
import volunteeringData from "@/data/volunteering.json";
import experienceData from "@/data/experience.json";
import blogData from "@/data/blog.json";
import profileData from "@/data/profile.json";

export type Publication = typeof publicationsData[0] & {
  methods?: string;
  results?: string;
  venues?: Array<{
    venue: string;
    venueShort: string;
    year?: number;
    volume?: number;
    number?: number;
  }>;
};
export type SkillCategory = typeof skillsData[0];
export type Education = typeof educationData[0];
export type Award = typeof awardsData[0];
export type Volunteering = typeof volunteeringData[0];
export type BlogPost = typeof blogData[0];
export type Profile = typeof profileData;
export type ExperienceItem = typeof experienceData[0];

export function getPublications(): Publication[] {
  return publicationsData.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getFeaturedPublications(count: number = 4): Publication[] {
  return getPublications()
    .filter(pub => pub.featured)
    .slice(0, count);
}

export function getPublicationBySlug(slug: string): Publication | undefined {
  return publicationsData.find(pub => pub.slug === slug);
}

export function getSkills(): SkillCategory[] {
  return skillsData;
}

export function getSkillCategoryBySlug(category: string): SkillCategory | undefined {
  return skillsData.find(skill => 
    skill.category.toLowerCase().replace(/\s+/g, "-") === category.toLowerCase()
  );
}

export function getEducation(): Education[] {
  return educationData;
}

export function getAwards(): Award[] {
  return awardsData.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getVolunteering(): Volunteering[] {
  return volunteeringData;
}

export function getBlogPosts(): BlogPost[] {
  return blogData.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogData.find(post => post.slug === slug);
}

export function getProfile(): Profile {
  return profileData;
}

export function getExperienceItems(): ExperienceItem[] {
  return experienceData.sort((a, b) => {
    // If both are ongoing (dateEnd is null), sort by start date (newest first)
    if (a.dateEnd === null && b.dateEnd === null) {
      return new Date(b.dateStart).getTime() - new Date(a.dateStart).getTime();
    }
    // If only one is ongoing, it should be first
    if (a.dateEnd === null) return -1;
    if (b.dateEnd === null) return 1;
    
    // Both have end dates, compare them (newest first)
    const aDate = new Date(a.dateEnd).getTime();
    const bDate = new Date(b.dateEnd).getTime();
    return bDate - aDate;
  });
}

export function getExperienceItemsByType(type: "program" | "research" | "internship" | "engineering"): ExperienceItem[] {
  return getExperienceItems().filter(item => item.type === type);
}

export function getExperienceItemBySlug(slug: string): ExperienceItem | undefined {
  return experienceData.find(item => item.slug === slug);
}
