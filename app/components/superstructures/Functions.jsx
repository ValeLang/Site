import React from 'react';
import '../Tripage.css';
import '../Tripage.css';
import Header from '../Header.jsx';
import Footer from '../Footer.jsx';
import {Link} from 'react-router-dom';
import {NoteManager, Note, NoteAnchor, NotesHeader} from '../Note.jsx';
import SuperstructuresTOC from './SuperstructuresTOC.jsx';

const ns = (classes) => "c-ssfunctions m-tripage m-superstructures " + (classes || "");

const incode = (code) => <span className={ns("inline-code")}>{code}</span>

class SuperstructuresFunctions extends React.Component {
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

                <h1 className={ns("noline")}>Superstructures Guide: Functions</h1>

                <div className={ns("content")}>
                  For simple operations, accessing superstructure data directly works well.
                </div>

                <div className={ns("content")}>
                  For more complex operations, we should add <strong>superstructure functions</strong>.
                </div>

                <h3>Show me a Function!</h3>

                <div className={ns("content splitter")}>
                  <div className={ns("half")}>
                    <div className={ns("content")}>
                      Let's make a simple function to add a moon with a random mass.
                    </div>
                    <div className={ns("content")}>
                      Before that, let's talk about requirements for superstructure functions.
                    </div>
                    <div className={ns("content")}>
                      First, their arguments can only be values {this.noteAnchor("values")} or members of the superstructure.
                    </div>
                    <div className={ns("content")}>
                      Second, they must be <strong>deterministic</strong>. This means they cannot cannot access any globals, and they can't use any nondeterministic functions, such as {incode("cin.readLine")} and {incode("File.read")}. {this.noteAnchor("same")}
                    </div>
                    <div className={ns("content")}>
                      Unfortunately for us, {incode("Math.random")} is nondeterminstic, so we can't use it.
                    </div>
                    <div className={ns("content")}>
                      However, pseudo-randomness (like the hash function on the right) is fine. It's random enough for our purposes. {this.noteAnchor("rand")}
                    </div>

                <div className={ns("content cozy")}>
                  We would call it like this:
                </div>

                <div className={ns("content code end")}>
{`let saturn = &mySS.root.planets.1;
addMoonWithRandomMass(
  saturn, "Enceladus")`}
                </div>

                  </div>
                  <div className={ns("half")}>
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
    name: Str;
    mass!: Int;
  }

  fn addMoonWithRandomMass(
      planet: &Planet,
      moonName: Str) {
    let mass = hash(moonName);
    planet.moons.append(
      Moon(name, mass));
  }

  fn hash(s: Str) {
    let chars = s.split("");
    let ints = chars..toInt();`} {this.noteAnchor("map")}{`
    ret ints.fold(0, +);`} {this.noteAnchor("reducer")}{`
  }
}`}
                    </div>
                  </div>
                </div>


                <h3>Constraints</h3>

                <div className={ns("content cozy")}>
                  In the <a to="/superstructures/constraints">Constraints</a> page, we made a superstructure that enforced that planets were heavier than their moons. The following code would violate the constraint:
                </div>
                <div className={ns("content code cozy")}>
{`let mySS =
  MySuperstructure(
    SolarSystem(
      List(Planet("Saturn", 999, List(Moon("Titan", 123))))));
