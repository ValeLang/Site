import React from 'react';
import ReactDOM from 'react-dom';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import {NoteManager, Note, NoteAnchor, NotesHeader} from '../components/Note.jsx';
import ss1svg from './superstructures1.svg';
import ss2svg from './superstructures2.svg';
import '../common.css';
import '../components/Tripage.css';
import SuperstructuresTOC from './SuperstructuresTOC.jsx';
import Snippet from '../components/Snippet.jsx';

const ns = (classes) => "c-ssmodifying m-tripage m-superstructures " + (classes || "");

const incode = (code) => <span className={ns("inline-code")}>{code}</span>

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

                <h1 className={ns("noline")}>Superstructures Guide: Modifying</h1>
                <div style={{color: "purple"}} className={ns("content")}>
                  (This is historical documentation for a feature that didn't make it into Vale, but later evolved into regions)
                </div>

                <div className={ns("content")}>
                  In the <a href="/superstructures/intro">intro</a>, we made a superstructure that contained some planets and some moons, shown below. This page will explain how to modify the superstructure.
                </div>

                <div className={ns("content splitter")}>
                  <div className={ns("half")}>
                    <Snippet>
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
                    </Snippet>
                  </div>
                  <div className={ns("half")}>
                    <Snippet>
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
            Moon("Mimas", 562))))));
 `}
                    </Snippet>
                  </div>
                </div>

                <h3 className={ns()}>Setting Fields</h3>

                <div className={ns("content")}>
                  
                </div>

                <div className={ns("content splitter")}>
                  <div className={ns("half")}>
                    Just as with regular Valence variables, fields' names must end in {incode("!")} to be modified. If we change {incode("Planet")}'s {incode("name")} field to {incode("name!")} then we can modify it.
                  </div>
                  <div className={ns("half")}>
                    <Snippet>
{`struct Planet {
  name!: Str;
  moons: List:Moon;
}`}
                    </Snippet>
                  </div>
                </div>

                <div className={ns("content splitter")}>
                  <div className={ns("half")}>
                    Now, we can get a reference to it and modify its name.
                  </div>
                  <div className={ns("half")}>
                    <Snippet>
{`let mySS = ...;
let saturn = &mySS.root.planets.1;
mut saturn.name! = "Flamscrankle";`}
                    </Snippet>
                  </div>
                </div>


                <h3 className={ns()}>Adding and Removing</h3>

                <div className={ns("content splitter")}>
                  <div className={ns("half")}>
                    {this.noteAnchor("noteCollections")}
                    {incode("List")} has a method called {incode("append")} which we can call to add new elements to the list.
                  </div>
                  <div className={ns("half")}>
                    <Snippet>
{`mySS.root.planets.append(
  Planet("Bogglewog", List()));`}
                    </Snippet>
                  </div>
                </div>

                <div className={ns("content splitter")}>
                  <div className={ns("half")}>
                    We can also use {incode("List")}'s {incode("remove")} method to remove things.
                  </div>
                  <div className={ns("half")}>
                    <Snippet>
{`mySS.root.planets.remove(
  &mySS.root.planets.2);`}
                    </Snippet>
                  </div>
                </div>

                <div className={ns("line")}/>

                <div className={ns("content")}>
                  As we can see, there's nothing special here. We modify things inside superstructures the same way we modify things outside superstructures.
                </div>

                <div className={ns("content")}>
                  Valence can take these simple modifications and do amazing things:
                  <ul className={ns()}>
                    <li className={ns()}>Notify observers of these modifications (see <a href="/superstructures/effects">Effects</a>).</li>
                    <li className={ns()}>Remember these modifications for later reverting (see <a href="/superstructures/reverting">Reverting</a>).</li>
                    <li className={ns()}>Send these modifications over the network (see below).</li>
                  </ul>
                </div>

                <div className={ns("content")}>
                  The next page explains how we can revert to past versions. Or, keep reading to see how we send modifications over the network!
                </div>

                <div className={ns("content")} style={{textAlign: "right"}}>
                  <strong>Next:</strong> <a href="/superstructures/reverting">Reverting</a>
                </div>

              </div>

            </div>

            <div className={ns("margin")}>

              <div className={ns("toc-container")}>
                <SuperstructuresTOC page="modifying"/>
                <div className={ns("notes-header")}>
                  <sliceHeader update={this.updateNotesHeaderRect}/>
                </div>
              </div>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="noteAnd">
                {incode("and")} makes a stream that pulls from two streams and closes when either of them closes.
              </Note>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="noteUpdates">
                Waiting on the updates stream (like {incode("foreach")} is indirectly doing here) gives {incode("sssc.updates")} the opportunity to check the network for incoming requests and apply them to {incode("mySS")}.
              </Note>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="noteCollections">
                We can also use other collections like {incode("Map")}, {incode("Set")}, etc. See <a href="/reference/colelctions">Collections</a> for more.
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
