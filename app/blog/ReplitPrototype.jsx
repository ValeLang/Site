
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

<h1 className={ns("noline cozy")} style={{marginTop: "8px"}}>Universal Speed, Safety and Simplicity in Vale</h1 >
<div className={ns("subtitle content cozy")}>Generational memory management and cross-platform goodness!</div>

<div className={ns("content")} style={{marginBottom: "32px"}}><span className={ns("date")}>August 31st, 2020</span> <span className={ns("author")}>&nbsp;&mdash;&nbsp; Evan Ovadia and Eske Hansen</span></div>

<div className={ns("section")}>
  <div className={ns("content cozy")}>
    Welcome to Vale!
  </div>
</div>

<div className={ns("content splitter")}>
  <div className={ns("half")}>
    <div className={ns("section")}>
      <div className={ns("content cozy")}>
        Vale is a very new language (announced just last month, in fact!), with modern features and a focus on easy, readable syntax, and a very nice, gradual learning curve.
      </div>
      <div className={ns("content cozy")}>
        Vale's goal is to show the world that <b>speed and safety can be easy,</b> that we don't have to make the choice between fast languages and easy languages, we can have both!
      </div>
      <div className={ns("content cozy")}>
        Vale has some fascinating syntactical designs (<a href="https://vale.dev/guide/structs#shortcalling">shortcalling</a>, <a href="https://vale.dev/guide/interfaces#sealedconstructors">interface constructors</a>, <a href="https://vale.dev/guide/references#inline">the inl keyword</a>, and more!) that will make life easier, but Vale's true power is underneath the surface, in the most important part of any programming language: <b>how it handles memory.</b>
      </div>
    </div>

  </div>
  <div className={ns("half")}>
    <Snippet header="Vale"><span class="Prog"><span class="Fn">fn <span class="FnName">main</span><span class="Params">()</span> <span class="Block">&#123;<br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">a</span></span></span> = <span class="Num">3</span></span>;<br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">b</span></span></span> = <span class="Num">5</span></span>;<br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">c</span></span></span> = <span class="Call"><span class="Lookup">a</span> <span class="CallLookup">+</span> <span class="Lookup">b</span></span></span>;<br />  <span class="Call"><span class="CallLookup">println</span>(<span class="Call"><span class="Str">"Behold the ancient "</span> <span class="CallLookup">+</span> <span class="Lookup">c</span></span>)</span>;<br />&#125;</span></span><br /></span>
</Snippet>
    <br />
    <Snippet header="Vale"><span class="Prog"><span class="Fn">fn <span class="FnName">main</span><span class="Params">()</span> <span class="Block">&#123;<br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">x</span></span> <span class="Typ">str</span></span> = <span class="Str">"world!"</span></span>;<br />  <span class="Call"><span class="CallLookup">println</span>(<span class="Call"><span class="Str">"Hello "</span> <span class="CallLookup">+</span> <span class="Lookup">x</span></span>)</span>;<br />&#125;</span></span><br /></span>
</Snippet>
    <br />
    <Snippet header="Vale"><span class="Prog"><span class="Struct">struct <span class="StructName">Spaceship</span> <span class="Membs">&#123;<br />  <span class="Memb"><span class="MembName">name</span> <span class="Typ">Str</span>;</span><br />  <span class="Memb"><span class="MembName">numWings</span> <span class="Typ">Int</span>;</span><br />&#125;</span></span><br /><br /><span class="Fn">fn <span class="FnName">main</span><span class="Params">()</span> <span class="Block">&#123;<br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">ship</span></span></span> = <span class="Call"><span class="CallLookup">Spaceship</span>(<span class="Str">"Serenity"</span>, <span class="Num">2</span>)</span></span>;<br />  <span class="Call"><span class="CallLookup">println</span>(<span class="MemberAccess"><span class="Lookup">ship</span><span class="MemberAccess">.</span><span class="Lookup">name</span></span>)</span>;<br />&#125;</span></span><br /></span>
</Snippet>
  </div>
</div>

