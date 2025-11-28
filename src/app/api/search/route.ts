import { blogSource } from "@/lib/sources";
import { createFromSource } from "fumadocs-core/search/server";

export const { GET } = createFromSource(blogSource);
