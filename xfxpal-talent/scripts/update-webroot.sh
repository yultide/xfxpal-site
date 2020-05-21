#!/bin/bash

if [ -e webroot ]; then
    mv webroot webroot.old
fi
mv build webroot
rm -rf webroot.old