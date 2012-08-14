/*
    Copyright 2011 Michael Rylander

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.

    Description of Purpose: js for pair ladder
    Modified by Akshay Jawharkar, Nishitha Ningegowda
*/

function construct_pair_ladder() {
    var devNames = persistedDevNameList.getData();
    create_pair_ladder_rows(devNames)
    initialize_pair_ladder(persistedPairingDataList.getData(), devNames)
}

function create_pair_ladder_rows(devNames) {
    var leftNameTR = $("#pair_ladder_table .left_names_cloned_tr");
    $(devNames).each(function(index, devName) {
        var clonedLeftNameTR = $(leftNameTR).clone();
        $(clonedLeftNameTR).removeClass("left_names_cloned_tr");
        $(clonedLeftNameTR).attr("id", devName);
        $(clonedLeftNameTR).find(".left_name").find(".dev_name").text(devName); // show developer name on left most side.

        var totalNumberOfBoxes = devNames.length;
        var namedBoxesNeeded = 1;
        var countBoxesNeeded = totalNumberOfBoxes - (namedBoxesNeeded + index);
        var blankBoxesNeeded = totalNumberOfBoxes - (namedBoxesNeeded + countBoxesNeeded);

        create_disabled_boxes(clonedLeftNameTR, blankBoxesNeeded);
        create_count_boxes(clonedLeftNameTR, countBoxesNeeded);
        $(clonedLeftNameTR).insertAfter($(leftNameTR))
    })
    $(leftNameTR).remove();
}

function create_count_boxes(clonedLeftNameTR, numberOfCountBoxes) {
    var countTDToBeCloned = $(clonedLeftNameTR).find(".count_td_clone_td");
    var devNames = persistedDevNameList.getData();
	var devCount = devNames.length;
    for (var i = 0; i < numberOfCountBoxes; i++) {
	    var primaryDevID = $(clonedLeftNameTR).attr("id");
    	var secondaryDevID = devNames[devCount - numberOfCountBoxes + i];
    	var countID = primaryDevID + "-" + secondaryDevID;

        var countClonedTD = $(countTDToBeCloned).clone();
        $(countClonedTD).removeClass("count_td_clone_td");
        $(countClonedTD).insertBefore($(countTDToBeCloned))
        $(countClonedTD).attr('id', countID);
    }
    $(countTDToBeCloned).remove();
}

function create_disabled_boxes(clonedLeftNameTR, numberOfDisabledBoxes) {
    var disabledTDToBeCloned = $(clonedLeftNameTR).find(".invisibleSpacer");
    for (var i = 0; i < numberOfDisabledBoxes; i++) {
        var disabledCloneTD = $(disabledTDToBeCloned).clone();
        $(disabledCloneTD).insertBefore($(disabledTDToBeCloned))
    }
    $(disabledTDToBeCloned).remove();
}

function initialize_pair_ladder(pair_cookie_data, devNames) {
    var numberOfDevs = devNames.length

    var windowHeight = window.innerHeight;
    var windowWidth = window.innerWidth;
    var squareWidth = Math.min(windowHeight, windowWidth)

    // TODO - auto figure the height for boarders better.
    var pairBoxSquareWidth = (squareWidth / numberOfDevs) - (numberOfDevs * 2);
    $(".pageContainer").css("min-height", squareWidth);
    $(".pageContainer").css("min-width", squareWidth);
    $(".pageContainer").css("max-height", squareWidth);
    $(".pageContainer").css("max-width", squareWidth);
    $("#pair_ladder_table .pairBox").css("min-height", pairBoxSquareWidth);
    $("#pair_ladder_table .pairBox").css("min-width", pairBoxSquareWidth);
    $("#pair_ladder_table .pairBox").css("max-height", pairBoxSquareWidth);
    $("#pair_ladder_table .pairBox").css("max-width", pairBoxSquareWidth);

    var fontSize = numberOfDevs > 7 ? ((numberOfDevs > 10) ? ".5em" : "0.8em") : "1em";

    var countDivHeight = (pairBoxSquareWidth - (parseFloat(pairBoxSquareWidth / 100) * 30));
    $(".count").css("height", countDivHeight - 6);
    $(".count").css("font-size", (countDivHeight * .70));

    $(pair_cookie_data).each(function(index, value) {
        var pair_data = value.split("-");
        var firstDevName = pair_data[0];
        var secondDevName = pair_data[1];
        var pairedDays = pair_data[2];

        $("#" + firstDevName + "-" + secondDevName).find(".count").text(pairedDays);
    });
}
