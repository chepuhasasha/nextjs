import axios, { AxiosError } from "axios";
import { IBrand, IBrandDB } from "../models/brands";
import { IProduct, IProductBD } from "../models/products";

export class API {

  static axios = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_DOMAIN}/api`,
  });

  static brands = {
    create: async (
      brand: IBrand,
      cb: (data: IBrandDB) => void,
      errcb?: (err: AxiosError) => void
    ) => {
      await this.axios
        .put<IBrandDB>("brands", brand)
        .then((res) => {
          cb(res.data);
        })
        .catch((err) => {
          if (errcb) errcb(err);
        });
    },

    get: async (
      condition: {
        [k in keyof IBrandDB]?: IBrandDB[k]
      }, 
      cb: (data: IBrandDB[]) => void,
      errcb?: (err: AxiosError) => void
    ) => {
      await this.axios
        .post<IBrandDB[]>("brands", condition)
        .then((res) => {
          cb(res.data);
        })
        .catch((err) => {
          if (errcb) errcb(err);
        });
    },

    delete: async (
      condition: {
        [k in keyof IBrandDB]?: IBrandDB[k]
      }, 
      cb: (data: IBrandDB) => void,
      errcb?: (err: AxiosError) => void
    ) => {
      await this.axios
        .delete<IBrandDB>("brands", {
          data: condition
        })
        .then((res) => {
          cb(res.data);
        })
        .catch((err) => {
          if (errcb) errcb(err);
        });
    },

    update: async (
      condition: {
        [k in keyof IBrandDB]?: IBrandDB[k]
      },
      data: IBrand,
      cb: (data: IBrandDB) => void,
      errcb?: (err: AxiosError) => void
    ) => {
      await this.axios
        .patch<IBrandDB>("brands", {
          condition,
          data
        })
        .then((res) => {
          cb(res.data);
        })
        .catch((err) => {
          if (errcb) errcb(err);
        });
    }
  }

  static products = {
    create: async (
      product: IProduct,
      cb: (data: IProductBD) => void,
      errcb?: (err: AxiosError) => void
    ) => {
      await this.axios
        .put<IProductBD>("products", product)
        .then((res) => {
          cb(res.data);
        })
        .catch((err) => {
          if (errcb) errcb(err);
        });
    },

    get: async (
      condition: {
        [k in keyof IProductBD]?: IProductBD[k]
      }, 
      cb: (data: IProductBD[]) => void,
      errcb?: (err: AxiosError) => void
    ) => {
      await this.axios
        .post<IProductBD[]>("products", condition)
        .then((res) => {
          cb(res.data);
        })
        .catch((err) => {
          if (errcb) errcb(err);
        });
    },

    delete: async (
      condition: {
        [k in keyof IProductBD]?: IProductBD[k]
      }, 
      cb: (data: IProductBD) => void,
      errcb?: (err: AxiosError) => void
    ) => {
      await this.axios
        .delete<IProductBD>("products", {
          data: condition
        })
        .then((res) => {
          cb(res.data);
        })
        .catch((err) => {
          if (errcb) errcb(err);
        });
    },

    update: async (
      condition: {
        [k in keyof IProductBD]?: IProductBD[k]
      },
      data: IProduct,
      cb: (data: IProductBD) => void,
      errcb?: (err: AxiosError) => void
    ) => {
      await this.axios
        .patch<IProductBD>("products", {
          condition,
          data
        })
        .then((res) => {
          cb(res.data);
        })
        .catch((err) => {
          if (errcb) errcb(err);
        });
    }
  }

}
