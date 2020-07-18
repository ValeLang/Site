import React from 'react';
import '../Tripage.css';
import '../Tripage.css';
import Header from '../Header.jsx';
import Footer from '../Footer.jsx';
import {Link} from 'react-router-dom';
import {NoteManager, Note, NoteAnchor, NotesHeader} from '../Note.jsx';
import SuperstructuresTOC from './SuperstructuresTOC.jsx';

const ns = (classes) => "c-ssreverting m-tripage m-superstructures " + (classes || "");

const incode = (code) => <span className={ns("inline-code")}>{code}</span>

class SuperstructuresReverting extends React.Component {
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

                <h1 className={ns("noline")}>Superstructures Guide: Reverting</h1>
                <div className={ns("content")}>
                  In the <a to="/superstructures/intro">References</a> page, we made a superstructure that contained some planets, some moons, and an astronaut, shown below. This page will show how to revert to past versions of this data.
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
    &mySS.root.planets.1));
 `}
  </div>
                  </div>
                </div>

                <h3 className={ns()}>Enabling Reverting</h3>

                <div className={ns("code-on-right")}>
                  <div className={ns("content splitter")}>
                    <div className={ns("half")}>
                      <div className={ns("content")}>First, we enable history on our superstructure with {incode("History")} and {incode("Revertible")}.</div>
                      <div className={ns("content end")}>The {incode("@Revertible(true);")} enables reverting.</div>
                    </div>

                    <div className={ns("half")} style={{float: "right", clear: "both"}}>
  <div className={ns("code")}>
{`superstructure MySuperstructure {
  @History(Linear);`} {this.noteAnchor("note0")} <NoteAnchor iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteAnchorPosition} name="note0.5"/>{`
  @Revertible(true);

  root struct SolarSystem {
...`}
  </div>
                    </div>
                  </div>
                </div>

                <div className={ns("content")}>Revertibility requires history, so the {incode("@History(Linear);")} instructs the compiler to keep track of changes. See <a to="/superstructures/annotations">Superstructure Settings</a> for other history options.</div>

                <h3 className={ns()}>Using It</h3>

                <div className={ns("content")}>
                  Let's hold onto a version number, do some changes, and then revert those changes.
                </div>

                <div className={ns("code-on-right")}>
                  <div className={ns("content splitter")}>
                    <div className={ns("half")}>
                      We can get the version number of our superstructure using {incode("v.version")}. {this.noteAnchor("note1")} <NoteAnchor iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteAnchorPosition} name="note1.5"/>
                    </div>

                    <div className={ns("half")} style={{float: "right", clear: "both"}}>
  <div className={ns("code")}>
{`let firstVersion = v.version(mySS);`}
  </div>
                    </div>
                  </div>

                  <div className={ns("content splitter")}>
                    <div className={ns("half")}>
                      Then, let's add another planet, Pluto, and make the astronaut's {incode("planet")} field point to it.
                    </div>

                    <div className={ns("half")}>
  <div className={ns("code")}>
{`mySS.root.planets.add(
  Planet(
    "Pluto",
    List(
      Moon("Charon", 606700))));

mySS.root.astronauts.0.planet =
  &mySS.root.planets.2;
`}
  </div>
                    </div>
                  </div>

                  <div className={ns("content splitter")}>
                    <div className={ns("half")}>
                      Then, let's revert the entire superstructure back to the previous version, using {incode("v.revert")}.
                    </div>
                    <div className={ns("half")}>
  <div className={ns("code")}>
{`v.revert(mySS, firstVersion);`} {this.noteAnchor("note2")}
  </div>
                    </div>
                  </div>
                </div>

                <div className={ns("content")}>
                  Suddenly, Pluto's gone, and the astronaut's {incode("planet")} field is pointing to Saturn, like it was before!
                </div>

                <div className={ns("content")}>
                  See <a to="/playground">the full code here</a>.
                </div>

                <h3 className={ns("cozy")}>What can we use reverting for?</h3>

                <div className={ns("content")}>
                  <ul className={ns()}>
                    <li className={ns()}>Undo history, for example in Photoshop.</li>
                    <li className={ns()}>Saves in a video game.</li>
                    <li className={ns()}>Restoring to the last good state after errors.</li>
                  </ul>

                  Reverting can also enable <a to="/superstructures/clientsideprediction">Client-Side Prediction</a>, which applies changes locally before sending them to a server.
                </div>

                <h3 className={ns("cozy")}>Keep in mind...</h3>

                <div className={ns("content cozy")}>
                  <ul className={ns()}>
                    <li className={ns()}>
                      We can speed up reverting to <strong>constant time</strong> by changing the superstructure's history setting to <a to="/superstructures/formats">chronotree</a> or <a to="/superstructures/formats">chronobase</a>. {this.noteAnchor("note3")}
                    </li>
                    <li className={ns()}>
                      The strong reference rules apply, just like anywhere in Valence. Anything pointed at by a strong reference cannot be deleted in a revert. {this.noteAnchor("note4")}
                    </li>
                  </ul>
                </div>

                <div className={ns("line")}/>

                <div className={ns("content")}>
                  In the next page, we see how to read data from past versions: Snapshots!
                </div>

                <div className={ns("content")} style={{textAlign: "right"}}>
                  <strong>Next:</strong> <a href="/superstructures/snapshots">Snapshots</a>
                </div>
              </div>
            </div>

            <div className={ns("margin")}>
              <div className={ns("toc-container")}>
                <SuperstructuresTOC page="reverting"/>
                <div className={ns("notes-header")}>
                  <NotesHeader update={this.updateNotesHeaderRect}/>
                </div>
              </div>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="note1">
                {incode("v.version")} is a built-in function.
              </Note>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="note1.5">
                If we had {incode("using v;")} at the top of the file, then we could call {incode("version")} without the {incode("v.")} in front.
              </Note>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="note2">
                {incode("v.revert")} is a built-in function.
              </Note>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="note3">
                See <a to="/superstructures/formats">history settings</a> for more.
              </Note>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="note4">
                For example, if we said {incode("let x = &mySS.root.planets.2")} before the {incode("v.revert")} call, the program would have halted.
              </Note>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="note0">
                These are annotations, like in Java. Unlike Java, these apply to the containing thing (the superstructure), not the following thing (the struct).
              </Note>
              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="note0.5">
                These are assuming we have {incode("using v;")} above, otherwise it would be {incode("@v.History(v.Linear)")} and {incode("@v.Revertible(true)")}.
              </Note>
            </div>
          </div>

        </div>
        <Footer/>
      </div>
    );
  }
}

export default SuperstructuresReverting;
