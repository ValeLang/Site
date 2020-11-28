if [ "$1" != "incremental" ]
then
  rm -rf build
  npm run build
  mkdir build/components
  mkdir build/images
  mkdir build/guide
fi
echo "Doing GenerationalReferences"
~/Markvale/build/a.out app/blog/GenerationalReferences.vmd build/blog/generational-references ~/Vale/release-ubuntu/Valestrom.jar
echo "Doing HybridGenerationalMemory"
~/Markvale/build/a.out app/blog/HybridGenerationalMemory.vmd build/blog/hybrid-generational-memory ~/Vale/release-ubuntu/Valestrom.jar
echo "Doing contributors"
~/Markvale/build/a.out app/contributors.vmd build/contributors ~/Vale/release-ubuntu/Valestrom.jar
echo "Doing introduction"
~/Markvale/build/a.out app/guide/introduction.vmd build/guide/introduction ~/Vale/release-ubuntu/Valestrom.jar
echo "Done!"
cp app/*.css build
cp app/components/*.css build/components
cp app/components/*.js build/components
cp app/images/* build/images
