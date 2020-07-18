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

class BlogRaiiNextSteps extends React.Component {
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

                <h1 className={ns("noline cozy")} style={{marginTop: "8px"}}>The Next Steps for Single Ownership and RAII</h1>
                <div className={ns("subtitle content cozy")}>How constraint references enable easy safety, speed, and much more powerful RAII!</div>

                <div className={ns("content")} style={{marginBottom: "32px"}}><span className={ns("date")}>July 15th, 2020</span> <span className={ns("author")}>&nbsp;&mdash;&nbsp; Evan Ovadia</span></div>

                <div className={ns("content")}>
                  While diving the depths of single ownership, we discovered a hidden gem from the most unlikely of places. With it, we were able to reassemble C++ into something that really unleashes the full potential of RAII.
                </div>
                <div className={ns("content cozy")}>
                  Recall these ancient mantras, known to any C++ developer:
                </div>
                <ul className={ns("content cozy")}>
                  <li className={ns()}>"Who destroyed that object I was pointing at?"</li>
                  <li className={ns()}>"Blasted segfaults!"</li>
                  <li className={ns()}>"We need to influence the destructor, but destructors take no parameters!"</li>
                  <li className={ns()}>"Who's still holding a {incode("shared_ptr")} to my object? It should be dead!"</li>
                  <li className={ns()}>"I can't throw from a destructor, or have multiple exceptions in flight?"</li>
                  <li className={ns()}>"Destructors can't return a status, either?!"</li>
                </ul>
                <div className={ns("content")}>
                  In this journey, we discovered language solutions for <i>all</i> of these.
                </div>

                <div className={ns("content cozy")}>
                  This article is about C++'s RAII and single ownership, and how we can take it even further. {this.noteAnchor("642a")}
                </div>

                <div className={ns("content cozy")}>
                  C++'s syntax often makes single ownership look more difficult than it is, so we also use Vale to illustrate how easy and powerful single ownership can be. {this.noteAnchor("alpha")}
                </div>


                <a name="singleownership"></a>
                <h3 className={ns()}>Single Ownership</h3>

                <div className={ns("content cozy")}>
                  Our journey started in 2011, when C++11's {incode("unique_ptr")} brought single ownership and move semantics to C++ programmers worldwide, and changed our lives forever. {this.noteAnchor("beforecpp")}
                </div>
                <div className={ns("content cozy")}>
                  In one fell swoop, it basically single-handedly solved memory leaks. Single-ownership is one of those notions that, once it clicked, felt <i>right</i>. It was probably because this is how we already think: in C, we would mentally track ownership, to know whose responsibility it was to free an object. Even in GC'd languages, we would implicitly track who's responsible for calling {incode(".dispose()")}.
                </div>
                <div className={ns("content cozy")}>
                  We slowly discovered that we could use RAII for things other than freeing memory! We could:
                </div>
                <ul className={ns("content cozy")}>
                  <li className={ns()}>Remove self from an observers list. {this.noteAnchor("dispose")}</li>
                  <li className={ns()}>Close a file stream, or clean up a temp file.</li>
                  <li className={ns()}>Close a mutex's lock.</li>
                  <li className={ns()}>Stop an ongoing calculation in another thread.</li>
                  <li className={ns()}>Roll-back or commit a transaction.</li>
                  <li className={ns()}>Cancel a retrying network request.</li>
                  <li className={ns()}>Remove some UI elements from the view.</li>
                  <li className={ns()}>Resolve or reject a future.</li>
                  <li className={ns()}>Notify others that we're being freed.</li>
                  <li className={ns()}>Enforce that we actually handled an error, rather than dropping it on the floor.</li>
                  {/* Other uses:
                  - could represent an atLeastOnce kind of thing by having a doX and doFinalX.
                  - if i want to make sure they call recalculateIndices, i can have it return a responsibility which is only taken in by recalculateIndices.
                  - reset view, if this was a mode
                  - decrement call depth for a guard
                  - save to cache to resume next time
                  - assert we did something
                  - restore last state (rolling back)
                  - publish results now that we know there wont be any more commands forthcoming (like a builder?)
                  */}
                </ul>
                <div className={ns("content cozy")}>
                  We realized: RAII wasn't just way to track who should free an object, and these weren't just neat tricks. RAII is much more, it's a way to <b>track responsibility</b>. {this.noteAnchor("sovsraii")}
                </div>
                <div className={ns("content cozy")}>
                  It's a promise that's enforced by the compiler. Instead of just "The compiler will make sure we free this," RAII is "The compiler will make sure that we XYZ" where XYZ is whatever we want. {this.noteAnchor("whatever")}
                </div>


                <a name="safehandlingofaliases"></a>
                <h3 className={ns()}>Safe Handling of Aliases</h3>

                <div className={ns("content cozy")}>
                  Single ownership in modern C++ uses owning {incode("unique_ptr<T>", "s")}, and non-owning {incode("T*")} raw pointers.
                </div>
                <div className={ns("content cozy")}>
                  Where {incode("unique_ptr")} is the sheriff, the raw pointer is the infamous mercenary who rides into town and makes everyone mighty nervous. When things go well, he's useful... but if things get dicey, he <b>might just decide to dereference that pointer</b> and cause all sorts of chaos.
                </div>

                <div className={ns("content splitter")}>
                  <div className={ns("half")}>
                    <div className={ns("content cozy")}>
                      We discovered that the sheriff and the mercenaries <i>can</i> work together, with some solid rules. We discovered patterns that worked pretty well.
                    </div>
                    <div className={ns("content cozy")}>
                      For example, we'd often have a BigClass, that owns a bunch of smaller classes ("subcomponents"), where each subcomponent has raw pointers to subcomponents made before it.
                    </div>
                    <div className={ns("content cozy")}>
                      C++'s member initializer list even enforces that we don't refer to a not-yet-initialized member.
                    </div>
                    <div className={ns("content cozy")}>
                      The big class constructs these in the right order, and destructs them in the correct reverse order.
                    </div>
                    <div className={ns("content cozy")}>
                      With this, there won't be any unfortunate seg-faulting in our small town.
                    </div>
                    <div className={ns("content cozy")}>
                      The world discovered many patterns like this for handling raw pointers. {this.noteAnchor("safehandling")}
                    </div>
                  </div>
                  <div className={ns("half")}>
<pre className="cppSnippet root"><div className="cppSnippet header">C++</div><code className="cpp">
{`class BigClass {
public:
  unique_ptr<A> a;
  unique_ptr<B> b;
  unique_ptr<C> c;
  unique_ptr<D> d;
  BigClass() :
    a(make_unique<A>()),
    b(make_unique<B>(a.get())),
    c(make_unique<C>(a.get())),
    d(make_unique<D>(a.get(), c.get()))
  { }
};
`}</code></pre>

