#!/bin/bash

# arg 1 - 4 digit year as 2022
# arg 2 - day of challenge as 1-2 digits. 1-25

if [[ $# -ne 2 ]]; then
  echo 'Too many/few arguments, expecting two' >&2
  exit 1
fi

if [[ ${#1} -ne 4 ]]; then
  echo 'Year needs to be 4 digits' >&2
  exit 1
fi

if [[ ${#2} -ne 1 ]] && [[ ${#2} -ne 2 ]]; then
  echo 'Day number needs to be either one or two digits' >&2
  exit 1
fi

# Normalize day numbering to 1 or 2 digits
day_num=$(printf "%.1i" $2)
day_2num=$(printf "%.2i" $2)
day_str="day$day_2num"

# setup/reset directory (destructive)
mkdir -p ./$1/$day_str
cp -n template/* ./$1/$day_str/

# download puzzle and input
aoc download -y $1 -d $day_num -o -i ./$1/$day_str/input.txt -p ./$1/$day_str/puzzle.md

# extremely ugly command to parse title from puzzle file
# 1. head to read first line
# 2. awk to remove everything except title
# 3. awk to remove single whitespace remaining at end
title=$(head -n 1 $1/$day_str/puzzle.md | awk '{ for(i=4;i<NF;i++) printf $i""FS; print "" }' | awk '{gsub(/ +$/, ""); print}')

# Setup files titles and imports for new day
sed -i "s/tempYear/$1/" ./$1/$day_str/index.test.ts
sed -i "s/tempDay/$day_2num/" ./$1/$day_str/index.test.ts
sed -i "s/tempTitle/$title/" ./$1/$day_str/index.test.ts

# add README with title and a link to the puzzle
echo "## $title" >./$1/$day_str/README.md
echo https://adventofcode.com/$1/day/$day_num >>./$1/$day_str/README.md

# variable to flip for git commit
part1_commit=false

function display_menu() {
  echo "Please choose an option:"
  echo "1) submit part 1"
  echo "2) submit part 2"
  echo "3) re-download puzzle for part 2"
  echo "0) git commit (aka be lazy)"
  echo "q) Quit"
  echo "[*]) run tests"
  echo ""
}

# loop for submissions and testing
while true; do
  display_menu
  read -s -n 1 key

  case $key in
  1)
    echo "Enter answer for submission"
    read -p "$title Part 1: " ans
    aoc submit -y $1 -d $day_num 1 $ans
    ;;
  2)
    echo "Enter answer for part 2 submission"
    read -p "$title Part 2: " ans
    aoc submit -y $1 -d $day_num 2 $ans
    ;;
  3)
    echo "Re-downloading Puzzle"
    aoc download -y $1 -d $day_num -o -P -p ./$1/$day_str/puzzle.md
    ;;
  0)
    echo "Adding and commiting to git. Lazy bastard."
    echo "You can push it yourself"
    if [ "$part1_commit" = false ]; then
      git add ./$1/$day_str/index.test.ts
      git add ./$1/$day_str/part1.ts
      git add ./$1/$day_str/README.md
      git commit -m "$1 day $day_num part 1"
      part1_commit=true
    else
      git add ./$1/$day_str/index.test.ts
      git add ./$1/$day_str/part1.ts
      git add ./$1/$day_str/part2.ts
      git add ./$1/$day_str/README.md
      git commit -m "$1 day $day_num part 2"
    fi
    ;;
  q | Q)
    echo "Exiting..."
    exit 0
    ;;
  *)
    echo "Running Tests"
    pnpm test $1/$day_str
    ;;
  esac
  echo ""
done
