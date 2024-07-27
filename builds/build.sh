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

# Check for the existence of ../src.crx
crx_file="../src.crx"
chrome_notification=""

if [[ -f "$crx_file" ]]; then
    # Get the creation time of the crx file and the output xpi file
    crx_creation_time=$(stat -c %Y "$crx_file")
    xpi_creation_time=$(stat -c %Y "$build_folder/$output_filename")

    # Calculate the time difference in seconds
    time_diff=$((xpi_creation_time - crx_creation_time))
    time_diff_abs=${time_diff#-} # Absolute value of time difference

    # If the time difference is within 1 minute (60 seconds), move the crx file
    if [[ $time_diff_abs -le 60 ]]; then
        chrome_output_filename="chrome-v${version}-${datetime}.crx"
        mv "$crx_file" "$build_folder/$chrome_output_filename"
        chrome_notification="| Extension created successfully.\nCRX File: $build_folder/${chrome_output_filename}"
    else
        chrome_notification="| CRX file exists but creation time difference is more than 1 minute."
    fi
else
    chrome_notification="| CRX file does not exist."
fi

# Notify the user
echo
echo " ====================================="
echo "| ###       Firefox Extension      ###"
echo "| ===================================="
echo |
echo "| Extension created successfully."
echo -e "| XPI File: $build_folder/${output_filename}"
echo |
echo
echo " ====================================="
echo "| ###       Chrome Extension       ###"
echo "| ===================================="
echo |
echo -e "$chrome_notification"
echo

# Go back to the original directory without echoing the path
(cd - > /dev/null)
