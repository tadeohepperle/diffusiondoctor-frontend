import { renderElement } from "astro/dist/runtime/server/render/util";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { renderToString } from "react-dom/server";

import { markdown } from "@astropub/md";

function defaultTagger(strings, ...values): string {
  let result = "";
  for (let i = 0; i < strings.length; i++) {
    result += strings[i];
    if (i < values.length) {
      result += values[i];
    }
  }
  return result;
}

export async function md(strings, ...values): Promise<String> {
  // let s: string = defaultTagger(strings, values);
  // const component = ReactMarkdown({
  //   children: s, //"# Title \n lululul \n - list 1\n - list 3",
  //   remarkPlugins: [remarkGfm],
  // });
  return await markdown(defaultTagger(strings, values));
}
