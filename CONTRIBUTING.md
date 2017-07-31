Contributing
============

#Setup

##Development Environment

Install [Git](//git-scm.com/).

Set up your Github account and SSH key:

1. [Create account at GitHub](https://github.com/).
2. [Set up an SSH key](https://help.github.com/articles/generating-ssh-keys).

All references to terminal includes gitBash.

If firewalls are an issue for things like git:// and ssh:// protocols, use an https proxy for accessing https dependencies from terminal.

    git config --global url.'https://'.insteadOf git://

These settings are stored in the .gitconfig file in your user's home directory if you ever need to edit them directly.

First you will want to go to https://github.com/Psykoral/grunt-starter-kit and create a fork of this repo for yourself.

Next decide where you're going to put your project files (like /Users/you/grunt-starter-kit/)

Then you will want to do one of the following. Probably the first.

From within the directory that you created run the following commands:

    git init
    git remote add upstream https://github.com/Psykoral/grunt-starter-kit
    git remote add origin https://github.com/{yourRepo}/grunt-starter-kit
    git pull upstream master

##Code Format and Style
JavaScript format is being validated by `JSCS` using the Crockford preset. Please review [http://javascript.crockford.com/code.html] for details.

For indentation, we are using Tabs that are 4 spaces wide.

JavaScript markup should look like:

	function awesome (sauce) {
		var flavor = sauce;
		return flavor;
	}

LESS markup should appear the same:

	.awesomeMixin (@record) {
		property: value;
	}

	.superStar {
		.anotherRemixin (@whaaa) {
			.awesomeMixin(zepplin);
		}
	}

If a project does not contain a `.editorconfig` please use the one in this document in your local setup at the root.

	# http://editorconfig.org
	root = true

	[*]
	indent_style = tab
	indent_size = 4
	end_of_line = lf
	charset = utf-8
	trim_trailing_whitespace = true
	insert_final_newline = true

To ensure that your IDE (Webstorm or IntelliJ) is using this configuration:

1) Open your IDE Preferences
2) Under Code Style > General
3) Select "Project" from the dropdown meu
4) Check the rest of the file types to see that it uses the settings

##Line Endings

If you’re programming on Windows or using another system but working with people who are programming on Windows, you’ll probably run into line-ending issues at some point. This is because Windows uses both a carriage-return character and a linefeed character for newlines in its files, whereas Mac and Linux systems use only the linefeed character. This is a subtle but incredibly annoying fact of cross-platform work.

Git can handle this by auto-converting CRLF line endings into LF when you commit, and vice versa when it checks out code onto your filesystem. You can turn on this functionality with the core.autocrlf setting. If you’re on a Windows machine, set it to true — this converts LF endings into CRLF when you check out code:

    git config --global core.autocrlf true

If you’re on a Linux or Mac system that uses LF line endings, then you don’t want Git to automatically convert them when you check out files; however, if a file with CRLF endings accidentally gets introduced, then you may want Git to fix it. You can tell Git to convert CRLF to LF on commit but not the other way around by setting core.autocrlf to input:

    git config --global core.autocrlf input

This setup should leave you with CRLF endings in Windows checkouts but LF endings on Mac and Linux systems and in the repository.

If you’re a Windows programmer doing a Windows-only project, then you can turn off this functionality, recording the carriage returns in the repository by setting the config value to false:

    git config --global core.autocrlf false

##Node

