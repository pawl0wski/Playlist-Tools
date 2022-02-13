import Swal from "sweetalert2";
import { SwalBuilder } from "./swalBuilder";

export class InputTextSwalBuilder extends SwalBuilder {
    constructor(swalTitle: string, swalDescription: string) {
        super(swalTitle, swalDescription);
    }

    async build(): Promise<{ value: string; include: boolean }> {
        let swalResults = await Swal.fire({
            title: this.swalTitle,
            background: "#08262D",
            color: "white",
            confirmButtonColor: "#14CC60",
            html: `
            <p>
            <label>
                <span class="swal2-label">Enter text</span>
                <input type="text" class="swal2-input" id="entered-text"  />
            </label>
            </p>
            <p>
            <label>
                <input type="checkbox" id="include" checked>
                <span class="swal2-label">Only if the item has this text in it</span>
            </label></p>`,
            preConfirm: () => {
                return {
                    // @ts-ignore
                    value: document.getElementById("entered-text").value,
                    // @ts-ignore
                    include: document.getElementById("include").checked,
                };
            },
        });
        return swalResults.value!;
    }
}
