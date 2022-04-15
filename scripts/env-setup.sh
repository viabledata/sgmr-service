#!/bin/bash
environment=$1

if [[ $environment == "dev" ]]; then
   context="acp-notprod_COP"
   namespace="cop-sgmr-dev"
   secretName="sgmr-e2e-tests"
fi

if [[ $environment == "sit" ]]; then
   context="acp-notprod_COP"
   namespace="cop-sgmr-sit"
   secretName="sgmr-e2e-tests"
fi

if [[ $environment == "staging" ]]; then
   context="acp-prod_COP"
   namespace="cop-sgmr-staging"
   secretName="sgmr-e2e-tests"
fi

rm .env

while read secret
do
  varName=`echo "$secret" | cut -f1 -d ":"`
  varValue=`echo "$secret" | cut -f2 -d ":" | base64 -d`

  if [[ $varName != "CYPRESS_CACHE_FOLDER" ]]; then
      echo "export $varName=$varValue" >> .env
  fi

done < <(kubectl --context=$context --namespace=$namespace get secret $secretName -o yaml | awk 'BEGIN {FS=": ";output=0} {  if ($0 ~ /^kind*/) { output=0 }; if (output) { varName=toupper($1); gsub(/\./, "_", varName); printf " %s:%s\n", varName, $2  }; if ($0 == "data:") { output=1} ;  }')

source .env
echo ${AUTH_REALM}