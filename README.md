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
- Remove unused default CSS files 
- Sizing issues for sm-breakpoints
- Prevent hover effects for disabled items
- Some design choices (ex. Profile.vue)
- Add appropriate comments to components, functions, etc
- Change liked users to links (?)