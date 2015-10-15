# Product Plan

## Problem Statement
When you go to a restaurant and would rather see pictures of the dishes vs read descriptions of them.

## Market Research
[Foodspotting](http://www.foodspotting.com/)
  - App lets you take pictures of dishes you enjoyed.
  - Not dedicated to bringing pictures for all menu items.
  - Focuses on positive food experiences; not focusing on bad dishes.
  - Can search for restaurants and see pictures of user submitted photos for dishes, sorted by popularity and most recent photos.
  - This is both a mobile-friendly web app and a mobile app for iPhone, Android, Windows Phone, & Blackberry.
My app will be different because it will show all menu items and focus on "you're already at the restaurant, what do you want?" vs "what food looks good in the area?"

[Yelp](http://www.yelp.com/)
  - Lets you rate restaurants; sometimes has a menu with links to user-submitted photos of the dishes.
  - Focused more on rating establishments vs the menu items.
  - Not all dishes have photos.
My app will be much more focused: only focusing on bringing pictures of menu items. And the app will try and bring in photos of every dish, whether it be by user submitted photos, other sites, or from search engines.

## User Personas
- Me!
- People sitting in a restaurant and looking at a menu full of words who desire to see pictures instead. (A picture is worth a thousand words afterall.)
  - Simple design.
  - Easy to use.
- Dyslexic peeps with screen readers?
  - Accessible and screen-reader friendly.

# More Planning

## Tech
- JavaScript
- MEAN Stack
  - MongoDB, Express, Angular, Node
- Bootstrap (possibly Sass if I'm feeling ambitious, i.e. have time--but probably not)

## TO-DO

**Package: setup**
  - setup project repo
  - setup project directories & files (according to tutorials & in-class examples)
  - setup database:
    - schema
    - seed(?)
  - setup routes
  - setup models & controllers

**Package: API for searching for restaurants**
  - use Google or Yelp search to find (restaurant) locations
  - what to store in restaurant document?
    - name
    - menu
      - menu items

**Package: API for searching for menus**
  - use SinglePlatform or other menu app to find menus

**Package: API for searching for photos for menu items**
  - use Google or Foodspotting to find pictures of menu items
  - preserving the source (for displaying on webpage)
  - space/area commented out to later implement user-submitted photos

**Package: something to look at on the user end (for test purposes mostly)**
  - html
    - search box
    - display images from search results

**Package: unfrilly webpage design**
  - do some angular OR ember tutorials
  - decide on angular or ember
  - html (setup a one-page index)
    - header with name + buttons
    - search box
      - automatically searches in your city/state (can change this)
    - results of restaurant search with select a restaurant button (goes straight to restaurant if that's the only option?)
    - restaurant menu with pictures
  - add basic bootstrap

**Package: scrolling through menu items**
  - figure out how to scroll through images (with touch controls but also with a computer mouse?)
  - scroll up/down vs left/right (change menu item vs same menu item different picture)
  - photos have a source associated with them? (like as an icon)
    - if from a Google search, ability to click on a link to go to the original webpage?

**Package: look pretty!**
  - customize with css/bootstrap/javascript
    - search box (centered then moves up after finding a restaurant)
  - make it my own app

**Package: user accounts**
  - user documents in db
    - name/username (for user submitted photos)
    - photos they've submitted
  - oauth login
  - user options page (to change their settings)

**Package: user-submitted photos**
  - ability to upload pictures from mobile phone (and website)
  - association between restaurant document & user by photo
  - create own API for user submitted photos? --> to be used with other API calls for photos

**Package: restaurant accounts**
  - ability to add/edit/delete menu

**Don't Forget: TESTS**
  - Mocha
  - Other?

**BONUS:**
  - Let's you add menu items if the restaurant doesn't have a menu.
  - Dietary restriction icons/warnings (if a dish is vegetarian or vegan or gluten free)
  - Rating of dishes (OR simple way of favoriting dishes--focusse on if a dish is really popular)
  - Change single page app to multipage app?

## Name Brainstorm
- VisualMenu
- PhotoMenu
- PictoMenu
- PictureMenu
- MenuWorth1000Words
- TheVisualMenu
- Picto-Menu
- The-Visual-Menu
- EatSee
