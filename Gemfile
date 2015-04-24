source 'https://rubygems.org'

ruby '1.9.3'

gem 'rails', '3.2.17'

# Bundle edge Rails instead:
# gem 'rails', :git => 'git://github.com/rails/rails.git'
gem "acts_as_list", "~> 0.1.3"
gem "acts_as_state_machine", "~> 2.2.0"
# gem 'sqlite3'
gem 'sqlite3', :group => [:development, :test] 
group :production do 
  gem 'thin' 
  gem 'pg' 
end
gem "haml"
gem 'capistrano'
gem 'rvm-capistrano'

group :development do
   gem 'pry'
   gem 'pry-rails'
   gem 'pry-doc'
   gem "spring"
   gem "guard"
   gem "guard-sass"
   gem "guard-haml"

   # Use Reverse Proxy for development
  gem "rack-reverse-proxy", require: "rack/reverse_proxy"

end

# Gems used only for assets and not required
# in production environments by default.
group :assets do
  gem "sass"
 # gem 'libv8', '3.11.8.12'
  gem 'coffee-rails'
  gem 'libv8', '3.16.14.3'
  gem "uglifier"
  gem 'therubyracer'#, '0.11.4'
  gem 'sass-rails'#, '3.1.4' # if running rails 3.1 or greater
  gem 'handlebars_assets'
end

# gem 'jquery-rails'

# To use ActiveModel has_secure_password
# gem 'bcrypt-ruby', '~> 3.0.0'

# To use Jbuilder templates for JSON
# gem 'jbuilder'

# Use unicorn as the app server
# gem 'unicorn'

# Deploy with Capistrano
# gem 'capistrano'

# To use debugger
# gem 'debugger'
