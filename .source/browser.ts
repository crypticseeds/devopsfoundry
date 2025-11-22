// @ts-nocheck
import { browser } from 'fumadocs-mdx/runtime/browser';
import type * as Config from '../source.config';

const create = browser<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>();
const browserCollections = {
  blogs: create.doc("blogs", {"getting-started-iac.mdx": () => import("../content/docs/blogs/getting-started-iac.mdx?collection=blogs"), "index.mdx": () => import("../content/docs/blogs/index.mdx?collection=blogs"), }),
  projects: create.doc("projects", {"index.mdx": () => import("../content/docs/projects/index.mdx?collection=projects"), "microservices-architecture.mdx": () => import("../content/docs/projects/microservices-architecture.mdx?collection=projects"), }),
  tutorials: create.doc("tutorials", {"index.mdx": () => import("../content/docs/tutorials/index.mdx?collection=tutorials"), "ai-ml/fastapi-ml-deployment.mdx": () => import("../content/docs/tutorials/ai-ml/fastapi-ml-deployment.mdx?collection=tutorials"), "devops/docker-fundamentals.mdx": () => import("../content/docs/tutorials/devops/docker-fundamentals.mdx?collection=tutorials"), "linux/advanced-bash-scripting.mdx": () => import("../content/docs/tutorials/linux/advanced-bash-scripting.mdx?collection=tutorials"), "sre/kubernetes-monitoring.mdx": () => import("../content/docs/tutorials/sre/kubernetes-monitoring.mdx?collection=tutorials"), }),
};
export default browserCollections;