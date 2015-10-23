
//////////////////////////////////////////////////////////////////////
// The team library //////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

/**
 * The `member` function creates a new team member.
 *
 * You should use this function to create new "team members". It is a
 * utility function that can be used in other library routines to
 * create new members. It is a useful technique to abstract the
 * creation of data from the actual data representation itself. In
 * this case a *member* is an object with four important properties:
 *
 * `user`: The username of the member. This should be the username
 * of the team member used to login to UMass Spire, Moodle, etc. You
 * will need to ask your fellow team members for their username.
 * `fname`: The first name of a team member.
 * `lname`: The last name of a team member.
 * `year`: Their current year of college (freshman, sophomore, junior, senior)
 *
 * We give you the implementation of this!
 *
 * @param  {string} user  the team member's username
 * @param  {string} fname the team member's first name
 * @param  {string} lname the team member's last name
 * @param  {string} year  the team member's year of college
 * @return {object} { user, fname, lname, year }
 */
function member(user, fname, lname, year, desc) {
	return {
		user: user,
		fname: fname,
		lname: lname,
		year: year,
		desc: desc
	};
}

// This library contains an internal data structure for recording
// team members. It is an array of member objects. You should add an
// entry for each of your team members. You should use the `member`
// function to easily create a new member object.
var team = [
	// Keep this first member for testing please.
	member('gprengub', 'Garret', 'Prenguber', 'senior', 'Garret is a computer science major at the University of Massachusetts Amherst. He is graduating in 2016 and has plans to work for General Dynamics as a Software Engineer. Garret has experience with web development and is an experienced programmer. He loves to come up with creative solutions to any problem he faces. As a kid he practiced karate and achieved a Black Belt rank, and enjoyed snowboarding in his free time. Today Garret loves watching television series, watching movies, playing video games, reading short stories, and slaving away at his schoolwork.'),
	member('zjberman', 'Zachary', 'Berman', 'senior', 'Zachary is a driven computer science major whose focus is time management and quality. A majority of his work will be done in back-end scripting, as well as ensuring quality across the application and maintaining the GitHub repository. Zachary first discovered programming in high school and decided to pursue a computer science degree at the University of Massachusetts Amherst. Apart from his studies, Zachary also enjoys playing video games and writing short stories.'),
	member('cmbro2','Christian','Brown','senior', 'Christian is a talented software engineer who believes he can find a solution any problem. His past and diverse experience will help him focus on general development across the application. He is passionate about the idea of Spruce.cc and delivering a new social media platform with a positive cultural effect. He also has a background working with Git in the industry and will help Zach if problems arise on that front.'),
	member('pdhulipa','Prasanth','Dhulipalla','senior', 'Pra Dhulipalla is an advanced coder. He is pursuing a Bachelors of Computer Science. He is a local boy, hailing from the town Natick, MA. His best programming languages are Java and Python. He is the database manager for Spruce.cc, since he has the most experience with it on the team. He is an exceptional leader and is great at delegating tasks and keeping team morale high.'),
	member('espinosa','Joshua','Espinosa','senior', 'Josh is from Long Island, NY and is currently pursuing a Bachelor of Arts in Computer Science & Japanese, with hopes to eventually land a job in the rising Virtual Reality Video Game industry in Japan. Talented with Computer Graphics (including Photoshop and animation), with experience in managing and creating blogs and websites, Josh will be invaluable in helping to ensure quality content on the front-end spectrum of Spruce.cc. On his free time he likes to play video games, experiment with animation and 3D modeling, as well as think about how AI might eventually be incorporated into some of his current works.'),
	member('rjphelan','Richard','Phelan','senior', 'Richard is a computer science major who is taking his first steps into the web development territory with this project. He is without a doubt a skilled engineer, and will orient himself with web development beginning with testing, documentation, and bug-fixing. Richard’s goals for this project are to gain experience in Web development and become more knowledgeable of html, css, and other necessary skills as a web developer.  His current experience is mostly as a programmer, with expertise in c, c++, and java, though he also has experience in documentation.')
];

