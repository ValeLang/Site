
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

<h1 className={ns("noline cozy")} style={{marginTop: "8px"}}>Zero-Cost References with Regions in Vale</h1 >
<div className={ns("subtitle content cozy")}>Watch regions eliminate reference-counting overhead!</div>

<div className={ns("content")} style={{marginBottom: "32px"}}><span className={ns("date")}>July 29th, 2020</span> <span className={ns("author")}>&nbsp;&mdash;&nbsp; Evan Ovadia</span></div>

<div className={ns("section")}>
  <div className={ns("content cozy")}>Vale is rapidly approaching v0.1, {this.noteAnchor("roadmap")} and now that we've proven the foundations solid, we can finally share our plans for making Vale <b>extremely fast.</b></div>

  <div className={ns("content cozy")}>The fastest language currently is C++. {this.noteAnchor("fastest")} It is an <i>incredibly</i> high bar, but we hope to go even faster (or at least come close in the attempt!) </div>

  <div className={ns("content cozy")}>Vale's Fast Mode can already perform as fast as C++ by turning off memory safety, {this.noteAnchor("hopefully")} but this article is talking about how Vale's Assist Mode and Resilient Mode might be able to approach C++'s speed with zero unsafety.</div>

  <div className={ns("content cozy")}>C++ is a low-level language, meaning that theoretically, it cannot be beat; given unlimited time, you can optimize C++ code enough to beat anything.</div>
</div>

<div className={ns("section")}>
  <div className={ns("content cozy")}>However, in the real world, we don't have unlimited time; we might only have a few days, an evening, or a couple hours to implement what we need. When development time is a factor, we need a language that can <b>optimize as much as possible with as little effort as possible.</b> Even if we did have unlimited time, we want to spend it adding cool features, not optimizing slow code!</div>
</div>

<div className={ns("section")}>
  <div className={ns("content cozy")}><b>Because we don't have unlimited time, development speed and ergonomics matter.</b> Five hours fixing undefined behavior bugs is five hours not spent optimizing. But also, if a language forces us to think hard about and prematurely optimize <i>everything</i>, we spend less time optimizing the hot path. {this.noteAnchor("critical")}</div>
</div>

<div className={ns("section")}>
  <div className={ns("content cozy")}>Vale is aiming at the <b>optimal balance:</b> make it easy to make fast code by default, and give the developer powerful tools to optimize the hot path even further.</div>
</div>

<div className={ns("section")}>
  <div className={ns("content cozy")}>The challenge here is that memory safety has a run-time cost, no matter what language you're in. {this.noteAnchor("rustcost")}</div>
</div>

<div className={ns("section")}>
  <div className={ns("content cozy")}>To overcome that, Vale can use its unique mix of single ownership and regions to: {this.noteAnchor("otherplans")}</div>
  <ul className={ns("content cozy")}>
    <li className={ns()}>Reduce safety overhead as close to zero as possible.</li>
    <li className={ns()}>Make it <i>ridiculously</i> easy to use bump allocation and pool allocation, such that we use it in more places.</li>
  </ul>
</div>

<div className={ns("section")}>
  Note that these are works in progress; we'll be implementing these features over the next year or two. Vale is open to contributors, so if you'd like to help bring these ideas into the world, <a href="/contribute">come join us!</a>
</div>

<div className={ns("section")}>
  If we can achieve this performance, then Vale's blend of speed, safety, and ease could make it the obvious choice for performance-critical software.
</div>

<div className={ns("section")}>
  To set the stage, let's talk about the safety overhead first.
</div>

<a name="referencecounting"></a><h2 >Reference Counting</h2 >

<div className={ns("section")}>
  <div className={ns("content cozy")}>Vale's Fast Mode doesn't use reference counting, but its Assist Mode and Resilient Mode use it to implement non-owning references (constraint references and weak references). This is heavily optimized (more below), but still incurs some non-zero overhead at run-time.</div>

  <div className={ns("content cozy")}>Whenever we make a new reference to an object, we must increment that object's <b>reference count</b>, {this.noteAnchor("930")} and when that reference goes away, we must decrement it again. We can't deallocate an object until its reference count is zero.</div>

  <div className={ns("content cozy")}>The first optimization that will help with this is called <b>compile-time reference counting</b>. Invented by Wouter van Oortmerssen for <a href="http://strlen.com/lobster/">Lobster</a>, it uses Rust-inspired lifetime analysis to eliminate 95% of increments and decrements at compile time, leaving only 5% to happen at run-time. {this.noteAnchor("627")}</div>

  <div className={ns("content cozy")}>Now let's look at the overhead of the remaining 5%. Reference counting has what is commonly {this.noteAnchor("1020")} known as the <b>three vexing fears: cycles, atomicity, mispredictions, and cache-misses.</b> {this.noteAnchor("608")} Vale solves all of them.</div>
</div>

<a name="cycles"></a><h3  className={ns("noline")}>Cycles</h3 >

<div className={ns("content cozy")}>The first weakness of RC is that it can form cycles, causing memory leaks. Vale doesn't have this problem because every object has one owning reference, which controls when the object is deallocated.</div>

<div className={ns("content cozy")}>For the difference between owning, constraint, and weak references, see <a href="https://vale.dev/blog/raii-next-steps">The Next Steps for Single Ownership and RAII</a>.</div>

<a name="atomicity"></a><h3  className={ns("noline")}>Atomicity</h3 >

<div className={ns("content cozy")}>When two threads increment or decrement the same object's reference count, they can interfere with each other. There are various ways to avoid this:</div>

<ul className={ns("content cozy")}>
  <li className={ns()}>In Python, the incrementing/decrementing is non-atomic, but that means only one thread can run at a given time.</li>
  <li className={ns()}>In Swift, we can have multiple threads, but it means every reference count is atomic, which is very slow.</li>
</ul>

<div className={ns("content cozy")}>Christian Aichinger tried making Python's ref-counting atomic, and it resulted in a <a href="https://greek0.net/blog/2015/05/23/python_atomic_refcounting_slowdown/">23% slowdown</a>. This is probably the main reason Swift is slower than C. {this.noteAnchor("939")}</div>

