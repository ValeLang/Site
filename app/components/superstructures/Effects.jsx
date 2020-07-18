import React from 'react';
import '../Tripage.css';
import '../Tripage.css';
import Header from '../Header.jsx';
import Footer from '../Footer.jsx';
import {Link} from 'react-router-dom';
import {NoteManager, Note, NoteAnchor, NotesHeader} from '../Note.jsx';
import SuperstructuresTOC from './SuperstructuresTOC.jsx';

const ns = (classes) => "c-sseffects m-tripage m-superstructures " + (classes || "");

const incode = (code) => <span className={ns("inline-code")}>{code}</span>

class SuperstructuresEffects extends React.Component {
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

                <h1 className={ns("noline")}>Superstructures Guide: Effects</h1>
                <div className={ns("content")}>
                  Valence gives us an easy way to observe arbitrary changes to superstructures.
                </div>
                <div className={ns("content")}>
                  Every time something in a superstructures changes, it broadcasts an <strong>effect</strong> to all observers.
                </div>

                <h3 className={ns("cozy")}>What can we use effects for?</h3>

                <ul className={ns("cozy")}>
                  <li className={ns()}>Keeping state outside the superstructure in sync with it.</li>
                  <li className={ns()}>Debugging; it's easy to see all changes coming into a superstructure.</li>
                  <li className={ns()}>Sending updates across the network to other devices.</li>
                </ul>

                <h3>Listening for Effects</h3>

                <div className={ns("content")}>
                  In the <a to="/superstructures/intro">intro</a>, we made a superstructure that contained some planets and moons. This page will show how to listen for effects, and what they look like.
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
}