<div className={ns("section")}>
  <div className={ns("content cozy")}>
    Every other language uses a form of reference counting, garbage collection, or borrow checking. As part of the <a href="https://repl.it/jam">repl.it hackathon</a>, we created something <b>completely new</b> for Vale, something we call <b>Hybrid-Generational Memory,</b> which is over <i>twice as fast</i> as reference-counting! {this.noteAnchor("fastmidaslink")}
  </div>
  <div className={ns("content cozy")}>
    Our efforts didn't stop there, though. Also during the hackathon, we took it <i>even further</i> and showed that an incredibly fast language like Vale can be seamlessly cross-compiled to other platforms, like Javascript. {this.noteAnchor("fastvalejslink")}
  </div>
  <div className={ns("content cozy")}>
    With this, we've taken our first step towards Vale's true vision: <b>universal speed, safety, and simplicity!</b>
  </div>
</div>

<a name="speedandsafety:hybridgenerationalmemory"></a><h2 >Speed and Safety: Hybrid-Generational Memory</h2 >

<div className={ns("section")}>
<div className={ns("content splitter")}>
  <div className={ns("width60")}>

    <div className={ns("content cozy")}>
      If you know what you're doing, coming back to C from Java feels <i>amazing.</i> C's raw speed and simplicity is truly wonderful. Java is like riding a freight train, but C is like driving a Ferrari.
    </div>
    <div className={ns("content cozy")}>
      Trains have their benefits though; they're much safer than cars. Even though it's slow, Java code is safer because you can't trigger undefined behavior or seg-faults, and you generally make more secure code.
    </div>
    <div className={ns("content cozy")}>
      If only there was a way to <b>easily have both speed and safety!</b> Previous attempts (Cyclone, ATS, Rust, Ada) have all resulted in languages with a very difficult learning curve. But is there a way to have speed, safety, <i>and</i> simplicity?
    </div>
    <div className={ns("content cozy")}>
      Yes there is! With its single ownership and high-level nature, Vale can have something we call <b>Hybrid-Generational Memory,</b> a memory model based on generation numbers. It's a revolutionary new memory model, which completely avoids reference-counting's aliasing costs, garbage collection's pauses, and borrow checkers' difficulty.
    </div>
    <div className={ns("content cozy")}>
      Over the last three weeks, we implemented the basic idea. We designed seven stages of optimization to avoid branching and increase cache-friendliness to get maximum speed. If you're interested in the details, you can read about the full design at <a href="/blog/hybrid-generational-memory-part-1">Hybrid-Generational Memory.</a>
    </div>

  </div>
  <div className={ns("width40")}>
    <table width="100%" className={ns("comparison")}>
      <thead>
        <tr>
          <th colspan="3">Fast Languages,<br/>Safety and Simplicity</th>
        </tr>
        <tr>
          <th className={ns("na")}></th>
          <th className={ns("na")}>Easy</th>
          <th className={ns("na")}>Difficult</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th className={ns("na")}>Safe</th>
          <td className={ns("good")}>Vale</td>
          <td className={ns("meh")}>Rust</td>
        </tr>
        <tr>
          <th className={ns("na")}>Unsafe</th>
          <td className={ns("meh")}>C</td>
          <td className={ns("bad")}>C++</td>
        </tr>
      </tbody>
    </table>
    <br />

    <table width="100%" className={ns("comparison")}>
      <thead>
        <tr>
          <th colspan="3">Safe Languages,<br/>Simplicity and Speed</th>
        </tr>
        <tr>
          <th className={ns("na")}></th>
          <th className={ns("na")}>Easy</th>
          <th className={ns("na")}>Difficult</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th className={ns("na")}>Fast</th>
          <td className={ns("good")}>Vale</td>
          <td className={ns("meh")}>Rust</td>
        </tr>
        <tr>
          <th className={ns("na")}>Slow</th>
          <td className={ns("meh")}>Python</td>
          <td className={ns("bad")}>Java</td>
        </tr>
      </tbody>
    </table>
    <br />

    <table width="100%" className={ns("comparison")}>
      <thead>
        <tr>
          <th colspan="3">Simple Languages,<br/>Safety and Speed</th>
        </tr>
        <tr>
          <th className={ns("na")}></th>
          <th className={ns("na")}>Safe</th>
          <th className={ns("na")}>Unsafe</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th className={ns("na")}>Fast</th>
          <td className={ns("good")}>Vale</td>
          <td className={ns("meh")}>C</td>
        </tr>
        <tr>
          <th className={ns("na")}>Slow</th>
          <td className={ns("meh")}>Python</td>
          <td className={ns("bad")}>Swift</td>
        </tr>
      </tbody>
    </table>

  </div>