<div className={ns("content cozy")}>In Vale, an object can only be modified by one thread at a time, {this.noteAnchor("isolation")} so a program can have threads and still use non-atomic ref-counting.</div>

<a name="branchmispredictions"></a><h3  className={ns("noline")}>Branch Mispredictions</h3 >

<div className={ns("content cozy")}>RC can also suffer from branch misprediction, where the CPU can't predict whether we'll deallocate the object or not. In Vale, there's no branching at all; letting go of constraint or weak references will never deallocate the object, and letting go of an owning reference will always deallocate it.</div>

<a name="cachemisses"></a><h3  className={ns("noline")}>Cache Misses</h3 >

<div className={ns("content cozy")}>A CPU can non-atomically increment or decrement an integer very quickly; instructions are basically free on modern CPUs. The real bottleneck is in how far the data is: if it's been recently accessed, it's in the nearby cache (the data is "hot"). Otherwise the CPU will "cache miss" and have to bring it in all the way from RAM (the data is "cold").</div>

<div className={ns("content cozy")}>So, even if we make our ref-counting non-atomic and optimize most of it away, any remaining ref-counts on cold data will still incur cache-miss costs.</div>

<div className={ns("content cozy")}>Vale can avoid ref-counting on cold data by using <b>read-only regions</b>.</div>


<a name="readonlyregions"></a><h2 >Read-Only Regions</h2 >

<div className={ns("content cozy")}>In Vale, we can split our memory into various regions. We can lock a region, and all references into it are <b>completely free;</b> we don't have to increment or decrement its objects' ref counts.</div>

<div className={ns("content cozy")}>We can do this with <b>implicit locking</b> and <b>explicit locking.</b></div>


<a name="implicitlocking"></a><h3  className={ns("noline")}>Implicit Locking</h3 >

<div className={ns("section")}>
<div className={ns("content cozy")}>Programs often have "pure" functions, where a function...</div>
<ol className={ns("content cozy")}>
  <li className={ns()}>Reads the outside world through its parameters,</li>
  <li className={ns()}>Does a bit of calculation (perhaps modifying some of its own locals along the way),</li>
  <li className={ns()}>Returns a result,</li>
</ol>
<div className={ns("content cozy")}>...all without modifying the outside world.</div>
<div className={ns("content cozy")}>In Vale, we can annotate a function with the <b>pure</b> keyword to make the compiler enforce this. This is a common design pattern, and leads to much more maintainable and testable code.</div>
</div>

<div className={ns("section")}>
<div className={ns("content cozy")}>If we add <b>region annotations</b> to our <b>pure</b> function, Vale will <b>implicitly lock</b> all existing memory, thus making references to any existing memory <b>completely free;</b> we don't have to increment or decrement anything because:</div>
<ul className={ns("content cozy")}>
  <li className={ns()}>None of the objects they point to can change because they're immutable.</li>
  <li className={ns()}>All these references are temporary, and will go away before we unlock again.</li>
</ul>
<div className={ns("content cozy")}>Below, we use region annotations to tell the compiler which references point to the outside world.</div>

<div className={ns("content cozy")}>Let's see it in action! Let's say we have a turn-based game, which runs in Unity. Whenever the player unit acts, each of the enemy units takes a turn to act too.</div>
</div>


<div className={ns("content splitter")}>
  <div className={ns("half")}>
    <div className={ns("content cozy")}>Each enemy unit figures out what it wants to do most.</div>
    <div className={ns("content cozy")}>To do this, each unit looks at all the things it can do (its {incode("abilities")}, such as Idle, Wander, Chase, Attack), and asks each ability, "what do you want?".</div>
    <div className={ns("content cozy")}>To generate a desire, an ability will look at its unit and the world around it.</div>
    <div className={ns("content cozy")}>An {incode("IDesire")} describes what the unit could do, and how much it wants to do that.</div>
    <div className={ns("content cozy")}>When we have all the {incode("IDesire", "s")}, we sort them to figure out what the strongest one is, and enact it.</div>
    <div className={ns("content cozy")}>By adding the {incode("'r")} to {incode("strongestDesire", "'s")} {incode("this &Unit")}, we're telling the compiler that {incode("this")} will come from a region we call {incode("'r")}.</div>
    <div className={ns("content cozy")}>There's no specific region whose name is {incode("'r")} (rather, {incode("'r")} is how we refer to whatever region contains {incode("this")}, so it's a generic parameter, hence the {incode("<'r ro>")}). The {incode("ro")} specifies that it's a read-only region, making all references into {incode("'r")} free.</div>
    <div className={ns("content cozy")}>This function doesn't change anything about the unit or the world, it just reads them and does calculations.</div>
    <div className={ns("content cozy")}>For example, {incode("ChaseAbility", "'s")} {incode("getDesire")} function will look for the nearest unit, and return a very strong (70!) desire to chase it.</div>
  </div>
  <div className={ns("half")}>
