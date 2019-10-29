import { Category } from './category';

export class Skill{

    id: number;
    name: string;
    categories: Category;

    constructor(id : number, name : string , category : Category){
        this.id = id;
        this.name = name;
        this.categories = category;
    }
}