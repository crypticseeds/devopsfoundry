// @ts-nocheck
import * as __fd_glob_12 from "../content/docs/tutorials/sre/kubernetes-monitoring.mdx?collection=tutorials"
import * as __fd_glob_11 from "../content/docs/tutorials/linux/advanced-bash-scripting.mdx?collection=tutorials"
import * as __fd_glob_10 from "../content/docs/tutorials/devops/docker-fundamentals.mdx?collection=tutorials"
import * as __fd_glob_9 from "../content/docs/tutorials/ai-ml/fastapi-ml-deployment.mdx?collection=tutorials"
import * as __fd_glob_8 from "../content/docs/tutorials/index.mdx?collection=tutorials"
import { default as __fd_glob_7 } from "../content/docs/tutorials/sre/meta.json?collection=tutorials"
import { default as __fd_glob_6 } from "../content/docs/tutorials/linux/meta.json?collection=tutorials"
import { default as __fd_glob_5 } from "../content/docs/tutorials/devops/meta.json?collection=tutorials"
import { default as __fd_glob_4 } from "../content/docs/tutorials/ai-ml/meta.json?collection=tutorials"
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

export const projects = await create.docs("projects", "content/docs/projects", {}, {"index.mdx": __fd_glob_2, "microservices-architecture.mdx": __fd_glob_3, });

export const tutorials = await create.docs("tutorials", "content/docs/tutorials", {"ai-ml/meta.json": __fd_glob_4, "devops/meta.json": __fd_glob_5, "linux/meta.json": __fd_glob_6, "sre/meta.json": __fd_glob_7, }, {"index.mdx": __fd_glob_8, "ai-ml/fastapi-ml-deployment.mdx": __fd_glob_9, "devops/docker-fundamentals.mdx": __fd_glob_10, "linux/advanced-bash-scripting.mdx": __fd_glob_11, "sre/kubernetes-monitoring.mdx": __fd_glob_12, });