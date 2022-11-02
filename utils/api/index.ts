import axios, { AxiosError } from "axios";
import {} from "mongoose";
import { IBrand, IBrandDB } from "../models/brands";
import { IProduct, IProductDB } from "../models/products";
import { IProductsList, IProductsListDB } from "../models/productsList";
import { IUserDB } from "../models/users";

export type CollectionName = "brands" | "products" | "products_lists";

export interface CollectionMethods<T, K> {
  create: (
    data: T,
    cb: (data: K) => void,
    errcb?: (err: AxiosError) => void
  ) => void;
  get: (
    condition: {
      [k in keyof K]?: K[k];
    },
    cb: (data: K[]) => void,
    errcb?: (err: AxiosError) => void
  ) => void;
  delete: (
    condition: {
      [k in keyof K]?: K[k];
    },
    cb: (data: K) => void,
    errcb?: (err: AxiosError) => void
  ) => void;
  update: (
    condition: {
      [k in keyof K]?: K[k];
    },
    data: T,
    cb: (data: K) => void,
    errcb?: (err: AxiosError) => void
  ) => void;
}

export class API {
  static axios = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_DOMAIN}/api`,
  });

  static async user(
    cb: (data: IUserDB) => void,
    errcb?: (error: AxiosError) => void){
    await this.axios
      .get('user')
      .then((res) => {
        cb(res.data);
      })
      .catch((err) => {
        if (errcb) errcb(err);
      });
  }

  static async signup (
    data: {username: string, password: string},  
    cb: (data: IUserDB) => void,
    errcb?: (error: AxiosError) => void){
    await this.axios
      .post('signup', data)
      .then((res) => {
        cb(res.data);
      })
      .catch((err) => {
        if (errcb) errcb(err);
      });
  }

  static async login(
    data: {username: string, password: string},  
    cb: (data: IUserDB) => void,
    errcb?: (error: AxiosError) => void){
    await this.axios
      .post('auth/login', data)
      .then((res) => {
        cb(res.data);
      })
      .catch((err) => {
        if (errcb) errcb(err);
      });
  }

  static async logout(
    cb: (data: { message: string}) => void,
    errcb?: (error: AxiosError) => void){
    await this.axios
      .get('auth/logout')
      .then((res) => {
        cb(res.data);
      })
      .catch((err) => {
        if (errcb) errcb(err);
      });
  }

  static async create<T, K>(
    collection: CollectionName,
    data: T,
    cb: (data: K) => void,
    errcb?: (error: AxiosError) => void
  ) {
    await this.axios
      .put<K>(collection, data)
      .then((res) => {
        cb(res.data);
      })
      .catch((err) => {
        if (errcb) errcb(err);
      });
  }

  static async get<T>(
    collection: CollectionName,
    condition: {
      [K in keyof T]?: T[K];
    },
    cb: (data: T[]) => void,
    errcb?: (error: AxiosError) => void
  ) {
    await this.axios
      .post<T[]>(collection, condition)
      .then((res) => {
        cb(res.data);
      })
      .catch((err) => {
        if (errcb) errcb(err);
      });
  }

  static async delete<T>(
    collection: CollectionName,
    condition: {
      [K in keyof T]?: T[K];
    },
    cb: (data: T) => void,
    errcb?: (error: AxiosError) => void
  ) {
    await this.axios
      .delete<T>("brands", {
        data: condition,
      })
      .then((res) => {
        cb(res.data);
      })
      .catch((err) => {
        if (errcb) errcb(err);
      });
  }

  static async update<T>(
    collection: CollectionName,
    condition: {
      [K in keyof T]?: T[K];
    },
    data: T,
    cb: (data: T) => void,
    errcb?: (error: AxiosError) => void
  ) {
    await this.axios
      .patch<T>(collection, {
        condition,
        data,
      })
      .then((res) => {
        cb(res.data);
      })
      .catch((err) => {
        if (errcb) errcb(err);
      });
  }

  static async loadImage(exp: string, data: string) {
    return await this.axios.post('/images', {
      data,
      exp
    })
  }

  static brands: CollectionMethods<IBrand, IBrandDB> = {
    create: async (data, cb, errcb?) => {
      await this.create<IBrand, IBrandDB>("brands", data, cb, errcb);
    },

    get: async (condition, cb, errcb?) => {
      await this.get<IBrandDB>("brands", condition, cb, errcb);
    },

    delete: async (condition, cb, errcb?) => {
      await this.delete<IBrandDB>("brands", condition, cb, errcb);
    },

    update: async (condition, data, cb, errcb?) => {
      await this.update<IBrand>("brands", condition, data, cb, errcb);
    },
  };

  static products: CollectionMethods<IProduct, IProductDB> = {
    create: async (data, cb, errcb?) => {
      await this.create<IProduct, IProductDB>("products", data, cb, errcb);
    },

    get: async (condition, cb, errcb?) => {
      await this.get<IProductDB>("products", condition, cb, errcb);
    },

    delete: async (condition, cb, errcb?) => {
      await this.delete<IProductDB>("products", condition, cb, errcb);
    },

    update: async (condition, data, cb, errcb?) => {
      await this.update<IProduct>("products", condition, data, cb, errcb);
    },
  };

  static productsList: CollectionMethods<IProductsList, IProductsListDB> = {
    create: async (data, cb, errcb?) => {
      await this.create<IProductsList, IProductsListDB>(
        "products_lists",
        data,
        cb,
        errcb
      );
    },

    get: async (condition, cb, errcb?) => {
      await this.get<IProductsListDB>("products_lists", condition, cb, errcb);
    },

    delete: async (condition, cb, errcb?) => {
      await this.delete<IProductsListDB>(
        "products_lists",
        condition,
        cb,
        errcb
      );
    },

    update: async (condition, data, cb, errcb?) => {
      await this.update<IProductsList>(
        "products_lists",
        condition,
        data,
        cb,
        errcb
      );
    },
  };
}
