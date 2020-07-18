import React from 'react';
import './ReferenceTOC.css';

const ns = (classes) => "c-toc " + (classes || "");

class ReferenceTOC extends React.Component {
  render() {

    let sectionsByPage = {
      "intro": <a href="/ref/intro">Introduction</a>,
      "structs": <a href="/ref/structs">Structs</a>,
      "references": <a href="/ref/references">References</a>,
      "interfaces": <a href="/ref/interfaces">Interfaces</a>,
      "generics": <a href="/ref/generics">Generics</a>,
      "patterns": <a href="/ref/patterns">Patterns</a>,
      "operators": <a href="/ref/operators">Operators</a>,
      "errors": <a href="/ref/errors">Errors</a>,
      "regions": <a href="/ref/regions">Regions</a>,
      "cross-compilation": <a href="/ref/cross-compilation">Cross Compilation</a>,
    };

    let page = this.props.page;
    if (page == "intro") {
      sectionsByPage["intro"] = (
        <div>
          <strong>Introduction *</strong>
          <ul className={ns()}>
            <li className={ns()}>Hello world!</li>
            <li className={ns()}>Locals</li>
            <li className={ns()}>Static Typing & Inference</li>
            <li className={ns()}>Functions</li>
            <li className={ns()}>Tuples</li>
            <li className={ns()}>Arrays</li>
            <li className={ns()}>Lists</li>
            <li className={ns()}>Loops</li>
          </ul>
        </div>
      );
    }
    if (page == "structs") {
      sectionsByPage["structs"] = (
        <div>
          <strong>Structs *</strong>
          <ul className={ns()}>
            <li className={ns()}>Structs</li>
            <li className={ns()}>Constructors</li>
            <ul className={ns()}>
              <li className={ns()}>Shortcalling</li>
            </ul>
            <li className={ns()}>Ownership</li>
            <li className={ns()}>Destructors</li>
            <li className={ns()}>Mutability</li>
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
            <ul className={ns()}>
              <li className={ns()}>Immutables</li>
              <li className={ns()}>Moving</li>
            </ul>
            <li className={ns()}>Non-owning References</li>
            <ul className={ns()}>
              {/*<li className={ns()}>Borrow References</li>
              <ul className={ns()}>
                <li className={ns()}>Limitations</li>
              </ul>*/}
              <li className={ns()}>Constraint References</li>
              <ul className={ns()}>
                <li className={ns()}>Modes</li>
              </ul>
              <li className={ns()}>Weak References</li>
            </ul>
            <li className={ns()}>Inlining</li>
            <li className={ns()}>Optional</li>
          </ul>
        </div>
      );
    }
    if (page == "interfaces") {
      sectionsByPage["interfaces"] = (
        <div>
          <strong>Interfaces *</strong>
          <ul className={ns()}>
            <li className={ns()}>Using Interfaces</li>
            <ul className={ns()}>
              <li className={ns()}>Anonymous Substructs</li>
            </ul>
            <li className={ns()}>Sealed Interfaces</li>
            <ul className={ns()}>
              <li className={ns()}>Constructors</li>
              <li className={ns()}>Shortcalling</li>
            </ul>
          </ul>
        </div>
      );
    }
    if (page == "generics") {
      sectionsByPage["generics"] = (
        <div>
          <strong>Generics *</strong>
          <ul className={ns()}>
          </ul>
        </div>
      );
    }
    if (page == "patterns") {
      sectionsByPage["patterns"] = (
        <div>
          <strong>Patterns *</strong>
          <ul className={ns()}>
            <li className={ns()}>Patterns</li>
            <li className={ns()}>Destructuring</li>
            <li className={ns()}>Parameters</li>
            <li className={ns()}>Match Statement</li>
          </ul>
        </div>
      );
    }
    if (page == "operators") {
      sectionsByPage["operators"] = (
        <div>
          <strong>Operators *</strong>
          <ul className={ns()}>
            <li className={ns()}>Map Operator</li>
            <li className={ns()}>FlatMap Operator</li>
          </ul>
        </div>
      );
    }
    if (page == "errors") {
      sectionsByPage["errors"] = (
        <div>
          <strong>Errors *</strong>
          <ul className={ns()}>
          </ul>
        </div>
      );
    }
    if (page == "regions") {
      sectionsByPage["regions"] = (
        <div>
          <strong>Regions *</strong>
          <ul className={ns()}>
          </ul>
        </div>
      );
    }
    if (page == "cross-compilation") {
      sectionsByPage["cross-compilation"] = (
        <div>
          <strong>Cross Compilation *</strong>
          <ul className={ns()}>
          </ul>
        </div>
      );
    }

    return (
      <div className={ns("root")}>
        Reference
        <ul className={ns()}>
          <li className={ns()}>{sectionsByPage["intro"]}</li>
          <li className={ns()}>{sectionsByPage["structs"]}</li>
          <li className={ns()}>{sectionsByPage["references"]}</li>
          <li className={ns()}>{sectionsByPage["interfaces"]}</li>
          <li className={ns()}>{sectionsByPage["generics"]}</li>
          <li className={ns()}>{sectionsByPage["patterns"]}</li>
          {/*<li className={ns()}>{sectionsByPage["operators"]}</li>*/}
          {/*<li className={ns()}>{sectionsByPage["errors"]}</li>*/}
          <li className={ns()}>{sectionsByPage["regions"]}</li>
          {/*<li className={ns()}>{sectionsByPage["cross-compilation"]}</li>*/}
        </ul>
      </div>

    );
    // <li className={ns()}>{sectionsByPage["forking"]}</li>
  }
}

export default ReferenceTOC;
