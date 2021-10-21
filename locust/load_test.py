from locust import HttpUser, between, task
import uuid
import random

hash_to_string = {}
hashes = []

class WebsiteUser(HttpUser):
    # host = "http://213.233.179.83"
    host = "http://localhost"


    def get_go_node(self) -> str:
        if random.random() < 0.5:
            return 'go'
        return 'node'
  
    @task(1)
    def post_less_than_eight(self):
        string = str(uuid.uuid1())[:random.randint(0, 7)]
        result = self.client.post(f"/{self.get_go_node()}/sha256?string={string}").json()
        assert result['status'] == False

    
    @task(19)
    def post_string_ok(self):
        string = str(uuid.uuid1())
        result = self.client.post(f"/{self.get_go_node()}/sha256?string={string}").json()
        assert result['status'] == True
        hash_to_string[result['sha256']] = string
        hashes.append(result['sha256'])
        
    @task(10)
    def get_in_db(self):
        if not len(hashes):
            return
        hsh = hashes[random.randint(0, len(hashes)-1)]
        result = self.client.get(f"/{self.get_go_node()}/sha256?sha256={hsh}").json()
        assert result['found'] == True
        string = result['string']
        assert string == hash_to_string[hsh]

    @task(10)
    def get_not_in_db(self):
        sha256 = random.getrandbits(256)
        string = str(uuid.uuid1())
        result = self.client.get(f"/{self.get_go_node()}/sha256?sha256=%032x" % sha256).json()