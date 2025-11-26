// @ts-nocheck
import * as __fd_glob_16 from "../content/docs/documentation/sre/kubernetes-monitoring.mdx?collection=documentation";
import * as __fd_glob_15 from "../content/docs/documentation/linux/advanced-bash-scripting.mdx?collection=documentation";
import * as __fd_glob_14 from "../content/docs/documentation/devops/docker-fundamentals.mdx?collection=documentation";
import * as __fd_glob_13 from "../content/docs/documentation/ai-ml/fastapi-ml-deployment.mdx?collection=documentation";
import * as __fd_glob_12 from "../content/docs/documentation/index.mdx?collection=documentation";
import { default as __fd_glob_11 } from "../content/docs/documentation/sre/meta.json?collection=documentation";
import { default as __fd_glob_10 } from "../content/docs/documentation/linux/meta.json?collection=documentation";
import { default as __fd_glob_9 } from "../content/docs/documentation/devops/meta.json?collection=documentation";
import { default as __fd_glob_8 } from "../content/docs/documentation/ai-ml/meta.json?collection=documentation";
import * as __fd_glob_7 from "../content/docs/projects/microservices-architecture.mdx?collection=projects";
import * as __fd_glob_6 from "../content/docs/projects/ai-powered-log-analyzer.mdx?collection=projects";
import * as __fd_glob_5 from "../content/docs/blogs/sre-incident-response.mdx?collection=blogs";
import * as __fd_glob_4 from "../content/docs/blogs/kubernetes-secrets-management.mdx?collection=blogs";
import * as __fd_glob_3 from "../content/docs/blogs/kubernetes-networking-deep-dive.mdx?collection=blogs";
import * as __fd_glob_2 from "../content/docs/blogs/getting-started-iac.mdx?collection=blogs";
import * as __fd_glob_1 from "../content/docs/blogs/cost-optimization-aws.mdx?collection=blogs";
import * as __fd_glob_0 from "../content/docs/blogs/ci-cd-pipeline-optimization.mdx?collection=blogs";
import { server } from "fumadocs-mdx/runtime/server";
import type * as Config from "../source.config";

const create = server<
  typeof Config,
  import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
    DocData: {};
  }
>({ doc: { passthroughs: ["extractedReferences"] } });

export const blogs = await create.docs(
  "blogs",
  "content/docs/blogs",
  {},
  {
    "ci-cd-pipeline-optimization.mdx": __fd_glob_0,
    "cost-optimization-aws.mdx": __fd_glob_1,
    "getting-started-iac.mdx": __fd_glob_2,
    "kubernetes-networking-deep-dive.mdx": __fd_glob_3,
    "kubernetes-secrets-management.mdx": __fd_glob_4,
    "sre-incident-response.mdx": __fd_glob_5,
  },
);

export const documentation = await create.docs(
  "documentation",
  "content/docs/documentation",
  {
    "ai-ml/meta.json": __fd_glob_8,
    "devops/meta.json": __fd_glob_9,
    "linux/meta.json": __fd_glob_10,
    "sre/meta.json": __fd_glob_11,
  },
  {
    "index.mdx": __fd_glob_12,
    "ai-ml/fastapi-ml-deployment.mdx": __fd_glob_13,
    "devops/docker-fundamentals.mdx": __fd_glob_14,
    "linux/advanced-bash-scripting.mdx": __fd_glob_15,
    "sre/kubernetes-monitoring.mdx": __fd_glob_16,
  },
);

export const projects = await create.docs(
  "projects",
  "content/docs/projects",
  {},
  {
    "ai-powered-log-analyzer.mdx": __fd_glob_6,
    "microservices-architecture.mdx": __fd_glob_7,
  },
);

export const tutorials = await create.docs(
  "tutorials",
  "content/docs/tutorials",
  {},
  {},
);
