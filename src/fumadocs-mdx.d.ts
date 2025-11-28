declare module "fumadocs-mdx:collections/server" {
  export const blogs: Awaited<
    ReturnType<typeof import("../../.source/server").blogs>
  >;
  export const projects: Awaited<
    ReturnType<typeof import("../../.source/server").projects>
  >;
  export const documentation: Awaited<
    ReturnType<typeof import("../../.source/server").documentation>
  >;
  export const tutorials: Awaited<
    ReturnType<typeof import("../../.source/server").tutorials>
  >;
}
