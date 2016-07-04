# wp-gulp
run 'newwp' to install gulp file from site root -- requires bash profile below (view this 'Raw' and copy/paste)
'wp' -- shortcut to wp-content
'wpg' -- shortcut to run gulp after intsallation

Bash profile: 
alias wp='cd wp-content/'
alias wpg='cd wp-content/wp-gulp && gulp'
alias newwp='cd wp-content/ && git clone https://github.com/wphogan/wp-gulp && cd wp-gulp && sublime gulpfile.js && npm install'