(() => {
  // Have Moment.js update the text for $('#time') here
  $('#head').css('color', 'red')
  // console.log(getElementsByTagName('p'));




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
  }

    FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
          FB.api('/me', 'GET', {fields: 'likes{about,category,category_list,description,events.limit(2)},first_name,last_name,name,id,picture.width(150).height(150)'}, function(response) {
console.log('response', response);
            let likes_array = response.likes.data
            console.log(likes_array)
          })
        }
    })

})();



// document.addEventListener('DOMContentLoaded', function() {

//   document.getElementById('head').style.color = "red"
//   // $('#head').css('color', 'red')
// })
//

console.log('loading');
