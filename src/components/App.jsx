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

            // FB.api('/me', 'GET', {fields: 'first_name,last_name,name,id,picture.width(150).height(150)'}, function(response) {
            //   // document.getElementById('status').innerHTML = "<img src='" + response.picture.data.url + "'>";
            //   console.log('response', response);
            //   document.getElementById('status').innerHTML = response.first_name
            // });
            //

            FB.api('/me', 'GET', {fields: 'likes{about,category,category_list,description,events.limit(2)},first_name,last_name,name,id,picture.width(150).height(150)'}, function(response) {
              // document.getElementById('status').innerHTML = "<img src='" + response.picture.data.url + "'>";
              console.log('response', response);

              let likes_array = response.likes.data
              let likes = response.likes.data[0]
              console.log('likes', response.likes.data[0]);

              document.getElementById('status').innerHTML = response.first_name,
              document.getElementById('about').innerHTML = likes.about

              let el = document.createElement("P");
              el.textContent = likes.about
              document.body.appendChild(el);

              // var newDiv = document.createElement("div");
              // newDiv.style.background = "red"
              // document.body.appendChild(newDiv)



              // for (let i = 0; i < likes_array.length; i++) {
              //   let element = document.createElement("p").id = `about-${i}`;
              //   document.append(element)
              // }





              // document.getElementById('category').innerHTML = response.likes{category},
              // document.getElementById('category_list').innerHTML = response.likes{category_list},
              // document.getElementById('description').innerHTML = response.likes{description},
              // document.getElementById('events').innerHTML = response.likes{events}
            });
          }
          else {
            console.log('initiate FB login...');
            // FB.login();
          }
        });
    };

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
