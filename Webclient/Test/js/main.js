
$(document).ready(function () {
	//Variablen für Clickevents
	var lastid;
	var id;
	var doubleclick = 0;

	$('#canvasmap').kinetic();
	//wheelzoom(document.querySelectorAll('#map'));
	




	$.ajax({
		url : "../json/marker.json",
		dataType : 'json',
		success : function (data) {

			for (i = 0; i < data.markers.length; i++) {
				//Erstellt neue HTML Elemente
				$("#imgpanel").append("<div id='" + data.markers[i].id + "panel" + "' class='markerpanel'>	<img id='" + data.markers[i].id + "' src='" + data.markers[i].url + "' class='marker'></img> </div>");
				$("#imgpanel").append("<div id='" + data.markers[i].id + "text" + "' class='markertext closed'  >" + data.markers[i].text + "</div>");

				//Prüfung um welche Art Textfeld es sich handelt
				if (data.markers[i].kategorie == "allgemein") {
					$("#" + data.markers[i].id + "text").addClass("allgemein");
					$("#" + data.markers[i].id).attr("src", "../img/MarkerAllgemein.png");

				}
				if (data.markers[i].kategorie == "nahrung") {
					$("#" + data.markers[i].id + "text").addClass("nahrung");
					$("#" + data.markers[i].id).attr("src", "../img/MarkerNahrung.png");
				}
				if (data.markers[i].kategorie == "spawn") {
					$("#" + data.markers[i].id + "text").addClass("spawn");
					$("#" + data.markers[i].id).attr("src", "../img/MarkerSpawn.png");
				}

				// Rechnet die Position der spitzen Seite des Markers aus
				var rawwidth = parseInt($(".marker").css("width"));
				var rawheight = (parseInt($(".marker").css("height")));
				var rawleft = data.markers[i].left;
				var rawtop = data.markers[i].top;

				var left = rawleft - (rawwidth / 2);
				var top = rawtop - rawheight;

				// Bearbeitet die Positionen der Panel
				$("#" + data.markers[i].id + "panel").css({
					"left" : "" + left + "px",
					"top" : "" + top + "px"
				});

				// Setzt den Text des Markers
				var textrawwidth = parseInt($("#" + data.markers[i].id + "text").css("width"));
				var textrawheight = parseInt($("#" + data.markers[i].id + "text").css("height"));

				// Berechnung der Position der Textfelder
				var textleft = (left - (textrawwidth / 2)) + (rawwidth / 2);
				var texttop = top - textrawheight - 15;
				/*+ 10 damit es nicht zu eng ist*/
				$("#" + data.markers[i].id + "text").css({
					"left" : "" + textleft + "px",
					"top" : "" + texttop + "px"
				});

			}

		},
		error : function () {
			alert("Fehler beim Zugriff auf das Marker JSON aufgetreten");
		}
	});

	$(document).ajaxComplete(function () {

		//Wenn in die Map geklickt wird schließen wir alle Fenster
		$('#map').on("click", function (event) {
			if (event.target === this) {

				$(".markertext").removeClass("opened");
				$(".markertext").addClass("closed");
				$(".markertext").fadeOut(200);

			}

		});

		$('.marker').on("click", function () {
			id = $(this).attr('id');

			if (lastid == id && doubleclick % 2 == 1) {

				doubleclick = doubleclick + 1;
				$("#" + id + "text").fadeOut(200);
				return;
			}

			if ($("#" + id + "text").hasClass("closed") == true) {
				$("#" + lastid + "text").removeClass("opened");
				$("#" + lastid + "text").addClass("closed");
				$("#" + lastid + "text").fadeOut(200);

				$("#" + id + "text").addClass("opened");
				$("#" + id + "text").removeClass("closed");
				$("#" + id + "text").fadeIn(200);

				lastid = id;

				return;

			}

			if ($("#" + id + "text").hasClass("opened") == true) {
				$("#" + lastid + "text").removeClass("opened");
				$("#" + lastid + "text").addClass("closed");
				$("#" + lastid + "text").fadeOut(200);

				$("#" + id + "text").addClass("closed");
				$("#" + id + "text").removeClass("opened");
				$("#" + id + "text").fadeOut(200);

				lastid = id;

				return;

			}

		});

	});

});
