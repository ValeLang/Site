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

                <h1 className={ns("noline")}>Interfaces</h1>

                <div className={ns("content splitter cozy")}>
                  <div className={ns("half")}>
                    <div className={ns("content cozy")}>
                      Normally, our code needs to know the exact type of a struct to be able to work with it.
                    </div>
                    <div className={ns("content cozy")}>
                      In this example, hopscotch only works for a Human.
                    </div>
                    <div className={ns("content cozy")}>
                      If we want a {incode("hopscotch")} for DarkElf too, we'd have to copy and paste the hopscotch function and adjust it to use DarkElf instead. How tedious!
                    </div>
                    <div className={ns("content cozy")}>
                      It would be great if we could make a function accept any kind of reference, as long as it has the right functions (such as {incode("hop")} and {incode("skip")}).
                    </div>
                    <div className={ns("content cozy")}>
                      We can, using <b>interfaces</b>!
                    </div>
                  </div>
                  <div className={ns("half")}>
                    <Snippet>
{/*
struct Human { ... }
fn hop(s &Human) { ... }
fn skip(s &Human) { ... }

fn hopscotch(s &Human) {
  s.hop();
  s.skip();
  s.hop();
}

struct DarkElf { ... }
fn hop(s &DarkElf) { ... }
fn skip(s &DarkElf) { ... }

fn main() {
  wulfgar = Human(...);
  hopscotch(&wulfgar);
}
*/}
<span class="Prog"><span class="Struct">struct <span class="StructName">Human</span> <span class="Membs">&#123; ... &#125;</span></span><br /><span class="Fn">fn <span class="FnName">hop</span><span class="Params">(<span class="Pat"><span class="Capture"><span class="CaptureName">s</span></span> <span class="Ownership">&<span class="Typ">Human</span></span></span>)</span> <span class="Block">&#123; <span class="W">...</span> &#125;</span></span><br /><span class="Fn">fn <span class="FnName">skip</span><span class="Params">(<span class="Pat"><span class="Capture"><span class="CaptureName">s</span></span> <span class="Ownership">&<span class="Typ">Human</span></span></span>)</span> <span class="Block">&#123; <span class="W">...</span> &#125;</span></span><br /><br /><span class="Fn">fn <span class="FnName">hopscotch</span><span class="Params">(<span class="Pat"><span class="Capture"><span class="CaptureName">s</span></span> <span class="Ownership">&<span class="Typ">Human</span></span></span>)</span> <span class="Block">&#123;<br />  <span class="Call"><span class="Lookup">s</span>.<span class="CallLookup">hop</span>()</span>;<br />  <span class="Call"><span class="Lookup">s</span>.<span class="CallLookup">skip</span>()</span>;<br />  <span class="Call"><span class="Lookup">s</span>.<span class="CallLookup">hop</span>()</span>;<span class="W"></span><br />&#125;</span></span><br /><br /><span class="Struct">struct <span class="StructName">DarkElf</span> <span class="Membs">&#123; ... &#125;</span></span><br /><span class="Fn">fn <span class="FnName">hop</span><span class="Params">(<span class="Pat"><span class="Capture"><span class="CaptureName">s</span></span> <span class="Ownership">&<span class="Typ">DarkElf</span></span></span>)</span> <span class="Block">&#123; <span class="W">...</span> &#125;</span></span><br /><span class="Fn">fn <span class="FnName">skip</span><span class="Params">(<span class="Pat"><span class="Capture"><span class="CaptureName">s</span></span> <span class="Ownership">&<span class="Typ">DarkElf</span></span></span>)</span> <span class="Block">&#123; <span class="W">...</span> &#125;</span></span><br /><br /><span class="Fn">fn <span class="FnName">main</span><span class="Params">()</span> <span class="Block">&#123;<br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">wulfgar</span></span></span> = <span class="Call"><span class="CallLookup">Human</span>(...)</span>;</span><br />  <span class="Call"><span class="CallLookup">hopscotch</span>(<span class="Lend">&<span class="Lookup">wulfgar</span></span>)</span>;<span class="W"></span><br />&#125;</span></span><br /></span>
                    </Snippet>
                  </div>
                </div>


                <a name="using"></a>
                <h3 className={ns()}>Using Interfaces</h3>


                <div className={ns("content splitter cozy")}>
                  <div className={ns("half")}>
                    <div className={ns("content cozy")}>
                      We can create an interface with the {incode("interface")} keyword, like {incode("Bipedal")} here.
                    </div>
                    <div className={ns("content cozy")}>
                      Then, to tell the compiler that Human and DarkElf conform to that interface, we use the {incode("impl")} keyword. {this.noteAnchor("substruct")}
                    </div>
                    <div className={ns("content cozy")}>
                      Last, we change {incode("hopscotch")} to take in a {incode("&Bipedal")}, and now we can call it with a {incode("Human")} or {incode("DarkElf")}, since both implement the {incode("Bipedal")} interface.
                    </div>
                  </div>
                  <div className={ns("half")}>
                    <Snippet>
{/*
interface Bipedal {
  fn hop(s &Human) Void;
  fn skip(s &Human) Void;
}

struct Human { ... }
fn hop(s &Human) { ... }
fn skip(s &Human) { ... }
impl Human for Bipedal;

fn hopscotch(s &Bipedal) {
  s.hop();
  s.skip();
  s.hop();
}

struct DarkElf { ... }
fn hop(s &DarkElf) { ... }
fn skip(s &DarkElf) { ... }
impl DarkElf for Bipedal;

fn main() {
  wulfgar = Human(...);
  hopscotch(&wulfgar);
  drizzt = DarkElf(...);
  hopscotch(&drizzt);
}
*/}
<span class="Prog"><span class="Interface">interface <span class="StructName">Bipedal</span> &#123;<br />  <span class="Fn">fn <span class="FnName">hop</span><span class="Params">(<span class="Pat"><span class="Capture"><span class="CaptureName">s</span></span> <span class="Ownership">&<span class="Typ">Human</span></span></span>)</span> <span class="Typ">Void</span>;</span><br />  <span class="Fn">fn <span class="FnName">skip</span><span class="Params">(<span class="Pat"><span class="Capture"><span class="CaptureName">s</span></span> <span class="Ownership">&<span class="Typ">Human</span></span></span>)</span> <span class="Typ">Void</span>;</span><br />&#125;</span><br /><br /><span class="Struct">struct <span class="StructName">Human</span> <span class="Membs">&#123; ... &#125;</span></span><br /><span class="Fn">fn <span class="FnName">hop</span><span class="Params">(<span class="Pat"><span class="Capture"><span class="CaptureName">s</span></span> <span class="Ownership">&<span class="Typ">Human</span></span></span>)</span> <span class="Block">&#123; <span class="W">...</span> &#125;</span></span><br /><span class="Fn">fn <span class="FnName">skip</span><span class="Params">(<span class="Pat"><span class="Capture"><span class="CaptureName">s</span></span> <span class="Ownership">&<span class="Typ">Human</span></span></span>)</span> <span class="Block">&#123; <span class="W">...</span> &#125;</span></span><br /><span class="Impl">impl <span class="Typ">Human</span> for <span class="Typ">Bipedal</span>;</span><br /><br /><span class="Fn">fn <span class="FnName">hopscotch</span><span class="Params">(<span class="Pat"><span class="Capture"><span class="CaptureName">s</span></span> <span class="Ownership">&<span class="Typ">Bipedal</span></span></span>)</span> <span class="Block">&#123;<br />  <span class="Call"><span class="Lookup">s</span>.<span class="CallLookup">hop</span>()</span>;<br />  <span class="Call"><span class="Lookup">s</span>.<span class="CallLookup">skip</span>()</span>;<br />  <span class="Call"><span class="Lookup">s</span>.<span class="CallLookup">hop</span>()</span>;<span class="W"></span><br />&#125;</span></span><br /><br /><span class="Struct">struct <span class="StructName">DarkElf</span> <span class="Membs">&#123; ... &#125;</span></span><br /><span class="Fn">fn <span class="FnName">hop</span><span class="Params">(<span class="Pat"><span class="Capture"><span class="CaptureName">s</span></span> <span class="Ownership">&<span class="Typ">DarkElf</span></span></span>)</span> <span class="Block">&#123; <span class="W">...</span> &#125;</span></span><br /><span class="Fn">fn <span class="FnName">skip</span><span class="Params">(<span class="Pat"><span class="Capture"><span class="CaptureName">s</span></span> <span class="Ownership">&<span class="Typ">DarkElf</span></span></span>)</span> <span class="Block">&#123; <span class="W">...</span> &#125;</span></span><br /><span class="Impl">impl <span class="Typ">DarkElf</span> for <span class="Typ">Bipedal</span>;</span><br /><br /><span class="Fn">fn <span class="FnName">main</span><span class="Params">()</span> <span class="Block">&#123;<br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">wulfgar</span></span></span> = <span class="Call"><span class="CallLookup">Human</span>(...)</span>;</span><br />  <span class="Call"><span class="CallLookup">hopscotch</span>(<span class="Lend">&<span class="Lookup">wulfgar</span></span>)</span>;<br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">drizzt</span></span></span> = <span class="Call"><span class="CallLookup">DarkElf</span>(...)</span>;</span><br />  <span class="Call"><span class="CallLookup">hopscotch</span>(<span class="Lend">&<span class="Lookup">drizzt</span></span>)</span>;<span class="W"></span><br />&#125;</span></span><br /></span>
                    </Snippet>
                  </div>
                </div>

                <a name="openconstructors"></a>
                <h4 className={ns()} style={{marginBottom: 0}}>Open Interface Constructors</h4>
                <div className={ns("content")} style={{opacity: .8}} >
                  Also known as "Anonymous Substructs"
                </div>

                <div className={ns("content splitter")}>
                  <div className={ns("half")}>
                    <div className={ns("content cozy")}>
                      When we make an open interface like the above {incode("Bipedal")}, the compiler makes an <b>open interface constructor</b>, a function which can define another substruct.
                    </div>
                    <div className={ns("content cozy")}>
                      It takes functions (or lambdas) as arguments, to use for the interface's methods.
                    </div>
                    <div className={ns("content cozy")}>
                      In this example, we're giving it a lambda for its {incode("hop")} method, and another lambda for its {incode("skip")} method.
                    </div>
                  </div>
                  <div className={ns("half")}>
                    <Snippet>
{/*
// Using above Bipedal interface
// and hopscotch function

fn main() {
  x = Bipedal(
    []{ println("Hop!"); },
    []{ println("Skip!"); });
  // x is an unnamed substruct which
  // implements Bipedal.

  hopscotch(&x);
}
*/}
<span class="Prog"><span class="Comment">// Using above Bipedal interface</span><br /><span class="Comment">// and hopscotch function</span><br /><br /><span class="Fn">fn <span class="FnName">main</span><span class="Params">()</span> <span class="Block">&#123;<br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">x</span></span></span> = <span class="Call"><span class="CallLookup">Bipedal</span>(<br />    <span class="Lambda">[]<span class="Block">&#123; <span class="Call"><span class="CallLookup">println</span>(<span class="Str">"Hop!"</span>)</span>;<span class="W"></span> &#125;</span></span>,<br />    <span class="Lambda">[]<span class="Block">&#123; <span class="Call"><span class="CallLookup">println</span>(<span class="Str">"Skip!"</span>)</span>;<span class="W"></span> &#125;</span></span>)</span>;</span><br />  <span class="Comment">// x is an unnamed substruct which</span><br />  <span class="Comment">// implements Bipedal.</span><br /><br />  <span class="Call"><span class="CallLookup">hopscotch</span>(<span class="Lend">&<span class="Lookup">x</span></span>)</span>;<span class="W"></span><br />&#125;</span></span><br /></span>
                    </Snippet>
                  </div>
                </div>

                <a name="sealed"></a>
                <h3 className={ns()}>Sealed Interfaces {this.noteAnchor("nosealedyet")}</h3>

                <div className={ns("content splitter")}>
                  <div className={ns("half")}>
                    <div className={ns("content cozy")}>
                      By default, an interface is <b>open</b>, which means any struct can implement it.
                    </div>
                    <div className={ns("content cozy")}>
                      A <b>sealed</b> interface can only be implemented by structs defined in the same file.
                    </div>
                  </div>
                  <div className={ns("half")}>
                    <Snippet>
{/*
interface MaybeInt sealed { }
// sealed: only the below two
// structs can implement MaybeInt.

struct NoInt { }
impl None for MaybeInt;

struct SomeInt { value Int; }
impl SomeInt for MaybeInt;
*/}
<span class="Prog"><span class="Interface">interface <span class="StructName">MaybeInt</span> sealed &#123; &#125;</span><br /><span class="Comment">// sealed: only the below two</span><br /><span class="Comment">// structs can implement MaybeInt.</span><br /><br /><span class="Struct">struct <span class="StructName">NoInt</span> <span class="Membs">&#123; &#125;</span></span><br /><span class="Impl">impl <span class="Typ">None</span> for <span class="Typ">MaybeInt</span>;</span><br /><br /><span class="Struct">struct <span class="StructName">SomeInt</span> <span class="Membs">&#123; <span class="Memb"><span class="MembName">value</span> <span class="Typ">Int</span>;</span> &#125;</span></span><br /><span class="Impl">impl <span class="Typ">SomeInt</span> for <span class="Typ">MaybeInt</span>;</span><br /></span>
                    </Snippet>
                  </div>
                </div>

                <div className={ns("content cozy")}>
                  Because the compiler knows all the implementing structs up-front, it:
                </div>
                <ul className={ns("content")}>
                  <li>Can be inlined. {this.noteAnchor("inlining")}</li>
                  <li>Checks that {incode("mat")} statements consider all substructs.</li>
                  <li>Generates sealed interface constructors.</li>
                </ul>

                <a name="sealedconstructors"></a>
                <h4 className={ns()}>Sealed Interface Constructors</h4>

                <div className={ns("content splitter cozy")}>
                  <div className={ns("half")}>
                    <div className={ns("content cozy")}>
                      A <b>sealed interface constructor</b> is a function with the same name of the interface, which constructs the correct subclass depending on the given arguments.
                    </div>
                    <div className={ns("content cozy")}>
                      In this example, when we call {incode("MaybeInt(7)")}, the compiler finds that the {incode("SomeInt")} substruct indeed has a constructor accepting one Int, and calls that.
                    </div>
                  </div>
                  <div className={ns("half")}>
                    <Snippet>
{/*
// Using above MaybeInt/NoInt/SomeInt

fn main() {
  x = MaybeInt(7);
  // x is of type SomeInt.

  y = MaybeInt();
  // y is of type NoInt.
}
*/}
<span class="Prog"><span class="Comment">// Using above MaybeInt/NoInt/SomeInt</span><br /><br /><span class="Fn">fn <span class="FnName">main</span><span class="Params">()</span> <span class="Block">&#123;<br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">x</span></span></span> = <span class="Call"><span class="CallLookup">MaybeInt</span>(<span class="Num">7</span>)</span>;</span><br />  <span class="Comment">// x is of type SomeInt.</span><br /><br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">y</span></span></span> = <span class="Call"><span class="CallLookup">MaybeInt</span>()</span>;</span><span class="W"></span><br />  <span class="Comment">// y is of type NoInt.</span><br />&#125;</span></span><br /></span>
                    </Snippet>
                  </div>
                </div>

                <div className={ns("content cozy")}>
                  A sealed interface constructor also allows us to make substructs via <b>shortcalling</b>.
                </div>

                <a name="shortcallingsealedconstructors"></a>
                <h4 className={ns()}>Shortcalling Sealed Interface Constructors</h4>

                <div className={ns("content splitter cozy")}>
                  <div className={ns("half")}>
                    <div className={ns("content cozy")}>
                      We normally call a function by name, such as the {incode("MaybeInt(7)")} above. However, if the code is expecting a certain type, it can <b>automatically call the constructor</b> of the expected type.
                    </div>
                  </div>
                  <div className={ns("half")}>
                    <Snippet>
{/*
// Using above MaybeInt/NoInt/SomeInt

fn main() {
  // These statements are equivalent:
  x MaybeInt = MaybeInt(7);
  x MaybeInt = (7);
}
*/}
<span class="Prog"><span class="Comment">// Using above MaybeInt/NoInt/SomeInt</span><br /><br /><span class="Fn">fn <span class="FnName">main</span><span class="Params">()</span> <span class="Block">&#123;<br />  <span class="Comment">// These statements are equivalent:</span><br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">x</span></span> <span class="Typ">MaybeInt</span></span> = <span class="Call"><span class="CallLookup">MaybeInt</span>(<span class="Num">7</span>)</span>;</span><br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">x</span></span> <span class="Typ">MaybeInt</span></span> = (<span class="Num">7</span>);</span><span class="W"></span><br />&#125;</span></span><br /></span>
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
// Using above MaybeInt/NoInt/SomeInt

