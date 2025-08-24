#!/bin/bash

count=0
while read line; do
  echo "$line"
  count=$((count+1))
  if [ $count -eq 2 ]; then
    echo "peter"
    count=0
  fi
done < pass.txt > custom_pass.txt
