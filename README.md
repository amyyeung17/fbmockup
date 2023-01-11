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
- Add comments as needed
- Clean code (ex. spacing & remove any unhelpful code)
- Code split (? - look over)