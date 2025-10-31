import { base_url } from "./base_url";
import commonApi from "./commonApi";

export const createProduct=async(data)=>{
  await commonApi(`${base_url}/product`,"POST",null,data)
}
export const getAllProducts = async (query = "") => {
  return await commonApi(`${base_url}/product${query}`, "GET");
};
export const updateProduct=async(id,data)=>{
  await commonApi(`${base_url}/product/${id}`,"PUT",null,data)
}
export const deleteProduct=async(id)=>{
  await commonApi(`${base_url}/product/${id}`,"DELETE")
}