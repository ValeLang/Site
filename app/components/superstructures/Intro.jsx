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

const ns = (classes) => "c-ssintro m-tripage m-superstructures " + (classes || "");

const incode = (code) => <span className={ns("inline-code")}>{code}</span>

class SuperstructuresIntro extends React.Component {
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

                <h1 className={ns("noline")}>Superstructures Guide: Introduction</h1>
                <div className={ns("content cozy")}>
                  A <strong>"superstructure"</strong> is a set of structs, interfaces, and functions, which follow certain patterns.
                </div>
                <div className={ns("content cozy")}>
                  Valence can take a superstructure and give it wonderful capabilities such as time-travel and synchronizing over the network.
                </div>
                <div className={ns("content cozy")}>
                  The Superstructures Guide will walk you through the various capabilities of superstructures (modifying, snapshots, constraints, etc) and, at the end of every page, show how it can be used with networking.
                </div>
                <div className={ns("content")}>
                  If you haven't seen <a to="/basics">Valence Basics</a>, go take a look! Everything in this page builds on the basics.
                </div>

                <a name="whatisasuperstructure"></a>
                <h3 className={ns()}>What's a Superstructure?</h3>

                <div className={ns("content splitter")}>
                  <div className={ns("half")}>
                    <p className={ns("cozy")}>Here's an example superstructure:</p>

                    <div className={ns("code")}>
{`superstructure MySuperstructure {
  root struct SolarSystem {
    planets: List:Planet;`} {this.noteAnchor("note1")}{`
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
                    <p className={ns("cozy")}>And here's some data:</p>

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
            Moon("Mimas", 562)))));
`}
                    </div>
                  </div>
                </div>

                <div className={ns("content")}>
                  <img style={{float: "right", width: "324px", height: "208px"}} src={ss1svg}/>

                  The first thing to note is that, like everything in Valence, a superstructure is <strong>hierarchical</strong>; every struct is owned {this.noteAnchor("note2")} by another struct.
                </div>
                
                <div className={ns("content")}>
                  Everything indirectly owned by the root is part of the superstructure.
                </div>

                <div style={{clear: "both"}}></div>

                <h3 className={ns("cozy")}>Reading a Superstructure</h3>

                <div className={ns("content splitter")}>
                  <div className={ns("half")}>
                    <div className={ns("content")}>
                      To quickly and conveniently see a superstructure's contents, use {incode("doutln")}. {this.noteAnchor("noteDoutln")}
                    </div>

                    <div className={ns("content code")}>
{`doutln mySS;`}
                    </div>

                    <div className={ns("content")}>
                      When we {incode("doutln")} a superstructure, it prints in the {incode(".sss")} format. See right for an example.
                    </div>

                    <div className={ns("content end")}>
                      The number after the # is the ID. {this.noteAnchor("noteID")} Every struct in a superstructure has an ID, including any {incode("List")}, {incode("Map")}, {incode("Set")}, etc.
                    </div>

                  </div>
                  <div className={ns("half")}>
                    <div className={ns("code")}>
{`MySuperstructure(
  SolarSystem#9(
    List#8(
      Planet#3(
        "Earth",
        List#2(
          Moon#1("Luna", 1737)))
      Planet#7(
        "Saturn",
        List#6(
          Moon#4("Titan", 2576),
          Moon#5("Mimas", 562))))));`}
                    </div>
                  </div>
                </div>

                <div className={ns("content cozy")}>
                  One can access parts of a superstructure through the root, like so:
                </div>

                <div className={ns("content cozy code")}>
{`doutln mySS.root.planets.1.name;`} {this.noteAnchor("note4")}
                </div>

                <div className={ns("content")}>
                  The above would print out "Saturn".
                </div>

                <div className={ns("content cozy")}>
                  On the left we loop over every moon, printing out its radius. On the right is the output.
                </div>

                <div className={ns("content splitter")}>
                  <div className={ns("half")}>
                    <div className={ns("code")}>
{`foreach mySS.root.planets {(planet) `}{this.noteAnchor("noteForeach")}{`
  foreach planet.moons {(moon)
    doutln moon.radius;
  }
}`}
                    </div>
                  </div>
                  <div className={ns("half")}>
                    <div className={ns("code")}>
{`1737
2576
562`}
                    </div>
                  </div>
                </div>

                <div className={ns("line")}/>

                <div className={ns("content")}>
                  In the next page, we see how to observe changes to the data.
                </div>

                <div className={ns("content")}>
                  At the bottom of every page of the Superstructures Guide is a pagelet explaining the networking aspect. Keep reading below to learn how to harness superstructures for networking!
                </div>

                <div className={ns("content")} style={{textAlign: "right"}}>
                  <strong>Next:</strong> <a href="/superstructures/effects">Effects</a>
                </div>

              </div>

              <div className={ns("networking")}>
                <h3 className={ns("noline")}>Sending Superstructures</h3>

                <div className={ns("content")}>
                  Superstructures make networking ridiculously easy.
                </div>

