
if [ "$1" == "" ] ; then
  echo "First arg should be 'build' or 'testvale'"
fi
MODE="$1"

if [ "$2" == "" ] ; then
  echo "First arg should be 'all' or a page name"
fi
TARGET="$2"

if [ "$3" == "" ] ; then
  echo "Second arg should be path to Valestrom.jar"
fi
VALESTROM="$3"

echo $MODE $TARGET $VALESTROM

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
  eval ~/Markvale/build/a.out $MODE $VALESTROM app/blog/raii-next-steps.vmd build/blog/raii-next-steps
fi

if [ $TARGET == "cross-platform-core-vision" ] || [ $TARGET == "all" ] ; then
  echo "Doing cross-platform-core-vision"
  eval ~/Markvale/build/a.out $MODE $VALESTROM app/blog/cross-platform-core-vision.vmd build/blog/cross-platform-core-vision
fi

if [ $TARGET == "zero-cost-refs-regions" ] || [ $TARGET == "all" ] ; then
  echo "Doing zero-cost-refs-regions"
  eval ~/Markvale/build/a.out $MODE $VALESTROM app/blog/zero-cost-refs-regions.vmd build/blog/zero-cost-refs-regions
fi

if [ $TARGET == "generational-references" ] || [ $TARGET == "all" ] ; then
  echo "Doing generational-references"
  eval ~/Markvale/build/a.out $MODE $VALESTROM app/blog/generational-references.vmd build/blog/generational-references
  if [ $MODE == "build" ] ; then
    cp build/blog/generational-references build/blog/generational-memory
  fi
fi

if [ $TARGET == "hybrid-generational-memory" ] || [ $TARGET == "all" ] ; then
  echo "Doing hybrid-generational-memory"
  eval ~/Markvale/build/a.out $MODE $VALESTROM app/blog/hybrid-generational-memory.vmd build/blog/hybrid-generational-memory
fi

if [ $TARGET == "hgm-static-analysis-part-1" ] || [ $TARGET == "all" ] ; then
  echo "Doing hgm-static-analysis-part-1"
  eval ~/Markvale/build/a.out $MODE $VALESTROM app/blog/hgm-static-analysis-part-1.vmd build/blog/hgm-static-analysis-part-1
fi

if [ $TARGET == "beyond-rust-innovations" ] || [ $TARGET == "all" ] ; then
  echo "Doing beyond-rust-innovations"
  eval ~/Markvale/build/a.out $MODE $VALESTROM app/blog/beyond-rust-innovations.vmd build/blog/beyond-rust-innovations
fi

if [ $TARGET == "comparisons" ] || [ $TARGET == "all" ] ; then
  echo "Doing comparisons"
  eval ~/Markvale/build/a.out $MODE $VALESTROM app/blog/comparisons.vmd build/blog/comparisons
fi

if [ $TARGET == "fearless" ] || [ $TARGET == "all" ] ; then
  echo "Doing fearless"
  eval ~/Markvale/build/a.out $MODE $VALESTROM app/blog/fearless.vmd build/blog/fearless
fi

if [ $TARGET == "contributors" ] || [ $TARGET == "all" ] ; then
  echo "Doing contributors"
  eval ~/Markvale/build/a.out $MODE $VALESTROM app/contributors.vmd build/contributors
fi

if [ $TARGET == "download" ] || [ $TARGET == "all" ] ; then
  echo "Doing download"
  eval ~/Markvale/build/a.out $MODE $VALESTROM app/download.vmd build/download
fi

if [ $TARGET == "introduction" ] || [ $TARGET == "all" ] ; then
  echo "Doing introduction"
  eval ~/Markvale/build/a.out $MODE $VALESTROM app/guide/introduction.vmd build/guide/introduction
fi

if [ $TARGET == "structs" ] || [ $TARGET == "all" ] ; then
  echo "Doing structs"
  eval ~/Markvale/build/a.out $MODE $VALESTROM app/guide/structs.vmd build/guide/structs
fi

if [ $TARGET == "references" ] || [ $TARGET == "all" ] ; then
  echo "Doing references"
  eval ~/Markvale/build/a.out $MODE $VALESTROM app/guide/references.vmd build/guide/references
fi

if [ $TARGET == "interfaces" ] || [ $TARGET == "all" ] ; then
  echo "Doing interfaces"
  eval ~/Markvale/build/a.out $MODE $VALESTROM app/guide/interfaces.vmd build/guide/interfaces
fi

if [ $TARGET == "generics" ] || [ $TARGET == "all" ] ; then
  echo "Doing generics"
  eval ~/Markvale/build/a.out $MODE $VALESTROM app/guide/generics.vmd build/guide/generics
fi

if [ $TARGET == "patterns" ] || [ $TARGET == "all" ] ; then
  echo "Doing patterns"
  eval ~/Markvale/build/a.out $MODE $VALESTROM app/guide/patterns.vmd build/guide/patterns
fi

if [ $TARGET == "regions" ] || [ $TARGET == "all" ] ; then
  echo "Doing regions"
  eval ~/Markvale/build/a.out $MODE $VALESTROM app/guide/regions.vmd build/guide/regions
fi

if [ $TARGET == "home" ] || [ $TARGET == "all" ] ; then
  echo "Doing home"
  eval ~/Markvale/build/a.out $MODE $VALESTROM app/home.vmd build/home
  if [ $MODE == "build" ] ; then
    cp build/home build/index.html
  fi
fi

if [ $TARGET == "contribute" ] || [ $TARGET == "all" ] ; then
  echo "Doing contribute"
  eval ~/Markvale/build/a.out $MODE $VALESTROM app/contribute.vmd build/contribute
fi

if [ $TARGET == "roadmap" ] || [ $TARGET == "all" ] ; then
  echo "Doing roadmap"
  eval ~/Markvale/build/a.out $MODE $VALESTROM app/roadmap/roadmap.vmd build/roadmap
  cp app/roadmap/*.css build
fi

if [ $TARGET == "surprising-weak-refs" ] || [ $TARGET == "all" ] ; then
  echo "Doing surprising-weak-refs"
  eval ~/Markvale/build/a.out $MODE $VALESTROM app/blog/surprising-weak-refs.vmd build/blog/surprising-weak-refs
fi

if [ $MODE == "build" ] ; then
  echo "Copying..."
  cp app/*.css build
  cp app/components/*.css build/components
  cp app/components/*.js build/components
  cp app/components/*.png build/components
  cp app/images/* build/images
  cp app/releases/* build/releases
  cp app/blog/*.svg build/blog
fi

echo "Done!"
