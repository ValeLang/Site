import React from 'react';
import './SuperstructuresTOC.css';
import {Link} from 'react-router-dom';

const ns = (classes) => "c-superstructurestoc " + (classes || "");

class SuperstructuresTOC extends React.Component {
  render() {

    let sectionsByPage = {
      "intro": <a to="/superstructures/intro">Introduction</a>,
      "references": <a to="/superstructures/references">References</a>,
      "reverting": <a to="/superstructures/reverting">Reverting</a>,
      "snapshots": <a to="/superstructures/snapshots">Snapshots</a>,
      "effects": <a to="/superstructures/effects">Effects</a>,
      "comparing": <a to="/superstructures/comparing">Comparing</a>,
      "forking": <a to="/superstructures/forking">Forking</a>,
      "constraints": <a to="/superstructures/constraints">Constraints</a>,
      "functions": <a to="/superstructures/functions">Functions</a>,
      "synchronization": <a to="/superstructures/synchronization">Synchronization</a>,
    };

    let page = this.props.page;
    if (page == "intro") {
      sectionsByPage["intro"] = (
        <div>
          <strong>Introduction *</strong>
          <ul className={ns()}>
            <li className={ns()}>What's a superstructure?</li>
            <li className={ns()}>Reading a Superstructure</li>
            <li className={ns()}>Requesting a Superstructure</li>
          </ul>
        </div>
      );
    }
    if (page == "references") {
      sectionsByPage["references"] = (
        <div>
          <strong>References *</strong>
          <ul className={ns()}>
            <li className={ns()}>Owning References</li>
            <li className={ns()}>Strong References</li>
            <li className={ns()}>Weak References</li>
            <li className={ns()}>Strong References Are Constraints</li>
            <li className={ns()}>Lazy References</li>
          </ul>
        </div>
      );
    }
    if (page == "reverting") {
      sectionsByPage["reverting"] = (
        <div>
          <strong>Reverting *</strong>
          <ul className={ns()}>
            <li className={ns()}>Enabling Reverting</li>
            <li className={ns()}>Using It</li>
            <li className={ns()}>What can we use reverting for?</li>
            <li className={ns()}>Keep in mind...</li>
          </ul>
        </div>
      );
    }
    if (page == "snapshots") {
      sectionsByPage["snapshots"] = (
        <div>
          <strong>Snapshots *</strong>
          <ul className={ns()}>
            <li className={ns()}>What can we use snapshots for?</li>
            <li className={ns()}>Snapshotting in Action</li>
            <li className={ns()}>Keep in mind...</li>
          </ul>
        </div>
      );
    }
    if (page == "effects") {
      sectionsByPage["effects"] = (
        <div>
          <strong>Effects *</strong>
          <ul className={ns()}>
            <li className={ns()}>Listening for Effects</li>
            <li className={ns()}>Anatomy of an Effect</li>
            <li className={ns()}>What can we use effects for?</li>
            <li className={ns()}>Keep in mind...</li>
          </ul>
        </div>
      );
    }
    if (page == "comparing") {
      sectionsByPage["comparing"] = (
        <div>
          <strong>Comparing *</strong>
          <ul className={ns()}>
            <li className={ns()}>What can comparing be used for?</li>
            <li className={ns()}>Comparing in Action</li>
            <li className={ns()}>The Diff Struct</li>
            <li className={ns()}>Diff Options</li>
          </ul>
        </div>
      );
    }
    if (page == "constraints") {
      sectionsByPage["constraints"] = (
        <div>
          <strong>Constraints *</strong>
          <ul className={ns()}>
            <li className={ns()}>Adding a Constraint</li>
            <li className={ns()}>Violating Constraints</li>
            <li className={ns()}>Trying</li>
          </ul>
        </div>
      );
    }
    if (page == "functions") {
      sectionsByPage["functions"] = (
        <div>
          <strong>Functions *</strong>
          <ul className={ns()}>
            <li className={ns()}>Show me a Function!</li>
            <li className={ns()}>Constraints</li>
            <li className={ns()}>References in Functions</li>
            <li className={ns()}>Observing Calls</li>
            <li className={ns()}>Sending Requests</li>
          </ul>
        </div>
      );
    }

    


    return (
      <div className={ns("root")}>
        Superstructures
        <ul className={ns()}>
          <li className={ns()}>{sectionsByPage["intro"]}</li>
          <li className={ns()}>{sectionsByPage["effects"]}</li>
          <li className={ns()}>{sectionsByPage["constraints"]}</li>
          <li className={ns()}>{sectionsByPage["references"]}</li>
          <li className={ns()}>{sectionsByPage["functions"]}</li>
          <li className={ns()}>{sectionsByPage["reverting"]}</li>
          <li className={ns()}>{sectionsByPage["snapshots"]}</li>
          <li className={ns()}>{sectionsByPage["comparing"]}</li>
        </ul>
      </div>

    );
    // <li className={ns()}>{sectionsByPage["forking"]}</li>
  }
}

export default SuperstructuresTOC;
