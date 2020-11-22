
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

<h1 className={ns("noline cozy")} style={{marginTop: "8px"}}>Vision for the Cross-Platform Core</h1 >
<div className={ns("subtitle content cozy")}>Seamless Speed, Safety, and Reuse Without Frameworks</div>

<div className={ns("content")} style={{marginBottom: "32px"}}><span className={ns("date")}>October 4th, 2020</span> <span className={ns("author")}>&nbsp;&mdash;&nbsp; Evan Ovadia</span></div>

                

<div className={ns("section")}>
  <div className={ns("content cozy")}>App development is one of the fastest-growing areas of software engineering today. There are <a href="https://www.statista.com/statistics/330695/number-of-smartphone-users-worldwide/">3.5 billion smartphone users</a> in the world, using <a href="https://buildfire.com/app-statistics/">2.2 million</a> App Store apps and <a href="https://buildfire.com/app-statistics/">2.8 million</a> Play Store apps. Many of those have counterparts on the web, too.</div>

  <div className={ns("content cozy")}>Most app developers write separate code for Android, iOS, and web, resulting in <b>triple</b> the amount of code.</div>

  <div className={ns("content cozy")}>Empires have risen and fallen trying to solve this problem, but they all have drawbacks. The world is looking for a way to share fast code without the usual language barriers.</div>

  <div className={ns("content cozy")}>Every good language has one thing that it can do better than any others. This post will show how Vale's unique blend of single ownership and aliasing makes it the perfect language for cross-platform code, and the only language that can bring truly native speed to all three platforms.</div>

  <div className={ns("content cozy")}>These are planned features. Now that Vale has reached version 0.1, we can start exploring this combination of seamless cross-compilation and the native shared core.</div>
</div>

<a name="sharedcode"></a><h2  className={ns("noline")}>Shared Code</h2 >

<div className={ns("section")}>
  <div className={ns("content cozy")}>There's two main strategies for sharing code today: use a framework or make a shared core.</div>
</div>


<a name="frameworks"></a><h3  className={ns("noline")}>Frameworks</h3 >

<div className={ns("section")}>

  <div className={ns("content cozy")}>The most common approach to sharing code between platforms is to use some sort of garbage collected language in a framework that abstracts away all the details. Ionic, React Native, Flutter, Xamarin, and Unity all try to do this.</div>

  <div className={ns("content cozy")}>If your application doesn't need anything super special, these can work well. Unfortunately, they use <a href="https://thoughtbot.com/blog/examining-performance-differences-between-native-flutter-and-react-native-mobile-development">more battery life and CPU</a>, lag behind the latest features offered by their OS, and the quirks in the underlying platforms leak through their abstractions and cause bugs. It's amazing they've accomplished what they have, given the challenge they face. As the great <a href="https://news.ycombinator.com/item?id=21502267">nwallin aptly put it,</a> "Cross platform UI is probably the hardest problem in software engineering."</div>

</div>

<a name="sharedcore"></a><h3  className={ns("noline")}>Shared Core</h3 >

<div className={ns("section")}>
  <div className={ns("content cozy")}>The other approach is to use a <b>shared core.</b> In this approach, we have a thin platform-specific UI layer which calls into a shared "business logic" common library.</div>
</div>

<a name="transpilingagc'dsharedcore"></a><h4  className={ns("noline")}>Transpiling a GC'd Shared Core</h4 >

<div className={ns("section")}>
  <div className={ns("content cozy")}>JVM languages are making some strides here. <a href="https://kotlinlang.org/docs/reference/native-overview.html">Kotlin Native</a> and <a href="http://www.scala-native.org/en/v0.3.9-docs/">Scala Native</a> both compile to native machine code which uses garbage collection. They have a bit of a performance ceiling, but they do their job well! {this.noteAnchor("jit")}</div>

  <div className={ns("content cozy")}>One can also transpile Java straight to objective-C. <a href="https://developers.google.com/j2objc/guides/projects-that-use-j2objc">j2objc</a> is the tool that cross compile's the Java code to make the iOS apps for GMail, Chat, Calendar, Docs, and others. Instead of using a garbage collector, it compiles to objective-C, which is <a href="https://yalantis.com/blog/is-swift-faster-than-objective-c/">a bit slower</a>, and the transpiled Java code can leak if it makes any reference cycles. {this.noteAnchor("weak")}</div>

  <div className={ns("content cozy")}>These solutions has some great benefits, and will still be the best approach for some cases. However, there's a big aspect where we can do even better: performance!</div>
