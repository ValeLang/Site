
if [ "$1" == "" ] ; then
  echo "First arg should be 'build' or 'testvale'"
  exit 1
fi
MODE="$1"

if [ "$2" == "" ] ; then
  echo "Second arg should be 'all' or a page name"
  exit 1
fi
TARGET="$2"

if [ "$3" == "" ] ; then
  echo "Third arg should be path to Valestrom.jar"
  exit 1
fi
VALESTROM="$3"

if [ "$4" == "" ] ; then
  echo "Fourth arg should be path to stdlib"
  exit 1
fi
STDLIB="$4"

echo $MODE $TARGET $VALESTROM $STDLIB

if [ $MODE == "build" ] ; then
  if [ $TARGET == "clean" ] || [ $TARGET == "all" ] ; then
    rm -rf build
    mkdir build
    mkdir build/components
    mkdir build/images
    mkdir build/guide
    mkdir build/blog
    mkdir build/releases
  fi
fi

if [ $TARGET == "raii-next-steps" ] || [ $TARGET == "all" ] ; then
  echo "Doing raii-next-steps"
  echo ~/Markvale/build/a.out $MODE --compiler_dir $VALESTROM --stdlib_dir $STDLIB --out build/blog/raii-next-steps app/blog/raii-next-steps.vmd
  eval ~/Markvale/build/a.out $MODE --compiler_dir $VALESTROM --stdlib_dir $STDLIB --out build/blog/raii-next-steps app/blog/raii-next-steps.vmd
  if [ $? != 0 ]; then
    echo "Failed!"
    exit 1
  fi
fi

if [ $TARGET == "cross-platform-core-vision" ] || [ $TARGET == "all" ] ; then
  echo "Doing cross-platform-core-vision"
  echo ~/Markvale/build/a.out $MODE --compiler_dir $VALESTROM --stdlib_dir $STDLIB --out build/blog/cross-platform-core-vision app/blog/cross-platform-core-vision.vmd
  eval ~/Markvale/build/a.out $MODE --compiler_dir $VALESTROM --stdlib_dir $STDLIB --out build/blog/cross-platform-core-vision app/blog/cross-platform-core-vision.vmd
  if [ $? != 0 ]; then
    echo "Failed!"
    exit 1
  fi
fi

if [ $TARGET == "zero-cost-refs-regions" ] || [ $TARGET == "all" ] ; then
  echo "Doing zero-cost-refs-regions"
  echo ~/Markvale/build/a.out $MODE --compiler_dir $VALESTROM --stdlib_dir $STDLIB --out build/blog/zero-cost-refs-regions app/blog/zero-cost-refs-regions.vmd
  eval ~/Markvale/build/a.out $MODE --compiler_dir $VALESTROM --stdlib_dir $STDLIB --out build/blog/zero-cost-refs-regions app/blog/zero-cost-refs-regions.vmd
  if [ $? != 0 ]; then
    echo "Failed!"
    exit 1
  fi
fi

if [ $TARGET == "generational-references" ] || [ $TARGET == "all" ] ; then
  echo "Doing generational-references"
  echo ~/Markvale/build/a.out $MODE --compiler_dir $VALESTROM --stdlib_dir $STDLIB --out build/blog/generational-references app/blog/generational-references.vmd
  eval ~/Markvale/build/a.out $MODE --compiler_dir $VALESTROM --stdlib_dir $STDLIB --out build/blog/generational-references app/blog/generational-references.vmd
  if [ $? != 0 ]; then
    echo "Failed!"
    exit 1
  fi
  if [ $MODE == "build" ] ; then
    cp build/blog/generational-references build/blog/generational-memory
  fi
fi

if [ $TARGET == "hybrid-generational-memory" ] || [ $TARGET == "all" ] ; then
  echo "Doing hybrid-generational-memory"
  echo ~/Markvale/build/a.out $MODE --compiler_dir $VALESTROM --stdlib_dir $STDLIB --out build/blog/hybrid-generational-memory app/blog/hybrid-generational-memory.vmd
  eval ~/Markvale/build/a.out $MODE --compiler_dir $VALESTROM --stdlib_dir $STDLIB --out build/blog/hybrid-generational-memory app/blog/hybrid-generational-memory.vmd
  if [ $? != 0 ]; then
    echo "Failed!"
    exit 1
  fi
fi

if [ $TARGET == "hgm-static-analysis-part-1" ] || [ $TARGET == "all" ] ; then
  echo "Doing hgm-static-analysis-part-1"
  echo ~/Markvale/build/a.out $MODE --compiler_dir $VALESTROM --stdlib_dir $STDLIB --out build/blog/hgm-static-analysis-part-1 app/blog/hgm-static-analysis-part-1.vmd
  eval ~/Markvale/build/a.out $MODE --compiler_dir $VALESTROM --stdlib_dir $STDLIB --out build/blog/hgm-static-analysis-part-1 app/blog/hgm-static-analysis-part-1.vmd
  if [ $? != 0 ]; then
    echo "Failed!"
    exit 1
  fi
