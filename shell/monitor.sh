#!/usr/bin/env bash
# =============================================================================
# monitor.sh
#
# A simple loop that checks service health endpoints, logs status, and alerts
# if anything is down.
# =============================================================================

set -euo pipefail
IFS=$'\n\t'

# Configure your endpoints here
ENDPOINTS=(
  "http://localhost"           # landing
  "http://localhost:3001/health" # electron health-check
  "http://localhost:3002/ping"   # extension dev server
)

LOGFILE="/var/log/clipchronicle-monitor.log"
INTERVAL=60  # seconds between checks

echo "Starting health monitor (interval: ${INTERVAL}s). Logging to ${LOGFILE}"
echo "Monitor started at $(date -u)" >> "${LOGFILE}"

while true; do
  for url in "${ENDPOINTS[@]}"; do
    status=$(curl -s -o /dev/null -w "%{http_code}" "${url}" || echo "000")
    timestamp=$(date +"%Y-%m-%dT%H:%M:%S%z")
    if [[ "${status}" -ge 200 && "${status}" -lt 300 ]]; then
      echo "${timestamp} ✔ ${url} ${status}" >> "${LOGFILE}"
    else
      echo "${timestamp} ✖ ${url} ${status}" >> "${LOGFILE}"
      # Optional: send alert (email/slack)
      # send_alert "${url}" "${status}"
    fi
  done
  sleep "${INTERVAL}"
done
