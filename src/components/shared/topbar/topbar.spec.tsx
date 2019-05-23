import React from "react"
import { shallowWithTheme } from "@test-utils"

import Topbar from "./topbar"

describe("<Topbar />", () => {
  it("renders correctly", () => {
    const tree = shallowWithTheme(
      "dark",
      <Topbar onMenuOpen={jest.fn()} onMenuClose={jest.fn()} />
    )
    expect(tree).toMatchSnapshot()
  })
})
