import axios from 'axios'

const commonApi=async(reqURL,reqMethod,reqHeader=null,reqBody=null)=>{
  const config={
    url:reqURL,
    method:reqMethod
  }

  if(reqHeader) config.header=reqHeader
  if(reqBody) config.data=reqBody

  const response=await axios(config)
  return response

}


export default commonApi;