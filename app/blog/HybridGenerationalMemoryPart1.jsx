
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

<h1 className={ns("noline cozy")} style={{marginTop: "8px"}}>Vale's Hybrid-Generational Memory Model, Part 1</h1 >
<div className={ns("subtitle content cozy")}>Using generational indices as the foundation for a language!</div>

<div className={ns("content")} style={{marginBottom: "32px"}}><span className={ns("date")}>October 4th, 2020</span> <span className={ns("author")}>&nbsp;&mdash;&nbsp; Evan Ovadia</span></div>


<div className={ns("section")}>
  <div className={ns("content cozy")}>This page describes Vale's "next-generation" memory model.</div>
</div>

<div className={ns("section")}>
  <div className={ns("content cozy")}>The ultimate goal of this endeavor is for Vale to have speed on par with C++, with zero unsafety, and without a restrictive borrow checker. {this.noteAnchor("dream")}</div>
</div>

<div className={ns("section")}>
  <div className={ns("content cozy")}>Note that this is <b>still in development</b>. We have some very promising early results, so we're sharing the idea to show you where Vale is headed. If you want to be part of this and bring this into the world, come <a href="/contribute">come join us</a> and help make it happen!</div>
</div>


<a name="speedorsimplicity?"></a><h3  className={ns("noline")}>Speed or Simplicity?</h3 >

<div className={ns("section")}>
  <div className={ns("content cozy")}>
    Right now, the world has two choices when it comes to languages:
  </div>
  <ul className={ns("content cozy")}>
    <li className={ns()}>Languages like Java, Python, and Swift, which are easy to use, are completely memory safe, but have a high run-time cost.</li>
    <li className={ns()}>Languages like C++ and Rust, which are fast, but where learning how to code safely has a very difficult learning curve.</li>
  </ul>
  <div className={ns("content cozy")}>
    Across the world, developers have to make this heart-breaking choice: speed or simplicity? Should we make code fast, or should we make fast code?
  </div>
  <div className={ns("content cozy")}>
    The <b>holy grail of language design</b> is to make something that's as easy to use as Java, Python, or Swift, but as fast as C++ and Rust. It's the missing piece of a grand puzzle.
  </div>
</div>

<a name="both!"></a><h3  className={ns("noline")}>Both!</h3 >

<div className={ns("section")}>
  Vale is a unique combination: it's a <b>high-level</b> language with <b>true single ownership</b>. This combination opens up a vast array of new potential in memory management: single ownership semantics, where the compiler has the latitude to optimize freely.
</div>

<div className={ns("section")}>
  With this freedom, we reached for an obscure yet incredibly efficient technique from C++ game engines, called generational indices. 
</div>


<a name="generationalindices!"></a><h2 >Generational Indices!</h2 >


<div className={ns("section")}>
<div className={ns("content cozy")}>
  A "generational index" is a tactic that can be employed by any non-garbage-collected language to help with memory safety. Programs in C, C++, and even earlier languages have employed generational indices.
</div>
</div>

<a name="objectandgenerationtables"></a><h3  className={ns("noline")}>Object and Generation Tables</h3 >


<div className={ns("section")}>
<div className={ns("content cozy")}>
  In C++ terms, we would have two tables, which are always kept in sync: {this.noteAnchor("together")}
</div>
<ul className={ns("content cozy")}>
  <li className={ns()}>An "object table" {incode("std::vector<T>")} will hold all of our objects.</li>
  <li className={ns()}>
    A "generation table" {incode("std::vector<[u32, u32]>")} {this.noteAnchor("syntax")} will hold all their "generation" numbers.
    <ul className={ns("content cozy")}>
      <li className={ns()}>
        The first {incode("u32")} is the generation, it represents "The corresponding object in the object table is the <b>n</b>th one to inhabit that slot."
      </li>
      <li className={ns()}>
        The second {incode("u32")} is the "next free index", zero if the object is alive, and if the object is dead it will contain the index of the next dead object. Together, these effectively form a singly-linked list of all the free slots.
      </li>
    </ul>
  </li>
</ul>

</div>
<div className={ns("section")}>
<div className={ns("content cozy")}>
  When we destroy an object, we increment the "actual generation" in the generation table, and add it to the list of free slots.
</div>

<div className={ns("content cozy")}>
  As we'll see below, the generation table <b>tracks the lifetime of an object.</b>
</div>
</div>

