#!/bin/bash

# Exit on error
set -e

echo "🔨 Building component library..."

# Build the library with TypeScript declarations
bun run build

# Bundle CSS variables with the output
echo "📦 Bundling CSS variables..."
cat src/styles-bundle.css dist/brutalist-ui.css > dist/brutalist-ui.css.tmp && mv dist/brutalist-ui.css.tmp dist/brutalist-ui.css

# Verify type declarations were generated
echo "📝 Verifying type declarations..."
if [ -f "dist/index.d.ts" ]; then
  echo "✅ TypeScript declarations generated successfully"
else
  echo "❌ Failed to generate TypeScript declarations"
  exit 1
fi

echo "📦 Preparing for publish..."

# Backup current package.json
cp package.json package.json.backup

# Use publish package.json
cp package.publish.json package.json

echo "📤 Publishing to npm..."

# Publish to npm (dry run first)
npm publish --dry-run

echo ""
echo "✅ Dry run complete! Review the output above."
echo ""
echo "To actually publish, press Enter. To cancel, press Ctrl+C"
read -r

echo "🚀 Publishing for real..."
npm publish --access public

echo ""
echo "✅ Published successfully!"

# Function to restore package.json
restore_package() {
    cp package.json.backup package.json
    rm package.json.backup
    echo "✅ Original package.json restored"
}

# Restore on exit
trap restore_package EXIT