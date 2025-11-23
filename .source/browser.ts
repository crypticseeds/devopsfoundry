// @ts-nocheck
import { browser } from 'fumadocs-mdx/runtime/browser';
import type * as Config from '../source.config';

const create = browser<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>();
const browserCollections = {
  blogs: create.doc("blogs", {"getting-started-iac.mdx": () => import("../content/docs/blogs/getting-started-iac.mdx?collection=blogs"), "index.mdx": () => import("../content/docs/blogs/index.mdx?collection=blogs"), }),
  documentation: create.doc("documentation", {"index.mdx": () => import("../content/docs/documentation/index.mdx?collection=documentation"), "devops/docker-fundamentals.mdx": () => import("../content/docs/documentation/devops/docker-fundamentals.mdx?collection=documentation"), "ai-ml/fastapi-ml-deployment.mdx": () => import("../content/docs/documentation/ai-ml/fastapi-ml-deployment.mdx?collection=documentation"), "linux/advanced-bash-scripting.mdx": () => import("../content/docs/documentation/linux/advanced-bash-scripting.mdx?collection=documentation"), "sre/kubernetes-monitoring.mdx": () => import("../content/docs/documentation/sre/kubernetes-monitoring.mdx?collection=documentation"), }),
  projects: create.doc("projects", {"index.mdx": () => import("../content/docs/projects/index.mdx?collection=projects"), "microservices-architecture.mdx": () => import("../content/docs/projects/microservices-architecture.mdx?collection=projects"), }),
};
export default browserCollections;