var base_url = 'http://213.233.179.83:80/';

function postStrNode() {
    my_string = $("#string_field").val();
    console.log(my_string);
    $.post(base_url + 'node/sha256?string=' + my_string, {},
        function(data){
            let status = data['status'];
            let status_str = data['status_str'];
            let sha256_token = data['sha256'];
            console.log("post str for node!");
            console.log(data);
    }).fail(function(){
        console.log("error");
        console.log("post failed");
    });
};

function postStrGo() {
    my_string = $("#string_field").val();
    console.log(my_string);
    $.post(base_url + 'go/sha256?string=' + my_string, {},
        function(data){
            let status = data['status'];
            let status_str = data['status_str'];
            let sha256_token = data['sha256'];
            console.log("post str for go!");
            console.log(data);
    }).fail(function(){
        console.log("error");
        console.log("post failed");
    });
};

function getStrNode() {
    my_string = $("#sha256_field").val();
    console.log(my_string);
    $.get(base_url + 'node/sha256?sha256=' + my_string, {},
        function(data){
            let found = data['found'];
            let string = data['string'];
            console.log("get str for node!");
            console.log(data);
    }).fail(function(){
        console.log("error");
        console.log("get failed");
    });
};

function getStrGo() {
    my_string = $("#sha256_field").val();
    console.log(my_string);
    $.get(base_url + 'go/sha256?sha256=' + my_string, {},
        function(data){
            let found = data['found'];
            let string = data['string'];
            console.log("get str for go!");
            console.log(data);
    }).fail(function(){
        console.log("error");
        console.log("get failed");
    });
};