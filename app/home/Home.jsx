import React from 'react'
import ReactDOM from 'react-dom';
import '../common.css'
import './Home.css'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx';
import Snippet from '../components/Snippet.jsx';

const ns = (classes) => "c-home " + (classes || "");

class Home extends React.Component {
  scrollTo(id) {
    setTimeout(() => document.getElementById(id).scrollIntoView(), 0);
  }

  render() {
    return (
      <div className={ns("root")}>
        <div className={ns("headercontainer")}>
          <Header easterEgg={true}/>
        </div>

        <div className={ns("page")}>

          {/*<div className={ns("description")}>
            Valence is a new general purpose programming language with a focus on <i>the bigger picture</i>. Read on to find out how!
          </div>*/}

          <div className={ns("columns")}>

            <div className={ns("left")}>

              <div className={ns("intro")}>
                Vale is fast, fearless, and flexible programming language.
              </div>
              <ul>
                <li><b>Fast:</b> Vale uses an entirely new approach to memory management: generational references, which have zero aliasing costs and no garbage collection pauses.</li>
                <li><b>Fearless:</b> It is the safest native language in existence: zero `unsafe`, region isolation, extern boundaries, and dependency extern whitelisting.</li>
                <li><b>Flexible:</b> Its emphasis on single ownership without needing a borrow checker makes it easy to use.</li>
              </ul>

              <div className={ns("featuring")}>
                <div className={ns("featuring-title")}>Featuring:</div>
                <ul>
                  <li>
                    <a href="/guide/introduction" className={ns("feature-title")} onClick={e => scrollTo("statictyping")}>
                      Statically Typed
                    </a> with type inference.
                  </li>
                  <li>
                    <a href="/guide/references" className={ns("feature-title")}>
                      Ownership
                    </a>, move semantics, and deterministic destruction.
                  </li>
                  <li>
                    <a href="/guide/references#nonowning" className={ns("feature-title")} onClick={e => scrollTo("nonowning")}>
                      Memory Safe
                    </a>, using constraint and weak references.
                  </li>
                  <li>
                    <a href="/guide/regions" className={ns("feature-title")}>
                      Regions
                    </a> for zero-cost references.
                  </li>
                  <li>
                    <a href="/guide/references#inline" className={ns("feature-title")} onClick={e => scrollTo("inline")}>
                      Inline References
                    </a> for optimization.
                  </li>
                  <li>
                    <a href="/guide/generics" className={ns("feature-title")}>
                      Generics
                    </a>, including virtual generics.
                  </li>
                  <li>
                    <a href="/guide/interfaces#sealedconstructors" className={ns("feature-title")} onClick={e => scrollTo("sealedconstructors")}>
                      Interface Constructors
                    </a>
                  </li>
                  <li>
                    <a href="/guide/introduction#functions" className={ns("feature-title")} onClick={e => scrollTo("functions")}>
                      Universal Function Call Syntax
                    </a>
                  </li>
                  <li>
                    <a href="/guide/introduction#functions" className={ns("feature-title")} onClick={e => scrollTo("functions")}>
                      Polymorphic Lambdas
                    </a>
                  </li>
                  {/*<li>
                    <a href="/guide/operators" className={ns("feature-title")}>Infix calling</a></l
                i>*/}
                  <li>
                    <a href="/guide/structs#mutability" className={ns("feature-title")} onClick={e => scrollTo("mutability")}>
                      Mutable and Immutable Objects
                    </a>
                  </li>
                  <li>
                    <a href="/guide/patterns" className={ns("feature-title")}>
                      Patterns
                    </a>: Destructuring, Parameters, Extractors
                  </li>
                  <li>
                    <a href="/guide/structs#shortcalling" className={ns("feature-title")} onClick={e => scrollTo("shortcalling")}>
                      Shortcalling Syntax
                    </a>
                  </li>
                </ul>
              </div>

              <div className={ns("wip")}>
                Vale is approaching version 0.1, see the <a href="/roadmap">Roadmap</a> for what's next!
              </div>

              <div className={ns("wip")}>
                See our <a href="/contributors">team of contributors</a>!
              </div>
{/*
              <div className={ns("upcoming-title")}>Upcoming Features:</div>
              <ul>
                <li><a href="/guide/interfaces#structural" className={ns("feature-title")}>Structural Interfaces</a>, using interface constructors.</li>
                <li><a href="/guide/cross-compilation" className={ns("feature-title")}>Cross Compilation</a> to JVM and JS.</li>
                <li><a href="/guide/operators#map" className={ns("feature-title")}>Map & FlatMap Operators</a></li>
                <li><a href="/guide/errors" className={ns("feature-title")}>Errors</a></li>
                <li><a href="/guide/variants" className={ns("feature-title")}>Variants</a></li>
                <li><a href="/guide/variants#anonymous" className={ns("feature-title")}>Anonymous Variants</a></li>
                <li><a href="/guide/variantindexing" className={ns("feature-title")}>Unified Array/Tuple</a></li>
              </ul>
*/}
            </div>

            <div className={ns("right")}>

              {/*<div className={ns("github")}>
                <a className={ns("external-link")} href="https://github.com/Verdagon/Valestrom">Github Repository</a>
              </div>*/}

          

          <div className={ns("posts")}>
            <div className={ns("recent-posts")}>
              <div className={ns("recent-posts-title")}>Recent posts:</div>
              <ul>
                <li><a href="/blog/generational-references">Generational References</a> (Nov 30)</li>
                <li><a href="/blog/hybrid-generational-memory">Hybrid-Generational Memory</a> (Nov 24)</li>
                <li><a href="/blog/zero-cost-refs-regions">Zero Cost References with Regions</a> (Jul 29)</li>
                <li><a href="/blog/next-steps-raii">The Next Steps for Single Ownership and RAII</a> (Jul 15)</li>
                <li><a href="https://www.reddit.com/r/ProgrammingLanguages/comments/hplj2i/vale/">Announcing Vale!</a> (Jul 11)</li>
                {/*<li><a href="/blog/verdagon/2020-no-garbage-collection">Safety without Garbage Collection</a></li>
                <li><a href="/blog/verdagon/2020-borrow-references">Constraint and Borrow References</a></li>
                <li><a href="/blog/verdagon/2020-single-ownership-patterns">Patterns with Single Ownership</a></li>
                <li><a href="/blog/verdagon/2020-binary-operators-generic-syntax">Binary Operators and Generic Syntax</a></li>
                <li><a href="/blog/verdagon/2020-ufcs">Making UFCS Work</a></li>
                <li><a href="/blog/verdagon/2020-shortcalling">Shortcalling Syntax</a></li>
                <li><a href="/blog/verdagon/2020-improved-destructors">Destructors with Parameters and Returns</a></li>
                <li><a href="/blog/verdagon/2020-error-handling">Better Error Handling</a></li>
                <li><a href="/blog/verdagon/2020-auto-inlining">Auto-inlining</a></li>
                <li><a href="/blog/verdagon/2020-cross-compilation-optimization">Cross Compilation and Optimization</a></li>
                */}
              </ul>
            </div>
          </div>

          <div className={ns("contribute")}>
            <b>Vale is <a href="/contribute">open for contributions</a>!</b>
          </div>



<div className={ns("example")}>
<Snippet>
{/*fn main() {
  println("Hello world!");
}*/}
<span class="Prog"><span class="Fn">fn <span class="FnName">main</span><span class="Params">()</span> <span class="Block">&#123;<br />  <span class="Call"><span class="CallLookup">println</span>(<span class="Str">"Hello world!"</span>)</span>;<span class="W"></span><br />&#125;</span></span><br /></span>
</Snippet>
</div>
<div className={ns("output")}>
{`Hello world!`}
</div>

<div className={ns("example")}>
<Snippet>
{/*fn planets() {
  ["Venus", "Earth", "Mars"]
}
fn main() {
  each planets() (planet){
    println("Hello " + planet + "!");
  }
}*/}
<span class="Prog"><span class="Fn">fn <span class="FnName">planets</span><span class="Params">()</span> <span class="Block">&#123;<br />  <span class="Seq">[<span class="Str">"Venus"</span>, <span class="Str">"Earth"</span>, <span class="Str">"Mars"</span>]</span><br />&#125;</span></span><br /><span class="Fn">fn <span class="FnName">main</span><span class="Params">()</span> <span class="Block">&#123;<br />  <span class="Call"><span class="CallLookup">each</span> <span class="Call"><span class="CallLookup">planets</span>()</span> <span class="Lambda"><span class="Params">(<span class="Pat"><span class="Capture"><span class="CaptureName">planet</span></span></span>)</span><span class="Block">&#123;<br />    <span class="Call"><span class="CallLookup">println</span>("Hello " + planet<span class="Call"><span class="Call"><span class="Str"></span><span class="CallLookup"></span><span class="Lookup"></span></span> <span class="CallLookup">+</span> <span class="Str">"!"</span></span>)</span>;<span class="W"></span><br />  &#125;</span></span></span><span class="W"></span><br />&#125;</span></span><br /></span>
</Snippet>
{/*<div className={ns("equivalent")}>
<a href="#">See equivalent C++, JS, Rust, Scala, Python</a>
</div>*/}
</div>

<div className={ns("output")}>
{`Hello Venus!
Hello Earth!
Hello Mars!`}
</div>


            {/*
            <div className={ns("possibilities")}>
              <div className={ns("possibilities-header")}>
                <div className={ns("possibilities-header-text")}>Vale Projects</div>
                <div className={ns("possibilities-header-page-number")}>
                  <div className={ns("possibilities-left")}></div>
                  <div className={ns("possibilities-page possibilities-page-current")}></div>
                  <div className={ns("possibilities-page")}></div>
                  <div className={ns("possibilities-page")}></div>
                  <div className={ns("possibilities-page")}></div>
                  <div className={ns("possibilities-page")}></div>
                  <div className={ns("possibilities-page")}></div>
                  <div className={ns("possibilities-page")}></div>
                  <div className={ns("possibilities-right")}></div>
                </div>
              </div>

              <div className={ns("possibilities-contents")}>
                <div className={ns("description")}>
                  Polytiles is a polygonal terrain generator, shown here with the Domino rendering layer.
                </div>

                <img style={{width: "100%"}} src={domino}/>
              </div>
            </div>
            */}
              {/*<p>(video of using valence to implement google docs here)</p>*/}


            </div>
          </div>

          <Footer/>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Home />,
  document.getElementById('main')
);
