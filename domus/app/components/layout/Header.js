import Component from "../../core/Component.js";
import Store from "../../core/Store.js";

export default class Header extends Component {

    template() {

        const book = Store.get("activeBook");

        return `
<header class="domus-header">

<div class="domus-header-logo">

DOMUS

</div>

<div class="domus-header-book">

${book ? book.title : "Tidak ada buku"}

</div>

<div class="domus-header-actions">

<button id="btnSearch">Search</button>

<button id="btnSettings">Settings</button>

</div>

</header>
`;

    }

}
