## guardiascubiertas API

## Requirements
To run & work on this project you need to have the following installed:
- [Docker](https://docs.docker.com/install/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Installation & Configuration

- Create the .env file using .env.dist as template

- Build the container
```bash
$ docker-compose build
```

### Running

```bash
$ docker-compose up
```

### Stop services

```bash
$ docker-compose down
```

### Migrations and Seeders

*The migrations and seeders are executed automatically before starting the server*

- If you want to manually run migrations/seeders do the following:

```bash
# Run migrations
$ node_modules/.bin/sequelize db:migrate
# Run seeders
$ node_modules/.bin/sequelize db:seed:all
```
### Tests
To run commands in the container, execute _$ docker exec -it <container_name> bash_, and then:
- Create the test database if it's not already created:
```bash
$ npm run test-db-create
```
- Run the tests:
```bash
$ npm run test
```
To run the tests in staging/production before iclinicartion:
* First, enter to the api-test folder
* Then, update to the latest version of the API (pull)
* After that, before updating the running container, run the following command
```bash
$  docker-compose -f docker-compose.test.yml up
```
This will create a separate container and execute the tests.
If the tests pass, then update the running container with the new changes.

### Documentation

* The documentation is automatically generated in staging and production.
* To generate the documentation in development, run the following command:
```bash
$ npm run apidoc
```
* To access to the documentation, go to: <api_domain>/apidoc
* The access credentials are configured in the .env file

### Synchronize local changes with server

dry-run //simulacro copia al servidor 
rsync -avn . guardiascubiertas:/home/deployer/api --exclude=".git" --exclude="node_modules" --exclude="apidoc" --exclude=".env"

syncronize //hace la copia al servidor - para ejecutar hay que estar en la ruta del proyecto

rsync -av . guardiascubiertas:/home/deployer/api --exclude=".git" --exclude="node_modules" --exclude="apidoc" --exclude=".env"


### Delete volume to renew database models

docker volume ls
docker volume rm api_pgdata


### Ver logs

docker logs api_api_1 -f

### Enter A Docker Container | Ingresar a maquina virtual

Find out a container’s name or ID with the docker ps command:
```bash
$ docker ps
```
CONTAINER ID  IMAGE    COMMAND  CREATED      STATUS      PORTS  NAMES
72ca2488b353  my_image          X hours ago  Up X hours         my_container

Enter a Docker container by name or ID and start a bash shell:
```bash
$ docker exec -it 72ca2488b353 bash
```
en wind 10
 $ winpty docker exec -it 72ca2488b353 bash
### Enter Postgress comand line | Ingresar a linea de comandos de postgress

```bash
psql mark_api username
```

listar tablas
\dt


presets: [ [ "@vue/app", { useBuiltIns: "entry" } ] ]

docker volume rm guardiascubiertas-backend_pgdata

insert into usuario_roles (id,name, description, created_at, updated_at) VALUES (6,'DUEÑO', 'test', '2019-05-16 13:18:08.009+00', '2019-05-16 13:18:08.009+00');

### listar tablas BD
\dt

### IP SERVIDOR
31.220.62.77

### error wind 10   Cannot start service api: b'driver failed programming external connectivity on endpoint
1) Close "Docker Desktop"

2) Run the commands below:

net stop com.docker.service
net start com.docker.service
3) Launch "Docker Desktop" again