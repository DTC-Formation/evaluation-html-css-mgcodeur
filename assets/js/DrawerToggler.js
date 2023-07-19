class DrawerToggler {
    body; // the body element
    element; // the button 
    type; // type of button: opener or closer

    /**
     * @param {DrawerToggler[HTMLElement]} element 
     * @param {DrawerToggler[String]} type 
     */
    constructor(element, type) {
        this.element = element;
        this.type = type;

        this.body = document.querySelector('body');

        if (this.type === 'opener') {
            this.element.addEventListener('click', this.openDrawer.bind(this));
        } 
        else {
            this.element.addEventListener('click', this.closeDrawer.bind(this));
        }

        this.listenForClickOutside();
    }

    /**
     * open the drawer
     * @return {void}
     * @param {Event} e
     */
    openDrawer(e) {
        e.preventDefault();
        e.stopPropagation();
        document.querySelector('.mobile-drawer').classList.add('open');
        this.body.classList.add('drawer-is-open');
    }

    /**
     * @return {void}
     * @param {Event} e
     */
    closeDrawer(e) {
        e.preventDefault();
        e.stopPropagation();
        document.querySelector('.mobile-drawer').classList.remove('open');
        this.body.classList.remove('drawer-is-open');
    }

    /**
     * listen for click events outside of the drawer
     * @return {void}
     */
    listenForClickOutside() {
        document.addEventListener('click', (e) => {
            const isOutside = e.target.closest('.mobile-drawer') === null && e.target.closest('.button-open-menu') === null;
            if (isOutside) this.closeDrawer(e);
        });
    }

    /**
     * @return {DrawerToggler[HTMLElement]}
     */
    static getOpenButton() {
        return Array.from(document.querySelectorAll('.button-open-menu')).map(button => {
            return new DrawerToggler(button, 'opener');
        });
    }

    /**
     * @return {DrawerToggler[HTMLElement]}
     */
    static getCloseButton() {
        return Array.from(document.querySelectorAll('.button-close-menu')).map(button => {
            return new DrawerToggler(button, 'closer');
        });
    }

    /**
     * listen for click events on the open and close buttons
     * @return {void}
     */
    static bind() {
        DrawerToggler.getOpenButton();
        DrawerToggler.getCloseButton();
    }

    /**
     * initialize the drawer toggler
     * @return {void}
     */
    static init() {
        DrawerToggler.bind();
    }
}