<a name="genind:ageneration+index"></a><h3  className={ns("noline")}>GenInd: A Generation + Index</h3 >

<div className={ns("section")}>

<div className={ns("content splitter")}>
  <div className={ns("half")}>
<div className={ns("content cozy")}>
  Just like how {incode("shared_ptr<T>")} is secretly a struct which contains a T* and a pointer to a reference counter, {this.noteAnchor("controlblock")} we can have a {incode("GenInd")} struct containing:
</div>
<ul className={ns("content cozy")}>
  <li className={ns()}>
    {incode("u32 index")} of an object in that vector.
  </li>
  <li className={ns()}>
    {incode("u32 targetGen")} generation of the object we're referring to.
  </li>
</ul>
<div className={ns("content cozy")}>
  To make a {incode("GenInd")} referring to a certain object, we take that object's index and generation number (from the generation table), and copy them into the {incode("GenInd")}.
</div>
  </div>
  <div className={ns("half")}>
<pre className="cppSnippet root"><div className="cppSnippet header">C++</div><code className="cpp">
{`struct GenInd {
  uint32_t index;
  uint32_t targetGen;
}`}
</code></pre>
<br />
<pre className="cppSnippet root"><div className="cppSnippet header">C++</div><code className="cpp">
{`GenInd makeGenInd(
    const vector<[u32, u32]>& genTable,
    u32 i) {
  assert(i < genTable.size());
  // Make sure it's still alive
  assert(get<1>(genTable[i]) == 0);
  // Get the object's generation
  u32 actualGen = get<0>(genTable[i]);
  // Return a GenInd!
  return GenInd { i, actualGen };
}`}
</code></pre>
  </div>
</div>
</div>


<a name="dereferencingagenind"></a><h3  className={ns("noline")}>Dereferencing a GenInd</h3 >

<div className={ns("section")}>
<div className={ns("content cozy")}>
  Before we "dereference" our {incode("GenInd")}, we do a <b>liveness check</b> to see whether {incode("GenInd.targetGen")} still matches the "actual generation" in the generation table.
</div>
</div>

<div className={ns("section")}>
<div className={ns("content cozy")}>
  It's as if the reference is saying:
</div>
<div className={ns("content cozy")}>
  <b>&nbsp;&nbsp;&nbsp;"Hello! I'm looking for the 11th inhabitant of this house, are they still around?"</b>
</div>
<div className={ns("content cozy")}>
  and the person who opens the door says:
</div>
<div className={ns("content cozy")}>
  <b>&nbsp;&nbsp;&nbsp;"No, sorry, I am the 12th inhabitant of this house, the 11th inhabitant is no more."</b>
</div>
<div className={ns("content cozy")}>
  or instead:
</div>
<div className={ns("content cozy")}>
  <b>&nbsp;&nbsp;&nbsp;"Yes! That is me. Which of my fields would you like to access?"</b>
</div>
<div className={ns("content cozy")}>
  Now let's see some code!
</div>
</div>

<div className={ns("content splitter")}>
  <div className={ns("half")}>
    <div className={ns("content cozy")}>
      We won't be dereferencing our GenInd with the {incode("*")} operator like we're used to. Instead, we might have this method, which takes in the vector as an argument.
    </div>
    <div className={ns("content cozy")}>
      This shipRef is referring to a Ship which might not be there anymore; something else may have taken its spot, in which case {incode("shipRef.targetGen")} will not match the "actual" generation at that spot in the array.
    </div>
    <div className={ns("content cozy")}>
      If that happens, we can return a nullptr, or halt the program there if we desire.
    </div>
  </div>
  <div className={ns("half")}>
<pre className="cppSnippet root"><div className="cppSnippet header">C++++</div><code className="cpp">
{`Ship* dereference(
    const vector<[u32, u32]>& genTable,
    const vector<Ship>& ships,
    GenInd shipRef) {
  assert(shipRef.index < ships.size());
  uint64_t actualGen =
      get<0>(genTable[shipRef.index]);
  if (shipRef.targetGen != actualGen) {
    // It's gone!
    return nullptr; // or halt here
  }
  // It's still alive!
  return &ships[shipRef.index];
}
`}
</code></pre>
  </div>
</div>


<a name="stage1:asimplebeginning"></a><h2 >Stage 1: A Simple Beginning</h2 >

