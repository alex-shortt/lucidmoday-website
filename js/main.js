function initHash() {
    $(window).hashchange(function () {
        var hash = location.hash;
        var cleanHash = (hash.replace(/^#/, '') || 'blank');

        switch (cleanHash.split("-")[0]) {
            case 'blank':
                animateContent("home");
                break;
            case 'releases':
                animateContent("releases");
                break;
            case 'artists':
                animateContent("artists");
                break;
            case 'about':
                animateContent("about");
                break;
            case 'contact':
                animateContent("contact");
                break;
            default:
                animateContent("home");
                break;
        }
    });

    $(window).hashchange();
}

function initPage() {
    $('#button-home').click(function () {
        window.location.hash = "";
    });
    $('#button-releases').click(function () {
        window.location.hash = "releases";
    });
    $('#button-artists').click(function () {
        window.location.hash = "artists";
    });
    $('#button-about').click(function () {
        window.location.hash = "about";
    });
    $('#button-contact').click(function () {
        window.location.hash = "contact";
    });
}

function animateContent(link) {
    var currHeight = $("#content").outerHeight();
    $("#content").css("height", currHeight + "px");
    $("#content").css("height", "0px");
    setTimeout(function () {
        setPage(link);
        autoHeightAnimate($("#content"), 1000);
    }, 1000);
}

function setPage(link) {
    $(".content-page").each(function (ind, obj) {
        $(obj).css("display", "none");
    });
    $("#" + link).css("display", "initial");
}

function autoHeightAnimate(element, time) {
    var curHeight = element.height(), // Get Default Height
        autoHeight = element.css('height', 'auto').height(); // Get Auto Height
    element.height(curHeight); // Reset to Default Height
    element.stop().animate({
        height: autoHeight
    }, time); // Animate to Auto Height
}
