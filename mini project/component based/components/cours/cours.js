const template = document.createElement('template');
template.innerHTML = `
    <link rel="stylesheet" href="components/cours/cours.css">
<div class="course-card">
      <div class="cover">
        <img alt="">
      </div>
      <div class="details">
        <h2>js course</h2>
        <div class="info">
          <p>students: <slot name="students"></slot></p>
          <p>teacher: <slot name="teacher"></slot></p>
        </div>
    
        <div class="action">
          <button class="register">register</button>
          <button class="toggle">show info</button>
        </div>
      </div>
    </div>
`;

class Course extends HTMLElement {
    constructor () {
        super();

        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.toggleInfo = false;
    };

    connectedCallback () {
        this.shadowRoot.querySelector('.details h2').innerHTML = this.getAttribute('title');
        this.shadowRoot.querySelector('img').setAttribute('src', this.getAttribute('cover'));

        this.shadowRoot.querySelector('.register').addEventListener('click', () => {
            this.register(this);
        });

        this.shadowRoot.querySelector('.toggle').addEventListener('click', this.changetoggle);
    };

    static observedAttributes () {
        return ['title', 'cover']
    };

    register (comp) {
        alert(`your rejister course ${comp.getAttribute('title')}`)
    }; 

    changetoggle = () => {
        this.toggleInfo = !this.toggleInfo

        this.shadowRoot.querySelector('.info').style.display = this.toggleInfo ? 'block' : 'none';

        this.shadowRoot.querySelector('.toggle').innerHTML = this.toggleInfo ? 'hide info' : 'show info';
    };

};

export { Course };