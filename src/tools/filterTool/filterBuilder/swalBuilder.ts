export abstract class SwalBuilder {
    swalTitle: string = "";
    swalDescription: string = "";

    constructor(swalTitle: string, swalDescription: string) {
        this.swalTitle = swalTitle;
        this.swalDescription = swalDescription;
    }

    public abstract build(): Promise<any>;
}
