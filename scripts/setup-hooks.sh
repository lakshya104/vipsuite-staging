#!/bin/sh

# Setup script to install git hooks
echo "Setting up git hooks..."

# Copy pre-commit hook to .git/hooks
cp scripts/pre-commit .git/hooks/pre-commit

# Make it executable
chmod +x .git/hooks/pre-commit

echo "Git hooks setup complete!"