<div className={ns("section")}>
  <div className={ns("content cozy")}>
    Now that we're well-versed in generational indices, let's see how we can harness their power!
  </div>
  <div className={ns("content cozy")}>
    Vale's memory model is best explained in stages. <b>We'll intentionally start simple and inefficient, and then in each stage, we'll adjust the model to be more efficient.</b>
  </div>
</div>

<div className={ns("section")}>
<div className={ns("content cozy")}>
  We start with a very vanilla. simplified form of C++, where every object is owned by a {incode("unique_ptr<T>")}, and we can refer to it with raw pointer {incode("T*")}s. Every primitive is simply copied around, like C++ normally does.
</div>

<div className={ns("content cozy")}>
  For now, there is no:
</div>
<ul className={ns("content cozy")}>
  <li className={ns()}>Pointer arithmetic,</li>
  <li className={ns()}>Pointers to members,</li>
  <li className={ns()}>Arrays,</li>
  <li className={ns()}>Inlined objects (objects in the stack or in their containing structs),</li>
  <li className={ns()}>Memory safety; these raw pointers can use-after-free.</li>
</ul>

<div className={ns("content cozy")}>
  You could think of this as Python or Swift except that only one reference owns the object, and the rest are raw/unsafe/unowned pointers.
</div>
</div>

<div className={ns("section")}>
<div className={ns("content cozy")}>
  Throughout this explanation, we'll be using the shorter {incode("u64")} to mean {incode("uint64_t")}, and use other sizes like {incode("u48")}, {incode("u47")}, {incode("u15")}, etc.
</div>

</div>


<a name="stage2:addinggenerationnumbers"></a><h2 >Stage 2: Adding Generation Numbers</h2 >

<div className={ns("section")}>
  <div className={ns("content cozy")}>
    First, we'll bring in the {incode("std::vector<[u32, u32]>")} "generation table" from above, and use it for <b>every object in this thread.</b> This is called the <b>Local Generation Table</b>.
  </div>
  <div className={ns("content cozy")}>
    Here, it's a {incode("vector<u48>")}. Each slot can represent the lifetimes of up to 2^48 objects.
  </div>
</div>

<div className={ns("section")}>
  We cap the size of the vector at 2^47 elements, so we index into it with a u47 "LGT index". {this.noteAnchor("47")} {this.noteAnchor("95")}
</div>

<a name="objectsstillliveintheheap"></a><h4  className={ns("noline")}>Objects Still Live in the Heap</h4 >

<div className={ns("section")}>
  <div className={ns("content cozy")}>
    There is no central "object table" to hold our objects. Instead, they live on the heap.
  </div>

  <div className={ns("content cozy")}>
    At the top of every heap allocation, we'll have a u47 LGT index. When we free an object, we increment the generation number at that index in the LGT.
  </div>
</div>


<a name="genref:generation+index+ptr"></a><h4  className={ns("noline")}>GenRef: Generation + Index + Ptr</h4 >

<div className={ns("content splitter")}>
  <div className={ns("width60")}>
<div className={ns("content cozy")}>Similar to the C++ example's {incode("GenInd")}, our raw pointers each become a {incode("GenRef")} struct, which has: {this.noteAnchor("159")}</div>
<ul className={ns("content cozy")}>
  <li className={ns()}>
    {incode("targetGen")} The u48 generation number of the object we're referring to.
  </li>
  <li className={ns()}>
    {incode("lgtIndex")} The u47 index into the LGT.
  </li>
  <li className={ns()}>
    {incode("objectPtr")}, the raw pointer to the target object.
  </li>
</ul>
<div className={ns("content cozy")}>
To make a GenRef referring to a certain object, we:
</div>
<ul className={ns("content cozy")}>
  <li className={ns()}>Take that object's index, which was located just above it, at the top of the allocation.</li>
  <li className={ns()}>Use it to look up the object's generation.</li>
  <li className={ns()}>Copy these and objectPtr into a GenRef.</li>
</ul>
  </div>
  <div className={ns("width40")}>
