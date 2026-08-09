import {
  CordelPage,
  flattenCordelPages,
  getCordelSearchKey,
} from "./usePaginatedCordels";

const firstPage: CordelPage = {
  content: [
    {
      id: 1,
      title: "A chegada",
      xilogravuraUrl: "",
      authorName: "Autor Um",
      authorId: 1,
      ebookUrl: "",
    },
  ],
  last: false,
  number: 0,
  totalPages: 2,
};

describe("paginated cordel search", () => {
  it("preserves the search filters and requests zero-based pages", () => {
    const getKey = getCordelSearchKey("amor & saudade");

    expect(getKey(1, firstPage)).toBe(
      "cordels/summaries?page=1&published=true&title=amor+%26+saudade"
    );
  });

  it("stops requesting pages after the last response", () => {
    const getKey = getCordelSearchKey("");

    expect(getKey(2, { ...firstPage, last: true })).toBeNull();
  });

  it("appends page content in response order", () => {
    const secondPage: CordelPage = {
      ...firstPage,
      content: [{ ...firstPage.content[0], id: 2, title: "A despedida" }],
      last: true,
      number: 1,
    };

    expect(flattenCordelPages([firstPage, secondPage])?.map(({ id }) => id)).toEqual([
      1,
      2,
    ]);
  });
});
