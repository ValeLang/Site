import React from 'react';
import Header from '../Header.jsx';
import Footer from '../Footer.jsx';
import {NoteManager, Note, NoteAnchor, NotesHeader} from '../Note.jsx';
import {Link} from 'react-router-dom';
import ss1svg from './superstructures1.svg';
import ss2svg from './superstructures2.svg';
import '../Tripage.css';
import '../Tripage.css';
import SuperstructuresTOC from './SuperstructuresTOC.jsx';

const ns = (classes) => "c-ssreferences m-tripage m-superstructures " + (classes || "");

const incode = (code) => <span className={ns("inline-code")}>{code}</span>

class SuperstructuresReferences extends React.Component {
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

                <h1 className={ns("noline")}>Superstructures Guide: References</h1>

                <div className={ns("content")}>
                  In the <a to="/superstructures/intro">intro</a>, we made a superstructure that contained some planets and some moons, shown below. It contained only <strong>owning</strong> references. This page will show how we can add <strong>strong</strong> and <strong>weak</strong> references.
                </div>

                <div className={ns("content splitter")}>
                  <div className={ns("half")}>
                    <div className={ns("code")}>
{`superstructure MySuperstructure {
  root struct SolarSystem {
    planets: List:Planet;
  }
  struct Planet {
    name: Str;
    moons: List:Moon;
  }
  struct Moon {
    name: Str;
    radius: Int;
  }
}`}
                    </div>
                  </div>
                  <div className={ns("half")}>
                    <div className={ns("code")}>
{`let mySS =
  MySuperstructure(
    SolarSystem(
      List(
        Planet(
          "Earth",
          List(
            Moon("Luna", 1737))),
        Planet(
          "Saturn",
          List(
            Moon("Titan", 2576),
            Moon("Mimas", 562))))));

`}
                    </div>
                  </div>
                </div>

                <h3 className={ns()}>Owning References</h3>

                <img style={{float: "right", width: "342px", height: "208px"}} src={ss1svg}/>

                <div className={ns("content")}>
                  Our superstructure so far only contains <strong>owning references</strong>.
                </div>

                <div className={ns("content")}>
                  Superstructures' owning references follow the same rules as the rest of Valence: when the owning reference goes out of scope, the object is destroyed.
                </div>

                <div className={ns("content")}>
                  Note that there <strong>cannot be ownership cycles</strong>. If X owns Y, Y can't own X.
                </div>

                <div className={ns("content")}>
                  Keep in mind that anything indirectly owned by the root is part of the superstructure. Therefore, anything <strong>not</strong> indirectly owned by the root is <strong>not</strong> part of the superstructure.
                </div>

                <div className={ns("content cozy")}>
                  For example, if we made a Moon, and didn't attach it to a superstructure...
                </div>

                <div className={ns("content cozy code")}>
{`let m = Moon("Deimos", 6);`}
                </div>

                <div className={ns("content cozy")}>
                  ...it is not yet part of the superstructure. We would have to attach it to an existing member of the superstructure:
                </div>

                <div className={ns("content cozy code")}>
{`mySS.root.planets.0.moons.append(m);`}
                </div>

                <div style={{clear: "both"}}/>

                <h3 className={ns()}>Strong References</h3>

                <div className={ns("content")}>
                  Lets introduce some <strong>strong references</strong>. The below example adds an {incode("Astronaut")} class, with a strong reference to a planet.
                </div>

                <div className={ns("content splitter")}>
                  <div className={ns("half")}>

                    <div className={ns("code")}>
{`superstructure MySuperstructure {
  root struct SolarSystem {
    planets: List:Planet;
    astronauts: List:Astronaut;
  }
  struct Planet {
    name: Str;
    moons: List:Moon;
  }
  struct Moon {
    name: Str;
    radius: Int;
  }
  struct Astronaut {
    name: Str;
    planet: &Planet;
  }
}`}
                    </div>
                  </div>
                  <div className={ns("half")}>

