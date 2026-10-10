import { Box, Typography } from "@mui/material";
import React from "react";

export const stripSourceText = (fullText: string) => {
  const sourceIndex = fullText.search(/Fonte\s*:/i);
  if (sourceIndex === -1) {
    return fullText.trim();
  }

  return fullText.substring(0, sourceIndex).trim();
};

export const splitIntoParagraphs = (fullText: string) =>
  stripSourceText(fullText)
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean);

export const splitIntoPages = (fullText: string, stanzasPerPage = 2) => {
  const paragraphs = splitIntoParagraphs(fullText);
  if (paragraphs.length === 0) {
    return [] as string[][];
  }

  const pages: string[][] = [];
  for (let index = 0; index < paragraphs.length; index += stanzasPerPage) {
    pages.push(paragraphs.slice(index, index + stanzasPerPage));
  }
  return pages;
};

export const toParagraphs = (fullText: string) => {
  const paragraphs = splitIntoParagraphs(fullText);
  const blocks = paragraphs.length > 0 ? paragraphs : [stripSourceText(fullText)];

  return (
    <Box component="section" sx={{ mt: 2 }}>
      <Typography variant="h4">Texto do cordel</Typography>
      {blocks.map((block, index) => (
        <p key={`block-${index}`} role="paragraph">{toLines(block)}</p>
      ))}
    </Box>
  );
};

export const toLines = (textBlock: string) => {
  const indexBreakLine = textBlock.indexOf("\n");
  if (indexBreakLine >= 0) {
    return textBlock
      .split("\n")
      .map((line, index) => <React.Fragment key={`line-${index}`}>{line}<br /></React.Fragment>);
  }
  return textBlock;
};

export const getSourceLink = (fullText: string) => {
  const match = fullText.match(/https?:\/\/[^\s<>"]+/i);
  if (!match) return null;

  const linkText = match[0].replace(/[.,;!?]+$/, "");
  return <>Fonte: <a href={linkText}>{linkText}</a></>;
};