mySS.root.planets.0.mass = 100;
mySS.root.planets.0.moons.0.mass = 50;`}
                </div>
                <div className={ns("content")}>
                  The program halts when we set Saturn's mass to 100, because it checks constraints after that line.
                </div>

                <div className={ns("content cozy")}>
                  We should instead wrap this in a superstructure function:
                </div>
                <div className={ns("content code cozy")}>
{`superstructure MySuperstructure {
  ...

  fn setPlanetAndMoonMass(
      planet: &Planet, planetMass: Int,
      moon: &Moon, moonMass: Int) {
    planet.mass = planetMass;
    moon.mass = moonMass;
  }
}`}
                </div>
                <div className={ns("content cozy")}>
                  And we would call it like so:
                </div>
                <div className={ns("content code")}>
{`setPlanetAndMoonMass(&mySS.root.planets.0, 100, &mySS.root.planets.0.moons.0, 50);`}
                </div>

                <div className={ns("content")}>
                  This works because constraints are checked after superstructure functions, not during.
                </div>

                <h3>References in Functions</h3>

                <div className={ns("content")}>
                  In <a to="/superstructures/references">References</a>, we talked about how moving something out of a superstructure while there's still a strong reference to it will halt the program.
                </div>
                <div className={ns("content")}>
                  Functions solve that, just how they solve the above constraints problem. References in a function are still considered part of the superstructure, albeit temporarily detached.
                </div>

                <div className={ns("content")}>
                  The below is an example of a game's superstructure, with bases and tanks, where every tank must be at a base.
                </div>

                <div className={ns("content splitter")}>
                  <div className={ns("half")}>
                    <div className={ns("code")}>
{`superstructure MySuperstructure {
  root struct Game {
    bases: List:Base;
    pilot: List:Pilot;
  }
  struct Base {
    name: Str;
    turrets: List:Turret;
  }
  struct Turret {
    name: Str;
  }
  struct Pilot {
    name: Str;
    turret: &Turret;
  }
}`}
                    </div>
                  </div>
                  <div className={ns("half")}>
                    <div className={ns("code")}>
{`let mySS =
  MySuperstructure(
    Game(
      List(
        Base(
          "Electria",
          List(
            Turret(
              "Shootybob")))),
        Base(
          "Valencia",
          List(
            Turret(
              "Badonkadonk")))),
      List()));
  let pilot =
    mySS.root.pilots.append(
      Pilot(
        "Raynor",
        &mySS.root.bases.0
          .turrets.0));`}
                    </div>
                  </div>
                </div>

                <div className={ns("content cozy")}>
                  Raynor is currently occupying Electria's "Shootybob" turret. We want to move Shootybob to Valencia:
                </div>
                <div className={ns("content code cozy")}>
{`let shootybob = mySS.root.bases.0.turrets.remove(0);
mySS.root.bases.1.turrets.append(shootybob);`}
                </div>
                <div className={ns("content")}>
                  But the program halts on the first line! This is because we just moved shootybob out of the superstructure while someone (Raynor) still had a strong reference to it. {this.noteAnchor("disregard")}
                </div>

                <div className={ns("content cozy")}>
                  However, this works nicely if we put it inside a superstructure function:
                </div>
                <div className={ns("content code cozy")}>
{`superstructure MySuperstructure {
  ...

  fn moveTurret(turret: &Turret, fromBase: &Base, toBase: &Base) {
    let turretOwningRef = fromBase.turrets.remove(fromBase.turrets.find(turret));
    toBase.turrets.append(turretOwningRef);
  }
}`}
                </div>
                <div className={ns("content cozy")}>
                  And we would call it like so:
                </div>
                <div className={ns("content code")}>
{`let shootybob = &mySS.root.bases.0.turrets.0;
moveTurret(shootybob, &mySS.root.bases.0, &mySS.root.bases.1);`}
                </div>

                <div className={ns("content")}>
                  This works because variables inside a superstructure function are considered part of the superstructure, just temporarily detached.
                </div>

                <div className={ns("content")}>
                  A good rule of thumb is that every modification of a superstructure should be done with a superstructure function. {this.noteAnchor("goodidea")}
                </div>

                <h3>Observing Calls</h3>

                <div className={ns("content")}>
                  Much like how we can listen to effects that happen to the superstructure, we can listen for function calls.
                </div>

                <div className={ns("content")}>
                  Using the earlier {incode("addMoonWithRandomMass")} example, let's see what observing calls is like:
                </div>

                <div className={ns("content splitter")}>
                  <div className={ns("half")}>
                    <div className={ns("code")}>
{`superstructure MySuperstructure {
  ...

  fn addMoonWithRandomMass(
      planet: &Planet,
      moonName: Str) {
    let mass = hash(moonName);
    planet.moons.append(
      Moon(name, mass));
  }

  fn hash(s: Str) {
    let chars = s.split("");
    let ints = chars..toInt();
    ret ints.fold(0, +);
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
      "Saturn",
      999,
      List(Moon("Titan", 123))))));

