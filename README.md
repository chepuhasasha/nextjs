# QTB

### install

```command
npm i
```

### Start prod docker

```
docker-compose -f docker/docker-compose.yaml --env-file .env up
```

### Dev
```
docker-compose -f docker/docker-compose_dev.yaml --env-file .env up
```

```
npm run dev
```