# Run
`pip install -r requirements.txt`
`docker-compose up` or `docker-compose up --scale nodeserver=5 goserver=5`
`locust -f load_test.py`
you may need to increasing maximum number of open files limit  
read this link for doing that:  
https://www.cyberciti.biz/faq/linux-increase-the-maximum-number-of-open-files/  
Open a browser and navigate to http://localhost:8089

# Result
Users:          1  
SpawnRate:      1  
RPS:            202
NodeJS:  
    Scale:      1  
    Ram:        22mb  
    CPU:        [8% , 11%]
GoServer:  
    Scale:      1  
    Ram:        8mb    
    CPU:        [11%, 13%]  
Redis:  
    Scale:      1  
    CPU:        [1.6%, 1.8%]  
Nginx:  
    Scale:      1  
    Ram:        4mb  
    CPU:        [1.7%, 1.8%]  
-----------  
Users:          100  
SpawnRate:      100  
RPS:            310  
NodeJS:    
    Scale:      1  
    Ram:        22mb  
    CPU:        [10% , 13%]
GoServer:  
    Scale:      1  
    Ram:        9mb  
    CPU:        [11%, 14%]  
Redis:  
    Scale:      1  
    CPU:        [1.6%, 2.3%]  
Nginx:  
    Scale:      1  
    Ram:        5mb  
    CPU:        [12%, 16%]  
--------  
Users:          100  
SpawnRate:      100  
RPS:            195  
NodeJS:    
    Scale:      5    
    Ram:        22mb    
    CPU:        [10% , 13%]
GoServer:  
    Scale:      5  
    Ram:        9mb  
    CPU:        [11%, 14%]  
Redis:  
    Scale:      1  
    CPU:        [1.6%, 2.3%]  
Nginx:  
    Scale:      1  
    Ram:        5mb  
    CPU:        [12%, 16%]  