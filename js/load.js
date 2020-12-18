// text load
function loadTextFile(fName, Callback) {
    var httpObj = createXMLHttpRequest();
    httpObj.onreadystatechange = function () {
        if (httpObj.readyState === 4 && httpObj.status === 200) {
            Callback(httpObj.responseText);
        }
    }
    httpObj.open("GET", fName, true);
    httpObj.send(null);
}

function createXMLHttpRequest() {
    var XMLhttpObject = null;
    try {
        XMLhttpObject = new XMLHttpRequest();
    } catch (e) {
        try {
            XMLhttpObject = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                XMLhttpObject = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {
                return null;
            }
        }
    }
    return XMLhttpObject;
}