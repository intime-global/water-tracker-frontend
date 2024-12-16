# Water Tracker Frontend

The final team project in GoIT school.

Live site: 🔗[water-tracker.online](https://water-tracker.online/)

## Information for developers

If you want to test all your changes in "Production" mode, you can build docker image and create container from it.

For building local image it is not neccessary to commit your changes! Just build docker image and see how it works in "Production" mode!

If your build failed, you now what to do, but do not commit changes until you fix your build!

### Install Docker

See [installation instructions for your platform](https://docs.docker.com/get-started/get-docker/)

> [!NOTE]
> If you are using Linux-based OS, it is prefferred to use [docker-engine](https://docs.docker.com/engine/install/)

### Build image

```bash
docker build --build-arg VITE_BACKEND_SERVER_URL=https://api.water-tracker.online -t water-tracker-frontend .
```

You can use any other `VITE_BACKEND_SERVER_URL`, even http://localhost:3000 if you want to test some new features which are not yet deployed to backend.

Tag also can be named in another way.

Now, let's verify our containers:

```bash
$ docker images
REPOSITORY               TAG       IMAGE ID       CREATED         SIZE
water-tracker-frontend   latest    9b4b98505c4e   4 seconds ago   55.3MB
```

### Run docker container

```bash
docker run -d --name front -p 8080:80 water-tracker-frontend
```

The first number after `-p` is the port on your local computer, so using this command, you can see the project using address http://localhost:8080

If your port 8080 is in use, you can use any other free port.

The name of container is just for example, you can use some yours.

### Clean up

- Stop your container (I use `front` from example above)

  ```bash
  docker stop front
  ```

- Remove container

  ```bash
  docker rm front
  ```

- Remove image (I use `water-tracker-frontend` from example above)

  ```bash
  docker rmi water-tracker-frontend
  ```
