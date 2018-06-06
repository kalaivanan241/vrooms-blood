import { bloodGroup } from './../services/donor.service';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'blood'
})
export class BloodPipe implements PipeTransform {
    transform(value: string, fallback: string) {
        const tup = value.split(',');
        let a: string[];
        const arr = bloodGroup;
        a = tup.map(val => {
           const b =  bloodGroup.find(v => v.key === parseInt(val, 10));
           return b.name;
        });
        return a.join(',');
    }
}