</div>

<div className={ns("content cozy")}>
  We were shocked to see that it was <b>way faster</b> than reference-counting, even without optimizations! {this.noteAnchor("benchmarks")}
</div>
</div>
<div className={ns("section")}>
<table className={ns("comparison")}>
  <thead>
    <tr>
      <th>Mode</th>
      <th>Speed&nbsp;(seconds)</th>
      <th>Overhead Compared to Unsafe (seconds)</th>
      <th>Overhead Compared to Unsafe (%)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th className={ns("na")}>Naive&nbsp;RC&nbsp;<sup style={{fontWeight: "normal"}}>1</sup></th>
      <td className={ns("bad")}>54.90&nbsp;seconds</td>
      <td className={ns("bad")}>+11.08&nbsp;seconds</td>
      <td className={ns("bad")}>+25.29%</td>
    </tr>
    <tr>
      <th className={ns("na")}>Naive&nbsp;HGM&nbsp;<sup style={{fontWeight: "normal"}}>2</sup></th>
      <td className={ns("good")}>48.57&nbsp;seconds</td>
      <td className={ns("good")}>+4.75&nbsp;seconds</td>
      <td className={ns("good")}>+10.84%</td>
    </tr>
    <tr>
      <th className={ns("na")}>Unsafe&nbsp;<sup style={{fontWeight: "normal"}}>3</sup></th>
      <td className={ns("na")}>43.82&nbsp;seconds</td>
      <td className={ns("na")}>n/a</td>
      <td className={ns("na")}>n/a</td>
    </tr>
  </tbody>
</table>
</div>
<div className={ns("section")}>
<div style={{margin: "0 32px"}}>
  <div className={ns("content cozy")}>
    <sup>1</sup> <b>Naive RC</b>: A basic reference counting mode, to keep an object alive while there are still references alive. Basic reference counting adds 25.29% to the run time of a program, compared to Unsafe mode!
  </div>
  <div className={ns("content cozy")}>
    <sup>2</sup> <b>Naive HGM</b>: a basic hybrid-generational memory implementation, where before each dereference, we compare generations to see if the object is still alive. It only adds 10.84% to the run time of a program! {this.noteAnchor("faster")}
  </div>
  <div className={ns("content cozy")}>
    <sup>3</sup> <b>Unsafe</b>: A mode that has no memory safety, which compiles to roughly the same assembly code that would come from C.
  </div>
</div>
</div>
<div className={ns("section")}>
<div className={ns("content cozy")}>
   Hybrid-Generational Memory only adds 10.84% to the run time of a program, <b>less than half the cost of reference counting!</b>
</div>
<div className={ns("content cozy")}>
  When we started, we thought Hybrid-Generational Memory would be better than reference counting, but we were blown away by how much. And even better, this is <i>before</i> the optimizations!
</div>
</div>
<div className={ns("section")}>
  If you'd like to run this for yourself, <a href="https://github.com/Verdagon/Vale/raw/replitfinal/bundle/ValeCompiler0.0.8.zip">you can find this experimental version of the Vale compiler here!</a> It includes the benchmark program, and instructions on running it, in the <b>benchmark</b> folder. {this.noteAnchor("ubuntu")}
</div>
<div className={ns("section")}>
<div className={ns("content cozy")}>
  After we add our optimizations, we expect speed on par with Rust, and almost as fast as C++! We'll be submitting benchmarks and a full publication to <a href="https://en.wikipedia.org/wiki/OOPSLA">OOPSLA (Object-Oriented Programming, Systems, Languages & Applications)</a>, so stay tuned!
</div>
</div>

<a name="cleancrosscompilation"></a><h2 >Clean Cross-Compilation</h2 >

<div className={ns("section")}>
<div className={ns("content cozy")}>
  Vale's new memory model is incredibly fast, which makes it an amazing choice for games and servers. But why stop there? Vale could bring its speed to <i>even higher</i> realms, such as <b>app development,</b> because it is the first native-speed language that can do <b>clean cross-compilation.</b>
