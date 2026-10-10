import { getSourceLink, splitIntoPages, toParagraphs, toLines } from "../TextBlockUtils";
import { render, screen } from "@testing-library/react";

describe("paragraphs", () => {
  it("should build paragraphs", () => {
    const textWithParagraphs = "Lorem ipsum dolor sit amet,\n consectetur adipiscing elit,\n sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\n\n Donec pretium vulputate sapien\n nec sagittis aliquam malesuada bibendum.\n Ut diam quam nulla porttitor massa id neque.\n Cras tincidunt lobortis feugiat vivamus at.";
    render(toParagraphs(textWithParagraphs));
    const paragraphs = screen.getAllByRole("paragraph");
    expect(paragraphs).toHaveLength(2);
  });

  it("should build text with a single paragraph", () => {
    const textWithoutParagraphs = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
    render(toParagraphs(textWithoutParagraphs));
    const paragraphs = screen.getAllByRole("paragraph");
    expect(paragraphs).toHaveLength(1);
  });

  it("should ignore the source section when building paragraphs", () => {
    const textWithSource = "Primeiro parágrafo\n\nSegundo parágrafo\n\nFonte:\nhttps://test.com.br";

    render(toParagraphs(textWithSource));

    expect(screen.getAllByRole("paragraph")).toHaveLength(2);
    expect(screen.getAllByRole("paragraph")[0].textContent).not.toContain("Fonte:");
    expect(screen.getAllByRole("paragraph")[1].textContent).not.toContain("Fonte:");
  });
});

describe("source links", () => {
  it("should build the source link", () => {
    const textWithHttpsLink = "Lorem ipsum\nFonte:\nhttps://test.com.br";
    const textWithLink = "Lorem ipsum\nFonte:\nhttp://test.com.br";

    expect(getSourceLink(textWithHttpsLink)).not.toBeNull();
    expect(getSourceLink(textWithLink)).not.toBeNull();
  });

  it("should return null if source link does not exist", () => {
    const textWithoutLink = "Lorem ipsum dolor sit amet";

    expect(getSourceLink(textWithoutLink)).toBeNull();
  });
});

describe("line breaks", () => {
  it("should render line breaks", () => {
    const textblock = "Lorem ipsum\nconsectetur adipiscing\nsed do eiusmod";
    const lines = toLines(textblock);
    expect(lines).toHaveLength(3);
  });

  it("should not render line breaks for plain text", () => {
    const textblockWithoutLineBreaks = "Lorem ipsum dolor sit amet.";
    const text = toLines(textblockWithoutLineBreaks);
    expect(text).toBe(textblockWithoutLineBreaks);
  });
});

describe("splitIntoPages", () => {
  it("chunks stanzas according to page size", () => {
    const content = "A\n\nB\n\nC\n\nD\n\nE";

    expect(splitIntoPages(content, 2)).toEqual([["A", "B"], ["C", "D"], ["E"]]);
  });

  it("returns one page for single paragraph", () => {
    const content = "Parágrafo único";

    expect(splitIntoPages(content, 2)).toEqual([["Parágrafo único"]]);
  });

  it("returns empty list for empty content", () => {
    expect(splitIntoPages("", 2)).toEqual([]);
  });
});