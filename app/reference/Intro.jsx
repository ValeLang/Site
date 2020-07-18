import '../components/Tripage.css';
import '../common.css';
import React from 'react';
import ReactDOM from 'react-dom';

import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import {NoteManager, Note, NoteAnchor, NotesHeader} from '../components/Note.jsx';
import Snippet from '../components/Snippet.jsx';

import ReferenceTOC from './ReferenceTOC.jsx';

const ns = (classes) => "c-ref-intro m-tripage " + (classes || "");

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

                <h1 className={ns("noline")}>Vale Introduction</h1>
                <div className={ns("content cozy")}>
                  Welcome to Vale! Vale is a fast, safe, and easy programming language. This introduction will show how to write a program in Vale.
                </div>
                <div className={ns("content cozy")}>
                  This reference assumes that you are familiar with basic programming concepts, and at least one other imperative language (like C, Java, Python, etc).
                </div>
                <div className={ns("content cozy")}>
                  Vale is still "in alpha", which means it's a preview; you can write programs in it, but some of the features that make it easy aren't yet available.
                </div>
                {/*<div className={ns("content cozy")}>
                  To get started, download Vale from the <a href="/downloads">downloads page</a>!
                </div>*/}

                <a name="helloworld"></a>
                <h3 className={ns()}>Hello world!</h3>

                <div className={ns("content splitter")}>
                  <div className={ns("half")}>
                    <p className={ns("cozy")}>Put the code to the right into a file named {incode("hello.vale")}, and then run {incode("vale run hello.vale")} to see it produce the output in the gray box. {this.noteAnchor("running")}</p>
                  </div>
                  <div className={ns("half")}>
                    <Snippet>
{/*
fn main() {
  println("Hello world!");
}
*/}
<span class="Prog"><span class="Fn">fn <span class="FnName">main</span><span class="Params">()</span> &#123;<br />  <span class="Block"><span class="Call"><span class="CallLookup">println</span>(<span class="Str">"Hello world!"</span>)</span>;<span class="W"></span></span><br />&#125;</span><br /></span>
                    </Snippet>
                    <div className={ns("output")}>
{`Hello world!`}
                    </div>
                  </div>
                </div>

                <a name="locals"></a>
                <h3 className={ns()}>Locals</h3>

                <div className={ns("content splitter")}>
                  <div className={ns("half")}>
                    <div className={ns("content cozy")}>
                      We can make a local variable with the {incode("=")} symbol.
                    </div>
                    <div className={ns("content cozy")}>
                      By default, a local is <b>final</b>, and a final local cannot be changed after it's made.
                    </div>

                  </div>
                  <div className={ns("half")}>
                    <Snippet>
{/*fn main() {
  x = "world!";
  println("Hello " + x);
}*/}
<span class="Prog"><span class="Fn">fn <span class="FnName">main</span><span class="Params">()</span> <span class="Block">&#123;<br />  <span class="Let">x = <span class="Str">"world!"</span>;</span><br />  <span class="Call"><span class="CallLookup">println</span>(<span class="Call"><span class="Str">"Hello "</span> <span class="CallLookup">+</span> <span class="Lookup">x</span></span>)</span>;<span class="W"></span><br />&#125;</span></span><br /></span>
                    </Snippet>
                    <div className={ns("output")}>
{`Hello world!`}
                    </div>
                  </div>
                </div>



                <div className={ns("content splitter")}>
                  <div className={ns("half")}>
                    <div className={ns("content cozy")}>
                      We can make a <b>varying</b> local with the {incode("!")} symbol, {this.noteAnchor("changeable")} and change it with the {incode("mut")} keyword.
                    </div>
                  </div>
                  <div className={ns("half")}>
                    <Snippet>
{/*fn main() {
  x! = "world!";
  mut x = "Antarctica!";
  println("Hello " + x);
}*/}
<span class="Prog"><span class="Fn">fn <span class="FnName">main</span><span class="Params">()</span> <span class="Block">&#123;<br />  <span class="Let">x! = <span class="Str">"world!"</span>;</span><br />  <span class="Mut">mut <span class="Lookup">x</span> = <span class="Str">"Antarctica!"</span></span>;<br />  <span class="Call"><span class="CallLookup">println</span>(<span class="Call"><span class="Str">"Hello "</span> <span class="CallLookup">+</span> <span class="Lookup">x</span></span>)</span>;<span class="W"></span><br />&#125;</span></span><br /></span>
                    </Snippet>
                    <div className={ns("output")}>
{`Hello Antarctica!`}
                    </div>
                  </div>
                </div>

                <a name="statictyping"></a>
                <h3 className={ns()}>Static Typing & Inference</h3>

                <div className={ns("content cozy")}>
                  Vale is a <a href="https://stackoverflow.com/questions/1517582/what-is-the-difference-between-statically-typed-and-dynamically-typed-languages">statically typed</a> language, which means the type of every local and member is known at compile-time.
                </div>

                <div className={ns("content splitter")}>
                  <div className={ns("half")}>
                    <div className={ns("content cozy")}>
                  In the above example, {incode("a")} is a {incode("Str")}. We can even specify it after the local's name.
                    </div>
                    <div className={ns("content cozy")}>
                  ...though we usually leave it out, because Vale uses type inference to figure out the type of {incode("x")} for us.
                    </div>
                  </div>
                  <div className={ns("half")}>
                    <Snippet>
