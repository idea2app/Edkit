set -e

mkdir -p docs

for name in "$@"; do
    (
        cd "$name"
        pnpm publish || true
    )
    if [ -d "$name/test/dist" ]; then
        rm -rf "docs/$name"
        mv "$name/test/dist" "docs/$name"
    fi
done