fn foo(m MaybeInt) { ... }

fn main() {
  foo(SomeInt(7));
  // Equivalent, calling sealed
  // interface constructor:
  foo(MaybeInt(7));
  // Equivalent, shortcalling sealed
  // interface constructor:
  foo((7));

  foo(NoInt());
  // Equivalent, calling sealed
  // interface constructor:
  foo(MaybeInt());
  // Equivalent, shortcalling sealed
  // interface constructor:
  foo(());
}
*/}
<span class="Prog"><span class="Comment">// Using above MaybeInt/NoInt/SomeInt</span><br /><br /><span class="Fn">fn <span class="FnName">foo</span><span class="Params">(<span class="Pat"><span class="Capture"><span class="CaptureName">m</span></span> <span class="Typ">MaybeInt</span></span>)</span> <span class="Block">&#123; <span class="W">...</span> &#125;</span></span><br /><br /><span class="Fn">fn <span class="FnName">main</span><span class="Params">()</span> <span class="Block">&#123;<br />  <span class="Call"><span class="CallLookup">foo</span>(<span class="Call"><span class="CallLookup">SomeInt</span>(<span class="Num">7</span>)</span>)</span>;<br />  <span class="Comment">// Equivalent, calling sealed</span><br />  <span class="Comment">// interface constructor:</span><br />  <span class="Call"><span class="CallLookup">foo</span>(<span class="Call"><span class="CallLookup">MaybeInt</span>(<span class="Num">7</span>)</span>)</span>;<br />  <span class="Comment">// Equivalent, shortcalling sealed</span><br />  <span class="Comment">// interface constructor:</span><br />  <span class="Call"><span class="CallLookup">foo</span>((<span class="Num">7</span>))</span>;<br /><br />  <span class="Call"><span class="CallLookup">foo</span>(<span class="Call"><span class="CallLookup">NoInt</span>()</span>)</span>;<br />  <span class="Comment">// Equivalent, calling sealed</span><br />  <span class="Comment">// interface constructor:</span><br />  <span class="Call"><span class="CallLookup">foo</span>(<span class="Call"><span class="CallLookup">MaybeInt</span>()</span>)</span>;<br />  <span class="Comment">// Equivalent, shortcalling sealed</span><br />  <span class="Comment">// interface constructor:</span><br />  <span class="Call"><span class="CallLookup">foo</span>(<span class="Call"><span class="CallLookup"></span>()</span>)</span>;<span class="W"></span><br />&#125;</span></span><br /></span>
                    </Snippet>
                  </div>
                </div>

                <div className={ns("content")} style={{textAlign: "right"}}>
                  <strong>Next:</strong> <a href="/ref/generics">Generics</a>
                </div>

              </div>

            </div>
            <div className={ns("margin")}>

              <div className={ns("toc-container")}>
                <ReferenceTOC page="interfaces"/>
                <div className={ns("notes-header")}>
                  <NotesHeader update={this.updateNotesHeaderRect}/>
                </div>
              </div>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="substruct">
                When a struct {incode("impl", "ements")} an interface, we call it a <b>substruct</b> of that interface.
              </Note>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="inlining">
                Locals and members can {incode("inl", "ine")} sealed interfaces. The compiler will figure out the size of the largest substruct, and reserve that much memory in the stack (if an {incode("inl")} local) or the containing struct (if an {incode("inl")} member), and use that memory for the substruct. (This is the equivalent of a C/C++ union or Rust enum)
              </Note>

              <Note name="nosealedyet" customIcon="notyet" iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon}>
                Planned feature; see <a to="/roadmap">Roadmap</a>!
              </Note>

              {/*<Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="packing">
                If there are 8 or less substructs, then Vale will use the unused low bits of the pointer to remember the type of the underlying substruct, instead of a full 64 bit pointer like it would instead.
              </Note>*/}

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
