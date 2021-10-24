var base_url = 'http://213.233.179.83:80/';

var toasty_config = {
    autoClose: true,
    progressBar: true,
    enableSounds: true,
    sounds: {
        info: "https://res.cloudinary.com/dxfq3iotg/video/upload/v1557233294/info.mp3",
        // path to sound for successfull message:
        success: "https://res.cloudinary.com/dxfq3iotg/video/upload/v1557233524/success.mp3",
        // path to sound for warn message:
        warning: "https://res.cloudinary.com/dxfq3iotg/video/upload/v1557233563/warning.mp3",
        // path to sound for error message:
        error: "https://res.cloudinary.com/dxfq3iotg/video/upload/v1557233574/error.mp3",
    },
};

var toast = new Toasty(toasty_config);
toast.configure(toasty_config);

function postReq(my_url, req_type) {
    $.post(my_url, {},
        function(data){
            let status = data['status'];
            let status_str = data['status_str'];
            let sha256_token = data['sha256'];
            console.log("post str for " + req_type + ":");
            console.log(req_type);
            toast.success(JSON.stringify(data));
            console.log(data);
    }).fail(function(){
        console.log("error");
        console.log("post failed");
        toast.error("post failed for " + req_type + ".");
    });
}

function postStrNode() {
    my_string = $("#string_field").val();
    console.log(my_string);
    postReq(base_url + 'node/sha256?string=' + my_string, "node");
};

function postStrGo() {
    my_string = $("#string_field").val();
    console.log(my_string);
    postReq(base_url + 'go/sha256?string=' + my_string, "go");
};

function getReq(my_url, req_type) {
    $.get(my_url, {},
        function(data){
            let found = data['found'];
            let string = data['string'];
            console.log(req_type);
            toast.success(JSON.stringify(data));
            console.log(data);
    }).fail(function(){
        console.log("error");
        console.log("get failed");
        toast.error("get failed for " + req_type + ".");
    });
};

function getStrNode() {
    my_string = $("#sha256_field").val();
    console.log(my_string);
    getReq(base_url + 'node/sha256?sha256=' + my_string, "node")
};

function getStrGo() {
    my_string = $("#sha256_field").val();
    console.log(my_string);
    getReq(base_url + 'go/sha256?sha256=' + my_string, "go");
};

// toast.success(msg);
// toast.error(msg);
// TODO: len(string) > 8