</div>

<a name="usinganativesharedcore"></a><h4  className={ns("noline")}>Using a Native Shared Core</h4 >

<div className={ns("section")}>

  <div className={ns("content cozy")}>Experienced app developers will tell you: performance is important. Code can take some time to do something, and past a certain threshold, the user notices. Users, especially on iOS, have very high standards, and that slight bit of lag can turn their delight into discontent.</div>

  <div className={ns("content cozy")}>Performance helps the user, and it also helps battery life. Users notice when a certain app uses a lot of battery life, and users don't appreciate an app draining their battery needlessly.</div>

  <div className={ns("content cozy")}>And sometimes, we want performance because we have a lot of calculations to do! Mobile gaming isn't the only performance-hungry kind of app; apps that manipulate a sizeable amount of data like maps, spreadsheets, images, or apps that have a lot of complex applicate state will need every bit of performance they can get their hands on.</div>

  <div className={ns("content cozy")}>Historically, performance comes with difficulty. In today's most widely used languages, one often has to make a choice between <b>easy but slow</b> (e.g. Python, Javascript) and <b>fast but difficult</b> (e.g. C++, Rust), and there's not much inbetween. However, with the advent of languages like Lobster, Cone, and Vale, we'll soon have languages that are incredibly fast and also very easy.</div>

  <div className={ns("content cozy")}>Many companies have turned to C++ (<a href="https://slack.engineering/libslack-the-c-library-at-the-foundation-of-our-client-application-architecture-97470b5ef9b3">Slack</a>, <a href="https://web.dev/earth-webassembly/">Earth</a>, <a href="https://dropbox.tech/mobile/the-not-so-hidden-cost-of-sharing-code-between-ios-and-android">Dropbox</a>), which is <a href="https://benchmarksgame-team.pages.debian.net/benchmarksgame/fastest/swift-gpp.html">much faster</a>. We can say from our own experiences that it's a headache to communicate back and forth between C++ and JVM languages, and it's very difficult for people to learn C++.</div>

  <div className={ns("content cozy")}>This is where Vale can shine: native speed, and easy interop with the host language.</div>
</div>

<a name="vale'sapproach"></a><h2  className={ns("noline")}>Vale's Approach</h2 >

<div className={ns("section")}>
  <div className={ns("content cozy")}>Vale's unique blend of single ownership, regions, and high-level design makes it able to both cross-compile to JVM and iOS, and seamlessly drop down into native code for speed.</div>
</div>

<a name="crosscompilationwithoptimizability"></a><h3  className={ns("noline")}>Cross-Compilation with Optimizability</h3 >

<div className={ns("section")}>
  <div className={ns("content cozy")}>Most high-level languages, such as Java/Javascript/Python, completely abstract away the details of how objects are represented in memory, and give us no way to optimize, but also lets the language cross-compile (for example, from Java to JS). On the other end, there's languages like C/C++/Rust/Zig/Nim, which expose raw memory and give us the ability to optimize.</div>

  <div className={ns("content cozy")}><b>Vale is the best of both worlds:</b>it lets us write faster code with keywords like {incode("inl")}, {this.noteAnchor("inl")} which are ignored for environments that don't support that optimization, without changing the semantics of the program.</div>

  <div className={ns("content cozy")}>Another example: specifying the allocation strategy (heap, bump, pool, etc) {this.noteAnchor("regions")} is similarly ignored in environments that don't support them, and the program will still behave correctly.</div>
  
  <div className={ns("content cozy")}>Vale is high-level enough to work on all environments, yet gives us tools to write incredibly efficient code.</div>
