import Component from "../../core/Component.js";
import Store from "../../core/Store.js";

export default class StatusBar extends Component {

    template() {

        const chapter = Store.get("activeChapter");

        return `
<div class="domus-statusBar">

<span>

${chapter ? chapter.title : "Belum ada bab aktif"}

</span>

</div>
`;

    }

}
