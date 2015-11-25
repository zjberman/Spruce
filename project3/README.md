Overview:
	Spruce is a new social media platform providing an outlet for the diverse and creative projects we take on in our lives. Users may visually document important projects in their lives by uploading images of their progress to Spruce. These images are stored chronologically in 'branches' which represent the entire lifetime of the project. Branches are stored on the user's profile where they may be shared with just their friends, with the whole world, or kept private. Users may also discover new projects by others which they are interested in and follow them to receive updates when a new image is added.

How To Run:
	In the project3 folder, run:
	node app.js

Libraries:
	express https://github.com/strongloop/express
	express is a web framework for node.
	express-handlebars https://github.com/ericf/express-handlebars
	express-handlebars is used to view handlebars with express
	body-parser https://github.com/expressjs/body-parser
	body-parser is used to parse the body of an HTTP request.
	express-session https://github.com/expressjs/session
	express-session is used to maintain session state.
	connect-flash https://github.com/jaredhanson/connect-flash
	connect-flash is used to store flash messages for the session states.
	cookie-parser https://github.com/expressjs/cookie-parser
	cookie-parser is used to parse cookies in an HTTP header.
	morgan https://github.com/expressjs/morgan
	morgan is used for server logging.

Views:
	admin: Only accessable by admin. Allows them to view a list of all registered users and also change other users to be admins.

	branch: Shows more detailed information about a branch that the user has clicked on. Users may see details such as dates posted, captions, and comments, as well as the option to scroll through every image in the branch.

	login: View shown when the user has not yet logged into the application. From here, users may either log in if they have an account, or hit the register button to be taken to the register view.

	newsfeed: Shows recent activity from users or branches you are following. Users may also click on each branch to be taken to the branch view, where more information for that branch is shown.
	
	register: Allows new user to register with the application by creating a username and password, and entering a valid email address. This will add the user to the database so that they may log in.

Statefulness:
	express-session is used to maintain session state in this application. When navigating to any page in the application, it will check certain properties in the session state, such as whether the user is logged in, online, and/or an admin. This will tell the application what should be displayed next. This information is stored on the server, so it is the same across all users running the application.

Persistence:
	Currently, our database only holds the set of users registered with the application. This includes their username, password, email, uid and admin status. For sample data we included tim, caleb, and hazel from the previous individual assignment. user.js is capable of finding, adding, changing, and listing contents of the database. These functions are used by user-routes.js and admin-routes.js to modify or request from the database. When a new user is registering, he/she will be added to the database and have a new, unique id dynamically assigned to them with a default user (not admin) status. When admin status of a user is changed, that is reflected in the information stored in the database. A user can be made an admin if a current admin goes to the admin view and enters that users name into the text box. Admins can also do this to strip a user of admin status if they are already an admin. When information is requested, it can then be included in the display, or used to check user credentials.
