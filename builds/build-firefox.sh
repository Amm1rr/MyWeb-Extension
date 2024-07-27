#!/bin/bash

# Navigate to the parent directory
cd ..
cd src/

# Get the current date and time
datetime=$(date +"%Y%m%d-%H%M%S")

# Extract the version from manifest.json
version=$(grep -Po '"version": *\K"[^"]*"' manifest.json | tr -d '"')

# Define the output file name and the build folder
output_filename="firefox-v${version}-${datetime}.xpi"
build_folder="../builds"

# Create the builds folder if it does not exist
mkdir -p "$build_folder"

# Create a zip file with the desired extension, excluding .idea, .git, and dev directories
zip -r "$output_filename" ./*

# Move the zip file to the builds folder
mv "$output_filename" "$build_folder"

# Notify the user
echo -----
echo "Firefox extension created successfully."
echo
echo "XPI File: $build_folder/${output_filename}"

# Go back to the original directory
cd -