/**
 * `copy` makes a copy of a member object. This is useful as we do not
 * want to leak our internal member data structures outside of this
 * library. It must be used by the `find` function below to return
 * new/distinct copies of a member object.
 *
 * @param  {member object} member a member object
 * @return {member object}        a copy of member
 */
function copy(myMember) {
	return member(myMember.user,myMember.fname,myMember.lname,myMember.year,myMember.desc);
}

/**
 * `copyAll` returns a copy of all team members in a new array. It
 * relies on your implementation of `copy` to do this.
 *
 * We give you this one!
 *
 * @param  {array} members an array of member objects
 * @return {array}         a copy of the array of member objects
 */
function copyAll(members) {
	var nmembers = [];
	members.forEach(m => {
		nmembers.push(copy(m));
	});
	return nmembers;
}

/**
 * The `result` function is another utility function used to return
 * a "result" object to the caller of this library. Again, a useful
 * technique is to abstract out the creation of an object from its
 * internal representation. In this case, we create a "result" object
 * with four important properties:
 *
 * `success`: this is a boolean indicating if the result is a
 * successful response. true if it is; false otherwise.
 * `message`: this is an informational message that is helpful to
 * the caller to understand the success or failure of the result.
 * `data`: this is the actual data that is returned. In our case the
 * data will always be an array of members.
 * `count`: this is the number of members in the result - this is
 * derived from the number of entries in `data`.
 *
 * @param  {boolean} success true if success; false otherwise
 * @param  {string}  message informational message
 * @param  {array} 	 data    array of members
 * @return {object}          result object
 */
function result(success, message, data) {
	return {
		success: success,
		message: message,
		data: data,
		count: data.length
	};
}

/**
 * `find` is used to lookup a member by their username. It returns
 * a member object if it is found or `null` if it is not.
 *
 * You need to implement this function. You should iterate over the
 * team array looking for the member with the correct username. If the
 * member is found you should return the member object. If it is not
 * found it should return `null`.
 *
 * Make sure you use `copy` to produce a copy of the member object if
 * one is found for the given `user`.
 *
 * @param  {string} user the member's username
 * @return {object}      the member object or `null` if not found
 */
function find(user) {
	for(var i = 0; i < team.length; i++){
		if (team[i].user === user){
			return copy(team[i]);
		}
	}
	return null;
}

/**
 * `all` returns a result object containing all of the team members.
 * This function always returns `true` as it will always return an
 * array of all the members. Even if there are no members in the team
 * it will return `true` with an empty array. You should use the
 * `result` function to create a result object. The message to the
 * `result` function should be 'team members' (the unit tests will
 * test this).
 *
 * The array of team members returned should be a copy of the original
 * array of team members. `copyAll` is a useful function for this.
 *
 * @return {result object}  a result object
 */
function all() {
	return result(true,'team members',copyAll(team));
}

/**
 * `one` returns a result object containing the team member that was
 * found. This function should check to make sure that the argument
 * `user` passed to it is a string - remember, this is a dynamically
 * typed language so we need to do the type checking manually.
 *
 * If `user` is not a string you must return a result object
 * indicating failure, a useful message, and an empty array. Use the
 * `result` function to do this.
 *
 * Otherwise, you must use the `find` function to find the member. If
 * the member is not found, return a new result object
 * indicating failure, the message 'team member not found', and an
 * empty array.
 *
 * If the member is found, return a result object indicating success,
 * the message 'team member found', and an array containing the single
 * member.
 *
 * @param  {string} user    the username of a team member
 * @return {result object}  a result object
 */
function one(user) {
	if(typeof user !== 'string'){
		return result(false,'Not a string',[]);
	}
	else if(find(user) !== null){
		return result(true,'team member found',[find(user)]);
	}
	else{
		return result(false,'team member not found',[]);
	}
	return null;
}

// This exports public functions to the outside world.
exports.all = all;
exports.one = one;