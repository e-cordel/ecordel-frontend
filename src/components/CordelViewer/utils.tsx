import React from "react";

export const toParagraphs = (fullText: string) => {
  const indexOfBlock = fullText.indexOf('\n\n')
  const indexOfSource = fullText.indexOf('Fonte:')

  const text = indexOfSource === -1 ? fullText : fullText.substring(0, indexOfSource)

  if (indexOfBlock >= 0) {
    return text.split('\n\n').map((block, index) => (<p key={`block-${index}`}>{toLines(block)}</p>));
  }
  return (<p>{fullText}</p>);
}

export const toLines = (textBlock: string) => {
  const indexBreakLine = textBlock.indexOf('\n')
  if (indexBreakLine >= 0) {
    return textBlock.split('\n').map((line, index) => (<React.Fragment key={line} >{line}<br /></React.Fragment>));
  }
  return textBlock
}

export const getSourceLink = (fullText: string) => {
  const firstIndex = fullText.indexOf('https://');
  const lastIndex = fullText.indexOf(' ', firstIndex);
  if (firstIndex === -1) return null
  const linkText = lastIndex > 0 ? fullText.substring(firstIndex, lastIndex) : fullText.substring(firstIndex)
  return (<>Fonte: <a href={linkText}>{linkText}</a></>)
}