                    <Snippet header="Vale">
{/*
struct BigClass {
  a A; (nounique)
  b B;
  c C;
  d D;
  fn BigClass() {
    this.a = A(); (nomakeunique)
    this.b = B(&this.a); (noget)
    this.c = C(&this.a);
    this.d = D(&this.a, &this.c);
  }
}
*/}

<span className="Prog"><span className="Struct">struct <span className="StructName">BigClass</span> <span className="Membs">&#123;<br />  <span className="Memb"><span className="MembName">a</span> <span className="Typ">A</span>;</span> {this.noteAnchor("nounique")}<br />  <span className="Memb"><span className="MembName">b</span> <span className="Typ">B</span>;</span><br />  <span className="Memb"><span className="MembName">c</span> <span className="Typ">C</span>;</span><br />  <span className="Memb"><span className="MembName">d</span> <span className="Typ">D</span>;</span><br />  <span className="Fn">fn <span className="FnName">BigClass</span><span className="Params">()</span> <span className="Block">&#123;<br />    <span className="Let"><span className="Pat"><span className="Capture"><span className="CaptureName">this.a</span></span></span> = <span className="Call"><span className="CallLookup">A</span>()</span>;</span> {this.noteAnchor("nomakeunique")}<br />    <span className="Let"><span className="Pat"><span className="Capture"><span className="CaptureName">this.b</span></span></span> = <span className="Call"><span className="CallLookup">B</span>(<span className="Lend">&<span className="MemberAccess"><span className="Lookup">this</span>.<span className="Lookup">a</span></span></span>)</span>;</span> {this.noteAnchor("noget")}<br />    <span className="Let"><span className="Pat"><span className="Capture"><span className="CaptureName">this.c</span></span></span> = <span className="Call"><span className="CallLookup">C</span>(<span className="Lend">&<span className="MemberAccess"><span className="Lookup">this</span>.<span className="Lookup">a</span></span></span>)</span>;</span><br />    <span className="Let"><span className="Pat"><span className="Capture"><span className="CaptureName">this.d</span></span></span> = <span className="Call"><span className="CallLookup">D</span>(<span className="Lend">&<span className="MemberAccess"><span className="Lookup">this</span>.<span className="Lookup">a</span></span></span>, <span className="Lend">&<span className="MemberAccess"><span className="Lookup">this</span>.<span className="Lookup">c</span></span></span>)</span>;</span><span className="W"></span><br />  &#125;</span></span><br />&#125;</span></span><br /></span>

                    </Snippet>
                  </div>
                </div>



                <div className={ns("content cozy")}>
                  Interestingly, in this picture, <b>there are never any dangling pointers</b>. It's even better than never <b>dereferencing</b> any dangling pointers: rather the pointers never <b>become</b> dangling to begin with!
                </div>
                <div className={ns("content cozy")}>
                  Indeed, every reference to an object is destroyed before the object itself is.
                </div>



                <a name="constraintreferences"></a>
                <h4 className={ns()}>Constraint Reference</h4>

                <div className={ns("content cozy")}>
                  This kind of "non-outliving pointer" is everywhere. Some examples:
                </div>
                <ul className={ns("content cozy")}>
                  <li className={ns()}>A PhoneCall points to two Accounts. The PhoneCall shouldn't outlive the Accounts; we should delete the PhoneCall before deleting either Account.</li>
                  <li className={ns()}>In a graph, an edge points to its nodes. The edge shouldn't outlive the nodes, we should delete the edge before deleting any of its nodes.</li>
                  <li className={ns()}>A HandShake should only exist while the two Hands exist.</li>
                </ul>
                <div className={ns("content cozy")}>
                  This pointer, which shouldn't outlive what it's pointing to, may seem oddly familiar to many of us: SQL has them! {this.noteAnchor("604")}
                </div>
                <div className={ns("content cozy")}>
                  In SQL, a foreign key constraint is a reference that cannot outlive the object (otherwise, it aborts the current transaction).
                </div>
                <div className={ns("content cozy")}>
                  For that reason, we call this kind of pointer a <b>constraint reference</b>.  {this.noteAnchor("950")}
                </div>

                <div className={ns("content cozy")}>
                  We've used constraint references in C++! {this.noteAnchor("engines")} We simply:
                </div>
                <ul className={ns("content cozy")}>
                  <li>Wrapped {incode("shared_ptr")} in a class called {incode("owning_ptr")} which uses move semantics like {incode("unique_ptr")} and, when destroyed, checks the ref count to assert {this.noteAnchor("544")} that it's the last pointer to the object.</li>
                  <li>Made another wrapper around {incode("shared_ptr")} called {incode("constraint_ptr")}.</li>
                  <li>In release mode, compiled {incode("owning_ptr")} to a {incode("unique_ptr")}, and compiled {incode("constraint_ptr")} to a raw pointer.</li>
                </ul>
                <div className={ns("content cozy")}>
                  We fell in love with the approach instantly:
                </div>
                <ul className={ns("content cozy")}>
                  <li>It was <b>memory safe!</b> We never had a use-after-free once we switched to constraint references.</li>
                  <li>It was <b>conservative!</b> In development mode, we couldn't even <b>make</b> pointers dangle, much less dereference them. It caught risky behavior much earlier and made it extremely unlikely to have unsafe behavior in release mode.</li>
                  <li>It was <b>zero-cost!</b> They compiled to a unique_ptr and raw pointers, so there was no extra overhead in release mode.</li>
                  <li>It was <b>easy!</b> We could alias {this.noteAnchor("alias")} with freedom, and most of our pointers didn't outlive what they were pointing to anyway, so there was no learning curve to struggle against!</li>
                </ul>

                <div className={ns("content cozy")}>
                  With raw pointers, if someone deletes the object your raw pointer is pointing to, you won't see the problem until much later, when you try and dereference it. Constraint refs answer the question "who destroyed that object I'm pointing to?" much sooner; {this.noteAnchor("735")} we get a nice debugger pause or stack trace when someone accidentally frees what we're pointing at.
                </div>

                <div className={ns("content cozy")}>
                  To summarize, we can get speed and memory safety with ease by, when developing and testing, making the program halt when we free an object that any constraint reference is pointing at.
                </div>


                <a name="constraintbehaviormodes"></a>
                <h4 className={ns()}>Constraint Behavior Modes</h4>

                <div className={ns("content cozy")}>
                  <b>Normal Mode</b> is used in development and testing, where we halt the program when we accidentally free an object that a constraint reference is pointing at.
                </div>

                <div className={ns("content cozy")}>
                  <b>Fast Mode</b> is used for release, and compiles the references down to raw pointers.
                </div>

                <div className={ns("content cozy")}>
                  If someone prefers absolute safety, then they could use <b>Resilient Mode</b> for release, where we compile {incode("constraint_ptr")} to use a {incode("weak_ptr")} internally, and it will halt the program when we try to dereference a freed object instead. This is similar to running a program with Valgrind or ASan.
                </div>

                <div className={ns("content cozy")}>
                  Unfortunately, C++'s {incode("shared_ptr")} and {incode("weak_ptr")} use atomic ref-counting under the hood, which would make these new constraint references very slow.
                </div>

                <div className={ns("content cozy")}>
                  Luckily, Vale's region isolation allows Normal Mode and Resilient Mode to use non-atomic ref counting, which is much faster. {this.noteAnchor("rorc")} {this.noteAnchor("nocycles")}
                </div>

                <div className={ns("content cozy")}>
                  Fast Mode could be useful for high performance computing like games, and areas where we have other measures for safety, like webassembly or other sandboxes. Vale's Resilient Mode is still incredibly fast and has zero unsafety, which would make it perfect for use in servers and apps.
                </div>


                <a name="emergingpatterns"></a>
                <h3 className={ns()}>Emerging Patterns</h3>


                <div className={ns("content cozy")}>
                  We coded in this style for years, to see how far constraint refs could go. Whenever we reached for {incode("shared_ptr")}, we stopped, and pondered if there was a way to solve the problem with single ownership.
                </div>
                <div className={ns("content cozy")}>
                  We suddenly started discovering certain recurring patterns, like nuggets of gold, deep in the mines.
                </div>

                <a name="clasp"></a>
                <h4 className={ns()}>Clasp</h4>

                <div className={ns("content splitter")}>
                  <div className={ns("half")}>
                    <div className={ns("content cozy")}>
                      One pattern was the <b>clasp pattern</b>, which solved a certain problem with callbacks.
                    </div>
                    <div className={ns("content cozy")}>
                      Imagine we have a Network class, shown here.
                    </div>
                    <div className={ns("content cozy")}>
                      Let's say we had a class named {incode("Thing")}, whose {incode("doRequest")} method would say {incode("network->request(\"vale.dev\", this);")}
                    </div>
                    <div className={ns("content cozy")}>
                      Wait, danger lurks!
                    </div>
                    <div className={ns("content cozy")}>
                      If {incode("this")} (the {incode("Thing")}) is destroyed before the response comes back, then {incode("Network")} would call into a dangling pointer and crash!
                    </div>

