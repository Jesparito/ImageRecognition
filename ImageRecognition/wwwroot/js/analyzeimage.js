const url = "https://green-mushroom-0c0dfd003.azurestaticapps.net/api/ComputerVisionFunction";

function ComputerVisionFunction() {
    var imageUrl = document.getElementById('imageUrlInput').value;
    var isValidUrl = validateUrl(imageUrl);

    if (isValidUrl == false) {
        document.getElementById('imageDescription').innerHTML = 'Your URL is not valid, please try again!';
        return;
    }

    const jsonBodyItem = {
        imageUrl: imageUrl
    };

    fetch(url,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonBodyItem)
        })
        .then(response => {
            return response.json()
        })
        .then(data => {
            var imageDiv = document.getElementById('previewImageContainer');
            imageDiv.innerHTML = "";

            var imgTag = document.createElement('img');
            imgTag.src = imageUrl;
            imgTag.classList = 'img-fluid';

            imageDiv.appendChild(imgTag);

            var fullTextResponse = '<h4>Image analyze result:</h4>';

            fullTextResponse += '<p><b>Description</b>: ' + data.description.captions[0].text + '.<p/> ';

            if (data.adult.isAdultContent == false) {
                fullTextResponse += '<b>The image does not contain adult content.</b><br />';
            }
            else {
                fullTextResponse += 'The image does contain adult content.<br />';
            }

            if (data.adult.isRacyContent == false) {
                fullTextResponse += '<b>The image does not contain racy content.</b><br />';
            }
            else {
                fullTextResponse += 'The image does contain racy content.<br />';
            }

            fullTextResponse += '<h4>Image tags:</h4>';

            data.tags.forEach(function (arrayTag) {
                fullTextResponse += 'ComputerVision is ' + Math.round((arrayTag.confidence * 100 + Number.EPSILON) * 100) / 100 + '% sure of ' + arrayTag.name + '.<br />';
            });


            document.getElementById('imageDescription').innerHTML = fullTextResponse;

            console.log(data)
        })
        .catch(err => {
            document.getElementById('imageDescription').innerHTML = "Something went wrong.";
        })
}



    function validateUrl(str) {
        var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
        return !!pattern.test(str);
}


function createAlert() {
    alert("HEY JAVASCRIPT VIRKER!");
}
