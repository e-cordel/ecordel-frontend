import { Typography } from "@mui/material";
import React from "react";

export const toParagraphs = (fullText: string) => {
  const indexOfBlock = fullText.indexOf('\n\n')
  // TODO review. Usar campo source do cordel
  const indexOfSource = fullText.indexOf('Fonte:')

  const text = indexOfSource === -1 ? fullText : fullText.substring(0, indexOfSource)

  let paragraphs = [<p role='paragraph'>{fullText}</p>];
  if (indexOfBlock >= 0) {
    paragraphs = text.split('\n\n').map((block, index) => (<p key={`block-${index}`} role='paragraph'>{toLines(block)}</p>));
  }
  return <section>
    <Typography variant="h5">Texto do cordel</Typography>
    {paragraphs}
  </section>;
}

export const toLines = (textBlock: string) => {
  const indexBreakLine = textBlock.indexOf('\n')
  if (indexBreakLine >= 0) {
    return textBlock.split('\n').map((line, index) => (<React.Fragment key={`line-${index}`} >{line}<br /></React.Fragment>));
  }
  return textBlock
}

export const getSourceLink = (fullText: string) => {
  const firstIndex = fullText.indexOf('https://') === -1 ? fullText.indexOf('http://') : fullText.indexOf('https://');
  const lastIndex = fullText.indexOf(' ', firstIndex);
  if (firstIndex === -1) return null
  const linkText = lastIndex > 0 ? fullText.substring(firstIndex, lastIndex) : fullText.substring(firstIndex)
  return (<>Fonte: <a href={linkText}>{linkText}</a></>)
}