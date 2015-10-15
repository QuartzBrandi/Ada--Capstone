"use strict";

var request = require('request');
var env = require('node-env-file');
env('config/.env');
  // var google = require('https://www.google.com/jsapi');

function replaceSpacesWithPlusSign(theString) {
  var anArray = theString.split(" ");
  var newString = anArray.join("+");
  return newString;
};




// function googleImage(restaurant, menuitem) {
//   console.log('hi')
//
//   google.load('search', '1');
//
//   var imageSearch;
//
//       function addPaginationLinks() {
//
//         // To paginate search results, use the cursor function.
//         var cursor = imageSearch.cursor;
//         var curPage = cursor.currentPageIndex; // check what page the app is on
//         var pagesDiv = document.createElement('div');
//         for (var i = 0; i < cursor.pages.length; i++) {
//           var page = cursor.pages[i];
//           if (curPage == i) {
//
//           // If we are on the current page, then don't make a link.
//             var label = document.createTextNode(' ' + page.label + ' ');
//             pagesDiv.appendChild(label);
//           } else {
//
//             // Create links to other pages using gotoPage() on the searcher.
//             var link = document.createElement('a');
//             link.href="/image-search/v1/javascript:imageSearch.gotoPage("+i+');';
//             link.innerHTML = page.label;
//             link.style.marginRight = '2px';
//             pagesDiv.appendChild(link);
//           }
//         }
//
//         var contentDiv = document.getElementById('content');
//         contentDiv.appendChild(pagesDiv);
//       }
//
//       function searchComplete() {
//
//         // Check that we got results
//         if (imageSearch.results && imageSearch.results.length > 0) {
//
//           // Grab our content div, clear it.
//           var contentDiv = document.getElementById('content');
//           contentDiv.innerHTML = '';
//
//           // Loop through our results, printing them to the page.
//           var results = imageSearch.results;
//           console.log(results);
//           for (var i = 0; i < results.length; i++) {
//             // For each result write it's title and image to the screen
//             var result = results[i];
//             console.log(result)
//             var imgContainer = document.createElement('div');
//             var title = document.createElement('div');
//
//             // We use titleNoFormatting so that no HTML tags are left in the
//             // title
//             title.innerHTML = result.titleNoFormatting;
//             var newImg = document.createElement('img');
//
//             // There is also a result.url property which has the escaped version
//             // newImg.src="/image-search/v1/result.tbUrl;"
//             newImg.src = result.url;
//             imgContainer.appendChild(title);
//             imgContainer.appendChild(newImg);
//
//             // Put our title + image in the content
//             contentDiv.appendChild(imgContainer);
//           }
//
//           // Now add links to additional pages of search results.
//           addPaginationLinks(imageSearch);
//         }
//       }
//
//       function OnLoad() {
//
//         // Create an Image Search instance.
//         imageSearch = new google.search.ImageSearch();
//
//         // Set searchComplete as the callback function when a search is
//         // complete.  The imageSearch object will have results in it.
//         imageSearch.setSearchCompleteCallback(this, searchComplete, null);
//
//         // Find me results.
//         var str = restaurant + " " + menuitem;
//         imageSearch.execute(str);
//
//         // Include the required Google branding.
//         google.search.Search.getBranding('branding');
//       }
//
//   google.setOnLoadCallback(OnLoad);
// };


exports.apiController = {
  // GET /api/search?name=xxx&location=xxx
  restaurantSearch: function(req, res) {
    var rawName = req.query.name;
    var name = replaceSpacesWithPlusSign(rawName);
    var location = req.query.location;
    var url =
      "https://maps.googleapis.com/maps/api/place/textsearch/json?query=" +
      name + "+" + location + "&types=food&key=" +
      process.env.GOOGLE_BROWSER_API_KEY;

    request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var bodyParsed = JSON.parse(body);
        var resultsUnformatted = bodyParsed.results;
        var results = [];

        for (var i = 0; i < resultsUnformatted.length; i++) {
          var result = {};
          result["name"] = resultsUnformatted[i]["name"];
          result["address"] = resultsUnformatted[i]["formatted_address"];
          results.push(result);
        }

        return res.status(200).json(results);
      }
    });
  },

  // GET /api/menu?restaurant=xxx

  // GET /api/images?restaurant=xxx&menuitem=xxx
  imageSearch: function(req, res) {
    console.log('got here')
    console.log(req)
    googleImage(req.query.restaurant, req.query.menuitem);
  }
};
