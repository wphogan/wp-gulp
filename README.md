# wp-gulp
run 'newwp' to install gulp file -- requires bash profile below

Bash profile: 
export PATH=$PATH:/Applications/MAMP/Library/bin
export PS1="\[\033[36m\]\u\[\033[m\]@\[\033[32m\]\h:\[\033[33;1m\]\w\[\033[m\]\$ "
export CLICOLOR=1
export LSCOLORS=ExFxBxDxCxegedabagacad
alias ls='ls -GFh'
alias wpg='cd wp-content/themes/wp-gulp'
alias wpt='cd wp-content/themes'
alias wpgg='cd wp-content/themes/wp-gulp && gulp'
alias s='cd ~/Sites'
function md () { mkdir -p "$@" && cd "$@"; }
alias newwp='cd wp-content/themes/ && git clone https://github.com/wphogan/wp-gulp && cd wp-gulp && sublime gulpfile.js && npm install'
alias edit='sublime'  
alias sulb='sublime'
alias cd..='cd ../'                         # Go back 1 directory level (for fast typers)
alias ..='cd ../'                           # Go back 1 directory level
alias ...='cd ../../'                       # Go back 2 directory levels
alias .3='cd ../../../'                     # Go back 3 directory levels
alias .4='cd ../../../../'                  # Go back 4 directory levels
alias .5='cd ../../../../../'               # Go back 5 directory levels
alias .6='cd ../../../../../../'            # Go back 6 directory levels
alias f='open -a Finder ./'                 # f:            Opens current directory in MacOS Finder