<Snippet header="Vale"><span class="Prog"><span class="Struct">struct <span class="StructName">GenRef</span><span class="IdentRunes">&lt;<span class="IdentRune">T</span>&gt;</span> <span class="Membs">&#123;<br />  <span class="Memb"><span class="MembName">targetGen</span> <span class="Typ">u48</span>;</span><br />  <span class="Memb"><span class="MembName">lgtIndex</span> <span class="Typ">u47</span>;</span><br />  <span class="Memb"><span class="MembName">objectPtr</span> <span class="Ownership">*<span class="Typ">T</span></span>;</span><br />&#125;</span></span><br /><br /><span class="Fn">fn <span class="FnName">makeGenRef</span><span class="IdentRunes">&lt;<span class="IdentRune">T</span>&gt;</span><span class="Params">(<span class="Pat"><span class="Capture"><span class="CaptureName">objectPtr</span></span> <span class="Ownership">*<span class="Typ">T</span></span></span>)</span><br /><span class="Ret"><span class="TplArgs"><span class="Typ">GenRef</span>&lt;<span class="Typ">T</span>&gt;</span> </span><span class="Block">&#123;<br />  <span class="Comment">// Get object's LGT index,</span><br />  <span class="Comment">// from 8b before objectPtr.</span><br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">lgtIndex</span></span></span> = <span class="Lookup">...</span></span>;<br />  <span class="Comment">// Get object's generation</span><br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">gen</span></span></span> = <span class="Call"><span class="Lookup">lgt</span>[<span class="MemberAccess"><span class="Lookup">lgtIndex</span><span class="MemberAccess">.</span><span class="Lookup">0</span></span>]</span></span>;<br />  <span class="Comment">// Make the GenRef!</span><br />  <span class="Ret">ret <span class="Call"><span class="CallLookup">GenRef</span>(<br />    <span class="Lookup">gen</span>, <span class="Lookup">lgtIndex</span>, <span class="Lookup">objectPtr</span>)</span>;</span><br />&#125;</span></span><br /></span>
</Snippet>
</div>
</div>

<a name="dereferencingagenref"></a><h4  className={ns("noline")}>Dereferencing a GenRef</h4 >

<div className={ns("section")}>
  Dereferencing works in a way similar to C++ example.
</div>


<div className={ns("content splitter")}>
  <div className={ns("half")}>
<div className={ns("content cozy")}>
To dereference a GenRef, we:
</div>
<ul className={ns("content cozy")}>
  <li className={ns()}>Take that object's index, which was located just above it, at the top of the allocation.</li>
  <li className={ns()}>Use it to look up the object's actual generation.</li>
  <li className={ns()}>Assert the GenRef's targetGen equals the object's actual generation.</li>
  <li className={ns()}>Return the GenRef's objectPtr.</li>
</ul>
  </div>
  <div className={ns("half")}>
<Snippet header="Vale"><span class="Prog"><span class="Comment">// Using above GenRef&lt;T&gt;</span><br /><br /><span class="Fn">fn <span class="FnName">deref</span><span class="IdentRunes">&lt;<span class="IdentRune">T</span>&gt;</span><span class="Params">(<span class="Pat"><span class="Capture"><span class="CaptureName">genRef</span></span> <span class="TplArgs"><span class="Typ">GenRef</span>&lt;<span class="Typ">T</span>&gt;</span></span>)</span> <span class="Ret"><span class="Ownership">*<span class="Typ">T</span></span> </span><span class="Block">&#123;<br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">targetGen</span></span></span> = <span class="MemberAccess"><span class="Lookup">genRef</span><span class="MemberAccess">.</span><span class="Lookup">targetGen</span></span></span>;<br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">lgtIndex</span></span></span> = <span class="MemberAccess"><span class="Lookup">genRef</span><span class="MemberAccess">.</span><span class="Lookup">lgtIndex</span></span></span>;<br /><br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">actualGen</span></span></span> = <span class="MemberAccess"><span class="Call"><span class="Lookup">lgt</span>[<span class="Lookup">lgtIndex</span>]</span><span class="MemberAccess">.</span><span class="Lookup">0</span></span></span>;<br />  <span class="If">if <span class="Block">(<span class="Call"><span class="Lookup">targetGen</span> <span class="CallLookup">==</span> <span class="Lookup">actualGen</span></span></span>) <span class="Block">&#123; <span class="Comment">{this.noteAnchor("345")}</span><br />    <span class="Call"><span class="CallLookup">panic</span>()</span>;<br />  </span>&#125;</span><br /><br />  <span class="Comment">// It's still alive!</span><br />  <span class="Ret">ret <span class="MemberAccess"><span class="Lookup">genRef</span><span class="MemberAccess">.</span><span class="Lookup">objectPtr</span></span>;</span><br />&#125;</span></span><br /></span>
</Snippet>
</div>
</div>

<a name="thepicturesofar"></a><h4  className={ns("noline")}>The Picture So Far</h4 >

