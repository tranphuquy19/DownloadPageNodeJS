var files = [];
var file = {
    name : "",
    size : 0,
    path : ""
}
for(i = 0; i <= 2; i++){
    file.name = "abc";
    file.size = 123;
    file.path = "jjjj";
    files.push(file);
}

//console.log(files);

files.forEach(function(file){
    console.log(file.name);
    console.log(file.path);
})