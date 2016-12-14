import React, { Component } from 'react';
import Style from './App.css';
// require('dotenv') from '../../.env'

class App extends Component {
  // this is right after the component is mounted on the screen
  componentDidMount() {
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
    };

// console.log('likes_array[i].events.data.description', likes_array[i].events.data.description);
// console.log('likes_array[i]', likes_array[i]);
// console.log('likes_array[i].events', likes_array[i].events);
// console.log('likes_array[i].data[0]', likes_array[i].data[0]);

              // let el = document.createElement("P");
              // el.textContent = likes_array[i].about
              // let el = document.createElement("P");
              // el.textContent = likes_array[i].about
              // let el = document.createElement("P");
              // el.textContent = likes_array[i].about
              // let el = document.createElement("P");
              // el.textContent = likes_array[i].about
    // document.getElementById('category').innerHTML = response.likes{category},
    // document.getElementById('category_list').innerHTML = response.likes{category_list},
    // document.getElementById('description').innerHTML = response.likes{description},
    // document.getElementById('events').innerHTML = response.likes{events}

    (function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = "//connect.facebook.net/en_US/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));
  };

  render(){
    return (
      <div>
        <h1 id="title">Page loading</h1>

        {/* FB login button. Specified data-scope attribute to allow specific permissions */}
         <div className="fb-login-button" data-max-rows="1" data-size="medium" data-show-faces="false" data-auto-logout-link="false" data-scope="user_likes"></div>

         <div id="parent">
           <p id="about"></p>
           <p id="category"></p>
           <p id="category_list"></p>
           <p id="description"></p>
           <p id="events"></p>
         </div>
         <div id="result"></div>
      </div>
    )
  }
}

export default App;
