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
    Modified by Akshay  Jawharkar
*/

var pair_cookie_name = "pair_cookie";
var dev_names_cookie_names = "dev_names_cookie"
var toggle_cookie_name = "toggle_cookie"

function update_dev_names_cookie(data) {
    document.cookie = dev_names_cookie_names + "=" + data + "; expires=Wednesday, 01-Aug-2040 08:00:00 GMT";
}

function write_toggle_data_to_cookie(data) {
    document.cookie = toggle_cookie_name + "=" + data + "; expires=Wednesday, 01-Aug-2040 08:00:00 GMT";
}

function update_pair_cookie(data) {
    document.cookie = pair_cookie_name + "=" + data + "; expires=Wednesday, 01-Aug-2040 08:00:00 GMT";
}

function read_cookie(cookieName) {
    if (document.cookie) {
        var index = document.cookie.indexOf(cookieName);
        if (index != -1) {
            countbegin = (document.cookie.indexOf("=", index) + 1);
            countend = document.cookie.indexOf(";", index);
            if (countend == -1) {
                countend = document.cookie.length;
            }
            var data = document.cookie.substring(countbegin, countend);
            return data == null ? null : data.split(",");
        }
    }

}

function create_and_write_data_to_cookie(devNames, newValue) {

	var pairData = read_cookie(pair_cookie_name);

	var cnt = pairData.length;
	var newCookieData = "";

	for( var i = 0; i < cnt; i++ ){
		var pairObj = pairData[ i ];
		var pairNames = pairObj.slice(0, -2);
		if( pairNames == devNames ){
			var newPairVal = pairObj.slice(0, -1) + newValue;
			pairData[i] = newPairVal;
            }
//        }
//    } else {
//        for (var i = 1; i < devNameList.length; i++) {
//            for (var j = 0; j < i; j++) {
//                var top_name = $("." + devNameList[j]);
//                var count_index = $("#top_row_names td").index($(top_name))

		newCookieData = (newCookieData != "") ? (newCookieData + pairData[ i ] + ",") : (pairData[ i ] + ",");
//            }
//        }
    }

	//remove the last comma and update the cookie data
	newCookieData = newCookieData.slice(0, -1);

	update_pair_cookie( newCookieData );

}

function reset_data() {
    $(".count").each(function(index, value) {
        $(value).text("0");
        $(value).parent().css("background-color", "#FF9900");
        $(value).css("color", "black");
        $(value).css("text-shadow", "5px 1px 5px white");
    });

    create_and_write_data_to_cookie();
    clear_existing_married_couples()
    clear_existing_divorced_people()

}

function create_cookies_initial_data_and_write_to_cookies(devNameList) {
    var pairCookieData = '';

    for (var i = 0; i < devNameList.length; i++) {
        for (var j = i + 1; j < devNameList.length; j++) {
            pairCookieData += devNameList[i] + "-" + devNameList[j] + "-0,"
        }
    }

    var devNamesCookieData = ''
    for (var k = 0; k < devNameList.length; k++) {
        devNamesCookieData += devNameList[k] + ",";
    }

    update_pair_cookie(pairCookieData.substring(0, pairCookieData.length - 1))

    update_dev_names_cookie(devNamesCookieData.substring(0, devNamesCookieData.length - 1))
}
