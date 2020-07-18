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

                <h1 className={ns("noline")}>Regions</h1>

                <div className={ns("content cozy")}>
                  We can divide our program's memory into <b>regions</b>, for <b>safer</b> and <b>faster</b> code. {this.noteAnchor("notyet")}
                </div>

                <div className={ns("content cozy")}>
                  Every function has its <b>current</b> region, but can access other regions as well.
                </div>

                <div className={ns("content cozy")}>
                  We often call {incode("main", "'s")} region the <b>main region</b>.
                </div>

                <a name="readonly"></a>
                <h3 className={ns()}>Read-only Region</h3>

                <div className={ns("content splitter cozy")}>
                  <div className={ns("half")}>
                    <div className={ns("content cozy")}>
                      A common pattern is for a function to regard all of its parameters as coming from a read-only region.
                    </div>
                    <div className={ns("content cozy")}>
                      Notice the {incode("<'a ro>")}. The {incode("'")} means region, followed by its name ({incode("a")}), followed by its permission ({incode("ro")} which means read-only).
                    </div>
                    <div className={ns("content cozy")}>
                      When {incode("main")} passes in {incode("&allShips")} from the main region into the {incode("'a &List<Ship>")} parameter, {incode("biggestShipName")}:
                    </div>
                    <ul className={ns("content cozy")}>
                       <li>Refers to the main region by the name {incode("'a")}.</li>
                       <li>Can't modify anything in that region, because of the {incode("ro")} permission.</li>
                       <li>Makes its own region, to be its current region.</li>
                    </ul>
                    <div className={ns("content cozy")}>
                      This <b>locks down the entire main region</b>. Nobody can modify it.
                    </div>
                    <div className={ns("content cozy")}>
                      Because of this, the compiler is free to do much more powerful optimizations. {this.noteAnchor("optimize")}
                    </div>
                    <div className={ns("content cozy")}>
                      The compiler also keeps track of all references' regions, and makes sure that no reference outlive their region.
                    </div>

                  </div>
                  <div className={ns("half")}>
                    <Snippet>
{/*
struct Ship {
  name Str;
  size Int;
}

fn biggestShipName<'a>(
  ships 'a &List<Ship>)
Str {
  biggest! = &ships.0;
  each ships (ship){
    if (ship.size > biggest.size) {
      mut biggest = ship;
    }
  }
  ret biggest.name;
}

fn main() {
  allShips = List(
    Ship("Serenity", 9),
    Ship("Raza", 7));

  n = biggestShipName(&allShips);

  println(n);
}
*/}
<span class="Prog"><span class="Struct">struct <span class="StructName">Ship</span> <span class="Membs">&#123;<br />  <span class="Memb"><span class="MembName">name</span> <span class="Typ">Str</span>;</span><br />  <span class="Memb"><span class="MembName">size</span> <span class="Typ">Int</span>;</span><br />&#125;</span></span><br /><br /><span class="Fn">fn <span class="FnName">biggestShipName</span><span class="IdentRunes">&lt;<span class="IdentRune">'a ro</span>&gt;</span><span class="Params">(<br />  <span class="Pat"><span class="Capture"><span class="CaptureName">ships</span></span> <span class="Ownership">'a &<span class="TplArgs"><span class="Typ">List</span>&lt;<span class="Typ">Ship</span>&gt;</span></span></span>)</span><br /><span class="Typ">Str</span> <span class="Block">&#123;<br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">biggest</span>!</span></span> = <span class="Lend">&<span class="MemberAccess"><span class="Lookup">ships</span>.<span class="Lookup">0</span></span></span>;</span><br />  <span class="Call"><span class="CallLookup">each</span> <span class="Lookup">ships</span> <span class="Lambda"><span class="Params">(<span class="Pat"><span class="Capture"><span class="CaptureName">ship</span></span></span>)</span><span class="Block">&#123;<br />    <span class="If">if <span class="Block">(<span class="Call"><span class="MemberAccess"><span class="Lookup">ship</span>.<span class="Lookup">size</span></span> <span class="CallLookup">&gt;</span> <span class="MemberAccess"><span class="Lookup">biggest</span>.<span class="Lookup">size</span></span></span>)</span> <span class="Block">&#123;<br />      <span class="Mut">mut <span class="Lookup">biggest</span> = <span class="Lookup">ship</span></span>;<span class="W"></span><br />    &#125;</span><span class="Block"><span class="W"></span></span></span><span class="W"></span><br />  &#125;</span></span></span><br />  <span class="Ret">ret <span class="MemberAccess"><span class="Lookup">biggest</span>.<span class="Lookup">name</span></span>;</span><br />&#125;</span></span><br /><br /><span class="Fn">fn <span class="FnName">main</span><span class="Params">()</span> <span class="Block">&#123;<br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">allShips</span></span></span> = <span class="Call"><span class="CallLookup">List</span>(<br />    <span class="Call"><span class="CallLookup">Ship</span>(<span class="Str">"Serenity"</span>, <span class="Num">9</span>)</span>,<br />    <span class="Call"><span class="CallLookup">Ship</span>(<span class="Str">"Raza"</span>, <span class="Num">7</span>)</span>)</span>;</span><br /><br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">n</span></span></span> = <span class="Call"><span class="CallLookup">biggestShipName</span>(<span class="Lend">&<span class="Lookup">allShips</span></span>)</span>;</span><br /><br />  <span class="Call"><span class="CallLookup">println</span>(<span class="Lookup">n</span>)</span>;<span class="W"></span><br />&#125;</span></span><br /></span>
                    </Snippet>
                    <div className={ns("output")}>
{`Serenity`}
                    </div>
                  </div>
                </div>


                <a name="mutex"></a>
                <h3 className={ns()}>Mutexed Region</h3>

                <div className={ns("content cozy")}>
                  A mutex is a special wrapper around a region that can be opened by someone for reading and writing, or opened by multiple people for only reading.
                </div>

                <div className={ns("content splitter cozy")}>
                  <div className={ns("half")}>
                    <div className={ns("content cozy")}>
                      We can make a mutexed region with the {incode("Mutex")} function.
                    </div>
                    <div className={ns("content cozy")}>
                      It accepts a <b>regioned object</b>. A regioned object is an object where all of its (directly or indirectly) owned objects refer only to each other and are referred to only by each other.
                    </div>
                    <div className={ns("content cozy")}>
                      Here, we're making an regioned object with a <b>region call</b>, the {incode("'a makeGame()")}.
                    </div>
                    <div className={ns("content cozy")}>
                      {incode("Mutex")} will take the regioned object, and wrap it in a {incode("Mutex")} object.
                    </div>
                    <div className={ns("content cozy")}>
                      We can open the mutex for reading via its {incode("rlock")} method, which will return a {incode("RLock")} object, which contains a read-only reference to our regioned object.
                    </div>
                    <div className={ns("content cozy")}>
                      There's a corresponding {incode("rwlock")} method for read-write access.
                    </div>
                    <div className={ns("content cozy")}>
                      The compiler keeps track of all references' regions, and makes sure that no references outlive their lock.
                    </div>
                  </div>
                  <div className={ns("half")}>
                    <Snippet>
{/*
struct Game {
  bases List<Base>;
  ships List<Ship>;
}
struct Base { ... }
struct Ship {
  name Str;
  from &Base;
}

fn makeGame() Game {
  bases List<Base> = ...;
  ships = List(
    Ship("Serenity", &bases.0),
    Ship("Raza", &bases.1));
  ret Game(bases, ships);
}

fn main() {
  mutex = Mutex('a makeGame());

  // Open for reading
  roLock = mutex.rlock();
  roGame = &lock.root;
  println(roGame.ships.0.name);
  drop(roLock);

  // Open for writing
  rwLock = mutex.rwlock();
  rwGame = &lock.root;
  mut rwGame.ships.0.from =
    &rwGame.bases.0;
  drop(rwLock);
}
*/}
<span class="Prog"><span class="Struct">struct <span class="StructName">Game</span> <span class="Membs">&#123;<br />  <span class="Memb"><span class="MembName">bases</span> <span class="TplArgs"><span class="Typ">List</span>&lt;<span class="Typ">Base</span>&gt;</span>;</span><br />  <span class="Memb"><span class="MembName">ships</span> <span class="TplArgs"><span class="Typ">List</span>&lt;<span class="Typ">Ship</span>&gt;</span>;</span><br />&#125;</span></span><br /><span class="Struct">struct <span class="StructName">Base</span> <span class="Membs">&#123; ... &#125;</span></span><br /><span class="Struct">struct <span class="StructName">Ship</span> <span class="Membs">&#123;<br />  <span class="Memb"><span class="MembName">name</span> <span class="Typ">Str</span>;</span><br />  <span class="Memb"><span class="MembName">from</span> <span class="Ownership">&<span class="Typ">Base</span></span>;</span><br />&#125;</span></span><br /><br /><span class="Fn">fn <span class="FnName">makeGame</span><span class="Params">()</span> <span class="Typ">Game</span> <span class="Block">&#123;<br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">bases</span></span> <span class="TplArgs"><span class="Typ">List</span>&lt;<span class="Typ">Base</span>&gt;</span></span> = <span class="Lookup">...</span>;</span><br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">ships</span></span></span> = <span class="Call"><span class="CallLookup">List</span>(<br />    <span class="Call"><span class="CallLookup">Ship</span>(<span class="Str">"Serenity"</span>, <span class="Lend">&<span class="MemberAccess"><span class="Lookup">bases</span>.<span class="Lookup">0</span></span></span>)</span>,<br />    <span class="Call"><span class="CallLookup">Ship</span>(<span class="Str">"Raza"</span>, <span class="Lend">&<span class="MemberAccess"><span class="Lookup">bases</span>.<span class="Lookup">1</span></span></span>)</span>)</span>;</span><br />  <span class="Ret">ret <span class="Call"><span class="CallLookup">Game</span>(<span class="Lookup">bases</span>, <span class="Lookup">ships</span>)</span>;</span><br />&#125;</span></span><br /><br /><span class="Fn">fn <span class="FnName">main</span><span class="Params">()</span> <span class="Block">&#123;<br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">mutex</span></span></span> = <span class="Call"><span class="CallLookup">Mutex</span>(<span class="Lend">'a <span class="Call"><span class="CallLookup">makeGame</span>()</span></span>)</span>;</span><br /><br />  <span class="Comment">// Open for reading</span><br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">roLock</span></span></span> = <span class="Call"><span class="Lookup">mutex</span>.<span class="CallLookup">rlock</span>()</span>;</span><br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">roGame</span></span></span> = <span class="Lend">&<span class="MemberAccess"><span class="Lookup">lock</span>.<span class="Lookup">root</span></span></span>;</span><br />  <span class="Call"><span class="CallLookup">println</span>(<span class="MemberAccess"><span class="MemberAccess"><span class="MemberAccess"><span class="Lookup">roGame</span>.<span class="Lookup">ships</span>.0.name</span><span class="Lookup"></span></span><span class="Lookup"></span></span>)</span>;<br />  <span class="Call"><span class="CallLookup">drop</span>(<span class="Lookup">roLock</span>)</span>;<br /><br />  <span class="Comment">// Open for writing</span><br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">rwLock</span></span></span> = <span class="Call"><span class="Lookup">mutex</span>.<span class="CallLookup">rwlock</span>()</span>;</span><br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">rwGame</span></span></span> = <span class="Lend">&<span class="MemberAccess"><span class="Lookup">lock</span>.<span class="Lookup">root</span></span></span>;</span><br />  <span class="Mut">mut <span class="MemberAccess"><span class="MemberAccess"><span class="MemberAccess"><span class="Lookup">rwGame</span>.<span class="Lookup">ships</span>.0.from</span><span class="Lookup"></span></span><span class="Lookup"></span></span> =<br />    <span class="Lend">&<span class="MemberAccess"><span class="MemberAccess"><span class="Lookup">rwGame</span>.<span class="Lookup">bases</span>.0</span><span class="Lookup"></span></span></span></span>;<br />  <span class="Call"><span class="CallLookup">drop</span>(<span class="Lookup">rwLock</span>)</span>;<span class="W"></span><br />&#125;</span></span><br /></span>
                    </Snippet>
                  </div>
                </div>

                <a name="hierarchical"></a>
                <h3 className={ns()}>Regions are Hierarchical</h3>

                <div className={ns("content cozy")}>
                  One region cannot "open" another to gain access to it. Rather, we make a new region that has access to them both.
                </div>

                <div className={ns("content cozy")}>
                  Even in the above example, when we opened the mutex (using {incode("rlock")} or {incode("rwlock")}, we were creating a temporary new region.
                </div>

                <a name="transmigrating"></a>
                <h3 className={ns()}>Moving Objects Across Regions</h3>

                <div className={ns("content cozy")}>
                  We can move an object to another region by putting the destination region's lifetime annotation ({incode("'a")}) in front of the data.
                </div>

                <div className={ns("content cozy")}>
                  We call this <b>transmigrating</b>.
                </div>

                <div className={ns("content splitter cozy")}>
                  <div className={ns("half")}>
                    <div className={ns("content cozy")}>
                      Here we're transmigrating a Drawable from region {incode("'a")} to region {incode("'b")}.
                    </div>
                    <div className={ns("content cozy")}>
                      Notice how we put the destination region {incode("'b")} in front of the object {incode("baseInA")}.
                    </div>
                    <div className={ns("content cozy")}>
                      Transmigrating has a cost though: Vale must turn the object into a regioned object first!
                    </div>
                    <div className={ns("content cozy")}>
                      To turn an object into a regioned object, it must <b>secede</b>, which means it must sever any references between things it indirectly owns ("descendants"), and everything outside ("outsiders").
                    </div>
                    <div className={ns("content cozy")}>
                      Specifically, it:
                    </div>
                    <ul className={ns("content cozy")}>
                      <li>Nullifyies descendants' weak references to outsiders.</li>
                      <li>Nullifyies outsiders' weak references to descendants.</li>
                      <li>Halts on descendants' constraint references to outsiders.</li>
                      <li>Halts on outsiders' constraint references to descendants.</li>
                      <li>Copying any immutable descendants that are shared with outsiders.</li>
                    </ul>
                    <div className={ns("content cozy")}>
                      This can be costly. {this.noteAnchor("secedecost")}
                    </div>
                    <div className={ns("content cozy")}>
                      Luckily, we can avoid this cost!
                    </div>
                  </div>
                  <div className={ns("half")}>
                    <Snippet>
{/*
struct Vec2 { x Float; y Float; }
// Represents a quadratic curve
struct Curve {
  origin Vec2;
  scale Vec2;
}
fn getYForX(curve &Curve, x Float) {
  origin.y + scale.y * pow(
    x * scale.x + origin.x, 2)
}

struct Drawable {
  segments List<Vec2>;
}
fn segmentify(curve &Curve) Drawable {
  results = List<Vec2>();
  each range(0, 10) (x){
    y = curve.getYForX(x);
    results.add(Vec2(x, y));
  }
  ret Drawable(results);
}

fn segmentifyAndSend<'a, 'b>(
    curve 'a &Curve,
    drawables 'b &List<Drawable>) {
  // Assembles Drawable
  drawableInA = segmentify(curve);

  // Transmigrate it to region 'b
  drawableInB = 'b drawableInA;

  // Can now add it to drawables
  drawables.add(drawableInB);
}
*/}
<span class="Prog"><span class="Struct">struct <span class="StructName">Vec2</span> <span class="Membs">&#123; <span class="Memb"><span class="MembName">x</span> <span class="Typ">Float</span>;</span> <span class="Memb"><span class="MembName">y</span> <span class="Typ">Float</span>;</span> &#125;</span></span><br /><span class="Comment">// Represents a quadratic curve</span><br /><span class="Struct">struct <span class="StructName">Curve</span> <span class="Membs">&#123;<br />  <span class="Memb"><span class="MembName">origin</span> <span class="Typ">Vec2</span>;</span><br />  <span class="Memb"><span class="MembName">scale</span> <span class="Typ">Vec2</span>;</span><br />&#125;</span></span><br /><span class="Fn">fn <span class="FnName">getYForX</span><span class="Params">(<span class="Pat"><span class="Capture"><span class="CaptureName">curve</span></span> <span class="Ownership">&<span class="Typ">Curve</span></span></span>, <span class="Pat"><span class="Capture"><span class="CaptureName">x</span></span> <span class="Typ">Float</span></span>)</span> <span class="Block">&#123;<br />  <span class="Call"><span class="MemberAccess"><span class="Lookup">origin</span>.<span class="Lookup">y</span></span> <span class="CallLookup">+</span> <span class="Call"><span class="MemberAccess"><span class="Lookup">scale</span>.<span class="Lookup">y</span></span> <span class="CallLookup">*</span> <span class="Call"><span class="CallLookup">pow</span>(<br />    <span class="Call"><span class="Call"><span class="Lookup">x</span> <span class="CallLookup">*</span> <span class="MemberAccess"><span class="Lookup">scale</span>.<span class="Lookup">x</span></span></span> <span class="CallLookup">+</span> <span class="MemberAccess"><span class="Lookup">origin</span>.<span class="Lookup">x</span></span></span>, <span class="Num">2</span>)</span></span></span><br />&#125;</span></span><br /><br /><span class="Struct">struct <span class="StructName">Drawable</span> <span class="Membs">&#123;<br />  <span class="Memb"><span class="MembName">segments</span> <span class="TplArgs"><span class="Typ">List</span>&lt;<span class="Typ">Vec2</span>&gt;</span>;</span><br />&#125;</span></span><br /><span class="Fn">fn <span class="FnName">segmentify</span><span class="Params">(<span class="Pat"><span class="Capture"><span class="CaptureName">curve</span></span> <span class="Ownership">&<span class="Typ">Curve</span></span></span>)</span> <span class="Typ">Drawable</span> <span class="Block">&#123;<br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">results</span></span></span> = <span class="Call"><span class="CallLookup">List</span><span class="TplArgs">&lt;<span class="Typ">Vec2</span>&gt;</span>()</span>;</span><br />  <span class="Call"><span class="CallLookup">each</span> <span class="Call"><span class="CallLookup">range</span>(<span class="Num">0</span>, <span class="Num">10</span>)</span> <span class="Lambda"><span class="Params">(<span class="Pat"><span class="Capture"><span class="CaptureName">x</span></span></span>)</span><span class="Block">&#123;<br />    <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">y</span></span></span> = <span class="Call"><span class="Lookup">curve</span>.<span class="CallLookup">getYForX</span>(<span class="Lookup">x</span>)</span>;</span><br />    <span class="Call"><span class="Lookup">results</span>.<span class="CallLookup">add</span>(<span class="Call"><span class="CallLookup">Vec2</span>(<span class="Lookup">x</span>, <span class="Lookup">y</span>)</span>)</span>;<span class="W"></span><br />  &#125;</span></span></span><br />  <span class="Ret">ret <span class="Call"><span class="CallLookup">Drawable</span>(<span class="Lookup">results</span>)</span>;</span><br />&#125;</span></span><br /><br /><span class="Fn">fn <span class="FnName">segmentifyAndSend</span><span class="IdentRunes">&lt;<span class="IdentRune">'a</span>, <span class="IdentRune">'b</span>&gt;</span><span class="Params">(<br />    <span class="Pat"><span class="Capture"><span class="CaptureName">curve</span></span> <span class="Ownership">'a &<span class="Typ">Curve</span></span></span>,<br />    <span class="Pat"><span class="Capture"><span class="CaptureName">drawables</span></span> <span class="Ownership">'b &<span class="TplArgs"><span class="Typ">List</span>&lt;<span class="Typ">Drawable</span>&gt;</span></span></span>)</span> <span class="Block">&#123;<br />  <span class="Comment">// Assembles Drawable</span><br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">drawableInA</span></span></span> = <span class="Call"><span class="CallLookup">segmentify</span>(<span class="Lookup">curve</span>)</span>;</span><br /><br />  <span class="Comment">// Transmigrate it to region 'b</span><br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">drawableInB</span></span></span> = <span class="Lend">'b <span class="Lookup">drawableInA</span></span>;</span><br /><br />  <span class="Comment">// Can now add it to drawables</span><br />  <span class="Call"><span class="Lookup">drawables</span>.<span class="CallLookup">add</span>(<span class="Lookup">drawableInB</span>)</span>;<span class="W"></span><br />&#125;</span></span><br /></span>
                    </Snippet>
                  </div>
                </div>

                <a name="avoidsecedecosts"></a>
                <h5 className={ns()}>Avoiding Secede Costs</h5>

                <div className={ns("content cozy")}>
                  There are three ways to avoid secede costs:
                </div>
                <ul className={ns("content cozy")}>
                  <li>Use atomic immutables, which aren't copied when seceding.</li>
                  <li>Avoid the move. Functions can operate on two regions at once, so we might not need to combine data into one region.</li>
                  <li>Restructure the code such that the object is already a regioned object, so it doesn't have to secede.</li>
                </ul>

                <div className={ns("content splitter cozy")}>
                  <div className={ns("half")}>
                    <div className={ns("content cozy")}>
                      To illustrate that last point, we can change {incode("segmentify")}.
                    </div>
                    <div className={ns("content cozy")}>
                      Notice how {incode("segmentify")} now accepts its parameter from a different region {incode("'a")}.
                    </div>
                    <div className={ns("content cozy")}>
                      Because of this, {incode("segmentify")} gets its own region. It's making its {incode("Vec2", "s")} and {incode("Drawable")} in this new region.
                    </div>
                    <div className={ns("content cozy")}>
                      Because the return isn't {incode("'a")}, the compiler knows that Drawable is a regioned object.
                    </div>
                    <div className={ns("content cozy")}>
                      Now, {incode("segmentifyAndSend")} doesn't cause a secede!
                    </div>
                  </div>
                  <div className={ns("half")}>
                    <Snippet>
{/*
fn segmentify<'a>(
    curve 'a &Curve) Drawable {
  results = List<Vec2>();
  each range(0, 10) (x){
    y = curve.getYForX(x);
    results.add(Vec2(x, y));
  }
  ret Drawable(results);
}

fn segmentifyAndSend<'a, 'b>(
    curve 'a &Curve,
    drawables 'b &List<Drawable>) {
  // Assembles Drawable
  drawableInA = segmentify(curve);

  // No secede, because drawableInA
  // is a regioned object.
  drawableInB = 'b drawableInA;

  // Can now add it to drawables
  drawables.add(drawableInB);
}
*/}
<span class="Prog"><span class="Fn">fn <span class="FnName">segmentify</span><span class="IdentRunes">&lt;<span class="IdentRune">'a</span>&gt;</span><span class="Params">(<br />    <span class="Pat"><span class="Capture"><span class="CaptureName">curve</span></span> <span class="Ownership">'a &<span class="Typ">Curve</span></span></span>)</span> <span class="Typ">Drawable</span> <span class="Block">&#123;<br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">results</span></span></span> = <span class="Call"><span class="CallLookup">List</span><span class="TplArgs">&lt;<span class="Typ">Vec2</span>&gt;</span>()</span>;</span><br />  <span class="Call"><span class="CallLookup">each</span> <span class="Call"><span class="CallLookup">range</span>(<span class="Num">0</span>, <span class="Num">10</span>)</span> <span class="Lambda"><span class="Params">(<span class="Pat"><span class="Capture"><span class="CaptureName">x</span></span></span>)</span><span class="Block">&#123;<br />    <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">y</span></span></span> = <span class="Call"><span class="Lookup">curve</span>.<span class="CallLookup">getYForX</span>(<span class="Lookup">x</span>)</span>;</span><br />    <span class="Call"><span class="Lookup">results</span>.<span class="CallLookup">add</span>(<span class="Call"><span class="CallLookup">Vec2</span>(<span class="Lookup">x</span>, <span class="Lookup">y</span>)</span>)</span>;<span class="W"></span><br />  &#125;</span></span></span><br />  <span class="Ret">ret <span class="Call"><span class="CallLookup">Drawable</span>(<span class="Lookup">results</span>)</span>;</span><br />&#125;</span></span><br /><br /><span class="Fn">fn <span class="FnName">segmentifyAndSend</span><span class="IdentRunes">&lt;<span class="IdentRune">'a</span>, <span class="IdentRune">'b</span>&gt;</span><span class="Params">(<br />    <span class="Pat"><span class="Capture"><span class="CaptureName">curve</span></span> <span class="Ownership">'a &<span class="Typ">Curve</span></span></span>,<br />    <span class="Pat"><span class="Capture"><span class="CaptureName">drawables</span></span> <span class="Ownership">'b &<span class="TplArgs"><span class="Typ">List</span>&lt;<span class="Typ">Drawable</span>&gt;</span></span></span>)</span> <span class="Block">&#123;<br />  <span class="Comment">// Assembles Drawable</span><br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">drawableInA</span></span></span> = <span class="Call"><span class="CallLookup">segmentify</span>(<span class="Lookup">curve</span>)</span>;</span><br /><br />  <span class="Comment">// No secede, because drawableInA</span><br />  <span class="Comment">// is a regioned object.</span><br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">drawableInB</span></span></span> = <span class="Lend">'b <span class="Lookup">drawableInA</span></span>;</span><br /><br />  <span class="Comment">// Can now add it to drawables</span><br />  <span class="Call"><span class="Lookup">drawables</span>.<span class="CallLookup">add</span>(<span class="Lookup">drawableInB</span>)</span>;<span class="W"></span><br />&#125;</span></span><br /></span>
                    </Snippet>
                  </div>
                </div>

                <a name="bumpcalling"></a>
                <h3 className={ns()}>Bump Calling</h3>

                <div className={ns("content cozy")}>
                  With the <b>bump</b> keyword on a region declaration, all the region's allocations will use a bump allocator. This is especially useful for calling pure functions which have short lifetimes. {this.noteAnchor("bumptba")}
                </div>

                <a name="inpractice"></a>
                <h3 className={ns()}>Regions in Practice</h3>

                <div className={ns("content cozy")}>
                  Regions are useful in many situations:
                </div>
                <ul className={ns("content cozy")}>
                  <li>We can speed up the program by making the main region read-only.</li>
                  <li>A mutex shares a regioned object between multiple threads.</li>
                  <li>We send regioned objects between threads, through channels.</li>
                  <li>We can use a mutex to drastically speed up a single thread, by only {incode("rwlock", "ing")} for modification, and {incode("rlock", "ing")} for fast access everywhere else.</li>
                </ul>

              </div>

            </div>
            <div className={ns("margin")}>

              <div className={ns("toc-container")}>
                <ReferenceTOC page="regions"/>
                <div className={ns("notes-header")}>
                  <NotesHeader update={this.updateNotesHeaderRect}/>
                </div>
              </div>

              <Note name="notyet" customIcon="notyet" iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon}>
                Regions are planned for v0.2 and v0.3, see <a href="/roadmap">Roadmap</a>!
              </Note>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="optimize">
                Making constraint references and weak references into read-only regions are completely free; the compiler optimizes them into raw pointers.
              </Note>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="bumptba">
                More explanation soon, stay tuned or swing by our discord for more information!
              </Note>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="secedecost">
                The cost depends on various factors:
                <ul>
                  <li>Faster if the objects are already in the CPU cache.</li>
                  <li>Faster for structs, slower for interfaces.</li>
                  <li>Slower for immutables that are shared.</li>
                  <li>Free for atomic immutables.</li>
                </ul>
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
