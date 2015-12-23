/* SPEC RUNNER */
$(function() {

    describe('RSS Feeds', function() {
         /* This test ensures that the allFeeds variable has been defined and that
         it is not empty. */
        it('is defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

         /* This test ensures that each feed in the allFeeds object has a URL 
         defined and the URL is not empty. */
         it('have URLs and they are defined', function() {
            for(var i = 0; i < allFeeds.length; i++){
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url).toBeTruthy();
            }
         })

         /*This test ensure that each feed in the allFeeds object has a name defined
         and that the name of the feed is not empty. */
         it('have names and they are defined', function(){
           for(var i = 0; i < allFeeds.length; i++){
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name).toBeTruthy();
           } 
         })
    });


    describe('The Menu', function() {

         /*This test ensures that the menu element is hidden by default. */
         it('The menu element is hidden by default', function() {
            expect($('body')).toHaveClass("menu-hidden");
         })

          /* This test ensures the menu changes visibility when the menu icon is clicked.*/
          it('changes visibility when the menu icon is clicked', function() {
            $(".icon-list").click();
            expect($('body')).not.toHaveClass("menu-hidden");
            $(".icon-list").click();
            expect($('body')).toHaveClass("menu-hidden");
            
          })
    });

    describe("Initial Entries", function() { 
         /* This test ensures that when the loadFeed function is called and completes its work, there
         is at least a single .entry element within the .feed container. */
         beforeEach(function(done) {
            loadFeed(1, function() { 
              done();
            });
         });

         it('should have at least one entry in the feed', function(done) {
            //Look at html for at least one child in the div with class "feed"
            expect($('.entry').length).toBeGreaterThan(0);
            done();
         });
    });

    describe("New Feed Selection", function() {
        /* This test ensures that wehn a new feed is loaded by the loadFeed function,
        the content actually changes. */
        //Initialize these variables so they are available in the outer scope
        var entriesBefore;
        var entriesAfter;

        //Empty the feed and then load two different feeds into different vairables.
        beforeEach(function(done) {
          $('.feed').empty();
          loadFeed(0, function() {
            done();
          });
        });

        it('Content in feed actually changes', function(done) {
            entriesBefore = $('.feed').text();
            console.log('entriesBefore: ' + entriesBefore);

            loadFeed(1, function() {
              entriesAfter = $('.feed').text();
              console.log('entriesAfter: ' + entriesAfter);
              expect(entriesBefore).not.toEqual(entriesAfter);
              done();
            });

        });
    });
}());
