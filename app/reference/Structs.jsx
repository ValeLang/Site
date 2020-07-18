import '../components/Tripage.css';
import '../common.css';
import React from 'react';
import ReactDOM from 'react-dom';

import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import {NoteManager, Note, NoteAnchor, NotesHeader} from '../components/Note.jsx';
import Snippet from '../components/Snippet.jsx';

import ReferenceTOC from './ReferenceTOC.jsx';

const ns = (classes) => "c-ref-structs m-tripage " + (classes || "");

function incode(code, suffix) {
  if (suffix) {
    return <span><span className={ns("inline-code")} style={{paddingRight: 0}}>{code}</span>{suffix}</span>
  } else {
    return <span className={ns("inline-code")}>{code}</span>
  }
}

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.noteManager = new NoteManager(this);

    this.updateNoteAnchorPosition = (...args) => this.noteManager.updateNoteAnchorPosition(...args);
    this.updateNoteSizeAndCustomIcon = (...args) => this.noteManager.updateNoteSizeAndCustomIcon(...args);
    this.updateNotesHeaderRect = (...args) => this.noteManager.updateNotesHeaderRect(...args);
  }

  componentDidUpdate(prevProps, prevState) {
    this.noteManager.componentDidUpdate();
  }

  noteAnchor(anchorName) {
    return <NoteAnchor iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteAnchorPosition} name={anchorName}/>;
  }

  render() {
    return (
      <div className={ns("root")}>
        <Header/>

        <div className={ns("page")}>
          <div className={ns("columns")}>

            <div className={ns("left")}>

              <div className={ns("main")}>

                <h1 className={ns("noline")}>Structs</h1>

                <div className={ns("content splitter")}>
                  <div className={ns("half")}>
                    <p className={ns("cozy")}>
                      Here is a basic {incode("Spaceship")} struct, with a couple members.
                    </p>
                    <p className={ns("cozy")}>
                      We can construct it using its <b>constructor</b> function, which has the same name and was automatically generated.
                    </p>
                    <p className={ns("cozy")}>
                      All structs are <b>mutable</b> by default, more on that in the Mutability section below.
                    </p>
                  </div>
                  <div className={ns("half")}>
                    <Snippet>
{/*
struct Spaceship {
  name Str;
  numWings Int;
}

fn main() {
  ship = Spaceship("Serenity", 2);
  println(ship.name);
}
*/}
<span class="Prog"><span class="Struct">struct <span class="StructName">Spaceship</span> <span class="Membs">&#123;<br />  <span class="Memb"><span class="MembName">name</span> <span class="Typ">Str</span>;</span><br />  <span class="Memb"><span class="MembName">numWings</span> <span class="Typ">Int</span>;</span><br />&#125;</span></span><br /><br /><span class="Fn">fn <span class="FnName">main</span><span class="Params">()</span> <span class="Block">&#123;<br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">ship</span></span></span> = <span class="Call"><span class="CallLookup">Spaceship</span>(<span class="Str">"Serenity"</span>, <span class="Num">2</span>)</span>;</span><br />  <span class="Call"><span class="CallLookup">println</span>(<span class="MemberAccess"><span class="Lookup">ship</span>.<span class="Lookup">name</span></span>)</span>;<span class="W"></span><br />&#125;</span></span><br /></span>
                    </Snippet>
                    <div className={ns("output")}>
{`Serenity`}
                    </div>
                  </div>
                </div>

                <a name="constructors"></a>
                <h3 className={ns()}>Constructors</h3>

                <div className={ns("content splitter")}>
                  <div className={ns("half")}>
                    <div className={ns("content cozy")}>
                      We can specify a custom constructor for our struct.
                    </div>

                    <div className={ns("content cozy")}>
                      We just need to give it the same name as the struct. {this.noteAnchor("construct")}
                    </div>

                  </div>
                  <div className={ns("half")}>
                    <Snippet>
{/*
struct Spaceship {
  name Str;
  numWings Int;
}
fn Spaceship() {
  Spaceship("Serenity", 2)
}

fn main() {
  ship = Spaceship();
  println(ship.name);
}*/}
<span class="Prog"><span class="Struct">struct <span class="StructName">Spaceship</span> <span class="Membs">&#123;<br />  <span class="Memb"><span class="MembName">name</span> <span class="Typ">Str</span>;</span><br />  <span class="Memb"><span class="MembName">numWings</span> <span class="Typ">Int</span>;</span><br />&#125;</span></span><br /><span class="Fn">fn <span class="FnName">Spaceship</span><span class="Params">()</span> <span class="Block">&#123;<br />  <span class="Call"><span class="CallLookup">Spaceship</span>(<span class="Str">"Serenity"</span>, <span class="Num">2</span>)</span><br />&#125;</span></span><br /><br /><span class="Fn">fn <span class="FnName">main</span><span class="Params">()</span> <span class="Block">&#123;<br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">ship</span></span></span> = <span class="Call"><span class="CallLookup">Spaceship</span>()</span>;</span><br />  <span class="Call"><span class="CallLookup">println</span>(<span class="MemberAccess"><span class="Lookup">ship</span>.<span class="Lookup">name</span></span>)</span>;<span class="W"></span><br />&#125;</span></span><br /></span>
                    </Snippet>
                  </div>
                </div>


                <a name="shortcalling"></a>
                <h4 className={ns()}>Shortcalling Constructors {this.noteAnchor("notyet")}</h4>

                <div className={ns("content splitter cozy")}>
                  <div className={ns("half")}>
                    <div className={ns("content cozy")}>
                      We normally call a function by name, such as the {incode("Spaceship(\"Serenity\", 2)")} above. However, if the code is expecting a certain type, it can <b>automatically call the constructor</b> of the expected type.
                    </div>
                  </div>
                  <div className={ns("half")}>
                    <Snippet>
{/*
// Using above Spaceship struct

fn main() {
  // These statements are equivalent:
  x Spaceship = Spaceship("Raza", 2);
  x Spaceship = ("Raza", 2);
}
*/}
<span class="Prog"><span class="Comment">// Using above Spaceship struct</span><br /><br /><span class="Fn">fn <span class="FnName">main</span><span class="Params">()</span> <span class="Block">&#123;<br />  <span class="Comment">// These statements are equivalent:</span><br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">x</span></span> <span class="Typ">Spaceship</span></span> = <span class="Call"><span class="CallLookup">Spaceship</span>(<span class="Str">"Raza"</span>, <span class="Num">2</span>)</span>;</span><br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">x</span></span> <span class="Typ">Spaceship</span></span> = <span class="Call"><span class="CallLookup"></span>(<span class="Str">"Raza"</span>, <span class="Num">2</span>)</span>;</span><span class="W"></span><br />&#125;</span></span><br /></span>
                    </Snippet>
                  </div>
                </div>

                <div className={ns("content splitter cozy")}>
                  <div className={ns("half")}>
                    <div className={ns("content cozy")}>
                      This saves a lot of typing when calling functions.
                    </div>
                  </div>
                  <div className={ns("half")}>
                    <Snippet>
{/*
// Using above Spaceship struct

fn foo(s Spaceship) { ... }

fn main() {
  // These statements are equivalent:
  foo(Spaceship("Raza", 2));
  foo(("Raza", 2));
}
*/}
<span class="Prog"><span class="Comment">// Using above Spaceship struct</span><br /><br /><span class="Fn">fn <span class="FnName">foo</span><span class="Params">(<span class="Pat"><span class="Capture"><span class="CaptureName">s</span></span> <span class="Typ">Spaceship</span></span>)</span> <span class="Block">&#123; <span class="W">...</span> &#125;</span></span><br /><br /><span class="Fn">fn <span class="FnName">main</span><span class="Params">()</span> <span class="Block">&#123;<br />  <span class="Comment">// These statements are equivalent:</span><br />  <span class="Call"><span class="CallLookup">foo</span>(<span class="Call"><span class="CallLookup">Spaceship</span>(<span class="Str">"Raza"</span>, <span class="Num">2</span>)</span>)</span>;<br />  <span class="Call"><span class="CallLookup">foo</span>(<span class="Call"><span class="CallLookup"></span>(<span class="Str">"Raza"</span>, <span class="Num">2</span>)</span>)</span>;<span class="W"></span><br />&#125;</span></span><br /></span>
                    </Snippet>
                  </div>
                </div>


                <a name="ownership"></a>
                <h3 className={ns()}>Ownership</h3>

                <div className={ns("content cozy")}>
                  Every mutable struct has one <b>owning</b> reference. {this.noteAnchor("otherrefs")}
                </div>

                <div className={ns("content splitter")}>
                  <div className={ns("half")}>
                    <div className={ns("content cozy")}>
                      When we create a mutable struct, we get the owning reference to it. When we let go of the owning reference, we automatically call its <b>drop</b> function, which deallocates the object. {this.noteAnchor("ownership")}
                    </div>

                    <div className={ns("content cozy")}>
                      In this example, the {incode("ship")} owning reference goes away at the end of {incode("main")}, which deallocates the Spaceship.
                    </div>

                  </div>
                  <div className={ns("half")}>
                    <Snippet>
{/*
fn main() {
  ship = Spaceship("Serenity", 2);
  // ship is an owning reference

  println(ship.name);

  // implicit drop(ship)
}*/}
<span class="Prog"><span class="Fn">fn <span class="FnName">main</span><span class="Params">()</span> <span class="Block">&#123;<br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">ship</span></span></span> = <span class="Call"><span class="CallLookup">Spaceship</span>(<span class="Str">"Serenity"</span>, <span class="Num">2</span>)</span>;</span><br />  <span class="Comment">// ship is an owning reference</span><br /><br />  <span class="Call"><span class="CallLookup">println</span>(<span class="MemberAccess"><span class="Lookup">ship</span>.<span class="Lookup">name</span></span>)</span>;<span class="W"></span><br /><br />  <span class="Comment">// implicit drop(ship)</span><br />&#125;</span></span><br /></span>
                    </Snippet>
                  </div>
                </div>

                <a name="moving"></a>
                <h4 className={ns()}>Moving</h4>


                <div className={ns("content splitter cozy")}>
                  <div className={ns("half")}>
                    <div className={ns("content cozy")}>
                      Every mutable struct has exactly one owning reference pointing to it. If we make another owning reference to it, Vale prevents us from using the first owning reference.
                    </div>
                  </div>
                  <div className={ns("half")}>
                    <Snippet>
{/*
fn main() {
  firstRef = Spaceship();
  otherRef = firstRef;
  // Can't use firstRef now.
}*/}
<span class="Prog"><span class="Fn">fn <span class="FnName">main</span><span class="Params">()</span> <span class="Block">&#123;<br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">firstRef</span></span></span> = <span class="Call"><span class="CallLookup">Spaceship</span>()</span>;</span><br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">otherRef</span></span></span> = <span class="Lookup">firstRef</span>;</span><span class="W"></span><br />  <span class="Comment">// Can't use firstRef now.</span><br />&#125;</span></span><br /></span>

                    </Snippet>
                  </div>
                </div>

                <div className={ns("content splitter cozy")}>
                  <div className={ns("half")}>
                    <div className={ns("content cozy")}>
                      In a way, it's like we're <b>moving</b> ownership from one reference to another.
                    </div>

                    <div className={ns("content cozy")}>
                      This is also true when passing an owning reference to a function.
                    </div>
                  </div>
                  <div className={ns("half")}>
                    <Snippet>
{/*
fn foo(otherRef Spaceship) {
  println(otherRef.name);
}
fn main() {
  firstRef = Spaceship();
  foo(firstRef);
  // Can't use firstRef now.
}*/}
<span class="Prog"><span class="Fn">fn <span class="FnName">foo</span><span class="Params">(<span class="Pat"><span class="Capture"><span class="CaptureName">otherRef</span></span> <span class="Typ">Spaceship</span></span>)</span> <span class="Block">&#123;<br />  <span class="Call"><span class="CallLookup">println</span>(<span class="MemberAccess"><span class="Lookup">otherRef</span>.<span class="Lookup">name</span></span>)</span>;<span class="W"></span><br />&#125;</span></span><br /><span class="Fn">fn <span class="FnName">main</span><span class="Params">()</span> <span class="Block">&#123;<br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">firstRef</span></span></span> = <span class="Call"><span class="CallLookup">Spaceship</span>()</span>;</span><br />  <span class="Call"><span class="CallLookup">foo</span>(<span class="Lookup">firstRef</span>)</span>;<span class="W"></span><br />  <span class="Comment">// Can't use firstRef now.</span><br />&#125;</span></span><br /></span>

                    </Snippet>
                  </div>
                </div>


                <a name="drop"></a>
                <h3 className={ns()}>Drop</h3>

                <div className={ns("content splitter cozy")}>
                  <div className={ns("half")}>
                    <div className={ns("content cozy")}>
                      Every mutable struct has a <b>drop</b> function  {this.noteAnchor("valedestructorsarecooler")}, which deallocates the object. Vale automatically defines one for each struct, but we can instead specify our own drop function.
                    </div>

                    <div className={ns("content cozy")}>
                      Two rules: it must be called {incode("drop")}, and it must <b>move</b> the owning reference into a <b>destructure</b> pattern. {this.noteAnchor("destructure")}
                    </div>

                    <div className={ns("content cozy")}>
                      A custom drop could be used to:
                    </div>
                    <div className={ns("content cozy")}>
                      <ul style={{marginBottom: 0}}>
                        <li>Remove this object from an observers list.</li>
                        <li>Commit a transaction.</li>
                        <li>Inform other objects of this object's destruction.</li>
                      </ul>
                    </div>
                  </div>
                  <div className={ns("half")}>
                    <Snippet>
{/*
struct Spaceship {
  name Str;
  numWings Int;
}
fn drop(ship Spaceship) {
  println("Destroying!");

  // destructure `}{this.noteAnchor("destructure")}{`
  (name, numWings) = ship;
}

fn main() {
  ship = Spaceship();
  println(ship.name);
}*/}
<span class="Prog"><span class="Struct">struct <span class="StructName">Spaceship</span> <span class="Membs">&#123;<br />  <span class="Memb"><span class="MembName">name</span> <span class="Typ">Str</span>;</span><br />  <span class="Memb"><span class="MembName">numWings</span> <span class="Typ">Int</span>;</span><br />&#125;</span></span><br /><span class="Fn">fn <span class="FnName">drop</span><span class="Params">(<span class="Pat"><span class="Capture"><span class="CaptureName">ship</span></span> <span class="Typ">Spaceship</span></span>)</span> <span class="Block">&#123;<br />  <span class="Call"><span class="CallLookup">println</span>(<span class="Str">"Destroying!"</span>)</span>;<br /><br />  <span class="Comment">// destructure {this.noteAnchor("destructure")}</span><br />  <span class="Let"><span class="Pat"><span class="Destructure">(<span class="Pat"><span class="Capture"><span class="CaptureName">name</span></span></span>, <span class="Pat"><span class="Capture"><span class="CaptureName">numWings</span></span></span>)</span></span> = <span class="Lookup">ship</span>;</span><span class="W"></span><br />&#125;</span></span><br /><br /><span class="Fn">fn <span class="FnName">main</span><span class="Params">()</span> <span class="Block">&#123;<br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">ship</span></span></span> = <span class="Call"><span class="CallLookup">Spaceship</span>()</span>;</span><br />  <span class="Call"><span class="CallLookup">println</span>(<span class="MemberAccess"><span class="Lookup">ship</span>.<span class="Lookup">name</span></span>)</span>;<span class="W"></span><br />&#125;</span></span><br /></span>

                    </Snippet>
                    <div className={ns("output")}>
{`Serenity
Destroying!`}
                    </div>
                  </div>
                </div>

                <div className={ns("content")}>
                  Rule of thumb: if something <i>must</i> happen at some point in the future, put it in a drop function. Vale will make sure that it's not forgotten.
                </div>

                <a name="mutability"></a>
                <h3 className={ns()}>Mutability</h3>

                <div className={ns("content cozy")}>
                  By default, structs are <b>mutable</b>. We can make <b>immutable</b> structs with the {incode("imm")} keyword.
                </div>

                <div className={ns("content splitter")}>
                  <div className={ns("half")}>

                    <div className={ns("content cozy")}>
                      After construction, an immutable struct cannot be changed at all.
                    </div>

                    <div className={ns("content cozy")}>
                      Because of that, we can have multiple owning references to it, like Java or Python. {this.noteAnchor("refcounting")}
                    </div>

                    <div className={ns("content cozy")}>
                      Vale also automatically derives the functions {incode("println")}, {incode("Str")}, {incode("hash")}, {incode("==")}, and more.
                    </div>

                    <div className={ns("content cozy")}>
                      Immutable structs cannot have drop functions. {this.noteAnchor("shareddestructor")}
                    </div>
                  </div>
                  <div className={ns("half")}>
                    <Snippet>
{/*
struct Spaceship imm {
  name Str;
  numWings Int;
}

fn main() {
  ship = Spaceship("Serenity", 2);
  println(ship);
}*/}
<span class="Prog"><span class="Struct">struct <span class="StructName">Spaceship</span> imm <span class="Membs">&#123;<br />  <span class="Memb"><span class="MembName">name</span> <span class="Typ">Str</span>;</span><br />  <span class="Memb"><span class="MembName">numWings</span> <span class="Typ">Int</span>;</span><br />&#125;</span></span><br /><br /><span class="Fn">fn <span class="FnName">main</span><span class="Params">()</span> <span class="Block">&#123;<br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">ship</span></span></span> = <span class="Call"><span class="CallLookup">Spaceship</span>(<span class="Str">"Serenity"</span>, <span class="Num">2</span>)</span>;</span><br />  <span class="Call"><span class="CallLookup">println</span>(<span class="Lookup">ship</span>)</span>;<span class="W"></span><br />&#125;</span></span><br /></span>

                    </Snippet>
                    <div className={ns("output")}>
{`Spaceship("Serenity", 2)`}
                    </div>
                  </div>
                </div>

                <div className={ns("content")} style={{textAlign: "right"}}>
                  <strong>Next:</strong> <a href="/ref/references">References</a>
                </div>

              </div>

            </div>

            <div className={ns("margin")}>

              <div className={ns("toc-container")}>
                <ReferenceTOC page="structs"/>
                <div className={ns("notes-header")}>
                  <NotesHeader update={this.updateNotesHeaderRect}/>
                </div>
              </div>

              <Note name="ownership" iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon}>
                Ownership is also found in C++ ({incode("unique_ptr")}), Rust, and Cyclone.
                <div style={{marginTop: "8px"}}>
                  C also has "conceptual" ownership, in that we must track ownership without the language's help, to know when to {incode("free")} an object.
                </div>
                <div style={{marginTop: "8px"}}>
                  Vale's ownership has the flexibility of C++'s {incode("unique_ptr")} without the mutability and aliasing restrictions of Rust and Cyclone, see <a to="/ref/references">References</a> to learn how.
                </div>
              </Note>

              <Note name="otherrefs" iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon}>
                There are other kinds of references (constraint, borrow, weak), <a to="/ref/references">References</a> explains more.
              </Note>
              
              <Note name="destructure" iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon}>
                When we "destructure", we deallocate the object and move all of its previous members into locals, at the same time. See <a to="/ref/patterns">Pattern Matching</a> for how destructuring ensures memory safety and fits into the rest of the language.
              </Note>

              <Note name="construct" iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon}>
                Inside the constructor, we must call either another constructor or {incode("constructor<T>")}.
              </Note>

              <Note name="refcounting" iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon}>
                Small immutable structs (32b or less) are copied and passed by-value. Larger objects use <b>LWRC</b> (light-weight reference counting) to free themselves.
              </Note>

              <Note name="shareddestructor" iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon}>
                See <a to="/blog/shareddestructors">Shared Destructibles</a> for the reasoning behind this.
              </Note>

              <Note name="valedestructorsarecooler" iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon}>
                Drop functions also appear in C++ ("destructors") and Rust. Vale's drop functions are like those but more flexible: they can return values and even take extra parameters. In those cases, they must be called manually.
              </Note>

              <Note name="notyet" customIcon="notyet" iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon}>
                Planned feature; see <a to="/roadmap">Roadmap</a>!
              </Note>

            </div>
          </div>

        </div>
        <Footer/>
      </div>
    );
  }
}

ReactDOM.render(
  <Page />,
  document.getElementById('main')
);
