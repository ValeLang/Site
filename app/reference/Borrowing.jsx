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

                <h1 className={ns("noline")}>References</h1>

                <a name="owning"></a>
                <h3 className={ns()}>Owning Reference</h3>

                <div className={ns("content splitter cozy")}>
                  <div className={ns("half")}>
                    <div className={ns("content cozy")}>
                      An owning reference keeps an object alive. When a struct has no owning reference pointing to it anymore, the struct is deallocated.
                    </div>
                    <div className={ns("content cozy")}>
                      Every mutable struct has exactly one owning reference pointing to it. {this.noteAnchor("ownership")}
                    </div>
                  </div>
                  <div className={ns("half")}>
                    <Snippet>
{/*
fn main() {
  ship = Spaceship("Serenity", 2);
  // ship is an owning reference

  println(ship.name);

  // ship deallocated here
}*/}
<span class="Prog"><span class="Fn">fn <span class="FnName">main</span><span class="Params">()</span> <span class="Block">&#123;<br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">ship</span></span></span> = <span class="Call"><span class="CallLookup">Spaceship</span>(<span class="Str">"Serenity"</span>, <span class="Num">2</span>)</span>;</span><br />  <span class="Comment">// ship is an owning reference</span><br /><br />  <span class="Call"><span class="CallLookup">println</span>(<span class="MemberAccess"><span class="Lookup">ship</span>.<span class="Lookup">name</span></span>)</span>;<span class="W"></span><br /><br />  <span class="Comment">// implicit drop(ship)</span><br />&#125;</span></span><br /></span>
                    </Snippet>
                  </div>
                </div>

                <a name="immutables"></a>
                <h4 className={ns("noline")}>References to Immutables</h4>

                <div className={ns("content splitter cozy")}>
                  <div className={ns("half")}>
                    <div className={ns("content cozy")}>
                      We don't need any non-owning references to primitives or immutable structs, because they can have multiple owning references pointing to them.
                    </div>
                    <div className={ns("content cozy")}>
                      When we say {incode("a = b;")} for an immutable struct, both a and b can still be used.
                    </div>
                    <div className={ns("content cozy")}>
                      Immutable structs only use owning references.
                    </div>
                    <div className={ns("content cozy")}>
                      The rest of the page is about references to mutable structs.
                    </div>
                  </div>
                  <div className={ns("half")}>
                    <Snippet>
{/*
struct Vec3 imm {
  x Float;
  y Float;
  z Float;
}
fn main() {
  firstRef = Vec3(3, 4, 5);
  otherRef = firstRef;
  // Can use both refs freely.
  println(firstRef.x + otherRef.y);
}*/}
<span class="Prog"><span class="Struct">struct <span class="StructName">Vec3</span> imm <span class="Membs">&#123;<br />  <span class="Memb"><span class="MembName">x</span> <span class="Typ">Float</span>;</span><br />  <span class="Memb"><span class="MembName">y</span> <span class="Typ">Float</span>;</span><br />  <span class="Memb"><span class="MembName">z</span> <span class="Typ">Float</span>;</span><br />&#125;</span></span><br /><span class="Fn">fn <span class="FnName">main</span><span class="Params">()</span> <span class="Block">&#123;<br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">firstRef</span></span></span> = <span class="Call"><span class="CallLookup">Vec3</span>(<span class="Num">3</span>, <span class="Num">4</span>, <span class="Num">5</span>)</span>;</span><br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">otherRef</span></span></span> = <span class="Lookup">firstRef</span>;</span><br />  <span class="Comment">// Can use both freely.</span><br />  <span class="Call"><span class="CallLookup">println</span>(<span class="Call"><span class="MemberAccess"><span class="Lookup">firstRef</span>.<span class="Lookup">x</span></span> <span class="CallLookup">+</span> <span class="MemberAccess"><span class="Lookup">otherRef</span>.<span class="Lookup">y</span></span></span>)</span>;<span class="W"></span><br />&#125;</span></span><br /></span>

                    </Snippet>
                    <div className={ns("output")}>
{`7`}
                    </div>
                  </div>
                </div>

                <a name="moving"></a>
                <h4 className={ns("noline")}>Moving</h4>

                <div className={ns("content splitter cozy")}>
                  <div className={ns("half")}>
                    <div className={ns("content cozy")}>
                      Making a new owning reference will invalidate the old one, and using the old one again causes a compile error.
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

                <a name="nonowning"></a>
                <h3 className={ns("noline")}>Non-Owning References</h3>

                <div className={ns("content cozy")}>
                  Vale has two kinds of non-owning references:
                </div>
                {/*}
                <ul className={ns("content cozy")}>
                  <li><b>Borrow References</b>, which:</li>
                  <ul>
                    <li>Detect dangling references at compile-time.</li>
                    <li>Zero cost.</li>
                    <li>Not always possible to use. {this.noteAnchor("shortlived")}</li>
                  </ul>
                  <li><b>Constraint References</b>, which:</li>
                  <ul>
                    <li>Detect dangling references at run-time, halts program when found.</li>
                    <li>Zero or minor overhead. {this.noteAnchor("dependsonflags")}</li>
                    <li>Can be used anywhere.</li>
                  </ul>
                  <li><b>Weak References</b>, which:</li>
                  <ul>
                    <li>Makes dangling references null at run-time.</li>
                    <li>Some overhead.</li>
                    <li>Can be used anywhere.</li>
                  </ul>
                </ul>
                */}
                <ul className={ns("content cozy")}>
                  <li><b>Constraint References</b>, which:</li>
                  <ul>
                    <li>Detect dangling references at run-time, halts program when found.</li>
                    <li>Very fast. {this.noteAnchor("dependsonflags")}</li>
                  </ul>
                  <li><b>Weak References</b>, which:</li>
                  <ul>
                    <li>Makes dangling references null at run-time.</li>
                    <li>Some overhead.</li>
                  </ul>
                </ul>
                <div className={ns("content cozy")}>
                  These are explained in more detail below.
                </div>

                <div className={ns("content")}>
                  Note that there are no shared-ownership references {this.noteAnchor("noshared")} in Vale, except that multiple owning references can share an immutable struct.
                </div>


                <a name="borrow"></a>
                <h4 className={ns("noline")}>Borrow References</h4>

                <div className={ns("content splitter")}>
                  <div className={ns("half")}>
                    <div className={ns("content cozy")}>
                      We can make a borrow reference from another reference, using {incode("'&")}.
                    </div>

                    <div className={ns()}>
                      Vale ensures that the borrow reference doesn't outlive the original reference: {this.noteAnchor("borrowfrom")}
                    </div>

                    <ul className={ns("content cozy")}>
                      <li>If we borrow from an owning reference, the compiler enforces we only borrow while the owning reference is still valid.</li>
                      <li>If we borrow from a constraint reference, the compiler enforces we only borrow while that constraint reference is still valid.</li>
                    </ul>

                    <div className={ns("content cozy")}>
                      In this example, it sees that we're using a borrow reference after we've invalidated the owning reference it was based on, so it throws a compiler error.
                    </div>
                  </div>
                  <div className={ns("half")}>
                    <Snippet>
{/*
struct Spaceship {
  name Str;
  wings Int;
}
fn main() {
  ship = Spaceship("Serenity", 2);
  shipBRef = '&ship;

  drop(ship);

  // Error: borrow reference used
  // after owning reference gone!
  println("Wings: " + shipBRef.wings);
}*/}
<span class="Prog"><span class="Struct">struct <span class="StructName">Spaceship</span> <span class="Membs">&#123;<br />  <span class="Memb"><span class="MembName">name</span> <span class="Typ">Str</span>;</span><br />  <span class="Memb"><span class="MembName">wings</span> <span class="Typ">Int</span>;</span><br />&#125;</span></span><br /><span class="Fn">fn <span class="FnName">main</span><span class="Params">()</span> <span class="Block">&#123;<br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">ship</span></span></span> = <span class="Call"><span class="CallLookup">Spaceship</span>(<span class="Str">"Serenity"</span>, <span class="Num">2</span>)</span>;</span><br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">shipBRef</span></span></span> = <span class="Lend">'&<span class="Lookup">ship</span></span>;</span><br /><br />  <span class="Call"><span class="CallLookup">drop</span>(<span class="Lookup">ship</span>)</span>;<br /><br />  <span class="Comment">// Error: borrow reference used</span><br />  <span class="Comment">// after owning reference gone!</span><br />  <span class="Call"><span class="CallLookup">println</span>(<span class="Call"><span class="Str">"Wings: "</span> <span class="CallLookup">+</span> <span class="MemberAccess"><span class="Lookup">shipBRef</span>.<span class="Lookup">wings</span></span></span>)</span>;<span class="W"></span><br />&#125;</span></span><br /></span>

                    </Snippet>
                  </div>
                </div>

                <div className={ns("content splitter")}>
                  <div className={ns("half")}>
                    <div className={ns("content cozy")}>
                    It's common for a function to take borrow refs as parameters, if it only intends to use the reference during the call. If the function wanted to take a reference and store it in a global, it wouldn't be able to use a borrow reference.                    </div>
                  </div>
                  <div className={ns("half")}>
                    <Snippet>
{/*
struct Spaceship {
  name Str;
  numWings Int;
}
fn printShips(
    shipA '&Spaceship,
    shipB '&Spaceship) {
  println("A: " + shipA.name);
  println("B: " + shipB.name);
}
fn main() {
  shipA = Spaceship("Serenity", 2);
  shipB = Spaceship("Hyperion", 2);
  printShips('&shipA, '&shipB);
}*/}
<span class="Prog"><span class="Struct">struct <span class="StructName">Spaceship</span> <span class="Membs">&#123;<br />  <span class="Memb"><span class="MembName">name</span> <span class="Typ">Str</span>;</span><br />  <span class="Memb"><span class="MembName">numWings</span> <span class="Typ">Int</span>;</span><br />&#125;</span></span><br /><span class="Fn">fn <span class="FnName">printShips</span><span class="Params">(<br />    <span class="Pat"><span class="Capture"><span class="CaptureName">shipA</span></span> <span class="Ownership">'&<span class="Typ">Spaceship</span></span></span>,<br />    <span class="Pat"><span class="Capture"><span class="CaptureName">shipB</span></span> <span class="Ownership">'&<span class="Typ">Spaceship</span></span></span>)</span> <span class="Block">&#123;<br />  <span class="Call"><span class="CallLookup">println</span>(<span class="Call"><span class="Str">"A: "</span> <span class="CallLookup">+</span> <span class="MemberAccess"><span class="Lookup">shipA</span>.<span class="Lookup">name</span></span></span>)</span>;<br />  <span class="Call"><span class="CallLookup">println</span>(<span class="Call"><span class="Str">"B: "</span> <span class="CallLookup">+</span> <span class="MemberAccess"><span class="Lookup">shipB</span>.<span class="Lookup">name</span></span></span>)</span>;<span class="W"></span><br />&#125;</span></span><br /><span class="Fn">fn <span class="FnName">main</span><span class="Params">()</span> <span class="Block">&#123;<br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">shipA</span></span></span> = <span class="Call"><span class="CallLookup">Spaceship</span>(<span class="Str">"Serenity"</span>, <span class="Num">2</span>)</span>;</span><br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">shipB</span></span></span> = <span class="Call"><span class="CallLookup">Spaceship</span>(<span class="Str">"Hyperion"</span>, <span class="Num">2</span>)</span>;</span><br />  <span class="Call"><span class="CallLookup">printShips</span>(<span class="Lend">'&<span class="Lookup">shipA</span></span>, <span class="Lend">'&<span class="Lookup">shipB</span></span>)</span>;<span class="W"></span><br />&#125;</span></span><br /></span>

                    </Snippet>
                  </div>
                </div>

                <div className={ns("content splitter cozy")}>
                  <div className={ns("half")}>
                    <div className={ns("content cozy")}>
                      We can return borrow refs from functions too.
                    </div>
                    <div className={ns("content cozy")}>
                      In this example, the compiler guarantees that the returned reference doesn't outlive either of the arguments to {incode("biggerShip")}.
                    </div>
                    <div className={ns("content cozy")}>
                      If {incode("main")} destroys one of the ships while the borrow reference is still alive, the compiler notices and throws an error.
                    </div>
                  </div>
                  <div className={ns("half")}>
                    <Snippet>
{/*
struct Spaceship {
  name Str;
  wings Int;
}
fn biggerShip(
    shipA '&Spaceship,
    shipB '&Spaceship)
'&Spaceship {
  if (shipA.wings > shipB.wings) {
    ret shipA;
  } else {
    ret shipB;
  }
}
fn main() {
  shipA = Spaceship("Serenity", 2);
  shipB = Spaceship("Hyperion", 4);
  big = biggerShip('&shipA, '&shipB);
  println("Name: " + big.name);

  drop(shipB); // Destroys shipB

  // Compiler error: used borrow ref
  // after shipB's lifetime.
  println("Wings: " + big.wings);
}*/}
<span class="Prog"><span class="Struct">struct <span class="StructName">Spaceship</span> <span class="Membs">&#123;<br />  <span class="Memb"><span class="MembName">name</span> <span class="Typ">Str</span>;</span><br />  <span class="Memb"><span class="MembName">wings</span> <span class="Typ">Int</span>;</span><br />&#125;</span></span><br /><span class="Fn">fn <span class="FnName">biggerShip</span><span class="Params">(<br />    <span class="Pat"><span class="Capture"><span class="CaptureName">shipA</span></span> <span class="Ownership">'&<span class="Typ">Spaceship</span></span></span>,<br />    <span class="Pat"><span class="Capture"><span class="CaptureName">shipB</span></span> <span class="Ownership">'&<span class="Typ">Spaceship</span></span></span>)</span><br /><span class="Ownership">'&<span class="Typ">Spaceship</span></span> <span class="Block">&#123;<br />  <span class="If">if <span class="Block">(<span class="Call"><span class="MemberAccess"><span class="Lookup">shipA</span>.<span class="Lookup">wings</span></span> <span class="CallLookup">&gt;</span> <span class="MemberAccess"><span class="Lookup">shipB</span>.<span class="Lookup">wings</span></span></span>)</span> <span class="Block">&#123;<br />    <span class="Ret">ret <span class="Lookup">shipA</span>;</span><br />  &#125;</span> else <span class="Block">&#123;<br />    <span class="Ret">ret <span class="Lookup">shipB</span>;</span><br />  &#125;</span></span><span class="W"></span><br />&#125;</span></span><br /><span class="Fn">fn <span class="FnName">main</span><span class="Params">()</span> <span class="Block">&#123;<br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">shipA</span></span></span> = <span class="Call"><span class="CallLookup">Spaceship</span>(<span class="Str">"Serenity"</span>, <span class="Num">2</span>)</span>;</span><br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">shipB</span></span></span> = <span class="Call"><span class="CallLookup">Spaceship</span>(<span class="Str">"Hyperion"</span>, <span class="Num">4</span>)</span>;</span><br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">big</span></span></span> = <span class="Call"><span class="CallLookup">biggerShip</span>(<span class="Lend">'&<span class="Lookup">shipA</span></span>, <span class="Lend">'&<span class="Lookup">shipB</span></span>)</span>;</span><br />  <span class="Call"><span class="CallLookup">println</span>(<span class="Call"><span class="Str">"Name: "</span> <span class="CallLookup">+</span> <span class="MemberAccess"><span class="Lookup">big</span>.<span class="Lookup">name</span></span></span>)</span>;<br /><br />  <span class="Call"><span class="CallLookup">drop</span>(<span class="Lookup">shipB</span>)</span>; <span class="Comment">// Destroys shipB</span><br /><br />  <span class="Comment">// Compiler error: used borrow ref</span><br />  <span class="Comment">// after shipB's lifetime.</span><br />  <span class="Call"><span class="CallLookup">println</span>(<span class="Call"><span class="Str">"Wings: "</span> <span class="CallLookup">+</span> <span class="MemberAccess"><span class="Lookup">big</span>.<span class="Lookup">wings</span></span></span>)</span>;<span class="W"></span><br />&#125;</span></span><br /></span>

                    </Snippet>
                  </div>
                </div>

                <div className={ns("content splitter cozy")}>
                  <div className={ns("half")}>
                    <div className={ns("content cozy")}>
                      In the previous example, {incode("main")} made sure {incode("big")} didn't outlive {incode("shipA")} or {incode("shipB")}, because it didn't know which it came from.
                    </div>
                    <div className={ns("content cozy")}>
                      But in this example, we <b>don't</b> want {incode("main")} to do that, we want to drop {incode("shipMatcher")} but still use {incode("foundShip")}. After all, {incode("foundShip")} could only have come from {incode("allShips")}!
                    </div>
                    <div className={ns("content cozy")}>
                      We express that relationship to the compiler with <b>lifetime annotations</b> like {incode("'a")}.
                    </div>
                    <div className={ns("content cozy")}>
                      Now, {incode("main")} knows that {incode("foundShip")} is unrelated to {incode("shipMatcher")}.
                    </div>
                  </div>
                  <div className={ns("half")}>
                    <Snippet>
{/*
struct Spaceship {
  name Str;
  numWings Int;
}
fn findShipIn<'a, 'b>(
    ships 'a&[5 * Spaceship],
    matcher 'b&IShipMatcher)
'a&Spaceship {
  each ships (s){ // s is '&Spaceship
    if (matcher.matches(s)) {
      // s is from the ships list.
      ret s;
    }
  }
  panic();
}
fn main() {
  allShips List<Spaceship> = ...;
  shipMatcher IShipMatcher = ...;

  foundShip = findShipIn(
    '&allShips, '&shipMatcher);

  drop(shipMatcher); // Destroys.
  
  // Can use foundShip after
  // shipMatcher is gone, because the
  // compiler now knows they are
  // unrelated.
  println(foundShip.name);
  // Compiler ensures foundShip
  // doesn't outlive allShips.
}*/}
<span class="Prog"><span class="Struct">struct <span class="StructName">Spaceship</span> <span class="Membs">&#123;<br />  <span class="Memb"><span class="MembName">name</span> <span class="Typ">Str</span>;</span><br />  <span class="Memb"><span class="MembName">numWings</span> <span class="Typ">Int</span>;</span><br />&#125;</span></span><br /><span class="Fn">fn <span class="FnName">findShipIn</span><span class="IdentRunes">&lt;<span class="IdentRune">'a</span>, <span class="IdentRune">'b</span>&gt;</span><span class="Params">(<br />    <span class="Pat"><span class="Capture"><span class="CaptureName">ships</span></span> <span class="Ownership">'a&<span class="Typ">[<span class="Num">5</span> * <span class="Typ">Spaceship</span>]</span></span></span>,<br />    <span class="Pat"><span class="Capture"><span class="CaptureName">matcher</span></span> <span class="Ownership">'b&<span class="Typ">IShipMatcher</span></span></span>)</span><br /><span class="Ownership">'a&<span class="Typ">Spaceship</span></span> <span class="Block">&#123;<br />  <span class="Call"><span class="CallLookup">each</span> <span class="Lookup">ships</span> <span class="Lambda"><span class="Params">(<span class="Pat"><span class="Capture"><span class="CaptureName">s</span></span></span>)</span><span class="Block">&#123; <span class="Comment">// s is '&Spaceship</span><br />    <span class="If">if <span class="Block">(<span class="Call"><span class="Lookup">matcher</span>.<span class="CallLookup">matches</span>(<span class="Lookup">s</span>)</span>)</span> <span class="Block">&#123;<br />      <span class="Comment">// s is from the ships list.</span><br />      <span class="Ret">ret <span class="Lookup">s</span>;</span><br />    &#125;</span><span class="Block"><span class="W"></span></span></span><span class="W"></span><br />  &#125;</span></span></span><br />  <span class="Call"><span class="CallLookup">panic</span>()</span>;<span class="W"></span><br />&#125;</span></span><br /><span class="Fn">fn <span class="FnName">main</span><span class="Params">()</span> <span class="Block">&#123;<br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">allShips</span></span> <span class="TplArgs"><span class="Typ">List</span>&lt;<span class="Typ">Spaceship</span>&gt;</span></span> = <span class="Lookup">...</span>;</span><br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">shipMatcher</span></span> <span class="Typ">IShipMatcher</span></span> = <span class="Lookup">...</span>;</span><br /><br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">foundShip</span></span></span> = <span class="Call"><span class="CallLookup">findShipIn</span>(<br />    <span class="Lend">'&<span class="Lookup">allShips</span></span>, <span class="Lend">'&<span class="Lookup">shipMatcher</span></span>)</span>;</span><br /><br />  <span class="Call"><span class="CallLookup">drop</span>(<span class="Lookup">shipMatcher</span>)</span>; <span class="Comment">// Destroys.</span><br />  <br />  <span class="Comment">// Can use foundShip after</span><br />  <span class="Comment">// shipMatcher is gone, because the</span><br />  <span class="Comment">// compiler now knows they are</span><br />  <span class="Comment">// unrelated.</span><br />  <span class="Call"><span class="CallLookup">println</span>(<span class="MemberAccess"><span class="Lookup">foundShip</span>.<span class="Lookup">name</span></span>)</span>;<span class="W"></span><br />  <span class="Comment">// Compiler ensures foundShip</span><br />  <span class="Comment">// doesn't outlive allShips.</span><br />&#125;</span></span><br /></span>

                    </Snippet>
                  </div>
                </div>

                <div className={ns("content splitter")}>
                  <div className={ns("half")}>
                    <div className={ns("content cozy")}>
                      We can obtain a borrow reference from:
                    </div>
                    <ol className={ns("content cozy")}>
                      <li>An owning reference.</li>
                      <li>Another borrow reference.</li>
                      <li>A struct's final {this.noteAnchor("borrowfinal")} member.</li>
                      <li>A constraint reference.</li>
                    </ol>
                    <div className={ns("content cozy")}>
                      Alas, we can't directly get a borrow reference to a struct's varying member. {this.noteAnchor("borrowvarying")} Constraint references can help here.
                    </div>
                  </div>
                  <div className={ns("half")}>
                    <Snippet>
{/*
struct Spaceship {
  name Str;
  engine Engine;
  nav! Navigation;
}
fn main() {
  ship = Spaceship(
    "Serenity",
    Engine("TCB"),
    Navigation());

  // Can borrow from owning ref.
  x = '&ship;
  // Can borrow from borrow ref.
  y = '&x;
  // Can borrow from a struct's
  // final member.
  z = '&ship.engine;

  // Compiler error: Can't borrow
  // from varying member.
  e = '&ship.nav;
}*/}
<span class="Prog"><span class="Struct">struct <span class="StructName">Spaceship</span> <span class="Membs">&#123;<br />  <span class="Memb"><span class="MembName">name</span> <span class="Typ">Str</span>;</span><br />  <span class="Memb"><span class="MembName">engine</span> <span class="Typ">Engine</span>;</span><br />  <span class="Memb"><span class="MembName">nav</span>! <span class="Typ">Navigation</span>;</span><br />&#125;</span></span><br /><span class="Fn">fn <span class="FnName">main</span><span class="Params">()</span> <span class="Block">&#123;<br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">ship</span></span></span> = <span class="Call"><span class="CallLookup">Spaceship</span>(<br />    <span class="Str">"Serenity"</span>,<br />    <span class="Call"><span class="CallLookup">Engine</span>(<span class="Str">"TCB"</span>)</span>,<br />    <span class="Call"><span class="CallLookup">Navigation</span>()</span>)</span>;</span><br /><br />  <span class="Comment">// Can borrow from owning ref.</span><br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">x</span></span></span> = <span class="Lend">'&<span class="Lookup">ship</span></span>;</span><br />  <span class="Comment">// Can borrow from borrow ref.</span><br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">y</span></span></span> = <span class="Lend">'&<span class="Lookup">x</span></span>;</span><br />  <span class="Comment">// Can borrow from a struct's</span><br />  <span class="Comment">// final member.</span><br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">z</span></span></span> = <span class="Lend">'&<span class="MemberAccess"><span class="Lookup">ship</span>.<span class="Lookup">engine</span></span></span>;</span><br /><br />  <span class="Comment">// Compiler error: Can't borrow</span><br />  <span class="Comment">// from varying member.</span><br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">e</span></span></span> = <span class="Lend">'&<span class="MemberAccess"><span class="Lookup">ship</span>.<span class="Lookup">nav</span></span></span>;</span><span class="W"></span><br />&#125;</span></span><br /></span>

                    </Snippet>
                  </div>
                </div>

                <a name="constraint"></a>
                <h5 className={ns("noline")}>Limitations of Borrow References</h5>

                <div className={ns("content splitter")}>
                  <div className={ns("half")}>
                    <div className={ns("content cozy")}>
                      Borrow references are amazing, but can only be used where the compiler can <b>prove</b> that the borrowed struct won't be destroyed while we have a borrow reference to it.
                    </div>
                    <div className={ns("content cozy")}>
                      However, that's not always possible. For example, we have a list of planes and a list of airports. Every plane has an origin and destination airport.
                    </div>
                    <div className={ns("content cozy")}>
                      There's no way for the compiler to <b>prove</b> that nobody deletes any of the airports. So, planes can't have borrow references to airports. {this.noteAnchor("classic")}
                    </div>
                    <div className={ns("content cozy")}>
                      More specifically, we can't have borrow references to the airports because internally the {incode("List<Airport>")} has a varying member (the current array of Airports) and we can only get a borrow reference from a final member (rule 3 above).
                    </div>
                    <div className={ns("content cozy")}>
                      Instead, Plane should have <b>constraint references</b> to the Airports.
                    </div>
                  </div>
                  <div className={ns("half")}>
                    <Snippet>
{/*
struct Airport {
  name Str;
}
struct Plane<'a, 'b> {
  origin 'a&Airport;
  destination 'b&Airport;
}
fn main() {
  airports = List<Airport>();
  planes = List<Planes>();

  airports.add(Airport("LAX"));
  airports.add(Airport("SEA"));
  airports.add(Airport("WAT"));
  planes.add(Plane(
    '&airports.0, '&airports.1));
  planes.add(Plane(
    '&airports.1, '&airports.2));

  // Uh oh, dangling references!
  airports.clear();
}*/}
<span class="Prog"><span class="Struct">struct <span class="StructName">Airport</span> <span class="Membs">&#123;<br />  <span class="Memb"><span class="MembName">name</span> <span class="Typ">Str</span>;</span><br />&#125;</span></span><br /><span class="Struct">struct <span class="StructName">Plane</span><span class="IdentRunes">&lt;<span class="IdentRune">'a</span>, <span class="IdentRune">'b</span>&gt;</span> <span class="Membs">&#123;<br />  <span class="Memb"><span class="MembName">origin</span> <span class="Ownership">'a&<span class="Typ">Airport</span></span>;</span><br />  <span class="Memb"><span class="MembName">destination</span> <span class="Ownership">'b&<span class="Typ">Airport</span></span>;</span><br />&#125;</span></span><br /><span class="Fn">fn <span class="FnName">main</span><span class="Params">()</span> <span class="Block">&#123;<br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">airports</span></span></span> = <span class="Call"><span class="CallLookup">List</span><span class="TplArgs">&lt;<span class="Typ">Airport</span>&gt;</span>()</span>;</span><br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">planes</span></span></span> = <span class="Call"><span class="CallLookup">List</span><span class="TplArgs">&lt;<span class="Typ">Planes</span>&gt;</span>()</span>;</span><br /><br />  <span class="Call"><span class="Lookup">airports</span>.<span class="CallLookup">add</span>(<span class="Call"><span class="CallLookup">Airport</span>(<span class="Str">"LAX"</span>)</span>)</span>;<br />  <span class="Call"><span class="Lookup">airports</span>.<span class="CallLookup">add</span>(<span class="Call"><span class="CallLookup">Airport</span>(<span class="Str">"SEA"</span>)</span>)</span>;<br />  <span class="Call"><span class="Lookup">airports</span>.<span class="CallLookup">add</span>(<span class="Call"><span class="CallLookup">Airport</span>(<span class="Str">"WAT"</span>)</span>)</span>;<br />  <span class="Call"><span class="Lookup">planes</span>.<span class="CallLookup">add</span>(<span class="Call"><span class="CallLookup">Plane</span>(<br />    <span class="Lend">'&<span class="MemberAccess"><span class="Lookup">airports</span>.<span class="Lookup">0</span></span></span>, <span class="Lend">'&<span class="MemberAccess"><span class="Lookup">airports</span>.<span class="Lookup">1</span></span></span>)</span>)</span>;<br />  <span class="Call"><span class="Lookup">planes</span>.<span class="CallLookup">add</span>(<span class="Call"><span class="CallLookup">Plane</span>(<br />    <span class="Lend">'&<span class="MemberAccess"><span class="Lookup">airports</span>.<span class="Lookup">1</span></span></span>, <span class="Lend">'&<span class="MemberAccess"><span class="Lookup">airports</span>.<span class="Lookup">2</span></span></span>)</span>)</span>;<br /><br />  <span class="Comment">// Uh oh, dangling references!</span><br />  <span class="Call"><span class="Lookup">airports</span>.<span class="CallLookup">clear</span>()</span>;<span class="W"></span><br />&#125;</span></span><br /></span>

                    </Snippet>
                  </div>
                </div>


                <a name="constraint"></a>
                <h4 className={ns("noline")}>Constraint References</h4>

                <div className={ns("content splitter")}>
                  <div className={ns("half")}>
                    <div className={ns("content cozy")}>
                      While borrow references are proven at compile-time, constraint references detect pointers becoming at run-time. {this.noteAnchor("dangling")} {this.noteAnchor("likesql")}
                    </div>
                    <div className={ns("content cozy")}>
                      To make a constraint reference, use the {incode("&")} symbol.
                    </div>
                    <div className={ns("content cozy")}>
                      In this example, we're making a constraint reference to {incode("ship")} and giving it to the {incode("foo")} function.
                    </div>
                  </div>
                  <div className={ns("half")}>
                    <Snippet>
{/*
struct Spaceship {
  name Str;
  numWings Int;
}
fn foo(s &Spaceship) {
  println(s.name);
}
fn main() {
  ship = Spaceship("Serenity", 2);
  foo(&ship);
}*/}
<span class="Prog"><span class="Struct">struct <span class="StructName">Spaceship</span> <span class="Membs">&#123;<br />  <span class="Memb"><span class="MembName">name</span> <span class="Typ">Str</span>;</span><br />  <span class="Memb"><span class="MembName">numWings</span> <span class="Typ">Int</span>;</span><br />&#125;</span></span><br /><span class="Fn">fn <span class="FnName">foo</span><span class="Params">(<span class="Pat"><span class="Capture"><span class="CaptureName">s</span></span> <span class="Ownership">&<span class="Typ">Spaceship</span></span></span>)</span> <span class="Block">&#123;<br />  <span class="Call"><span class="CallLookup">println</span>(<span class="MemberAccess"><span class="Lookup">s</span>.<span class="Lookup">name</span></span>)</span>;<span class="W"></span><br />&#125;</span></span><br /><span class="Fn">fn <span class="FnName">main</span><span class="Params">()</span> <span class="Block">&#123;<br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">ship</span></span></span> = <span class="Call"><span class="CallLookup">Spaceship</span>(<span class="Str">"Serenity"</span>, <span class="Num">2</span>)</span>;</span><br />  <span class="Call"><span class="CallLookup">foo</span>(<span class="Lend">&<span class="Lookup">ship</span></span>)</span>;<span class="W"></span><br />&#125;</span></span><br /></span>

                    </Snippet>
                  </div>
                </div>

                <div className={ns("content cozy")}>
                  When we can't use borrow references, we can use constraint references to <b>detect when we accidentally destroy an object we're still pointing at</b>.
                </div>
                <div className={ns("content")}>
                  For example, if we have an open UI dialog for editing an entry in a given spreadsheet, the dialog would want a constraint reference to the entry. {this.noteAnchor("dontwantweak")}
                </div>
                <div className={ns("content splitter cozy")}>
                  <div className={ns("half")}>
                    <div className={ns("content cozy")}>
                      If we delete an object while a constraint reference is pointing to it, the program halts and shows which constraint reference was violated.
                    </div>
                    <div className={ns("content cozy")}>
                      In this example, Vale detects that {incode("shipCRef")} becomes a dangling pointer and halts the program so the developer can fix it.
                    </div>
                    <div className={ns("content cozy")}>
                      To avoid the program halting:
                    </div>
                    <ul>
                      <li>If possible, use a borrow reference instead. {this.noteAnchor("borrowhere")}</li>
                      <li>Keep the object alive for longer.</li>
                      <li>Get rid of the constraint reference sooner. {this.noteAnchor("copyout")}</li>
                      <li>If the reference doesn't <i>actually</i> require the object to be alive, use a weak reference instead.</li>
                    </ul>
                  </div>
                  <div className={ns("half")}>
                    <Snippet>
{/*
struct Spaceship {
  name Str;
  wings Int;
}
fn takeAndDestroy(ship Spaceship) {
  println("Name: " + ship.name);

  // Ship destroyed here, so
  // constraint violated here.
}
fn main() {
  ship = Spaceship("Serenity", 2);
  shipCRef = &ship;

  // Moves ship into function.
  takeAndDestroy(ship);

  println("Wings: " + shipCRef.wings);
}*/}
<span class="Prog"><span class="Struct">struct <span class="StructName">Spaceship</span> <span class="Membs">&#123;<br />  <span class="Memb"><span class="MembName">name</span> <span class="Typ">Str</span>;</span><br />  <span class="Memb"><span class="MembName">wings</span> <span class="Typ">Int</span>;</span><br />&#125;</span></span><br /><span class="Fn">fn <span class="FnName">takeAndDestroy</span><span class="Params">(<span class="Pat"><span class="Capture"><span class="CaptureName">ship</span></span> <span class="Typ">Spaceship</span></span>)</span> <span class="Block">&#123;<br />  <span class="Call"><span class="CallLookup">println</span>(<span class="Call"><span class="Str">"Name: "</span> <span class="CallLookup">+</span> <span class="MemberAccess"><span class="Lookup">ship</span>.<span class="Lookup">name</span></span></span>)</span>;<span class="W"></span><br /><br />  <span class="Comment">// Ship destroyed here, so</span><br />  <span class="Comment">// constraint violated here.</span><br />&#125;</span></span><br /><span class="Fn">fn <span class="FnName">main</span><span class="Params">()</span> <span class="Block">&#123;<br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">ship</span></span></span> = <span class="Call"><span class="CallLookup">Spaceship</span>(<span class="Str">"Serenity"</span>, <span class="Num">2</span>)</span>;</span><br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">shipCRef</span></span></span> = <span class="Lend">&<span class="Lookup">ship</span></span>;</span><br /><br />  <span class="Comment">// Moves ship into function.</span><br />  <span class="Call"><span class="CallLookup">takeAndDestroy</span>(<span class="Lookup">ship</span>)</span>;<br /><br />  <span class="Call"><span class="CallLookup">println</span>(<span class="Call"><span class="Str">"Wings: "</span> <span class="CallLookup">+</span> <span class="MemberAccess"><span class="Lookup">shipCRef</span>.<span class="Lookup">wings</span></span></span>)</span>;<span class="W"></span><br />&#125;</span></span><br /></span>

                    </Snippet>
                    <div className={ns("output")}>
{`Name: Serenity
Error: Dangling pointers detected!
Dead object:
  takeAndDestroy::ship main.vale:5:19
Dangling pointers:
  main::shipCRef main.vale:13:3
Continue? [y,N]`}
                    </div>
                  </div>
                </div>

                <div className={ns("content cozy")}>
                  In practice, a program will usually have constraint references in its long-lived state, and borrow references for its transient state and computations.
                </div>

                <h5>Constraint Modes</h5>

                <div className={ns("content cozy")}>
                  We can also configure Vale to have different behavior for constraint references.
                </div>
                <ul className={ns("content cozy")}>
                  <li>
                    <b>Normal mode</b> behaves like the above, and halts when we <b>make</b> dangling pointers.
                  </li>
                  <li>
                    <b>Tolerant mode</b> turns constraint refs into weak refs, and halts when we <b>use</b> them. {this.noteAnchor("failonprint")}
                    <ul>
                      <li>Weak refs are more expensive, so this mode will be slower.</li>
                    </ul>
                  </li>
                  <li>
                    <b>Fast mode</b> will turn off all protections, and compile them to raw pointers.
                    <ul>
                      <li>This mode is incredibly fast, but not as safe. {this.noteAnchor("stillsafer")}</li>
                    </ul>
                  </li>
                </ul>
                <div className={ns("content cozy")}>
                  Different modes will be useful at different times:
                </div>
                <ul className={ns("content")}>
                  <li>One might prototype in tolerant mode, and then turn on normal mode.</li>
                  <li>A game might use normal mode for development, then fast mode for release.</li>
                </ul>

                <a name="constraint"></a>
                <h4 className={ns("noline")}>Weak References</h4>

                <div className={ns("content splitter")}>
                  <div className={ns("half")}>
                    <div className={ns("content cozy")}>
                      We often have a reference to a struct, and we would be fine with that struct being deallocated.
                    </div>
                    <div className={ns("content cozy")}>
                      In these situations, we use <b>weak references</b>.
                    </div>
                    <div className={ns("content cozy")}>
                      A weak reference will set itself to null when the object it's pointing at is destroyed.
                    </div>
                    <div className={ns("content cozy")}>
                      We can make a weak reference with {incode("&&")}.
                    </div>
                    <div className={ns("content cozy")}>
                      When we use a weak reference, we must first check that it's not null. If it's not null, we receive a constraint reference.
                    </div>
                    <div className={ns("content cozy")}>
                      In other words, we cannot reach into a struct through a weak reference directly; we must try to make it into a constraint reference first.
                    </div>
                    <div className={ns("content cozy")}>
                      In this example, we're making a {incode("o")} constraint reference from the {incode("ship.origin")} weak reference.
                    </div>
                  </div>
                  <div className={ns("half")}>
                    <Snippet>
{/*
struct Base {
  name Str;
}
struct Spaceship {
  name Str;
  origin &&Base;
}
fn printShipBase(ship &Spaceship) {
  if ((o) = ship.origin) { anchorhere;
    println("Ship base: " + o.name);
  } else {
    println("Ship base unknown!");
  }
}
fn main() {
  base = Base("Zion");
  ship = Spaceship("Neb", &&base);

  printShipBase(&ship);

  drop(base); // Destroys base.

  printShipBase(&ship);
}*/}
<span class="Prog"><span class="Struct">struct <span class="StructName">Base</span> <span class="Membs">&#123;<br />  <span class="Memb"><span class="MembName">name</span> <span class="Typ">Str</span>;</span><br />&#125;</span></span><br /><span class="Struct">struct <span class="StructName">Spaceship</span> <span class="Membs">&#123;<br />  <span class="Memb"><span class="MembName">name</span> <span class="Typ">Str</span>;</span><br />  <span class="Memb"><span class="MembName">origin</span> <span class="Ownership">&<span class="Ownership">&<span class="Typ">Base</span></span></span>;</span><br />&#125;</span></span><br /><span class="Fn">fn <span class="FnName">printShipBase</span><span class="Params">(<span class="Pat"><span class="Capture"><span class="CaptureName">ship</span></span> <span class="Ownership">&<span class="Typ">Spaceship</span></span></span>)</span> <span class="Block">&#123;<br />  <span class="If">if <span class="Block">(<span class="Call"><span class="Lookup">(o)</span> <span class="CallLookup">=</span> <span class="MemberAccess"><span class="Lookup">ship</span>.<span class="Lookup">origin</span></span></span>)</span> <span class="Block">&#123; {this.noteAnchor("checkweak")} {this.noteAnchor("matweak")}<br />    <span class="Call"><span class="CallLookup">println</span>(<span class="Call"><span class="Str">"Ship base: "</span> <span class="CallLookup">+</span> <span class="MemberAccess"><span class="Lookup">o</span>.<span class="Lookup">name</span></span></span>)</span>;<span class="W"></span><br />  &#125;</span> else <span class="Block">&#123;<br />    <span class="Call"><span class="CallLookup">println</span>(<span class="Str">"Ship base unknown!"</span>)</span>;<span class="W"></span><br />  &#125;</span></span><span class="W"></span><br />&#125;</span></span><br /><span class="Fn">fn <span class="FnName">main</span><span class="Params">()</span> <span class="Block">&#123;<br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">base</span></span></span> = <span class="Call"><span class="CallLookup">Base</span>(<span class="Str">"Zion"</span>)</span>;</span><br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">ship</span></span></span> = <span class="Call"><span class="CallLookup">Spaceship</span>(<span class="Str">"Neb"</span>, <span class="Lend">&&<span class="Lookup">base</span></span>)</span>;</span><br /><br />  <span class="Call"><span class="CallLookup">printShipBase</span>(<span class="Lend">&<span class="Lookup">ship</span></span>)</span>;<br /><br />  <span class="Call"><span class="CallLookup">drop</span>(<span class="Lookup">base</span>)</span>; <span class="Comment">// Destroys base.</span><br /><br />  <span class="Call"><span class="CallLookup">printShipBase</span>(<span class="Lend">&<span class="Lookup">ship</span></span>)</span>;<span class="W"></span><br />&#125;</span></span><br /></span>

                    </Snippet>
                    <div className={ns("output")}>
{`Ship base: Zion
Ship base unknown!`}
                    </div>
                  </div>
                </div>

                <a name="inline"></a>
                <h3 className={ns("noline")}>Pointers vs Values ("Inlining")</h3>

                <div className={ns("content splitter")}>
                  <div className={ns("half")}>
                    <div className={ns("content cozy")}>
                      <b>Inlining</b> is used for optimization.
                    </div>
                    <div className={ns("content cozy")}>
                      By default, a reference is a pointer, to something on the heap. {this.noteAnchor("autoinl")} A reference can instead be a value on the stack ("inline"), by using the {incode("inl")} keyword.
                    </div>
                    <div className={ns("content cozy")}>
                      Inline objects are much faster to allocate and deallocate, but cannot be moved.
                    </div>
                  </div>
                  <div className={ns("half")}>
                    <Snippet>
{/*
struct Spaceship {
  name Str;
  numWings Int;
}
fn main() {
  ship = inl Spaceship();
  println(ship.name);
}*/}
<span class="Prog"><span class="Struct">struct <span class="StructName">Spaceship</span> <span class="Membs">&#123;<br />  <span class="Memb"><span class="MembName">name</span> <span class="Typ">Str</span>;</span><br />  <span class="Memb"><span class="MembName">numWings</span> <span class="Typ">Int</span>;</span><br />&#125;</span></span><br /><span class="Fn">fn <span class="FnName">main</span><span class="Params">()</span> <span class="Block">&#123;<br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">ship</span></span></span> = <span class="Call"><span class="Inl">inl</span> <span class="CallLookup">Spaceship</span>()</span>;</span><br />  <span class="Call"><span class="CallLookup">println</span>(<span class="MemberAccess"><span class="Lookup">ship</span>.<span class="Lookup">name</span></span>)</span>;<span class="W"></span><br />&#125;</span></span><br /></span>

                    </Snippet>
                    <div className={ns("output")}>
{`List(1, 3, 7)`}
                    </div>
                  </div>
                </div>

                <div className={ns("content splitter")}>
                  <div className={ns("half")}>
                    <div className={ns("content cozy")}>
                      {incode("inl")} is most often used in structs. {this.noteAnchor("inlinterfaces")}
                    </div>
                    <div className={ns("content cozy")}>
                      When we use {incode("inl")} in a struct, the member's memory is here inside the containing struct's memory.
                    </div>
                    <div className={ns("content cozy")}>
                      In this example, the Engine's memory is inside the Spaceship's memory. This makes Spaceship bigger, and avoids allocation/deallocation overhead.
                    </div>
                    <div className={ns("content cozy")}>
                      In a way, {incode("inl")} means "It should live here, not somewhere else."
                    </div>
                  </div>
                  <div className={ns("half")}>
                    <Snippet>
{/*
struct Engine {
  model Str;
  fuel Int;
}
struct Spaceship {
  name Str;
  engine inl Engine;
}
fn main() {
  ship = Spaceship(
      "Serenity",
      inl Engine("TCB", 10));
  println(ship.name);
}*/}
<span class="Prog"><span class="Struct">struct <span class="StructName">Engine</span> <span class="Membs">&#123;<br />  <span class="Memb"><span class="MembName">model</span> <span class="Typ">Str</span>;</span><br />  <span class="Memb"><span class="MembName">fuel</span> <span class="Typ">Int</span>;</span><br />&#125;</span></span><br /><span class="Struct">struct <span class="StructName">Spaceship</span> <span class="Membs">&#123;<br />  <span class="Memb"><span class="MembName">name</span> <span class="Typ">Str</span>;</span><br />  <span class="Memb"><span class="MembName">engine</span> <span class="Inl">inl <span class="Typ">Engine</span></span>;</span><br />&#125;</span></span><br /><span class="Fn">fn <span class="FnName">main</span><span class="Params">()</span> <span class="Block">&#123;<br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">ship</span></span></span> = <span class="Call"><span class="CallLookup">Spaceship</span>(<br />      <span class="Str">"Serenity"</span>,<br />      <span class="Call"><span class="Inl">inl</span> <span class="CallLookup">Engine</span>(<span class="Str">"TCB"</span>, <span class="Num">10</span>)</span>)</span>;</span><br />  <span class="Call"><span class="CallLookup">println</span>(<span class="MemberAccess"><span class="Lookup">ship</span>.<span class="Lookup">name</span></span>)</span>;<span class="W"></span><br />&#125;</span></span><br /></span>

                    </Snippet>
                  </div>
                </div>

              </div>

            </div>
            <div className={ns("margin")}>

              <div className={ns("toc-container")}>
                <ReferenceTOC page="references"/>
                <div className={ns("notes-header")}>
                  <NotesHeader update={this.updateNotesHeaderRect}/>
                </div>
              </div>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="ownership">
                Ownership is also found in C++ ({incode("unique_ptr")}), Rust, and Cyclone.
                <div style={{marginTop: "8px"}}>
                  C also has "conceptual" ownership, in that we must track ownership without the language's help, to know when to {incode("free")} an object.
                </div>
                <div style={{marginTop: "8px"}}>
                  Vale's references has the flexibility of C++'s {incode("unique_ptr")} while guaranteeing memory safety.
                </div>
              </Note>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="classic">
                This is a classic challenge with borrowing. Other languages solve this conundrum by not letting anyone else have <i>any</i> references to our object.
                <div style={{marginTop: "8px"}}>
                  However, that limits the usefulness of borrow references, and causes run-time workarounds, such as {incode("unsafe")}, needless ref-counting shared ownership, and indices inefficiently mimicking weak references.
                </div>
                <div style={{marginTop: "8px"}}>
                  Vale's run-time solution is more unified, safe, and explicit: constraint references.
                </div>
                <div style={{marginTop: "8px"}}>
                  See <a to="/blog/rustcomparison">Borrowing Comparison</a> for comparisons between various languages' borrowing approaches.
                </div>
              </Note>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="autoinl">
                Vale uses escape analysis to automatically inline every local that doesn't get moved into a global or parameter. The {incode("inl")} keyword is useful to force it, when optimizing.
              </Note>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="inlinterfaces">
                Vale can even inline interfaces if they're {incode("sealed")}, resulting in something similar to tagged unions in C, or enums in Rust. See <a to="/ref/interfaces">Interfaces</a> for more.
              </Note>

              {/*<Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="constraintlike">
                Vale's owning and constraint references are respectively similar to C++'s unique_ptr and raw pointers, but safer because there can be no dangling pointers.
              </Note>*/}

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="noshared">
                Like C++'s {incode("shared_ptr")} or Rust's {incode("Rc")} or all references in Java and Python.
              </Note>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="borrowfrom">
                Borrowing in Vale is different from borrowing in Rust.
                <div style={{marginTop: "8px"}}>
                  In Vale, a borrow reference's lifetime is within <b>another reference's lifetime</b>.
                </div>
                <div style={{marginTop: "8px"}}>
                  In Rust, the borrow reference doesn't outlive the struct itself.
                </div>
                <div style={{marginTop: "8px"}}>
                  This is what allows Vale to have borrow references without Rust's mutability restrictions.
                </div>
              </Note>

              {/*
              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="shortlived">
                The programmer works with the compiler to prove that a borrow is well-behaved. However, it's not always possible, which is why we also have the other (more flexible) reference types.
              </Note>
              */}

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="borrowfinal">
                In other words, not varying ({incode("!")}).
              </Note>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="dangling">
                Dangling means pointing to a deallocated struct.
              </Note>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="borrowvarying">
                This is because someone else, through some other reference, could change what that varying field points to, and destroy the old value.
              </Note>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="likesql">
                A constraint reference is similar to a foreign key constraint in SQL: it prevents us from deallocating the object it points to.
              </Note>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="stillsafer">
                This is safer than C++, because we can do our testing in normal mode, giving us more confidence that we aren't even <b>making</b> any pointers dangle, which makes us even <i>more</i> confident that we wouldn't accidentally <b>use</b> any dangling pointers.
              </Note>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="copyout">
                For example, by copying the needed data out. In this example, we could have copied into a {incode("wings")} local.
              </Note>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="checkweak">
                A weak reference is an interface with two possible subclasses: the zero-member struct {incode("Dead")} and one-member struct {incode("Live")}.
                <div style={{marginTop: "8px"}}>
                  This line is checking if {incode("ship.origin")} is the one-member subclass {incode("Live")} and if so, assigns its member to {incode("o")}.
                </div>
                <div style={{marginTop: "8px"}}>
                  This is a <b>conditional destructure</b>, see <a to="/ref/patterns">Pattern Matching</a> for more.
                </div>
              </Note>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="matweak">
                We could also use a {incode("mat")} (match statement) here to check whether the weak pointer was Live or Dead.
              </Note>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="borrowhere">
                If we made shipCRef a borrow reference, the compiler would have caught this at compile time.
              </Note>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="dontwantweak">
                A constraint reference is the best kind of reference to use here. We can't use a borrow reference because we can't prove to the compiler that the entry won't be deleted before the dialog, and a weak reference just delays the halt until we try to dereference it. It's better to catch bugs sooner.
              </Note>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="failonprint">
                In the last example, the program would instead have crashed on the final println, because that's when the {incode("shipCRef")} constraint ref is <i>used</i>.
              </Note>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="dependsonflags">
                Depends on compiler flags, see constraint references section below.
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
