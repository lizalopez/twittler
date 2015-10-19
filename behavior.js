$(document).ready(function(){

  var $header; 
  var title;
  var $body;
  var $refreshFeed;
  var $homestream;
  var refreshAction;
  var $sideBox;
  var $sideBar;

  $header = $('header');
  title = $('<h1  id=homestream>Twittler on the Roof</h1>' + '<h3>the best place to twittle your thumbs</h3>');
  $header.append(title);
  $header.addClass('header main');

  $body = $('body');
  $body.empty();
  $body.append($header);

  //create refresh feed box and homestream section to hold styles
  $refreshFeed = $('<button>View New Tweets</button>');
  $refreshFeed.addClass('refresh btn');
  $body.append($refreshFeed);
  $homestream = $('<section></section>');
  
  refreshAction = function (user) {
    $homestream.empty();
    var index; 

    if (!(user)) {
      index = streams.home.length-1;
    } else {
      index = streams.users[user].length-1;
    }

    while(index >= 0){
      var tweet; 
      var $tweet;
      var $usernameButton;
      var $tweetMsg;
      var $timeStamp;
      var timeSince;

      if (!(user)) {
        tweet = streams.home[index];
        } else {
        tweet = streams.users[user][index];      
      } 
      $tweet = $('<div class=tweetItem></div>');
      $tweet.addClass(tweet.user);

      //create username as button,and nodes for tweet message and timeStamp
      $usernameButton = $('<a></a>');
      $usernameButton.text('@' + tweet.user +':');
      $usernameButton.addClass('username btn-alt');
      $usernameButton.attr('id', tweet.user);
      $tweetMsg = $('<div></div>');
      $tweetMsg.text(tweet.message);
      $timeStamp = $('<div class=timeStamp></div>');

      timeSince = function(timeStamp) {
        var now = new Date();
        var secondsPast = (now.getTime() - timeStamp.getTime()) / 1000;
        if (secondsPast < 60) {
          return parseInt(secondsPast) +'s ago';
        } else if (secondsPast < 3600) {
          return parseInt(secondsPast/60) + 'm ago';
        } else if (secondsPast <= 86400) {
          return parseInt(secondsPast/3600) + 'h ago';
        } else if (secondsPast > 86400) {
          day = timeStamp.getDate();
          month = timeStamp.toDateString().match(/[a-zA-Z]*/)[0].replace(' ', '');
          year = timeStamp.getFullYear() == now.getFullYear() ? "" : timeStamp.getFullYear();
          return day + ' ' + month + year;
        }
      };   
      $timeStamp.text(timeSince(tweet['created_at']));

      //append tweet parts to tweet-item
      $tweet.append($usernameButton, $tweetMsg, $timeStamp);
      $homestream.append($tweet);
      index -=1;
    }
    var feedTitle = function(user) {
        if (user) {
          $homestream.prepend('<h2>'+tweet.user+'\'s feed </h2>');
        }
        else {
          $homestream.prepend('<h2> your feed </h2>');
        }
      };
    feedTitle(user);
    $body.append($homestream);
  };
  
  $sideBar = $('<div class=sideBar></div>');
  $sideBox= $('<button>View <br> New <br> Tweets</button>');
  $sideBox.addClass('refresh btn sideBox');
  $sideBar.append($sideBox);
  $refreshFeed.attr('id', 'target-element');
  $body.append($sideBar);

  //intalize data pull from data_generator when page loads
  refreshAction();

  $body.on('click', '.username', function() {
    var userClicked = $(this).attr('id');
    refreshAction(userClicked);
  });

/*
I consulted the following tutorials to build the function below
http://www.abeautifulsite.net/smoothly-scroll-to-an-element-without-a-jquery-plugin-2/
http://html-tuts.com/demo/jquery-floating-div/
these tutorials helpex explain the use of outerHeight and scrollTop
as useful methods to set bookmarks at which to initialize a particular
actions or set "back to top" markers
*/

//$(function() ...) shorthand for $(document).ready(function()..), so function
//will run when DOM is loaded
  $(function() {
    //outerheight() --> height of .sideBar includingb border and padding
    var  beginningMarker= $('.sideBar').outerHeight() + 30;
    //set beginningMarker so that the sidebar's area coverage begins just below
    //the "View New Tweets" horizontal bar, and bind floating-action to scroll movement
    //and to measure based off the window element
    $(window).scroll(function() {
      //scrollTop() indicated how many pixels are hidden from view above the scrollable 
      //area. Will be 0 if element is not scrollable
      //in this step. change teh position of the floating sidebar to move to the bottom
      //right margin as soon as the area hidden fromview passes the border of the sideBar
      //covrage, which is just below the refreshFeed bar
      if ($(window).scrollTop() > beginningMarker) {
        $('.sideBox').css({
          'position': 'fixed',
        });
        //set sidebar to be at it's normal position (just below refresh bar) when the header
        //is still in view, and change it's position to fixed otherwise so that it remains
        //at a fixed position at bottom even after user scrolls
      } else {
        $('.sideBox').css({
          'position': 'static'
        });
      }
    });
  });
  
  //bind event handlers to mouse action
  $body.on('click', '.refresh', function() {
    refreshAction();
    if ($(this).hasClass('sideBox')) {
      $('body').animate({
      //use offeset() to get relative position of header, and scroll up to that position
      //whithin a span of .6 seconds
      scrollTop: $header.offset().top
      }, 600);
    }
  })
  $body.on('click', '.main', function() {
    refreshAction();
  })
  $body.on('mouseover', '.btn',  function() {
    $(this).addClass('highlighted');
          });
  $body.on('mouseout', '.btn',  function() {
    $(this).removeClass('highlighted');
  });
  $body.on('mouseover', '.btn-alt',  function() {
    $(this).addClass('highlighted-alt');
          });
  $body.on('mouseout', '.btn-alt',  function() {
    $(this).removeClass('highlighted-alt');
  });
  $body.on('mouseover', 'header',  function() {
    $(this).addClass('highlighted-h');
          });
  $body.on('mouseout', 'header',  function() {
    $(this).removeClass('highlighted-h');
  });


}); 




   