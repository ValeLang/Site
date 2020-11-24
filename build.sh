if [ "$1" != "incremental" ]
then
  rm -rf build
  npm run build
  mkdir build/components
  mkdir build/images
fi
~/Markvale/build/a.out app/blog/GenerationalMalloc.vmd build/blog/generational-malloc ~/Vale/release-ubuntu/Valestrom.jar
~/Markvale/build/a.out app/blog/HybridGenerationalMemory.vmd build/blog/hybrid-generational-memory ~/Vale/release-ubuntu/Valestrom.jar
cp app/*.css build
cp app/components/*.css build/components
cp app/images/* build/images
