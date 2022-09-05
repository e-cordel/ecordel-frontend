import { getSourceLink, toParagraphs, toLines } from "../TextBlockUtils";

describe('paragraphs', () => {

  it('should build paragraphs', () => {
    const textWithParagraphs = 'Lorem ipsum dolor sit amet,\n consectetur adipiscing elit,\n sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\n\n Donec pretium vulputate sapien\n nec sagittis aliquam malesuada bibendum.\n Ut diam quam nulla porttitor massa id neque.\n Cras tincidunt lobortis feugiat vivamus at.'
    const paragraphs = toParagraphs(textWithParagraphs);
    expect(paragraphs).toHaveLength(2);
  });

  it('should build text with a single paragraph', () => {
    const textWithoutParagraphs = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse dui est, pellentesque non sagittis nec, volutpat id ante. In pharetra lacus tortor, vitae bibendum erat mattis a. Etiam efficitur lacinia ipsum quis elementum'
    const paragraphs = toParagraphs(textWithoutParagraphs);
    expect(paragraphs).toHaveLength(1);
  });

})

describe('source links', () => {

  it('should build the source link link', () => {
    const textWithHttpsLink = 'Lorem ipsum dolor sit amet,\n consectetur adipiscing elit,\n Fonte:\nhttps://test.com.br'
    const textWithLink = 'Lorem ipsum dolor sit amet,\n consectetur adipiscing elit,\n Fonte:\nhttp://test.com.br'

    expect(getSourceLink(textWithHttpsLink)).not.toBeNull();
    expect(getSourceLink(textWithLink)).not.toBeNull();
  });

  it('should null if source link link doesn\'t exists ', () => {
    const textWithoutLink = 'Lorem ipsum dolor sit amet,\n consectetur adipiscing elit'

    expect(getSourceLink(textWithoutLink)).toBeNull();
  });
})

describe('line breaks', () => {

  it('should render line breaks', () => {
    const textblock = 'Lorem ipsum dolor sit amet, \n consectetur adipiscing elit, \n sed do eiusmod tempor incididunt \nut labore et dolore magna aliqua.'
    const lines = toLines(textblock);
    expect(lines).toHaveLength(4);
  });

  it('should render line breaks', () => {
    const textblockWithoutLineBreaks = 'Lorem ipsum dolor sit amet.'
    const text = toLines(textblockWithoutLineBreaks);
    expect(text).toBe(textblockWithoutLineBreaks)
  });
})