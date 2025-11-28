// @ts-nocheck
import { browser } from 'fumadocs-mdx/runtime/browser';
import type * as Config from '../source.config';

const create = browser<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>();
const browserCollections = {
  blogs: create.doc("blogs", {"ci-cd-pipeline-optimization.mdx": () => import("../content/docs/blogs/ci-cd-pipeline-optimization.mdx?collection=blogs"), "cost-optimization-aws.mdx": () => import("../content/docs/blogs/cost-optimization-aws.mdx?collection=blogs"), "getting-started-iac.mdx": () => import("../content/docs/blogs/getting-started-iac.mdx?collection=blogs"), "kubernetes-networking-deep-dive.mdx": () => import("../content/docs/blogs/kubernetes-networking-deep-dive.mdx?collection=blogs"), "kubernetes-secrets-management.mdx": () => import("../content/docs/blogs/kubernetes-secrets-management.mdx?collection=blogs"), "sre-incident-response.mdx": () => import("../content/docs/blogs/sre-incident-response.mdx?collection=blogs"), }),
  documentation: create.doc("documentation", {"index.mdx": () => import("../content/docs/documentation/index.mdx?collection=documentation"), "devops/docker-fundamentals.mdx": () => import("../content/docs/documentation/devops/docker-fundamentals.mdx?collection=documentation"), "ai-ml/fastapi-ml-deployment.mdx": () => import("../content/docs/documentation/ai-ml/fastapi-ml-deployment.mdx?collection=documentation"), "sre/kubernetes-monitoring.mdx": () => import("../content/docs/documentation/sre/kubernetes-monitoring.mdx?collection=documentation"), "linux/advanced-bash-scripting.mdx": () => import("../content/docs/documentation/linux/advanced-bash-scripting.mdx?collection=documentation"), }),
  projects: create.doc("projects", {"ai-powered-log-analyzer.mdx": () => import("../content/docs/projects/ai-powered-log-analyzer.mdx?collection=projects"), "microservices-architecture.mdx": () => import("../content/docs/projects/microservices-architecture.mdx?collection=projects"), }),
  tutorials: create.doc("tutorials", {}),
};
export default browserCollections;