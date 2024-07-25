# CHANGELOG.md

All notable changes to this project will be documented in this file. Some changes will be ignored on this file, so for example, you could see v1.x.5 after v1.x.3, it is because the changes on v1.x.4 are not really important for the users and owner ignored it.

---

## Semantics:
## v{Version} -- [Date]
### `Tag (see below for information)`
- Description 1
- Decription 2
- etc...

Tags meanings:
- `Fix`: Bug fixes for the user
- `Feat`: New feature for the user
- `Add`: New feature, but mainly for the project, not for the users
- `Style`: Style changes

---

## v1.4.0 -- 2024-07-25
### Feat
- Uploading avatar
- Deleting avatar

### Style
- Content boxes

## v1.3.2 -- 2024-07-25
### Fix
- Like list loading state

## v1.3.1 -- 2024-07-25
### Add
- Remove positions field from create and update user
- Set ui maximum scale to 1

## v1.3.0 -- 2024-07-25
### Feat
- See bios of users
- Update bio
- Change password
- Removed Post searching from Global Search input
- Mention other users on posts
- Create button now only works for Post

### Add
- Full refactor
- Search component changed into Combobox

### Style
- Navbar items
- Comments
- Post header
- Create Post Modal

## v1.2.2 -- 2024-07-20
### Feat
- Remove friends tab from Profile
- You can see follower and following list on profile header
- Birthday info on profile header

### Add
- More standard Error and Loading components

## v1.2.1 -- 2024-07-19
### Feat
- Loading overlay on deleting posts

### Fix
- User name overflow on profile header
- White background instead of an error on post page
- Post count on profile live update

## v1.2.0 -- 2024-07-19
### Feat:
- Profile Tabs use background format on active state
- Disabled username input to Edit form
- Username description on Register page
- Logout confirm modal

### Fix
- Close like list modal on page change

### Style:
- Navbar items
- Logout button to Action Icon
- Profile tab buttons

## v1.0.7 -- 2024-07-19
### Fix:
- Fixed feed page total posts incorrect value

## v1.0.6 -- 2024-07-19
### Fix:
- Fixed the indicator icon on the Admins' names
- Removed Sort button and total information on Post list when no posts are available

## v1.0.2 -- 2024-07-19
### Add:
- Added meta information to the website (favicon, title, desc. etc.)

## v1.0.1 -- 2024-07-18
### Fix:
- Global search query problem

## v1.0.0 -- 2024-07-18
### Feat:
- Register and login with your account
- Create posts with content
- Feed with your and following users' posts
- Like posts
- Comment on posts
- Delete your post
- Search users (with username, first and last names) and posts (with content)
- Edit your account (email, first and last names, date of birth)
- Follow and unfollow users
- See users' about, feeds and follow lists
- Logout from your account