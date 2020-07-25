import React from 'react';
import ReactDOM from 'react-dom';
import BlogHeader from './BlogHeader.jsx';
import Footer from '../components/Footer.jsx';
import {NoteManager, Note, NoteAnchor, NotesHeader} from '../components/Note.jsx';
import '../components/Tripage.css';
import '../common.css'
import './Blog.css'
import Snippet from '../components/Snippet.jsx';
import claspsvg from './clasp.svg';

const ns = (classes) => "c-blog m-tripage " + (classes || "");

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

  componentDidMount() {
    document.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightBlock(block);
    });
  }

  noteAnchor(anchorName) {
    return <NoteAnchor iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteAnchorPosition} name={anchorName}/>;
  }

  render() {
    return (
      <div className={ns("root")}>
        <BlogHeader small={true} />

        <div className={ns("page")}>
          <div className={ns("columns")}>

            <div className={ns("left")}>

              <div className={ns("main")}>

                <h1 className={ns("noline cozy")} style={{marginTop: "8px"}}>Zero-Cost References with Regions in Vale</h1>
                <div className={ns("subtitle content cozy")}>Watch regions eliminate reference-counting overhead!</div>

                <div className={ns("content")} style={{marginBottom: "32px"}}><span className={ns("date")}>July 26th, 2020</span> <span className={ns("author")}>&nbsp;&mdash;&nbsp; Evan Ovadia</span></div>

                <div className={ns("content")}>
                  Vale is rapidly approaching v0.1, and now that the foundations (generics, interfaces, closures) are complete, we can tell the world what's in store for Vale.
                </div>

                <div className={ns("content cozy")}>
                  Vale aims to be as fast as C++, as safe as Java, and easy to learn. Using a novel combination of single ownership, reference counting, region borrow checking, and an arsenal of other optimizations, Vale can reduce ref-counting overhead lower than ever before.
                </div>

                <div className={ns("content cozy")}>
                  Any safe memory management strategy has run-time overhead. Garbage collected languages (Java, Javascript) must "stop the world" for milliseconds at a time, {this.noteAnchor("630")} and reference counting languages (Python, Swift, ObjC, some C++) pay costs in incrementing and decrementing ref counts. Even borrow checking languages (Rust, Cyclone) pay RC or Vec costs, when the borrow checker forces us into them; memory safety has a run-time cost, no matter what language you're in. {this.noteAnchor("915")}
                </div>

                <div className={ns("content cozy")}>
                  Vale is no exception; its Normal Mode and Resilient Mode guarantee memory safety, but have some minor overhead at run-time. {this.noteAnchor("1138")} However, Vale's <b>region borrow checking, compile time ref-counting, constraint references, memory pools, and bump allocation</b> work together to drastically reduce the overhead, giving us speed with perfect memory safety.
                </div>

                <div className={ns("content cozy")}>
                  v0.2 will be the regions release, where add support for all of these features. We're still designing it and seeing if it will work! Let us know if you have any questions or ideas, or if you see any opportunities or mistakes!
                </div>

                



                <a name="referencecounting"></a>
                <h2 className={ns()}>Reference Counting</h2>

                <div className={ns("content cozy")}>
                  Vale uses reference counting to guarantee safety: whenever we make a new reference to an object, we must increment that object's <b>reference count</b>, {this.noteAnchor("930")} and when that reference goes away, we must decrement it again. We can't deallocate an object until its reference count is zero.
                </div>
                <div className={ns("content cozy")}>
                  The first optimization that will help with this is called <b>compile-time reference counting</b>. It was invented by Wouter van Oortmerssen for Lobster, and it uses Rust-inspired lifetime analysis to eliminate 95% of increments and decrements at compile time, leaving only 5% to happen at run-time. {this.noteAnchor("627")}
                </div>
                <div className={ns("content cozy")}>
                  Now let's look at the overhead of the remaining 5%. Reference counting has what is commonly {this.noteAnchor("1020")} known as the <b>three vexing fears: cycles, atomicity, mispredictions, and cache-misses.</b> {this.noteAnchor("608")} Vale solves all of them.
                </div>



                <a name="cycles"></a>
                <h3 className={ns()}>Cycles</h3>

                <div className={ns("content cozy")}>
                  The first weakness of RC is that it can form cycles, causing memory leaks. Vale doesn't have this problem because every object has one owning reference, and it enforces that no other references are alive when we let go of the owning reference.
                </div>



                <a name="atomicity"></a>
                <h3 className={ns()}>Atomicity</h3>

                <div className={ns("content cozy")}>
                  When two threads increment or decrement the same object's reference count, they can interfere with each other. There are various ways to avoid this:
                </div>

                <ul className={ns("content cozy")}>
                  <li className={ns()}>In Python, the incrementing/decrementing is non-atomic, but that means only one thread can run at a given time.</li>
                  <li className={ns()}>In Swift, we can have multiple threads, but it means every reference count is atomic, which is very slow.</li>
                </ul>

                <div className={ns("content cozy")}>
                  Christian Aichinger tried making Python's ref-counting atomic, and it resulted in a <a href="https://greek0.net/blog/2015/05/23/python_atomic_refcounting_slowdown/">23% slowdown</a>. This is probably the main reason Swift is slower than C. {this.noteAnchor("939")}
                </div>

                <div className={ns("content cozy")}>
                  In Vale, an object can only be modified by one thread at a time, so a program can have threads and still use non-atomic ref-counting.
                </div>



                <a name="branchmispredictions"></a>
                <h3 className={ns()}>Branch Mispredictions</h3>

                <div className={ns("content cozy")}>
                  RC can also suffer from branch misprediction, where the CPU can't predict whether we'll deallocate the object or not. Vale allows the CPU to perfectly predict: letting go of constraint references will never deallocate the object, and letting go of owning references will always deallocate it.
                </div>


                <a name="cachemisses"></a>
                <h3 className={ns()}>Cache Misses</h3>

                <div className={ns("content cozy")}>
                  A CPU can non-atomically increment or decrement an integer very quickly; instructions are basically free on modern CPUs. The real bottleneck is in how far the data is: if it's been recently accessed, it's in the nearby cache (the data is "hot"). Otherwise the CPU will "cache miss" and have to bring it in all the way from RAM (the data is "cold").
                </div>

                <div className={ns("content cozy")}>
                  So, even if we make our ref-counting non-atomic and optimize most of it away, any remaining ref-counts on cold data will still incur cache-miss costs.
                </div>

                <div className={ns("content cozy")}>
                  Vale can avoid ref-counting on cold data by using <b>read-only regions</b>.
                </div>


                <a name="readonlyregions"></a>
                <h2 className={ns()}>Read-Only Regions</h2>

                <div className={ns("content cozy")}>
                  In Vale, we can split our memory into various regions. We can lock a region, and all references into it are <b>completely free;</b> we don't have to increment or decrement its objects' ref counts.
                </div>

                <div className={ns("content cozy")}>
                  We can do this with <b>implicit locking</b> and <b>explicit locking.</b>
                </div>


                <a name="implicitlocking"></a>
                <h3 className={ns()}>Implicit Locking</h3>

                <div className={ns("content cozy")}>
                  Programs often have "pure" functions, where a function reads the outside world through its parameters, does a bit of calculation (perhaps modifying some of its own locals along the way), and then returns a result, all without modifying the outside world. In Vale, we can annotate a function with the <b>pure</b> keyword to make the compiler enforce this. This is a common design pattern, and leads to much more maintainable and testable code.
                </div>

                <div className={ns("content cozy")}>
                  If we add <b>region annotations</b> to our pure function, Vale will <b>implicitly lock</b> all existing memory, thus making references to any existing memory <b>completely free;</b> we don't have to increment or decrement anything because all these references are temporary anyway. Below, we use region annotations (highlighted) to tell the compiler which references point to the outside world.
                </div>

                <div className={ns("content cozy")}>
                  Let's see it in action! Let's say we have a turn-based game, which runs in Unity. Whenever the player unit acts, each of the enemy units takes a turn to act too.
                </div>


                <div className={ns("content splitter")}>
                  <div className={ns("half")}>
                    <div className={ns("content cozy")}>
                      Each enemy unit figures out what it wants to do most.
                    </div>
                    <div className={ns("content cozy")}>
                      To do this, each unit looks at all the things it can do (it's {incode("abilities")}, such as Idle, Wander, Chase, Attack), and asks each ability, "what do you want?".
                    </div>
                    <div className={ns("content cozy")}>
                      A {incode("Desire")} describes what the unit could do, and how much it wants to do that.
                    </div>
                    <div className={ns("content cozy")}>
                      When we have all the {incode("Desire", "s")}, we sort them to figure out what the strongest one is, and enact it.
                    </div>
                  </div>
                  <div className={ns("half")}>
                    <Snippet header="Vale">
{/*
fn gameLoop(world &World) {
  each (world.enemyUnits) (unit){
    desire =
      unit.strongestDesire(world);
    unit.enactDesire(desire);
  }
}

pure «111» fn strongestDesire<'r ro, 'i>
    (this 'r &Unit) Desire<'r, 'i> «956» {
  desires =
    this.abilities*.getDesire(); «1136»
  desires.sort(
    { _.strength() > _.strength() }); «911»
  ret desires[0];
}
*/}

<span class="Prog"><span class="Fn">fn <span class="FnName">gameLoop</span><span class="Params">(<span class="Pat"><span class="Capture"><span class="CaptureName">world</span></span> <span class="Ownership">&<span class="Typ">World</span></span></span>)</span> <span class="Block">&#123;<br />  <span class="Call"><span class="CallLookup">each</span> (<span class="MemberAccess"><span class="Lookup">world</span><span class="MemberAccess">.</span><span class="Lookup">enemyUnits</span></span>) <span class="Lambda"><span class="Params">(<span class="Pat"><span class="Capture"><span class="CaptureName">unit</span></span></span>)</span><span class="Block">&#123;<br />    <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">desire</span></span></span> =<br />      <span class="Call"><span class="Lookup">unit</span><span class="MemberAccess">.</span><span class="CallLookup">strongestDesire</span>(<span class="Lookup">world</span>)</span>;</span><br />    <span class="Call"><span class="Lookup">unit</span><span class="MemberAccess">.</span><span class="CallLookup">enactDesire</span>(<span class="Lookup">desire</span>)</span>;<br />  &#125;</span></span></span><br />&#125;</span></span><br /><br /><span class="Fn"><span class="Pure">pure</span> <span class="Comment">{this.noteAnchor("111")}</span> fn <span class="FnName">strongestDesire</span><span class="IdentRunes">&lt;<span class="IdentRune">'r ro</span>, <span class="IdentRune">'i</span>&gt;</span><br />    <span class="Params">(<span class="Pat"><span class="Capture"><span class="CaptureName">this</span></span> 'r <span class="Ownership">&<span class="Typ">Unit</span></span></span>)</span> <span class="TplArgs"><span class="Typ">Desire</span>&lt;<span class="Typ">'r</span>, <span class="Typ">'i</span>&gt;</span> <span class="Comment">{this.noteAnchor("956")}</span> <span class="Block">&#123;<br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">desires</span></span></span> =<br />    <span class="Call"><span class="MemberAccess"><span class="Lookup">this</span><span class="MemberAccess">.</span><span class="Lookup">abilities</span></span><span class="MemberAccess">*.</span><span class="CallLookup">getDesire</span>()</span>;</span> <span class="Comment">{this.noteAnchor("1136")}</span><br />  <span class="Call"><span class="Lookup">desires</span><span class="MemberAccess">.</span><span class="CallLookup">sort</span>(<br />    <span class="Lambda"><span class="Block">&#123; <span class="Call"><span class="Call"><span class="MagicParam">_</span><span class="MemberAccess">.</span><span class="CallLookup">strength</span>()</span> <span class="CallLookup">&gt;</span> <span class="Call"><span class="MagicParam">_</span><span class="MemberAccess">.</span><span class="CallLookup">strength</span>()</span></span> &#125;</span></span>)</span>; <span class="Comment">{this.noteAnchor("911")}</span><br />  <span class="Ret">ret <span class="Call"><span class="Lookup">desires</span>[<span class="Num">0</span>]</span>;</span><br />&#125;</span></span><br /></span>


                    </Snippet>
                  </div>
                </div>



                <div className={ns("content splitter")}>
                  <div className={ns("half")}>
                    <div className={ns("content cozy")}>
                      To generate a desire, an ability will look at its unit and the world around it.
                    </div>
                    <div className={ns("content cozy")}>
                      For example, {incode("ChaseAbility", "'s")} {incode("getDesire")} function will look for the nearest unit, and return a very strong (70!) desire to chase it.
                    </div>
                    <div className={ns("content cozy")}>
                      This function doesn't change anything about itself or the unit or the world, it just reads them and does calculations.
                    </div>
                    <div className={ns("content cozy")}>
                      By adding the {incode("'r")} to {incode("strongestDesire", "'s")} {incode("this &Unit")}, we're telling the compiler that {incode("this")} will come from a region we call {incode("'r")}.
                    </div>
                    <div className={ns("content cozy")}>
                      There's no specific region whose name is {incode("'r")} (rather, {incode("'r")} is how we refer to whatever region contains {incode("this")}, so it's a generic parameter, hence the {incode("<'r ro>")}. The {incode("ro")} specifies that it's a read-only region, making all references into {incode("'r")} free.
                    </div>
                  </div>
                  <div className={ns("half")}>
                    <Snippet header="Vale">
{/*
struct ChaseDesire<'r ro, 'i> {
  impl IDesire;

  strength Int;
  victim 'r &Unit;
  path List<Location>;

  fn strength(&this impl IDesire) «1134»
  Int {
    ret this.strength;
  }
}

pure fn getDesire<'r ro, 'i>
  (this 'r &ChaseAbility impl IAbility)
Desire<'r, 'i> {
  unit = this.unit;
  world = unit.world;
  loc = unit.location;
  nearbyUnits =
    world.findNearbyUnits(loc);
  closest = nearbyUnits[0];
  closestLoc = closest.location;
  path =
    world.findPath(loc, closestLoc);
  ret ChaseDesire(70, closest, path);
}
*/}

<span class="Prog"><span class="Struct">struct <span class="StructName">ChaseDesire</span><span class="IdentRunes">&lt;<span class="IdentRune">'r ro</span>, <span class="IdentRune">'i</span>&gt;</span> <span class="Membs">&#123;<br />  <span class="Memb"><span class="MembName">impl</span> <span class="Typ">IDesire</span>;</span><br /><br />  <span class="Memb"><span class="MembName">strength</span> <span class="Typ">Int</span>;</span><br />  <span class="Memb"><span class="MembName">victim</span> 'r <span class="Ownership">&<span class="Typ">Unit</span></span>;</span><br />  <span class="Memb"><span class="MembName">path</span> <span class="TplArgs"><span class="Typ">List</span>&lt;<span class="Typ">Location</span>&gt;</span>;</span><br /><br />  <span class="Fn">fn <span class="FnName">strength</span><span class="Params">(<span class="Pat"><span class="Lend">&</span><span class="Capture"><span class="CaptureName">this</span></span> impl IDesire</span>)</span> <span class="Comment">{this.noteAnchor("1134")}</span><br />  <span class="Typ">Int</span> <span class="Block">&#123;<br />    <span class="Ret">ret <span class="MemberAccess"><span class="Lookup">this</span><span class="MemberAccess">.</span><span class="Lookup">strength</span></span>;</span><br />  &#125;</span></span><br />&#125;</span></span><br /><br /><span class="Fn"><span class="Pure">pure</span> fn <span class="FnName">getDesire</span><span class="IdentRunes">&lt;<span class="IdentRune">'r ro</span>, <span class="IdentRune">'i</span>&gt;</span><br />  <span class="Params">(<span class="Pat"><span class="Capture"><span class="CaptureName">this</span></span> 'r <span class="Ownership">&<span class="Typ">ChaseAbility</span></span> impl IAbility</span>)</span><br /><span class="TplArgs"><span class="Typ">Desire</span>&lt;<span class="Typ">'r</span>, <span class="Typ">'i</span>&gt;</span> <span class="Block">&#123;<br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">unit</span></span></span> = <span class="MemberAccess"><span class="Lookup">this</span><span class="MemberAccess">.</span><span class="Lookup">unit</span></span>;</span><br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">world</span></span></span> = <span class="MemberAccess"><span class="Lookup">unit</span><span class="MemberAccess">.</span><span class="Lookup">world</span></span>;</span><br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">loc</span></span></span> = <span class="MemberAccess"><span class="Lookup">unit</span><span class="MemberAccess">.</span><span class="Lookup">location</span></span>;</span><br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">nearbyUnits</span></span></span> =<br />    <span class="Call"><span class="Lookup">world</span><span class="MemberAccess">.</span><span class="CallLookup">findNearbyUnits</span>(<span class="Lookup">loc</span>)</span>;</span><br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">closest</span></span></span> = <span class="Call"><span class="Lookup">nearbyUnits</span>[<span class="Num">0</span>]</span>;</span><br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">closestLoc</span></span></span> = <span class="MemberAccess"><span class="Lookup">closest</span><span class="MemberAccess">.</span><span class="Lookup">location</span></span>;</span><br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">path</span></span></span> =<br />    <span class="Call"><span class="Lookup">world</span><span class="MemberAccess">.</span><span class="CallLookup">findPath</span>(<span class="Lookup">loc</span>, <span class="Lookup">closestLoc</span>)</span>;</span><br />  <span class="Ret">ret <span class="Call"><span class="CallLookup">ChaseDesire</span>(<span class="Num">70</span>, <span class="Lookup">closest</span>, <span class="Lookup">path</span>)</span>;</span><br />&#125;</span></span><br /></span>

                    </Snippet>
                  </div>
                </div>


                <div className={ns("content cozy")}>
                  getDesire is a heavy, read-only operation. It doesn't change anything, but it does breadth-first searches, A* pathfinding, and a bunch of other algorithms, which make (and then let go of) a lot of references into the World.
                </div>

                <div className={ns("content cozy")}>
                  Without the region annotations, every time we make (or let go of) a reference into the unit or anything else in the world, we increment and decrement a ref-count. Worse, the World would be cold, because Unity's rendering process has probably rendered a few hundred frames since the last turn, and has long since wiped our World from the cache.
                </div>

                <div className={ns("content cozy")}>
                  With the region annotations, the compiler knows that only the things inside the {incode("'i")} region can change, and nothing in the {incode("'r")} region will change, making references into {incode("'r")} completely free. <b>All of our references to this cold data, which would have incurred RC costs, are now free.</b>
                </div>

                <div className={ns("content cozy")}>
                  There is a caveat: When we return a reference from the implicitly locked call, it increments the ref-count in the object it's pointing to. In the example, ChaseDesire.victim will increment the Unit it's pointing at, as it's returned. {this.noteAnchor("1152")} {this.noteAnchor("1109")} One can often use explicit locking to avoid this kind of overhead.
                </div>



                <a name="explicitlocking"></a>
                <h3 className={ns()}>Explicit Locking</h3>

                <div className={ns("content cozy")}>
                  Implicit locking locked all existing memory, and made a small new region called 'i which we could modify. There's a more precise way to manage regions: mutexes! {this.noteAnchor("152")}
                </div>

                <div className={ns("content cozy")}>
                  The Vale compiler itself has a great example of when we'd want explicit locking. Six transformation stages translate the source code into intermediate ASTs {this.noteAnchor("334")} and eventually into an executable binary. {this.noteAnchor("1050")} Each stage takes in the previous AST, read-only, and constructs the next AST.
                </div>

                <div className={ns("content cozy")}>
                  One of those is the "Templar" stage, which reads the "astrouts" AST and builds the "temputs" AST. We can put the astrouts in a Mutex, and the temputs in another Mutex. The Templar gets read-only access to the astrouts mutex, while it uses it's read-write access to the temputs mutex to build it up.
                </div>

                <div className={ns("content splitter")}>
                  <div className={ns("half")}>
                    <div className={ns("content cozy")}>
                      Here, the {incode("templar")} function takes in the {incode("astroutsMutex")}.
                    </div>
                    <div className={ns("content cozy")}>
                      The {incode("astroutsMutex")} starts closed, so we call {incode("openro")} to open it for read-only access.
                    </div>
                    <div className={ns("content cozy")}>
                      We then create a new Mutex containing an empty Temputs. We immediately open it in read-write mode.
                    </div>
                    <div className={ns("content cozy")}>
                      We give both the temputs and a function from the astrouts to translateFunction, so it can make a translated function and add it to temputs.
                    </div>
                    <div className={ns("content cozy")}>
                      At the end of {incode("templar")}, the locks are dropped, automatically closing the mutexes, and we return the now-closed {incode("temputsMutex")}.
                    </div>

                    <div className={ns("content cozy")}>
                      With our {incode("Mutexes")} and region annotations, the compiler can give us free, zero-cost access to everything in the astrouts.
                    </div>

                  </div>
                  <div className={ns("half")}>

                    <Snippet header="Vale">
{/*
fn templar(
    astroutsMutex &!Mutex<Astrouts>) {
  astroutsLock = astroutsMutex.openro();
  astrouts = astroutsLock.contents;

  temputsMutex = Mutex({ Temputs() }); 
  temputsLock =
    temputsMutex.openrw(); «345»
  temputs = temputsLock.contents;

  translateFunction(
      astrouts.functions[0], &temputs);

  ...;

  ret temputsMutex;
}

fn translateFunction<'a ro, 't>(
    func 'a &AFunction,
    temputs 't &!Temputs) TFunction {
  // Read func, add things to temputs.
  ...;
}
*/}

<span class="Prog"><span class="Fn">fn <span class="FnName">templar</span><span class="Params">(<br />    <span class="Pat"><span class="Capture"><span class="CaptureName">astroutsMutex</span></span> <span class="Ownership">&<span class="Permission">!<span class="TplArgs"><span class="Typ">Mutex</span>&lt;<span class="Typ">Astrouts</span>&gt;</span></span></span></span>)</span> <span class="Block">&#123;<br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">astroutsLock</span></span></span> = <span class="Call"><span class="Lookup">astroutsMutex</span><span class="MemberAccess">.</span><span class="CallLookup">openro</span>()</span>;</span><br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">astrouts</span></span></span> = <span class="MemberAccess"><span class="Lookup">astroutsLock</span><span class="MemberAccess">.</span><span class="Lookup">contents</span></span>;</span><br /><br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">temputsMutex</span></span></span> = <span class="Call"><span class="CallLookup">Mutex</span>(<span class="Lambda"><span class="Block">&#123; <span class="Call"><span class="CallLookup">Temputs</span>()</span> &#125;</span></span>)</span>;</span> <br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">temputsLock</span></span></span> =<br />    <span class="Call"><span class="Lookup">temputsMutex</span><span class="MemberAccess">.</span><span class="CallLookup">openrw</span>()</span>;</span> <span class="Comment">{this.noteAnchor("345")}</span><br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">temputs</span></span></span> = <span class="MemberAccess"><span class="Lookup">temputsLock</span><span class="MemberAccess">.</span><span class="Lookup">contents</span></span>;</span><br /><br />  <span class="Call"><span class="CallLookup">translateFunction</span>(<br />      <span class="Call"><span class="MemberAccess"><span class="Lookup">astrouts</span><span class="MemberAccess">.</span><span class="Lookup">functions</span></span>[<span class="Num">0</span>]</span>, <span class="Lend">&<span class="Lookup">temputs</span></span>)</span>;<br /><br />  <span class="Lookup">...</span>;<br /><br />  <span class="Ret">ret <span class="Lookup">temputsMutex</span>;</span><br />&#125;</span></span><br /><br /><span class="Fn">fn <span class="FnName">translateFunction</span><span class="IdentRunes">&lt;<span class="IdentRune">'a ro</span>, <span class="IdentRune">'t</span>&gt;</span><span class="Params">(<br />    <span class="Pat"><span class="Capture"><span class="CaptureName">func</span></span> 'a <span class="Ownership">&<span class="Typ">AFunction</span></span></span>,<br />    <span class="Pat"><span class="Capture"><span class="CaptureName">temputs</span></span> 't <span class="Ownership">&<span class="Permission">!<span class="Typ">Temputs</span></span></span></span>)</span> <span class="Typ">TFunction</span> <span class="Block">&#123;<br />  <span class="Comment">// Read func, add things to temputs.</span><br />  <span class="Lookup">...</span>;<br />&#125;</span></span><br /></span>

                    </Snippet>
                  </div>
                </div>

                <div className={ns("content cozy")}>
                  We still increment and decrement the ref-counts of objects inside 'i, but we just made those objects, so they'll likely be hot in the cache.
                </div>

                <div className={ns("content cozy")}>
                  We can take this even further: we can combine explicit locking and implicit locking, and even do implicit locks from within implicit locks. By layering these locking techniques, we can compound our benefits and speed up our program even more!
                </div>

                <a name="regionmemorystrategy"></a>
                <h2 className={ns()}>Region Memory Strategy</h2>

                <div className={ns("content cozy")}>
                  In our example above, references into {incode("'r")} were completely free. And references into {incode("'i")} were probably hot in the cache, making its reference counting very fast.
                </div>
                <div className={ns("content cozy")}>
                  How much more can we do? <b>Much more.</b> This is where things get a bit crazy.
                </div>

                <div className={ns("content cozy")}>
                  Vale's <b>pool and arena allocation</b> can eliminate the ref-counting overhead in {incode("'i")} too, and <b>lets eliminate its malloc and free overhead as well, while we're at it.</b>
                </div>
                <div className={ns("content cozy")}>
                  The default memory management strategy for a region is to use the <b>heap</b>, which uses malloc and free under the hood.
                </div>
                <div className={ns("content cozy")}>
                  We can make it so a certain region uses <b>pool</b> allocation, which is <i>much</i> faster. Pool allocation will cache all freed structs for future allocations of the same type. {this.noteAnchor("452")}
                </div>

                <div className={ns("content cozy")}>
                  Functions can also use <b>arena</b> allocation, where we instead use a large "slab" of memory, and we keep allocating from the next part of it. Whenever it runs out, Vale allocates another slab of memory. {this.noteAnchor("754")} This can push performance even faster, though one should be careful when using this, as it could destroy the heap. Fun fact: the pool allocator is built on top of the arena allocator, under the hood.
                </div>

                <div className={ns("content cozy")}>
                  Pool allocation's benefits:
                </div>

                <ul className={ns("content")}>
                  <li className={ns()}>It's <i>extremely</i> fast, because instead of an expensive call to malloc, allocation is simply incrementing the "bump pointer" in the underlying slab.</li>
                  <li className={ns()}>It's very cache-friendly, because all of our allocated objects are right next to each other.</li>
                  <li className={ns()}>In release mode, we can <i>completely</i> optimize out all constraint reference counting to references inside the pool region, with no loss to safety. {this.noteAnchor("743")}</li>
                  <li className={ns()}>We pay no cost to deallocate, because we deallocate it all at once at the end of the function!</li>
                </ul>

                <div className={ns("content cozy")}>
                  Pool allocation's costs:
                </div>

                <ul className={ns("content")}>
                  <li className={ns()}>Since we cache these structs, our memory usage could be higher. For example, if we make 120 Spaceships and let go of 20 of them, those 20 will still be using up memory. That's why pools are useful for the span of certain functions, and not the entire program.</li>
                  <li className={ns()}>Moving objects between regions (e.g. when returning from an implicit lock function that uses a pool region) requires copying those objects. {this.noteAnchor("752")}</li>
                </ul>

                <div className={ns("content cozy")}>
                  Used well, a pool allocator can drastically speed up a region.
                </div>


                <div className={ns("content splitter")}>
                  <div className={ns("half")}>
                    <div className={ns("content cozy")}>
                      For example, we could use pool allocation for this basic breadth-first-search algorithm, that checks for units at every nearby location.
                    </div>
                    <div className={ns("content cozy")}>
                      Using pool allocation with an implicit lock is often called a <b>pool-call.</b>
                    </div>
                    <div className={ns("content cozy")}>
                      We use the keyword {incode("pool")} after the region declaration {incode("'i")}.
                    </div>
                    <div className={ns("content cozy")}>
                      A List {this.noteAnchor("731")} uses up to 2x {this.noteAnchor("1023")} as much memory in a pool allocator, so this function takes twice as much memory, but it is also <i>much</i> faster.
                    </div>
                  </div>
                  <div className={ns("half")}>

                    <Snippet header="Vale">
{/*

  this parses:

pure fn findNearbyUnits<'r ro, 'i pool>
    (world 'r &World, origin Location)
    'i List<'r &Unit> «504» {
  result = List<'r &Unit>(); «1140»
  exploredSet = HashSet<Location>();
  unexploredQueue = Queue<Location>(origin); «510»
  unexploredSet = HashSet<Location>(origin);
  while (unexploredQueue.nonEmpty()) {
    // Get next location, mark it explored.
    loc = unexploredQueue.pop();
    unexploredSet.remove(loc);
    exploredSet.add(loc);

    // Add nearby locations we haven't seen yet.
    newNearbyLocs =
        world.getAdjacentLocations(loc).filter({ not exploredSet.has(_) }).filter({ not unexploredSet.has(_) });
    unexploredQueue.addAll(&newNearbyLocs);
    unexploredSet.addAll(&newNearbyLocs);
  }
  ret result;
}

this doesnt. it needs:
- the 'i on the body
- the if-let
- the spaces before the dot
- the 'r in the list we make'

*/}
{`
pure fn findNearbyUnits<'r ro, 'i pool>
    (world 'r &World, origin Location)
    'i List<'r &Unit> 'i `}{this.noteAnchor("504")}{` {
  result = List<'r &Unit>(); `}{this.noteAnchor("1140")}{`
  exploredSet = HashSet<Location>();
  unexploredQueue =
    Queue<Location>(origin); `}{this.noteAnchor("510")}{`
  unexploredSet =
    HashSet<Location>(origin);
  while (unexploredQueue.nonEmpty()) {
    // Get next loc, mark it explored.
    loc = unexploredQueue.pop();
    unexploredSet.remove(loc);
    exploredSet.add(loc);

    // If there's a unit here, add it.
    if ((u) = world.unitsByLoc(loc)) {
      result.add(u);
    }

    // Add nearby locs not seen yet.
    newNearbyLocs =
      world.getAdjacentLocations(loc)
        .filter(
          { not exploredSet.has(_) })
        .filter(
          { not unexploredSet.has(_) })
    unexploredQueue.addAll(
      &newNearbyLocs);
    unexploredSet.addAll(
      &newNearbyLocs);
  }
  ret result;
}
`}

{/*<span className="Prog"><span className="Interface">interface <span className="StructName">INetworkCallback</span> &#123;<br />  <span className="Fn">fn <span className="FnName">handleResponse</span><span className="Params">(<span className="Pat"><span className="Lend">&</span><span className="Capture"><span className="CaptureName">this</span></span></span>, <span className="Pat"><span className="Capture"><span className="CaptureName">resp</span></span> <span className="Typ">Str</span></span>)</span>;</span><br />  <span className="Fn">fn <span className="FnName">drop</span><span className="Params">(<span className="Pat"><span className="Capture"><span className="CaptureName">this</span></span></span>)</span>;</span><br />&#125;</span><br /><span className="Struct">struct <span className="StructName">Network</span> <span className="Membs">&#123;<br />  <span className="Fn">fn <span className="FnName">request</span><span className="Params">(<br />      <span className="Pat"><span className="Lend">&!</span><span className="Capture"><span className="CaptureName">this</span></span></span>, {this.noteAnchor("bang")}<br />      <span className="Pat"><span className="Capture"><span className="CaptureName">url</span></span> <span className="Typ">Str</span></span>,<br />      <span className="Pat"><span className="Capture"><span className="CaptureName">callback</span></span> <span className="Ownership">&!<span className="Typ">INetworkCallback</span></span></span>)</span><br />  <span className="Block">&#123; <span className="Lookup">...</span> &#125;</span></span><br />&#125;</span></span><br /></span>*/}

                    </Snippet>
                  </div>
                </div>

                <div className={ns("content cozy")}>
                  <b>We just made ref-counting free</b> for our findNearbyUnits function, and completely avoided malloc and free overhead.
                </div>

                <ul>
                  <li>References into the {incode("'r")} region are free because it's read-only.</li>
                  <li>References into the {incode("'i")} region are free because it uses pool allocation.</li>
                </ul>

                <div className={ns("content cozy")}>
                  The only memory overhead we pay is when we copy {incode("findNearbyUnits", "'s")} {incode("'i List<'r &Unit>")} result from the pool region into the caller's region.
                </div>
                <div className={ns("content cozy")}>
                  Because Vale makes it so easy to optimize with pool allocation, Vale could become the obvious choice for performance-critical software.
                </div>


                <a name="fastandsafe"></a>
                <h2 className={ns()}>Fast and Safe</h2>


                <div className={ns("content cozy")}>
                  Vale uses single ownership and region isolation to optimize its reference counting, and then offers read-only regions and pool-allocation for when we want to eliminate it altogether.
                </div>
                <div className={ns("content cozy")}>
                  With these, Vale can be 100% safe, while also being one of the fastest languages in existence.
                </div>
              </div>
            </div>

            <div className={ns("margin")}>

              <div className={ns("toc-container")}>

                <div className={ns("c-toc root")}>
                  <b>The Zero-Cost References with Regions in Vale</b>

                  <ul className={ns("c-toc")}>
                    <li>
                      <a href="/blog/zero-cost-refs-regions#referencecounting">Reference Counting</a>
                    </li>
                    <ul>
                      <li><a href="/blog/zero-cost-refs-regions#cycles">Cycles</a></li>
                      <li><a href="/blog/zero-cost-refs-regions#atomicity">Atomicity</a></li>
                      <li><a href="/blog/zero-cost-refs-regions#branchmispredictions">Branch Mispredictions</a></li>
                      <li><a href="/blog/zero-cost-refs-regions#cachemisses">Cache Misses</a></li>
                      <li><a href="/blog/zero-cost-refs-regions#constraintbehaviormodes">Constraint Behavior Modes</a></li>
                    </ul>
                    <li>
                      <a href="/blog/zero-cost-refs-regions#readonlyregions">Read-Only Regions</a>
                    </li>
                    <ul>
                      <li><a href="/blog/zero-cost-refs-regions#implicitlocking">Implicit Locking</a></li>
                      <li><a href="/blog/zero-cost-refs-regions#explicitlocking">Explicit Locking</a></li>
                    </ul>
                    <li>
                      <a href="/blog/zero-cost-refs-regions#regionmemorystrategy">Region Memory Strategy</a>
                    </li>
                    <li>
                      <a href="/blog/zero-cost-refs-regions#fastandsafe">Fast and Safe</a>
                    </li>
                  </ul>
                </div>

                <div className={ns("notes-header")}>
                  <NotesHeader update={this.updateNotesHeaderRect}/>
                </div>
              </div>

{/*
              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="alpha">
                Vale is still in early alpha, and rapidly approaching v0.1. Check out the <a href="/roadmap">Roadmap</a> for progress and plans!
                <div style={{marginTop: "8px"}}>
                  All the features mentioned here are available in Vale, but Resilient Mode, regions, RC elision, and weak references are still on the way.
                </div>
              </Note>
*/}

              <Note name="915" iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon}>
                See <a href="https://vale.dev/blog/raii-next-steps">The Next Steps for Single Ownership and RAII</a>.
              </Note>

              <Note name="1138" iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon}>
                Some applications choose to use Fast Mode which has zero overhead, and gain more confidence in its safety by developing and testing more in Normal Mode.
                <div style={{marginTop: "8px"}}>
                  If we're looking for 100% certainty though, we must use Normal Mode or Resilient Mode.
                </div>
              </Note>

              <Note name="930" iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon}>
                This can be a constraint reference count or a weak reference count, depending on the reference.
              </Note>

              <Note name="627" iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon}>
                Read more at <a href="https://aardappel.github.io/lobster/memory_management.html">https://aardappel.github.io/lobster/memory_management.html</a>
              </Note>

              <Note name="1020" iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon}>
                Commonly in some very small circles, that is.
              </Note>

              <Note name="608" iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon}>
                We had plenty of off-by-one errors when implementing RC.
              </Note>
              
              <Note name="939" iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon}>
                See <a href="https://benchmarksgame-team.pages.debian.net/benchmarksgame/fastest/swift-gcc.html">Benchmarks Game</a>.
              </Note>
              
              <Note name="630" iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon}>
                Similar to Rust's approach, where we can move objects between threads, but can't share them, unless they're in a Mutex.
              </Note>
              
              <Note name="111" iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon}>
                {incode("pure")} means it doesn't access any globals or modify any of its arguments. We can also have {incode("pure")} functions without lifetime annotations.
              </Note>
                            
              <Note name="956" iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon}>
                We could take these annotations out and the program would still work, but it wouldn't be as optimized as it is here.
              </Note>
              
              <Note name="1136" iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon}>
                This is the "map" operator, it calls the method on the right on all the elements of the collection on the left.
                <div style={{marginTop: "8px"}}>
                  It's equivalent to:
                </div>
                <div>
                  {incode("unit.capabilities.map(")}
                </div>
                <div>
                  {incode("  (c){ c.generateImpulse() } )")}
                </div>
                <div style={{marginTop: "8px"}}>
                  or in other languages:
                </div>
                <div>
                  {incode("unit.capabilites.map(")}
                </div>
                <div>
                  {incode("  c => c.generateImpulse() )")}
                </div>
              </Note>
              
              <Note name="911" iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon}>
                The _ means "the argument".
                <div style={{marginTop: "8px"}}>
                This is equivalent to:
                </div>
                <div>
                {incode("(a, b){ a.strength < b.strength }")}
                </div>
                <div style={{marginTop: "8px"}}>
                or in other languages:
                </div>
                <div>
                {incode("(a, b) => a.strength < b.strength")}
                </div>
              </Note>
              
              <Note name="1134" iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon}>
                impl is like @Override in java.
              </Note>
              
              <Note name="1152" iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon}>
                One could say that we're only doing the reference counting we need to, for the result of the function.
              </Note>
              
              <Note name="1109" iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon}>
                There are some potential SIMD opportunities to parallelize these increments.
              </Note>
              
              <Note name="152" iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon}>
                They aint just for multi-threading anymore!
              </Note>
              
              <Note name="334" iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon}>
                Stands for Abstract Syntax Tree, which is a simplified version of code, after we've parsed it from the original text.
              </Note>
              
              <Note name="1050" iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon}>
                If you're curious, the six stages are named Scout, Seer, Astronomer, Templar, Hammer, and Midas.
              </Note>
              
              <Note name="345" iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon}>
                Mutex takes a function which it will call to get its initial value.
              </Note>
              
              <Note name="452" iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon}>
                Type-specific pools are 100% safe with no ref-counting overhead, because use-after-free doesn't actually use a freed object, it uses one that's still alive in memory, and of the correct structure.
              </Note>
              
              <Note name="754" iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon}>
                This only applies to objects that would have been on the heap; any objects we put on the stack will still use the stack.
              </Note>
              
              <Note name="743" iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon}>
                This is safe because the memory is not reclaimed by anyone else, we're just accessing old data, which isn't a memory safety problem (just a logic problem).
              </Note>
              
              <Note name="752" iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon}>
                One could say that we're only paying the RC cost for the things we actually return from the function.
              </Note>
              
              <Note name="504" iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon}>
                We do this to make {incode("'i")} the default region for our function calls and new objects, like the List we make on the next line.
              </Note>
              
              <Note name="1140" iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon}>
                In Vale, List is backed by an array. If one wants a linked list, they can use LinkedList.
              </Note>
              
              <Note name="510" iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon}>
                Circular queue, backed by vec
              </Note>
              
              <Note name="1023" iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon}>
                It uses 1x if we initialize it to the correct capacity.
              </Note>
              
              <Note name="731" iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon}>
                HashSet and Queue are both backed by List, so in this function, we basically have four Lists.
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
