import React from "react";

type HomeProps = { message?: string } & React.HTMLProps<HTMLDivElement>;

const Home = (props: HomeProps) => (
  <div className={props.className}>
    <h3>{props.message || "Hello."}</h3>
  </div>
);

export default Home;