                    <div className={ns("content cozy")}>
                      We <i>almost</i> concluded that we needed some shared ownership acrobatics for memory safety here. {this.noteAnchor("512")}
                    </div>

                  </div>
                  <div className={ns("half")}>

<pre className="cppSnippet root"><div className="cppSnippet header">C++</div><code className="cpp">
{`class INetworkCallback {
public:
  virtual void handleResponse(
    const std::string& resp) = 0;
  virtual ~INetworkCallback() = default;
};
class Network {
public:
  void request(
    const std::string& url,
    INetworkCallback* callback)
  { ... }
};
`}
</code></pre>

                    <Snippet header="Vale">
{/*
interface INetworkCallback {
  fn handleResponse(&this, resp Str);
  fn drop(this);
}
struct Network {
  fn request(
      &this,
      url Str,
      callback &!INetworkCallback)
  { ... }
}

*/}

<span className="Prog"><span className="Interface">interface <span className="StructName">INetworkCallback</span> &#123;<br />  <span className="Fn">fn <span className="FnName">handleResponse</span><span className="Params">(<span className="Pat"><span className="Lend">&</span><span className="Capture"><span className="CaptureName">this</span></span></span>, <span className="Pat"><span className="Capture"><span className="CaptureName">resp</span></span> <span className="Typ">Str</span></span>)</span>;</span><br />  <span className="Fn">fn <span className="FnName">drop</span><span className="Params">(<span className="Pat"><span className="Capture"><span className="CaptureName">this</span></span></span>)</span>;</span><br />&#125;</span><br /><span className="Struct">struct <span className="StructName">Network</span> <span className="Membs">&#123;<br />  <span className="Fn">fn <span className="FnName">request</span><span className="Params">(<br />      <span className="Pat"><span className="Lend">&!</span><span className="Capture"><span className="CaptureName">this</span></span></span>, {this.noteAnchor("bang")}<br />      <span className="Pat"><span className="Capture"><span className="CaptureName">url</span></span> <span className="Typ">Str</span></span>,<br />      <span className="Pat"><span className="Capture"><span className="CaptureName">callback</span></span> <span className="Ownership">&!<span className="Typ">INetworkCallback</span></span></span>)</span><br />  <span className="Block">&#123; <span className="Lookup">...</span> &#125;</span></span><br />&#125;</span></span><br /></span>

                    </Snippet>
                  </div>
                </div>


                <img style={{float: "right", width: "308px", height: "159px"}} src={claspsvg}/>

                <div className={ns("content cozy")}>
                  Instead, we made two tiny classes, {incode("Request")} and {incode("RequestHandle")}.
                </div>
                <div className={ns("content cozy")}>
                  Each had only a pointer to the other. {incode("Thing")} owned one, {incode("Network")} owned the other.
                </div>
                <div className={ns("content cozy")}>
                  When one was destroyed, it would reach into the other to null out the pointer, thus severing the connection.
                </div>
                <div className={ns("content")}>
                  This pattern of having two mutual constraint references was so common that we gave it a name: the <b>clasp</b> pattern. It obviated a vast swath of our {incode("shared_ptr")} usage.
                </div>


                <div className={ns("content cozy")}>
                  We iterated on it, simplified it, and even made a one-to-many version, which was so useful that we promoted it to its own reference type, the <b>weak reference.</b>
                </div>

                <a name="weakreferences"></a>
                <h4 className={ns()}>Weak Reference</h4>

                <div className={ns("content cozy")}>
                  Sometimes, we want a pointer to outlive what it points to.
                </div>
                <div className={ns("content cozy")}>
                  For example, a missile launched by a spaceship should keep flying, even if its targeted asteroid disappears.
                </div>

                <div className={ns("content cozy")}>
                  We can use a <b>weak reference</b> for this. {this.noteAnchor("weakrefimpl")}
                </div>
                <div className={ns("content cozy")}>
                  Note that this is very different from C++'s {incode("weak_ptr")}:
                </div>
                <ul className={ns("content cozy")}>
                  <li>When you lock a {incode("weak_ptr")}, you get a {incode("shared_ptr")} which will delay destruction and extend the lifetime of the object if the other {incode("shared_ptr", "s")} disappear.</li>
                  <li>When you lock a weak reference, you get a constraint reference, which will halt the program if the owning reference disappears.</li>
                </ul>


                <a name="simplification"></a>
                <h3 className={ns()}>Simplification</h3>

                <div className={ns("content cozy")}>
                  In our quest, single ownership unexpectedly solved a major recurring problem.
                </div>
                <div className={ns("content cozy")}>
                  We previously had a system where a {incode("shared_ptr", "'d")} object's destructor would remove it from the display when the last reference to it disappeared. <b>This was a terrible thing;</b> Every month, there would be a fresh bug saying "I hit the delete button, but the thing is still in the view!" and it'd take forever to figure out "who is keeping my object alive?" {this.noteAnchor("519")}
                </div>
                <div className={ns("content cozy")}>
                  The ironic part was that we <b>knew</b> who the owner should be. We knew the exact line that <i>should have</i> had the last reference... {this.noteAnchor("942")} but apparently, it wasn't. Somewhere, another reference was preventing the destructor call.
                </div>
                <div className={ns("content cozy")}>
                  This problem evaporated, because constriant references would notify us of the problem much earlier. {this.noteAnchor("diagnose")}
                </div>

                <a name="surprise"></a>
                <h3 className={ns()}>Surprise!</h3>

                <div className={ns("content cozy")}>
                  We were new to this way of thinking, so we expected that maybe a quarter of our references could become constraint refs. We were shocked when we were able to get rid of <i>every single</i> raw pointer and {incode("shared_ptr")}, and make it into either a constraint ref, or occasionally a weak ref. {this.noteAnchor("532")}
                </div>
                <div className={ns("content cozy")}>
                  We didn't know it at the time, but we had found the key to unlock the next steps for RAII. Below, we explain how Vale and a hypothetical C++++ could harness this new freedom.
                </div>


                <a name="parameters"></a>
                <h3 className={ns()}>Language Implications: Destructor Parameters!</h3>

                <div className={ns("content cozy")}>
                  Unexpectedly, getting rid of shared ownership made destructor parameters possible!
                </div>
                <div className={ns("content cozy")}>
                  Let's back up a step and talk about {incode("shared_ptr")}. Anyone who has a {incode("shared_ptr<X>")} might be the unlucky one to call {incode("X", "s")} destructor. This is why destructors don't have parameters: every time you let go of a {incode("shared_ptr")}, you would have to somehow obtain the right arguments to pass them in to the destructor, somehow. {this.noteAnchor("515")} Owning and constraint references are different: you know exactly who should be calling the destructor.
                </div>
                <div className={ns("content cozy")}>
                  There were other reasons C++ couldn't have destructor parameters, but they all have easy solutions from a language design standpoint:
                </div>
                <ul className={ns("content")}>
                  <li className={ns()}>Exceptions: We need to call an object's destructor automatically when an exception is in flight, where do we get the parameters for that?</li>
                  <ul>
                    <li className={ns()}>We don't use exceptions anyway! In fact, entire companies' style guides prohibit them. Use Result instead. {this.noteAnchor("exceptions")}</li>
                  </ul>
                  <li className={ns()}>If we implicitly call the destructor at the end of a block, how do we know what parameters to pass in?</li>
                  <ul>
                    <li className={ns()}>If the destructor requires parameters, don't implicitly call it, and require us to explicitly call its destructor! {this.noteAnchor("247")} {this.noteAnchor("777")}</li>
                  </ul>
                  <li className={ns()}>If we have a {incode("vector<MyObj>")}, how would {incode("~vector()")} know what to pass into {incode("~MyObj()")}?</li>
                  <ul>
                    <li className={ns()}>Destructors can have parameters now, so pass a "consumer" functor {incode("std::function<void(std::unique_ptr<MyObj>)>)")} (or {incode("fn(MyObj)Void")}), and the vector could give each element to it to destroy.</li>
                  </ul>
                </ul>