mySS.addAfterRequestObserver(
  { doutln _; });

let saturn = &mySS.root.planets.1;
addMoonWithRandomMass(
  saturn, "Enceladus");`}
                    </div>
                  </div>
                </div>

                <div className={ns("content cozy")}>
                  The above code outputs:
                </div>
                <div className={ns("content code")}>
{`Call:addMoonWithRandomMass(3, "Enceladus");`}
                </div>

                <h3>The Call Struct</h3>

                <div className={ns("content")}>
                  {incode("Call")} is a special struct template which represents a function call, it contains all of the arguments to the call. Think of it like {incode("Flat")} but for function arguments.
                </div>

                <div className={ns("content splitter")}>
                  <div className={ns("half")}>
                    <div className={ns("content")}>
                      See right for what {incode("Call:addMoonWithRandomMass")} {this.noteAnchor("funcarg")} looks like.
                    </div>
                    <div className={ns("content end")}>
                      Note how planet is an {incode("Int")} now instead of a {incode("&Planet")}.
                    </div>
                  </div>
                  <div className={ns("half")}>
                    <div className={ns("code")}>
{`struct Call:addMoonWithRandomMass {
  isa ICall;`} {this.noteAnchor("isa")}{`

  planet: Int;
  moonName: Str;
}`}
                    </div>
                  </div>
                </div>

                <div className={ns("line")}/>

                <div className={ns("content")}>
                  In the next page, we see the first time-traveling superstructure feature: Reverting. Or, keep reading below to see how clients can use superstructure functions to send requests to servers.
                </div>

                <div className={ns("content")} style={{textAlign: "right"}}>
                  <strong>Next:</strong> <a href="/superstructures/reverting">Reverting</a>
                </div>
              </div>

              <div className={ns("networking")}>
                <h2 className={ns("noline")}>Sending Requests</h2>

                <div className={ns("half code")} style={{float: "right"}}>
{`superstructure ChatModel {
  root struct Room {
    messages: List:String;
  }
  fn addMsg(room: &Room, message: Str) {
    room.messages.append(message);
  }
}`}
                </div>

                <div className={ns("content")}>
                  {incode("SimpleSuperstructureClient")} can send requests to call superstructure functions.
                </div>

                <div className={ns("content")}>
                  On the right is a superstructure with some chat rooms and messages.
                </div>

                <div className={ns("content")}>
                  Below are an example of a server and client, where the client sends requests to the server to add messages.
                </div>

                <div className={ns("content")}>
                  {incode("SimpleSuperstructureClient")} has the {incode("request")} method, which takes as a template argument the superstructure function we want to call on the server.
                </div>

                <div className={ns("content")}>
                  Our client would call {incode('sssc.request:addMsg(&room, "I have arrived!");')} to send a message.
                </div>

                <div style={{clear: "both"}}/>

                <div className={ns("content splitter")}>
                  <div className={ns("half")}>
                    <div className={ns("code")}>
{``}<div className={ns("comment")}>{`// Server
`}</div>{`
fn main() {
  let charSS =
    ChatModel(Room(List()))));

`}<div className={ns("comment")}>{`  // Make the server.
`}</div>{`  let server =
    SimpleSuperstructureServer(
      &mySS, 8080);

`}<div className={ns("comment")}>{`  // Listen for new connections,
  // send updates in real-time.
`}</div>{`  server.start();

`}<div className={ns("comment")}>{`  // This stream listens to both
  // client requests and keyboard.