<Snippet header="Vale"><span class="Prog"><span class="Fn">fn <span class="FnName">gameLoop</span><span class="Params">(<span class="Pat"><span class="Capture"><span class="CaptureName">world</span></span> <span class="Ownership">&<span class="Typ">World</span></span></span>)</span> <span class="Block">&#123;<br />  <span class="Call"><span class="CallLookup">each</span> (<span class="MemberAccess"><span class="Lookup">world</span><span class="MemberAccess">.</span><span class="Lookup">enemyUnits</span></span>) <span class="Lambda"><span class="Params">(<span class="Pat"><span class="Capture"><span class="CaptureName">unit</span></span></span>)</span><span class="Block">&#123;<br />    <span class="Comment">// Implicit lock happens here!</span><br />    <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">desire</span></span></span> =<br />      <span class="Call"><span class="Lookup">unit</span><span class="MemberAccess">.</span><span class="CallLookup">strongestDesire</span>(<span class="Lookup">world</span>)</span></span>;<br />    <span class="Comment">// Now the world is mutable!</span><br />    <span class="Call"><span class="Lookup">unit</span><span class="MemberAccess">.</span><span class="CallLookup">enactDesire</span>(<span class="Lookup">desire</span>)</span>;<br />  &#125;</span></span></span><br />&#125;</span></span><br /><br /><span class="Fn">fn <span class="FnName">strongestDesire</span><span class="IdentRunes">&lt;<span class="IdentRune">'i</span>, <span class="IdentRune">'r ro</span>&gt;</span><span class="Params">( <span class="Comment">{this.noteAnchor("956")}</span><br />  <span class="Pat"><span class="Capture"><span class="CaptureName">this</span></span> 'r <span class="Ownership">&<span class="Typ">Unit</span></span></span>)</span><br /><span class="TplArgs"><span class="Typ">IDesire</span>&lt;<span class="Typ">'r</span>, <span class="Typ">'i</span>&gt;</span> <span class="Comment">{this.noteAnchor("111")}</span><br /><span class="Pure">pure</span> <span class="Block">'i &#123; <span class="Comment">{this.noteAnchor("504")}</span><br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">desires</span></span></span> =<br />    <span class="Call"><span class="MemberAccess"><span class="Lookup">this</span><span class="MemberAccess">.</span><span class="Lookup">abilities</span></span><span class="MemberAccess">*.</span><span class="CallLookup">getDesire</span>()</span></span>; <span class="Comment">{this.noteAnchor("1136")}</span><br />  <span class="Call"><span class="Lookup">desires</span><span class="MemberAccess">.</span><span class="CallLookup">sort</span>(<br />    <span class="Lambda"><span class="Block">&#123; <span class="Call"><span class="Call"><span class="MagicParam">_</span><span class="MemberAccess">.</span><span class="CallLookup">strength</span>()</span> <span class="CallLookup">&gt;</span> <span class="Call"><span class="MagicParam">_</span><span class="MemberAccess">.</span><span class="CallLookup">strength</span>()</span></span> &#125;</span></span>)</span>; <span class="Comment">{this.noteAnchor("911")}</span><br />  <span class="Ret">ret <span class="Call"><span class="Lookup">desires</span>[<span class="Num">0</span>]</span>;</span><br />&#125;</span></span><br /><br /><span class="Fn">fn <span class="FnName">getDesire</span><span class="IdentRunes">&lt;<span class="IdentRune">'i</span>, <span class="IdentRune">'r ro</span>&gt;</span><span class="Params">(<br />  <span class="Pat"><span class="Capture"><span class="CaptureName">this</span></span> 'r <span class="Ownership">&<span class="Typ">ChaseAbility</span></span> impl IAbility</span>)</span><br /><span class="TplArgs"><span class="Typ">IDesire</span>&lt;<span class="Typ">'i</span>, <span class="Typ">'r</span>&gt;</span><br /><span class="Pure">pure</span> <span class="Block">'i &#123;<br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">unit</span></span></span> = <span class="MemberAccess"><span class="Lookup">this</span><span class="MemberAccess">.</span><span class="Lookup">unit</span></span></span>;<br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">world</span></span></span> = <span class="MemberAccess"><span class="Lookup">unit</span><span class="MemberAccess">.</span><span class="Lookup">world</span></span></span>;<br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">loc</span></span></span> = <span class="MemberAccess"><span class="Lookup">unit</span><span class="MemberAccess">.</span><span class="Lookup">location</span></span></span>;<br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">nearbyUnits</span></span></span> =<br />    <span class="Call"><span class="Lookup">world</span><span class="MemberAccess">.</span><span class="CallLookup">findNearbyUnits</span>(<span class="Lookup">loc</span>)</span></span>;<br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">closest</span></span></span> = <span class="Call"><span class="Lookup">nearbyUnits</span>[<span class="Num">0</span>]</span></span>;<br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">closestLoc</span></span></span> = <span class="MemberAccess"><span class="Lookup">closest</span><span class="MemberAccess">.</span><span class="Lookup">location</span></span></span>;<br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">path</span></span></span> =<br />    <span class="Call"><span class="Lookup">world</span><span class="MemberAccess">.</span><span class="CallLookup">findPath</span>(<span class="Lookup">loc</span>, <span class="Lookup">closestLoc</span>)</span></span>;<br />  <span class="Ret">ret <span class="Call"><span class="CallLookup">ChaseDesire</span>(<span class="Num">70</span>, <span class="Lookup">closest</span>, <span class="Lookup">path</span>)</span>;</span><br />&#125;</span></span><br /><br /><span class="Struct">struct <span class="StructName">ChaseDesire</span><span class="IdentRunes">&lt;<span class="IdentRune">'i</span>, <span class="IdentRune">'r ro</span>&gt;</span><br />'i <span class="Membs">&#123;<br />  <span class="Memb"><span class="MembName">impl</span> <span class="Typ">IDesire</span>;</span><br /><br />  <span class="Memb"><span class="MembName">strength</span> <span class="Typ">Int</span>;</span><br />  <span class="Memb"><span class="MembName">victim</span> 'r <span class="Ownership">&<span class="Typ">Unit</span></span>;</span><br />  <span class="Memb"><span class="MembName">path</span> <span class="TplArgs"><span class="Typ">List</span>&lt;<span class="Typ">Location</span>&gt;</span>;</span><br /><br />  <span class="Fn">fn <span class="FnName">strength</span><span class="Params">(<span class="Pat"><span class="Lend">&</span><span class="Capture"><span class="CaptureName">this</span></span> impl IDesire</span>)</span> <span class="Comment">{this.noteAnchor("1134")}</span><br />  <span class="Typ">Int</span> <span class="Block">&#123;<br />    <span class="Ret">ret <span class="MemberAccess"><span class="Lookup">this</span><span class="MemberAccess">.</span><span class="Lookup">strength</span></span>;</span><br />  &#125;</span></span><br />&#125;</span></span><br /></span>
</Snippet>
  </div>
</div>


<div className={ns("content cozy")}>{incode("getDesire")} is a heavy, read-only operation. It doesn't change anything about the unit or the world, but it does breadth-first searches, A* pathfinding, and a bunch of other algorithms, which make (and then let go of) a lot of references into the World.</div>

<div className={ns("content cozy")}>Without the region annotations, every time we make (or let go of) a reference into the unit or anything else in the world, we increment and decrement a ref-count. Worse, the World would be cold, because Unity has probably rendered a few hundred frames since the last turn, and has long since wiped our World from the cache.</div>

