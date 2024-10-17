import { LitElement, html, css } from 'lit';

const goalData = [
  {
    name: 'No Poverty',
    color: '#e5243b',
    image: new URL('../lib/svgs/goal-1.svg', import.meta.url).href,
  },
  { name: 'Zero Hunger', color: '#dda63a' },
  { name: 'Good Health and Well-being', color: '#4c9f38' },
  { name: 'Quality Education', color: '#c5192d' },
  { name: 'Gender Equality', color: '#ff3a21' },
  { name: 'Clean Water and Sanitation', color: '#26bde2' },
  { name: 'Affordable and Clean Energy', color: '#fcc30b' },
  { name: 'Decent Work and Economic Growth', color: '#a21942' },
  { name: 'Industry, Innovation and Infrastructure', color: '#fd6925' },
  { name: 'Reduced Inequalities', color: '#dd1367' },
  { name: 'Sustainable Cities and Communities', color: '#fd9d24' },
  { name: 'Responsible Consumption and Production', color: '#bf8b2e' },
  { name: 'Climate Action', color: '#3f7e44' },
  { name: 'Life Below Water', color: '#0a97d9' },
  { name: 'Life on Land', color: '#56c02b' },
  { name: 'Peace, Justice and Strong Institutions', color: '#00689d' },
  { name: 'Partnerships for the Goals', color: '#19486a' },
  { name: 'All Sustainable Development Goals', color: '#ffffff' },
  { name: 'Sustainable Development Goals Circle', color: '#ffffff' },
];

// Specifies the types and attributes for each properties 
export class UnSdg extends LitElement {
  static get properties() {
    return {
      goal: { type: String, reflect: true },
      label: { type: String },
      colorOnly: { type: Boolean, attribute: 'color-only', reflect: true },
      _currentSrc: { type: String },
      alt: { type: String },
    };
  }

  // Sets the styles for each component
  static get styles() {
    return css`
      :host {
        display: inline-block; 
        width: 254px;
        height: 254px;
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
      .color-only {
        width: 100%;
        height: 100%;
      }

      .goal {
        width: 100px;
      }
    `;
  }

  //Constructor to initialize the properties
  constructor() {
    super();
    this.goal = '1';
    this.label = '';
    this.alt = null;
    this.colorOnly = false;
    this._currentSrc = null;
  }

//Method that is called whenever the propertities are updated
  updated(changedProperties) {
    if (changedProperties.has('goal')) { //Checks if the goal property has changed
      this.updateGoalImage();
    }
  }

//Method: Updates the goal image based on the 'goal' property
  updateGoalImage() {
    // If statement for the two special cases, 'all' and 'circle'
    if (this.goal === 'all') {
      this._currentSrc = new URL('./lib/svgs/all.svg', import.meta.url).href;
      this.alt = 'All Sustainable Development Goals';
    } else if (this.goal === 'circle') {
      this._currentSrc = new URL('./lib/svgs/circle.png', import.meta.url).href;
      this.alt = 'Sustainable Development Goals Circle';
    } else {
      // Handle goals 1-17
      const goalNumber = parseInt(this.goal); //Converts the goal string to an integer
      if (goalNumber >= 1 && goalNumber <= 17) { //Checks if the goal number is valid and sets the image for the corresponding goal
        this._currentSrc = new URL(
          `./lib/svgs/goal-${goalNumber}.svg`,
          import.meta.url
        ).href;
        this.alt = `Goal ${goalNumber}: ${goalData[goalNumber - 1].name}`;
      }
    }
  }

//Method to render the individual component format
  render() {
    if (this.colorOnly) { //checks if the color-only mode is false
      const goalNumber = parseInt(this.goal);
      if (goalNumber >= 1 && goalNumber <= 17) { //checks if the goal number is valid
        const color = goalData[goalNumber - 1].color; //gets the color for the specified goal
        return html`<div class="color-only" style="background-color: ${color};"></div>`; //Returns a div with the background color of the goal
      }
    }

// Return the image element for the goal if color-only is false
    return html`
      <img
        src="${this._currentSrc}"
        alt="${this.label || this.alt}"
        loading="lazy"
        fetchpriority="low"
      />
    `;
  }
}

customElements.define('un-sdg', UnSdg);