fi

if [ $TARGET == "beyond-rust-innovations" ] || [ $TARGET == "all" ] ; then
  echo "Doing beyond-rust-innovations"
  echo ~/Markvale/build/a.out $MODE --compiler_dir $VALESTROM --stdlib_dir $STDLIB --out build/blog/beyond-rust-innovations app/blog/beyond-rust-innovations.vmd
  eval ~/Markvale/build/a.out $MODE --compiler_dir $VALESTROM --stdlib_dir $STDLIB --out build/blog/beyond-rust-innovations app/blog/beyond-rust-innovations.vmd
  if [ $? != 0 ]; then
    echo "Failed!"
    exit 1
  fi
fi

if [ $TARGET == "comparisons" ] || [ $TARGET == "all" ] ; then
  echo "Doing comparisons"
  echo ~/Markvale/build/a.out $MODE --compiler_dir $VALESTROM --stdlib_dir $STDLIB --out build/blog/comparisons app/blog/comparisons.vmd
  eval ~/Markvale/build/a.out $MODE --compiler_dir $VALESTROM --stdlib_dir $STDLIB --out build/blog/comparisons app/blog/comparisons.vmd
  if [ $? != 0 ]; then
    echo "Failed!"
    exit 1
  fi
fi

if [ $TARGET == "fearless" ] || [ $TARGET == "all" ] ; then
  echo "Doing fearless"
  echo ~/Markvale/build/a.out $MODE --compiler_dir $VALESTROM --stdlib_dir $STDLIB --out build/blog/fearless app/blog/fearless.vmd
  eval ~/Markvale/build/a.out $MODE --compiler_dir $VALESTROM --stdlib_dir $STDLIB --out build/blog/fearless app/blog/fearless.vmd
  if [ $? != 0 ]; then
    echo "Failed!"
    exit 1
  fi
fi

if [ $TARGET == "contributors" ] || [ $TARGET == "all" ] ; then
  echo "Doing contributors"
  echo ~/Markvale/build/a.out $MODE --compiler_dir $VALESTROM --stdlib_dir $STDLIB --out build/contributors app/contributors.vmd
  eval ~/Markvale/build/a.out $MODE --compiler_dir $VALESTROM --stdlib_dir $STDLIB --out build/contributors app/contributors.vmd
  if [ $? != 0 ]; then
    echo "Failed!"
    exit 1
  fi
fi

if [ $TARGET == "download" ] || [ $TARGET == "all" ] ; then
  echo "Doing download"
  echo ~/Markvale/build/a.out $MODE --compiler_dir $VALESTROM --stdlib_dir $STDLIB --out build/download app/download.vmd
  eval ~/Markvale/build/a.out $MODE --compiler_dir $VALESTROM --stdlib_dir $STDLIB --out build/download app/download.vmd
  if [ $? != 0 ]; then
    echo "Failed!"
    exit 1
  fi
fi

if [ $TARGET == "introduction" ] || [ $TARGET == "all" ] ; then
  echo "Doing introduction"
  echo ~/Markvale/build/a.out $MODE --compiler_dir $VALESTROM --stdlib_dir $STDLIB --out build/guide/introduction app/guide/introduction.vmd
  eval ~/Markvale/build/a.out $MODE --compiler_dir $VALESTROM --stdlib_dir $STDLIB --out build/guide/introduction app/guide/introduction.vmd
  if [ $? != 0 ]; then
    echo "Failed!"
    exit 1
  fi
fi

if [ $TARGET == "structs" ] || [ $TARGET == "all" ] ; then
  echo "Doing structs"
  echo ~/Markvale/build/a.out $MODE --compiler_dir $VALESTROM --stdlib_dir $STDLIB --out build/guide/structs app/guide/structs.vmd
  eval ~/Markvale/build/a.out $MODE --compiler_dir $VALESTROM --stdlib_dir $STDLIB --out build/guide/structs app/guide/structs.vmd
  if [ $? != 0 ]; then
    echo "Failed!"
    exit 1
  fi
fi

if [ $TARGET == "references" ] || [ $TARGET == "all" ] ; then
  echo "Doing references"
  echo ~/Markvale/build/a.out $MODE --compiler_dir $VALESTROM --stdlib_dir $STDLIB --out build/guide/references app/guide/references.vmd
  eval ~/Markvale/build/a.out $MODE --compiler_dir $VALESTROM --stdlib_dir $STDLIB --out build/guide/references app/guide/references.vmd
  if [ $? != 0 ]; then
    echo "Failed!"
    exit 1
  fi
fi

if [ $TARGET == "interfaces" ] || [ $TARGET == "all" ] ; then
  echo "Doing interfaces"
  echo ~/Markvale/build/a.out $MODE --compiler_dir $VALESTROM --stdlib_dir $STDLIB --out build/guide/interfaces app/guide/interfaces.vmd
  eval ~/Markvale/build/a.out $MODE --compiler_dir $VALESTROM --stdlib_dir $STDLIB --out build/guide/interfaces app/guide/interfaces.vmd
  if [ $? != 0 ]; then
    echo "Failed!"
    exit 1
  fi