<div className={ns("content cozy")}>With the region annotations, the compiler knows that only the things inside the {incode("'i")} region can change, and nothing in the {incode("'r")} region will change, making references into {incode("'r")} completely free. <b>All of our references to this cold data, which would have incurred RC costs, are now free.</b></div>

<div className={ns("content cozy")}>There is a caveat: When we return a reference from the implicitly locked call, it increments the ref-count in the object it's pointing to. In the example, {incode("ChaseDesire.victim")} will increment the Unit it's pointing at, as it's returned. {this.noteAnchor("1152")} {this.noteAnchor("1109")} One can often use explicit locking to avoid this kind of overhead.</div>



<a name="explicitlocking"></a><h3  className={ns("noline")}>Explicit Locking</h3 >

<div className={ns("content cozy")}>Implicit locking locked all existing memory, and made a small new region called {incode("'i")} which we could modify. There's a more precise way to manage regions: mutexes! {this.noteAnchor("152")}</div>

<div className={ns("content cozy")}>The Vale compiler itself has a great example of when we'd want explicit locking. Six transformation stages translate the source code into intermediate ASTs {this.noteAnchor("334")} and eventually into an executable binary. {this.noteAnchor("1050")} Each stage takes in the previous AST, read-only, and constructs the next AST.</div>

<div className={ns("content cozy")}>One of those is the "Templar" stage, which reads the {incode("inAst")} and builds the {incode("outAst")}. We can put the {incode("inAst")} in a Mutex, and the {incode("outAst")} in another Mutex. The Templar gets <b>read-only</b> access to the {incode("inAstMutex")}, while it uses it's <b>read-write</b> access to the {incode("outAstMutex")} to build it up.</div>

<div className={ns("content splitter")}>
  <div className={ns("half")}>
    <div className={ns("content cozy")}>Here, the {incode("templar")} function takes in the {incode("inAstMutex")}.</div>
    <div className={ns("content cozy")}>The {incode("inAstMutex")} starts closed, so we call {incode("openro")} to open it for read-only access.</div>
    <div className={ns("content cozy")}>We then create a new Mutex containing an empty {incode("OutAst")}. We immediately open it in read-write mode.</div>
    <div className={ns("content cozy")}>We give both the {incode("outAst")} and a function from the {incode("inAst")} to translateFunction, so it can make a translated function and add it to {incode("outAst")}.</div>
    <div className={ns("content cozy")}>At the end of {incode("templar")}, the locks are dropped, automatically closing the mutexes, and we return the now-closed {incode("outAstMutex")}.</div>

    <div className={ns("content cozy")}>With our {incode("Mutexes")} and region annotations, the compiler can give us free, zero-cost access to everything in the {incode("inAst")}.</div>

  </div>
  <div className={ns("half")}>

<Snippet header="Vale"><span class="Prog"><span class="Fn">fn <span class="FnName">templar</span><span class="Params">(<br />    <span class="Pat"><span class="Capture"><span class="CaptureName">inAstMutex</span></span> <span class="Ownership">&<span class="Permission">!<span class="TplArgs"><span class="Typ">Mutex</span>&lt;<span class="Typ">InAst</span>&gt;</span></span></span></span>)</span> <span class="Block">&#123;<br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">inAstLock</span></span></span> = <span class="Call"><span class="Lookup">inAstMutex</span><span class="MemberAccess">.</span><span class="CallLookup">openro</span>()</span></span>;<br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">inAst</span></span></span> = <span class="MemberAccess"><span class="Lookup">inAstLock</span><span class="MemberAccess">.</span><span class="Lookup">contents</span></span></span>;<br /><br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">outAstMutex</span></span></span> = <span class="Call"><span class="CallLookup">Mutex</span>(<span class="Lambda"><span class="Block">&#123; <span class="Call"><span class="CallLookup">OutAst</span>()</span> &#125;</span></span>)</span></span>; <br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">outAstLock</span></span></span> =<br />    <span class="Call"><span class="Lookup">outAstMutex</span><span class="MemberAccess">.</span><span class="CallLookup">openrw</span>()</span></span>; <span class="Comment">{this.noteAnchor("345")}</span><br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">outAst</span></span></span> = <span class="MemberAccess"><span class="Lookup">outAstLock</span><span class="MemberAccess">.</span><span class="Lookup">contents</span></span></span>;<br /><br />  <span class="Call"><span class="CallLookup">translateFunction</span>(<br />      <span class="Call"><span class="MemberAccess"><span class="Lookup">inAst</span><span class="MemberAccess">.</span><span class="Lookup">functions</span></span>[<span class="Num">0</span>]</span>, <span class="Lend">&<span class="Lookup">outAst</span></span>)</span>;<br /><br />  <span class="Lookup">...</span>;<br /><br />  <span class="Ret">ret <span class="Lookup">outAstMutex</span>;</span><br />&#125;</span></span><br /><br /><span class="Fn">fn <span class="FnName">translateFunction</span><span class="IdentRunes">&lt;<span class="IdentRune">'a ro</span>, <span class="IdentRune">'t</span>&gt;</span><span class="Params">(<br />    <span class="Pat"><span class="Capture"><span class="CaptureName">func</span></span> 'a <span class="Ownership">&<span class="Typ">InAstFunction</span></span></span>,<br />    <span class="Pat"><span class="Capture"><span class="CaptureName">outAst</span></span> 't <span class="Ownership">&<span class="Permission">!<span class="Typ">OutAst</span></span></span></span>)</span><br /><span class="Typ">OutASTFunction</span> <span class="Block">&#123;<br />  <span class="Comment">// Read func, add things to outAst.</span><br />  <span class="Lookup">...</span>;<br />&#125;</span></span><br /></span>
</Snippet>
  </div>
</div>

<div className={ns("content cozy")}>We still increment and decrement the ref-counts of objects inside {incode("'i")}, but we just made those objects, so they'll likely be hot in the cache.</div>

<div className={ns("content cozy")}>We can take this even further: we can combine explicit locking and implicit locking, and even do implicit locks from within implicit locks. By layering these locking techniques, we can compound our benefits and speed up our program even more!</div>

