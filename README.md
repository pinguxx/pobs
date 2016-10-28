# Pobs
Polymer 2 and Bootstrap 4
**not ready not complete**

## Status
This is using polymer 2 preview and bootstrap 4 alpha, so its not production ready, can't be compiled with the polymer tools yet, can't be minified, etc, since its using es6

We are using es6 to define the elements for bootstrap, you pretty much have one element for each of the selector and child selectors for bootstrap for example:
```html
<pobs-card>
   <pobs-card-block></pobs-card-block>
</pobs-card>
```
this is needed in order to cascade as much as possible of the bootstrap css

We will keep updating the project as much as possible, while bootstrap and polymer release the version 2 and 4 respectively

## Install
clone the repo

```
npm install
bower install
npm install http-server -g //to run a local server
```

## Styles
The styles are read from bower_components/bootstrap/scs, so the project expects you to have it in that location, can be changed in the gulp file

Its recommended to start 2 terminals with the following commands
1.  `gulp watchSas` this will inject from the scss files to the html files, every scss file have a corresponding html file, e.g.: pobs-tag-style.scss have pobs-tag-style.html
2.  `http-server -p 8081` this will start a server
3.  `gulp compile-sass` this will compile scss to css... only needed for main.scss if you are changing it

You have to load a main.css that contains normalize, print and reboot from bootstrap, this is just to get fonts and other things to work as expected, this file its inside scss/main.css

For the components, it tries to load the styles from bootstrap, then the custom styles that we want to add, then watch sass will compile the sass and inject it to the html, make sure to always have
```html
<!-- Start Style -->
<!-- End Style -->
```
inside the template tag, since this is where the gulp process will inject the css

The main concept its to load the current css for each component, for example pobs-card, loads _card.scss from bootstrap and puts it on a shared html file, all the children elements for card will also load this shared css file, the components check certain things to pass the styles down so the inverse or the card-primary works as expected, we use the couple of behaviors to accomplish this

pobs-app its loading base type, grid, etc so you can apply col-sm-3, etc to the custom elements

## Components
You will end up with a ton of small elements that are going to try to match the selectos for that bootstrap component, for example
```html
<pobs-card>
   <pobs-card-block></pobs-card-block>
</pobs-card>
```
for different styles or options, you can pass them on the top element, e.g:
```html
<pobs-card outline style="primary">
   <pobs-card-block></pobs-card-block>
</pobs-card>
```
this will generate a card with a blue outline

### Javascript
We are using es6 classs to describe the components and behaviors, we are also using mixwith.js library (manual copy from master to this project, will use npm in the future), to do mixins the cool way

### Behaviors
There are some behaviors to help with the common functionality of the components or to pass around the styles, options of the elements, we have inverse-behavior, this behavior is used in card for example to invert the colors if inverse its passed to the card


## Demo
See src/pobs-app.html for an example of the current elements, we will be updating this file to reflect the finished components

this will only work on latest chrome and firefox, since its using es6 files without transforming them to es5 (cant use babel yet with polymer 2 preview) and other latest web-components features