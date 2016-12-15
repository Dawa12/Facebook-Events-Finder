import React, { Component } from 'react';
import Style from './App.css';
// require('dotenv') from '../../.env'

class App extends Component {
  // this is right after the component is mounted on the screen
  componentDidMount() {
    document.getElementById('title').style.color = "red";

    // window.fbAsyncInit = function() {
    //   FB.init({
    //     appId      : '1843900205894102',
    //     status: true,
    //     cookie: true,
    //     xfbml      : true,
    //     version    : 'v2.8'
    //   });

    window.fbAsyncInit = function() {
      FB.init({
        appId      : '1843900205894102',
        xfbml      : true,
        version    : 'v2.8'
      });

      FB.AppEvents.logPageView();

      FB.login(function(response) {
      // handle the response
      }, {scope: 'email,user_likes'});


      // do FB get calls inside of getLoginStatus method
      // source: http://stackoverflow.com/questions/26709869/an-active-access-token-must-be-used-to-query-information-about-the-current-user

      // once user is logged in, execute this large block
      FB.getLoginStatus(function(response) {
          if (response.status === 'connected') {
            FB.api('/me', 'GET', {fields: 'likes{about,category,category_list,description,events.limit(2)},first_name,last_name,name,id,picture.width(150).height(150)'}, function(response) {
console.log('response', response);
              let likes_array = response.likes.data

let event_name1 = document.createElement("P");
event_name1.id = "red"
document.getElementById('about').appendChild(event_name1)
  // document.body.appendChild(event_name1)

loop_events(likes_array)


    // FB.api('/1084646081549144', 'GET', function(response) {
    //   // document.getElementById('status').innerHTML = "<img src='" + response.picture.data.url + "'>";

            function loop_events(events) {
              // Loop through all events
              for (let i = 0; i < likes_array.length; i++) {
// console.log('i', i);
// console.log('likes_array[i]', likes_array[i]);
                let event_name = document.createElement("P");
                event_name.className = "event_name"
                // console.log('event_name', event_name);
                let location = document.createElement("P");
                let name = document.createElement("P");

                // let description = document.createElement("P");

                if (likes_array[i].events) {// console.log('inside if true');
                  event_name.textContent = 'Event: ' + likes_array[i].events.data[0].name

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


getPageName()
                function getPageName() {
                  FB.api(
                    `/${likes_array[i].id}?fields=picture,name`,

                    function (response) {
                      if (response && !response.error) {
                        /* handle the result */
                        // console.log('page name', response.name);
                        hold_name = response.name
                        // getPagePicture()
console.log('response inside event', response);
                        page_picture.setAttribute("src", response.picture.data.url)
                        document.body.appendChild(page_picture);
                      }
                      // Append Elements to document.body
                      appendElementsToDocument()
                    }
                  )

                  // .then(function(response) {
                  //   getPagePicture()
                  // })
                }

                function getPagePicture() {
                  FB.api(
                    `/${likes_array[i].id}/picture`,
                    function (response) {
                      if (response && !response.error) {
                        /* handle the result */
// console.log('picture response...', response.data.url);
                        // page_picture = <img src=`${response.data.url}`>
                        {/* // document.getElementById('status').innerHTML = "<img src='" + response.picture.data.url + "'>"; */}
let page_picture = document.createElement("IMG");
page_picture.setAttribute("src", response.data.url)
document.body.appendChild(page_picture);
                      }
                    }
                  );
                }


                function appendElementsToDocument() {
                  name.textContent = 'Name: ' + hold_name
                  // console.log('name', name);

                  if (!(name.textContent.length == 0)) {
                    document.body.appendChild(name);
                  }
                  if (!(event_name.textContent.length == 0)) {
                    document.body.appendChild(event_name);
                  }

                  if (!(location.textContent.length == 0)) {
                    document.body.appendChild(location);
                  }

                  // if (!(page_picture.textContent.length == 0)) {
                    // document.body.appendChild(page_picture);
                  // }
                  let separator = document.createElement("P")
                  separator.textContent = "-------------------"
                  document.body.appendChild(separator)
                }
// closing for loop block
              }
            }

// closing FB.api('/me'
            })

          // closing FB.login conditional
          } else {
console.log('initiate FB login...');
            // FB.loginStatus if condition
          }
// closing FB.getLoginStatus function

        });
// closing window.fbAsyncInit
    };


    (function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = "https://connect.facebook.net/en_US/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));

// closing componentDidMounts
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
