import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Button from "../components/Button";
import "../styles/index.css";

const stories = storiesOf("Button", module);
const baseClasses = "py-2 px-4 min-w-6 rounded-lg m-10 text-white ";
const handleButtonClick = action("👍 Clicked");

stories
  .add("Primary", () => (
    <Button
      className={`
        ${baseClasses} 
        bg-blue-dark
        hover:bg-blue
      `}
      onClick={handleButtonClick}
    >
      Click Me
    </Button>
  ))
  .add("Success", () => (
    <Button
      className={`
        ${baseClasses} 
        bg-green
        hover:bg-green-light
      `}
      onClick={handleButtonClick}
    >
      Click Me
    </Button>
  ))
  .add("Danger", () => (
    <Button
      className={`
        ${baseClasses} 
        bg-red
        hover:bg-red-light
      `}
      onClick={handleButtonClick}
    >
      Click Me
    </Button>
  ));
