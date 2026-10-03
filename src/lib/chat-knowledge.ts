import blogContentJson from "@/content/blog.json";
import portfolioContentJson from "@/content/portfolio.json";
import {
  competencies,
  education,
  experiences,
  faqs,
  projects,
  services,
  siteConfig,
} from "@/data/portfolio";

type UnknownRecord = Record<string, unknown>;

type KnowledgeItem = {
  id: string;
  text: string;
  keywords: string[];
  priority: number;
  always?: boolean;
};

const blogPosts = (
  Array.isArray(blogContentJson)
    ? blogContentJson
    : []
) as unknown[];

const cmsProjects = (
  Array.isArray(portfolioContentJson)
    ? portfolioContentJson
    : []
) as unknown[];

function asRecord(
  value: unknown,
): UnknownRecord | null {
  if (
    !value ||
    typeof value !== "object" ||
    Array.isArray(value)
  ) {
    return null;
  }

  return value as UnknownRecord;
}

function getString(
  record: UnknownRecord,
  key: string,
) {
  const value = record[key];

  return typeof value === "string"
    ? value.trim()
    : "";
}

function getStringArray(
  record: UnknownRecord,
  key: string,
) {
  const value = record[key];

  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter(
      (item): item is string =>
        typeof item === "string",
    )
    .map((item) => item.trim())
    .filter(Boolean);
}

