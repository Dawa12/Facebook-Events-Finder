import React, { Component } from 'react';

class App extends Component {
  // this is right after the component is mounted on the screen
  componentDidMount() {
    // AjaxAdapter.getTasks()
    // .then(allTasks =>
    //   this.setState({ tasks: allTasks })
    // )
    // .catch((error) => {
    //     throw error;
    // });

    document.getElementById('title').style.color = "red";



    (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.8&appId=1843900205894102";
    fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  };


  render(){
    return (
      <div>
        <h1 id="title">Page loading</h1>

        {/* <div id="fb-root"></div> */}
        {/* <!-- Your like button code --> */}
      	<div className="fb-like"
      		data-href="http://www.your-domain.com/your-page.html"
      		data-layout="standard"
      		data-action="like"
      		data-show-faces="true">
      	</div>

         {/* <a href="#" onClick={this.handleClick}>Login</a> */}

         <div className="fb-login-button" data-max-rows="1" data-size="medium" data-show-faces="false" data-auto-logout-link="false"></div>
      </div>
    )
  }
}

export default App;