                    <div className={ns("code")}>
{`let mySS =
  MySuperstructure(
    SolarSystem(
      List(
        Planet(
          "Earth",
          List(
            Moon("Luna", 1737)))
        Planet(
          "Saturn",
          List(
            Moon("Titan", 2576),
            Moon("Mimas", 562)))),
      List()));

mySS.root.astronauts.add(
  Astronaut(
    "Raynor",
    &mySS.root.planets.1));`}
                    </div>
                  </div>
                </div>

                <div className={ns("content")}>
                  <img style={{float: "right", width: "251px", height: "317px", marginLeft: "8px"}} src={ss2svg}/>

                  The dashed line in the picture represents a strong reference.
                </div>

                <div className={ns("content")}>
                  Remember that if we delete something that a strong reference is pointing to, the program will halt, similar to foreign key constraints in SQL.
                </div>

                <div className={ns("content")}>
                  Strong references are slightly more strict inside superstructures than in the rest of Valence:
                </div>

                <div className={ns("content")}>
                  <strong>A superstructure's strong references must only point only to things inside that superstructure.</strong>
                </div>

                <div className={ns("content")}>
                  We couldn't make our Astronaut point to any arbitrary planet, it has to be a planet from {incode("mySS")}.
                </div>

                <div className={ns("content cozy")}>
                  For example, moving Saturn out of the superstructure would cause the program to halt:
                </div>

                <div className={ns("content code cozy")}>
{`let saturn = mySS.root.planets.1;`} {this.noteAnchor("noteMove")}
                </div>

                <div className={ns("content")}>
                  Note the lack of an {incode("&")} (if we had an {incode("&")} then {incode("saturn")} would be a strong reference, not an owning one). Without the {incode("&")}, we just moved that planet out of the superstructure. Since the Astronaut was pointing at it, the program halted.
                </div>

                <div style={{clear: "both"}}/>

                <h3 className={ns()}>Weak References</h3>

                <div className={ns("content")}>
                  We can also have <strong>weak references</strong>. When something a weak reference is pointing at is destroyed, or moved out of the superstructure, the weak reference sets itself to null.
                </div>

                <div className={ns("content cozy")}>
                  To change the {incode("planet")} field to a weak reference, we would use an {incode("&&")} instead of {incode("&")} for the {incode("planet")} field:
                </div>

                <div className={ns("content cozy code")}>
{`struct Astronaut {
  name: Str;
  planet: &&Planet;
}`}
                </div>

                <div className={ns("content cozy")}>
                  And we would use an {incode("&&")} instead of {incode("&")} to get a weak reference to Saturn:
                </div>

                <div className={ns("content code")}>
{`mySS.root.astronauts.add(
  Astronaut(
    "Raynor",
    &&mySS.root.planets.1));`}
                </div>

                <div className={ns("content cozy")}>
                  Similar to strong references, we must be careful when moving things out of a superstructure. This would set our Astronaut's {incode("planet")} reference to null:
                </div>

                <div className={ns("content code cozy")}>
{`let saturn = mySS.root.planets.1;`}
                </div>

                <div className={ns("content cozy")}>
                  Since we just moved saturn out of the superstructure, our Astronaut's {incode("planet")} field is now null. {this.noteAnchor("noteMove2")}
                </div>

                <h3 className={ns()}>Strong References Are Constraints</h3>

                <div className={ns("content")}>
                  It's very important to recognize that every strong reference represents a constraint.
                </div>

                <div className={ns("content")}>
                  One can think of a strong reference as a "weak reference with a constraint enforcing that it points somewhere".
                </div>

                <div className={ns("content")}>
                  See <a to="/superstructures/constraints">Constraints</a> for more.
                </div>

                <div style={{clear: "both"}}/>

                <div className={ns("line")}/>

                <div className={ns("content")}>
                  In the next page, we learn about superstructure functions. Or, keep reading below to see how we can make references lazy.
                </div>

                <div className={ns("content")} style={{textAlign: "right"}}>
                  <strong>Next:</strong> <a href="/superstructures/functions">Functions</a>
                </div>

              </div>

