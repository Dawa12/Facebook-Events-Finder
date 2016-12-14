import React, { Component } from 'react';
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
              console.log('response', response);

              let likes_array = response.likes.data
              console.log('likes_array', likes_array);

              document.getElementById('status').innerHTML = response.first_name

//               console.log('likes_array[1].events', likes_array[1].events);
//
// if (likes_array[1].events) {
//   console.log('likes_array[1].events.data[0].name', likes_array[1].events.data[0].name);
// } else {
//   console.log('it is undefined');
// }

              // console.log('likes_array[1].events.data[0].name', likes_array[1].events.data[0].name);


              for (let i = 0; i < likes_array.length; i++) {
  console.log('i', i);

                let description = document.createElement("P");
                 if (likes_array[i].events) {
console.log('inside if true');
                   description.textContent = likes_array[i].events.data[0].name
                 } else {
         console.log('inside if false');
                   console.log('no events for ', likes_array[i].about);
                 }

      console.log('description', description);
                document.body.appendChild(description);
              }
            });
          }
          else {
            console.log('initiate FB login...');
            // FB.login();
          }
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
           <p id="status"></p>
           <p id="about"></p>
           <p id="cateogry"></p>
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