                <div className={ns("content splitter")}>
                  <div className={ns("half")}>
                    <div className={ns("content cozy")}>
                      Since we could have destructor parameters, we could improve our {incode("Transaction")} class, shown to the right.
                    </div>
                    <div className={ns("content cozy")}>
                      Notice how we have to call {incode("setRollbackMode")} before the destructor.
                    </div>
                    <div className={ns("content")}>
                      We'd forget that all the time!
                    </div>
                    <div className={ns("content cozy")}>
                      However, now that we have destructor parameters, we can get rid of {incode("setRollbackMode")}, get rid of {incode("mode_")}, and use this destructor instead:
                    </div>
                    <div className={ns("content cozy")}>
<pre className="cppSnippet root"><div className="cppSnippet header">C++++</div><code className="cpp">
{`
virtual ~Transaction(RollMode mode) {
  if (!committed_) {
    /* use mode to roll back */
  }
}

...

// invoke destructor
~transaction(TUMBLE);
`}
</code></pre>
                    </div>
                    <div className={ns("content cozy")}>
                      We've seen this pattern everywhere: since destructors couldn't take parameters, we had to hack them into members. Now we dont have to!
                    </div>
                  </div>
                  <div className={ns("half")}>
<pre className="cppSnippet root"><div className="cppSnippet header">C++</div><code className="cpp">
{`class Transaction {
public:
  ReadResult read(ReadQuery query);

  TransactionResult setRollbackMode(
      RollMode mode) {
    mode_ = mode;
  }

  void commit() {
    ...
    committed_ = true;
  }

  virtual ~Transaction() {
    if (!committed_) {
      /* use mode_ to roll back */
    }
  }

private:
  bool committed_;
  RollMode mode_;
};

...

transaction->setRollbackMode(TUMBLE);
// invoke destructor
transaction = nullptr;
`}
</code></pre>
                  </div>
                </div>


                <a name="overloads"></a>
                <h3 className={ns()}>Destructor Overloads</h3>


                <div className={ns("content splitter cozy")}>
                  <div className={ns("half")}>
                    <div className={ns("content cozy")}>
                      Since we don't have shared ownership anymore, we no longer need a single zero-arg destructor, and we can add destructor overloads!
                    </div>
                    <div className={ns("content cozy")}>
                      Notice how the destructors now have names.
                    </div>
                    <div className={ns("content cozy")}>
                      Recall how RAII is where "the compiler will make sure that we XYZ". Here, the compiler will make sure that someone holding a Transaction <b>either</b> calls {incode("commit")} or {incode("rollback")}.
                    </div>
                  </div>
                  <div className={ns("half")}>
<pre className="cppSnippet root"><div className="cppSnippet header">C++++</div><code className="cpp">
{`class Transaction {
public:
  ReadResult read(ReadQuery query);

  virtual ~commit() { ... }

  virtual ~rollback(RollMode mode)
  { ... }
};

// To commit:
transaction->~commit();
// To rollback:
transaction->~rollback(TUMBLE);`}
</code></pre>
                  </div>
                </div>

                <div className={ns("content splitter cozy")}>
                  <div className={ns("half")}>
                    <div className={ns("content cozy")}>
                      Our hypothetical C++++ syntax is starting to show some cracks, so lets see this in Vale.
                    </div>
                    <div className={ns("content")}>
                      Here, {incode("commit")} and {incode("rollback")} are just regular methods that take an owning {incode("this")} and happen to free it (with {incode("destruct")}). {this.noteAnchor("1012")}
                    </div>
                    <div className={ns("content")}>
                      (That's all a destructor is, when you think about it.)
                    </div>                
                    <div className={ns("content cozy")}>
                      This isn't just useful for transactions. Imagine a {incode("Future<T, E>")} class with two destructors:
                      <ul>
                        <li>{incode("void ~resolve(T successValue);")}</li>
                        <li>{incode("void ~reject(E errorValue);")}</li>
                      </ul>
                      Now, we can never accidentally drop a future without resolving or rejecting it first!
                    </div>

                  </div>
                  <div className={ns("half")}>
                    <Snippet header="Vale">
{/*
struct Transaction {
  fn read(&!this, query ReadQuery)
  ReadResult { ... }

  fn commit(this) { (ownthis)
    ...;
    destruct this;
  }

  fn rollback(this, mode RollMode) {
    ...
    destruct this;
  }
}

fn main() {
// To commit:
transaction^.commit(); (caret)
// To rollback:
transaction^.rollback(TUMBLE);
}

*/}

<span className="Prog"><span className="Struct">struct <span className="StructName">Transaction</span> <span className="Membs">&#123;<br />  <span className="Fn">fn <span className="FnName">read</span><span className="Params">(<span className="Pat"><span className="Lend">&!</span><span className="Capture"><span className="CaptureName">this</span></span></span>, <span className="Pat"><span className="Capture"><span className="CaptureName">query</span></span> <span className="Typ">ReadQuery</span></span>)</span><br />  <span className="Typ">ReadResult</span> <span className="Block">&#123; <span className="Lookup">...</span> &#125;</span></span><br /><br />  <span className="Fn">fn <span className="FnName">commit</span><span className="Params">(<span className="Pat"><span className="Capture"><span className="CaptureName">this</span></span></span>)</span> <span className="Block">&#123;  {this.noteAnchor("ownthis")}<br />    <span className="Lookup">...</span>;<br />    <span className="Call"><span className="CallLookup">destruct</span> <span className="Lookup">this</span></span>;<span className="W"></span><br />  &#125;</span></span><br /><br />  <span className="Fn">fn <span className="FnName">rollback</span><span className="Params">(<span className="Pat"><span className="Capture"><span className="CaptureName">this</span></span></span>, <span className="Pat"><span className="Capture"><span className="CaptureName">mode</span></span> <span className="Typ">RollMode</span></span>)</span> <span className="Block">&#123;<br />    <span className="Call"><span className="Lookup">...</span><br />    <span className="CallLookup">destruct</span> <span className="Lookup">this</span></span>;<span className="W"></span><br />  &#125;</span></span><br />&#125;</span></span><br /><br />

<span className="Comment">// To commit:</span><br /><span className="Call"><span className="Lookup">transaction</span>^.<span className="CallLookup">commit</span>()</span>; {this.noteAnchor("caret")}<br /><span className="Comment">// To rollback:</span><br /><span className="Call"><span className="Lookup">transaction</span>^.<span className="CallLookup">rollback</span>(<span className="Lookup">TUMBLE</span>)</span>;<span className="W"></span>


</span>

                    </Snippet>
                  </div>
                </div>



                <a name="returns"></a>
                <h3 className={ns()}>Destructor Returns</h3>

                <div className={ns("content splitter")}>
                  <div className={ns("half")}>
                    <div className={ns("content cozy")}>
                      A common C++ wish is to be able to return things from destructors.
                    </div>
                    <div className={ns("content cozy")}>
                      However, a {incode("shared_ptr<T>")} would just throw away the {incode("~T()", "'s")} return value anyway. So why even allow one?
                    </div>
                    <div className={ns("content cozy")}>
                      Now that we don't have shared ownership, we can start returning values from destructors.
                    </div>
                  </div>
                  <div className={ns("half")}>
<pre className="cppSnippet root"><div className="cppSnippet header">C++++</div><code className="cpp">
{`class Transaction {
public:
  ReadResult read(ReadQuery query);

  virtual void ~commit() { ... }

  virtual RollbackStatus ~rollback(
      RollMode mode) {
    ...;
    return SUCCESS;
  }
};
`}
</code></pre>
                  </div>
                </div>

                <div className={ns("content cozy")}>
                  As you use this kind of improved RAII more, you start to see opportunities for it <i>everywhere</i>.
                </div>

                <div className={ns("content cozy")}>
                  Imagine if {incode("std::thread")}'s destructor could return the result of a thread's calculation!
                </div>

                <div className={ns("content cozy")}>
                  Imagine a {incode("std::function", "-like")} class where its destructor called the underlying lambda and destroyed {incode("this")} at the same time, thus <b>guaranteeing it could only be called once.</b> The possibilities are endless!
                </div>

                <div className={ns("content cozy")}>
                  Recently, C++17 added the <a href="https://en.cppreference.com/w/cpp/language/attributes/nodiscard">[[nodiscard]]</a> attribute, which was useful for functions like {incode("Result<ImportantResult, ImportantError> doSomethingImportant();")}, to prevent the user from ignoring the {incode("Result")}.
                </div>
                <div className={ns("content cozy")}>
                  C++ wouldn't have needed a special attribute if it had this kind of improved RAII: Simply don't provide a default destructor, and provide other destructors, with return values:
                  <ul>
                    <li>ImportantResult ~getResult();</li>
                    <li>ImportantError ~getError();</li>
                    <li>void ~printResult();</li>
                  </ul>
                </div>

                <a name="nondestroying"></a>
                <h3 className={ns()}>Non-destroying Destructors</h3>

                <div className={ns("content cozy")}>
                  We might want to return a object to a free-list, instead of {incode("free()", "ing")} it.
                </div>
                <div className={ns("content cozy")}>
                  Normally, we would need to use an allocator. But instead, we could take in the free-list as a parameter, and <b>move</b> {incode("this")} into it.
                </div>
                <div className={ns("content cozy")}>
                  This is impossible in C++'s syntax (we don't get to move {incode("this")}), {this.noteAnchor("1000")} so we'll use Vale syntax:
                </div>


