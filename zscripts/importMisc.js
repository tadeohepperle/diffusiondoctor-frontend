// This script creates a file called misc.ts
// in the src/data/generated folder that exports a constant object called MISC.
// This object contains the urls of all images in the public/images/misc folder in a nested structure, such that they are easily accessible in other typescript files via the MISC constant.

import fs from "fs";
import path from "path";

const p = console.log;

// recursive access
function ra(obj, keys) {
  let t = obj;
  for (const k of keys) {
    t = t[k];
  }
  return t;
}

function slugify(str) {
  return str
    .replaceAll(" ", "_")
    .replaceAll(".", "_")
    .replaceAll("+", "_")
    .replaceAll("-", "_")
    .replaceAll("*", "_")
    .replaceAll(",", "_");
}

async function main() {
  const contents = {}; // holds a treelike structure of the public/images/misc directory

  let rootPath = "public/images/misc";

  let frontier = [{ dirPath: rootPath, contentKeys: [] }];

  while (frontier.length > 0) {
    let { dirPath, contentKeys } = frontier.pop();
    let items = fs.readdirSync(dirPath);
    for (const item of items) {
      const itemPath = `${dirPath}/${item}`;
      const isDirectory = fs.lstatSync(itemPath).isDirectory();
      if (isDirectory) {
        // add just an empty object to contents
        const dirNameSlug = slugify(item);
        ra(contents, contentKeys)[dirNameSlug] = {};
        frontier.push({
          dirPath: itemPath,
          contentKeys: [...contentKeys, dirNameSlug],
        });
      } else {
        // is a leaf node, add it to the contents
        ra(contents, contentKeys)[slugify(item)] = itemPath.substring(6); // remove the "public"
      }
    }
  }

  p(contents);

  const exportsString = `
  // **Generated Code! Do not edit manually!**\n
  export const MISC = ${JSON.stringify(contents)}`;

  fs.writeFileSync("src/data/generated/misc.ts", exportsString, "utf-8");
}

main();
