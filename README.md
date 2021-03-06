FlippyUI - Jenkins & Github integration builds
====
Build Status:
- master: [![Build Status](http://build.flippydisk.com:8080/buildStatus/icon?job=Github-Auto-Build)](http://build.flippydisk.com:8080/job/Github-Auto-Build/)

Project template built from FlippyUI. grunt-starter-kit includes:

- A Git Clone from [FlippyUI grunt-starter-kit](https://github.com/Psykoral/grunt-starter-kit)
- Project specific Grunt runner.
- bower.json and package.json for common dependencies.
- AMD Javascript sources specific to grunt-starter-kit.
- Reference Design Library: http://flippydisk.com/

## Integration test steps
* Fork the JI repo, not a local clone (this is for easy pull request references)
	![screenshot 2017-07-31 12 18 42](https://user-images.githubusercontent.com/1676422/28794270-99f4c756-75ea-11e7-9b34-3e2ed711b8e3.png)
* Create a new folder on your local, and init a git repo 

		git init
		
* Add a reference to your repo as the `origin` and the parent repo as the `upstream`
		
		git remote add upstream https://github.com/Psykoral/JI.git
		git remote add origin https://github.com/{yourRepo}/JI.git

* Grab the files from the `upstream`
		
		git pull upstream master
		
* Make a local change to any file, doesn't matter which one or how big the change.
* Commit it

		git commit -m "Testing Jenkins and Github PR integration"
		
* Push it to your `origin`

		git push origin master
		
* [Create a Pull Request](https://github.com/Psykoral/JI/compare) from your repo to the `upstream` repo

![screenshot 2017-07-31 12 35 01](https://user-images.githubusercontent.com/1676422/28794880-c19e08a6-75ec-11e7-8519-e87074cb0934.png)

* Watch Github connect to Jenkins to start a build, and see the Jenkins server in the `details` link

![screenshot 2017-07-31 12 36 58](https://user-images.githubusercontent.com/1676422/28797421-1781602a-75f6-11e7-9d99-e96225eed8ba.png)

* [Jenkins](http://build.flippydisk.com:8080), user: `tester`, pass: `JenkinsTester`

![screenshot 2017-07-31 13 39 51](https://user-images.githubusercontent.com/1676422/28797491-5a2be530-75f6-11e7-8fe4-c47dcb318a8f.png)

* Failures are returned: 

![screenshot 2017-07-31 13 44 30](https://user-images.githubusercontent.com/1676422/28797512-6fde8fa4-75f6-11e7-9c3e-9ac82a79efb8.png)

* Successful builds are returned:

![screenshot 2017-07-31 13 39 15](https://user-images.githubusercontent.com/1676422/28797466-445ba9de-75f6-11e7-833b-6e63fdac8226.png)

* After a merge, [the regular build job](http://build.flippydisk.com:8080/job/Github-Auto-Build/) should run.

![screenshot 2017-07-31 14 07 25](https://user-images.githubusercontent.com/1676422/28798546-a9b063b2-75f9-11e7-97d1-5e3e387c8ca8.png)

* For simple updates that shouldn't affect a build, you can skip the auto PR build by putting `[skip ci]` in the PR comment.

![screenshot 2017-07-31 14 12 34](https://user-images.githubusercontent.com/1676422/28798780-649c024e-75fa-11e7-9aff-5a603c1dba61.png)

## Local Development

### Prerequisites

* Install [Git](https://git-scm.com/)
* Install [NodeJS](https://nodejs.org) >=4
* Install [Grunt](http://gruntjs.com/getting-started) ~1.0.1

		npm install -g grunt-cli

* Install [Bower](http://bower.io/)

		npm install -g bower

* Install [PhantomJS](http://phantomjs.org/download.html)

		npm install -g phantomjs-prebuilt

### Running grunt-starter-kit

* Clone grunt-starter-kit
	<pre>git clone https://github.com/Psykoral/grunt-starter-kit.git</pre>
* Run all NPM and Bower items
	<pre>./update.sh</pre>
	* Windows users run this with GitBash.exe
	* *nix & Mac users you might need to chmod +x this file to allow it to be executable.
* <pre>grunt live</pre>
	* Runs the Example site
* <pre>grunt jsdoc</pre>
	* Runs JSDoc API documentation
	* Run after 'grunt live', keep that server running then go to http://localhost/jsdoc/
* <pre>grunt test</pre>
	* Runs Jasmine tests in the console (also runs on 'grunt live')
* <pre>grunt livetests</pre>
	* Runs Jasmine tests in a browser

Distribution Package
-------
The distribution package is the end result of building this project:

    dist/
    ├── css/
       ├── jenkins-integration.css
    ├── js/
       ├── jenkins-integration.js

Community
-------

Want to use FlippyUI? See our [Contributing](https://github.com/Psykoral/grunt-starter-kit/blob/master/CONTRIBUTING.md) documentation.

Developed under the [MIT License](https://github.com/Psykoral/grunt-starter-kit/blob/master/LICENSE.txt).