function cleanText(value: string) {
  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function truncate(
  value: string,
  max = 650,
) {
  const cleaned = cleanText(value);

  if (cleaned.length <= max) {
    return cleaned;
  }

  return `${cleaned.slice(0, max).trim()}...`;
}

function normalize(value: string) {
  return value.toLowerCase();
}

function tokenize(value: string) {
  return normalize(value)
    .split(/[^\p{L}\p{N}]+/u)
    .map((token) => token.trim())
    .filter((token) => token.length >= 2);
}

function unique(
  values: string[],
) {
  return [...new Set(values.filter(Boolean))];
}

function createKnowledgeItems(): KnowledgeItem[] {
  const items: KnowledgeItem[] = [];

  items.push({
    id: "profile",
    always: true,
    priority: 100,
    keywords: [
      "ahsan",
      "profile",
      "about",
      "who",
      "developer",
      "seo",
      "orm",
      "wordpress",
    ],
    text: [
      `Name: ${siteConfig.name}.`,
      `Professional title: ${siteConfig.title}.`,
      siteConfig.description,
      `Location: ${siteConfig.address.display}.`,
      `Company: ${siteConfig.company}.`,
      `University: ${siteConfig.university}.`,
      `Professional roles: ${siteConfig.roles.join(", ")}.`,
    ].join(" "),
  });

  items.push({
    id: "contact",
    always: true,
    priority: 100,
    keywords: [
      "contact",
      "email",
      "phone",
      "whatsapp",
      "reach",
      "hire",
      "যোগাযোগ",
    ],
    text: [
      `Email: ${siteConfig.email}.`,
      `Phone: ${siteConfig.phoneDisplay}.`,
      `Location: ${siteConfig.address.display}.`,
      "Visitors can use the Contact page to send a project inquiry.",
    ].join(" "),
  });

  items.push({
    id: "skills",
    priority: 90,
    keywords: [
      "skill",
      "skills",
      "technology",
      "technologies",
      "stack",
      "frontend",
      "react",
      "next",
      "wordpress",
      "seo",
      "orm",
      "দক্ষতা",
      "স্কিল",
    ],
    text: `Core competencies: ${competencies
      .map(
        (item) =>
          `${item.label} (${item.value}%)`,
      )
      .join(", ")}.`,
  });

  for (const service of services) {
    items.push({
      id: `service-${service.slug}`,
      priority: 80,
      keywords: unique([
        "service",
        "services",
        "hire",
        "project",
        service.title,
        service.slug,
        ...tokenize(service.description),
      ]),
      text: `Service: ${service.title}. ${service.description}`,
    });
  }

  for (const experience of experiences) {
    items.push({
      id: `experience-${experience.period}-${experience.title}`,
      priority: 85,
      keywords: unique([
        "experience",
        "work",
        "job",
        "career",
        "company",
        "role",
        experience.title,
        experience.company,
        ...experience.responsibilities.flatMap(
          tokenize,
        ),
      ]),
      text: [
        `Work experience: ${experience.title} at ${experience.company}.`,
        `Period: ${experience.period}.`,
        `Responsibilities: ${experience.responsibilities.join(
          " ",
        )}`,
      ].join(" "),
    });
  }

  for (const item of education) {
    items.push({
      id: `education-${item.period}-${item.title}`,
      priority: 75,
      keywords: unique([
        "education",
        "degree",
        "university",
        "study",
        "college",
        item.title,
        item.institution,
      ]),
      text: [
        `Education: ${item.title} at ${item.institution}.`,
        `Period: ${item.period}.`,
        `Result: ${item.result}.`,
        item.description,
      ].join(" "),
    });
  }

  for (const faq of faqs) {
    items.push({
      id: `faq-${faq.question}`,
      priority: 70,
      keywords: unique([
        ...tokenize(faq.question),
        ...tokenize(faq.answer),
      ]),
      text: `FAQ: ${faq.question} Answer: ${faq.answer}`,
    });
  }

  for (const project of projects) {
    items.push({
      id: `static-project-${project.slug}`,
      priority: 82,
      keywords: unique([
        "portfolio",
        "project",
        "case study",
        "work sample",
        project.title,
        project.slug,
        ...project.tags,
        ...tokenize(project.description),
      ]),
      text: [
        `Portfolio project: ${project.title}.`,
        project.description,
        `Technologies: ${project.tags.join(", ")}.`,
        `Live URL: ${project.url}.`,
      ].join(" "),
    });
  }

  cmsProjects.forEach(
    (rawProject, index) => {
      const project =
        asRecord(rawProject);

      if (!project) {
        return;
      }

      const title =
        getString(project, "title") ||
        `CMS Project ${index + 1}`;

      const slug =
        getString(project, "slug");

      const description =
        getString(
          project,
          "description",
        ) ||
        getString(project, "excerpt");

      const problem =
        getString(project, "problem") ||
        getString(project, "challenge");

      const goal =
        getString(project, "goal");

      const approach =
        getString(project, "approach") ||
        getString(project, "solution");

      const result =
        getString(project, "result") ||
        getString(project, "results");

      const url =
        getString(project, "url") ||
        getString(project, "liveUrl");

      const githubUrl =
        getString(project, "githubUrl");

      const tags = unique([
        ...getStringArray(
          project,
          "tags",
        ),
        ...getStringArray(
          project,
          "technologies",
        ),
      ]);

      const text = [
        `CMS portfolio project: ${title}.`,
        description &&
          `Description: ${truncate(
            description,
          )}`,
        problem &&
          `Problem: ${truncate(problem)}`,
        goal &&
          `Goal: ${truncate(goal)}`,
        approach &&
          `Approach: ${truncate(
            approach,
          )}`,
        result &&
          `Result: ${truncate(result)}`,
        tags.length > 0 &&
          `Technologies: ${tags.join(
            ", ",
          )}.`,
        url && `Live URL: ${url}.`,
        githubUrl &&
          `GitHub URL: ${githubUrl}.`,
      ]
        .filter(Boolean)
        .join(" ");

      items.push({
        id: `cms-project-${slug || index}`,
        priority: 88,
        keywords: unique([
          "portfolio",
          "project",
          "case study",
          title,
          slug,
          ...tags,
          ...tokenize(description),
          ...tokenize(problem),
          ...tokenize(goal),
          ...tokenize(approach),
          ...tokenize(result),
        ]),
        text,
      });
    },
  );

  blogPosts.forEach(
    (rawPost, index) => {
      const post =
        asRecord(rawPost);

      if (!post) {
        return;
      }

      const title =
        getString(post, "title") ||
        `Blog Post ${index + 1}`;

      const slug =
        getString(post, "slug");

      const excerpt =
        getString(post, "excerpt") ||
        getString(
          post,
          "description",
        ) ||
        getString(
          post,
          "metaDescription",
        );

      const content =
        getString(post, "content");

      const category =
        getString(post, "category");

      const tags =
        getStringArray(post, "tags");

      items.push({
        id: `blog-${slug || index}`,
        priority: 65,
        keywords: unique([
          "blog",
          "article",
          "post",
          title,
          slug,
          category,
          ...tags,
          ...tokenize(excerpt),
          ...tokenize(content),
        ]),
        text: [
          `Blog post: ${title}.`,
          category &&
            `Category: ${category}.`,
          tags.length > 0 &&
            `Tags: ${tags.join(", ")}.`,
          excerpt &&
            `Summary: ${truncate(
              excerpt,
              450,
            )}`,
          !excerpt &&
            content &&
            `Summary: ${truncate(
              content,
              450,
            )}`,
          slug &&
            `Website path: /blog/${slug}.`,
        ]
          .filter(Boolean)
          .join(" "),
      });
    },
  );

  return items;
}

function scoreItem(
  item: KnowledgeItem,
  questionTokens: string[],
) {
  let score = item.priority;

  const searchable = normalize(
    `${item.text} ${item.keywords.join(
      " ",
    )}`,
  );

  for (const token of questionTokens) {
    if (searchable.includes(token)) {
      score +=
        token.length >= 6 ? 7 : 4;
    }
  }

  return score;
}

export function buildChatKnowledge(
  question: string,
) {
  const items =
    createKnowledgeItems();

  const tokens =
    tokenize(question);

  const always = items.filter(
    (item) => item.always,
  );

  const relevant = items
    .filter((item) => !item.always)
    .map((item) => ({
      item,
      score: scoreItem(
        item,
        tokens,
      ),
    }))
    .sort(
      (a, b) =>
        b.score - a.score,
    )
    .slice(0, 12)
    .map(({ item }) => item);

  return [...always, ...relevant]
    .map(
      (item) =>
        `- ${item.text}`,
    )
    .join("\n");
}