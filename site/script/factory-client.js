$(document).ready(function() {
    createLayout();
    var $e1=createEntry("e1");
    var $e2=createEntry("e2");

    $("#box").append($e1);
    $("#box").append($e2);

    $("#box").on("click", "img.download", function() {
        alert($(this).attr("id"));
    });
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
