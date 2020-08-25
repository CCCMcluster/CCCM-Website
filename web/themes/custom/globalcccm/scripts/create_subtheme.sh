#!/bin/bash
# Script to quickly create sub-theme.

echo '
+------------------------------------------------------------------------+
| With this script you could quickly create globalcccm sub-theme         |
| In order to use this:                                                  |
| - bootstrap theme (this folder) should be in the contrib folder        |
+------------------------------------------------------------------------+
'
cd ../../../custom
cp -r ../contrib/bootstrap .
echo "# Check the themes/custom folder for your new sub-theme."