                <div className={ns("content")}>
                  Here, we'll see how one machine can request a superstructure from another, and continuously listen for updates.
                </div>

                <div className={ns("content")}>
                  Below are examples of using the {incode("SimpleSuperstructureServer")} and {incode("SimpleSuperstructureClient")}. {this.noteAnchor("noteSSSS")}
                </div>

                <div className={ns("content")}>
                  On the left is the server, which listens for clients. When a client connects, the server will send them the superstructure, and keep the connection open to send updates. The program then sets Saturn's name from what the user typed.
                </div>

                <div className={ns("content")}>
                  On the right is a client, which connects to the server, receives the superstructure, prints it out, and then listens for updates.
                </div>

                <div className={ns("content splitter")}>
                  <div className={ns("half")}>
                    <div className={ns("code")}>
{``}<div className={ns("comment")}>{`// Server
`}</div>{`
fn main() {
  let mySS =
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

`}<div className={ns("comment")}>{`  // Make the server.
`}</div>{`  let server =
    SimpleSuperstructureServer(
      &mySS, 8080);

`}<div className={ns("comment")}>{`  // Listen for new connections,
  // send updates in real-time.
`}</div>{`  server.start();

  let saturn = &mySS.root.planets.1;

`}<div className={ns("comment")}>{`  // Change Saturn's name to
  // whatever the user inputs.
  // Stops on ctrl+D.
`}</div>{`  foreach LineReader(cin) {(line)
    mut saturn.name! = line;
    doutln "Changed name to" line;
  }

  doutln "Done!";
}`}
                    </div>
                  </div>
                  <div className={ns("half")}>
                    <div className={ns("code")}>
{``}<div className={ns("comment")}>{`// Client
`}</div>{`
fn main() {
`}<div className={ns("comment")}>{`  // Make the client.
`}</div>{`  let sssc =
    SimpleSuperstructureClient(
      "localhost", 8080);

`}<div className={ns("comment")}>{`  // Receive superstructure,
  // listen for updates.
`}</div>{`  let theSS = ssss.start();

`}<div className={ns("comment")}>{`  // Print the superstructure.
`}
</div>
{`  doutln theSS;

`}<div className={ns("comment")}>
{`  // This stream listens to both
  // the server and the keyboard.
`}
</div>
{`  let eventsStream =
    and(sssc.updates, cin);`} {this.noteAnchor("noteAnd")}{`

`}<div className={ns("comment")}>
{`  // Receives updates from server
  // and keyboard. Stops on ctrl+D.
`}
</div>
{`  foreach eventsStream { `}{this.noteAnchor("noteUpdates")}{`
    {(update: Update)
      doutln "Got update!";
      doutln "New contents:";
      doutln theSS;
    }
    {(char: Str) `}<span className={ns("comment")}>{`/* ignore */`}</span>{`}
  }

  doutln "Done!";
}
`}
                    </div>
                  </div>
                </div>

                <div className={ns("content")}>
                  The above code shows the server sending modifications to the client. The client can also send modification requests to the server, see <a to="/superstructures/functions">Functions</a>.
                </div>

              </div>
            </div>

            <div className={ns("margin")}>

              <div className={ns("toc-container")}>
                <SuperstructuresTOC page="intro"/>
                <div className={ns("notes-header")}>
                  <NotesHeader update={this.updateNotesHeaderRect}/>
                </div>
              </div>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="noteAnd">
                {incode("and")} makes a stream that pulls from two streams and closes when either of them closes.
              </Note>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="noteUpdates">
                Waiting on the updates stream (like {incode("foreach")} is indirectly doing here) gives {incode("sssc.updates")} the opportunity to check the network for incoming requests and apply them to {incode("mySS")}.
              </Note>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="note1">
                {incode("List:Planet")} means a mutable list of planets. In other languages this might be {incode("List<Planet>")}.
              </Note>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="noteDoutln">
                {incode("doutln")} is a function that prints anything to the console. It even does wrapping and pretty colors!
              </Note>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="note2">
                These are <strong>owning</strong> references. There can also be <strong>strong</strong> and <strong>weak</strong> references, see <a to="/superstructures/references">References</a>.
              </Note>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="noteID">
                Superstructures also support UUIDs, see <a to="/reference/superstructure">Superstructure Settings</a>.
              </Note>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="note4">
                The {incode(".1")} in {incode("mySS.root.planets.1")} means the element at index 1. In other languages this might be {incode("mySS.root.planets[1]")}.
              </Note>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="noteForeach">
                This is a foreach loop. In Valence, {incode("foreach myList {(elem) ... }")} is equivalent to other languages' {incode("foreach elem in myList { ... }")}. If you look closely, Valence is using a lambda for its foreach body.
              </Note>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="noteSSSS">
                Note that these are <strong>not built-in</strong>; they are part of the standard library. These two classes tie together all the various features of superstructures. Once you finish this Superstructures Guide, you'll know how to make your own.
              </Note>
            </div>
          </div>

        </div>
        <Footer/>
      </div>
    );
  }
}

export default SuperstructuresIntro;