`}
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
            Moon("Mimas", 562))))));

mySS.addAfterEffectObserver(
  { doutln _; });

mySS.root.planets.append(
  Planet("Char", List()));`}
  </div>
                  </div>
                </div>

                <div className={ns("content")}>
                  Note the new line {incode("mySS.addAfterEffectObserver({ doutln _; });")} in the above code, explained here:
                  <ul className={ns()}>
                    <li className={ns()}>{incode("{ some code here }")} is a <strong>lambda</strong>, in other words, a function. {this.noteAnchor("0")}</li>
                    <li className={ns()}>{incode("_")}, inside a lambda, means "the argument".</li>
                    <li className={ns()}>So, {incode("{ doutln _; }")} is a function that gives "the argument" to doutln. {this.noteAnchor("equiv")}</li>
                    <li className={ns()}>We then gave that lambda to {incode("addAfterEffectObserver")}. Now our lambda will be called whenever anything in our superstructure changes. {this.noteAnchor("1")}</li>
                  </ul>
                </div>

                <h3>Anatomy of an Effect</h3>

                <div className={ns("content cozy")}>
                  That observer was called twice, and gave us this output:
                </div>

                <div className={ns("content")}>
  <div className={ns("code")}>
{`CreateEffect:List:Moon(11, Flat:List:Moon(List()))`}{this.noteAnchor("Flat")}{`
CreateEffect:Planet(12, Flat:Planet("Char", 11))
ListAppendEffect:Planet(2, 12)`}
  </div>
                </div>

                <div className={ns("content")}>
                  There's three interesting structs in play here: {incode("Flat")}, {incode("CreateEffect")}, and {incode("ListAppendEffect")}. First, let's talk about the {incode("Flat")} struct.
                </div>

                <h3>The Flat Struct</h3>

                <div className={ns("content splitter")}>
                  {incode("Flat")} is a special struct template which substitutes IDs for references.
                </div>

                <div className={ns("content cozy")}>
                  On the left is a regular Moon, on the right is a Flat:Moon.
                </div>

                <div className={ns("content cozy splitter")}>
                  <div className={ns("half")}>
  <div className={ns("code")}>
{`struct Moon {
  name: Str;
  planet: &Planet;
}`}
  </div>
                  </div>
                  <div className={ns("half")}>
  <div className={ns("code")}>
{`struct Flat:Moon {
  name: Str;
  planet: Int;
}`}
  </div>
                  </div>
                </div>
                <div className={ns("content")}>
                  Note that {incode("planet")} is an {incode("Int")} in the {incode("Flat:Moon")}.
                </div>

                <h3>CreateEffect</h3>

                <div className={ns("content splitter")}>
                  <div className={ns()}>
                    {incode("CreateEffect")} is an effect that makes a new object inside the superstructure. See right for a rough idea of what it looks like.
                  </div>
                  <div className={ns()}>
  <div className={ns("code")}>
{`struct CreateEffect:T isa`}{this.noteAnchor("Isa")}{` IEffect`}{this.noteAnchor("IEffect")}{` {
  objectId: Int;
  data: Flat:T;
}`}
  </div>
                  </div>
                </div>

                <div className={ns("content")}>
                  A {incode("CreateEffect")} does not attach it to any particular place in the superstructure; it just creates it.
                </div>

                <div className={ns("content")}>
                  These are always followed by something that puts it in the right place, such as the {incode("ListAppendEffect")} below.
                </div>

                <h3>ListAppendEffect</h3>

                <div className={ns("content splitter")}>
                  <div className={ns()}>
                    {incode("ListAppendEffect")} is an effect that moves an object to the end of a List. See right for a rough idea of what it looks like.
                  </div>
                  <div className={ns()}>
  <div className={ns("code")}>
{`struct ListAppendEffect isa IEffect {
  listId: Int;
  memberId: Int;
}`}
  </div>
                  </div>
                </div>

                <div className={ns("content")}>
                  We appended into a {incode("List:Moon")}. Since {incode("List:Moon")} owns its Moons, this effect <strong>moves</strong> the Moon from wherever it previously was. {this.noteAnchor("Move")}
                </div>

                <h3>Applying an Effect</h3>

                <div className={ns("content")}>
                  We can construct an effect on our own and give it to the superstructure, to enact the change it represents.
                </div>

                <div className={ns("content code")}>
{`let myEffect = ListAppendEffect(6, 11)`}
                </div>

                <div className={ns("line")}/>

                <div className={ns("content")}>
                  In the next page, we learn how to guarantee data consistency in our superstructures. Or, keep reading to get a peek into how effects can be used for networking.
                </div>

                <div className={ns("content")} style={{textAlign: "right"}}>
                  <strong>Next:</strong> <a href="/superstructures/constraints">Constraints</a>
                </div>

              </div>

              <div className={ns("networking")}>
                <h3 className={ns("noline")}>Networking with Effects</h3>

                <div className={ns("content")}>
                  In the <a to="/superstructures/intro">Intro</a>, we introduced <strong>SimpleSuperstructureServer</strong> and <strong>SimpleSuperstructureClient</strong>, two classes in the standard library. They use {incode("Flat")} and {incode("Effect")} under the hood.
                </div>

                <div className={ns("content")}>
                  The SimpleSuperstructureServer:
                  <ul className={ns("cozy")}>
                    <li className={ns()}>Listens for clients to connect via sockets.</li>
                    <li className={ns()}>Once a client connects, the server sends the initial superstructure (in {incode("Flat")} form) using the {incode(".toFlat()")} method.</li>
                    <li className={ns()}>It observes the superstructure for further changes, which it then sends along to all listening clients.</li>
                  </ul>
                </div>

                <div className={ns("content")}>
                  The SimpleSuperstructureClient:
                  <ul className={ns("cozy")}>
                    <li className={ns()}>Connects to a server</li>
                    <li className={ns()}>Receives the initial data in {incode("Flat")} form, and converts them to a superstructure using the {incode(".fromFlat()")} method.</li>
                    <li className={ns()}>It keeps the socket open to listen for more effects and applies them as they come in.</li>
                  </ul>
                </div>

                <div className={ns("content")}>
                  Superstructures were designed to give you as much flexibility as possible, so {incode("Flat")} and {incode("Effect")} are exposed for you to use freely. With these, you can create your own server and client, customized to your needs; all you need to do is send and receive them over the network.
                </div>
              </div>
            </div>

            <div className={ns("margin")}>
              <div className={ns("toc-container")}>
                <SuperstructuresTOC page="effects"/>
                <div className={ns("notes-header")}>
                  <NotesHeader update={this.updateNotesHeaderRect}/>
                </div>
              </div>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="0">
                See <a to="/basics/lambdas">Lambdas</a> for more.
              </Note>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="1">
                {incode("addAfterEffectObserver")} actually takes an IAfterEffectObserver interface instance. Valence automatically converted our lambda to an instance of new subclass of that interface.
              </Note>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="IEffect">
                {incode("IEffect")} has another template argument, left out in this page for brevity. See the <a to="/reference/IEffect">IEffect</a> for more.
              </Note>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="Isa">
                {incode("isa")} means "is a subclass of". Here, it means this CreateEffect is a subclass of IEffect.
              </Note>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="Move">
                If we instead appended into a {incode("List:&Moon")}, we would just be adding a reference to the Moon.
              </Note>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="Flat">
                Flat actually has two template arguments, and would look like {incode("Flat:(Moon, Int)")} (there's an extra template argument for the kind of ID) but that's left out in this page for brevity.
              </Note>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="equiv">
                {incode("{ doutln _; }")} is equivalent to {incode("{(x) doutln x;}")}.
              </Note>


{/*
              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="2">
                Depending on the superstructure's settings, the IDs might not be sequential integers, but instead random UUIDs.
              </Note>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="3">
                {incode("{ doutln _; }")} is the same as {incode("{(x) doutln x; }")} or even just {incode("doutln")} in this case, see <a to="/basics/calling">Calling</a> for more.
              </Note>

              <Note iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon} name="4">
                The MySuperstructure owns the List:Moon which owns the Moon.
              </Note>*/}
            </div>
          </div>

        </div>
        <Footer/>
      </div>
    );
  }
}

export default SuperstructuresEffects;