</div>

<a name="featurescompileaccordingtoenvironment"></a><h3  className={ns("noline")}>Features Compile According to Environment</h3 >

<div className={ns("section")}>
  <div className={ns("content cozy")}>Some features of Vale are chosen to be more optimal depending on the environment they're in. For example:</div>
  <ul className={ns("content cozy")}>
    <li className={ns()}>{incode("weakable")} objects, which allow weak references to point to them:</li>
    <ul className={ns("content cozy")}>
      <li className={ns()}>In native environments, they have a pointer to a "weak ref count" integer or a "generation" number, depending on the region.</li>
      <li className={ns()}>In JVM or JS, they have a reference to a simple object with a back-pointer pointing back at it.</li>
    </ul>
    <li className={ns()}>Interface references:</li>
    <ul className={ns("content cozy")}>
      <li className={ns()}>In native environments, these are represented as a "fat pointer" struct containing a pointer to the object and a pointer to a vtable.</li>
      <li className={ns()}>In JVM, these are plain references, and the object itself has the vtable pointer.</li>
    </ul>
  </ul>
</div>

<a name="universalsemantics"></a><h3  className={ns("noline")}>Universal Semantics</h3 >

<div className={ns("section")}>
  <div className={ns("content cozy")}>Vale is a language based on single ownership. Single ownership traditionally means that there's one reference is an "owning" reference, and when it goes away, the object is deallocated. Vale's single ownership is more general; single ownership <b>tracks responsibility</b> to eventually call a certain method, {this.noteAnchor("raii")} more akin to linear types.</div>

  <div className={ns("content cozy")}>Native, garbage collected, and reference-counted environments all benefit from single ownership. {this.noteAnchor("dispose")} In native environments, destroying an owning reference will also free an object, but in non-native environments, they don't have to, and can still be used for other purposes.</div>
</div>


<a name="seamlesscommunication"></a><h3  className={ns("noline")}>Seamless Communication</h3 >

<div className={ns("section")}>
  <div className={ns("content cozy")}>Today's languages don't let us have references between native code and the host environment (JVM, iOS, JS), and we often have to construct entire layers of infrastructure to route information to where it needs to go.</div>

  <div className={ns("content cozy")}>In Vale, we can use regions to express to the compiler which objects are in the native environment, and which objects are in the host environment, and <b>a function can have references to both at the same time.</b></div>

  <div className={ns("content cozy")}>This makes it incredibly easy to, for example, have a Javascript button call into a Vale presenter when it's clicked. The Javascript button will call into the Vale-transpiled code, which knows how to communicate across the boundary.</div>
</div>

<a name="howdoesitwork?"></a><h3  className={ns("noline")}>How does it work?</h3 >

<div className={ns("section")}>
  <div className={ns("content cozy")}>Depending on the native code's kind of region, this can work in different ways. We use certain tables in <a href="https://en.wikipedia.org/wiki/Thread-local_storage">thread-local storage</a> to serve as our references into native memory.</div>

  <div className={ns("content cozy")}>In native memory, there will be:</div>
  <ul className={ns("content cozy")}>
    <li className={ns()}>Native Constraint Ref Table: {this.noteAnchor("shared")} {incode("Map<u64, [ &Any, int ]>")}. The &Any is a regular borrow reference to an object, and the int is how many times we've "locked" this object to prevent its deletion.</li>
    <li className={ns()}>Native Weak Ref Table: {incode("Map<u64, &&Any>")}. The dead ones are eventually cleaned up by constant-time incrementing a rabbit pointer. {this.noteAnchor("rabbit")}</li>
    <li className={ns()}>An owning reference pointing into native memory will also use the Native Constraint Ref Table.</li>
  </ul>


  <div className={ns("content cozy")}>In JVM memory, there will be a:</div>
  <ul className={ns("content cozy")}>
    <li className={ns()}>Java Constraint Ref Table: {incode("Map<u64, [ Object, int ]>")} {this.noteAnchor("shared2")}</li>
    <li className={ns()}>Java Weak Ref Table: {incode("Map<u64, ObjectWeakBox>")}</li>
    <li className={ns()}>Java Owning Ref Table: {incode("Map<u64, Object>")}</li>
  </ul>

