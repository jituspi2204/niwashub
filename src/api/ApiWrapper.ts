export const ApiWrapper = async(promise : Promise<any>) => {
  try{
    const response = await promise;
    return {data : response.data || response, error : null};
  }catch (e:any){
    return {data : null, error : e?.response?.data?.message || 'Something went wrong'};
  }
}
