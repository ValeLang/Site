import React from 'react';
import '../Tripage.css';
import '../Tripage.css';
import Header from '../Header.jsx';
import Footer from '../Footer.jsx';
import {Link} from 'react-router-dom';
import {NoteManager, Note, NoteAnchor, NotesHeader} from '../Note.jsx';
import SuperstructuresTOC from './SuperstructuresTOC.jsx';

const ns = (classes) => "c-ssconstraints m-superstructures m-tripage " + (classes || "");

const incode = (code) => <span className={ns("inline-code")}>{code}</span>

class SuperstructuresConstraints extends React.Component {
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

                <h1 className={ns("noline")}>Superstructures Guide: Constraints</h1>

                <div className={ns("content")}>
                  To make sure a Valence superstructure always stays "sane", we can add <strong>constraints</strong> to it.
                </div>

                <div className={ns("content")}>
                  "Sane" means something different to every superstructure. For example, if an airplane is made of parts, then the airplane's {incode("weight")} should always be the sum of its parts' {incode("weight")}. That rule is a <strong>constraint</strong>.
                </div>

                <div className={ns("content")}>
                  When we violate our constraints, it means a bug has occurred.
                </div>

                <div className={ns("content")}>
                  In Valence, we can express our constraints in code, and have our superstructure watch for when these bugs occur. This is incredibly useful in debugging and validation.
                </div>

                <h3>Adding a Constraint</h3>

                <div className={ns("content")}>
                  In the <a to="/superstructures/intro">intro</a>, we made a superstructure that contained some planets and some moons.
                </div>
                <div className={ns("content")}>
                  We'll add a "mass" property to both, and a constraint that checks that planets are always heavier than their moons.
                </div>

                <div className={ns("content")}>
  <div className={ns("code")}>
{`superstructure MySuperstructure {
  root struct SolarSystem {
    planets: List:Planet;
  }
  struct Planet {
    name: Str;
    mass!: Int;`} {this.noteAnchor("bang")}{`
    moons: List:Moon;
  }
  struct Moon {
    planet: &Planet;
    name: Str;
    mass!: Int;
  }

  constraint checkMass(Planet.mass, Moon.mass) {
    {(p: &Planet) p.moons.map({ _.mass < p.mass }).hasOnly(true)}
    {(m: &Moon) m.mass < m.planet.mass}
  }
}`}
  </div>
                </div>

                <div className={ns("content")}>
                  A constraint is triggered when the specified fields changes, in this case, {incode("Planet.mass")} and {incode("Moon.mass")}.
                </div>

                <div className={ns("content")}>
                  Depending on what changed, it will call one of the constraint's functions:
                  <ul className={ns()}>
                    <li className={ns()}>If we change a {incode("Planet.mass")}, then the function accepting a {incode("Planet")} is called.</li>
                    <li className={ns()}>If we change a {incode("Moon.mass")}, then the function accepting a {incode("Moon")} is called.</li>
                  </ul>
                </div>

                <h3>Violating Constraints</h3>

                <div className={ns("content cozy")}>
                  Now, let's see what happens when we try to violate this constraint:
                </div>

                <div className={ns("content cozy")}>
  <div className={ns("code")}>
{`let mySS =
  MySuperstructure(
    SolarSystem(
      List(Planet("Saturn", 1234, List(Moon("Titan", 9999999))))));`}
  </div>
                </div>

                <div className={ns("content cozy")}>
                  The above code halts with this output:
                </div>

                <div className={ns("content")}>
  <div className={ns("code")}>
{`Violated constraint function checkMass(:&Planet):Bool!
(stack trace)`}
  </div>
                </div>

                <div className={ns("content cozy")}>
                  Now, let's start with a good superstructure, and then afterwards violate the constraint later.
                </div>

                <div className={ns("content cozy")}>
                  <div className={ns("code")}>
{`let mySS =
  MySuperstructure(
    SolarSystem(
      List(Planet("Saturn", 600, List(Moon("Titan", 400))))));

mySS.root.planets.0.mass = 100;`}
                  </div>
                </div>

                <div className={ns("content")}>
                  The above code halts with the same output.
                </div>

                <h3>Trying</h3>

                <div className={ns("content cozy")}>
                  At runtime, we can attempt a modification, and instead of halting, the superstructure can revert back to its previous state:
                </div>

                <div className={ns("content cozy")}>
  <div className={ns("code")}>
{`let mySS =
  MySuperstructure(
    SolarSystem(
      List(Planet("Saturn", 600, List(Moon("Titan", 400))))));

let succeeded =
  mySS.try({
    mySS.root.planets.0.mass = 100;
  });

doutln succeeded;`}
  </div>
                </div>

                <div className={ns("content")}>
                  The above code prints <strong>false</strong>, and the superstructure is unchanged.
                </div>

                <div className={ns("line")}/>

                <div className={ns("content")}>
                  In the next page, we see other kinds of references, including the <strong>strong reference</strong>, which is a kind of constraint. Or, keep reading below for networking considerations for constraints.
                </div>

                <div className={ns("content")} style={{textAlign: "right"}}>
                  <strong>Next:</strong> <a href="/superstructures/references">References</a>
                </div>

  {/*
                <h3 className={ns("cozy")}>Keep in mind...</h3>

                <div className={ns("content cozy")}>
                  <ul className={ns()}>
                    <li className={ns()}>
                      {this.noteAnchor("note3")}We can speed up reverting to <strong>constant time</strong> by changing the superstructure's history setting to <a to="/superstructures/formats">chronotree</a> or <a to="/superstructures/formats">chronobase</a>.
                    </li>
                    <li className={ns()}>
                      {this.noteAnchor("note4")}The strong reference rules apply, just like anywhere in Valence. Anything pointed at by a strong reference cannot be deleted in a revert.
                    </li>
                  </ul>
                </div>

                <div className={ns("content")}>
                  <br/>
                  <br/>
                  <br/>
                </div>
  */}
              </div>
              
              <div className={ns("networking")}>
                <h3 className={ns("noline")}>Networking with Constraints</h3>

                <div className={ns("content")}>
                  Most applications will want to use constraints to make sure that the data stays sane even when many devices are sending updates to the central superstructure.
                </div>

                <div className={ns("content")}>
                  There are some applications, however, which might want to forego constraints and use the Perfect Merging approach to avoid errors, and enable offline editing plus other benefits.
                </div>

                <div className={ns("content")}>
                  See <a to="/blog/perfectmerging">Perfect Merging</a> for more.
                </div>

              </div>
            </div>

            <div className={ns("margin")}>
              <div className={ns("toc-container")}>
                <SuperstructuresTOC page="constraints"/>
                <div className={ns("notes-header")}>
                  <NotesHeader update={this.updateNotesHeaderRect}/>
                </div>
              </div>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="bang">
                The {incode("!")} in {incode("mass!")} makes the field changeable; we can point it at a different {incode("Int")}.
              </Note>
{/*
              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="note1">
                <div>{incode("v.version")} is a built-in function.</div>
                <div>&nbsp;</div>
                <div>If we had {incode("using v;")} at the top of the file, then we could call {incode("version")} without the {incode("v.")} in front.</div>
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

export default SuperstructuresConstraints;
