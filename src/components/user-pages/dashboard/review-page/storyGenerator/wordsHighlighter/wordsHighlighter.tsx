
export default function wordsHighlighter(text:string,words:string[]) {
    const regex = new RegExp(`\\b(${words.join("|")})\\b`, "gi");
    return text.replace(
      regex,
      (match) => "```" + match + "```",
    );
}
