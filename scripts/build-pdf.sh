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

cd "$BOOK"

echo "Current directory:"
pwd

python3 ../../scripts/validate_metadata.py metadata.yaml

echo
echo "=================================="
echo "Checking book structure..."
echo "=================================="

# Folder manuscript
if [ ! -d manuscript ]; then
    echo "ERROR: manuscript folder not found."
    exit 1
fi
echo "✓ manuscript"

# Folder images
if [ ! -d images ]; then
    echo "ERROR: images folder not found."
    exit 1
fi
echo "✓ images"

COVER=$(python3 -c "import yaml; print(yaml.safe_load(open('metadata.yaml', encoding='utf-8'))['cover'])")
if [ ! -f "$COVER" ]; then
    echo "ERROR: Cover image not found: $COVER"
    exit 1
fi
echo "✓ cover"



# Markdown
COUNT=$(find manuscript -name "*.md" | wc -l)

if [ "$COUNT" -eq 0 ]; then
    echo "ERROR: No markdown files found."
    exit 1
fi
echo "✓ markdown ($COUNT files)"

echo
echo "Book validation passed."
echo

# ==============================
# BUILD
# ==============================

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
    echo

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
