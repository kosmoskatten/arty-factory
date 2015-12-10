$(document).ready(function() {
    // Create the layout and add it to the body.
    $layout=createLayout();
    $("body").append($layout);

    // Initial update of the file list.
    updateFileList();

    // Handle button click events.
    $("#update").click(function() {
        $("#container").empty();
        updateFileList();
    });
});

function updateFileList() {
    $.get("/storage", function(files) {
        files.forEach(function(file) {
            var $entry=createEntry(file);
            $("#container").append($entry);
        });
    }, "json");
}

function createLayout() {
    var infoText="Download a package by clicking the arrow, or by " +
                 "right click the arrow (Save link as ...). Unpack, " +
                 "tar xvfz <file>.tar.gz, cd into the directory and " +
                 "run ./run-ccm.sh"

    // Create the layout taking the complete browser window.
    var $layout=$("<div/>", {class: "layout"});

    // Create the centered box containing the application widgets.
    var $box=$("<div/>", {class: "box"});

    // Create widgets. The update button.
    var $update=$("<button/>", {id: "update",
                                class: "update",
                                text: "Update Arty-Factory List"});


    // The container to hold entries.
    var $container=$("<div/>", {id: "container", class: "container"});

    // The footer.
    var $footer=$("<div/>", {id: "footer", class: "footer"});

    // Stuff inside the footer.
    var $logo=$("<h1/>", {class: "footer", text: "Demo Arty-Factory"});
    var $info=$("<p/>", {class: "footer",
                        text: infoText});
    
    // Append to footer.
    $footer.append($logo);
    $footer.append($info);

    // Append to box.
    $box.append($update);
    $box.append($container);
    $box.append($footer);

    // Append box to layout.
    $layout.append($box);

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
