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
                <input style="width: 80%" id="selected-value" type="range">
            </label></p>
            <p>
            <label>
                <input type="checkbox" id="greater">
                <span class="swal2-label">Only songs greater than?</span>
            </label></p>`,
            preConfirm: () => {
                return {
                    // @ts-ignore
                    value: document.getElementById("selected-value").value,
                    // @ts-ignore
                    greater: document.getElementById("greater").value === "on",
                };
            },
        });
        return swalResults.value!;
    }
}