<span class="Prog"><span class="Fn">fn <span class="FnName">main</span><span class="Params">()</span> <span class="Block">&#123;<br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">x</span></span> <span class="Typ">Str</span></span> = <span class="Str">"world!"</span>;</span><br />  <span class="Call"><span class="CallLookup">println</span>(<span class="Call"><span class="Str">"Hello "</span> <span class="CallLookup">+</span> <span class="Lookup">x</span></span>)</span>;<span class="W"></span><br />&#125;</span></span><br /></span>

{/*fn main() {
  x Str = "world!";
  println("Hello " + x);
}*/}
                    </Snippet>
                    <div className={ns("output")}>
{`Hello world!`}
                    </div>
                  </div>
                </div>


                <a name="functions"></a>
                <h3 className={ns()}>Functions</h3>

                <div className={ns("content splitter")}>
                  <div className={ns("half")}>
                    <div className={ns("content cozy")}>
                      Here we have a simple function that {incode("ret", "urns")} the argument plus two.
                    </div>
                  </div>
                  <div className={ns("half")}>
                    <Snippet>
{/*fn add2(x Int) Int {
  ret x + 2;
}
fn main() {
  println("Half-Life " + add2(1));
}*/}
<span class="Prog"><span class="Fn">fn <span class="FnName">add2</span><span class="Params">(<span class="Pat"><span class="Capture"><span class="CaptureName">x</span></span> <span class="Typ">Int</span></span>)</span> <span class="Typ">Int</span> <span class="Block">&#123;<br />  <span class="Ret">ret <span class="Call"><span class="Lookup">x</span> <span class="CallLookup">+</span> <span class="Num">2</span></span>;</span><br />&#125;</span></span><br /><span class="Fn">fn <span class="FnName">main</span><span class="Params">()</span> <span class="Block">&#123;<br />  <span class="Call"><span class="CallLookup">println</span>(<span class="Call"><span class="Str">"Half-Life "</span> <span class="CallLookup">+</span> <span class="Call"><span class="CallLookup">add2</span>(<span class="Num">1</span>)</span></span>)</span>;<span class="W"></span><br />&#125;</span></span><br /></span>
                    </Snippet>
                    <div className={ns("output")}>
{`Half-Life 3`}
                    </div>
                  </div>
                </div>

                <div className={ns("content splitter")}>
                  <div className={ns("half")}>
                    <div className={ns("content cozy")}>
                      We can leave off the {incode("Int")} return type, and it will be inferred from what type we give to the {incode("ret")}.
                    </div>
                  </div>
                  <div className={ns("half")}>
                    <Snippet>
{/*fn add2(x Int) {
  ret x + 2;
}*/}
<span class="Prog"><span class="Fn">fn <span class="FnName">add2</span><span class="Params">(<span class="Pat"><span class="Capture"><span class="CaptureName">x</span></span> <span class="Typ">Int</span></span>)</span> <span class="Block">&#123;<br />  <span class="Ret">ret <span class="Call"><span class="Lookup">x</span> <span class="CallLookup">+</span> <span class="Num">2</span></span>;</span><br />&#125;</span></span><br /></span>

                    </Snippet>
                  </div>
                </div>

                <div className={ns("content splitter")}>
                  <div className={ns("half")}>
                    <div className={ns("content cozy")}>
                      If it's only one line, we can leave off the {incode("ret")} and the semicolon.
                    </div>
                  </div>
                  <div className={ns("half")}>
                    <Snippet>
{/*fn add2(x Int) { x + 2 }*/}
<span class="Prog"><span class="Fn">fn <span class="FnName">add2</span><span class="Params">(<span class="Pat"><span class="Capture"><span class="CaptureName">x</span></span> <span class="Typ">Int</span></span>)</span> <span class="Block">&#123; <span class="Call"><span class="Lookup">x</span> <span class="CallLookup">+</span> <span class="Num">2</span></span> &#125;</span></span><br /></span>
                    </Snippet>
                  </div>
                </div>

                <div className={ns("content splitter")}>
                  <div className={ns("half")}>
                    <div className={ns("content cozy")}>
                      We can also make a <b>lambda</b>, a function inside another one. {this.noteAnchor("seetuplelambda")}
                    </div>
                  </div>
                  <div className={ns("half")}>
                    <Snippet>
{/*fn main() {
  add2 = (x Int){ x + 2 };
  println("Half-Life " + add2(1));
}*/}
<span class="Prog"><span class="Fn">fn <span class="FnName">main</span><span class="Params">()</span> <span class="Block">&#123;<br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">add2</span></span></span> = <span class="Lambda"><span class="Params">(<span class="Pat"><span class="Capture"><span class="CaptureName">x</span></span> <span class="Typ">Int</span></span>)</span><span class="Block">&#123; <span class="Call"><span class="Lookup">x</span> <span class="CallLookup">+</span> <span class="Num">2</span></span> &#125;</span></span>;</span><br />  <span class="Call"><span class="CallLookup">println</span>(<span class="Call"><span class="Str">"Half-Life "</span> <span class="CallLookup">+</span> <span class="Call"><span class="CallLookup">add2</span>(<span class="Num">1</span>)</span></span>)</span>;<span class="W"></span><br />&#125;</span></span><br /></span>
                    </Snippet>
                  </div>
                </div>

                <div className={ns("content splitter")}>
                  <div className={ns("half")}>
                    <div className={ns("content cozy")}>
                      We can leave the type off of a lambda's parameter, to make it shorter. {this.noteAnchor("genericlambda")}
                    </div>
                  </div>
                  <div className={ns("half")}>
                    <Snippet>
{/*fn main() {
  add2 = (x){ x + 2 };
  println("Half-Life " + add2(1));
}*/}
<span class="Prog"><span class="Fn">fn <span class="FnName">main</span><span class="Params">()</span> <span class="Block">&#123;<br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">add2</span></span></span> = <span class="Lambda"><span class="Params">(<span class="Pat"><span class="Capture"><span class="CaptureName">x</span></span></span>)</span><span class="Block">&#123; <span class="Call"><span class="Lookup">x</span> <span class="CallLookup">+</span> <span class="Num">2</span></span> &#125;</span></span>;</span><br />  <span class="Call"><span class="CallLookup">println</span>(<span class="Call"><span class="Str">"Half-Life "</span> <span class="CallLookup">+</span> <span class="Call"><span class="CallLookup">add2</span>(<span class="Num">1</span>)</span></span>)</span>;<span class="W"></span><br />&#125;</span></span><br /></span>

                    </Snippet>
                  </div>
                </div>

                <div className={ns("content splitter")}>
                  <div className={ns("half")}>
                    <div className={ns("content cozy")}>
                      We can shorten lambdas with the <b>almighty underscore</b>, which declares and immediately uses an implicit parameter.
                    </div>
                  </div>
                  <div className={ns("half")}>
                    <Snippet>
{/*fn main() {
  add2 = { _ + 2 };
  println("Half-Life " + add2(1));
}*/}
<span class="Prog"><span class="Fn">fn <span class="FnName">main</span><span class="Params">()</span> <span class="Block">&#123;<br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">add2</span></span></span> = <span class="Lambda"><span class="Block">&#123; <span class="Call"><span class="MagicParam">_</span> <span class="CallLookup">+</span> <span class="Num">2</span></span> &#125;</span></span>;</span><br />  <span class="Call"><span class="CallLookup">println</span>(<span class="Call"><span class="Str">"Half-Life "</span> <span class="CallLookup">+</span> <span class="Call"><span class="CallLookup">add2</span>(<span class="Num">1</span>)</span></span>)</span>;<span class="W"></span><br />&#125;</span></span><br /></span>

                    </Snippet>
                  </div>
                </div>

                <div className={ns("content splitter")}>
                  <div className={ns("half")}>
                    <div className={ns("content cozy")}>
                      In Vale, functions and methods are the same thing {this.noteAnchor("ufcs")}, so these two calls are exactly equivalent.
                    </div>
                  </div>
                  <div className={ns("half")}>
                    <Snippet>
{/*
s = "Hail Hydra!".split(" ");
s = split("Hail Hydra!", " ");
*/}
<span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">s</span></span></span> = <span class="Call"><span class="MemberAccess"><span class="Str">"Hail Hydra!"</span>.<span class="Lookup">split</span>(" ")</span><span class="Str"></span></span>;</span><br /><span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">s</span></span></span> = <span class="Call"><span class="CallLookup">split</span>(<span class="Str">"Hail Hydra!"</span>, <span class="Str">" "</span>)</span>;</span><span class="W"></span>

                    </Snippet>
                  </div>
                </div>

                <a name="tuples"></a>
                <h3 className={ns()}>Tuples</h3>

                <div className={ns("content splitter")}>
                  <div className={ns("half")}>
                    <div className={ns("content cozy")}>
                      A tuple is a simple struct, whose members are named 0, 1, 2, etc.
                    </div>

                    <div className={ns("content cozy")}>
                      We can make a tuple in Vale with square brackets (like&nbsp;{incode("[5, true, \"V\"]")}), and can access them with either a dot (like&nbsp;{incode("arr.0")}) or square brackets (like&nbsp;{incode("arr[1 + 1]")}).
                    </div>
                  </div>
                  <div className={ns("half")}>
                    <Snippet>
{/*fn main() {
  arr = [5, true, "V"];
  println("Babylon " + arr.0);
  println("Saturn " + arr[1 + 1]); `}{this.noteAnchor("variantindexing")}{`
}*/}
<span class="Prog"><span class="Fn">fn <span class="FnName">main</span><span class="Params">()</span> <span class="Block">&#123;<br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">arr</span></span></span> = <span class="Seq">[<span class="Num">5</span>, <span class="Bool">true</span>, <span class="Str">"V"</span>]</span>;</span><br />  <span class="Call"><span class="CallLookup">println</span>(<span class="Call"><span class="Str">"Babylon "</span> <span class="CallLookup">+</span> <span class="MemberAccess"><span class="Lookup">arr</span>.<span class="Lookup">0</span></span></span>)</span>;<br />  <span class="Call"><span class="CallLookup">println</span>(<span class="Call"><span class="Str">"Saturn "</span> <span class="CallLookup">+</span> <span class="Call"><span class="Lookup">arr</span>[<span class="Call"><span class="Num">1</span> <span class="CallLookup">+</span> <span class="Num">1</span></span>]</span></span>)</span>;<span class="W"></span> {this.noteAnchor("variantindexing")}<br />&#125;</span></span><br /></span>

                    </Snippet>
                    <div className={ns("output")}>
{`Babylon 5
Saturn V`}
                    </div>
                  </div>
                </div>

                <div className={ns("content splitter")}>
                  <div className={ns("half")}>
                    <div className={ns("content cozy")}>
                      We can also make a tuple by multiplying a constant integer {this.noteAnchor("constantint")} with a function.
                    </div>
                    <div className={ns("content cozy")}>
                      The integer determines how many elements will be in the tuple. The function takes the index, and returns the value that should be at that index.
                    </div>
                  </div>
                  <div className={ns("half")}>
                    <Snippet>
{/*fn add2(x Int) { x + 2 }
fn main() {
  arr = 3 * add2;`} {this.noteAnchor("ntupletype")}{`
  println(arr);
}*/}
<span class="Prog"><span class="Fn">fn <span class="FnName">add2</span><span class="Params">(<span class="Pat"><span class="Capture"><span class="CaptureName">x</span></span> <span class="Typ">Int</span></span>)</span> <span class="Block">&#123; <span class="Call"><span class="Lookup">x</span> <span class="CallLookup">+</span> <span class="Num">2</span></span> &#125;</span></span><br /><span class="Fn">fn <span class="FnName">main</span><span class="Params">()</span> <span class="Block">&#123;<br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">arr</span></span></span> = <span class="Call"><span class="Num">3</span> <span class="CallLookup">*</span> <span class="Lookup">add2</span></span>;</span> {this.noteAnchor("ntupletype")}<br />  <span class="Call"><span class="CallLookup">println</span>(<span class="Lookup">arr</span>)</span>;<span class="W"></span><br />&#125;</span></span><br /></span>

                    </Snippet>
                    <div className={ns("output")}>
{`[2, 3, 4]`}
                    </div>
                  </div>
                </div>

                <div className={ns("content splitter")}>
                  <div className={ns("half")}>
                    <div className={ns("content cozy")}>
                      This is often used with lambdas.
                    </div>
                  </div>
                  <div className={ns("half")}>
                    <Snippet>
{/*fn main() {
  arr = 3 * {_ + 2};
  println(arr);
}*/}
<span class="Prog"><span class="Fn">fn <span class="FnName">main</span><span class="Params">()</span> <span class="Block">&#123;<br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">arr</span></span></span> = <span class="Call"><span class="Num">3</span> <span class="CallLookup">*</span> <span class="Lambda"><span class="Block">&#123;<span class="Call"><span class="MagicParam">_</span> <span class="CallLookup">+</span> <span class="Num">2</span></span>&#125;</span></span></span>;</span><br />  <span class="Call"><span class="CallLookup">println</span>(<span class="Lookup">arr</span>)</span>;<span class="W"></span><br />&#125;</span></span><br /></span>
                    </Snippet>
                    <div className={ns("output")}>
{`[2, 3, 4]`}
                    </div>
                  </div>
                </div>




                <a name="arrays"></a>
                <h3 className={ns()}>Arrays</h3>

                <div className={ns("content splitter")}>
                  <div className={ns("half")}>
                    <div className={ns("content cozy")}>
                      We can only make a tuple if we know the size at compile-time. If we don't know, then we must use an <b>array</b>.
                    </div>
                    <div className={ns("content cozy")}>
                      We can make an array with the {incode("Array")} function.
                    </div>
                  </div>
                  <div className={ns("half")}>
                    <Snippet>
{/*fn main() {
  n = inputInt();`} {this.noteAnchor("inputInt")}{`
  arr = Array(n, {_ * 5});`} {this.noteAnchor("arraytype")}{`
  println(arr);
}*/}
<span class="Prog"><span class="Fn">fn <span class="FnName">main</span><span class="Params">()</span> <span class="Block">&#123;<br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">n</span></span></span> = <span class="Call"><span class="CallLookup">inputInt</span>()</span>;</span> {this.noteAnchor("inputInt")}<br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">arr</span></span></span> = <span class="Call"><span class="CallLookup">Array</span>(<span class="Lookup">n</span>, <span class="Lambda"><span class="Block">&#123;<span class="Call"><span class="MagicParam">_</span> <span class="CallLookup">*</span> <span class="Num">5</span></span>&#125;</span></span>)</span>;</span> {this.noteAnchor("arraytype")}<br />  <span class="Call"><span class="CallLookup">println</span>(<span class="Lookup">arr</span>)</span>;<span class="W"></span><br />&#125;</span></span><br /></span>

                    </Snippet>
                    <div className={ns("input")}>
{`4`}
                    </div>
                    <div className={ns("output")}>
{`[0, 5, 10, 15]`}
                    </div>
                  </div>
                </div>

                <a name="lists"></a>
                <h3 className={ns()}>Lists</h3>

                <div className={ns("content splitter")}>
                  <div className={ns("half")}>
                    <div className={ns("content cozy")}>
                      Arrays can't be resized at run-time. Lists can! {this.noteAnchor("arraylist")}
                    </div>
                    <div className={ns("content cozy")}>
                      We can make one with the {incode("List")} function.
                    </div>
                  </div>
                  <div className={ns("half")}>
                    <Snippet>
{/*fn main() {
  l = List<Int>();
  l.add(1);
  l.add(3);
  l.add(7);
  println(l);
}*/}
<span class="Prog"><span class="Fn">fn <span class="FnName">main</span><span class="Params">()</span> <span class="Block">&#123;<br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">l</span></span></span> = <span class="Call"><span class="CallLookup">List</span><span class="TplArgs">&lt;<span class="Typ">Int</span>&gt;</span>()</span>;</span><br />  <span class="Call"><span class="Lookup">l</span>.<span class="CallLookup">add</span>(<span class="Num">1</span>)</span>;<br />  <span class="Call"><span class="Lookup">l</span>.<span class="CallLookup">add</span>(<span class="Num">3</span>)</span>;<br />  <span class="Call"><span class="Lookup">l</span>.<span class="CallLookup">add</span>(<span class="Num">7</span>)</span>;<br />  <span class="Call"><span class="CallLookup">println</span>(<span class="Lookup">l</span>)</span>;<span class="W"></span><br />&#125;</span></span><br /></span>

                    </Snippet>
                    <div className={ns("output")}>
{`List(1, 3, 7)`}
                    </div>
                  </div>
                </div>

                <a name="loops"></a>
                <h3 className={ns()}>Loops</h3>

                <div className={ns("content cozy")}>
                  We can loop with the {incode("each")} statement: {this.noteAnchor("each")}
                </div>

                <div className={ns("content splitter")}>
                  <div className={ns("half")}>
                    <Snippet>
{/*fn main() {
  arr = ["Storm", "Earth", "Fire"];
  each arr (x){
    println(x);
  }
}*/}
<span class="Prog"><span class="Fn">fn <span class="FnName">main</span><span class="Params">()</span> <span class="Block">&#123;<br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">arr</span></span></span> = <span class="Seq">[<span class="Str">"Storm"</span>, <span class="Str">"Earth"</span>, <span class="Str">"Fire"</span>]</span>;</span><br />  <span class="Call"><span class="CallLookup">each</span> <span class="Lookup">arr</span> <span class="Lambda"><span class="Params">(<span class="Pat"><span class="Capture"><span class="CaptureName">x</span></span></span>)</span><span class="Block">&#123;<br />    <span class="Call"><span class="CallLookup">println</span>(<span class="Lookup">x</span>)</span>;<span class="W"></span><br />  &#125;</span></span></span><span class="W"></span><br />&#125;</span></span><br /></span>

                    </Snippet>
                  </div>
                  <div className={ns("half")}>
                    <div className={ns("output")}>
{`Storm
Earth
Fire



`}
                    </div>
                  </div>
                </div>

                <div className={ns("content cozy")}>
                  We can also get the index of the current iteration with the {incode("eachI")} statement.
                </div>

                <div className={ns("content splitter")}>
                  <div className={ns("half")}>
                    <Snippet>
{/*fn main() {
  arr = ["Storm", "Earth", "Fire"];
  eachI arr (i, x){
    println(i + ": " + x);
  }
}*/}
<span class="Prog"><span class="Fn">fn <span class="FnName">main</span><span class="Params">()</span> <span class="Block">&#123;<br />  <span class="Let"><span class="Pat"><span class="Capture"><span class="CaptureName">arr</span></span></span> = <span class="Seq">[<span class="Str">"Storm"</span>, <span class="Str">"Earth"</span>, <span class="Str">"Fire"</span>]</span>;</span><br />  <span class="Call"><span class="CallLookup">eachI</span> <span class="Lookup">arr</span> <span class="Lambda"><span class="Params">(<span class="Pat"><span class="Capture"><span class="CaptureName">i</span></span></span>, <span class="Pat"><span class="Capture"><span class="CaptureName">x</span></span></span>)</span><span class="Block">&#123;<br />    <span class="Call"><span class="CallLookup">println</span>(i + ": "<span class="Call"><span class="Call"><span class="Lookup"></span><span class="CallLookup"></span><span class="Str"></span></span> <span class="CallLookup">+</span> <span class="Lookup">x</span></span>)</span>;<span class="W"></span><br />  &#125;</span></span></span><span class="W"></span><br />&#125;</span></span><br /></span>

                    </Snippet>
                  </div>
                  <div className={ns("half")}>
                    <div className={ns("output")}>
{`0: Storm
1: Earth
2: Fire



`}
                    </div>
                  </div>
                </div>

                <div className={ns("content")} style={{textAlign: "right"}}>
                  <strong>Next:</strong> <a href="/ref/structs">Structs</a>
                </div>

              </div>

            </div>

            <div className={ns("margin")}>

              <div className={ns("toc-container")}>
                <ReferenceTOC page="intro"/>
                <div className={ns("notes-header")}>
                  <NotesHeader update={this.updateNotesHeaderRect}/>
                </div>
              </div>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="running">
                We can also make an executable with {incode("vale build hello.vale")}, which produces an executable {incode("hello")} (or {incode("hello.exe")} on windows). We can also specify the name with the {incode("-o")} flag.
              </Note>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="each">
                The {incode("each")} statement is syntactic sugar for the {incode("each")} method:
                <div>{incode("each arr (x){ println(x); }")}</div>
                <div>is equivalent to</div>
                <div>{incode("arr.each((x){ println(x); })")}</div>
              </Note>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="variantindexing">
                Most language can't index into tuples, but Vale makes it possible with <a href="#">variant indexing</a>. Discounting optimizations, indexing this struct gives a variant {incode("(Int|Bool|Str)")}, with a {incode("+")} function that calls the appropriate actual {incode("+")} depending on the run-time type ({incode("Int")} vs {incode("Bool")} vs {incode("Str")}).
              </Note>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="constantint">
                A "constant integer" is an integer known at compile time.
              </Note>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="ntupletype">
                The type of {incode("arr")} is {incode("[3 * Int]")}.
              </Note>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="changeable">
                Vale's {incode("x")} and {incode("x!")} are like
                <div>
                  Java's {incode("final int x")} and {incode("int x")},
                </div>
                <div>
                  Kotlin's {incode("let x")} and {incode("var x")}, and
                </div>
                <div>
                  Rust's {incode("let x")} and {incode("let mut x")}.
                </div>
                {/*<div style={{marginTop: "8px"}}>
                  See <a to="/blog/bangsyntax">Syntax Design for Varying</a> for why Vale chose {incode("!")} and {incode("mut")}.
                </div>*/}
              </Note>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="seetuplelambda">
                See the Tuples section below for an example of how lambdas are super useful.
              </Note>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="arraylist">
                Vale's lists are like C#'s {incode("List")}, Java's {incode("ArrayList")} or C++'s {incode("vector")}; it's backed by an array, not a linked list.
              </Note>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="inputInt">
                {incode("inputInt")} reads an integer from the user's keyboard. In this example, the user is entering 4.
              </Note>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="arraytype">
                The type of {incode("arr")} here is {incode("Array<Int>")}.
              </Note>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="ufcs">
                This is known as Universal Function Call Syntax. This makes method chaining nicer, for example
                <div>{incode("a.f(3).g(true).h(\"Yendor\")")}</div>
                as opposed to
                <div>{incode("h(g(f(a, 3), true), \"Yendor\")")}.</div>
              </Note>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="genericlambda">
                Taking out the parameter's type makes this a "generic" lambda. See <a to="/ref/generics">generics</a> for more.
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