<a name="regionmemorystrategy"></a><h2 >Region Memory Strategy</h2 >

<div className={ns("content cozy")}>In our game example above, references into {incode("'r")} were completely free. And references into {incode("'i")} were probably hot in the cache, making its reference counting very fast.</div>
<div className={ns("content cozy")}>How much more can we do? <b>Much more.</b> This is where things get a bit crazy.</div>

<div className={ns("content cozy")}>
  Vale's <b>pool and arena allocation</b> can eliminate the ref-counting overhead in {incode("'i")} too, and <b>lets eliminate its malloc and free overhead as well, while we're at it.</b>
</div>
<div className={ns("content cozy")}>
  The default memory management strategy for a region is to use the <b>heap</b>, which uses malloc and free under the hood.
</div>
<div className={ns("content cozy")}>
  We can make it so a certain region uses <b>pool</b> allocation, which is <i>much</i> faster. Pool allocation uses a large "slab" of memory, and keeps allocating from the next part of it. {this.noteAnchor("754")} It also caches all "freed" structs for future allocations of the same type. When it runs out of memory in the slab, it allocates another one. {this.noteAnchor("452")}
</div>
<div className={ns("content cozy")}>
  Functions can also use <b>arena</b> allocation, which doesn't reuse memory, but just keeps allocating it. This can push performance even faster, though one should be careful when using this, as it could cause out-of-memory errors.
</div>

<div className={ns("content cozy")}>Pool allocation's benefits:</div>

<ul className={ns("content cozy")}>
  <li className={ns()}>It's <i>extremely</i> fast, because instead of an expensive call to malloc, allocation is simply incrementing the "bump pointer" in the underlying slab, or using a cached one. {this.noteAnchor("cachetype")}</li>
  <li className={ns()}>It's very cache-friendly, because all of our allocated objects are right next to each other.</li>
  <li className={ns()}>In release mode, we can <i>completely</i> optimize out all constraint reference counting to references inside the pool region, with no loss to safety. {this.noteAnchor("743")}</li>
  <li className={ns()}>We pay no cost to deallocate, because we deallocate the slabs all at once at the end of the function!</li>
</ul>

<div className={ns("content cozy")}>Pool allocation's costs:</div>

<ul className={ns("content cozy")}>
  <li className={ns()}>Since we cache these structs, our memory usage could be higher. For example, if we make 120 Spaceships and let go of 20 of them, those 20 will still be using up memory. That's why pools are good for the span of certain functions, and not the entire program.</li>
  <li className={ns()}>Moving objects between regions (e.g. when returning from an implicit lock function that uses a pool region) sometimes requires copying those objects. {this.noteAnchor("752")}</li>
</ul>

<div className={ns("content cozy")}>Used well, a pool allocator can drastically speed up a region.</div>


<div className={ns("content splitter")}>
  <div className={ns("half")}>
    <div className={ns("content cozy")}>For example, we could use pool allocation for this basic breadth-first-search algorithm, that checks for units at every nearby location.</div>
    <div className={ns("content cozy")}>We use the keyword {incode("pool")} after the region declaration {incode("'i")}.</div>

    <div className={ns("content cozy")}><b>We just made ref-counting free</b> for our findNearbyUnits function, and completely avoided malloc and free overhead. {this.noteAnchor("avoid")}</div>

    <ul className={ns("content cozy")}>
      <li className={ns()}>References into the {incode("'r")} region are free because it's read-only.</li>
      <li className={ns()}>References into the {incode("'i")} region are free because it uses pool allocation.</li>
    </ul>

  </div>
  <div className={ns("half")}>

