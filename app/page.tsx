"use client";

import { useState } from "react";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Linkedin, Github, GraduationCap, ExternalLink, Twitter } from "lucide-react";
import {
  getFeaturedPublications,
  getSkills,
  getExperienceItemsByType,
  getEducation,
  getProfile,
} from "@/lib/contentLoader";
import TimelineView from "@/components/timeline/TimelineView";
import ExperienceCard from "@/components/cards/ExperienceCard";
import PublicationCard from "@/components/cards/PublicationCard";
import SkillCategoryCard from "@/components/cards/SkillCategoryCard";
import PublicationModal from "@/components/modals/PublicationModal";
import SkillModal from "@/components/modals/SkillModal";
import type { Publication, SkillCategory } from "@/lib/contentLoader";

export default function HomePage() {
  const profile = getProfile();
  const featuredPublications = getFeaturedPublications(4);
  const skills = getSkills();
  const programItems = getExperienceItemsByType("program").slice(0, 3);
  const researchItems = getExperienceItemsByType("research").slice(0, 3);
  const internshipItems = getExperienceItemsByType("internship").slice(0, 3);
  const engineeringItems = getExperienceItemsByType("engineering").slice(0, 6);
  const education = getEducation();

  const [selectedPublication, setSelectedPublication] = useState<Publication | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<SkillCategory | null>(null);
  const [activeExperienceTab, setActiveExperienceTab] = useState<"program" | "research" | "engineering">("program");

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {profile.photo && (
              <div className="flex-shrink-0 w-48 h-48 relative rounded-full overflow-hidden border-4 border-accent/20">
                <Image
                  src={profile.photo}
                  alt={profile.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                {profile.name}
              </h1>
              <p className="text-xl text-foreground/70 mb-6">{profile.title}</p>
              <div className="text-foreground/80 mb-6 leading-relaxed">
                {profile.links ? (() => {
                  const processText = (text: string) => {
                    const parts: (string | JSX.Element)[] = [];
                    let lastIndex = 0;
                    
                    // Create a sorted array of matches by position
                    const matches: Array<{ name: string; url: string; index: number }> = [];
                    Object.entries(profile.links).forEach(([name, url]) => {
                      const regex = new RegExp(name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
                      let match;
                      while ((match = regex.exec(text)) !== null) {
                        matches.push({ name, url, index: match.index });
                      }
                    });
                    
                    // Sort by index
                    matches.sort((a, b) => a.index - b.index);
                    
                    // Build the parts array
                    matches.forEach(({ name, url, index }) => {
                      // Add text before the match
                      if (index > lastIndex) {
                        parts.push(text.substring(lastIndex, index));
                      }
                      // Add the link
                      parts.push(
                        <a
                          key={`${name}-${index}`}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-accent hover:underline"
                        >
                          {name}
                        </a>
                      );
                      lastIndex = index + name.length;
                    });
                    
                    // Add remaining text
                    if (lastIndex < text.length) {
                      parts.push(text.substring(lastIndex));
                    }
                    
                    return parts.length > 0 ? parts : text;
                  };
                  
                  // Split by newlines and process each line
                  const lines = profile.bio.split('\n');
                  return lines.map((line, index) => (
                    <React.Fragment key={index}>
                      {processText(line)}
                      {index < lines.length - 1 && <br />}
                    </React.Fragment>
                  ));
                })() : profile.bio.split('\n').map((line, index, array) => (
                  <React.Fragment key={index}>
                    {line}
                    {index < array.length - 1 && <br />}
                  </React.Fragment>
                ))}
              </div>
              
              {/* Email */}
              <p className="text-foreground/70 mb-8">
                <a
                  href={`mailto:${profile.email}`}
                  className="hover:text-foreground transition-colors"
                >
                  {profile.email.replace("@", " [at] ").replace(/\./g, " [dot] ")}
                </a>
              </p>

              {/* Social Links */}
              <div className="flex items-center justify-center md:justify-start gap-4 mb-8">
                <a
                  href={profile.social.googleScholar}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-foreground/70 hover:text-foreground hover:bg-card rounded-md transition-colors"
                  aria-label="Google Scholar"
                >
                  <GraduationCap className="h-5 w-5" />
                </a>
                <a
                  href={profile.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-foreground/70 hover:text-foreground hover:bg-card rounded-md transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href={profile.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-foreground/70 hover:text-foreground hover:bg-card rounded-md transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href={profile.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-foreground/70 hover:text-foreground hover:bg-card rounded-md transition-colors"
                  aria-label="Twitter/X"
                >
                  <Twitter className="h-5 w-5" />
                </a>
              </div>

              {/* CTAs */}
              <div className="flex items-center justify-center md:justify-start gap-4">
                <Link
                  href="/publications"
                  className="px-6 py-3 bg-accent hover:bg-accent/90 text-white rounded-md transition-colors"
                >
                  View Publications
                </Link>
                <Link
                  href="/contact"
                  className="px-6 py-3 border border-border hover:bg-card rounded-md transition-colors"
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Availability Callout */}
      {profile.availability && (
        <section className="bg-card border-y border-border py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-lg font-medium text-foreground mb-4">
                {profile.availability.seeking}
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-sm text-accent hover:underline"
              >
                Contact me
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Selected Publications */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-foreground">Selected Publications</h2>
            <Link
              href="/publications"
              className="text-sm text-accent hover:underline flex items-center gap-1"
            >
              View all <ExternalLink className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredPublications.map((pub) => (
              <PublicationCard
                key={pub.slug}
                publication={pub}
                onClick={() => setSelectedPublication(pub)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Technical Skills */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-card">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-8">Technical Skills, Frameworks & Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill) => (
              <SkillCategoryCard
                key={skill.category}
                skillCategory={skill}
                onClick={() => setSelectedSkill(skill)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-foreground">Experience</h2>
            <Link
              href="/experience"
              className="text-sm text-accent hover:underline flex items-center gap-1"
            >
              View all <ExternalLink className="h-4 w-4" />
            </Link>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-border mb-8 overflow-x-auto">
            <button
              onClick={() => setActiveExperienceTab("program")}
              className={`px-6 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeExperienceTab === "program"
                  ? "border-accent text-accent"
                  : "border-transparent text-foreground/70 hover:text-foreground"
              }`}
            >
              Industry, Government & Academia Programs
            </button>
            <button
              onClick={() => setActiveExperienceTab("research")}
              className={`px-6 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeExperienceTab === "research"
                  ? "border-accent text-accent"
                  : "border-transparent text-foreground/70 hover:text-foreground"
              }`}
            >
              Research & Internships
            </button>
            <button
              onClick={() => setActiveExperienceTab("engineering")}
              className={`px-6 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeExperienceTab === "engineering"
                  ? "border-accent text-accent"
                  : "border-transparent text-foreground/70 hover:text-foreground"
              }`}
            >
              Engineering Projects
            </button>
          </div>

          {/* Content */}
          {activeExperienceTab === "engineering" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {engineeringItems.map((item) => (
                <ExperienceCard key={item.slug} experience={item} />
              ))}
            </div>
          ) : activeExperienceTab === "program" ? (
            <TimelineView items={programItems} />
          ) : (
            <TimelineView
              items={[...researchItems, ...internshipItems].sort((a, b) => {
                const aDate = a.dateEnd || a.dateStart;
                const bDate = b.dateEnd || b.dateStart;
                return new Date(bDate).getTime() - new Date(aDate).getTime();
              })}
            />
          )}
        </div>
      </section>

      {/* Education */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-card">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-8">Education</h2>
          <div className="space-y-6">
            {education.map((edu, index) => (
              <div
                key={index}
                className="p-6 bg-background rounded-lg border border-border"
              >
                <div className="flex items-start gap-4 mb-2">
                  {edu.logo && (
                    <div className="flex-shrink-0 w-16 h-16 relative">
                      <Image
                        src={edu.logo}
                        alt={edu.institution}
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-foreground">{edu.degree}</h3>
                      <span className="text-sm text-foreground/60">{edu.timeframe}</span>
                    </div>
                    <p className="text-foreground/70 mb-2">{edu.institution}</p>
                    {edu.gpa && (
                      <p className="text-sm text-foreground/60 mb-2">{edu.gpa}</p>
                    )}
                    {edu.valedictorian && (
                      <span className="inline-block px-2 py-1 text-xs bg-accent/20 text-accent rounded">
                        Valedictorian
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modals */}
      {selectedPublication && (
        <PublicationModal
          publication={selectedPublication}
          isOpen={!!selectedPublication}
          onClose={() => setSelectedPublication(null)}
        />
      )}
      {selectedSkill && (
        <SkillModal
          skillCategory={selectedSkill}
          isOpen={!!selectedSkill}
          onClose={() => setSelectedSkill(null)}
        />
      )}
    </div>
  );
}
