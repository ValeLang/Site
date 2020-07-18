import React from 'react'
import './Roadmap.css'
import Header from './Header.jsx'
import Valefire from './Valefire.jsx'
import Playground from './Playground.jsx'
import Footer from './Footer.jsx';
import {Link} from 'react-router-dom';

// namespaces classes
const ns = (classes) => "c-roadmap " + (classes || "");

class Roadmap extends React.Component {
  render() {
    return (
      <div className={ns()}>
        <Header/>

        <div className={ns("page")}>

          <h1 className={ns()}>Roadmap</h1>

          <div className={ns("columns")}>
            <div className={ns("intro")}>
              <div>Vale is currently version 0.0: getting the basic language to work.</div>
              <div>(...plus generics and lambdas, because we couldn't help ourselves!)</div>
              <div>We're currently <b>94%</b> of the way to version 0.1!</div>
            </div>
            <div className={ns("legend")}>
              <div className={ns("done")}><span className={ns("icon")}></span> Done</div>
              <div className={ns("v01")}><span className={ns("icon")}></span> Planned for v0.1</div>
              <div className={ns("v02")}><span className={ns("icon")}></span> Planned for Later</div>
            </div>

          </div>

          <div className={ns("columns")}>
            <div className={ns("column1")}>
              {/*<li className={ns()}>Basics</li>
              <ul className={ns()}>
                <li className={ns("done")}><span className={ns("icon")}></span> "Vivem" Vale VM</li>
                <li className={ns("done")}><span className={ns("icon")}></span> Int, Bool, Float, Str</li>
                <li className={ns("done")}><span className={ns("icon")}></span> Type Inference</li>
              </ul>*/}
              <h3 className={ns()}>References</h3>
              <ul className={ns()}>
                <li className={ns("done")}><span className={ns("icon")}></span> Immutables' Refs</li>
                <li className={ns("done")}><span className={ns("icon")}></span> Owning Refs</li>
                <li className={ns("done")}><span className={ns("icon")}></span> Moving</li>
                <li className={ns("done")}><span className={ns("icon")}></span> Constrant Refs</li>
                <li className={ns("v01")}><span className={ns("icon")}></span> Weak Refs</li>
                <li className={ns("v02")}><span className={ns("icon")}></span> Expect</li>
                <li className={ns("v02")}><span className={ns("icon")}></span> Optional Sugar</li>
                <li className={ns("v02")}><span className={ns("icon")}></span> Inlining</li>
                <li className={ns("v02")}><span className={ns("icon")}></span> Varying/Final</li>
              </ul>
              <h3 className={ns()}>Functions</h3>
              <ul className={ns()}>
                <li className={ns("done")}><span className={ns("icon")}></span> UFCS</li>
                <li className={ns("done")}><span className={ns("icon")}></span> Infix Calling</li>
                <li className={ns("done")}><span className={ns("icon")}></span> Lambdas</li>
                <li className={ns("done")}><span className={ns("icon")}></span> Magic Params</li>
                <li className={ns("done")}><span className={ns("icon")}></span> Abstract Functions</li>
                <li className={ns("done")}><span className={ns("icon")}></span> Virtual Functions</li>
                <li className={ns("done")}><span className={ns("icon")}></span> Extern Calls</li>
                <li className={ns("done")}><span className={ns("icon")}></span> Overloads</li>
                <li className={ns("v02")}><span className={ns("icon")}></span> Must-use</li>

              </ul>
              <h3 className={ns()}>Generics</h3>
              <ul className={ns()}>
                <li className={ns("done")}><span className={ns("icon")}></span> Functions</li>
                <li className={ns("done")}><span className={ns("icon")}></span> Structs/Interfaces</li>
                <li className={ns("done")}><span className={ns("icon")}></span> Virtual Generics</li>
                <li className={ns("done")}><span className={ns("icon")}></span> Const Generics</li>
                <li className={ns("v02")}><span className={ns("icon")}></span> Static Eaching</li>
                <li className={ns("v02")}><span className={ns("icon")}></span> Metaprogramming</li>
                <li className={ns("v02")}><span className={ns("icon")}></span> Concepts</li>
              </ul>

            </div>
            <div className={ns("column2")}>

              <h3 className={ns()}>Arrays</h3>
              <ul className={ns()}>
                <li className={ns("done")}><span className={ns("icon")}></span> Mutability</li>
                <li className={ns("done")}><span className={ns("icon")}></span> Known-size</li>
                <li className={ns("done")}><span className={ns("icon")}></span> Unknown-size</li>
                <li className={ns("v02")}><span className={ns("icon")}></span> Asterisk for Arrays</li>
              </ul>
              <h3 className={ns()}>ADTs</h3>
              <ul className={ns()}>
                <li className={ns("done")}><span className={ns("icon")}></span> Tuples</li>
                <li className={ns("v02")}><span className={ns("icon")}></span> Variants</li>
                <li className={ns("v02")}><span className={ns("icon")}></span> Variant Indexing</li>
                <li className={ns("v02")}><span className={ns("icon")}></span> Errors</li>
              </ul>
              <h3 className={ns()}>Structs</h3>
              <ul className={ns()}>
                <li className={ns("done")}><span className={ns("icon")}></span> Mutability</li>
                <li className={ns("done")}><span className={ns("icon")}></span> Auto-drop</li>
                <li className={ns("done")}><span className={ns("icon")}></span> Member constructing</li>
                <li className={ns("v02")}><span className={ns("icon")}></span> Explicit auto-drop</li>
                <li className={ns("v02")}><span className={ns("icon")}></span> constructor&lt;T&gt;</li>
                <li className={ns("v02")}><span className={ns("icon")}></span> Destructor Parameters</li>
                <li className={ns("v02")}><span className={ns("icon")}></span> Shortcalling</li>
              </ul>
              <h3 className={ns()}>Interfaces</h3>
              <ul className={ns()}>
                <li className={ns("done")}><span className={ns("icon")}></span> Mutability</li>
                <li className={ns("done")}><span className={ns("icon")}></span> Open Constructors</li>
                <li className={ns("v02")}><span className={ns("icon")}></span> Open Shortcalling</li>
                <li className={ns("v02")}><span className={ns("icon")}></span> Sealed Constructors</li>
                <li className={ns("v02")}><span className={ns("icon")}></span> Sealed Shortcalling</li>
              </ul>

            </div>
            <div className={ns("column3")}>

              <h3 className={ns()}>Constructs</h3>
              <ul className={ns()}>
                <li className={ns("done")}><span className={ns("icon")}></span> If</li>
                <li className={ns("done")}><span className={ns("icon")}></span> While</li>
                <li className={ns("done")}><span className={ns("icon")}></span> Each</li>
                <li className={ns("v01")}><span className={ns("icon")}></span> Match</li>
                <li className={ns("v02")}><span className={ns("icon")}></span> EachI</li>
                <li className={ns("v02")}><span className={ns("icon")}></span> If Let</li>
                <li className={ns("v02")}><span className={ns("icon")}></span> If Let Else</li>
                <li className={ns("v02")}><span className={ns("icon")}></span> Break, Continue</li>

              </ul>
              <h3 className={ns()}>Patterns</h3>
              <ul className={ns()}>
                <li className={ns("done")}><span className={ns("icon")}></span> Locals</li>
                <li className={ns("done")}><span className={ns("icon")}></span> Destructuring</li>
                <li className={ns("v02")}><span className={ns("icon")}></span> Equating</li>
                <li className={ns("v02")}><span className={ns("icon")}></span> Extractors</li>
              </ul>
              <h3 className={ns()}>Operators</h3>
              <ul className={ns()}>
                <li className={ns("v02")}><span className={ns("icon")}></span> Short-circuiting</li>
                <li className={ns("v02")}><span className={ns("icon")}></span> Map, FlatMap</li>
                <li className={ns("v02")}><span className={ns("icon")}></span> Bail</li>
              </ul>
              <h3 className={ns()}>Standard Library</h3>
              <ul className={ns()}>
                <li className={ns("done")}><span className={ns("icon")}></span> Optional</li>
                <li className={ns("done")}><span className={ns("icon")}></span> List</li>
                <li className={ns("done")}><span className={ns("icon")}></span> HashMap</li>
                <li className={ns("v02")}><span className={ns("icon")}></span> Set</li>
                <li className={ns("v02")}><span className={ns("icon")}></span> HashSet</li>
                <li className={ns("v02")}><span className={ns("icon")}></span> Bunch</li>
              </ul>
            </div>
            <div className={ns("column4")}>

              <h3 className={ns()}>LLVM Codegen</h3>
              <ul className={ns()}>
                <li className={ns("done")}><span className={ns("icon")}></span> Native Executables</li>
                <li className={ns("v02")}><span className={ns("icon")}></span> Continue on panic</li>
                <li className={ns("v02")}><span className={ns("icon")}></span> Constraint Modes</li>
                <li className={ns("v02")}><span className={ns("icon")}></span> Threading</li>
                <li className={ns("v02")}><span className={ns("icon")}></span> Replayability</li>
              </ul>
              <h3 className={ns()}>Regions</h3>
              <ul className={ns()}>
                <li className={ns("v02")}><span className={ns("icon")}></span> Basics</li>
                <li className={ns("v02")}><span className={ns("icon")}></span> Read-only Calling</li>
                <li className={ns("v02")}><span className={ns("icon")}></span> Mutexes</li>
                <li className={ns("v02")}><span className={ns("icon")}></span> Transmigrating</li>
                <li className={ns("v02")}><span className={ns("icon")}></span> Seceding</li>
              </ul>
              <h3 className={ns()}>Ergonomics</h3>
              <ul className={ns()}>
                <li className={ns("v02")}><span className={ns("icon")}></span> Compile Errors</li>
                <li className={ns("v02")}><span className={ns("icon")}></span> Syntax Highlighting</li>
              </ul>
              <h3 className={ns()}>Possibilities</h3>
              <ul className={ns()}>
                <li className={ns("v02")}><span className={ns("icon")}></span> Self-Hosting</li>
                <li className={ns("v02")}><span className={ns("icon")}></span> JVM/CLR Backend</li>
                <li className={ns("v02")}><span className={ns("icon")}></span> VS/IDEA Plugins</li>
              </ul>

            </div>
          </div>
          <Footer/>
        </div>
      </div>
    );
  }
}

export default Roadmap;