</div>

<a name="let'sseeitinaction!"></a><h3  className={ns("noline")}>Let's see it in action!</h3 >

<div className={ns("section")}>
  <div className={ns("content cozy")}>Now we'll show what this could look like. Keep in mind, this is still very theoretical, and the syntax will likely be improved.</div>

  <div className={ns("content cozy")}>Here we're using 'core to refer to the native side and 'host to refer to the JVM side, these are defined by the user elsewhere.</div>
</div>

<div className={ns("content splitter")}>
  <div className={ns("half")}>
    <div className={ns("content cozy")}>This is a function that will run on the JVM.</div>
    <ul className={ns("content cozy")}>
      <li className={ns()}>{incode("spaceship")} is compiled to a long, which is an index into the global Native Constraint Ref Table.</li>
      <li className={ns()}>{incode("e")} is a regular Java click event.</li>
      <li className={ns()}>{incode("callback")} is a regular Java {incode("Func1<Bool, Void>")}.</li>
    </ul>
    <div className={ns("content cozy")}>Calling flyTo here will:</div>
    <ul className={ns("content cozy")}>
      <li className={ns()}>Serialize {incode("e.location")} into a buffer.</li>
      <li className={ns()}>Give callback a spot in the Java Constraint Ref Table, and remember the index.</li>
      <li className={ns()}>JNI call into _flyto_wrapper, which takes:</li>
      <ul className={ns("content cozy")}>
        <li className={ns()}>u64 spaceshipID</li>
        <li className={ns()}>char[] loc</li>
        <li className={ns()}>u64 callbackID</li>
      </ul>
      <li className={ns()}>which will...</li>
      <li className={ns()}>Get a constraint ref for spaceshipID from the Native Constraint Ref Table.</li>
      <li className={ns()}>Deserialize {incode("loc")}.</li>
      <li className={ns()}>Call {incode("flyTo")}.</li>
    </ul>
  </div>
  <div className={ns("half")}>
