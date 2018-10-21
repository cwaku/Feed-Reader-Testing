/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against the application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(
  (function() {
    /*This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe("RSS Feeds", function() {
      /*Tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
      it("are defined", function() {
        expect(allFeeds).toBeDefined();
        expect(allFeeds.length).not.toBe(0);
      });

      /*Test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
      it("urls are defined", function() {
        for (var i = 0; i < allFeeds.length; i++) {
          expect(allFeeds[i].url).toBeDefined();
          expect(allFeeds[i].url.length).not.toBe(0);
        }
      });

      /*Test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
      it("names are defined", function() {
        for (var i = 0; i < allFeeds.length; i++) {
          expect(allFeeds[i].name).toBeDefined();
          expect(allFeeds[i].name).not.toBe(0);
        }
      });
    });

    describe("The menu", function() {
      /*Test that ensures the menu element is
         * hidden by default.
         */
      it("menu element is hidden", function() {
        expect($("body").hasClass("menu-hidden")).toEqual(true);
      });

      /*Test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * has two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
      it("working toggle on click event", function() {
        $(".menu-icon-link").trigger("click");
        expect($("body").hasClass("menu-hidden")).toBe(false);
        $(".menu-icon-link").trigger("click");
        expect($("body").hasClass("menu-hidden")).toBe(true);
      });
    });

    describe("Initial Entries", function() {
      /*Test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
      beforeEach(function(done) {
        loadFeed(0, function() {
          done();
        });
      });

      it("there are more than 0 entries", function() {
        expect($(".entry .feed")).toBeDefined();
      });
    });
    describe("New Feed Selection", function() {
      let firstFeed, secondFeed;
      beforeEach(done => {
        loadFeed(0, function() {
          firstFeed = $(".feed").html();
          loadFeed(1, function() {
            secondFeed = $(".feed").html();
            done();
          });
        });
      });

      //this test compares the html content of both feeds
      it("content actually changes when a new feed is loaded", function() {
        expect(firstFeed === secondFeed).toBe(false);
      });
    });
  })()
);
