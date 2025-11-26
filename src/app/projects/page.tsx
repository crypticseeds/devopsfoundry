import Link from "next/link";
import Image from "next/image";
import { projectsSource } from "@/lib/sources";
import {
  Breadcrumbs,
  createProjectBreadcrumbs,
} from "@/components/Breadcrumbs";
import { BookOpen } from "lucide-react";

interface ProjectFrontmatter {
  banner?: string;
  author?: string;
  date?: string;
  tags?: string[];
}

export default function ProjectsPage() {
  const docs = projectsSource.getPages();

  return (
    <main className="flex-1 bg-background">
      <div className="max-w-6xl mx-auto px-6 py-24 pt-32">
        <Breadcrumbs items={createProjectBreadcrumbs({})} />

        <div className="mb-16 text-center">
          <h1 className="text-4xl font-bold mb-4 md:text-5xl">Projects</h1>
          <p className="text-secondary text-lg max-w-2xl mx-auto">
            In-depth technical documentation of my projects.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {docs.map((doc) => {
            const frontmatter = doc.data as typeof doc.data & ProjectFrontmatter;
            return (
              <Link
                key={doc.url}
                href={doc.url}
                className="group flex flex-col rounded-2xl border border-border bg-card overflow-hidden transition-all hover:shadow-lg"
              >
                {/* Image Banner */}
                <div className="relative h-48 w-full overflow-hidden bg-muted">
                  {frontmatter.banner ? (
                    <Image
                      src={frontmatter.banner}
                      alt={doc.data.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-secondary/10">
                      <BookOpen className="h-12 w-12 text-secondary/50" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-6">
                  {/* Meta Data */}
                  <div className="mb-3 flex items-center gap-2 text-xs font-medium text-muted-foreground">
                    <span>{frontmatter.author || "Femi Akinlotan"}</span>
                    {frontmatter.date && (
                      <>
                        <span>•</span>
                        <span>
                          {new Date(frontmatter.date).toLocaleDateString(
                            "en-US",
                            { month: "short", year: "numeric" },
                          )}
                        </span>
                      </>
                    )}
                  </div>

                  <h2 className="mb-2 text-xl font-bold tracking-tight text-card-foreground transition-colors group-hover:text-accent-blue">
                    {doc.data.title}
                  </h2>

                  {doc.data.description && (
                    <p className="mb-6 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                      {doc.data.description}
                    </p>
                  )}

                  <div className="mt-auto">
                    <div className="flex flex-wrap gap-2">
                      {frontmatter.tags &&
                        frontmatter.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center rounded-full border border-secondary/20 bg-secondary/5 px-2.5 py-0.5 text-[10px] font-medium text-secondary transition-colors hover:border-secondary/40 hover:text-foreground hover:bg-secondary/10"
                          >
                            {tag}
                          </span>
                        ))}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {docs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-secondary text-lg">
              No projects yet. Check back soon!
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
