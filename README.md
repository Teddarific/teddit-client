# Teddit
## CS52 Lab 4

#### What I did

I made the front-end of a React-Redux blog, inspired by Reddit. Users can create, edit, view, and delete posts on a central database.

#### What didn't work

- I attempted to edit the post by clicking on individual fields, which turned out to be quick difficult
- I ran into difficulties updating notes asynchronously - I kept running into bugs where I would update the post server side, but the post would render too quickly before the server would update
- Dynamic preview images. The logic turned quite gnarly especially not being able to modify the server code


#### What did work
- I created a new ````/edit```` route, and use the same component ```editor.js``` for creating a new post and editing an existing post
- Routing allowed things to be much more clean, and the code is very structured
- Implementing Redux turned out to be easier than I thought, and it makes way more sense now, and I do see how it is very powerful and useful

#### Extra Credit
- Attempted to make it into something other a blog platform - more of a news/media sharing platform
- Input validation on creating a new form
- Default image types for different kinds of posts