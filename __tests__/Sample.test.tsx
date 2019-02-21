import * as React from "react";
import Home from "../components/Sample";
import { shallow } from "enzyme";

describe("<Home />", () => {
  const wrapper = shallow(<Home message="Hello." />);

  it("matches snapshot", () => {
    // This wrapper will be automatically serialized via the
    // snapshotSerializers setting in jest.config.js
    expect(wrapper).toMatchSnapshot();
  });
  it("renders", () => {
    expect(wrapper.find("div").text()).toBe("Hello.");
  });
});
