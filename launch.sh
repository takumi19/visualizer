#!/bin/bash

# cleanup  on interrupt
cleanup() {
	echo ""
	echo "Stopping the application..."
	kill -9 $BACKEND_PID
	wait $BACKEND_PID
	echo "Application stopped!"
	exit 0
}

# catch interrupt signal with trap
trap cleanup SIGINT

# check if node is installed
if ! [ -x "$(command -v node)" ]; then
	echo 'Error: node is not installed.' >&2
	exit 1
fi

# start backend
cd backend
node index.js &
BACKEND_PID=$!

#start default browser
open ../frontend/src/index.html

#wait for processes to finish
wait $BACKEND_PID
