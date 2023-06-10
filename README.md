# SehatinAja-backend
docker build -t gcr.io/sehatinaja-c7205/sehatinaja sehatinaja

docker image rm gcr.io/sehatinaja-c7205/sehatinaja

docker push gcr.io/sehatinaja-c7205/sehatinaja

docker container create --name SehatinAja -p 8080:8080 gcr.io/sehatinaja-c7205/sehatinaja

docker container start SehatinAja   
docker container stop SehatinAja 
docker container rm SehatinAja 

docker logs SehatinAja
docker exec -it SehatinAja bash
