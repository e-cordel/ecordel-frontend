import CordelCard from "..";
import { render, screen } from "@testing-library/react";

describe("CordelCard component", () => {
  
  it("should render a link with author id", async () => {
    const summary = {
      id: 1,
      authorId:2,
      authorName: "author",
      title: "title",
      xilogravuraUrl: ""
    }
    render(<CordelCard {...summary} ></CordelCard>)

    const authorLink = await screen.findAllByRole("link", { name: "author"})
    expect(authorLink).toBeInTheDocument
  })
})