</div>
<div className={ns("content cozy")}>
  After writing an app for one platform (Web, iOS, Android), we often look longingly at the other platforms, and wish we could just re-use our code on those. Unfortunately, existing methods for sharing code between platforms often suffer:
</div>
<ul className={ns("content cozy")}>
  <li className={ns()}>
    Heavy slowdowns, as we run GC'd languages on iOS without their trusty JIT-compiler, such as Java or Kotlin.
  </li>
  <li className={ns()}>
    Difficulty communicating between JVM and a native language like C++ or Rust, as well as the difficulties of learning how to code safely with those languages.
  </li>
</ul>
<div className={ns("content cozy")}>
  <b>If only there was a fast and easy language that didn't suffer these problems!</b> If only there was a language that could cleanly operate across the VM/native boundary. It's the missing piece of the puzzle, a holy grail of cross-platform development.
</div>
<div className={ns("content cozy")}>
  We recently realized that Vale's <a href="https://vale.dev/blog/raii-next-steps">true single ownership</a> paradigm could be the missing puzzle piece!
</div>
<div className={ns("content cozy")}>
  To put it concisely, Vale's single ownership and <a href="https://vale.dev/blog/zero-cost-refs-regions">regions</a> can work together to make it very easy to cross-compile to another language (JS, Java, Swift) and, with one keyword, compile to native assembly to take advantage of Vale's true speed. You can read more about this at <a href="/blog/cross-platform-core-vision">Vision for the Cross-Platform Core</a>.
</div>
<div className={ns("content cozy")}>
  To make that vision work, we needed to cross-compile Vale to a VM language, like Javascript. This is usually <b>very difficult,</b> as most native-speed languages (like C++) give you raw access to the memory, and VM languages like Javascript do not.
</div>
<div className={ns("content cozy")}>
  However, Vale is a native-speed language that's designed to be simple and high-level. For example, it has references instead of pointers, and, like Python, it doesn't expose raw memory.
</div>
<div className={ns("content cozy")}>
  We decided to start with compiling Vale to Javascript, and after three weeks of effort, <b>it worked!</b> <a href="https://repl.it/@ForkedLightning/ForkedLightningWeb">You can try it out at the Forked Lightning repl.it.</a> {this.noteAnchor("forkedlightning")}
</div>
</div>

<div className={ns("section")}>
<div className={ns("content cozy")}>
  <b>This is a big step forward,</b> because every other language incurs a big cost when cross-compiling:
</div>
<ul className={ns("content cozy")}>
  <li className={ns()}>
    Garbage-collected languages like Java or Kotlin bring their costly garbage collector to iOS, and they also have to run without their Just-In-Time Compilers, causing them to be even slower.
  </li>
  <li className={ns()}>
    Reference counted languages like Swift, if compiled to JVM or JS, would suffer the cost of garbage collection <i>and</i> reference counting, because weak references and destructors rely on reference-counting precision.
  </li>
  <li className={ns()}>
    Low-level languages like C++ or Rust, if compiled to JVM or JS, would need to have "simulated RAM", like what powers asm.js, causing big slowdowns.
  </li>
</ul>
<div className={ns("content cozy")}>
  Because single ownership fits so cleanly into native, reference-counting, and garbage-collected environments, Vale suffers <b>zero</b> extra slowdowns when cross-compiling.
</div>
<div className={ns("content cozy")}>
  With this, Vale has done the impossible, <b>clean cross-compilation</b>, and has cleared the way towards a future with <b>fast cross-platform code.</b>
</div>
</div>

<a name="nextsteps"></a><h2 >Next Steps</h2 >

<div className={ns("section")}>
<div className={ns("content cozy")}>
  Now that we have prototypes of Vale's two core innovations, we'll be spending the next few months building on these foundations:
</div>
<ul className={ns("content cozy")}>
  <li className={ns()}>
    Add the next seven stages of optimization for Hybrid-Generational Memory, to see it reach its true speed potential!
  </li>
  <li className={ns()}>
    Add Swift and Java cross-compilation!
  </li>
  <li className={ns()}>
    Implement basic ID-based regions, so we can have automatic references across the JVM/native and JS/WASM boundaries!
  </li>