Install NodeJS using [Brew](//brew.sh/)

    brew update
    brew doctor
    brew upgrade node

or by [Nodejs Download](//nodejs.org/download/).

Keep up to date with the package manager.

    npm update -g npm

On MAC's, set ownership of /usr/local to [avoid sudo when running NPM commands](//foohack.com/2010/08/intro-to-npm/).
Windows users can ignore this step.

    sudo chown -R $USER /usr/local

Install node modules from terminal.

    npm install bower -g
    npm install grunt-cli -g
    npm install -g phantomjs-prebuilt

##Project

Install and launch project from terminal (where 'grunt-starter-kit' is the location of your project).

    cd grunt-starter-kit
    ./update.sh
    grunt live

##Grunt options

This project provides command line options:

--connect-protocol
--connect-hostname
--connect-livereload
--connect-port

Examples running 'grunt live' with different options:

    grunt --connect-protocol=https live
    grunt --connect-port=8080 live
    grunt --connect-port=8080 --connect-hostname=me.yourdomain.com live


#Code Check-in

##Commits

When you're ready to check in changes, first commit them to your local repo.

	git add .
	git commit

Jet Brains IDE short cuts: CTRL-K (win) or COMMAND-K (mac).

Next, update your local Git repo with the branches from your upstream and origin repo's:

	git fetch upstream
	git fetch origin

Then pull down and merge in the latest changes from the Upstream repo.
This will ensure you have the latest files that others have checked in, helps with code change comparison (diffs) and
helps tremendously toward not clobbering others changes.

	git pull upstream master

Jet Brains IDE: VCS > Git > Pull.

Finally, push all the changes up to your Git repo

	git push origin master

Jet Brains IDE: VCS > Git > Push

##Pull Requests back into Flippy grunt-starter-kit

Unless you're *very* familiar with the Git command line, It's recommended that you use the Git Pull Request Tools.

- Go to https://github.com/{your org}/{your repo}/compare/ replacing the example names inside {brackets} with your own.
- Use the "compare across forks" option.
- Compare the Psykoral/grunt-starter-kit on the left with your own repo and fork on the right.
- Using the 'Files Changed' tab, make sure all your changes are in correctly.
- Once confirmed, hit the *Click to create a pull request for this comparison* button.
- Be sure to check back for comments, questions and suggested changes on your pull request.

#Tools & Maintenance

##Keep it updated

Every so often, there's an update to a bower or node module, or we add new dependencies. Errors will occur during the build if you do not have these new modules.

    Local Npm module "grunt-half-baked" not found. Is it installed?

There's an update script called **update.sh** inside of /grunt-starter-kit/ which will run all the commands to update bower and node modules. You can either run this in the Shell / Git Bash command line with './update.sh', or for convenience, you can make this a one click run configuration in InteliJ. To do so:

For Windows users, make sure you have the the Git Bash, and locate where the .exe is. i.e.: C:\Program Files\Git\bin\sh.exe

1. Install the 'BashSupport' plugin for InteliJ.
    - Go to File > Settings > Plugins
    - "Browse Repositories..."
    - Search: BashSupport, "Download and install" it.
2. Setup the defaults for the Bash runner
    - Go to Run > Edit Configurations
    - Under Defaults, find Bash
    - Set the "Bash Interpreter" to your bash preference
	    - Windows ex: C:\www\Git\bin\sh.exe
	    - Mac/*nix ex: /bin/bash
    - Set the "Interpreter options" to --login -i
    - Click "Apply" to save these default configurations.
3. Setup the update script
    - Go to Run > Edit Configurations
    - Click the + to add a new configuration.
    - Choose "Bash"
    - Set the options for this script:
	    - Name: Update
	    - Script name: Browse to the update.sh file
	    - Working Directory: Browse to the grunt-starter-kit dir (where the package.json lives)
	    - Click "OK" to save the configuration.
4. Run the Update config! You should see a Green Arrow next to the Configurations box in the InteliJ tools menu.

##Remove Lint
Setup IntelliJ or WebStorm to find lint in your code before the build does.

1. Go to Preferences > Javascript > Code Quality Tools > JSHint
2. Enable
3. Use config files

##Graphing dependencies
For a visual mapping of all the client side dependencies, use this command.

    grunt live:graph

#Troubleshooting

Please see our [Wiki](https://github.com/Psykoral/grunt-starter-kit/wiki) for troubleshooting tips.
