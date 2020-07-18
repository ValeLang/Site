import '../components/Tripage.css';
import '../common.css';
import React from 'react';
import ReactDOM from 'react-dom';

import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import {NoteManager, Note, NoteAnchor, NotesHeader} from '../components/Note.jsx';
import Snippet from '../components/Snippet.jsx';

import ReferenceTOC from './ReferenceTOC.jsx';

const ns = (classes) => "c-ref-references m-tripage " + (classes || "");

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

                <h1 className={ns("noline")}>Patterns</h1>

                <div className={ns("content cozy")}>
                  Patterns are a convenient, concise syntax for receiving some incoming data and doing some common things with it. Keep reading to see how.
                </div>

                <a name="locals"></a>
                <h3 className={ns()}>Patterns Make Locals</h3>

                <div className={ns("content cozy")}>
                  We use patterns to make new locals.
                </div>
                <div className={ns("content cozy")}>
                  Everything to the left of an {incode("=")} is a pattern.
                </div>
                <div className={ns("content cozy")}>
                  The pattern on the left receives incoming data from the expression on the right.
                </div>

                <div className={ns("content splitter cozy")}>
                  <div className={ns("half")}>
                    <div className={ns("content cozy")}>
                      To the left of this {incode("=")} is a pattern that stores the incoming data into a local named {incode("a")}.
                    </div>
                  </div>
                  <div className={ns("half")}>
                    <Snippet>
{/*
fn main() {
  a = 3 + 4;
}
*/}
<span class="Prog"><span class="Fn">fn <span class="FnName">main</span><span class="Params">()</span> <span class="Block">&#123;<br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">a</span></span></span> = <span class="Call"><span class="Num">3</span> <span class="CallLookup">+</span> <span class="Num">4</span></span>;</span><span class="W"></span><br />&#125;</span></span><br /></span>
                    </Snippet>
                  </div>
                </div>

                <a name="destructuring"></a>
                <h3 className={ns()}>Destructuring</h3>

                <div className={ns("content splitter cozy")}>
                  <div className={ns("half")}>
                    <div className={ns("content cozy")}>
                      If we're receiving a struct, we can <b>destructure</b> the incoming struct and put its members into locals.
                    </div>
                    <div className={ns("content cozy")}>
                      In this example, we're taking the parts of the Vec3 and assigning them into locals {incode("a")}, {incode("b")}, {incode("c")}.
                    </div>
                  </div>
                  <div className={ns("half")}>
                    <Snippet>
{/*
struct Vec3 imm {
  x Int;
  y Int;
  z Int;
}
fn makeVec() { Vec3(3, 4, 5) }

fn main() {
  // Without destructure pattern:
  tempVec = makeVec();
  a = tempVec.x;
  b = tempVec.y;
  c = tempVec.z;

  // Equivalent, using destructure:
  (a, b, c) = makeVec();

  println("a: " + a);
}
*/}
<span class="Prog"><span class="Struct">struct <span class="StructName">Vec3</span> imm <span class="Membs">&#123;<br />  <span class="Memb"><span class="MembName">x</span> <span class="Typ">Int</span>;</span><br />  <span class="Memb"><span class="MembName">y</span> <span class="Typ">Int</span>;</span><br />  <span class="Memb"><span class="MembName">z</span> <span class="Typ">Int</span>;</span><br />&#125;</span></span><br /><span class="Fn">fn <span class="FnName">makeVec</span><span class="Params">()</span> <span class="Block">&#123; <span class="Call"><span class="CallLookup">Vec3</span>(<span class="Num">3</span>, <span class="Num">4</span>, <span class="Num">5</span>)</span> &#125;</span></span><br /><br /><span class="Fn">fn <span class="FnName">main</span><span class="Params">()</span> <span class="Block">&#123;<br />  <span class="Comment">// Without destructure pattern:</span><br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">tempVec</span></span></span> = <span class="Call"><span class="CallLookup">makeVec</span>()</span>;</span><br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">a</span></span></span> = <span class="MemberAccess"><span class="Lookup">tempVec</span>.<span class="Lookup">x</span></span>;</span><br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">b</span></span></span> = <span class="MemberAccess"><span class="Lookup">tempVec</span>.<span class="Lookup">y</span></span>;</span><br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">c</span></span></span> = <span class="MemberAccess"><span class="Lookup">tempVec</span>.<span class="Lookup">z</span></span>;</span><br /><br />  <span class="Comment">// Equivalent, using destructure:</span><br />  <span class="Let"><span class="Pat"><span class="Typ">Vec3</span><span class="Destructure">(<span class="Pat"><span class="Capture"><span class="CaptureName">a</span></span></span>, <span class="Pat"><span class="Capture"><span class="CaptureName">b</span></span></span>, <span class="Pat"><span class="Capture"><span class="CaptureName">c</span></span></span>)</span></span> = <span class="Call"><span class="CallLookup">makeVec</span>()</span>;</span><br /><br />  <span class="Call"><span class="CallLookup">println</span>(<span class="Call"><span class="Str">"a: "</span> <span class="CallLookup">+</span> <span class="Lookup">a</span></span>)</span>;<span class="W"></span><br />&#125;</span></span><br /></span>
                    </Snippet>
                    <div className={ns("output")}>
{`a: 3`}
                    </div>
                  </div>
                </div>

                <a name="parameters"></a>
                <h3 className={ns()}>Parameters</h3>

                <div className={ns("content splitter cozy")}>
                  <div className={ns("half")}>
                    <div className={ns("content cozy")}>
                      Every parameter is a pattern.
                    </div>
                    <div className={ns("content cozy")}>
                      Here, we're using destructuring for this function's parameters.
                    </div>
                  </div>
                  <div className={ns("half")}>
                    <Snippet>
{/*
// Using above Vec3

// Without destructuring:
fn refuel(
    vec Vec3,
    len Float) {
  Vec3(
      vec.x * len,
      vec.y * len,
      vec.z * len)
}

// With destructuring:
fn refuel(
    Vec3(x, y, z),
    len Float) {
  Vec3(x * len, y * len, z * len)
}

*/}
<span class="Prog"><span class="Comment">// Using above Vec3</span><br /><br /><span class="Comment">// Without destructuring:</span><br /><span class="Fn">fn <span class="FnName">refuel</span><span class="Params">(<br />    <span class="Pat"><span class="Capture"><span class="CaptureName">vec</span></span> <span class="Typ">Vec3</span></span>,<br />    <span class="Pat"><span class="Capture"><span class="CaptureName">len</span></span> <span class="Typ">Float</span></span>)</span> <span class="Block">&#123;<br />  <span class="Call"><span class="CallLookup">Vec3</span>(<br />      <span class="Call"><span class="MemberAccess"><span class="Lookup">vec</span>.<span class="Lookup">x</span></span> <span class="CallLookup">*</span> <span class="Lookup">len</span></span>,<br />      <span class="Call"><span class="MemberAccess"><span class="Lookup">vec</span>.<span class="Lookup">y</span></span> <span class="CallLookup">*</span> <span class="Lookup">len</span></span>,<br />      <span class="Call"><span class="MemberAccess"><span class="Lookup">vec</span>.<span class="Lookup">z</span></span> <span class="CallLookup">*</span> <span class="Lookup">len</span></span>)</span><br />&#125;</span></span><br /><br /><span class="Comment">// With destructuring:</span><br /><span class="Fn">fn <span class="FnName">refuel</span><span class="Params">(<br />    <span class="Pat"><span class="Typ">Vec3</span><span class="Destructure">(<span class="Pat"><span class="Capture"><span class="CaptureName">x</span></span></span>, <span class="Pat"><span class="Capture"><span class="CaptureName">y</span></span></span>, <span class="Pat"><span class="Capture"><span class="CaptureName">z</span></span></span>)</span></span>,<br />    <span class="Pat"><span class="Capture"><span class="CaptureName">len</span></span> <span class="Typ">Float</span></span>)</span> <span class="Block">&#123;<br />  <span class="Call"><span class="CallLookup">Vec3</span>(<span class="Call"><span class="Lookup">x</span> <span class="CallLookup">*</span> <span class="Lookup">len</span></span>, <span class="Call"><span class="Lookup">y</span> <span class="CallLookup">*</span> <span class="Lookup">len</span></span>, <span class="Call"><span class="Lookup">z</span> <span class="CallLookup">*</span> <span class="Lookup">len</span></span>)</span><br />&#125;</span></span><br /></span>
                    </Snippet>
                  </div>
                </div>

                <a name="match"></a>
                <h3 className={ns()}>Match Statement {this.noteAnchor("nomatchyet")}</h3>

                <div className={ns("content splitter cozy")}>
                  <div className={ns("half")}>
                    <div className={ns("content cozy")}>
                      We can use a pattern to check if the incoming data is a certain value.
                    </div>
                    <div className={ns("content cozy")}>
                      Here, we're using a match statement to check what the user entered.
                    </div>
                    <div className={ns("content cozy")}>
                      In patterns, {incode("_")} matches any incoming data and discards it.
                    </div>
                  </div>
                  <div className={ns("half")}>
                    <Snippet>
{/*
fn main() {
  mat stdio.readInt() {
    1 { println("One!"); }
    2 { println("Two!"); }
    _ { println("Other!"); }
  }
}

*/}
<span class="Prog"><span class="Fn">fn <span class="FnName">main</span><span class="Params">()</span> <span class="Block">&#123;<br />  <span class="Match">mat <span class="MemberAccess"><span class="Lookup">stdio</span>.<span class="Lookup">readInt</span></span> &#123;<br />    <span class="Fn"><span class="Params"><span class="Pat"><span class="Capture"><span class="CaptureName">1</span></span></span></span> <span class="Block">&#123; <span class="Call"><span class="CallLookup">println</span>(<span class="Str">"One!"</span>)</span>;<span class="W"></span> &#125;</span></span><br />    <span class="Fn"><span class="Params"><span class="Pat"><span class="Capture"><span class="CaptureName">2</span></span></span></span> <span class="Block">&#123; <span class="Call"><span class="CallLookup">println</span>(<span class="Str">"Two!"</span>)</span>;<span class="W"></span> &#125;</span></span><br />    <span class="Fn"><span class="Params"><span class="Pat">_</span></span> <span class="Block">&#123; <span class="Call"><span class="CallLookup">println</span>(<span class="Str">"Other!"</span>)</span>;<span class="W"></span> &#125;</span></span><br />  &#125;</span><span class="W"></span><br />&#125;</span></span><br /></span>
                    </Snippet>
                  </div>
                </div>

                <div className={ns("content splitter cozy")}>
                  <div className={ns("half")}>
                    <div className={ns("content cozy")}>
                      We can even check an incoming interface, to see what substruct it is.
                    </div>
                    <div className={ns("content cozy")}>
                      We can even destructure it at the same time!
                    </div>
                  </div>
                  <div className={ns("half")}>
                    <Snippet>
{/*
interface ISpaceship { }

struct Firefly { name Str; }
impl Firefly for ISpaceship;

struct Raza { name Str; fuel Int; }
impl Raza for ISpaceship;

fn main() {
  serenity = Firefly("Serenity", 2);

  mat serenity {
    Firefly(name) {
      println("Firefly name " + name);
    }
    Raza(name, fuel) {
      println("Raza name " + name);
    }
  }
}

*/}
<span class="Prog"><span class="Interface">interface <span class="StructName">ISpaceship</span> &#123; &#125;</span><br /><br /><span class="Struct">struct <span class="StructName">Firefly</span> <span class="Membs">&#123; <span class="Memb"><span class="MembName">name</span> <span class="Typ">Str</span>;</span> &#125;</span></span><br /><span class="Impl">impl <span class="Typ">Firefly</span> for <span class="Typ">ISpaceship</span>;</span><br /><br /><span class="Struct">struct <span class="StructName">Raza</span> <span class="Membs">&#123; <span class="Memb"><span class="MembName">name</span> <span class="Typ">Str</span>;</span> <span class="Memb"><span class="MembName">fuel</span> <span class="Typ">Int</span>;</span> &#125;</span></span><br /><span class="Impl">impl <span class="Typ">Raza</span> for <span class="Typ">ISpaceship</span>;</span><br /><br /><span class="Fn">fn <span class="FnName">main</span><span class="Params">()</span> <span class="Block">&#123;<br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">serenity</span></span></span> = <span class="Call"><span class="CallLookup">Firefly</span>(<span class="Str">"Serenity"</span>, <span class="Num">2</span>)</span>;</span><br /><br />  <span class="Match">mat <span class="Lookup">serenity</span> &#123;<br />    <span class="Fn"><span class="Params"><span class="Pat"><span class="Typ">Firefly</span><span class="Destructure">(<span class="Pat"><span class="Capture"><span class="CaptureName">name</span></span></span>)</span></span></span> <span class="Block">&#123;<br />      <span class="Call"><span class="CallLookup">println</span>(<span class="Call"><span class="Str">"Firefly name "</span> <span class="CallLookup">+</span> <span class="Lookup">name</span></span>)</span>;<span class="W"></span><br />    &#125;</span></span><br />    <span class="Fn"><span class="Params"><span class="Pat"><span class="Typ">Raza</span><span class="Destructure">(<span class="Pat"><span class="Capture"><span class="CaptureName">name</span></span></span>, <span class="Pat"><span class="Capture"><span class="CaptureName">fuel</span></span></span>)</span></span></span> <span class="Block">&#123;<br />      <span class="Call"><span class="CallLookup">println</span>(<span class="Call"><span class="Str">"Raza name "</span> <span class="CallLookup">+</span> <span class="Lookup">name</span></span>)</span>;<span class="W"></span><br />    &#125;</span></span><br />  &#125;</span><span class="W"></span><br />&#125;</span></span><br /></span>
                    </Snippet>
                    <div className={ns("output")}>
{`Firefly name Serenity`}
                    </div>
                  </div>
                </div>

                <div className={ns("content")} style={{textAlign: "right"}}>
                  <strong>Next:</strong> <a href="/ref/regions">Regions</a>
                </div>

              </div>

            </div>
            <div className={ns("margin")}>

              <div className={ns("toc-container")}>
                <ReferenceTOC page="patterns"/>
                <div className={ns("notes-header")}>
                  <NotesHeader update={this.updateNotesHeaderRect}/>
                </div>
              </div>

              <Note name="nomatchyet" customIcon="notyet" iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon}>
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
