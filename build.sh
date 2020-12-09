if [ "$1" == "" ] ; then
  echo "First arg should be 'all' or a page name"
fi

if [ "$2" == "" ] ; then
  echo "Second arg should be path to Valestrom.jar"
fi

if [ "$1" == "webpack" ] || [ "$1" == "all" ] ; then
  rm -rf build
  npm run build
  mkdir build/components
  mkdir build/images
  mkdir build/guide
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

cp app/*.css build
cp app/components/*.css build/components
cp app/components/*.js build/components
cp app/images/* build/images

echo "Done!"
