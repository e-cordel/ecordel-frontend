import { Box, Typography } from "@mui/material";
import React from "react";

const stripSourceText = (fullText: string) => {
  const sourceIndex = fullText.search(/Fonte\s*:/i);
  if (sourceIndex === -1) {
    return fullText.trim();
  }

  return fullText.substring(0, sourceIndex).trim();
};

export const toParagraphs = (fullText: string) => {
  const text = stripSourceText(fullText);
  const blocks = text
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean);

  const paragraphs = blocks.length > 0
    ? blocks.map((block, index) => (
        <p key={`block-${index}`} role='paragraph'>{toLines(block)}</p>
      ))
    : [<p key='block-0' role='paragraph'>{toLines(text)}</p>];

  return <Box component="section" sx={{mt: 2}}>
    <Typography variant="h4">Texto do cordel</Typography>
    {paragraphs}
  </Box>;
}

export const toLines = (textBlock: string) => {
  const indexBreakLine = textBlock.indexOf('\n')
  if (indexBreakLine >= 0) {
    return textBlock.split('\n').map((line, index) => (<React.Fragment key={`line-${index}`}>{line}<br /></React.Fragment>));
  }
  return textBlock
}

export const getSourceLink = (fullText: string) => {
  const match = fullText.match(/https?:\/\/[^\s<>"]+/i);
  if (!match) return null;

  const linkText = match[0].replace(/[.,;!?]+$/, "");
  return (<>Fonte: <a href={linkText}>{linkText}</a></>)
}