                <div className={ns("content cozy")}>
                  <Snippet header="Vale">
{/*struct Transaction {
  fn read(&!this, query ReadQuery) ReadResult { ... }

  fn commit(this, list &TransactionList) {
    ...;
    list.reclaim(this); // move this into a different function
  }

  fn rollback(this, list &TransactionList, mode RollMode) RollbackStatus {
    ...;
    list.reclaim(this); // move this into a different function
    ret SUCCESS;
  }
}*/}

<span className="Prog"><span className="Struct">struct <span className="StructName">Transaction</span> <span className="Membs">&#123;<br />  <span className="Fn">fn <span className="FnName">read</span><span className="Params">(<span className="Pat"><span className="Lend">&!</span><span className="Capture"><span className="CaptureName">this</span></span></span>, <span className="Pat"><span className="Capture"><span className="CaptureName">query</span></span> <span className="Typ">ReadQuery</span></span>)</span> <span className="Typ">ReadResult</span> <span className="Block">&#123; <span className="Lookup">...</span> &#125;</span></span><br /><br />  <span className="Fn">fn <span className="FnName">commit</span><span className="Params">(<span className="Pat"><span className="Capture"><span className="CaptureName">this</span></span></span>, <span className="Pat"><span className="Capture"><span className="CaptureName">list</span></span> <span className="Ownership">&<span className="Typ">TransactionList</span></span></span>)</span> <span className="Typ"></span> <span className="Block">&#123;<br />    <span className="Lookup">...</span>;<br />    <span className="Call"><span className="Lookup">list</span>.<span className="CallLookup">reclaim</span>(<span className="Lookup">this</span>)</span>;<span className="W"></span> <span className="Comment">// move this into a different function</span><br />  &#125;</span></span><br /><br />  <span className="Fn">fn <span className="FnName">rollback</span><span className="Params">(<span className="Pat"><span className="Capture"><span className="CaptureName">this</span></span></span>, <span className="Pat"><span className="Capture"><span className="CaptureName">list</span></span> <span className="Ownership">&<span className="Typ">TransactionList</span></span></span>, <span className="Pat"><span className="Capture"><span className="CaptureName">mode</span></span> <span className="Typ">RollMode</span></span>)</span> <span className="Typ">RollbackStatus</span> <span className="Block">&#123;<br />    <span className="Lookup">...</span>;<br />    <span className="Call"><span className="Lookup">list</span>.<span className="CallLookup">reclaim</span>(<span className="Lookup">this</span>)</span>; <span className="Comment">// move this into a different function</span><br />    <span className="Ret">ret <span className="Lookup">SUCCESS</span>;</span><br />  &#125;</span></span><br />&#125;</span></span><br /></span>

                    </Snippet>
                </div>

                <a name="whatevenisadestructor"></a>
                <h3 className={ns()}>What even <i>is</i> a destructor?</h3>


                <div className={ns("content cozy")}>
                  By now you've noticed that Destructors can have overloads, take parameters, return values, and even decline to destroy {incode("this")}! There's hardly anything that separates them from regular functions.
                </div>
                <div className={ns("content cozy")}>
                  In fact, in Vale, the whole "destructor" side of the language is built from one small rule:
                </div>
                <div className={ns("content cozy")} style={{padding: "0 16px"}}>
                  "If an owning reference goes out of scope, call {incode(".drop()")} on it. If no public {incode(".drop()")} exists, give a compile error."
                </div>
                <div className={ns("content cozy")}>
                  In one fell swoop, by removing our dependence on {incode("shared_ptr")}, we had taken one of the thorniest corners of C++ and completely simplified it away.
                </div>


                <a name="raiipastpresentfuture"></a>
                <h3 className={ns()}>RAII: Past, Present, Future</h3>


                <div className={ns("content cozy")}>
                  Using constraint references, we unleashed the power of single ownership and found the next steps for RAII:
                </div>

                <ul className={ns("content")}>
                  <li className={ns()}>Multiple destructors: Mark errors handled in different ways, rollback or commit a transaction, end things how you want!</li>
                  <li className={ns()}>Destructor parameters: Resolve or reject futures with certain values, set a priority for a {incode("close")} operation, you name it!</li>
                  <li className={ns()}>Destructor return values: Return error status, return the result of a thread's calculation, whatever you need!</li>
                  <li className={ns()}>Non-destroying destructors: Reuse objects, give out ownership without risking freeing, sky's the limit!</li>
                </ul>

                <div className={ns("content cozy")}>
                  With C++'s existing RAII, destructors can do very little. With improved RAII, an object can offer multiple options for destructors, each with return values and parameters.
                </div>

                <div className={ns("content cozy")}>
                  Someday, we might be able to add these features to C++, but before that can happen, we need to show the world that <b>single ownership is powerful, and we don't need shared ownership as much as we thought</b>. {/*{this.noteAnchor("comingsoon")}*/}
                </div>

                <div className={ns("content")}>
                  We made Vale for exactly that reason. It's still in alpha, so if you want to help bring improved RAII into the world, come by the <a href="http://reddit.com/r/vale">r/Vale</a> subreddit or the <a href="https://discord.gg/SNB8yGH">Vale discord</a>! {this.noteAnchor("help")}
                </div>

                <div className={ns("content")}>
                  This isn't even the end of the single ownership saga! In the coming weeks, we'll explain how this consistent single ownership approach enables other unique capabilities in Vale, such as cross-compilation, the <a href="/ref/regions">region borrow checker</a>, and lightning fast memory management.
                </div>

