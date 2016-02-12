/**
 * Created by Robert on 06.01.2016.
 */
var popup_zustand = false;
var requestgroup = null;
var refreshmember = false;

function openOverlaypanel(source, groupname) {

    closeHeader();

    if (popup_zustand == false) {

        if (source == "register") {
            openRegister();
            overlaypanel_header("Registrieren");
        }

        if (source == "tacticname") {

            openTacticname();
            overlaypanel_header("Taktik Speichern");
        }

        if (source == "loadtactics") {
            getMaps(user.getTactics());
            console.log(user.getTactics());
            overlaypanel_header("Taktik Laden");
        }

        if (source == "groupcreate") {
            creategroup();
            overlaypanel_header("Gruppe Erstellen");
        }

        if (source == "grouplogin") {
            logingroup();
            overlaypanel_header("Gruppe Beitreten");
        }

        if (source == "grouptactic") {
            refreshmember = true;
            socket.emit('getGroups',  JSON.stringify({'user': localStorage.getItem("benutzername")}));
            requestgroup = groupname;
            socket.emit("getTacs",  JSON.stringify({'group': groupname}));


        }


        $(".opacitybox").css("opacity", "0.4");
        $(".opacitybox").fadeIn("5000");
        $(".overlaypanel").fadeIn("1000");


        popup_zustand = true;
        return false;
    }
}

function closeOverlaypanel() {
    requerstsource = null;
    if (popup_zustand == true) {
        refreshmember = null;

        $(".overlaypanel").fadeOut("2000");

        $(".opacitybox").fadeOut("2000", function () {
            $("#overlaypanel_insidebox").empty();
            $("#overlaypanel_header").contents(':not(#overlaypanel_close)').remove();
        });

        popup_zustand = false;

    }
}

function overlaypanel_header(headertext) {
    $("#overlaypanel_header").append("<h3 id='overlaypanel_headertext'>" + headertext + "</h3>");
}

function ActualSaveTactic(option) {
    /* var canvas = document.getElementById("imgpanel");
     var img    = canvas.toDataURL("./testimages");*/
    var generatedid = (new Date()).getTime();

    if (option == "group") {
        sendLocaltactic(generatedid, localStorage.getItem("benutzername"), $("#mapselector").find(".active").attr("id"), clickDrag, clickX, clickY, $("#grouptacticname_tacticnameinput").val(), $("#grouptacticname_groups option:selected").text());
    }
    if (option == "new") {
        sendLocaltactic(generatedid, localStorage.getItem("benutzername"), $("#mapselector").find(".active").attr("id"), clickDrag, clickX, clickY, $("#tacticname_tacticnameinput").val(), null);
    } else if (option == "loaded") {
        socket.emit('changeTac',  JSON.stringify({'id': tactic.getId(), 'drag': tactic.getDrag().concat(clickDrag), 'x': tactic.getX().concat(clickX), 'y': tactic.getY().concat(clickY)}));
    }

}

function setTooltipToElement(element, text) {


    $(element).attr('title', text).tooltip({
        tooltipClass: "tooltip",
        position: {
            my: "center bottom-20",
            at: "center top",
            using: function (position, feedback) {
                $(this).css(position);
                $("<div>")
                    .addClass("arrow")
                    .appendTo(this);
            }
        }
    });

}

function setChangeName(target, dest, id, changevalueelement, option) {

    $(target).hide();
    $(dest).append("<textarea class='changename_textfield'></textarea>");

    $(".changename_textfield").on("focusout", function () {
        var newvalue = $('.changename_textfield').val();
        if (newvalue != "") {
            socket.emit("changeTacName",  JSON.stringify({ 'id': id, 'name': newvalue }));
            user.changeTacticName(id, newvalue, option);

            $(".changename_textfield").remove();
            $(target).show();
            $(changevalueelement).html(newvalue);
        }


    });
}

function isInArray(array, value) {
    if (array.length != 0) {


        var tempindexarray = new Array();
        for (var element in array) {
            if (array[element] == value) {
                tempindexarray.push(element);
            }
        }

        return tempindexarray;
    } else {
        return new Array();
    }
}
