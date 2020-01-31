#!/bin/bash

log()
{
   echo "`date +'%D %T'` : $1"
}
track_error()
{
   if [ $1 != "0" ]; then
        log "$2 exited with error code $1"
        log "completed execution IN ERROR at `date`"
        exit $1
   fi

}

ENV=$1
APPCONFIGFILENAME=$2
cd topcoder-community-smoke-test
aws s3 cp s3://tc-platform-${ENV}/securitymanager/${APPCONFIGFILENAME} .
track_error $? "Environment setting"
if [ $ENV == 'qa' ]; then
  cp  $cAPPCONFIGFILENAME config-qa.json
elif [ $ENV == 'dev' ]; then
   cp  $APPCONFIGFILENAME config-dev.json
else
   cp  $APPCONFIGFILENAME config-prod.json
fi
# for config file
mv ${APPCONFIGFILENAME} config.json
docker build -t comm-smoke:latest .
docker run --shm-size=2g comm-smoke:latest ./testrun.sh ${ENV} -d -p 4444:4444
track_error $? "Test case Failed"