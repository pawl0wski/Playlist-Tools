import Swal from "sweetalert2";
import { SwalBuilder } from "./swalBuilder";

export class InputNumberSwalBuilder extends SwalBuilder {
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

    async build(): Promise<number> {
        let swalResults = await Swal.fire({
            title: this.swalTitle,
            inputLabel: this.swalDescription,
            background: "#08262D",
            color: "white",
            confirmButtonColor: "#14CC60",
            input: "range",
            inputValue: 50,
            inputAttributes: {
                min: `${this.minValue}`,
                max: `${this.maxValue}`,
            },
        });
        return swalResults.value;
    }
}