`}</div>{`  let eventsStream =
    and(ssss.requests, cin);

`}<div className={ns("comment")}>{`  // Receives requests from server
  // and events from keyboard.
  // Stops on ctrl+D.
`}</div>{`  foreach eventsStream {
    {:Call:addMsg(_, m) `}{this.noteAnchor("pattern")}{`
      doutln "Got message: " m;
    }
    {(char: Str) `}<span className={ns("comment")}>{`/* ignore */`}</span>{`}
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
`}</div>{`  let chatSS = ssss.start();

  let room = &chatSS.room;

`}<div className={ns("comment")}>{`  // Print all messages so far.
`}
</div>
{`  room.messages.map(doutln);

`}<div className={ns("comment")}>
{`  // This stream listens to both
  // the server and the keyboard.
`}
</div>
{`  let eventsStream =
    and(sssc.updates, lines(cin));

`}<div className={ns("comment")}>
{`  // Receives updates from server
  // and lines from keyboard.
  // Stops on ctrl+D.
`}
</div>
{`  foreach eventsStream {
    {:Call:addMsg(_, m)
      doutln "New message: " m;
    }
    {(line: Str)
      sssc.request:addMsg(
        &room, line);
    }
  }

  doutln "Done!";
}
`}
                    </div>
                  </div>
                </div>

                <div className={ns("content")}>
                  The above {incode('sssc.request:addMsg(&room, line);')} doesn't send the resulting {incode("Effect")}, it sends the {incode("Call")} struct.
                </div>

                <div className={ns("content")}>
                  The server receives it and runs the addMsg function on its end.
                </div>

                <div className={ns("content")}>
                  The server might choose to keep the entire superstructure in memory at all times, for speedy execution, or it might put the superstructure in storage. The code looks the same in both cases, thanks to <a to="/networking/superlining">Superlining</a>, which aggressively and transparently pre-fetches and caches data from underlying storage.
                </div>
              </div>
            </div>

            <div className={ns("margin")}>
              <div className={ns("toc-container")}>
                <SuperstructuresTOC page="functions"/>
                <div className={ns("notes-header")}>
                  <NotesHeader update={this.updateNotesHeaderRect}/>
                </div>
              </div>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="bang">
                The {incode("!")} in {incode("mass!")} makes the field changeable; we can point it at a different {incode("Int")}.
              </Note>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="same">
                This rule is very useful for networking, it means that the same function call on two different devices will have the same effect.
              </Note>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="map">
                The {incode("..")} is the "map operator". {incode("..someFunc(2, 3)")} is equivalent to {incode(".map({someFunc(_, 2, 3)})")}.
              </Note>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="rand">
                Another common strategy is to store a "random seed" somewhere in the superstructure.
              </Note>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="reducer">
                This means, {incode("+")} all elements of {incode("ints")} together, starting with 0.
              </Note>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="values">
                Values are primitives like Int or Str, plus any user-defined value structs. See <a to="/superstructures/basics">Basics</a> for more.
              </Note>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="disregard">
                Disregard the obvious alternate solution of just moving it directly from one list to another, without putting it in a local variable first.
              </Note>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="goodidea">
                Doing this yields many other benefits, such as superlining and cross-compilation.
              </Note>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="funcarg">
                Note that we're using a function as a template argument here.
              </Note>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="isa">
                This means that this struct is a subclass of ICall.
              </Note>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="pattern">
                The {incode(":Call:addMsg(_, m)")} is the parameter list. {incode("{:Call:addMsg(_, m) ... }")} is equivalent to {incode("{(_: Call:addMsg(_, m)) ... }")}. The {incode("(_, m)")} is destructuring that parameter to get the second member and assign it to variable {incode("m")}.
              </Note>


{/*              
              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="reducer">
                Though, storing a file path as a string is fine, since that string won't change.
              </Note>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="note7">
                There are some additional rules for functions in a superstructure, check out the Functions section for those.
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

export default SuperstructuresFunctions;
