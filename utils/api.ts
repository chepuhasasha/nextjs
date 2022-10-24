import axios, { AxiosError } from "axios";
import { IBrand } from "../models/brands";

export class API {

  static axios = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_DOMAIN}/api`,
  });

  static brands = {
    create: async (
      brand: IBrand,
      cb: (data: IBrand) => void,
      errcb?: (err: AxiosError) => void
    ) => {
      await this.axios
        .put<IBrand>("brands", brand)
        .then((res) => {
          cb(res.data);
        })
        .catch((err) => {
          if (errcb) errcb(err);
        });
    },

    get: async (
      condition: {
        [k in keyof IBrand]?: string
      }, 
      cb: (data: IBrand[]) => void,
      errcb?: (err: AxiosError) => void
    ) => {
      await this.axios
        .post<IBrand[]>("brands", condition)
        .then((res) => {
          cb(res.data);
        })
        .catch((err) => {
          if (errcb) errcb(err);
        });
    },

    delete: async (
      condition: {
        [k in keyof IBrand]?: string
      }, 
      cb: (data: IBrand) => void,
      errcb?: (err: AxiosError) => void
    ) => {
      await this.axios
        .delete<IBrand>("brands", {
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
        [k in keyof IBrand]?: string
      },
      data: IBrand,
      cb: (data: IBrand) => void,
      errcb?: (err: AxiosError) => void
    ) => {
      await this.axios
        .patch<IBrand>("brands", {
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
