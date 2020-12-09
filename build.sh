if [ "$1" == "" ] ; then
  echo "First arg should be 'all' or a page name"
fi

if [ "$1" == "webpack" ] || [ "$1" == "all" ] ; then
  rm -rf build
  npm run build
  mkdir build/components
  mkdir build/images
  mkdir build/guide
fi

if [ "$1" == "GenerationalReferences" ] || [ "$1" == "all" ] ; then
  echo "Doing GenerationalReferences"
  ~/Markvale/build/a.out app/blog/GenerationalReferences.vmd build/blog/generational-references ~/Vale/release-ubuntu/Valestrom.jar
fi

if [ "$1" == "HybridGenerationalMemory" ] || [ "$1" == "all" ] ; then
  echo "Doing HybridGenerationalMemory"
  ~/Markvale/build/a.out app/blog/HybridGenerationalMemory.vmd build/blog/hybrid-generational-memory ~/Vale/release-ubuntu/Valestrom.jar
fi

if [ "$1" == "contributors" ] || [ "$1" == "all" ] ; then
  echo "Doing contributors"
  ~/Markvale/build/a.out app/contributors.vmd build/contributors ~/Vale/release-ubuntu/Valestrom.jar
fi

if [ "$1" == "download" ] || [ "$1" == "all" ] ; then
  echo "Doing download"
  ~/Markvale/build/a.out app/download.vmd build/download ~/Vale/release-ubuntu/Valestrom.jar
fi

if [ "$1" == "introduction" ] || [ "$1" == "all" ] ; then
  echo "Doing introduction"
  ~/Markvale/build/a.out app/guide/introduction.vmd build/guide/introduction ~/Vale/release-ubuntu/Valestrom.jar
fi

if [ "$1" == "structs" ] || [ "$1" == "all" ] ; then
  echo "Doing structs"
  ~/Markvale/build/a.out app/guide/structs.vmd build/guide/structs ~/Vale/release-ubuntu/Valestrom.jar
fi

if [ "$1" == "references" ] || [ "$1" == "all" ] ; then
  echo "Doing references"
  ~/Markvale/build/a.out app/guide/references.vmd build/guide/references ~/Vale/release-ubuntu/Valestrom.jar
fi

if [ "$1" == "interfaces" ] || [ "$1" == "all" ] ; then
  echo "Doing interfaces"
  ~/Markvale/build/a.out app/guide/interfaces.vmd build/guide/interfaces ~/Vale/release-ubuntu/Valestrom.jar
fi

if [ "$1" == "generics" ] || [ "$1" == "all" ] ; then
  echo "Doing generics"
  ~/Markvale/build/a.out app/guide/generics.vmd build/guide/generics ~/Vale/release-ubuntu/Valestrom.jar
fi

if [ "$1" == "patterns" ] || [ "$1" == "all" ] ; then
  echo "Doing patterns"
  ~/Markvale/build/a.out app/guide/patterns.vmd build/guide/patterns ~/Vale/release-ubuntu/Valestrom.jar
fi

if [ "$1" == "regions" ] || [ "$1" == "all" ] ; then
  echo "Doing regions"
  ~/Markvale/build/a.out app/guide/regions.vmd build/guide/regions ~/Vale/release-ubuntu/Valestrom.jar
fi

cp app/*.css build
cp app/components/*.css build/components
cp app/components/*.js build/components
cp app/images/* build/images

echo "Done!"
