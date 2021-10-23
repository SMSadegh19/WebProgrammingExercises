# WebProgrammingExercises
Sharif Web Programming Course Fall 2021 exercises

# Run services
```docker-compose up```
if port 80 is allocated change this part in docker-compose under nginx service from
```
ports:
    - "80:80"
```
to
```
ports:
    - "8000:80"
```