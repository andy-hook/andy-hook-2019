import React from "react"
import CommonPage from "./common-page"
import { shallowWithTheme } from "@test-utils"

describe("<CommonPage />", () => {
  it("renders correctly", () => {
    const tree = shallowWithTheme("dark", <CommonPage>Content</CommonPage>)
    expect(tree).toMatchSnapshot()
  })
})