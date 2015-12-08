$(document).ready(function() {
    createLayout();
    var $e1=createEntry("/storage/buildR1B65.tar.gz");
    var $e2=createEntry2("buildR1B66.tar.gz");

    $("#box").append($e1);
    $("#box").append($e2);

    //$("#box").on("click", "img.download", function() {
    //    alert($(this).attr("id"));
    //});
});

function createLayout() {
    var $box=$("<div/>", {id: "box", class: "box"});
    $("body").append($box);
}

function createEntry(name) {
    var $entry=$("<div/>", {class: "entry"});
    var $download=$("<img/>", {id: name, 
                               class: "download",
                               src: "/image/download.png",
                               title: "Download " + name});
    $entry.append($download);
    return $entry;
}

function createEntry2(name) {
    var $icon=$("<img/>", {class: "download",
                           src: "/image/download.png",
                           title: "Download " + name});
    var $link=$("<a/>", {href: "/storage/" + name,
                         download: name});
    var $entry=$("<div/>", {class: "entry"});
    $link.append($icon);
    $entry.append($link);
    return $entry;
}
