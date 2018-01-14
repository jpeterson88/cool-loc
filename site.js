$(document).ready(function () {
    'use strict';

    const userLanguage = 'user-language'

    var setupLocalization = function () {
        var localization = new CoolLocalization();
        localization.buildFilePath('./localized-text/', '/' + getPageName(), getCookie(userLanguage)); //
        localization.getPageText();
    }

    function getPageName() {
        var pageName = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);
        return pageName.split('.')[0];
    }

    setupLocalization();

    var cachedLanguage = getCookie(userLanguage);

    $('#dropdown').change(function () {        
        var selectedValue = $('#dropdown').find(":selected").attr("data-value");;
        setCookie(userLanguage, selectedValue, 14);
        location.reload();
    });

    function setDropdownSelection() {
        if (cachedLanguage) {
            $("[data-value=" + cachedLanguage + "]").css('font-weight', 'bold');
            $('#dropdown option[value=' + cachedLanguage +']').attr('selected','selected');
            
            $("select").val(cachedLanguage);
        }
    }

    setDropdownSelection();

    

});