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

                <h1 className={ns("noline")}>Generics</h1>

                <div className={ns("content cozy")}>
                  Generics are a different way to reuse code for different types.
                </div>

                <div className={ns("content cozy")}>
                  We can use <a to="ref/interfaces">interfaces</a> for this, but interfaces have some limitations.
                </div>

                <a name="limitations"></a>
                <h3 className={ns()}>Limitations of Interfaces</h3>

                <div className={ns("content splitter cozy")}>
                  <div className={ns("half")}>
                    <div className={ns("content cozy")}>
                      We often want to reuse a function for multiple types. On the <a to="ref/interfaces">Interfaces</a> page, we used an interface to allow the function to operate on any type that conformed to a certain contract.
                    </div>
                    <div className={ns("content cozy")}>
                      A function that takes an interface doesn't have to care about the original type of the substruct we pass in.
                    </div>
                    <div className={ns("content cozy")}>
                      However, that can also be its downside: it forgets the original type of the substruct we pass in. This can be mighty inconvenient, like in this example.
                    </div>
                    <div className={ns("content cozy")}>
                      Notice how {incode("main")} is giving two {incode("Firefly")} to {incode("longerShip")}, so we know that {incode("longerShip")} should return a {incode("Firefly")}.
                    </div>
                    <div className={ns("content cozy")}>
                      {incode("main")} doesn't know that though; all is sees is that {incode("longerShip")} returns an {incode("&ISpaceship")}.
                    </div>
                    <div className={ns("content cozy")}>
                      Because of this, we can't call {incode("crazyIvan")} on the longer ship!
                    </div>
                  </div>
                  <div className={ns("half")}>
                    <Snippet>
{/*
interface ISpaceship {
  fn length() Int;
  fn honk() Void;
}

fn longerShip(
    a &ISpaceship,
    b &ISpaceship)
&ISpaceship {
  if (a.length() > b.length()) {
    ret a;
  } else {
    ret b;
  }
}

struct Raza { ... }
fn length(r &Raza) { 4 }
fn honk(r &Raza) { ... }
impl Raza for ISpaceship;

struct Firefly { ... }
fn length(f &Firefly) { 3 }
fn honk(f &Firefly) { ... }
fn crazyIvan(f &Firefly) { ... }
impl Firefly for ISpaceship;

fn main() {
  flametail = Firefly(...);
  serenity = Firefly(...);
  ship = longerShip(
    &flametail, &serenity);
  // Compile error: ship is type
  // ISpaceship, not Firefly!
  ship.crazyIvan();
}
*/}
<span class="Prog"><span class="Interface">interface <span class="StructName">ISpaceship</span> &#123;<br />  <span class="Fn">fn <span class="FnName">length</span><span class="Params">()</span> <span class="Typ">Int</span>;</span><br />  <span class="Fn">fn <span class="FnName">honk</span><span class="Params">()</span> <span class="Typ">Void</span>;</span><br />&#125;</span><br /><br /><span class="Fn">fn <span class="FnName">longerShip</span><span class="Params">(<br />    <span class="Pat"><span class="Capture"><span class="CaptureName">a</span></span> <span class="Ownership">&<span class="Typ">ISpaceship</span></span></span>,<br />    <span class="Pat"><span class="Capture"><span class="CaptureName">b</span></span> <span class="Ownership">&<span class="Typ">ISpaceship</span></span></span>)</span><br /><span class="Ownership">&<span class="Typ">ISpaceship</span></span> <span class="Block">&#123;<br />  <span class="If">if <span class="Block">(<span class="Call"><span class="Call"><span class="Lookup">a</span>.<span class="CallLookup">length</span>()</span> <span class="CallLookup">&gt;</span> <span class="Call"><span class="Lookup">b</span>.<span class="CallLookup">length</span>()</span></span>)</span> <span class="Block">&#123;<br />    <span class="Ret">ret <span class="Lookup">a</span>;</span><br />  &#125;</span> else <span class="Block">&#123;<br />    <span class="Ret">ret <span class="Lookup">b</span>;</span><br />  &#125;</span></span><span class="W"></span><br />&#125;</span></span><br /><br /><span class="Struct">struct <span class="StructName">Raza</span> <span class="Membs">&#123; ... &#125;</span></span><br /><span class="Fn">fn <span class="FnName">length</span><span class="Params">(<span class="Pat"><span class="Capture"><span class="CaptureName">r</span></span> <span class="Ownership">&<span class="Typ">Raza</span></span></span>)</span> <span class="Block">&#123; <span class="Num">4</span> &#125;</span></span><br /><span class="Fn">fn <span class="FnName">honk</span><span class="Params">(<span class="Pat"><span class="Capture"><span class="CaptureName">r</span></span> <span class="Ownership">&<span class="Typ">Raza</span></span></span>)</span> <span class="Block">&#123; <span class="W">...</span> &#125;</span></span><br /><span class="Impl">impl <span class="Typ">Raza</span> for <span class="Typ">ISpaceship</span>;</span><br /><br /><span class="Struct">struct <span class="StructName">Firefly</span> <span class="Membs">&#123; ... &#125;</span></span><br /><span class="Fn">fn <span class="FnName">length</span><span class="Params">(<span class="Pat"><span class="Capture"><span class="CaptureName">f</span></span> <span class="Ownership">&<span class="Typ">Firefly</span></span></span>)</span> <span class="Block">&#123; <span class="Num">3</span> &#125;</span></span><br /><span class="Fn">fn <span class="FnName">honk</span><span class="Params">(<span class="Pat"><span class="Capture"><span class="CaptureName">f</span></span> <span class="Ownership">&<span class="Typ">Firefly</span></span></span>)</span> <span class="Block">&#123; <span class="W">...</span> &#125;</span></span><br /><span class="Fn">fn <span class="FnName">crazyIvan</span><span class="Params">(<span class="Pat"><span class="Capture"><span class="CaptureName">f</span></span> <span class="Ownership">&<span class="Typ">Firefly</span></span></span>)</span> <span class="Block">&#123; <span class="W">...</span> &#125;</span></span><br /><span class="Impl">impl <span class="Typ">Firefly</span> for <span class="Typ">ISpaceship</span>;</span><br /><br /><span class="Fn">fn <span class="FnName">main</span><span class="Params">()</span> <span class="Block">&#123;<br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">flametail</span></span></span> = <span class="Call"><span class="CallLookup">Firefly</span>(...)</span>;</span><br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">serenity</span></span></span> = <span class="Call"><span class="CallLookup">Firefly</span>(...)</span>;</span><br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">ship</span></span></span> = <span class="Call"><span class="CallLookup">longerShip</span>(<br />    <span class="Lend">&<span class="Lookup">flametail</span></span>, <span class="Lend">&<span class="Lookup">serenity</span></span>)</span>;</span><br />  <span class="Comment">// Compile error: ship is type</span><br />  <span class="Comment">// ISpaceship, not Firefly!</span><br />  <span class="Call"><span class="Lookup">ship</span>.<span class="CallLookup">crazyIvan</span>()</span>;<span class="W"></span><br />&#125;</span></span><br /></span>
                    </Snippet>
                  </div>
                </div>


                <a name="using"></a>
                <h3 className={ns()}>Using Generics</h3>

                <div className={ns("content splitter cozy")}>
                  <div className={ns("half")}>
                    <div className={ns("content cozy")}>
                      We can make longerShip into a <b>generic</b> function.
                    </div>
                    <div className={ns("content cozy")}>
                      Its parameters aren't exactly {incode("ISpaceship")}, they are any type {incode("T")} that implements {incode("ISpaceship")}.
                    </div>
                    <div className={ns("content cozy")}>
                      Since the parameters and return type are all {incode("T")}, the compiler knows that if we hand in {incode("Firefly")}s, we return a {incode("Firefly")}.
                    </div>
                    <div className={ns("content cozy")}>
                      In this case, we're calling it like {incode("longerShip<Firefly>(...)")}, which specifies that we should use the version of {incode("longerShip")} where {incode("T")} is a {incode("Firefly")}.
                    </div>
                    <div className={ns("content cozy")}>
                      {incode("longerShip<T>")} returns a {incode("T")}, so {incode("main")} knows that {incode("longerShip<Firefly>")} returns a {incode("Firefly")}.
                    </div>
                  </div>
                  <div className={ns("half")}>
                    <Snippet>
{/*
interface ISpaceship {
  fn length() Int;
  fn honk() Void;
}

fn longerShip<T impl ISpaceship>
(a &T, b &T) &T {
  if (a.length() > b.length()) {
    ret a;
  } else {
    ret b;
  }
}

struct Raza { ... }
fn length(r &Raza) { 4 }
fn honk(r &Raza) { ... }
impl Raza for ISpaceship;

struct Firefly { ... }
fn length(f &Firefly) { 3 }
fn honk(f &Firefly) { ... }
fn crazyIvan(f &Firefly) { ... }
impl Firefly for ISpaceship;

fn main() {
  flametail = Firefly(...);
  serenity = Firefly(...);
  ship =
    longerShip<Firefly>( <notehere>
      &flametail, &serenity);
  // This works now!
  ship.crazyIvan();
}
*/}
<span class="Prog"><span class="Interface">interface <span class="StructName">ISpaceship</span> &#123;<br />  <span class="Fn">fn <span class="FnName">length</span><span class="Params">()</span> <span class="Typ">Int</span>;</span><br />  <span class="Fn">fn <span class="FnName">honk</span><span class="Params">()</span> <span class="Typ">Void</span>;</span><br />&#125;</span><br /><br /><span class="Fn">fn <span class="FnName">longerShip</span><span class="IdentRunes">&lt;<span class="IdentRune">T impl ISpaceship</span>&gt;</span><br /><span class="Params">(<span class="Pat"><span class="Capture"><span class="CaptureName">a</span></span> <span class="Ownership">&<span class="Typ">T</span></span></span>, <span class="Pat"><span class="Capture"><span class="CaptureName">b</span></span> <span class="Ownership">&<span class="Typ">T</span></span></span>)</span> <span class="Ownership">&<span class="Typ">T</span></span> <span class="Block">&#123;<br />  <span class="If">if <span class="Block">(<span class="Call"><span class="Call"><span class="Lookup">a</span>.<span class="CallLookup">length</span>()</span> <span class="CallLookup">&gt;</span> <span class="Call"><span class="Lookup">b</span>.<span class="CallLookup">length</span>()</span></span>)</span> <span class="Block">&#123;<br />    <span class="Ret">ret <span class="Lookup">a</span>;</span><br />  &#125;</span> else <span class="Block">&#123;<br />    <span class="Ret">ret <span class="Lookup">b</span>;</span><br />  &#125;</span></span><span class="W"></span><br />&#125;</span></span><br /><br /><span class="Struct">struct <span class="StructName">Raza</span> <span class="Membs">&#123; ... &#125;</span></span><br /><span class="Fn">fn <span class="FnName">length</span><span class="Params">(<span class="Pat"><span class="Capture"><span class="CaptureName">r</span></span> <span class="Ownership">&<span class="Typ">Raza</span></span></span>)</span> <span class="Block">&#123; <span class="Num">4</span> &#125;</span></span><br /><span class="Fn">fn <span class="FnName">honk</span><span class="Params">(<span class="Pat"><span class="Capture"><span class="CaptureName">r</span></span> <span class="Ownership">&<span class="Typ">Raza</span></span></span>)</span> <span class="Block">&#123; <span class="W">...</span> &#125;</span></span><br /><span class="Impl">impl <span class="Typ">Raza</span> for <span class="Typ">ISpaceship</span>;</span><br /><br /><span class="Struct">struct <span class="StructName">Firefly</span> <span class="Membs">&#123; ... &#125;</span></span><br /><span class="Fn">fn <span class="FnName">length</span><span class="Params">(<span class="Pat"><span class="Capture"><span class="CaptureName">f</span></span> <span class="Ownership">&<span class="Typ">Firefly</span></span></span>)</span> <span class="Block">&#123; <span class="Num">3</span> &#125;</span></span><br /><span class="Fn">fn <span class="FnName">honk</span><span class="Params">(<span class="Pat"><span class="Capture"><span class="CaptureName">f</span></span> <span class="Ownership">&<span class="Typ">Firefly</span></span></span>)</span> <span class="Block">&#123; <span class="W">...</span> &#125;</span></span><br /><span class="Fn">fn <span class="FnName">crazyIvan</span><span class="Params">(<span class="Pat"><span class="Capture"><span class="CaptureName">f</span></span> <span class="Ownership">&<span class="Typ">Firefly</span></span></span>)</span> <span class="Block">&#123; <span class="W">...</span> &#125;</span></span><br /><span class="Impl">impl <span class="Typ">Firefly</span> for <span class="Typ">ISpaceship</span>;</span><br /><br /><span class="Fn">fn <span class="FnName">main</span><span class="Params">()</span> <span class="Block">&#123;<br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">flametail</span></span></span> = <span class="Call"><span class="CallLookup">Firefly</span>(...)</span>;</span><br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">serenity</span></span></span> = <span class="Call"><span class="CallLookup">Firefly</span>(...)</span>;</span><br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">ship</span></span></span> =<br />    <span class="Call"><span class="CallLookup">longerShip</span><span class="TplArgs">&lt;<span class="Typ">Firefly</span>&gt;</span>(<br />      <span class="Lend">&<span class="Lookup">flametail</span></span>, <span class="Lend">&<span class="Lookup">serenity</span></span>)</span>;</span><br />  <span class="Comment">// This works now!</span><br />  <span class="Call"><span class="Lookup">ship</span>.<span class="CallLookup">crazyIvan</span>()</span>;<span class="W"></span> {this.noteAnchor("anglies")}<br />&#125;</span></span><br /></span>
                    </Snippet>
                  </div>
                </div>

                <a name="structs"></a>
                <h3 className={ns()}>Generic Structs</h3>

                <div className={ns("content splitter cozy")}>
                  <div className={ns("half")}>
                    <div className={ns("content cozy")}>
                      We can make generic structs too.
                    </div>
                    <div className={ns("content cozy")}>
                      Here we're making a Flock struct that can hold multiple of the same ship.
                    </div>
                  </div>
                  <div className={ns("half")}>
                    <Snippet>
{/*
// Using above ISpaceship,
// Firefly, Raza

struct Flock<T impl ISpaceship> {
  ships List<T>;
}

fn main() {
  f = Flock<Firefly>(List<Firefly>());
  f.ships.add(Firefly(...));
  f.ships.add(Firefly(...));

  firstShip = f.ships.0;
  // This works because the compiler
  // can see that firstShip is a
  // Firefly.
  firstShip.crazyIvan();
}
*/}
<span class="Prog"><span class="Comment">// Using above ISpaceship,</span><br /><span class="Comment">// Firefly, Raza</span><br /><br /><span class="Struct">struct <span class="StructName">Flock</span><span class="IdentRunes">&lt;<span class="IdentRune">T impl ISpaceship</span>&gt;</span> <span class="Membs">&#123;<br />  <span class="Memb"><span class="MembName">ships</span> <span class="TplArgs"><span class="Typ">List</span>&lt;<span class="Typ">T</span>&gt;</span>;</span><br />&#125;</span></span><br /><br /><span class="Fn">fn <span class="FnName">main</span><span class="Params">()</span> <span class="Block">&#123;<br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">f</span></span></span> = <span class="Call"><span class="CallLookup">Flock</span><span class="TplArgs">&lt;<span class="Typ">Firefly</span>&gt;</span>(<span class="Call"><span class="CallLookup">List</span><span class="TplArgs">&lt;<span class="Typ">Firefly</span>&gt;</span>()</span>)</span>;</span><br />  <span class="Call"><span class="MemberAccess"><span class="Lookup">f</span>.<span class="Lookup">ships</span>.add(Firefly(...))</span><span class="CallLookup"></span><span class="Call"><span class="CallLookup"></span></span></span>;<br />  <span class="Call"><span class="MemberAccess"><span class="Lookup">f</span>.<span class="Lookup">ships</span>.add(Firefly(...))</span><span class="CallLookup"></span><span class="Call"><span class="CallLookup"></span></span></span>;<br /><br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">firstShip</span></span></span> = <span class="MemberAccess"><span class="MemberAccess"><span class="Lookup">f</span>.<span class="Lookup">ships</span>.0</span><span class="Lookup"></span></span>;</span><br />  <span class="Comment">// This works because the compiler</span><br />  <span class="Comment">// can see that firstShip is a</span><br />  <span class="Comment">// Firefly.</span><br />  <span class="Call"><span class="Lookup">firstShip</span>.<span class="CallLookup">crazyIvan</span>()</span>;<span class="W"></span><br />&#125;</span></span><br /></span>
                    </Snippet>
                  </div>
                </div>

                <div className={ns("content")} style={{textAlign: "right"}}>
                  <strong>Next:</strong> <a href="/ref/patterns">Patterns</a>
                </div>

              </div>

            </div>
            <div className={ns("margin")}>

              <div className={ns("toc-container")}>
                <ReferenceTOC page="generics"/>
                <div className={ns("notes-header")}>
                  <NotesHeader update={this.updateNotesHeaderRect}/>
                </div>
              </div>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="anglies">
                We can actually leave off the {incode("<Firefly>")} here, the compiler can figure it out from the arguments we passed in.
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
