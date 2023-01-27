# Mockup Website w/Vue

Small personal project created to learn and practice Vue. Limited implementation of actual functions. 

## Slightly bigger update - 1/10/23 
- Removed most extraneous comments 
- Removed views and imported components directly in router.js
- Fixed navigation from /message/:id to /profile/:id 
  - Error: Routed to /profile/:id and then /home, effectively skipping the profile page
  - Location - In watch() of Message.vue
- Fixed some of the sizing and spacing issues 
- Added porfolio links and updated links in Info.vue and Navbar.vue

### Todo
- Fix alignment in Profile.vue - done
- Restrain sizes - done (current size is okay for xxl breakpoint)
- Remove unused default CSS files - done
- Sizing issues for sm-breakpoints - done 
- Prevent hover effects for disabled items - done
- Some design choices (ex. Profile.vue) - done
- Add appropriate comments to components, functions, etc
- Change liked users to links (?) - done
- Add option to go back to porfolio in the Landing page. - done 

## Update - 1/11/23
- Looked over and adjusted most of the items on the Todo list from 1/10
  - Big changes to Message.vue responsive design 
- Edited vite.config.js to include preprocessor options
- Fixed routing issue of not signed in user accessing the messages page. 
- Fixed wrong names being displayed in Message.vue.
- Adjusted some of the spacing in Navbar.vue
- Normalized some of the display issues with sizes varying depending on content in Post.vue affecting Home.vue

### Todo 
- Add comments as needed - unfinished
- Clean code (ex. spacing & remove any unhelpful code) - done
- Code split (? - look over)
- Max-width of dummy input bar 

## Update - 1/12/23 
- Added JsDocs configuration with the plugin https://github.com/Kocal/jsdoc-vuejs 
- Added about 1/3 of the comments 
- Divided and some of the larger components (LargeProfile.vue, MessageList.vue)
- Re-arranged some of the folders and files to have a more consistent structure 

### Todo 
- Check to see what should be put in {} of @vue-event 
- Figure out how to document methods 
- Max-width of dummy input bar 


## Update - 1/13/23 
- Added additional JsDoc and regular comments to files 
- Added additional alert to notified sign in status when a user is selected from the menu 
- Added alert when message input is empty 
- Renamed some variable and function names to be more consistent and/or clear (ex. currentId -> userId, currentMsg -> recipientId)
- Moved some functions from components to store.

### Possible improvements
- Moving updatePosts from AllPosts to postStores
- Removing the resize hook & relevant code
- Adjust spacing & sizing to be more consistent 
- Simplify some code and remove unnecessary attributes and HTML elements (ex. divs)
- Add more detailed documentations


## Update - 1/14/23
- Fixed log out button in dropdown menu for smaller screen sizes
- Modified sign in alert so it appears whenever a new user is being signed in, regardless of whether alert has been manually closed or not 
  - Alert appears in message page too now.
- Fixed alert error so same errors (ex. pressing send on an empty message repeatedly) will not close alert until either the error has been resolved or manually closed. 


## Update 1/26/23 
- Added error page for non-existent pages 
  - Handled cases when params for profile/message > the # that exist 