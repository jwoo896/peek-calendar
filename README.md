This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm install`
### `npm run start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

## Quick Run Down

This application focuses on the granular view of any given day of the month. The landing page 
has a simple "react-calendar" third-party web component. Please select the first day of the
month (6/1/15). This will route the user to the day's view. 

On this screen, the user will see blocks of activities that might be available throughout the
day. The size of the blocks will be large enough to cover the time slots from the starting hour
to the ending hour. Selecting a block will render a sticky component to the right that will
display details relevant to the activity.

In addition to the "react-calendar" component, this application uses some components from the 
Material-ui library. 

## Development Approach and Decisions

The UI design focuses on "readability" and ease of use. As stated above, the application focuses
on a view that lists available activities on a given day. I did not spend time on creating
a custom calendar component. Given more time, I would have created a custom component that would
have visual cues for days that have available activities vs days that don't. Or depending on the
goals of a deliverable, I would weigh the benefits of using a fully fleshed out calendar
component like "react-big-calendar" against building out fully customized component from scratch.
This time, I didn't use "react-big-calendar" because I felt the purpose of this assignment was
to build something from scratch.

I decided to use react (react hooks) to create this application because it leverages JavaScript
concepts I'm familiar with. I considered implementing Redux, Express.JS, MongoDB but I take a
little longer than I would like to configure these technologies with my applications. This 
process (wiring up an application) hasn't happen often enough, within my previous projects,
for me to memorize all of the 'ins and outs'. I have resources readily available to me including
Udemy courses that I rely on for this process, as well as learning new technologies and practices
to introduce into my professional skillset.  

I would still like to share an application that I've been working on over the past month that utilizes
the following technologies: React.js, Express.js, MongoDB, GraphQL, Apollo Client. Please feel
free to view the repo at: https://github.com/jwoo896/collaborate
