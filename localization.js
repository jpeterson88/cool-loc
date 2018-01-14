//The core functionality for retrieving localized text

function CoolLocalization() {
    this.filePath = ""; //declaring variable to be used globally within this object
    keyDelimeter = "_";
    aElement = "a";
    srcAttr = "src";
    hrefAttr = "href";

    this.buildFilePath = function (directory, page, language) { //builds path of localized text file
        if (!directory || !page || !language) { //makes sure directory and page are not undefined
            console.log('Function buildFilePath(directory, page, language) failed. You must provide a directory and page.'); //error message for troubleshooting
        } else {
            this.filePath = directory.concat(language.toLowerCase()).concat(page).concat('.json'); //make it lowercase and append .json to complete file path
        }
    }

    this.getPageText = function () { //retrieve the json file from the server using ajax
        $.getJSON({
            url: this.filePath,
            dataType: "json",
            success: function (response, textStatus, request) {
                //only set page text if response is json
                if (request.getResponseHeader('Content-Type').indexOf('application/json') >= 0) {
                    setPageText(response);
                }
            },
        })
    }

    //Updates DOM's specified IDs with text - getting IDs from html then populating with json text value
    function setPageText(localeValues) {
        for (var key in localeValues) {
            if (localeValues.hasOwnProperty(key)) {
                var splitKey = key.split(keyDelimeter);
                var replacementValue = localeValues[key];

                //Check if there is a delimeter prepended to the key
                if (splitKey.length == 2) {
                    var targetElement = splitKey[0];
                    var primaryKey = splitKey[1];
                    var attribute = (targetElement === aElement) ? hrefAttr : srcAttr;

                    $('#'.concat(primaryKey)).attr(attribute, replacementValue);
                } else {
                    $('#'.concat(key)).text(replacementValue);
                }
            }
        }
    }
}