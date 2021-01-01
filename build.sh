if [ "$1" == "" ] ; then
  echo "First arg should be 'all' or a page name"
fi

if [ "$2" == "" ] ; then
  echo "Second arg should be path to Valestrom.jar"
fi

if [ "$1" == "clean" ] || [ "$1" == "all" ] ; then
  rm -rf build
  mkdir build
  mkdir build/components
  mkdir build/images
  mkdir build/guide
  mkdir build/blog
  mkdir build/releases
fi

if [ "$1" == "raii-next-steps" ] || [ "$1" == "all" ] ; then
  echo "Doing raii-next-steps"
  ~/Markvale/build/a.out app/blog/raii-next-steps.vmd build/blog/raii-next-steps $2
fi

if [ "$1" == "cross-platform-core-vision" ] || [ "$1" == "all" ] ; then
  echo "Doing cross-platform-core-vision"
  ~/Markvale/build/a.out app/blog/cross-platform-core-vision.vmd build/blog/cross-platform-core-vision $2
fi

if [ "$1" == "zero-cost-refs-regions" ] || [ "$1" == "all" ] ; then
  echo "Doing zero-cost-refs-regions"
  ~/Markvale/build/a.out app/blog/zero-cost-refs-regions.vmd build/blog/zero-cost-refs-regions $2
fi

if [ "$1" == "generational-references" ] || [ "$1" == "all" ] ; then
  echo "Doing generational-references"
  ~/Markvale/build/a.out app/blog/generational-references.vmd build/blog/generational-references $2
fi

if [ "$1" == "hybrid-generational-memory" ] || [ "$1" == "all" ] ; then
  echo "Doing hybrid-generational-memory"
  ~/Markvale/build/a.out app/blog/hybrid-generational-memory.vmd build/blog/hybrid-generational-memory $2
fi

if [ "$1" == "hgm-static-analysis-part-1" ] || [ "$1" == "all" ] ; then
  echo "Doing hgm-static-analysis-part-1"
  ~/Markvale/build/a.out app/blog/hgm-static-analysis-part-1.vmd build/blog/hgm-static-analysis-part-1 $2
fi

if [ "$1" == "beyond-rust-innovations" ] || [ "$1" == "all" ] ; then
  echo "Doing beyond-rust-innovations"
  ~/Markvale/build/a.out app/blog/beyond-rust-innovations.vmd build/blog/beyond-rust-innovations $2
fi

if [ "$1" == "comparisons" ] || [ "$1" == "all" ] ; then
  echo "Doing comparisons"
  ~/Markvale/build/a.out app/blog/comparisons.vmd build/blog/comparisons $2
fi

if [ "$1" == "fearless" ] || [ "$1" == "all" ] ; then
  echo "Doing fearless"
  ~/Markvale/build/a.out app/blog/fearless.vmd build/blog/fearless $2
fi

if [ "$1" == "contributors" ] || [ "$1" == "all" ] ; then
  echo "Doing contributors"
  ~/Markvale/build/a.out app/contributors.vmd build/contributors $2
fi

if [ "$1" == "download" ] || [ "$1" == "all" ] ; then
  echo "Doing download"
  ~/Markvale/build/a.out app/download.vmd build/download $2
fi

if [ "$1" == "introduction" ] || [ "$1" == "all" ] ; then
  echo "Doing introduction"
  ~/Markvale/build/a.out app/guide/introduction.vmd build/guide/introduction $2
fi

if [ "$1" == "structs" ] || [ "$1" == "all" ] ; then
  echo "Doing structs"
  ~/Markvale/build/a.out app/guide/structs.vmd build/guide/structs $2
fi

if [ "$1" == "references" ] || [ "$1" == "all" ] ; then
  echo "Doing references"
  ~/Markvale/build/a.out app/guide/references.vmd build/guide/references $2
fi

if [ "$1" == "interfaces" ] || [ "$1" == "all" ] ; then
  echo "Doing interfaces"
  ~/Markvale/build/a.out app/guide/interfaces.vmd build/guide/interfaces $2
fi

if [ "$1" == "generics" ] || [ "$1" == "all" ] ; then
  echo "Doing generics"
  ~/Markvale/build/a.out app/guide/generics.vmd build/guide/generics $2
fi

if [ "$1" == "patterns" ] || [ "$1" == "all" ] ; then
  echo "Doing patterns"
  ~/Markvale/build/a.out app/guide/patterns.vmd build/guide/patterns $2
fi

if [ "$1" == "regions" ] || [ "$1" == "all" ] ; then
  echo "Doing regions"
  ~/Markvale/build/a.out app/guide/regions.vmd build/guide/regions $2
fi

if [ "$1" == "home" ] || [ "$1" == "all" ] ; then
  echo "Doing home"
  ~/Markvale/build/a.out app/home.vmd build/home $2
  cp build/home build/index.html
fi

if [ "$1" == "contribute" ] || [ "$1" == "all" ] ; then
  echo "Doing contribute"
  ~/Markvale/build/a.out app/contribute.vmd build/contribute $2
fi

if [ "$1" == "roadmap" ] || [ "$1" == "all" ] ; then
  echo "Doing roadmap"
  ~/Markvale/build/a.out app/roadmap/roadmap.vmd build/roadmap $2
  cp app/roadmap/*.css build
fi

cp app/*.css build
cp app/components/*.css build/components
cp app/components/*.js build/components
cp app/components/*.png build/components
cp app/images/* build/images
cp app/releases/* build/releases
cp app/blog/*.svg build/blog

echo "Done!"
