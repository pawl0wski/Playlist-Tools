import Swal from "sweetalert2";
import { SwalBuilder } from "./swalBuilder";

export class SelectValueSwalBuilder extends SwalBuilder {
    values: Array<string>;

    constructor(
        swalTitle: string,
        swalDescription: string,
        values: Array<string>
    ) {
        super(swalTitle, swalDescription);
        this.values = values;
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
                <select id="selected-value">
                    ${this.values.map((v: string) => {
                        return `<option value="${v.toLowerCase()}">${
                            v.charAt(0).toUpperCase() + v.slice(1)
                        }</option>`;
                    })}
                </select>
            </label>
            </p>
            <p>
            <label>
                <input type="checkbox" id="include" checked>
                <span class="swal2-label">Only items with selected value</span>
            </label></p>`,
            preConfirm: () => {
                return {
                    // @ts-ignore
                    value: document.getElementById("selected-value").value,
                    // @ts-ignore
                    include: document.getElementById("include").checked,
                };
            },
        });
        return swalResults.value!;
    }
}
