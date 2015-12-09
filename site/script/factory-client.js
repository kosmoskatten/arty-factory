$(document).ready(function() {
    $layout=createLayout();
    $("body").append($layout);

    updateFileList();
    $("#update").click(function() {
        $("#box").empty();
        updateFileList();
    });
});

function updateFileList() {
    $.get("/storage", function(files) {
        files.forEach(function(file) {
            var $entry=createEntry(file);
            $("#box").append($entry);
        });
    }, "json");
}

function createLayout() {
    var infoText="Download a package by clicking the arrow, or by " +
                 "right click the arrow (Save link as ...). Unpack, " +
                 "tar xvfz <file>.tar.gz, cd into the directory and " +
                 "run ./run-ccm.sh"
    var $layout=$("<div/>", {id: "layout", class: "layout"});
    var $update=$("<button/>", {id: "update",
                                class: "update",
                                text: "Update Arty-Factory List"});
    var $box=$("<div/>", {id: "box", class: "box"});
    var $footer=$("<div/>", {id: "footer", class: "footer"});
    var $logo=$("<h1/>", {class: "footer", text: "Demo Arty-Factory"});
    var $info=$("<p/>", {class: "footer",
                        text: infoText});

    $footer.append($logo);
    $footer.append($info);
    $layout.append($update);
    $layout.append($box);
    $layout.append($footer);

    return $layout;
}

function createEntry(file) {
    var $label=$("<p/>", {class: "entry", text: file.fullPath}); 
    var $icon=$("<img/>", {class: "download",
                           src: "/image/download.png",
                           title: "Download " + file.name});
    var $link=$("<a/>", {href: file.fullPath,
                         download: file.name});
    var $entry=$("<div/>", {class: "entry"});
    $link.append($icon);
    $entry.append($label);
    $entry.append($link);
    return $entry;
}
