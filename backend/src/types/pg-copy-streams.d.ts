declare module "pg-copy-streams" {
  import { Writable } from "stream";

  export function from(query: string): Writable;
}
