import React from "react";

import SideNavbar from "./SideNavbar";

describe("<SideNavbar />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<SideNavbar />);
  });
});
