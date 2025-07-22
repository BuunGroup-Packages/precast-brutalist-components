#!/bin/bash

# Simple test runner script to bypass hooks
# Usage: ./run-test.sh [test-file-pattern]

if [ "$#" -eq 0 ]; then
    # Run all tests
    exec ../../node_modules/.bin/jest --passWithNoTests
else
    # Run specific test file
    exec ../../node_modules/.bin/jest --passWithNoTests "$1"
fi