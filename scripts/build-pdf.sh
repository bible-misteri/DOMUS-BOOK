#!/bin/bash

set -e

BOOK="$1"

if [ -z "$BOOK" ]; then
    echo "Usage: build-pdf.sh <book-folder>"
    exit 1
fi

NAME=$(basename "$BOOK")

echo "=================================="
echo "Building PDF : $NAME"
echo "=================================="

mkdir -p output

pandoc \
    "$BOOK/00-prolog.md" \
    "$BOOK/00a-hakcipta.md" \
    "$BOOK/00b-frontispiece.md" \
    "$BOOK/00c-daftarisi.md" \
    "$BOOK/01-pendahuluan.md" \
    "$BOOK"/chapters/*.md \
    "$BOOK/99-test-gambar.md" \
    --toc \
    --number-sections \
    --resource-path="$BOOK:$BOOK/images:$BOOK/images/diagram:$BOOK/images/ilustrasi:$BOOK/chapters" \
    --pdf-engine=xelatex \
    -V documentclass=report \
    -V geometry:margin=3cm \
    -V fontsize=12pt \
    -V mainfont="TeX Gyre Pagella" \
    -V linestretch=1.2 \
    -o "output/$NAME.pdf"

echo
echo "✓ PDF created:"
echo "output/$NAME.pdf"
