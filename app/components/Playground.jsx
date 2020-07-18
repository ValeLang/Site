import React from 'react'
import './Playground.css'

class Playground extends React.Component {
  render() {
    return (
      <div className="playground">
        <div className="playground code-header">Try it out!</div>
<div className="playground code">
{`superstructure MySuperstructure {
  @History(Chronobase);
  @Revertible(true);

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

// Adds Earth, then Saturn, then reverts to when
// we just had Earth.
fn main() {
  let ss = MySuperstructure(SolarSystem(List()));
  ss.planets.add(Planet("Earth", List(Moon("Luna", 1737))));

  doutln ss;

  let snapshot = snapshot(ss); // For later reverting.

  let saturn = ss.planets.add(Planet("Saturn", List()));
  saturn.moons.add(Moon("Titan", 2576));
  saturn.moons.add(Moon("Mimas", 562));

  doutln ss;

  revert(ss, snapshot);

  doutln ss;
}
`}
</div>
        <div className="playground output-header">Output:</div>
<div className="playground output">
{`MySuperstructure(
  SolarSystem(
    List:Planet(
      Planet("Earth", List:Moon(Moon("Luna", 1737))))))

MySuperstructure(
  SolarSystem(
    List:Planet(
      Planet("Earth", List:Moon(Moon("Luna", 1737)))
      Planet(
        "Saturn",
        List:Moon(
          Moon("Titan", 2576),
          Moon("Mimas", 562))))))

MySuperstructure(
  SolarSystem(
    List:Planet(
      Planet("Earth", List:Moon(Moon("Luna", 1737))))))
`}
</div>
      </div>
    );
  }
}

export default Playground;
