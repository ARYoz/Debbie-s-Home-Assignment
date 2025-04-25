#!/bin/bash

# Save the output of who -a to a file
who -a > who_is_logged

# Create a file called 'fact' with the string "The answer is 42"
echo "The answer is 42" > fact

# Append the content of 'fact' to the end of who_is_logged
cat fact >> who_is_logged

#  Display all lines in alice.txt containing the word 'Alice'
grep "Alice" alice.txt

#  Count the number of lines in alice.txt containing the word 'Why'
grep "Why" alice.txt | wc -l

#  Create chapters.txt with only the chapter titles (excluding "CHAPTER I" etc.)
grep "^CHAPTER" alice.txt | sed 's/^CHAPTER [^ ]*\. \?//' > chapters.txt

#  Display all lines containing 'fear', replacing every 'e' with 'o'
grep "fear" alice.txt | sed 's/e/o/g'

#  Create a numbered list of all lines containing 'Alice' and save to numbered_alice.txt
grep "Alice" alice.txt | nl > numbered_alice.txt

#  Display all lines that do NOT contain the words 'fear' and 'rabbit'
grep -v "fear" alice.txt | grep -v "rabbit"

#  Display all lines containing the character '*', each unique line only once
grep "\*" alice.txt | sort | uniq