<Snippet header="Vale"><span class="Prog"><span class="Fn">fn <span class="FnName">launch</span><span class="Params">(<br />    <span class="Pat"><span class="Capture"><span class="CaptureName">spaceship</span></span> 'core <span class="Ownership">&<span class="Typ">Spaceship</span></span></span>,<br />    <span class="Pat"><span class="Capture"><span class="CaptureName">e</span></span> <span class="Typ">ClickEvent</span></span>,<br />    <span class="Pat"><span class="Capture"><span class="CaptureName">callback</span></span> <span class="Typ">ICallback</span></span>)</span> <span class="Comment">// change to fn(bool)void</span><br /><span class="Typ">'host</span> <span class="Block">&#123;<br /><br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">dist</span></span></span> = <span class="Call"><span class="MemberAccess"><span class="MemberAccess"><span class="Lookup">e</span><span class="MemberAccess">.</span><span class="Lookup">spaceship</span></span><span class="MemberAccess">.</span><span class="Lookup">loc</span></span><span class="MemberAccess">.</span><span class="CallLookup">distance</span>(<span class="Lookup">loc</span>)</span></span>;<br />  <span class="Call"><span class="CallLookup">println</span>("Flying " + dist<span class="Call"><span class="Call"><span class="Str"></span><span class="CallLookup"></span><span class="Lookup"></span></span> <span class="CallLookup">+</span> <span class="Str">" parsecs!"</span></span>)</span>;<br />  <span class="Call"><span class="Lookup">spaceship</span><span class="MemberAccess">.</span><span class="CallLookup">flyTo</span>(<span class="MemberAccess"><span class="Lookup">e</span><span class="MemberAccess">.</span><span class="Lookup">location</span></span>, <span class="Lookup">callback</span>)</span>;<br />&#125;</span></span><br /></span>
</Snippet>
  </div>
</div>


<div className={ns("content splitter")}>
  <div className={ns("half")}>
    <div className={ns("content cozy")}>This code is compiled to native assembly.</div>
    <ul className={ns("content cozy")}>
      <li className={ns()}>{incode("spaceship")} is a normal native constraint ref.</li>
      <li className={ns()}>{incode("loc")} is a normal native Loc.</li>
      <li className={ns()}>{incode("callback")} is compiled to a u64, an index into the Java Constraint Ref Table.</li>
    </ul>
  </div>
  <div className={ns("half")}>
<Snippet header="Vale"><span class="Prog"><span class="Fn">fn <span class="FnName">flyTo</span><span class="Params">(<br />    <span class="Pat"><span class="Capture"><span class="CaptureName">ship</span></span> <span class="Ownership">&<span class="Typ">Spaceship</span></span></span>,<br />    <span class="Pat"><span class="Capture"><span class="CaptureName">loc</span></span> <span class="Typ">Loc</span></span>,<br />    <span class="Pat"><span class="Capture"><span class="CaptureName">callback</span></span> 'platform <span class="Typ">ICallback</span></span>)</span> <span class="Comment">// change to fn(bool)void</span><br /><span class="Typ">'core</span> <span class="Block">&#123;<br />  <span class="If">if <span class="Block">(<span class="Call"><span class="MemberAccess"><span class="Lookup">ship</span><span class="MemberAccess">.</span><span class="Lookup">fuel</span></span> <span class="CallLookup">&lt;</span> <span class="Call"><span class="MemberAccess"><span class="Lookup">ship</span><span class="MemberAccess">.</span><span class="Lookup">loc</span></span><span class="MemberAccess">.</span><span class="CallLookup">distance</span>(<span class="Lookup">loc</span>)</span></span>)</span> <span class="Block">&#123;<br />    <span class="Call"><span class="CallLookup">callback</span>(<span class="Bool">false</span>)</span>;<br />  &#125;</span> else <span class="Block">&#123;<br />    <span class="Mut">mut <span class="MemberAccess"><span class="Lookup">spaceship</span><span class="MemberAccess">.</span><span class="Lookup">target</span></span> = <span class="Lookup">loc</span></span>;<br />    <span class="Mut">mut <span class="MemberAccess"><span class="Lookup">spaceship</span><span class="MemberAccess">.</span><span class="Lookup">fuel</span></span> = <span class="Call"><span class="MemberAccess"><span class="Lookup">spaceship</span><span class="MemberAccess">.</span><span class="Lookup">fuel</span></span> <span class="CallLookup">-</span> <span class="Num">10</span></span></span>; <span class="Comment">// change to mut spaceship.fuel -= 10;</span><br />    <span class="Mut">mut <span class="MemberAccess"><span class="Lookup">spaceship</span><span class="MemberAccess">.</span><span class="Lookup">flyingCallback</span></span> = <span class="Lookup">callback</span></span>;<br />  &#125;</span></span><br />&#125;</span></span><br /></span>
</Snippet>
  </div>
</div>


<div className={ns("content splitter")}>
  <div className={ns("half")}>
    <div className={ns("content cozy")}>This struct is compiled in both worlds.</div>

    <div className={ns("content cozy")}>The {incode("distance")} function here is also compiled to both worlds.</div>

    <div className={ns("content cozy")}>Since this is a normal struct without any region annotations, it can be compiled to both sides. There will be a native version of {incode("distance")} which works on native {incode("Loc")}s, and a JVM version of {incode("distance")} that works on JVM {incode("Loc")}s.</div>
  </div>
  <div className={ns("half")}>
<Snippet header="Vale"><span class="Prog"><span class="Struct">struct <span class="StructName">Loc</span> imm <span class="Membs">&#123;<br />  <span class="Memb"><span class="MembName">x</span> <span class="Typ">Int</span>;</span><br />  <span class="Memb"><span class="MembName">y</span> <span class="Typ">Int</span>;</span><br /><br />  <span class="Fn">fn <span class="FnName">distance</span><span class="Params">(<span class="Pat"><span class="Capture"><span class="CaptureName">this</span></span> <span class="Typ">Loc</span></span>, <span class="Pat"><span class="Capture"><span class="CaptureName">that</span></span> <span class="Typ">Loc</span></span>)</span> <span class="Block">&#123;<br />    <span class="Call"><span class="CallLookup">sqrt</span>(<span class="Call"><span class="Call"><span class="CallLookup">sq</span>(<span class="Call"><span class="MemberAccess"><span class="Lookup">this</span><span class="MemberAccess">.</span><span class="Lookup">x</span></span> <span class="CallLookup">-</span> <span class="MemberAccess"><span class="Lookup">that</span><span class="MemberAccess">.</span><span class="Lookup">x</span></span></span>)</span> <span class="CallLookup">+</span> <span class="Call"><span class="CallLookup">sq</span>(<span class="Call"><span class="MemberAccess"><span class="Lookup">this</span><span class="MemberAccess">.</span><span class="Lookup">y</span></span> <span class="CallLookup">-</span> <span class="MemberAccess"><span class="Lookup">that</span><span class="MemberAccess">.</span><span class="Lookup">y</span></span></span>)</span></span>)</span><br />  &#125;</span></span><br />&#125;</span></span><br /></span>
</Snippet>
  </div>
</div>


<div className={ns("content splitter")}>
  <div className={ns("half")}>
    <div className={ns("content cozy")}>This struct is compiled in native only.</div>

    <div className={ns("content cozy")}>JVM can still have a reference to it (perhaps through the Tables), but there's no JVM Spaceship class.</div>
  </div>
  <div className={ns("half")}>
<Snippet header="Vale"><span class="Prog"><span class="Struct">struct <span class="StructName">Spaceship</span> 'core <span class="Membs">&#123;<br />  <span class="Memb"><span class="MembName">fuel</span> <span class="Typ">Int</span>;</span><br />  <span class="Memb"><span class="MembName">loc</span>! <span class="Typ">Loc</span>;</span><br />  <span class="Memb"><span class="MembName">target</span>! <span class="Typ">Loc</span>;</span><br />  <span class="Memb"><span class="MembName">callback</span> 'platform <span class="Typ">ICallback</span>;</span> <span class="Comment">// change to fn(bool)void;</span><br />&#125;</span></span><br /></span>
</Snippet>
  </div>
</div>

<div className={ns("content cozy")}>Vale can call seamlessly into native code, with only a few annotations.</div>

<div className={ns("content cozy")}>The crown jewel here is that we can make some functions, like {incode("distance")} above, compiled to both JVM and native. This minimizes the number of times we cross the JNI boundary, and avoids a lot of unnecessary JNI calls for tiny one-off functions like getters.</div>

<div className={ns("content cozy")}>Vale's combination of high-level and fast gives it the unique ability to live in both worlds. Vale is a language that doesn't fear the boundary, but <i>thrives</i> on it. Code can fluidly change between native and host, enabling amazing performance for our apps.</div>



    </div>
  </div>



              <div className={ns("margin")}>
                <div className={ns("toc-container")}>
                  <div className={ns("c-toc root")}>
<b>Vision for the Cross-Platform Core</b><ul><li><a href="/blog/zero-cost-refs-regions#sharedcode">Shared Code</a></li><ul><li><a href="/blog/zero-cost-refs-regions#frameworks">Frameworks</a></li></ul><ul><li><a href="/blog/zero-cost-refs-regions#sharedcore">Shared Core</a></li></ul><ul><ul><li><a href="/blog/zero-cost-refs-regions#transpilingagc'dsharedcore">Transpiling a GC'd Shared Core</a></li></ul></ul><ul><ul><li><a href="/blog/zero-cost-refs-regions#usinganativesharedcore">Using a Native Shared Core</a></li></ul></ul><li><a href="/blog/zero-cost-refs-regions#vale'sapproach">Vale's Approach</a></li><ul><li><a href="/blog/zero-cost-refs-regions#crosscompilationwithoptimizability">Cross-Compilation with Optimizability</a></li></ul><ul><li><a href="/blog/zero-cost-refs-regions#featurescompileaccordingtoenvironment">Features Compile According to Environment</a></li></ul><ul><li><a href="/blog/zero-cost-refs-regions#universalsemantics">Universal Semantics</a></li></ul><ul><li><a href="/blog/zero-cost-refs-regions#seamlesscommunication">Seamless Communication</a></li></ul><ul><li><a href="/blog/zero-cost-refs-regions#howdoesitwork?">How does it work?</a></li></ul><ul><li><a href="/blog/zero-cost-refs-regions#let'sseeitinaction!">Let's see it in action!</a></li></ul></ul>
                </div>

                <div className={ns("notes-header")}>
                  <NotesHeader update={this.updateNotesHeaderRect}/>
                </div>
              </div>


<Note name="weak" iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon}>
  Once one can identify the memory leak, they can break reference cycles by annotating their code with @Weak.
</Note>

<Note name="jit" iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon}>
  JVM languages rely on Just-in-Time (JIT) compilation for speed, but Apple doesn't allow JIT on iOS. A cross-compiled JVM language will unfortunately not be as fast on iOS as it is on Android, because of the lack of JIT.
