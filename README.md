# open-weather

Free and open source weather application. Forecast data provided by [openweathermap.org](http://openweathermap.org/).

I have created this app just for fun completely inside a browser, using Cloud 9 as a development environment,
Cordova + Ionic as a framework and Phonegap Build service to build it.

## Testing on browser

To test the application without compiling it use:

    ionic serve --p $PORT --nobrowser --nolivereload
    

NOTE: Remember that openweathermap.org API are only HTTP, so always use http also for webserver.


## Emulators

If you want to try it inside an emulator I suggest to use [Genymotion](https://www.genymotion.com/).


## Building the app

To build the application I have used [Phonegap Build](https://build.phonegap.com/apps).

    
## How I have created the project

- Create a Cloud 9 workspace
- Install Cordova

    sudo npm install -g cordova
    
- Create a new Ionic application

    ionic start openweather sidemenu
    
The last command creates an openweather folder, for convinience I have copied all the content in the root,
this is especially useful for Phonegap build service.

After that all you have to do is to write an angular app that read the openweathermap.org API 
(consider that you don't have the cross origin limitation that you have on a standard browser).

## Credits

- Forecast data weather data from [openweathermap.org](http://openweathermap.org/)
- open-weather icon create by [Rafiqul Hassan](http://www.iconarchive.com/artist/rafiqul-hassan.html)
