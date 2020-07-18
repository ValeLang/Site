import React from 'react'
import './Snippet.css'

class Snippet extends React.Component {
  render() {
    return <div className="c-snippet root">
      <div className="c-snippet header">{this.props.header}</div>
      <div className="c-snippet code">{this.props.children}</div>
    </div>;
  }
}

export default Snippet;