</Note>

<Note name="inl" iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon}>
  The compiler is intelligent and will put objects on the stack whenever possible, but the user can use the {incode("inl")} keyword to force it. The {incode("inl")} keyword would be obeyed on native, but ignored on JVM or JS.
</Note>

<Note name="regions" iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon}>
  See <a href="/blog/zero-cost-refs-regions">Zero-Cost References with Regions</a> for more about regions and how they can drastically speed up a program.
</Note>

<Note name="raii" iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon}>
  See <a href="/blog/raii-next-steps">The Next Steps for Single Ownership and RAII</a> for more about how single ownership is about <i>much</i> more than just freeing memory.
</Note>

<Note name="shared" iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon}>
  If these are in a shared buffer (JVM "native memory"), then both sides can reach into it. That will be useful for incrementing/decrementing that count.
</Note>

<Note name="shared2" iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon}>
  We might have this int be in a shared buffer instead, so we can increment/decrement it quickly from both sides.
</Note>

<Note name="dispose" iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon}>
  For example, adding single ownership to Java or JS would guarantee that you never forget to call {incode(".dispose()")}, {incode(".unregister()")}, {incode(".close()")}, {incode(".resolve(x)")} methods ever again. See <a href="/blog/raii-next-steps">The Next Steps for Single Ownership and RAII</a> for more on this.
</Note>

<Note name="rabbit" iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon}>
  See <a href="https://medium.com/@tuvo1106/the-tortoise-and-the-hare-floyds-algorithm-87badf5f7d41">The Tortoise and the Hare (Floyd’s Algorithm)</a>.
  </Note>

{/*<Note name="otherplans" iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon}>
  <div className={ns("content cozy")}>Vale has some other tricks up its sleeve too:</div>
  <ul className={ns("content cozy")}>
    <li className={ns()}>Accelerated Weak Tables, to reduce weak references' cache misses.</li>
    <li className={ns()}>"Fast Resilient Mode" which won't use ref-counting or borrow-checking for its memory safety, at the cost of slightly more memory usage.</li>
  </ul>
  <div className={ns("content cozy")}>We'll be posting about these by early next year, but feel free to come by the <a href="https://discord.gg/SNB8yGH">Vale discord</a> and ask about it before then!</div>
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

