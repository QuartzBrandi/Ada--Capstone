var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/visualmenu');

// Models:
var Restaurant = require('../app/models/restaurant');
var User = require('../app/models/user');

mongoose.connection.on('open', function(){
  mongoose.connection.db.dropDatabase(function (err) {
    console.log('Database dropped successfully.');

    var restaurants = []

    restaurants.push({
      name: "Helena's Hawaiian Food",
      address: {
        street_address: "1240 N School St",
        city: "Honolulu",
        state: "HI",
        zip_code: "96817",
        country: "United States"
      },
      menus: [
        {
          menu_name: "Menu",
          sections: [
            {
              section_name: "A la Carte Items​",
              subsections: [
                {
                  subsection_name: "",
                  items: [
                    {
                      name: "Poi",
                      images: [
                        {
                          origin: "Google",
                          suborigin: "",
                          url: "http://honolulumagazine-images.dashdigital.com/images/2012/Nov12/hawaiianPlate/hawaiianplate16.jpg?ver=1352494765",
                        },
                        {
                          origin: "Google",
                          suborigin: "",
                          url: "http://media-cdn.tripadvisor.com/media/photo-s/07/d6/41/d1/helena-s-hawaiian-food.jpg",
                        },
                        {
                          origin: "Google",
                          suborigin: "",
                          url: "http://www.eatthisny.com/wp-content/uploads/2013/04/IMG_7085.jpg",
                        }
                      ]
                    },
                    {
                      name: "Rice",
                      images: [
                        {
                          origin: "Google",
                          suborigin: "",
                          url: "https://c1.staticflickr.com/5/4078/4778840466_ca7ecf76a6.jpg",
                        }
                      ]
                    },
                    {
                      name: "Kalua Pig",
                      images: [
                        {
                          origin: "Google",
                          suborigin: "",
                          url: "https://c1.staticflickr.com/5/4140/4778205623_6dc2894c5e_b.jpg",
                        }
                      ]
                    },
                    {
                      name: "Kalua Pig & Cabbage",
                      images: [
                        {
                          origin: "Google",
                          suborigin: "",
                          url: "http://s3-media4.fl.yelpcdn.com/bphoto/dTU6_IQmYde3lXpFm1Ib0w/o.jpg",
                        }
                      ]
                    },
                    {
                      name: "Laulau",
                      images: [
                        {
                          origin: "Google",
                          suborigin: "",
                          url: "http://www.frolichawaii.com/wp-content/photos/best-of-nonstop-laulau/laulau-helenas_0.jpg",
                        }
                      ]
                    },
                    {
                      name: "Beef Stew",
                      images: [
                        {
                          origin: "Google",
                          suborigin: "",
                          url: "http://s3-media2.fl.yelpcdn.com/bphoto/7xLXqQl5sqnMCfwwNcefFQ/348s.jpg",
                        }
                      ]
                    },
                    {
                      name: "Tripe Stew",
                      images: [
                        {
                          origin: "Google",
                          suborigin: "",
                          url: "https://manfuel.files.wordpress.com/2015/02/man-fuel-food-blog-helenas-hawaiian-food-honolulu-hawaii-tripe-stew.jpg?w=1000",
                        }
                      ]
                    },
                    {
                      name: "Beef With Watercress",
                      images: [
                        {
                          origin: "Google",
                          suborigin: "",
                          url: "http://s3-media4.fl.yelpcdn.com/bphoto/yhaMl3oYMeDTci5oul9EJg/o.jpg",
                        }
                      ]
                    },
                    {
                      name: "Luau Squid",
                      images: [
                        {
                          origin: "Google",
                          suborigin: "",
                          url: "https://manfuel.files.wordpress.com/2015/02/man-fuel-food-blog-helenas-hawaiian-food-honolulu-hawaii-luau-squid.jpg?w=1000",
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    });

    restaurants.push({
      name: "GOODBYE",
      location: {
        address: "666 GOODBYE ST. WA, Seattle"
      }
    });

    restaurants.push({
      name: "YES",
      location: {
        address: "777 YO AVE. WA, SEATTLE"
      }
    });

    Restaurant.collection.insert(restaurants, function(err, res) {
      console.log("Error:", err);
      console.log("Result:", res);

      mongoose.connection.close();
    });
  });
});
