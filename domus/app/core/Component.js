/*
====================================================
DOMUS Framework v1.0
Base Component
====================================================
*/

export default class Component {

    constructor(props = {}) {
        this.props = props;
        this.state = {};
        this.element = null;
    }

    setProps(props = {}) {
        this.props = {
            ...this.props,
            ...props
        };
        this.update();
    }

    setState(state = {}) {
        this.state = {
            ...this.state,
            ...state
        };
        this.update();
    }

    getState() {
        return this.state;
    }

    getProps() {
        return this.props;
    }

    template() {
        return "";
    }

    render() {
        return this.template();
    }

    mount(container) {

        if (typeof container === "string") {
            container = document.querySelector(container);
        }

        if (!container) {
            throw new Error("DOMUS: Container tidak ditemukan.");
        }

        container.innerHTML = this.render();

        this.element = container.firstElementChild || container;

        this.afterRender();
    }

    afterRender() {
        // Override bila diperlukan
    }

    update() {

        if (!this.element) return;

        const parent = this.element.parentElement;

        if (!parent) return;

        this.mount(parent);

    }

    destroy() {

        if (this.element) {
            this.element.remove();
        }

        this.element = null;

    }

}
