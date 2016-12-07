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


         it('url is defined and not empty', function() {
             allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe("");
             });
         });

         it('name is defined and not empty', function() {
             allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe("");
             });
         });         
    });

    describe('The menu', function() {
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */

        //Just check to see if the body has the menu-hidden class
        it('is hidden by default', function(){
            expect($("body").hasClass("menu-hidden")).toBe(true);
        });

        // Run click on menu icon, check to make sure menu-hidden is removed, run click again and check to make sure menu-hidden has been added.
        it('displays when clicked and hides when clicked again', function(){
            $('.menu-icon-link').click();
            expect($("body").hasClass("menu-hidden")).toBe(false);
            $('.menu-icon-link').click();
            expect($("body").hasClass("menu-hidden")).toBe(true);
        });          
    });

    describe('Initial entries', function() {
        beforeEach(function(done) {
            loadFeed(0,function(){
                done();
            });
        });

        // loadFeed is an assync function so need to implement beforeEach and the done function first.
        // Then check to see if there's at least one entry-link 
        it('have at least a single entry in the feed', function(){
            expect($('.feed .entry').length).not.toBe(0);
        });
    });
    // Load the feed the first time and save the url of the first item. Load the feed a second time
    // and compare the url to the first one to check whether the new feed has loaded.
    describe('New Feed Selection', function() {
        var initurl = "";
        var feednum = 0;

        beforeEach(function(done) {
            loadFeed(feednum++,function(){
                done();
            });
        });

        it('initial feed is set', function(){
            initurl = $('.entry-link').attr("href");
            expect(initurl).not.toBe("");
        });


        it('new feed is loaded', function(){
            var newurl = $('.entry-link').attr("href");
            expect(newurl).not.toBe("");
            expect(newurl != initurl).toBe(true);
        });
    });

}());
