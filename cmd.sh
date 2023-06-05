docker built -t gcr.io/sehatinaja-c7205/SehatinAja sehatinaja

docker push gcr.io/sehatinaja-c7205/SehatinAja

docker container create --name SehatinAja gcr.io/sehatinaja-c7205/SehatinAja

docker container start SehatinAja   