<Snippet header="Vale"><span class="Prog"><span class="Fn">fn <span class="FnName">findNearbyUnits</span><span class="IdentRunes">&lt;<span class="IdentRune">'r ro</span>, <span class="IdentRune">'i pool</span>&gt;</span><br />  <span class="Params">(<span class="Pat"><span class="Capture"><span class="CaptureName">world</span></span> 'r <span class="Ownership">&<span class="Typ">World</span></span></span>, <span class="Pat"><span class="Capture"><span class="CaptureName">origin</span></span> <span class="Typ">Location</span></span>)</span><br />  'i <span class="TplArgs"><span class="Typ">List</span>&lt;'r <span class="Ownership">&<span class="Typ">Unit</span></span>&gt;</span><br /><span class="Pure">pure</span> <span class="Block">'i &#123;<br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">result</span></span></span> = <span class="Call"><span class="CallLookup">List</span><span class="TplArgs">&lt;'r <span class="Ownership">&<span class="Typ">Unit</span></span>&gt;</span>()</span></span>; <span class="Comment">{this.noteAnchor("1140")}</span><br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">exploredSet</span></span></span> = <span class="Call"><span class="CallLookup">HashSet</span><span class="TplArgs">&lt;<span class="Typ">Location</span>&gt;</span>()</span></span>;<br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">unexploredQueue</span></span></span> =<br />    <span class="Call"><span class="CallLookup">Queue</span><span class="TplArgs">&lt;<span class="Typ">Location</span>&gt;</span>(<span class="Lookup">origin</span>)</span></span>; <span class="Comment">{this.noteAnchor("510")}</span><br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">unexploredSet</span></span></span> =<br />    <span class="Call"><span class="CallLookup">HashSet</span><span class="TplArgs">&lt;<span class="Typ">Location</span>&gt;</span>(<span class="Lookup">origin</span>)</span></span>;<br />  <span class="While">while <span class="Block">(<span class="Call"><span class="Lookup">unexploredQueue</span><span class="MemberAccess">.</span><span class="CallLookup">nonEmpty</span>()</span>)</span> <span class="Block">&#123;<br />    <span class="Comment">// Get next loc, mark it explored.</span><br />    <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">loc</span></span></span> = <span class="Call"><span class="Lookup">unexploredQueue</span><span class="MemberAccess">.</span><span class="CallLookup">pop</span>()</span></span>;<br />    <span class="Call"><span class="Lookup">unexploredSet</span><span class="MemberAccess">.</span><span class="CallLookup">remove</span>(<span class="Lookup">loc</span>)</span>;<br />    <span class="Call"><span class="Lookup">exploredSet</span><span class="MemberAccess">.</span><span class="CallLookup">add</span>(<span class="Lookup">loc</span>)</span>;<br /><br />    <span class="Comment">// If there's a unit here, add it.</span><br />    <span class="If">if <span class="Block">(<span class="Let"><span class="Pat"><span class="Destructure">(<span class="Pat"><span class="Capture"><span class="CaptureName">u</span></span></span>)</span></span> = <span class="Call"><span class="Lookup">world</span><span class="MemberAccess">.</span><span class="CallLookup">unitsByLoc</span>(<span class="Lookup">loc</span>)</span></span>)</span> <span class="Block">&#123;<br />      <span class="Call"><span class="Lookup">result</span><span class="MemberAccess">.</span><span class="CallLookup">add</span>(<span class="Lookup">u</span>)</span>;<br />    &#125;</span></span><br /><br />    <span class="Comment">// Add nearby locs not seen yet.</span><br />    <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">newNearbyLocs</span></span></span> =<br />      <span class="Call"><span class="Call"><span class="Call"><span class="Lookup">world</span><span class="MemberAccess">.</span><span class="CallLookup">getAdjacentLocations</span>(<span class="Lookup">loc</span>)</span><span class="MemberAccess"><br />        .</span><span class="CallLookup">filter</span>(<br />          <span class="Lambda"><span class="Block">&#123; <span class="Call"><span class="CallLookup">not</span> <span class="Call"><span class="Lookup">exploredSet</span><span class="MemberAccess">.</span><span class="CallLookup">has</span>(<span class="MagicParam">_</span>)</span></span> &#125;</span></span>)</span><span class="MemberAccess"><br />        .</span><span class="CallLookup">filter</span>(<br />          <span class="Lambda"><span class="Block">&#123; <span class="Call"><span class="CallLookup">not</span> <span class="Call"><span class="Lookup">unexploredSet</span><span class="MemberAccess">.</span><span class="CallLookup">has</span>(<span class="MagicParam">_</span>)</span></span> &#125;</span></span>)</span></span>;<br />    <span class="Call"><span class="Lookup">unexploredQueue</span><span class="MemberAccess">.</span><span class="CallLookup">addAll</span>(<br />      <span class="Lend">&<span class="Lookup">newNearbyLocs</span></span>)</span>;<br />    <span class="Call"><span class="Lookup">unexploredSet</span><span class="MemberAccess">.</span><span class="CallLookup">addAll</span>(<br />      <span class="Lend">&<span class="Lookup">newNearbyLocs</span></span>)</span>;<br />  &#125;</span></span><br />  <span class="Ret">ret <span class="Lookup">result</span>;</span><br />&#125;</span></span><br /></span>
</Snippet>
  </div>
</div>


<a name="nextsteps"></a><h2 >Next Steps</h2 >

<div className={ns("content cozy")}>
  Vale's regions give the programmer incredible flexibility on where and how to optimize their code. Because Vale makes it so much easier to do this kind of optimization, Vale programs could be have performance rivaling even C++.
</div>

<div className={ns("content cozy")}>
  Over the next year or two, we'll be trying these out, as well as some other ideas on cutting down the reference-counting overhead. Regions and single ownership have never been combined in this way, so we're discovering new potential every day.
</div>

<div className={ns("content cozy")}>
  If you want to see this happen sooner, or just want to contribute to something cool, we invite you to <a href="/contribute">come join us!</a> {this.noteAnchor("help")}
</div>

<div className={ns("content cozy")}>
  We'd love to hear your thoughts on regions and zero-cost references, so <a href="https://www.reddit.com/r/vale/comments/i0pyo5/zero_cost_references_with_regions/">leave a comment</a>!
</div>

<div className={ns("content cozy")}>
  Stay tuned for the next articles, where we talk about Vale's optimizations, pentagonal tiling, Vale's killer app, and more. If you want to learn more before then, come by the <a href="http://reddit.com/r/vale">r/Vale</a> subreddit or the <a href="https://discord.gg/SNB8yGH">Vale discord server</a>!
</div>



<div className={ns("afterword")} style={{marginTop: "24px"}}>
  <a name="afterword:borrowcheckinginvaleandrust"></a><h2  className={ns("noline")} style={{marginTop: 0}}>Afterword: Borrow Checking in Vale and Rust</h2 >

  <div className={ns("section")}>
    <div className={ns("content cozy")}>
      Vale and Rust have similar-sounding goals: safety and speed. We're often asked how the approaches are different, so I like including these afterwords to really dive into the subject. Some preliminary notes:
    </div>

    <ul className={ns("content cozy")}>
      <li className={ns()}>
        This is only my opinion, an honest appraisal of Rust's strengths and weaknesses, from experience. Also note that, while we have used Vale (and this style of programming pre-Vale), its performance characteristics are still unproven, so take all of this with a grain of salt.
      </li>
      <li className={ns()}>
        Regardless of the common focus on safety and speed, Vale is designed for much higher-level use cases such as apps, games, and servers, rather than Rust's use cases which are much closer to the metal. Comparing Rust and Vale is a fun exercise, but not as useful as, say, comparing Vale to C++.
      </li>
    </ul>
  </div>

  <div className={ns("section")}>
    <div className={ns("content cozy")}>
      Rust uses the borrow checker to make sure that if there's one reference active to an object, there cannot be another mutable reference active to it, to enforce safety.
    </div>
    <div className={ns("content cozy")}>Rust's borrow checker has some major benefits:</div>
    <ul className={ns("content cozy")}>
      <li className={ns()}>It's safe!</li>
      <li className={ns()}>It forces us to use much more cache-friendly patterns, making our programs <b>very</b> fast. For example, in Rust we often put our objects into {incode("Vec")}s which serve as pools.</li>
    </ul>
    <div className={ns("content cozy")}>However, like any approach, it also has drawbacks:</div>
    <ul className={ns("content cozy")}>
      <li className={ns()}>It's difficult; since the borrow checker does not work for all references, {this.noteAnchor("references")} we have to spend a lot of time figuring out how to work around it.</li>
      <ul className={ns("content cozy")}>
        <li className={ns()}>Luckily, this can be learned. After a while, you can understand when and how to work around the borrow checker, and when to fall back on {incode("unsafe")} code.</li>
      </ul>
      <li className={ns()}>It makes certain patterns impossible, and one often finds their architecture forced in a certain direction to appease the borrow checker. {this.noteAnchor("observer")}</li>
      <ul className={ns("content cozy")}>
        <li className={ns()}>One can use {incode("Rc<RefCell<T>>")} for a lot of these situations, but it's regarded as a code smell by a lot of the Rust community. {this.noteAnchor("smell")} If we're to consider a Rust program that has a blend of {incode("Rc<RefCell<T>>")} and its associated run-time overhead, we should also consider other fast low-run-time-overhead languages.</li>
        <li className={ns()}>{incode("Cell")} is also useful in certain situations!</li>
      </ul>
    </ul>

    <div className={ns("content cozy")}>
      Rust is an <i>amazing</i> tradeoff for low-level systems programming (drivers, embedded, operating systems, etc). It still works well in higher-level use cases (apps, certain kinds of games, anything with a lot of interconnected state), but not as well as for the low-level cases.
    </div>
  </div>

  <div className={ns("section")}>
    <div className={ns("content cozy")}>
      Vale uses <b>region borrow checking</b>, which operates on groups of objects, rather than each individual object.
    </div>
    <div className={ns("content cozy")}>Region borrow checking has some major benefits:</div>
    <ul className={ns("content cozy")}>
      <li className={ns()}>Since we aren't applying the borrow checker on a per-object basis, we can alias freely, and are not forced into certain patterns or architectures.</li>
      <li className={ns()}>References into immutable regions are free!</li>
      <li className={ns()}>We can designate <i>entire regions</i> to use pool allocation, with one keyword. This means that:</li>
      <ul className={ns("content cozy")}>
        <li className={ns()}>Every struct can have its own pool, where we reuse old instances.</li>
        <li className={ns()}>Every struct can use the same bump allocator.</li>
        <li className={ns()}>An entire region can avoid reference-counting overhead completely.</li>
      </ul>
    </ul>
    <div className={ns("content cozy")}>
      However, Vale's approach could have some drawbacks:
    </div>
    <ul className={ns("content cozy")}>
      <li className={ns()}>
        When not in a region, it uses normal malloc/free and ref-counting under the hood (though an estimated 95% of the ref-counting can be optimized away). This could add up.
      </li>
      <li className={ns()}>
        For programs that spend 99% of their time in 5% of the code, this is great; we can throw that 5% in a bump-allocating pool region which does most of its outside accesses with implicit locking, and have a super fast program. But if a program doesn't have a particular hot spot, then Vale's approach could be more tedious.
      </li>
    </ul>
  </div>

  <div className={ns("section")}>
    <div className={ns("content cozy")}>One interesting thing to note is that both Vale and Rust influence the programmer in a certain direction:</div>
    <ol className={ns("content cozy")}>
      <li className={ns()}>Take the "outside world" as immutable.</li>
      <li className={ns()}>Do a bunch of calculations.</li>
      <li className={ns()}>Calculate the desired changes to the world.</li>
      <li className={ns()}>Apply those changes.</li>
    </ol>
    <div className={ns("content cozy")}>
      This pattern leads to more testable, maintainable code, so this is a very good thing.
    </div>
  </div>

</div>


    </div>
  </div>



              <div className={ns("margin")}>
                <div className={ns("toc-container")}>
                  <div className={ns("c-toc root")}>
<b>Zero-Cost References with Regions in Vale</b><ul><li><a href="/blog/zero-cost-refs-regions#referencecounting">Reference Counting</a></li><ul><li><a href="/blog/zero-cost-refs-regions#cycles">Cycles</a></li></ul><ul><li><a href="/blog/zero-cost-refs-regions#atomicity">Atomicity</a></li></ul><ul><li><a href="/blog/zero-cost-refs-regions#branchmispredictions">Branch Mispredictions</a></li></ul><ul><li><a href="/blog/zero-cost-refs-regions#cachemisses">Cache Misses</a></li></ul><li><a href="/blog/zero-cost-refs-regions#readonlyregions">Read-Only Regions</a></li><ul><li><a href="/blog/zero-cost-refs-regions#implicitlocking">Implicit Locking</a></li></ul><ul><li><a href="/blog/zero-cost-refs-regions#explicitlocking">Explicit Locking</a></li></ul><li><a href="/blog/zero-cost-refs-regions#regionmemorystrategy">Region Memory Strategy</a></li><li><a href="/blog/zero-cost-refs-regions#nextsteps">Next Steps</a></li><li><a href="/blog/zero-cost-refs-regions#afterword:borrowcheckinginvaleandrust">Afterword: Borrow Checking in Vale and Rust</a></li></ul>
                </div>

                <div className={ns("notes-header")}>
                  <sliceHeader update={this.updateNotesHeaderRect}/>
                </div>
              </div>


<Note name="930" iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon}>
  This can be a constraint ref count or a weak ref count, depending on the reference.