<div className={ns("section")}>
  <div className={ns("content cozy")}>
    So far, this is a similar system as the C++ example before, but with a big difference: we use it for all objects, and objects live on the heap instead of in an array.
  </div>
  <div className={ns("content cozy")}>
    We still have the Local Generation Table, though each entry is a [u48, u47] rather than a [u32, u32]. The u47, which serves as the index of the next free object, is reduced to a u16 in a later stage.
  </div>
</div>

<div className={ns("section")}>

</div>





<a name="nextsteps"></a><h2 >Next Steps</h2 >

<div className={ns("section")}>
<div className={ns("content cozy")}>In coming stages, we'll:</div>

<ul className={ns("content cozy")}>
  <li className={ns()}>Make it so we can have objects on the stack, and inline inside a containing struct.</li>
  <li className={ns()}>Add a mechanism to automatically "lock" an allocation to skip liveness checks for given scopes.</li>
  <li className={ns()}>Skip liveness checks by using static analysis to trace references through intermediate structs.</li>
  <li className={ns()}>Eliminate the cache-miss for the vast majority of liveness checks.</li>
  <li className={ns()}>Shrink GenRef down to 128 bits.</li>
  <li className={ns()}>Make it so the GenRef liveness check doesn't involve branching.</li>
  <li className={ns()}>Make functions able to communicate requirements about parameters, to skip even more liveness checks.</li>
</ul>
<div className={ns("content cozy")}>
  <b>Stay tuned for coming articles which will describe those stages in detail!</b> {this.noteAnchor("tuned")}
</div>
</div>

<div className={ns("section")}>
  <div className={ns("content cozy")}>
    Vale is still a work in progress, and we're implementing these stages right now. Generations have never been used this way, and we're discovering new potential every day.
  </div>
</div>

<div className={ns("section")}>
  <div className={ns("content cozy")}>
    If you want to see this happen sooner, or just want to contribute to something cool, we invite you to <a href="/contribute">come join us!</a> {this.noteAnchor("help")}
  </div>
  <div className={ns("content cozy")}>
    We'd love to hear your thoughts on using generation numbers as the foundation of a memory model, so <a href="#">leave a comment</a>!
  </div>
</div>


<div className={ns("afterword")}>
  <a name="afterword:anarcanetellingofwhat'stocome"></a><h2  className={ns("noline")} style={{marginTop: 0}}>Afterword: An Arcane Telling of What's to Come</h2 >

<div className={ns("section")}>
<div className={ns("content cozy")}>
  We tip our hats to those of you who brave this section! This is a very short and dense yet complete explanation of the entire final memory model, for those who are too excited to wait for more us to craft more detailed, readable explanations in future articles.
</div>
</div>
<div className={ns("section")}>
<div className={ns("content cozy")}>
  This assumes you're already familiar with free-lists, generational indices, thread-local storage, borrow checking, atomicity, fat pointers, branch misprediction, and cache misses.
</div>
<div className={ns("content cozy")}>
  If you have any questions, feel free to come by the <a href="https://discord.gg/SNB8yGH">Vale discord server</a> and tell us where we can make the explanation clearer!
</div>
</div>
<div className={ns("section")}>
<div className={ns("content cozy")}>
  In this explanation, the model starts out slow, and gets progressively more efficient.
</div>
</div>

