// @ts-nocheck
import * as __fd_glob_12 from "../content/docs/documentation/sre/kubernetes-monitoring.mdx?collection=documentation"
import * as __fd_glob_11 from "../content/docs/documentation/linux/advanced-bash-scripting.mdx?collection=documentation"
import * as __fd_glob_10 from "../content/docs/documentation/ai-ml/fastapi-ml-deployment.mdx?collection=documentation"
import * as __fd_glob_9 from "../content/docs/documentation/devops/docker-fundamentals.mdx?collection=documentation"
import * as __fd_glob_8 from "../content/docs/documentation/index.mdx?collection=documentation"
import { default as __fd_glob_7 } from "../content/docs/documentation/linux/meta.json?collection=documentation"
import { default as __fd_glob_6 } from "../content/docs/documentation/sre/meta.json?collection=documentation"
import { default as __fd_glob_5 } from "../content/docs/documentation/devops/meta.json?collection=documentation"
import { default as __fd_glob_4 } from "../content/docs/documentation/ai-ml/meta.json?collection=documentation"
import * as __fd_glob_3 from "../content/docs/projects/microservices-architecture.mdx?collection=projects"
import * as __fd_glob_2 from "../content/docs/projects/index.mdx?collection=projects"
import * as __fd_glob_1 from "../content/docs/blogs/index.mdx?collection=blogs"
import * as __fd_glob_0 from "../content/docs/blogs/getting-started-iac.mdx?collection=blogs"
import { server } from 'fumadocs-mdx/runtime/server';
import type * as Config from '../source.config';

const create = server<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>({"doc":{"passthroughs":["extractedReferences"]}});

export const blogs = await create.docs("blogs", "content/docs/blogs", {}, {"getting-started-iac.mdx": __fd_glob_0, "index.mdx": __fd_glob_1, });

export const documentation = await create.docs("documentation", "content/docs/documentation", {"ai-ml/meta.json": __fd_glob_4, "devops/meta.json": __fd_glob_5, "sre/meta.json": __fd_glob_6, "linux/meta.json": __fd_glob_7, }, {"index.mdx": __fd_glob_8, "devops/docker-fundamentals.mdx": __fd_glob_9, "ai-ml/fastapi-ml-deployment.mdx": __fd_glob_10, "linux/advanced-bash-scripting.mdx": __fd_glob_11, "sre/kubernetes-monitoring.mdx": __fd_glob_12, });

export const projects = await create.docs("projects", "content/docs/projects", {}, {"index.mdx": __fd_glob_2, "microservices-architecture.mdx": __fd_glob_3, });