                <div className={ns("content cozy")}>                
                  Until then, we want to hear from you! We'd love to hear your thoughts on single ownership, RAII, Vale, and any ideas you have! Come share your thoughts in the <a href="https://www.reddit.com/r/vale/comments/hry80p/the_next_steps_for_single_ownership_and_raii/">Reddit post</a>, the <a href="https://news.ycombinator.com/item?id=23865674">Hacker News post</a>, and come join the <a href="http://reddit.com/r/vale">r/Vale</a> subreddit and the <a href="https://discord.gg/SNB8yGH">Vale discord</a>!
                </div>

              </div>

              <div className={ns("afterword")}>

                <a name="afterword"></a>
                <h3 className={ns("noline cozy")}>Afterword: Rust, RAII, and Constraint Refs</h3>

                <div className={ns("content cozy")}>
                  One can't have an article about RAII and speed and safety without mentioning Rust!
                </div>

                <div className={ns("content cozy")}>
                  Rust makes a beautiful promise: speed and memory safety, by doing this kind of reference lifetime enforcement at compile-time! The holy grail of memory management.
                </div>

                <div className={ns("content cozy")}>
                  Rust is amazing for certain purposes, but nothing is perfect, and Rust's compile-time memory safety comes at a cost: <b>we can no longer alias freely,</b> and we're forced into less efficient workarounds. Other memory safe languages like Java allow you to have as many non-const references to an object as you want, but Rust can't make it's compile-time guarantees when you have any references (even const ones!) to an object when someone else might have a non-const reference to it.
                </div>

