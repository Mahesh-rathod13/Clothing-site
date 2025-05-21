import { endPoints } from "../constants/urls"
import api from "./api"

const GetProducts = (pageIndex: number, pageSize: number, search: string = "")=> {
  const params: Record<string, any> = {
    offset: pageIndex * pageSize,
    limit: pageSize,
  };
  if (search) params.title = search;
  return api.get(endPoints.products, { params });
}


const GetProductById = async (id : number)=>{
    try {
        const res = await api.get(endPoints.products+`/${id}`);
        return res;
    } catch (error) {
        return null;
    }
}

const GetProductBySlug = async (slug : string)=>{
    try {
        const res = await api.get(endPoints.products+`${slug}`);
        return res;
    } catch (error) {
        return null;
    }
}

export {
    GetProducts,
    GetProductById,
    GetProductBySlug
}

function sortProductsByColumn<T>(data: T[], column: keyof T, order: "asc" | "desc" = "asc"): T[] {
  return [...data].sort((a, b) => {
    if (a[column] === b[column]) return 0;
    if (order === "asc") {
      return a[column] > b[column] ? 1 : -1;
    } else {
      return a[column] < b[column] ? 1 : -1;
    }
  });
}