<div className={ns("section")}>
  <ol className={ns("content cozy")}>
    <li className={ns()}>
      First, start with a simplified C++, where every object is owned by an owning reference (like unique_ptr), and we can refer to them with raw pointers.
      <ul className={ns("content cozy")}>
        <li className={ns()}>
          Also isolate each thread's memory like Rust does; only one thread can have a reference to an object at any given time.
        </li>
      </ul>
    </li>
    <li className={ns()}>
      Introduce "generation numbers" and the Local Generation Table:
      <ul className={ns("content cozy")}>
        <li className={ns()}>
          In every allocation (whether stack or heap), before the object, is a 47b index into a thread-global vector&lt;[u48, u16]&gt; called the Local Generation Table (LGT).
        </li>
        <li className={ns()}>
          Deallocating the object will increment the first u48 (the "generation number") and use the u16 to add this "open space" to a free-list.
        </li>
        <li className={ns()}>
          Instead of a raw pointer, every reference is a "fat pointer" {incode("GenRef")} struct containing the raw pointer, the same 47b index as the object, and a copy of the object's 48b generation number. (This 159b shrinks to 128b later)
        </li>
        <li className={ns()}>
          "Liveness check": If a GenRef's generation number copy matches the one in the table at that index, the object is still alive and safe to dereference.
        </li>
        <li className={ns()}>
          We do a liveness check every time we dereference an object.
        </li>
      </ul>
    </li>
    <li className={ns()}>
      We can actually already "inline" structs into the stack and containing structs; when we make a GenRef to an inlined struct, just use the containing <b>allocation</b>'s u47 LGT index.
    </li>
    <li className={ns()}>
      We'd like to avoid the liveness check as much as possible, and we aren't using the LGT entry's second u16 for anything while the object is alive, so we'll make that into a nonatomic <b>"delay" ref-count</b> (like Swift's weak-ref-count), which the compiler can use to delay deallocating the object for a given scope.
      <ul className={ns("content cozy")}>
        <li className={ns()}>When the compiler detects that we dereference {this.noteAnchor("derefmiss")} a certain reference multiple times, the compiler will instead do a liveness check, increment the ref-count, and then decrement it again at the end of the block.</li>
        <li className={ns()}>During that scope, we can dereference the object and any of its indirectly <b>owned</b> objects freely without liveness checks.</li>
        <li className={ns()}>The object's owning reference counts towards that ref-count.</li>
        <li className={ns()}>When we decrement that count, we check if it hit zero, and if so, deallocate the object.</li>
      </ul>
    </li>
    <li className={ns()}>
      We'd like to avoid even more liveness checks. If we make a new struct and assign a <b>delayed</b> reference into one of its const fields and read that later, all within the scope of the delay, we can skip the liveness check for that as well.
    </li>
    <li className={ns()}>
      Every liveness check incurs a cache miss as it accesses the LGT. We can make it so at least heap objects don't incur the extra cache miss by changing the heap allocation's u47 to not be an index into the LGT but instead be <b>the u48 generation number itself.</b>
      <ul className={ns("content cozy")}>
        <li className={ns()}>
          Compiler never calls free(), which would risk a subsequent malloc() caller overwriting the allocation's generation number. It instead calls genFree() which adds the allocation to a free-list. It has a separate heap per size class.
        </li>
        <li className={ns()}>
          Compiler calls genMalloc which pulls from genFree's free list, or if none, calls malloc().
        </li>
        <li className={ns()}>
          Every reference needs to know whether it's pointing at a stack object or a heap object. We'll add 1 "isHeap" bit to GenRef (160b now).
        </li>
        <li className={ns()}>
          If isHeap is false, treat the remaining 159b as we did before, use it to look up the object's generation in the LGT.
        </li>
        <li className={ns()}>
          If isHeap is true, the GenRef has three things...
          <ul className={ns("content cozy")}>
            <li className={ns()}>Pointer to object, as before.</li>
            <li className={ns()}>u48 generation, as before.</li>
            <li className={ns()}>Pointer to the u48 generation number at top of the allocation.</li>
          </ul>
          ...for a total of 177b (shrunk to 128b later).
        </li>
      </ul>
      Objects on the stack still access the LGT. {this.noteAnchor("stacklgt")}
    </li>
    <li className={ns()}>
      The GenRef is now 177b, and we'd like to shrink it to 128b, for more compact data. We'll still have the 1b isHeap.
      <ul className={ns("content cozy")}>
        <li className={ns()}>
          If isHeap is false, the GenRef contains:
          <ul className={ns("content cozy")}>
            <li className={ns()}>
              u47 LGT index, as before.
            </li>
            <li className={ns()}>
              u48 generation number, as before.
            </li>
            <li className={ns()}>
              <s>64b pointer</s> u32 offset, relative to the start of this thread's stack.
            </li>
          </ul>
        </li>
        <li className={ns()}>
          If isHeap is true, the GenRef contains:
          <ul className={ns("content cozy")}>
            <li className={ns()}>
              48b generation number, as before.
            </li>
            <li className={ns()}>
              64b pointer to object, as before.
            </li>
            <li className={ns()}>
              <s>64b pointer</s> 15b offset, relative to above pointer, to the generation number at allocation's start.
            </li>
          </ul>
        </li>
      </ul>
      The GenRef is now 128b total.
    </li>
    <li className={ns()}>
      We'd like to avoid branching.
      <ul className={ns("content cozy")}>
        <li className={ns()}>
          Currently, the liveness check involves some branching to figure out where the generation number is, which risks mispredictions. We can avoid that by calculating the pointer from the GenRef <i>as if</i> isHeap was true, and as if isHeap was false, multiply by isHeap and !isHeap respectively, and add the two together.
        </li>
        <li className={ns()}>
          Instead of using an if-statement whose condition is a boolean from comparing the target generation to the actual generation, we can multiply the objectPtr pointer by that boolean. If the generations didn't match, the boolean will be false, producing a null pointer. Dereferencing that null pointer will crash the program, mission accomplished.
        </li>
      </ul>
    </li>
    <li className={ns()}>
      Non-virtual functions can require that the caller lock an object before handing it in; the callee can then skip liveness checks for that reference within the function.
    </li>
  </ol>
</div>

<div className={ns("section")}>
  <div className={ns("content cozy")}>
    Congratulations for reaching the end!
  </div>

  <div className={ns("content cozy")}>
    Some extra details:
  </div>
  <ul className={ns("content cozy")}>
    <li className={ns()}>
      GenRef is 128b which may seem large, but this is the width of C++'s {incode("std::shared_ptr<T>")} and {incode("std::weak_ptr<T>")}, and the default size of generational_arena's Index.
    </li>
    <li className={ns()}>
      genMalloc and genFree will likely be a modification of an existing malloc library like mimalloc. It has roughly the same requirements plus never overwriting that generation number at the top of every allocation.
    </li>
    <li className={ns()}>
      When we move something across thread boundaries, we must recurse through and increment all the generation numbers, effectively cutting off access to the rest of this thread.
    </li>
    <li className={ns()}>
      Anything that can travel across thread boundaries must be annotated with the {incode("mig")}ratory keyword, so we do atomic ref-counting for immutables, and don't use the ref-counting optimization for it unless we can prove it doesn't travel to another thread in a certain scope. {incode("mig")} is applied deeply.
    </li>
    <li className={ns()}>
      The LGT's free-list also has a touch of sorcery. The LGT is divided into 2^16-entry chunks. The u16 in each entry describes where in this chunk the next open space is. The first entry in this chunk is special; its u48 contains not a generation number but instead the index of the next chunk that's completely full of open spaces. In this way, the LGT has a free-list of free-lists.
    </li>
    <li className={ns()}>
      In the [u48, u16], 48 and 16 bits were chosen arbitrarily.
    </li>
    <li className={ns()}>
      When a generation number hits the maximum, don't use that generation number anymore; the LGT shouldnt use it, and genFree shouldn't let it be reused. genFree can slice up the allocation into smaller ones that don't include the initial 8b.
    </li>
  </ul>
</div>

<div className={ns("section")}>
  <div className={ns("content cozy")}>
    Some potential weaknesses:
  </div>
  <ul className={ns("content cozy")}>
    <li className={ns()}>
      Limits:
      <ul className={ns("content cozy")}>
        <li className={ns()}>Individual structs cannot be larger than 32kb.</li>
        <li className={ns()}>Limited to 2^95 stack allocations over the lifetime of the thread (a 5ghz processor would take about 268 million years to hit this limit).</li>
        <li className={ns()}>Note: we could increase the struct size if we lower the stack allocations limit. Seems wise.</li>
      </ul>
    </li>
    <li className={ns()}>
      The pointer magic might prevent some LLVM optimizations, in which case we might have to augment LLVM itself or write our own optimization passes.
    </li>
    <li className={ns()}>
      The liveness check involves several arithmetic operations and a few data dependencies. Arithmetic is basically free, but the data dependencies could stall the CPU.
    </li>
    <li className={ns()}>
      Storing the generation number at the top of &lt;=64b allocation means a liveness check won't incur an extra cache miss since we're about to dereference the object anyway, and the entire object is on one cache line. However, for larger objects, it does incur an extra cache miss. Most objects are small, but programs with an unusually large proportion of medium sized objects not in an array could suffer a small performance hit.
    </li>
    <li className={ns()}>
      Having a separate heap per size class could increase fragmentation. This might be mitigating by using the regular malloc() and free() for large structs.
    </li>
  </ul>
</div>

</div>


    </div>
  </div>



              <div className={ns("margin")}>
                <div className={ns("toc-container")}>
                  <div className={ns("c-toc root")}>
<b>Vale's Hybrid-Generational Memory Model, Part 1</b><ul className={ns("c-toc")}><ul className={ns("c-toc")}><li className={ns("c-toc")}><a href="/blog/next-gen-memory-model#speedorsimplicity?">Speed or Simplicity?</a></li></ul><ul className={ns("c-toc")}><li className={ns("c-toc")}><a href="/blog/next-gen-memory-model#both!">Both!</a></li></ul><li className={ns("c-toc")}><a href="/blog/next-gen-memory-model#generationalindices!">Generational Indices!</a></li><ul className={ns("c-toc")}><li className={ns("c-toc")}><a href="/blog/next-gen-memory-model#objectandgenerationtables">Object and Generation Tables</a></li></ul><ul className={ns("c-toc")}><li className={ns("c-toc")}><a href="/blog/next-gen-memory-model#genind:ageneration+index">GenInd: A Generation + Index</a></li></ul><ul className={ns("c-toc")}><li className={ns("c-toc")}><a href="/blog/next-gen-memory-model#dereferencingagenind">Dereferencing a GenInd</a></li></ul><li className={ns("c-toc")}><a href="/blog/next-gen-memory-model#stage1:asimplebeginning">Stage 1: A Simple Beginning</a></li><li className={ns("c-toc")}><a href="/blog/next-gen-memory-model#stage2:addinggenerationnumbers">Stage 2: Adding Generation Numbers</a></li><li className={ns("c-toc")}><a href="/blog/next-gen-memory-model#nextsteps">Next Steps</a></li><li className={ns("c-toc")}><a href="/blog/next-gen-memory-model#afterword:anarcanetellingofwhat'stocome">Afterword: An Arcane Telling of What's to Come</a></li></ul>
                </div>

                <div className={ns("notes-header")}>
                  <sliceHeader update={this.updateNotesHeaderRect}/>
                </div>
              </div>


{/*<Note name="split" iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon}>
  We can sometimes work around this with Vec's {incode("split_at_mut")} method to get around this, but it's not always possible, and adds its own run-time costs.
</Note>*/}

<Note name="derefmiss" iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon}>
  Normally, ref-counting is expensive because it incurs an extra cache miss. Here, it's not extra, because it's in the object we're about to dereference anyway.
