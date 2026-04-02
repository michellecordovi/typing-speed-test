# Frontend Mentor - Typing Speed Test solution

This is a solution to the [Typing Speed Test challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/typing-speed-test). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
  - [AI Collaboration](#ai-collaboration)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

**Note: Delete this note and update the table of contents based on what sections you keep.**

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

### Screenshot

![](./screenshot.jpg)

Add a screenshot of your solution. The easiest way to do this is to use Firefox to view your project, right-click the page and select "Take a Screenshot". You can choose either a full-height screenshot or a cropped one based on how long the page is. If it's very long, it might be best to crop it.

Alternatively, you can use a tool like [FireShot](https://getfireshot.com/) to take the screenshot. FireShot has a free option, so you don't need to purchase it. 

Then crop/optimize/edit your image however you like, add it to your project, and update the file path in the image above.

**Note: Delete this note and the paragraphs above when you add your screenshot. If you prefer not to add a screenshot, feel free to remove this entire section.**

### Links

- Solution URL: [typing-speed-test](https://github.com/michellecordovi/typing-speed-test)
- Live Site URL: [https://michellecordovi.github.io/typing-speed-test/](https://michellecordovi.github.io/typing-speed-test/)

## My process

### Built with

- Semantic HTML5
- CSS custom properties
- Flexbox
- Mobile-first responsive design
- Vanilla JavaScript
- JavaScript Modules for code organization
- Local Storage API
- Fetch API


### What I learned

This project challenged me to build a fully interactive, real-time application without relying on frameworks, which significantly strengthened my understanding of core JavaScript concepts.

One of the most interesting challenges was handling user input without a traditional input field. Instead of typing into an <input>, I tracked keystrokes globally and mapped them to individual characters in the prompt. This required careful event handling and state tracking, especially for edge cases like backspacing, restarting, and completing the test.

I also implemented logic to ensure the currently typed character stays in view as the user progresses. This introduced me to JavaScript scrolling methods and viewport management, particularly important for mobile usability.

```js
currentCharElement.scrollIntoView({
  behavior: "smooth",
  block: "center"
});
```

Another key learning area was building timer functionality from scratch. I implemented both a countdown timer and an elapsed time tracker, which required precise control over intervals and state updates.

To manage the growing complexity of the application, I organized my code into separate JavaScript modules. This improved readability, maintainability, and made debugging significantly easier.

I also explored using data-* attributes to associate DOM elements with their corresponding characters, making it easier to track correctness and user progress.

```html
<span data-char="a">a</span>
```

Additionally, I used local storage to persist the user's personal best score, allowing progress to carry across sessions.


### Continued development

In future iterations of this project, I plan to:

- Convert the application into a Progressive Web App (PWA) to support offline use and installability
- Improve performance and optimize event handling for larger text sets
- Enhance accessibility, particularly for keyboard navigation and screen readers
- Refine the UI/UX for an even smoother mobile typing experience (particularly on mobile)

### Useful resources

- [Example resource 1](https://www.example.com) - This helped me for XYZ reason. I really liked this pattern and will use it going forward.
- [Example resource 2](https://www.example.com) - This is an amazing article which helped me finally understand XYZ. I'd recommend it to anyone still learning this concept.

**Note: Delete this note and replace the list above with resources that helped you during the challenge. These could come in handy for anyone viewing your solution or for yourself when you look back on this project in the future.**

### AI Collaboration

I make it a point to create the code myself and allow myself to get stumped. I use AI tooks primarily to improve code quality rather than generate solutions.

Tools used: ChatGPT, Windsurf SWE 1.5
Use cases:
- Reviewing code for efficiency and simplification
- Identifying opportunities to refactor or reduce redundancy

I primarily wrote the implementation myself, using AI as a secondary tool to validate and refine my approach. This helped me stay hands-on with problem-solving while still benefiting from feedback and optimization suggestions.

## Author

- Website - [Marigold Web Studio](https://www.marigoldwebstudio.com)
- Frontend Mentor - [@michellecordovi](https://www.frontendmentor.io/profile/michellecordovi)
- LinkedIn - [Michelle Cordovi](https://www.linkedin.com/in/michelle-cordovi-dpt/)


## Acknowledgments

Thanks to Frontend Mentor for providing a realistic and challenging project that pushed me to deepen my understanding of JavaScript and browser behavior.