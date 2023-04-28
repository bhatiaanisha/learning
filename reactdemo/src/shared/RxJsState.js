import { BehaviorSubject } from "rxjs";

const subject = new BehaviorSubject();

export const dataService = {
    getData : () => subject,
    setData : (value) => subject.next(value)
}