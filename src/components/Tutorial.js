import React from "react";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";

class Child extends React.Component {
  render() {
    return (
      <button onClick={() => this.props.action("dataFromChild")}>
        Update Parent
      </button>
    );
  }
}

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { links: [] };
  }

  fillData = () => {
    console.info("You clicked a breadcrumb.");
    for (var i = 0; i < 3; i++) {
      this.state.links.push(
        <Link color="inherit" href="/">
          <a href="#">{i + 1}</a>
        </Link>
      );
      this.setState({ links: this.state.links });
    }
  };

  addDataFromSon = (newData) => {
    this.state.links.push(
      <Link color="inherit" href="/">
        <a href="#">{newData}</a>
      </Link>
    );
    this.setState({ links: this.state.links });
  };

  render() {
    return (
      <div>
        <button type="button" onClick={this.fillData}>
          Fill Data
        </button>

        <Child action={this.addDataFromSon} />

        <Breadcrumbs aria-label="breadcrumb">{this.state.links}</Breadcrumbs>
      </div>
    );
  }
}

export default Demo;
