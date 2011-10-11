#!/bin/bash

set -a

# VARIABLE=${1:-default_value}

function usage(){
   echo "$1 [ ssid [ latitude [ longitude [ hub [ resource [ date ]]]]]]"
}

while getopts "h" opt; do

  case $opt in
    h)
      # echo "-h was triggered"
      usage "$0"
      exit 0
      ;;
  esac


done

SSID="${1:-usuario}"
LATITUDE="${2:-43.0}"
LONGITUDE="${3:-2.21}"
HUB="${4:-taxi0000}"
RESOURCE="${5:-${HUB}_wifi0000}"
DATE=${6:-$(date "+%Y-%m-%dT%TZ")}

function format(){
    
IFS='\n' read -r -d '' MASTER_TEMPLATE <<EOF
<io>
    <obs from="$RESOURCE">
        <stm>$DATE</stm>
        <what href="8:0"/>
        <param href="1:7"><text>$HUB</text></param>
        <param><gps lat="$LATITUDE" lon="$LONGITUDE"/></param>
        <data><text>$SSID</text></data>
    </obs>
</io>
EOF

    echo "$MASTER_TEMPLATE"
}

format

# TEMPLATE=$( format )
# wget -O- -a taxi.log --no-cache --post-file=data/taxi-medida01.xml http://paidgw.hi.inet:8002/idas/2.0