                <div className={ns("content cozy")}>
                  For example: if you have a list of Airports and a list of Planes, a Plane can't have a reference to its source and destination airports; if we did, Rust's "mutability xor aliasability" rule prevents us from ever modifying or removing any airports (and adding them, because Vec's resizing could move the airports). {this.noteAnchor("546b")}
                </div>
                <div className={ns("content cozy")}>
                  But, the plane <i>has</i> to refer to those airports, somehow! Rust offers some workarounds, but they aren't free:
                </div>

                <ul className={ns("content cozy")}>
                  <li className={ns()}>{incode("unsafe")} keyword: discards safety guarantees. {this.noteAnchor("409")}</li>
                  <li className={ns()}>{incode("Arc")}/{incode("Rc")}:</li>
                  <ul className={ns("content cozy")}>
                    <li className={ns()}>Ref-counting performance overhead.</li>
                    <li className={ns()}>Prevents all our RAII benefits, for the same reason as {incode("shared_ptr")}.</li>
                  </ul>
                  <li className={ns()}>Use a generational index {incode("(i64, i64)")} into a {incode("Vec<(i64, T)>")} {this.noteAnchor("1217")} holding all the objects.</li>
                  <ul className={ns("content cozy")}>
                    <li className={ns()}>Resizing cost (fortunately amortized).</li>
                    <li className={ns()}>An i64 generation per-object.</li>
                    <li className={ns()}>An i64 generation per-reference.</li>
                    <li className={ns()}>The Vec's usual wasted space, which is 1-2x the <i>highest</i> number of {incode("(i64, T)")} elements we've had in the past. {this.noteAnchor("206")}</li>
                    <li className={ns()}>Prevents RAII, because it doesn't destroy the object immediately when the <b>owning index</b> disappears. For example, a binary tree here would be a {incode("Vec<(i64, Node)>")}, where each node is owned by the {incode("Vec")}, <b>not by the parent node</b>. Who knows when the Vec would disappear and call {incode("drop")} on the elements. {this.noteAnchor("406")}</li>
                    <li className={ns()}>Requires us to pass the Vec as a parameter to wherever we want to access the object.</li>
                  </ul>
                </ul>

                <div className={ns("content cozy")}>
                  In other words, Rust's compile-time safety guarantee has a runtime cost.
                </div>

                <div className={ns("content")}>
                  And, unless we use {incode("unsafe")}, we don't get our RAII benefits.
                </div>

                <div className={ns("content cozy")}>
                  Let's compare the various strategies. Note that these are <b>only our initial estimations</b>; we'll be benchmarking once Vale has RC elision.
                </div>

                <table className={ns("comparison content cozy")}>
                  <thead>
                    <tr className={ns()}>
                      <th className={ns()}></th>
                      <th width="15%" className={ns()}>Safe</th>
                      <th className={ns()}>Speed</th>
                      <th width="25%" className={ns()}>Memory</th>
                      <th width="10%" className={ns()}>RAII</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className={ns()}>
                      <th className={ns()}>Rust w/ Rc</th>
                      <td className={ns("good")}>Yes</td>
                      <td className={ns("bad")}>Rc Overhead + Mispredictions {this.noteAnchor("1040")}</td>
                      <td className={ns("bad")}>16b/obj + 8b/ref + Cycle leaks</td>
                      <td className={ns("bad")}>No</td>
                    </tr>
                    <tr className={ns()}>
                      <th className={ns()}>Rust w/ IDs</th>
                      <td className={ns("good")}>Yes</td>
                      <td className={ns("meh")}>Resizing (amortized) {this.noteAnchor("212")}</td>
                      <td className={ns("bad")}>8b/obj + 8b/ref + 2*MaxSize</td>
                      <td className={ns("meh")}>Some- times</td>
                    </tr>
                    <tr className={ns()}>
                      <th className={ns()}>Rust&nbsp;w/&nbsp;Unsafe</th>
                      <td className={ns("bad")}>No</td>
                      <td className={ns("good")}>Fast</td>
                      <td className={ns("good")}>Free</td>
                      <td className={ns("good")}>Yes</td>
                    </tr>
                    <tr className={ns()}>
                      <th className={ns()}>Vale, Fast Mode {this.noteAnchor("1046")}</th>
                      <td className={ns("bad")}>No</td>
                      <td className={ns("good")}>Fast</td>
                      <td className={ns("good")}>Free</td>
                      <td className={ns("good")}>Yes</td>
                    </tr>
                    <tr className={ns()}>
                      <th className={ns()}>Vale, Normal / Resilient Mode</th>
                      <td className={ns("good")}>Yes</td>
                      <td className={ns("meh")}>Optimized Rc<br/>Overhead {this.noteAnchor("elide")}</td>
                      <td className={ns("bad")}>8b for all objs {this.noteAnchor("1041")}</td>
                      <td className={ns("good")}>Yes</td>
                    </tr>
                    <tr className={ns()}>
                      <th className={ns()}>Vale w/ Imm Region Borrowing</th>
                      <td className={ns("good")}>Yes</td>
                      <td className={ns("good")}>Fast</td>
                      <td className={ns("bad")}>8b for all objs</td>
                      <td className={ns("good")}>Yes</td>
                    </tr>
                  </tbody>
                </table>

                <ul className={ns("content cozy")}>
                  <li className={ns()}><b>Borrow w/ Rc</b>: Using the borrow checker, with {incode("Rc<T>")} as a fall-back. Assuming an Rc control block of 8b share count and 8b weak count.</li>
                  <li className={ns()}><b>Borrow w/ IDs</b>: Using the borrow checker, generational IDs instead of aliasing.</li>
                  <li className={ns()}><b>Borrow w/ Unsafe</b>: Using the borrow checker, with unsafe as a fall-back.</li>
                  <li className={ns()}><b>C Refs, Fast</b>: Fast mode, where constraint refs are compiled to raw pointers.</li>
                  <li className={ns()}><b>C Refs, Resilient</b>: Constraint refs keep objects alive, only panic on dereferencing.</li>
                  <li className={ns()}><b>C Refs, Normal</b>: Dangling reference halts the program.</li>
                  <li className={ns()}><b>Vale w/ Imm Region Borrowing</b>: Resilient/Normal mode, using immutable region borrowing. {this.noteAnchor("immrb")}</li>
                </ul>

                <div className={ns("content cozy")}>
                  Rust and Vale both accomplish speed and safety, but in different ways and with different tradeoffs. {this.noteAnchor("436")} Comparing the average Vale program to the average Rust program, each with a mix of their strategies:
                </div>
                <ul className={ns("content cozy")}>
                  <li className={ns()}>Vale's Normal and Resilient modes are safer, because the Rust program has parts that are {incode("unsafe")}. They could be faster or slower, depending on how many IDs and {incode("Rc")} the Rust program used to get around the borrow checker.</li>
                  <li className={ns()}>Vale's Fast Mode uses less memory and is probably faster, because it doesn't suffer the {incode("Rc")} and {incode("Vec")}+ID overhead. Fast Mode could be less safe, depending on test coverage and how much {incode("unsafe")} there is in the Rust program.</li>
                  <li className={ns()}>Vale could be easier, because it allows aliasing freely, and one can opt-out of constraint refs to use weak refs for any particular case at any time.</li>
                </ul>

                <h4>Improved RAII in Rust</h4>

                <div className={ns("content cozy")}>
                  The borrow checker forces us out of RAII in some circumstances, such as in the binary tree example above. However, if that wasn't an issue, then Rust could support this kind of improved RAII!
                </div>
                <div className={ns("content cozy")}>
                  It would need to add a {incode("!Drop")} trait, which would signal the compiler that the user <i>can't</i> automatically drop this object, that they instead have to manually call something to drop it.
                </div>
                <div className={ns("content")}>
                  By "something", we don't necessarily mean a destructor. Like Vale, Rust is able to move {incode("this")} into a method call, and that serves the same purpose as the improved destructors mentioned above.
                </div>
              </div>

            </div>

            <div className={ns("margin")}>

              <div className={ns("toc-container")}>

                <div className={ns("c-toc root")}>
                  <b>The Next Steps for Single Ownership and RAII</b>

                  <ul className={ns("c-toc")}>
                    <li>
                      <a href="/blog/next-steps-raii#singleownership">Single Ownership</a>
                    </li>
                    <li>
                      <a href="/blog/next-steps-raii#safehandlingofaliases">Safe Handling of Aliases</a>
                    </li>
                    <ul>
                      <li><a href="/blog/next-steps-raii#constraintreferences">Constraint Reference</a></li>
                      <li><a href="/blog/next-steps-raii#constraintbehaviormodes">Constraint Behavior Modes</a></li>
                    </ul>
                    <li>
                      <a href="/blog/next-steps-raii#emergingpatterns">Emerging Patterns</a>
                    </li>
                    <ul>
                      <li><a href="/blog/next-steps-raii#clasp">Clasp</a></li>
                      <li><a href="/blog/next-steps-raii#weakreferences">Weak Reference</a></li>
                    </ul>
                    <li>
                      <a href="/blog/next-steps-raii#simplification">Simplification</a>
                    </li>
                    <li>
                      <a href="/blog/next-steps-raii#surprise">Surprise!</a>
                    </li>
                    <li>
                      <a href="/blog/next-steps-raii#destructorimplications">Destructor Implications</a>
                    </li>
                    <ul>
                      <li>
                        <a href="/blog/next-steps-raii#parameters">Parameters</a>
                      </li>
                      <li>
                        <a href="/blog/next-steps-raii#overloads">Overloads</a>
                      </li>
                      <li>
                        <a href="/blog/next-steps-raii#returns">Returns</a>
                      </li>
                      <li>
                        <a href="/blog/next-steps-raii#nondestroying">Non-Destroying</a>
                      </li>
                    </ul>
                    <li>
                      <a href="/blog/next-steps-raii#whatevenisadestructor">What even <i>is</i> a destructor?</a>
                    </li>
                    <li>
                      <a href="/blog/next-steps-raii#raiipastpresentfuture">RAII: Past, Present, Future</a>
                    </li>
                    <li>
                      <a href="/blog/next-steps-raii#afterword">Afterword: Rust, RAII, Constraint Refs</a>
                    </li>
                  </ul>
                </div>

                <div className={ns("notes-header")}>
                  <NotesHeader update={this.updateNotesHeaderRect}/>
                </div>
              </div>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="642a">
                RAII stands for Resource Acquisition Is Initialization, which is a fancy way of saying "put that code in a destructor so you can be sure it actually happens."
              </Note>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="604">
                Rust's borrow references also do something like this.
                <div style={{marginTop: "8px"}}>
                  Constraint references have the safety of borrow references, and we can alias them as much as we want!
                </div>
                <div style={{marginTop: "8px"}}>
                  And counter-intuitively, constraint references can sometimes be more efficient when you consider the program as a whole, especially when combined with <a href="/ref/regions">region borrow checking</a>. Keep reading to learn how!
                </div>
              </Note>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="950">
                In 2007, Gel was the first language to incorporate constraint references, described in <a href="https://researcher.watson.ibm.com/researcher/files/us-bacon/Dingle07Ownership.pdf">Ownership You Can Count On</a> as the "alias counting" technique.
              </Note>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="engines">
                According to legend, some C++ game engines already do this.
              </Note>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="544">
                Or, if asserting isn't quite your fancy, there's a mode that pauses and shows a "Continue?" prompt which keeps it alive until the last constraint reference disappears.
              </Note>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="safehandling">
                Some other safe patterns:
                <ul className={ns("content cozy")} style={{marginTop: "8px"}}>
                  <li className={ns()}>Destroying things in the reverse order they were made.</li>
                  <li className={ns()}>Giving a raw pointer to a non-moved local to a function that doesn't let it escape.</li>
                  <li className={ns()}>Giving a raw pointer to a movable local to a function that doesn't let it escape, unless a closure moves it.</li>
                </ul>
              </Note>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="ownthis">
                Notice how {incode("read")} takes a constraint reference ({incode("&!this")}), but the two "destructors" take in an owning reference ({incode("this")}).
              </Note>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="diagnose">
                We have a VM (and soon, a compilation option!) which tells us which constraint references are still pointing at an object when we try to free it.
              </Note>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="help">
                All contributions are welcome! Soon, we're going to:
                <ul className={ns("content cozy")} style={{marginTop: "8px"}}>
                  <li className={ns()}>Write a standard library! (sets, hash maps, lists, etc)</li>
                  <li className={ns()}>Add weak pointers!</li>
                  <li className={ns()}>Finish designing the region borrow checker!</li>
                  <li className={ns()}>Replace the temporary combinator-based parser with a real one!</li>
                  <li className={ns()}>Make syntax highlighters! (VSCode, Sublime, Vim, Emacs, etc)</li>
                  <li className={ns()}>Enable support gdb/lldb for debugging!</li>
                  <li className={ns()}>Add better error reporting!</li>
                  <li className={ns()}>Add a "show all constraint refs" option in debug mode to our LLVM codegen stage!</li>
                </ul>
                If any of this interests you, come join us!
              </Note>


              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="735">
                This can be controlled on a case-by-case basis; if we don't want this, we can use a weak reference instead, explained below.
              </Note>


              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="512">
                We could refactor our codebase to make all our {incode("Thing", "s")} shared, so we could give {incode("Network")} a {incode("shared_ptr<Thing>", "...")} a bit invasive though.
                <div style={{marginTop: "8px"}}>
                  We could give {incode("Network")} a {incode("shared_ptr<ThingRespHandler>")}. In fact, that's what {incode("std::function")} is: a function pointer and a {incode("shared_ptr")} around some arguments.
                </div>
                <div style={{marginTop: "8px"}}>
                  In the end, we didn't need either.
                </div>
              </Note>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="519">
                This is a common complaint in GC'd languages too. An accidental reference way over in some corner of the codebase is keeping my very large object alive and in memory.
                <div style={{marginTop: "8px"}}>
                  We call these "memory leaks". Yes, GC'd languages can have memory leaks!
                </div>
                <div style={{marginTop: "8px"}}>
                  These can also lead to dangerous bugs where network responses or button observers call into objects we thought we got rid of.
                </div>
              </Note>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="532">
                We didn't run into any, but there are some hypothetical cases where one might want shared ownership. Luckily, you can implement shared references with single ownership, as an escape hatch.
              </Note>







              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="942">
                This is common in all languages: we often have a "main" reference to an object.
              </Note>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="immrb">
                Vale's <a href="/ref/regions">region borrow checker</a> often lets us make an entire region of memory temporarily immutable, which completely eliminates counting overhead for references into that region.
              </Note>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="sovsraii">
                "Single ownership" and "RAII" aren't the same thing.
                <div style={{marginTop: "8px"}}>
                  Single ownership is when a single reference controls an object's lifetime.
                </div>
                <div style={{marginTop: "8px"}}>
                  RAII is when we use ownership to make sure something <i>will</i> happen, and in a timely fashion.
                </div>
                <div style={{marginTop: "8px"}}>
                  One can have RAII with shared ownership, but it's risky and more limited, as shown below.
                </div>
              </Note>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="515">
                We could also use a deleter, set up when we create the object, but thats often too early to know what parameters to pass into the destructor.
              </Note>


              {/*<Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="comingsoon" customIcon="empty">
                Coming Soon:
                <ul className={ns("content")} style={{marginTop: "8px"}}>
                  <li className={ns()}>Single Ownership: The Key to LLVM/JVM/CLR/JS Cross Compilation</li>
                  <li className={ns()}>Const Generics and Metaprogramming in Vale</li>
                  <li className={ns()}>Single Ownership + Regions = Ref-Counting Speed</li>
                  <li className={ns()}>Propagating Errors Past Destructors in Vale</li>
                  <li className={ns()}>Unified Variants and Inline Sealed Interfaces</li>
                  <li className={ns()}>Variant Indexing in Vale</li>
                </ul>
              </Note>*/}

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="247">
                Go-style defer blocks can make this even nicer.
              </Note>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="777">
                In Vale, if you use the {incode("%")} operator to propagate errors upwards, it will automatically call {incode(".drop()")} on any local in scope.
                <div style={{marginTop: "8px"}}>
                  However, if you have a local {incode("x")} which doesn't have a zero-arg {incode(".drop()")}, you have to hold onto the error, call the correct destructor for {incode("x")}, and then continue to return the error upwards.
                </div>
              </Note>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="1000">
                Maybe we could make this work in C++ if it allowed us to specify an explicit {incode("this")} parameter, which was wrapped in a {incode("unique_ptr")}. Something like Rust's <a href="https://github.com/rust-lang/rust/issues/44874">Arbitrary Self Types</a>.
              </Note>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="1012">
                Your signature doesn't matter, it's whats inside that counts. What makes you a destructor is whether you free {incode("this")} inside your function, and don't let anyone tell you otherwise!
              </Note>


              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="546b">
                The borrow checker also won't let us do the subcomponents pattern mentioned above, because if one component B has a reference to component A, it effectively freezes A for all time.
              </Note>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="nocycles">
                Constraint references also solve the cycle problem for ref-counting, by enforcing that there are no other references to an object when we let go of its owning reference.
              </Note>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="rorc">
                There are amazing recent advances in optimized ref-counting, such as in <a href="https://aardappel.github.io/lobster/memory_management.html">Lobster's algorithm</a> which optimizes away 95% of ref-counts. Vale also has <a href="/ref/regions">read-only regions</a> and <a href="/ref/regions">bump regions</a>, where ref-counting overhead is reduced to zero.
              </Note>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="409">
                Keep in mind that Rust never promised 100% safety; Rust is about minimizing unsafety and isolating it into very well-marked areas which we can scrutinize more heavily. Some level of unsafety is expected in Rust programs.
              </Note>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="1217">
                This may seem large, but a smaller integer usually doesn't save us anything, because of padding in the {incode("(i64, T)", "s")} inside the Vec.
              </Note>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="206">
                We could instead have a {incode("Vec<(i32, Box<T>)>")}, but that would introduce an extra cache-miss.
              </Note>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="exceptions">
                Exceptions weren't a problem for us, but they prevent this improved RAII just as much as shared ownership does. C++ will need to introduce a no-exceptions mode before it can do improved RAII.
              </Note>



              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="406">
                This could also lead to leaks (in the Java sense of the word), where we forget to clean up a child from the central Vec when its parent is destroyed.
              </Note>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="1046">
                It's worth noting that, in Rust, we can choose which strategy to use per-situation, while in Vale, it's a per-module and per-region compilation option.
              </Note>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="alias">
                To "alias" a pointer means to make another pointer, pointing to the same thing. Memory safety in the presence of aliasing has always been challenging, but constraint references solve it for us.
              </Note>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="elide">
                When a language has reference counting built-in, it can elide out the vast majority of increments and decrements.
              </Note>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="1041">
                The number here (8b) is less than Rust's, but it applies to all objects. In Rust, we pay the cost per object and reference that uses Rc or IDs.
              </Note>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="212">
                Note that if we use boxing like {incode("Vec<(i64, Box<T>)>")} to save memory, we have an additional indirection cost.
              </Note>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="1040">
                RC-backed single ownership can tell the CPU to expect all owning references' decrements to deallocate, and expect all borrow references' decrements to <i>not</i> deallocate.
              </Note>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="whatever">
                In C++, the XYZ is calling the destructor, which is a function that takes no parameters and returns no useful information. We'll show how we can use RAII to make sure we call any of multiple methods which have no such restrictions!
              </Note>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="nounique">
                Vale's default reference is an owning reference, like C++'s {incode("unique_ptr")}.
              </Note>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="nomakeunique">
                In Vale, constructors are called just like any other function, no {incode("new")} or {incode("make_unique")} required.
              </Note>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="dispose">
                Search your Java code for {incode("removeObserver(this)")} and you'll find that most of them are in methods named "dispose", "destroy", "close", etc.
                <div style={{marginTop: "8px"}}>
                  Now imagine if the language could make sure you couldn't forget to call that method! That's RAII.
                </div>
              </Note>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="noget">
                One can think of {incode("&a")} like C++'s {incode("unique_ptr::get")}.
              </Note>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="bang">
                {incode("&")} is a read-only reference, like C++'s {incode("const")}. We use {incode("&!")} to make a non-const reference.
              </Note>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="weakrefimpl">
                C++ weak refs are a bit involved, but feel free to comment and we'll explain how to do it!
              </Note>
              
              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="beforecpp">
                Single ownership and move semantics existed even before C++, in Ada, Common Lisp (via the with-... macros), Mesa/Cedar at Xerox PARC, and Object Pascal (for object/class types). <a href="https://www.reddit.com/r/cpp/comments/hryer9/the_next_steps_for_single_ownership_and_raii/fy8600b/">[pjmlp]</a>
              </Note>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="caret">
                The {incode("^.")} means we're moving into a method, equivalent to {incode("commit(transaction)")}.

                <div style={{marginTop: "8px"}}>
                  A regular {incode(".")} like in {incode("transaction.commit()")} gives a constraint reference to the method, equivalent to {incode("commit(&transaction)")}.
                </div>
              </Note>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="alpha">
                Vale is still in early alpha, and rapidly approaching v0.1. Check out the <a href="/roadmap">Roadmap</a> for progress and plans!
                <div style={{marginTop: "8px"}}>
                  All the features mentioned here are available in Vale, but Resilient Mode, regions, RC elision, and weak references are still on the way.
                </div>
              </Note>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="436">
                Fun fact: we explored adding an {incode("OwningRef<T>")} and {incode("ConstrantRef<T>")} to Rust, but alas, the syntax became very noisy, and it was incompatible with borrow refs in the same way as {incode("Rc")}: where the two collide, one often has to re-work their code to use more {incode("Rc")}.
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
  <BlogRaiiNextSteps />,
  document.getElementById('main')
);
