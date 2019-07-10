let shortUrl = '';
function onInputFocus() {
    document.querySelector('.input-wrapper').classList.add('input-focused');
}

function onInputBlur() {
    document.querySelector('.input-wrapper').classList.remove('input-focused');
}

async function makeItShort() {
    const longUrl = document.getElementById('url-input').value;

    if (!longUrl) {
        showError("Please type a valid url");
    }

    $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/makeitshort',
        crossDomain: true,
        data: {
            longUrl
        },
        dataType: 'json',
        success: function (responseData, textStatus) {
            shortUrl = responseData.shortUrl;
            showShortUrl(shortUrl);
        },
        error: function (responseData, textStatus) {
            console.log("TCL: makeItShort -> responseData", responseData.responseJSON);
            showError(responseData.responseJSON);
        }
    });

}

function showShortUrl(url) {
    const shortUrlHolder = document.getElementById('short-url');
    shortUrlHolder.classList.remove('error');
    shortUrlHolder.href = url;
    shortUrlHolder.innerHTML = url;
}
function showError(msg) {
    const shortUrlHolder = document.getElementById('short-url');
    shortUrlHolder.classList.add('error');
    shortUrlHolder.href = "#";
    shortUrlHolder.innerHTML = msg;
    shortUrl = '';
}

function copyLink() {
    if (!shortUrl) {
        showError("No url to copy!");
    }
    var textArea = document.createElement("textarea");

    textArea.style.position = 'fixed';
    textArea.style.top = 0;
    textArea.style.left = 0;
    textArea.style.width = '2em';
    textArea.style.height = '2em';
    textArea.style.padding = 0;
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';
    textArea.style.background = 'transparent';
    textArea.value = shortUrl;
    document.body.appendChild(textArea);
    textArea.select();
    try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
    } catch (err) {
        console.log('Oops, unable to copy');
    }
    document.body.removeChild(textArea);
}