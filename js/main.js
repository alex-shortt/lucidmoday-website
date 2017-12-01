var cid = "a3e059563d7fd3372b49b37f00a00bcf";
var _shutter;
var _lucidinfo;

function initHash() {
    $(window).hashchange(function () {
        var hash = location.hash;
        var cleanHash = (hash.replace(/^#/, '') || 'blank');

        switch (cleanHash.split("-")[0]) {
        case 'blank':
            _shutter.openContent("home");
            break;
        case 'releases':
            _shutter.openContent("releases");
            break;
        case 'artists':
            _shutter.openContent("artists");
            break;
        case 'about':
            _shutter.openContent("about");
            break;
        case 'contact':
            _shutter.openContent("contact");
            break;
        default:
            _shutter.openContent("home");
            break;
        }
    });

    $(window).hashchange();
}

function initPage() {
    _shutter = $("#content").shutter({});
    _lucidinfo = $("#content").lucidinfo({});
    _lucidinfo.updateInfo();
    _lucidinfo.addTeam();

    $('#button-home').click(function () {
        _shutter.closeContent("");
    });
    $('#button-releases').click(function () {
        _shutter.closeContent("releases");
    });
    $('#button-artists').click(function () {
        _shutter.closeContent("artists");
    });
    $('#button-about').click(function () {
        _shutter.closeContent("about");
    });
    $('#button-contact').click(function () {
        _shutter.closeContent("contact");
    });
}

jQuery.fn.shutter = function (opts) {
    opts = jQuery.extend({}, jQuery.fn.shutter.defs, opts);

    jQuery.fn.shutter.defs = {};

    var instance = this;
    var element = jQuery(this);

    this.initialize = function () {
        return this;
    }

    this.closeContent = function (newHash) {
        if (window.location.hash == newHash) return;
        var currHeight = $(element).outerHeight();
        $(element).css("height", currHeight + "px");
        $(element).css("height", "0px");
        setTimeout(function () {
            window.location.hash = newHash;
        }, 500);
    }

    this.setButtonActive = function (link) {
        $(".navbar-button").each(function (ind, obj) {
            $(obj).removeClass("active");
        });
        $("#button-" + link).addClass("active");
    }

    this.openContent = function (link) {
        this.setContent(link);
        this.setButtonActive(link);
        this.autoAnimateHeight(500);
    }

    this.setContent = function (link) {
        $(".content-page").each(function (ind, obj) {
            $(obj).css("display", "none");
        });
        $("#" + link).css("display", "block");
    }

    this.autoAnimateHeight = function (time) {
        var curHeight = element.height(), // Get Default Height
            autoHeight = element.css('height', 'auto').height(); // Get Auto Height
        element.height(curHeight); // Reset to Default Height
        element.stop().animate({
            height: autoHeight + 8
        }, time); // Animate to Auto Height
    }

    return this.initialize();
}

jQuery.fn.lucidinfo = function (opts) {
    opts = jQuery.extend({}, jQuery.fn.lucidinfo.defs, opts);
    this.initialize = function () {
        return this;
    }
    jQuery.fn.lucidinfo.defs = {};

    var instance = this;
    var element = jQuery(this);
    var releases = [];
    var lucidmondayID = "203439010";
    var artists = {
        0: {
            "name": "Julius Woods",
            "image_url": "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
            "subtitle": "CEO",
            "twitter": "https://google.com",
            "soundcloud": "https://reddit.com"
        },
        1: {
            "name": "Alex Shortt",
            "image_url": "https://i1.sndcdn.com/avatars-000301550219-7pwnww-t500x500.jpg",
            "subtitle": "CTO",
            socials: [
                {
                    "twitter": "https://google.com"
                },
                {
                    "soundcloud": "https://reddit.com"
                }
            ]
        },
        2: {
            "name": "Benjamin Ha",
            "image_url": "https://i1.sndcdn.com/avatars-000110611200-mpwk3i-t500x500.jpg",
            "subtitle": "IDK",
            "twitter": "https://google.com",
            "soundcloud": "https://reddit.com"
        },
        3: {
            "name": "Callahan",
            "image_url": "https://i1.sndcdn.com/avatars-000110611200-mpwk3i-t500x500.jpg",
            "subtitle": "ASDF",
            "twitter": "https://google.com",
            "soundcloud": "https://reddit.com"
        }
    }

    this.updateInfo = function (callback) {
        var url = "https://api.soundcloud.com/users/" + lucidmondayID + "/tracks?limit=10000&client_id=" + cid;
        $.get(url, function (data) {
            data.forEach(function (obj, ind) {
                var good = true;
                releases.forEach(function (obj2, ind2) {
                    if (obj.id == obj2.id) good = false;
                });
                if (good) releases.push(obj);
                //_lucidinfo.addTile(obj); _shutter.autoAnimateHeight(1);
            });
            _lucidinfo.createReleasesGrid();
        });

        //loop through artistsUsernames and fill array with info on image, display name, bio, etc
    }

    this.addTile = function (obj) {
        var parent = $("#releases-wrap");
        var titleText = obj.title;
        var artist = obj.title.split(" - ")[0];
        var title = obj.title.split(" - ")[1];

        parent.append('\
            <div class="releases-tile">\
                    <img src="' + obj.artwork_url.replace("large", "t500x500") + '" />\
                    <div class="releases-text">\
                        <h2 style="' + (artist == null ? "display:none" : '') + '">' + artist + '</h2>\
                        <h3 style="' + (title == null ? "display:none" : '') + '">' + title + '</h3>\
                        <p id="track-' + obj.id + '" class="releases-animate-text">' + obj.description + '</p>\
                    </div>\
                    <div class="releases-dots">\
                        <span></span>\
                        <span></span>\
                        <span></span>\
                    </div>\
                </div>\
            ');

    }

    this.createReleasesGrid = function () {
        var delay = 0;
        releases.forEach(function (obj, num) {
            setTimeout(function () {
                _lucidinfo.addTile(obj);
                _shutter.autoAnimateHeight(0)
            }, delay);
            if (delay < 150 * 9) delay += 150;
        });
    }

    this.addTeam = function () {
        var container = $("#artists-container");
        for (obj in artists) {
            container.append('\
            <div class="artists-grid-column">\
                <div class="artists-grid-user">\
                    <div class="artists-grid-user__avatar"><img src="' + artists[obj].image_url + '" /></div>\
                    <div class="artists-grid-user__name">' + artists[obj].name + '</div>\
                    <div class="artists-grid-user__title">' + artists[obj].subtitle + '</div>\
                    <ul class="artists-grid-social">\
                        <li class="artists-grid-social__item">\
                            <a href="">\
                                        \
                            </a>\
                        </li>\
                        <li class="artists-grid-social__item">\
                            <a href="">\
                                        \
                            </a>\
                        </li>\
                        <li class="artists-grid-social__item">\
                            <a href="">\
                                        \
                            </a>\
                        </li>\
                    </ul>\
                </div>\
            </div>\
            ');
        }
        _shutter.autoAnimateHeight(1);
    }

    return this.initialize();
}