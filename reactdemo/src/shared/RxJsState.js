import { BehaviorSubject } from "rxjs";

const subject = new BehaviorSubject();
export const dataService = {
    getData : () => subject,
    setData : (value) => subject.next(value)
}

const count = new BehaviorSubject(0);
export const wishlistCountService = {
    getData : () => count,
    setData : (value) => count.next(value)
}