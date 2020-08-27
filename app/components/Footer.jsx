import React from 'react'
import './Footer.css'

class Footer extends React.Component {
  render() {
    return <div className="c-footer root">
      <div className="c-footer copyright">
        Copyright © 2020 Evan Ovadia - Previously known as GelLLVM
      </div>
      <div className="c-footer everest">
        (Not to be confused with Project Everest's <a href="https://github.com/project-everest/vale">VALE: Verified Assembly Language for Everest</a>)
      </div>
    </div>;
  }
}

export default Footer;