</Note>

<Note name="627" iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon}>
  Read more at <a href="https://aardappel.github.io/lobster/memory_management.html">https://aardappel.github.io/lobster/memory_management.html</a>
</Note>

<Note name="1020" iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon}>
  Commonly in some very small circles, that is.
</Note>

<Note name="608" iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon}>
  ...we had plenty of off-by-one errors when implementing reference counting.
</Note>

<Note name="939" iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon}>
  See <a href="https://benchmarksgame-team.pages.debian.net/benchmarksgame/fastest/swift-gcc.html">Benchmarks Game</a>.
</Note>

<Note name="111" iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon}>
  {incode("IDesire<'r, 'i>")} is defined below. It uses region arguments so it can point into multiple regions at once.
</Note>

<Note name="smell" iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon}>
  <div className={ns("content cozy")}>Personally, I think that it shouldn't be regarded as a code smell. I think using {incode("Rc<RefCell<T>>")} for objects at a higher level and then use borrow checking for the object's members (and sub-objects) is a really solid pattern.</div>
  <div className={ns("content cozy")}>Also check out <a href="https://cone.jondgoodwin.com/">Cone</a>, a language which is exploring compiler-assisted DIY memory management that allows you to optimize performance and safety across arena, pool, single-owner, RC, tracing GC, and borrowed ref strategies.</div>
