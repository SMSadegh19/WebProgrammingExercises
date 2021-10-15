function postStrNode() {
    my_string = $("#string_field").val()
    console.log(my_string)
    $.post('http://213.233.179.83:8080/node/sha256?string='+my_string, {},
        function(data){
            const obj = JSON.parse(data);
            let status = obj['status'];
            let status_str = obj['status_str'];
            let sha256_token = obj['sha256'];
            console.log("post str for node!")
            console.log(JSON.stringify(obj))
    }).fail(function(){
        console.log("error");
        console.log("post failed");
    });
};

function postStrGo() {
    my_string = $("#string_field").val()
    console.log(my_string)
    $.post('http://213.233.179.83:8080/go/sha256?string='+my_string, {},
        function(data){
            const obj = JSON.parse(data);
            let status = obj['status'];
            let status_str = obj['status_str'];
            let sha256_token = obj['sha256'];
            console.log("post str for node!")
            console.log(JSON.stringify(obj))
    }).fail(function(){
        console.log("error");
        console.log("post failed");
    });
};