fi

if [ $TARGET == "generics" ] || [ $TARGET == "all" ] ; then
  echo "Doing generics"
  echo ~/Markvale/build/a.out $MODE --compiler_dir $VALESTROM --stdlib_dir $STDLIB --out build/guide/generics app/guide/generics.vmd
  eval ~/Markvale/build/a.out $MODE --compiler_dir $VALESTROM --stdlib_dir $STDLIB --out build/guide/generics app/guide/generics.vmd
  if [ $? != 0 ]; then
    echo "Failed!"
    exit 1
  fi
fi

if [ $TARGET == "patterns" ] || [ $TARGET == "all" ] ; then
  echo "Doing patterns"
  echo ~/Markvale/build/a.out $MODE --compiler_dir $VALESTROM --stdlib_dir $STDLIB --out build/guide/patterns app/guide/patterns.vmd
  eval ~/Markvale/build/a.out $MODE --compiler_dir $VALESTROM --stdlib_dir $STDLIB --out build/guide/patterns app/guide/patterns.vmd
  if [ $? != 0 ]; then
    echo "Failed!"
    exit 1
  fi
fi

if [ $TARGET == "regions" ] || [ $TARGET == "all" ] ; then
  echo "Doing regions"
  echo ~/Markvale/build/a.out $MODE --compiler_dir $VALESTROM --stdlib_dir $STDLIB --out build/guide/regions app/guide/regions.vmd
  eval ~/Markvale/build/a.out $MODE --compiler_dir $VALESTROM --stdlib_dir $STDLIB --out build/guide/regions app/guide/regions.vmd
  if [ $? != 0 ]; then
    echo "Failed!"
    exit 1
  fi
fi

if [ $TARGET == "externs" ] || [ $TARGET == "all" ] ; then
  echo "Doing externs"
  echo ~/Markvale/build/a.out $MODE --compiler_dir $VALESTROM --stdlib_dir $STDLIB --out build/guide/externs app/guide/externs.vmd
  eval ~/Markvale/build/a.out $MODE --compiler_dir $VALESTROM --stdlib_dir $STDLIB --out build/guide/externs app/guide/externs.vmd
  if [ $? != 0 ]; then
    echo "Failed!"
    exit 1
  fi
fi

if [ $TARGET == "home" ] || [ $TARGET == "all" ] ; then
  echo "Doing home"
  echo ~/Markvale/build/a.out $MODE --compiler_dir $VALESTROM --stdlib_dir $STDLIB --out build/home app/home.vmd
  eval ~/Markvale/build/a.out $MODE --compiler_dir $VALESTROM --stdlib_dir $STDLIB --out build/home app/home.vmd
  if [ $? != 0 ]; then
    echo "Failed!"
    exit 1
  fi
  if [ $MODE == "build" ] ; then
    cp build/home build/index.html
  fi
fi

if [ $TARGET == "contribute" ] || [ $TARGET == "all" ] ; then
  echo "Doing contribute"
  echo ~/Markvale/build/a.out $MODE --compiler_dir $VALESTROM --stdlib_dir $STDLIB --out build/contribute app/contribute.vmd
  eval ~/Markvale/build/a.out $MODE --compiler_dir $VALESTROM --stdlib_dir $STDLIB --out build/contribute app/contribute.vmd
  if [ $? != 0 ]; then
    echo "Failed!"
    exit 1
  fi
fi

if [ $TARGET == "roadmap" ] || [ $TARGET == "all" ] ; then
  echo "Doing roadmap"
  echo ~/Markvale/build/a.out $MODE --compiler_dir $VALESTROM --stdlib_dir $STDLIB --out build/roadmap app/roadmap/roadmap.vmd
  eval ~/Markvale/build/a.out $MODE --compiler_dir $VALESTROM --stdlib_dir $STDLIB --out build/roadmap app/roadmap/roadmap.vmd
  if [ $? != 0 ]; then
    echo "Failed!"
    exit 1
  fi
  cp app/roadmap/*.css build
fi

if [ $TARGET == "surprising-weak-refs" ] || [ $TARGET == "all" ] ; then
  echo "Doing surprising-weak-refs"
  echo ~/Markvale/build/a.out $MODE --compiler_dir $VALESTROM --stdlib_dir $STDLIB --out build/blog/surprising-weak-refs app/blog/surprising-weak-refs.vmd
  eval ~/Markvale/build/a.out $MODE --compiler_dir $VALESTROM --stdlib_dir $STDLIB --out build/blog/surprising-weak-refs app/blog/surprising-weak-refs.vmd
  if [ $? != 0 ]; then
    echo "Failed!"
    exit 1
  fi
fi

if [ $MODE == "build" ] ; then
  echo "Copying..."
  cp app/*.css build
  cp app/components/*.css build/components
  cp app/components/*.js build/components
  cp app/components/*.png build/components
  cp app/images/* build/images
  cp app/blog/*.svg build/blog
fi

echo "Done!"