</Note>

<Note name="controlblock" iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon}>
  More precisely, a {incode("shared_ptr<T>")} is actually a a struct that contains a {incode("T*")} and a pointer to a "control block" struct which contains a "strong count", a "weak count", and another {incode("T*")}.
</Note>

<Note name="together" iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon}>
  Most implementations might actually combine these to be a {incode("std::vector<[u32, u32, T]>")}. Having separate lists makes it easier to understand some concepts further below.
</Note>

<Note name="47" iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon}>
  It's coincidence that 47 is one away from 48; these numbers are unrelated.
</Note>

<Note name="95" iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon}>
  Over the lifetime of the thread, we can have 2^95 total allocations. This limit is addressed in a later stage.
</Note>

<Note name="syntax" iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon}>
  Throughout this article, we'll use shorthand such as {incode("u32")} instead of {incode("uint32_t")}, and {incode("[u32, u32]")} instead of {incode("std::tuple<u32, u32>")}, sometimes even in C++ code.
</Note>

<Note name="159" iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon}>
  This struct is 159 bytes, but a later stage will shrink this down to 128, the same size as <a href="https://github.com/fitzgen/generational-arena">generational_arena::Index</a> and {incode("std::shared_ptr<T>")}.
</Note>

<Note name="345" iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon}>
  This if-statement can be expensive, but it's reduced to a couple non-branching instructions in a later stage.
</Note>

<Note name="dream" iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon}>
  A C++ developer's dream!
</Note>

<Note name="tuned" iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon}>
  The <a href="https://reddit.com/r/vale">Vale subreddit</a> is the best place to watch for the next articles. We'll also be sharing early drafts in the <a href="https://discord.gg/SNB8yGH">Vale discord server</a>!
</Note>

<Note name="help" iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon}>
  <div className={ns("content cozy")}>All contributions are welcome! Soon, we're going to:</div>
  <ul className={ns("content cozy")}>
    <li className={ns()}>Implement the remaining stages of the memory model!</li>
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

<Note name="stacklgt" iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon}>
  <div className={ns("content cozy")}>
    Since they're stack objects, there will be a limited number of them and they will be accessing it much more frequently, which means each spot will likely be hot in the cache.
  </div>
  <div className={ns("content cozy")}>
    Additionally, for the vast majority of programs, these slots in the LGT will be accessed in a very stack-like pattern, which should be very cache-friendly.
  </div>
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

