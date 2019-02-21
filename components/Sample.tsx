import React from "react";

type HomeProps = {
  message: string;
};

const Home = (props: HomeProps) => <div>{props.message}</div>;

export default Home;
