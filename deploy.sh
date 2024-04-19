NETWORK_NAME="backend"

if docker network inspect "$NETWORK_NAME" &>/dev/null; then
  echo "Network '$NETWORK_NAME' exists"
else
  docker network create ${NETWORK_NAME}
fi

sleep 2
docker compose -f docker-compose.yml up --build -d

sleep 2
docker network connect ${NETWORK_NAME} dummy
