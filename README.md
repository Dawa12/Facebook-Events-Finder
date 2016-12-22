# EventsFinder

This app pulls from the Facebook Graph API and helps a user better follow the pages that he or she has liked and is a part of on facebook. When you choose to like a page and follow it, you expect to receive occasional or regular notifications. However, because organic reach of fan pages have declined considerably over the years, many users won't receive important updates from the pages they follow.

This app hopes to aggregate the most useful features that a person may want to know about a page he or she is a fan of. For example, you can view upcoming events as well as view recent posts of the pages that you are a fan of.

Technologies Utilized:
- Node.js
- Express
- HTML & JS & CSS
- Facebook Graph API
  - Facebook Javascript SDK

Project Challenges:
I wasn't able to complete as much as I'd hoped mainly due to me abandoning my original approach. I spent some time learning a node module that allowed me to use Facebook JS SDK on the backend, however, I never got it to run successfully and eventually decided to shift gears after speaking with an instructor. Because I would essentially be rendering on the front end, I no longer needed React as well, and therefore began rendering on an ejs file.

Upcoming features:
- Fix bug: Alert pop-up appears after user logs out and tells user that there are no events to show. Use of setInterval is incorrect.
- Hope to refactor in React. Initially I had difficulty in using css with React - after receiving data from Facebook. But I feel optimistic that I can solve it with time.
- Update Posts page's links to link to actual post instad of only the photo of the post. Post text seems to not appear in the external links.


Overall, this project was pretty rewarding since I finally gained hands on experience with the Facebook Graph API and I know many other students have never worked with it. I feel like this is an app that I'd definitely like to use for personal benefit and hope to develop it further.

# EventsFinder Screenshots

### Login and Homepage
<img src="https://github.com/Dawa12/final-project/blob/master/public/README%20images/homepage.png" width="600">

### Facebook Login Modal
<img src="https://github.com/Dawa12/final-project/blob/master/public/README%20images/Facebook%20Login%20Modol.png?raw=true" width="600">

### Upcoming Events
<img src="https://github.com/Dawa12/final-project/blob/master/public/README%20images/Events%20Page.png" width="600">

### Posts
<img src="https://github.com/Dawa12/final-project/blob/master/public/README%20images/Feed%20Page.png?raw=true" width="600">