              <div className={ns("networking")}>
                <h2 className={ns("noline")}>Lazy References</h2>
{/*
                <div className={ns("content code half")} style={{float: "right", marginLeft: "8px"}}>
{`superstructure MySuperstructure {
  root struct SolarSystem {
    planets: List:Planet;
    astronauts: List:Astronaut;
  }
  struct Planet {
    name: Str;
    moons: List:Moon;
  }
  struct Moon {
    name: Str;
    radius: Int;
  }
  struct Astronaut {
    name: Str;
    planet: &Planet;
  }
}`}
                </div>
*/}
                <div className={ns("content")}>
                  We often have superstructures that are too big to hold in one machine's memory. Or, we just don't want to waste valuable bandwidth downloading an entire superstructure when we only need part. For this reason, Valence gives us the {incode("LazySuperstructureClient")}. {this.noteAnchor("noteYouCanDoIt")}
                </div>

                <div className={ns("content")}>
                  The {incode("LazySuperstructureClient")} is a slightly different version of {incode("SimpleSuperstructureClient")}, where every reference becomes <strong>lazy</strong>.
                </div>

                <div className={ns("content")}>
                  This means that something is requested from the server only once you try to use it.
                </div>

                {/*<div className={ns("content")}>
                  <ul className={ns()}>
                    <li className={ns()}>{incode("planet: &Planet")} behaves like a {incode("planet: Lazy:&Planet")},</li>
                    <li className={ns()}>{incode("moons: List:Moon")} behaves like a {incode("moons: Lazy:List:Lazy:Moon")},</li>
                    <li className={ns()}>...and so on.</li>
                  </ul>
                </div>

                <div className={ns("content")}>
                  Code inside superstructure functions look the same, thanks to <a to="/blog/superlining">Superlining</a>, which automatically interleaves instructions to do as many parallel fetches as possible for uncached data.
                </div>

                <div className={ns("content cozy")}>
                  However, code outside superstructure functions have the normal {incode("Lazy")} usage. For example:
                </div>

                <div className={ns("content code cozy")}>
                  {`let saturn = mySS.root.planets.1;`}
                </div>

                <div className={ns("content cozy")}>
                  becomes:
                </div>

                <div className={ns("content code")}>
                  {`let saturn = mySS.root.get.planets.get.1.get;`}
                </div>

                <div className={ns("content cozy")}>
                  See <a to="/blog/superlining">Superlining</a> and <a to="/superstructures/functions">Functions</a> for more.
                </div>

                <div style={{clear: "both"}}></div>*/}

              </div>
            </div>

            <div className={ns("margin")}>

              <div className={ns("toc-container")}>
                <SuperstructuresTOC page="references"/>
                <div className={ns("notes-header")}>
                  <NotesHeader update={this.updateNotesHeaderRect}/>
                </div>
              </div>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="noteMove">
                This does not apply to code inside <a to="/superstructures/functions">superstructure functions</a>; data inside superstructure functions are still considered "part of the superstructure", just temporarily detached.
              </Note>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="noteMove2">
                See <a to="/superstructures/functions">Functions</a> for how to much more easily move things around and in and out of superstructures.
              </Note>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="noteYouCanDoIt">
                Just like {incode("SimpleSuperstructureClient")}, {incode("LazySuperstructureClient")} is part of the standard library, which means you could do anything it does.
              </Note>

{/*
              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="note2">
                Valence's "ownership" concept is similar to C++'s {incode("std::unique_ptr")} or Rust's ownership.
              </Note>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="noteStrong">
                See <a to="/basics">Basics</a> for more on Owning, Strong, and Weak references.
              </Note>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="note3">
                One can use a different name, but the root struct would need the {incode("root")} keyword in front.
              </Note>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="note4">
                {incode("mySS.root.planets.1")} means the element at index 1. In other languages this might be {incode("mySS.root.planets[1]")}.
              </Note>
*/}
            </div>
          </div>

        </div>
        <Footer/>
      </div>
    );
  }
}

export default SuperstructuresReferences;
