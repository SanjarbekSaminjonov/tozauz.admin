import { requests } from "./requests";
import { CategoryObj } from "../types/categories.types";



export const categoriesServices = {
    getCategories: async () => {
        return await requests('GET', 'packet/categories/');
    },

    _categories: [] as CategoryObj[],

    categories: async function () {
        if (this._categories.length === 0) {
            const res = await this.getCategories();
            this._categories = res.data;
        }
        return this._categories;
    },

    loadCategories: async function () {
        const res = await this.getCategories();
        this._categories = res.data;
    }
}