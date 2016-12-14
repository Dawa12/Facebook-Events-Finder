
    document.getElementById('title').style.color = "red";

    window.fbAsyncInit = function() {
      FB.init({
        appId      : '1843900205894102',
        xfbml      : true,
        version    : 'v2.8'
      });
      FB.AppEvents.logPageView();

      // do FB get calls inside of getLoginStatus method
      // source: http://stackoverflow.com/questions/26709869/an-active-access-token-must-be-used-to-query-information-about-the-current-user
      FB.login(function(response) {
      // handle the response
      }, {scope: 'email,user_likes'});

      FB.getLoginStatus(function(response) {
          if (response.status === 'connected') {
console.log('Logged in.');

            FB.api('/me', 'GET', {fields: 'likes{about,category,category_list,description,events.limit(2)},first_name,last_name,name,id,picture.width(150).height(150)'}, function(response) {
              // document.getElementById('status').innerHTML = "<img src='" + response.picture.data.url + "'>";
// console.log('response', response);

              let likes_array = response.likes.data

  let event_name1 = document.createElement("P");
  event_name1.id = "red"
document.getElementById('about').appendChild(event_name1)
  // document.body.appendChild(event_name1)

              for (let i = 0; i < likes_array.length; i++) {
console.log('i', i);
// console.log('likes_array[i]', likes_array[i]);

                let event_name = document.createElement("P");
                event_name.className = "event_name"

                // console.log('event_name', event_name);
                let location = document.createElement("P");
                let name = document.createElement("P");

                // let description = document.createElement("P");

                 if (likes_array[i].events) {// console.log('inside if true');
console.log('inside 1st if condition ... beginning');
                   event_name.textContent = 'Event: ' + likes_array[i].events.data[0].name
console.log('inside 1st if condition');
                   if (likes_array[i].events.data[0].place) {
console.log('inside 2nd if condition');
console.log('success !!  likes_array[i].events.data[0].place.name', likes_array[i].events.data[0].place.name);
                      location.textContent = 'Location: ' + likes_array[i].events.data[0].place.name
                   } else {
console.log('inside 2nd else condition');
console.log('no name for ', likes_array[i].events.data[0]);
                    //  continue
                   }
                 } else {
//  console.log('inside if false');
//  console.log('no events for ', likes_array[i].about);
                 }

                var hold_name;

                // function getPageName() {
                  FB.api(
                    `/${likes_array[i].id}`,
                    function (response) {
                      if (response && !response.error) {
                        /* handle the result */
                        // console.log('page name', response.name);
                        hold_name = response.name
                      }

                      // Append Elements to document.body
                      appendElementsToDocument()
                    }
                  )

              function appendElementsToDocument() {
                name.textContent = 'Name: ' + hold_name
                console.log('name', name);
                if (!(name.textContent.length == 0)) {
                  document.body.appendChild(name);
                }

                if (!(event_name.textContent.length == 0)) {
                document.body.appendChild(event_name);
                }

                if (!(location.textContent.length == 0)) {
                  document.body.appendChild(location);
                }
              }
              }
            });
          } else {
console.log('initiate FB login...');
            // FB.login();
          }
          // FB.api('/1084646081549144', 'GET', function(response) {
          //   // document.getElementById('status').innerHTML = "<img src='" + response.picture.data.url + "'>";
          // console.log('response', response);
        });