</ul>
<div className={ns("content cozy")}>
  We'll also be:
</div>
<ul className={ns("content cozy")}>
  <li className={ns()}>
    Adding IDE support!
  </li>
  <li className={ns()}>
    Making the foundations solid, doing some refactors to prepare for the big features ahead!
  </li>
  <li className={ns()}>
    Releasing Vale v0.1 with a big splash!
  </li>
  <li className={ns()}>
    Completely replacing C++ over the next decade. Easy!
  </li>
</ul>
<div className={ns("content cozy")}>
  If you want to see this happen sooner, or just want to contribute to something cool, we invite you to <a href="/contribute">come join us!</a> {this.noteAnchor("help")}
</div>
<div className={ns("content cozy")}>
  Stay tuned for coming articles, where we talk about Vale's optimizations, pentagonal tiling, and more. If you want to learn more before then, come by the <a href="http://reddit.com/r/vale">r/Vale subreddit</a> or the <a href="https://discord.gg/SNB8yGH">Vale discord server!</a>
</div>

</div>

<div className={ns("afterword")}>
  <a name="afterword:hackathonandscope"></a><h2  className={ns("noline")} style={{marginTop: 0}}>Afterword: Hackathon and Scope</h2 >

  <div className={ns("content cozy")}>These past three weeks in the repl.it hackathon have been a wild ride, full of late-night design discussions on discord, insanity-driven optimization brainstorming, and caffeine-fueled all-nighters!</div>

  <div className={ns("content cozy")}>Vale's vision is vast, and too big to fit in three weeks, so we knew at the very beginning that we needed to keep scope down, and really nail the core concepts that show Vale's potential.</div>

  <div className={ns("content cozy")}>
    Here's what we did specifically:
  </div>
  <ul className={ns("content cozy")}>
    <li className={ns()}>
      Implemented a basic to-JS cross-compiler, <b>ValeJS</b>, starting with printing a simple string.
    </li>
    <li className={ns()}>
      Modified the compiler's intermediate AST to include enough information for ValeJS to successfully construct structs.
    </li>
    <li className={ns()}>
      Created a way for ValeJS to mimic Vale's edge-based vtables in Javascript.
    </li>
    <li className={ns()}>
      Made a way for ValeJS to fill arrays without exposing null/undefined in the Vale's intermediate AST.
    </li>
    <li className={ns()}>
      Finished ValeJS, and made a little roguelike (a room and an @ sign) to show it off.
    </li>
    <li className={ns()}>
      Implemented "unsafe mode" in the compiler's native backend ("Midas"), so we could get an accurate measurement for how much overhead the other modes have.
    </li>
    <li className={ns()}>
      Made a web-service for repl.it to talk to, which outputs Vale's intermediate AST, so ValeJS could turn it into Javascript.
    </li>
    <li className={ns()}>
      Implemented "naive RC mode" in Midas, so we could measure our new mode against the native memory management standard.
    </li>
    <li className={ns()}>
      Made a way to simplify the very long and complicated names from the Vale's intermediate AST to something simple that JS could handle.
    </li>
    <li className={ns()}>
      Implemented "Resilient V0 mode" in Midas, which turned all constraint references into weak references, using a central table for all weak ref counts.
    </li>
    <li className={ns()}>
      Implemented "Resilient V1 mode" in Midas, which had a similar central table, but for generations.
    </li>
    <li className={ns()}>
      Implemented "Resilient V2 mode" in Midas, with the "generational heap" which embeds generations directly into the memory allocations themselves.
    </li>
  </ul>
  <div className={ns("content cozy")}>
    Here's what wasn't part of the three weeks:
  </div>
  <ul className={ns("content cozy")}>
    <li className={ns()}>
      The basic compiler, compiling to LLVM, existed before the hackathon.
    </li>
    <li className={ns()}>
      The seven stages of optimization are planned for the next few months. That's right, we beat RC without any optimizations!
    </li>
    <li className={ns()}>
      Unfinished features, which we paused when we started the hackathon:
      <ul className={ns("content cozy")}>
        <li className={ns()}>
          Regions, as described in <a href="https://vale.dev/blog/zero-cost-refs-regions">Zero-Cost References with Regions</a>.
        </li>
        <li className={ns()}>
          <a href="https://vale.dev/guide/structs">shortcalling struct</a> and <a href="https://vale.dev/guide/interfaces">interface constructors</a> is unfinished.
        </li>
        <li className={ns()}>
          <a href="https://vale.dev/guide/references">The inl keyword</a> is mostly implemented but not hooked up to all types yet.
        </li>
      </ul>
    </li>
  </ul>

  <a name="appendix:benchmarknumbers"></a><h2  className={ns("noline")} style={{marginTop: 0}}>Appendix: Benchmark Numbers</h2 >

  <div className={ns("content cozy")}>
    We ran the raw numbers for each mode 7 times, and got the following numbers:
  </div>
  <ul className={ns("content cozy")}>
    <li className={ns()}>Unsafe mode: <b>43.82s</b>, 43.89s, 43.90s, 44.06s, 44.28s, 44.65s, 44.83s</li>
    <li className={ns()}>Naive RC: <b>54.90s</b>, 55.17s, 55.27s, 55.32s, 55.34s, 55.37s, 55.48s</li>
    <li className={ns()}>Resilient v2: <b>48.57s</b>, 48.91s, 49.18s, 49.19s, 49.46s, 49.59s, 51.87s</li>
  </ul>
  <div className={ns("content cozy")}>
    We then used the best number for each run (bolded above).
  </div>

  <div className={ns("content cozy")}>
    To avoid CPU caching effects, we ran this on a very large map (200 x 200), specified in main.vale.
  </div>

