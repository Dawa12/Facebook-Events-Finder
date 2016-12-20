<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Liked Page</title>
    <link rel="stylesheet" href="/index.css">
    <script src="https://code.jquery.com/jquery-3.1.1.min.js" type="text/javascript"></script>
  </head>
  <body>
    <div id="fb-root"></div>
    <script>

      // statusChangeCallback, checkLoginState, window.fbAsyncInit, testAPI functions referenced from FB docs to initialize Facebook Javascript SDK and setup app: https://developers.facebook.com/docs/facebook-login/web

      function statusChangeCallback(response) {
        // response object reflects user's logged in status and state as well as access token / user ID
        console.log('response: ', response);

        if (response.status === 'connected') {
          // Logged into your app and Facebook.
          testAPI();
        } else if (response.status === 'not_authorized') {
          // The person is logged into Facebook, but not your app.
          document.getElementById('status').innerHTML = 'Please log ' +
            'into this app.';
        } else {
          // The person is not logged into Facebook, so we're not sure if
          // they are logged into this app or not.
          document.getElementById('status').innerHTML = 'Please log ' +
            'into Facebook.';

          // upon logout of Facebook app, remove all events from page
          document.getElementById('flex-parent').innerHTML = ''
        }
      }

      // checkLoginState will check login status and send data as reponse object to statusChangeCallback
      function checkLoginState() {
        FB.getLoginStatus(function(response) {
          statusChangeCallback(response);
        });
      }

      // Initialize Facebook JS SDK
      window.fbAsyncInit = function() {
        FB.init({
          appId      : <%= appId %>,
          cookie     : true,  // enable cookies to allow the server to access
                              // the session
          xfbml      : true,  // parse social plugins on this page
          version    : 'v2.8' // use graph api version 2.8
        });

        FB.getLoginStatus(function(response) {
          statusChangeCallback(response);
        });
      };

      // Load the SDK asynchronously
      (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.8&appId=1843900205894102";
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));

      // Here we run a very simple test of the Graph API after login is
      // successful.  See statusChangeCallback() for when this call is made.
      function testAPI() {
        console.log('Welcome!  Fetching your information.... ');
        FB.api('/me', function(response) {
          console.log('Successful login for: ' + response.name);
          document.getElementById('status').innerHTML =
            'Thanks for logging in, ' + response.name + '!';
        });

        checkLoginState2()
      }

      function checkLoginState2() {
      // do FB get calls inside of getLoginStatus method
      // source: http://stackoverflow.com/questions/26709869/an-active-access-token-must-be-used-to-query-information-about-the-current-user
      // once user is logged in, execute this large block

      FB.getLoginStatus(function(response) {
          if (response.status === 'connected') {
            // $('.fb-login-button').hide()
            $('#fbLogout').show()

            FB.api('/me', 'GET', {fields: 'likes.limit(20){about,category,category_list,description,events.limit(2){start_time,end_time,name}},first_name,last_name,name,id,picture.width(150).height(150)'}, function(response) {
console.log('response', response);
              let likes_array = response.likes.data
            //
            let flex_parent = document.getElementById("flex-parent")
            // flex_parent.className = "flex-parent"
            // document.body.appendChild(flex_parent)

            let heading = document.createElement('h2')
            heading.textContent = "Showing Upcoming Events"
            document.body.appendChild(heading)

            loop_events(likes_array)


            // Loop through all events
            function loop_events(events) {
              for (let i = 0; i < likes_array.length; i++) {
                let event_name = document.createElement("P");
                event_name.className = "event_name"
                // console.log('event_name', event_name);
                let location = document.createElement("P");
                let name = document.createElement("P");

                if (likes_array[i].events) {// console.log('inside if true');
                  event_name.textContent = 'Event: ' + likes_array[i].events.data[0].name
                  var start_time = document.createElement("p");


                  start_time.textContent = likes_array[i].events.data[0].start_time

console.log('start_time.textContent inside condition', start_time.textContent);

                  if (likes_array[i].events.data[0].place) {
                    location.textContent = 'Location: ' + likes_array[i].events.data[0].place.name
                  } else {
                    //  continue
                  }
                } else {
//  console.log('inside if false');
//  console.log('no events for ', likes_array[i].about);
                }

                var hold_name;
                let page_picture = document.createElement("IMG");
                let container = $('<div/>').addClass('container')
                let parent = document.createElement("div")
                parent.className = "parent"

                parent.appendChild(start_time)


                getPageName()

                function getPageName() {
                  FB.api(
                    `/${likes_array[i].id}?fields=picture,name`,
                    function (response) {
                      if (response && !response.error) {
                        hold_name = response.name
                        page_picture.setAttribute("src", response.picture.data.url)
                        parent.appendChild(page_picture)
                      }
                      // Append Elements to document.body
                      appendElementsToDocument(likes_array)
                    }
                  )
                }

                function appendElementsToDocument(arr) {
                  name.textContent = 'Name: ' + hold_name
                  // console.log('name', name);

                  if (!(name.textContent.length == 0)) {
                    // document.body.appendChild(name);
                    parent.appendChild(name)
                    // $('.container').append(name)
// console.log('container', container);

                  }
                  if (!(event_name.textContent.length == 0)) {
                    // document.body.append(event_name);
                    parent.appendChild(event_name)
console.log('start_time', start_time);
                    // parent.appendChild(start_time)
                  }

                  if (!(location.textContent.length == 0)) {
                    // document.body.append(location);
                    // $('.container').append(location)
                    parent.appendChild(location)
                  }

// console.log('arr[i]', arr[i]);
let link = document.createElement('a')
link.setAttribute('href', `https://www.facebook.com/events/${arr[i].events.data[0].id}`)
link.textContent = "Go to Event Page"
parent.appendChild(link)

flex_parent.appendChild(parent)
// document.body.appendChild(separator)

                  // $('body').append(container)
                }
// closing for loop block
              }
            }

// closing FB.api('/me'
            })
          // closing FB.login conditional
          } else {

console.log('Failed to connet to EventsFinder successfully. Try logging in again, or reloading page to show events');

$('.fb-login-button').show()
$('#visit-buttton').hide()
$('#fbLogout').hide()
            // FB.loginStatus if condition
          }
      // closing FB.getLoginStatus function
        });
      }


    // reference for logout button: https://github.com/tomero/JS-Facebook-Login-SDK/blob/master/index.html#L106
    $('#fbLogout').click(function() {
      FB.getLoginStatus(function (response) {
        if (response.authResponse) {
          var uid = response.authResponse.userID;
          var accessToken = response.authResponse.accessToken;
          FB.logout(function (response) {
            console.log(response);
            window.location.reload();
          });
        } else {

        }
      });
    });
    </script>

    <div>
      <h1 id="head">Fan Page Follower</h1>
    </div>

    <a href="/posts">
      <button id="visit-buttton" type="button" name="button">Visit Feed</button>
    </a>

    <fb:login-button class="fb-login-button" scope="public_profile,email" onlogin="checkLoginState();" data-auto-logout-link="true">
    </fb:login-button>

    <div id="status">
    </div>

    <div id="flex-parent"></div>
  </body>
</html>
