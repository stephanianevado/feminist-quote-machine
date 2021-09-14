const projectName = "feminist-quote-machine";
let quotesData;

var colors = [
    "#002c59",
    "#dce6ee",
    "#16a085",
    "#27ae60",
    "#2c3e50",
    "#f39c12",
    "#e74c3c",
    "#9b59b6",
    "#FB6964",
    "#342224",
    "#472E32",
    "#BDBB99",
    "#77B1A9",
    "#73A857",
    "#2c3a57"];


var currentQuote = "",
    currentAuthor = "";

function getQuotes() {
    return $.ajax({
        headers: {
            Accept: "application/json"
        },

        url:
            "https://gist.githubusercontent.com/stephanianevado/635c1f78b4ed730bccbea6bc783a2d72/raw/7abe07e999547d5bd65e1d1c182696f859e253d1/quotes.json",
        success: function (jsonQuotes) {
            if (typeof jsonQuotes === "string") {
                quotesData = JSON.parse(jsonQuotes);
                console.log("quotesData");
                console.log(quotesData);
            }
        }
    });

}

function getRandomQuote() {
    return quotesData.quotes[
        Math.floor(Math.random() * quotesData.quotes.length)];

}

function getQuote() {
    let randomQuote = getRandomQuote();

    currentQuote = randomQuote.quote;
    currentAuthor = randomQuote.author;

    $("#tweet-quote").attr(
        "href",
        "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" +
        encodeURIComponent('"' + currentQuote + '" ' + currentAuthor));


    $("#tumblr-quote").attr(
        "href",
        "https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=" +
        encodeURIComponent(currentAuthor) +
        "&content=" +
        encodeURIComponent(currentQuote) +
        "&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button");


    $(".quote-text").animate({opacity: 0}, 500, function () {
        $(this).animate({opacity: 1}, 500);
        $("#text").text(randomQuote.quote);
    });

    $(".quote-author").animate({opacity: 0}, 500, function () {
        $(this).animate({opacity: 1}, 500);
        $("#author").html(randomQuote.author);
    });

    var color = Math.floor(Math.random() * colors.length);
    $("html body").animate(
        {
            backgroundColor: colors[color],
            color: colors[color]
        },

        1000);

    $(".button").animate(
        {
            backgroundColor: colors[color]
        },

        1000);

}

$(document).ready(function () {
    getQuotes().then(() => {
        getQuote();
    });

    $("#new-quote").on("click", getQuote);
});