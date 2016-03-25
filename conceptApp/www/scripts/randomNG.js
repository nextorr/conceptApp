var randomNG = {};

(function ($, ns, navigator) {
    ns.getRNG = function () {
        var maxVal = $('#max-value-input').val();

        // get a random number with the maximum value specified
        $.ajax({
            url: "https://api.random.org/json-rpc/1/invoke",
            type: "POST",
            cache: false,
            //CARE: the parameter name MUST match the parameter definition on wcf
            //TODO: we are using a harcoded edit session for testing
            data: JSON.stringify({
                jsonrpc: "2.0",
                method: "generateIntegers",
                params: {
                    apiKey: "2edc3ecf-4a40-4768-8106-4cac8397195c",
                    n: 1,
                    min: 0,
                    max: maxVal,
                    replacement: true
                },
                id: 42
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            processData: true,

            //note: complete responds with data.responseJSON
            // success responds with data directly
            success: function (data) {
                if (data.result) {
                    $('#error-msg').hide();
                    $('#random-org-response').show();


                    $('#title').text("random.org metadata");


                    $('#random-number').text(data.result.random.data);
                    $('#completion-time').text(data.result.random.completionTime);
                    $('#bits-used').text(data.result.bitsUsed);
                    $('#bits-left').text(data.result.bitsLeft);
                    $('#request-left').text(data.result.requestsLeft);
                    $('#advisory-delay').text(data.result.advisoryDelay);
                    //$('#summary img').attr('src', $(weather.item.description)[0].src);
                }
                else if (data.error) {
                    $('#random-org-response').hide();
                    $('#error-msg').show();
                    $('#error-msg').text("Error retrieving data." + data.error.message);
                }
            },
            error: function (response) {
                $('#random-org-response').hide();
                $('#error-msg').show();
                $('#error-msg').text("Error retrieving data. ");
            }
        });

        return false;
    }

})($, randomNG, navigator);
