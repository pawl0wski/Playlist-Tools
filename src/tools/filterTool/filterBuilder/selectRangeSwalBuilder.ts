import Swal from "sweetalert2";
import { SwalBuilder } from "./swalBuilder";

export class SelectRangeSwalBuilder extends SwalBuilder {
    minValue: number;
    maxValue: number;

    constructor(
        swalTitle: string,
        swalDescription: string,
        minValue: number,
        maxValue: number
    ) {
        super(swalTitle, swalDescription);
        this.minValue = minValue;
        this.maxValue = maxValue;
    }

    async build(): Promise<{ value: number; greater: boolean }> {
        let swalResults = await Swal.fire({
            title: this.swalTitle,
            background: "#08262D",
            color: "white",
            confirmButtonColor: "#14CC60",
            html: `
            <p>
            <label>
                <span class="swal2-label">Select value from ${this.minValue} to ${this.maxValue}</span>
                <div style="display: flex; flex-direction: row; align-items: center; justify-content: center;">
                    <input style="width: 80%" id="selected-value" min=${this.minValue} max=${this.maxValue} type="range" oninput="this.nextElementSibling.value = this.value" >
                    <output style="width: 3em">0</output>
                </div>
            </label>
            </p>
            <p>
            <label>
                <input type="checkbox" id="greater">
                <span class="swal2-label">Greater than selected value</span>
            </label></p>`,
            preConfirm: () => {
                return {
                    // @ts-ignore
                    value: document.getElementById("selected-value").value,
                    // @ts-ignore
                    greater: document.getElementById("greater").checked,
                };
            },
        });
        console.log(swalResults.value);
        return swalResults.value!;
    }
}
