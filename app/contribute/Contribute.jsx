import React from 'react'
import ReactDOM from 'react-dom';
import '../common.css'
import '../components/WidePage.css'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx';

// namespaces classes
const ns = (classes) => "c-roadmap c-widepage " + (classes || "");

class Page extends React.Component {
  render() {
    return (
      <div className={ns()}>
        <Header/>

        <div className={ns("page")}>

          <h1 className={ns()}>How to Contribute</h1>

          <div className={ns("columns")}>
            <p>
              Vale is currently <a href="/roadmap">97% of the way towards its first launch at v0.1.</a>
            </p>

            <p>
              The world needs a language that is <b>easy, fast, and safe,</b> and with your help, we can make it happen!
            </p>

            <p>
              If you'd like to join us and contribute, post in the <a href="http://reddit.com/r/vale">r/Vale</a> subreddit or come by the <a href="https://discord.gg/SNB8yGH">Vale discord</a>!
            </p>
            
            <p>
              Any contributions are welcome, and if you're looking for some ideas, here's some interesting things Vale needs!
            </p>
            <p>Projects involving writing Vale code:</p>
            <ul>
              <li>Add to the Vale standard library! (sets, hash maps, lists, futures, etc.)</li>
              <li>Implement Vale programs for benchmarking (k-nucleotide, mandelbrot, etc.)</li>
            </ul>

            <p>Compiler projects (not requiring in-depth knowledge of the Vale compiler):</p>
            <ul>
              <li>A new parser, to replace our current combinator-based one!</li>
              <li>Implement the bump allocator for bump calling!</li>
              <li>VIR-to-Swift, VIR-to-JVM, or VIR-to-JS cross-compilers, to run Vale on iOS/JVM/Web!</li>
              <li>Compile-time ref-counting!</li>
            </ul>

            <p>Tooling projects:</p>
            <ul>
              <li>Syntax highlighters! (VSCode, Sublime, Vim, Emacs, etc)</li>
              <li>Linters!</li>
              <li>Auto-formatters!</li>
            </ul>

            <p>Language design projects:</p>
            <ul>
              <li>Region borrow checker</li>
              <li>Concurrency strategy (green threads vs async/await, etc)</li>
              <li>Metaprogramming functions and constructs</li>
            </ul>

            <p>
              If you'd like to join us and contribute, post in the <a href="http://reddit.com/r/vale">r/Vale</a> subreddit or come by the <a href="https://discord.gg/SNB8yGH">Vale discord</a>!
            </p>
          </div>
          <Footer/>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Page />,
  document.getElementById('main')
);
