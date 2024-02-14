mkdir -p docs

for name in $*; do
    cd $name
    pnpm i --frozen-lockfile
    npm publish
    mv test/dist ../docs/$name
    cd ..
done
