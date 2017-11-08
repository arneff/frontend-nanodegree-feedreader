/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('each feed ahs url & not empty', function() {
           allFeeds.forEach(function(feed) {
             expect(feed.url).toBeDefined();
             expect(feed.url.length).not.toBe(0);
           });
         });

        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('each feed has name & not empty', function() {
           allFeeds.forEach(function(feed) {
             expect(feed.name).toBeDefined();
             expect(feed.name.length).not.toBe(0);
           });
         });

    });
    /* Write a new test suite named "The menu" */
    describe('The Menu', function() {
        /* Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
         //define variables for dom elements
         let body = $('body');
         let menuIcon = $('.menu-icon-link');

        it('hidden by default', function(){
           expect(body.hasClass('menu-hidden')).toBe(true);

        });

         /* Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('toggle class "menu-hidden" on click', function() {
          //show menu when clicking on menuIcon
          menuIcon.trigger('click');
          expect(body.hasClass('menu-hidden')).toBe(false);
          //hide menu when clicking menuIcon
          menuIcon.trigger('click');
          expect(body.hasClass('menu-hidden')).toBe(true);

        });
    });
    /* Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        //load feed before test
        beforeEach(function(done) {
           loadFeed(0, function() {
             done();
           });
        });
        //ensure more than one entry for feed
        it('feed should have one entry', function(done) {
          expect($('.entry').length).not.toBe(0);
          done();
        });

    });
    /* Write a new test suite named "New Feed Selection" */
    describe('Need Feed Selection', function() {
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
         //declare variables for comparing feeds
         let orgFeed;
         let newFeed;

         //load the first feed before the comparision
         beforeEach(function(done) {
            loadFeed(0, function() {
              orgFeed = $('.feed');
              done();
            });
         });

         //load the second feed and compare to original
         it('check if new feed loaded', function(done) {
           loadFeed(2, function() {
             newFeed = $('.feed');
             expect(orgFeed).not.toBe(newFeed);
             done();
           });
         });

    });
}());
