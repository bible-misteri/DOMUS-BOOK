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

mkdir -p "$BOOK/output"
echo "✓ output"

cd "$BOOK"

echo "Current directory:"
pwd

python3 ../../scripts/validate_metadata.py metadata.yaml

python3 ../../scripts/validate_book.py .
echo
echo "Markdown files:"
ls -1 manuscript

echo
echo "Compiling:"
printf '%s\n' manuscript/*.md

#========================================
# BUILD LATEX
#========================================

echo
echo "Generating LaTeX source..."

pandoc \
    manuscript/*.md \
    --metadata-file=metadata.yaml \
    --template=../../template/domus-template.tex \
    --resource-path=".:images:../../assets:../../template" \
    --toc \
    --standalone \
    -t latex \
    -o output/debug.tex

#========================================
# BUILD PDF
#========================================

echo
echo "Building PDF..."

pandoc \
    manuscript/*.md \
    --metadata-file=metadata.yaml \
    --template=../../template/domus-template.tex \
    --resource-path=".:images:../../assets:../../template" \
    --toc \
    --number-sections \
    --pdf-engine=xelatex \
    --standalone \
    -s \
    -o output/$NAME.pdf \
    --verbose \
    2> output/pandoc.log

#========================================
# BUILD EPUB
#========================================

echo "=================================="
echo "Building EPUB..."
echo "=================================="

pandoc \
    manuscript/*.md \
    --metadata-file=metadata.yaml \
    --toc \
    --standalone \
    --resource-path=".:images:../../assets" \
    -o "output/$NAME.epub"

echo
echo "✓ EPUB CREATED SUCCESSFULLY"

echo
echo "=================================="
echo "BUILD FINISHED SUCCESSFULLY"
echo "=================================="
echo
echo "PDF  : output/$NAME.pdf"
echo "EPUB : output/$NAME.epub"