</div>


    </div>
  </div>



              <div className={ns("margin")}>
                <div className={ns("toc-container")}>
                  <div className={ns("c-toc root")}>
<b>Universal Speed, Safety and Simplicity in Vale</b><ul className={ns("c-toc")}><li className={ns("c-toc")}><a href="/blog/next-gen-memory-model#speedandsafety:hybridgenerationalmemory">Speed and Safety: Hybrid-Generational Memory</a></li><li className={ns("c-toc")}><a href="/blog/next-gen-memory-model#cleancrosscompilation">Clean Cross-Compilation</a></li><li className={ns("c-toc")}><a href="/blog/next-gen-memory-model#nextsteps">Next Steps</a></li><li className={ns("c-toc")}><a href="/blog/next-gen-memory-model#afterword:hackathonandscope">Afterword: Hackathon and Scope</a></li><li className={ns("c-toc")}><a href="/blog/next-gen-memory-model#appendix:benchmarknumbers">Appendix: Benchmark Numbers</a></li></ul>
                </div>

                <div className={ns("notes-header")}>
                  <NotesHeader update={this.updateNotesHeaderRect}/>
                </div>
              </div>


<Note name="fastmidaslink" iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon}>
  You can find this experimental version of the compiler <a href="https://github.com/Verdagon/Vale/raw/replitfinal/bundle/ValeCompiler0.0.8.zip">here</a>! (Ubuntu only, for now)
</Note>

<Note name="fastvalejslink" iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon}>
  You can try this cross-compiling goodness out <a href="https://repl.it/@ForkedLightning/ForkedLightningWeb">here!</a>
</Note>


<Note name="benchmarks" iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon}>
  These numbers were from compiling a Vale <a href="https://github.com/Verdagon/Vale/tree/replitfinal/bundle/benchmark">cellular automata and flood-connecting roguelike terrain generator,</a> with different compilation modes.
</Note>

<Note name="forkedlightning" iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon}>
  Forked lightning was our team name in the <a href="https://blog.repl.it/langjam">repl.it Language Jam!</a>
</Note>

<Note name="ubuntu" iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon}>
  This includes a binary of the Vale compiler, built for 64-bit Ubuntu. If you'd like a build for a different OS, come by the <a href="https://discord.gg/SNB8yGH">Vale discord</a>!
</Note>

<Note name="faster" iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon}>
  We actually noticed even faster results for our method (down to 6.8% overhead) when we ran smaller benchmarks, probably because those smaller benchmarks fit entirely in the cache. The main numbers in the table were run with a much larger data set.
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

