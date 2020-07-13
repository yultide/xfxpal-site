#!/bin/bash
revisioncount=`git log --oneline | wc -l | tr -d ' '`
projectversion="1.0"
cleanversion=${projectversion%%-*}
githash=`git rev-parse --short HEAD`

# echo "$projectversion-$revisioncount"
echo "$cleanversion.$revisioncount-$githash"