</Note>

<Note name="956" iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon}>
  The {incode("'r ro")} and {incode("'i")} are <b>regions</b>. {incode("'")} means region, and {incode("ro")} means read-only.
</Note>

<Note name="1136" iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon}>
  <div className={ns("content cozy")}>This is the "map" operator, it calls a method on all elements of a collection.</div>
  <div className={ns("content cozy")}>
    It's equivalent to:<br />
    {incode("unit.capabilities.map(")}<br />
    {incode("  (c){ c.generateImpulse() } )")}
  </div>
  <div className={ns("content cozy")}>
    or in other languages:<br />
    {incode("unit.capabilites.map(")}<br />
    {incode("  c => c.generateImpulse() )")}
  </div>
</Note>

<Note name="911" iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon}>
  <div className={ns("content cozy")}>The _ means "the argument".</div>
  <div className={ns("content cozy")}>
    This is equivalent to:<br />
    {incode("(a,b){a.strength < b.strength}")}
  </div>
  <div className={ns("content cozy")}>
    or in other languages:<br />
    {incode("(a,b)=>a.strength < b.strength")}
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

<Note name="help" iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon}>
  <div className={ns("content cozy")}>All contributions are welcome! Soon, we're going to:</div>
  <ul className={ns("content cozy")}>
    <li className={ns()}>Finish designing the region borrow checker!</li>
    <li className={ns()}>Implement the bump allocator and pooling!</li>
    <li className={ns()}>Write a standard library! (sets, hash maps, lists, etc)</li>
    <li className={ns()}>Make syntax highlighters! (VSCode, Sublime, Vim, Emacs, etc)</li>
    <li className={ns()}>Enable support gdb/lldb for debugging!</li>
    <li className={ns()}>Add better error reporting!</li>
    <li className={ns()}>Replace the temporary combinator-based parser with a real one!</li>
    <li className={ns()}>Add a "show all constraint refs" option in debug mode to our LLVM codegen stage!</li>
  </ul>
  <div className={ns("content cozy")}>If any of this interests you, come join us!</div>
</Note>

<Note name="452" iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon}>
  Type-specific pools are 100% safe with no ref-counting overhead, because use-after-free doesn't actually use a freed object, it uses one that's still alive in memory, and of the correct structure.
</Note>

<Note name="754" iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon}>
  This only applies to objects that would have been on the heap; any objects we put on the stack will still use the stack.
</Note>

<Note name="743" iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon}>
  This is safe because the memory is not reclaimed by anyone else, we're just accessing old data, which isn't a memory safety problem, just a logic problem (and one that would be caught in Assist Mode).
</Note>

<Note name="752" iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon}>
  One could say that we're only paying the RC cost for the things we actually return from the function.
</Note>

<Note name="504" iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon}>
  This {incode("'i")} here specifies the default region for our allocations and calls.
</Note>

<Note name="fastest" iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon}>
  See <a href="https://benchmarksgame-team.pages.debian.net/benchmarksgame/fastest/cpp.html">Benchmarks Game</a>. Fortran, C, and Rust are also close to C++'s performance.
</Note>

<Note name="1140" iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon}>
  In Vale, List is backed by an array. If one wants a linked list, they can use LinkedList.
</Note>

<Note name="critical" iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon}>
  The "hot path" is the (relatively small) area of code that programs spend most of their time in. For example, a rendering loop in a game engine.
</Note>

<Note name="rustcost" iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon}>
  See <a href="https://vale.dev/blog/raii-next-steps">The Next Steps for Single Ownership and RAII</a> for how every memory safety strategy has run-time costs.
</Note>

<Note name="avoid" iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon}>
  The only memory overhead we paid is when we copied {incode("findNearbyUnits", "'s")} {incode("'i List<'r &Unit>")} result from the pool region into the caller's region.
</Note>

<Note name="otherplans" iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon}>
  <div className={ns("content cozy")}>Vale has some other tricks up its sleeve too:</div>
  <ul className={ns("content cozy")}>
    <li className={ns()}>Accelerated Weak Tables, to reduce weak references' cache misses.</li>
    <li className={ns()}>"Fast Resilient Mode" which won't use ref-counting or borrow-checking for its memory safety, at the cost of slightly more memory usage.</li>
  </ul>
  <div className={ns("content cozy")}>We'll be posting about these by early next year, but feel free to come by the <a href="https://discord.gg/SNB8yGH">Vale discord</a> and ask about it before then!</div>
</Note>

<Note name="510" iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon}>
  Circular queue, backed by an array.
</Note>

<Note name="isolation" iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon}>
  Similar to Rust, each thread's memory is isolated from the rest, and we can send messages between them, or use a mutex to take turns accessing data safely.
</Note>

<Note name="roadmap" iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon}>
  Check out the <a href="/roadmap">Roadmap</a> for progress and plans!
</Note>

<Note name="observer" iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon}>
  <div className={ns("content cozy")}>Some examples:</div>
  <ul className={ns("content cozy")}>
    <li className={ns()}>A doubly linked list, or any other architecture involving back-references.</li>
    <li className={ns()}>Attaching an observer to a button, which modifies outside state without permanently freezing it for everyone else, making it useless.</li>
    <li className={ns()}>The <a href="https://vale.dev/blog/next-steps-raii#safehandlingofaliases">"component" pattern</a>, where subcomponents of a struct have references to each other.</li>
  </ul>
</Note>

<Note name="references" iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon}>
  If you translate a program from C++ or C# to Rust for example, you'll find that the borrow checker rejects most of your references and pointers, and you'll have to use indices or {incode("Rc<RefCell<T>>")}.
</Note>

<Note name="cachetype" iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon}>
  Internally, this uses a hash-map of free lists by type ID, with some interesting reuse of memory inside the slab.
</Note>

<Note name="hopefully" iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon}>
  One usually uses Assist Mode's very conservative checks to gain confidence that Fast Mode won't crash. See <a href="https://vale.dev/blog/raii-next-steps">The Next Steps for Single Ownership and RAII</a> for more on how this works.
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

