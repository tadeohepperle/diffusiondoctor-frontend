import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

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

export function md(strings, ...values): JSX.Element {
  let s: string = defaultTagger(strings, values);
  return ReactMarkdown({
    children: s, //"# Title \n lululul \n - list 1\n - list 3",
    remarkPlugins: [remarkGfm],
  });
}
