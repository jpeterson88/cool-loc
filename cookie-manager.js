//Handles getting and setting of cookies

//Creates or replaces the cookie with some specifications 
function setCookie(name, value, expirationInDays) { //we give it an expiration becuase that's best practice
    var d = new Date(); //creates new object in users memory
    d.setTime(d.getTime() + (expirationInDays * 24 * 60 * 60 * 1000)); //calculating the time in the future when this cookie should expire 
    var expires = "expires=" + d.toUTCString(); //builds expiration portion of the string for browser reference
    document.cookie = name + "=" + value + ";" + expirationInDays + ";path=/"; //appends entire string to browser's cookie lookup 
}

//When called, this function checks to see if browser has stored cookie - can be any user-defined cookie
function getCookie(name) {
    var value = "; " + document.cookie; //appends a semicolon to string of cookies, not sure why
    var parts = value.split("; " + name + "="); //searches for the specified name - the cookie we want to check for
    if (parts.length == 2) { //if found cookie has both a key and a value
		return parts.pop().split(";").shift(); //get that value - if not, do nothing
	} 
}