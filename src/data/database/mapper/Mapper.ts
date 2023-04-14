import type {IEmployee} from "../../models/employee/IEmployee";
import type {IAddress} from "../../models/address/IAddress";

export class Mapper {
    constructor() {
        this.mapAddress = this.mapAddress.bind(this);
        this.mapEmployee = this.mapEmployee.bind(this);
    }

    mapAddress(data: any): IAddress {
        return {
            street: data.street,
            city: data.city,
            state: data.state,
            zipcode: data.zipcode,
        };
    }

    mapEmployee(data: any): IEmployee {
        return {
            id: data.id,
            personalInformation: {
                firstname: data.personalInformation.firstname,
                lastname: data.personalInformation.lastname,
                address: this.mapAddress(data.personalInformation.address),
                birthdate: data.birthdate,
            },
            startDate: data.startDate,
            department: data.department,
        };
    }
}

export default new Mapper();
