#!/bin/bash

if [ "$#" -ne 3 ]; then
    echo "Usage: $0 input_directory output_directory width"
    exit 1
fi

input_directory=$1
output_directory=$2
width=$3

mkdir -p "$output_directory"

sanitize_filename() {
    echo "$1" | tr ' ' '_' | tr -cd '[:alnum:]_.-/'
}

find "$input_directory" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.gif" \) | while read -r image; do
    echo "Processing $image"
    relative_path="${image#$input_directory/}"
    sanitized_path=$(sanitize_filename "$relative_path")
    mkdir -p "$output_directory/$(dirname "$sanitized_path")"
    magick "$image" -resize "$width" "$output_directory/$sanitized_path"
    echo "Resized $relative_path and saved to $output_directory"
done

echo "Image downsizing completed."