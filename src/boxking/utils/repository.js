import {api} from './baseUrl';

const postCategory=async (data)=>{
    return await api.post('/Category', data);
}
const createOrder=async (data)=>{
    return await api.post('/createOrder', data);
}
const postproduct=async (data)=>{
    return await api.post('/product', data);
}

const getCategories=async ()=>{
 return  await api.get('/Categories');
}
const getproductTypes=async ()=>{
 return  await api.get('/productTypes');
}
const products=async ()=>{
    return  await api.get('/products');
   }

const getCategoriesWithProductTypes=async ()=>{
    return  await api.get('/ProductsWithCategory');
   }

const CategoriesComplete=async ()=>{
    return  await api.get('/Categoriesall');
   }
   const ProductsWithCategoryName=async ()=>{
    return  await api.get('/ProductsWithCategoryName');
   }
   
   const printingCompanies=async ()=>{
    return  await api.get('/printingCompanies');
   }
const postProductType=async (data)=>{
    return await api.post('/postproductType', data);
}
const postCompany=async (data)=>{
    return await api.post('/Company', data);
}
const postUser=async (data)=>{
    return await api.post('/register', data);
}
const checkUniqe=async (data)=>{
    return await api.post('/checkUniqeid', data);
}

const deleteCategory=async (id)=>{
    return await api.get('/deleteCategory/'+id);
}

const deleteProductType=async (id)=>{
    return await api.get('/deleteProductType/'+id);
}
const deleteProduct=async (id)=>{
    return await api.get('/deleteProduct/'+id);
}
const deletePrintingCompanies=async (id)=>{
    return await api.get('/deletePrintingCompanies/'+id);
}


const deletematerial=async (id)=>{
    return await api.get('/deletematerial/'+id);
}

const postmaterial=async (data)=>{
    return await api.post('/material', data);
}

const getmaterials=async ()=>{
    return  await api.get('/materials');
   }
   
const deleteprocessing=async (id)=>{
    return await api.get('/deleteprocessing/'+id);
}

const postprocessing=async (data)=>{
    return await api.post('/processing', data);
}

const getprocessings=async ()=>{
    return  await api.get('/processings');
   }


   const deletefinishingeffect=async (id)=>{
    return await api.get('/deletefinishingeffect/'+id);
}

const postfinishingeffect=async (data)=>{
    return await api.post('/finishingeffect', data);
}

const getfinishingeffects=async ()=>{
    return  await api.get('/finishingeffects');
   }


   const deletefinishing=async (id)=>{
    return await api.get('/deletefinishing/'+id);
}

const postfinishing=async (data)=>{
    return await api.post('/finishing', data);
}

const getfinishings=async ()=>{
    return  await api.get('/finishings');
   }
const updateCategory=async (data)=>{
    return  await api.post('/updateCategory',data);
   }
const updateProductType=async (data)=>{
    return  await api.post('/updateProductType',data);
   }

const updatePrintingCompany=async (data)=>{
    return  await api.post('/updatePrintingCompany',data);
   }

const updatefinishing=async (data)=>{
    return  await api.post('/updatefinishing',data);
   }

const updatefinishingeffect=async (data)=>{
    return  await api.post('/updatefinishingeffect',data);
   }
const updateprocessing=async (data)=>{
    return  await api.post('/updateprocessing',data);
   }
const updatematerial=async (data)=>{
    return  await api.post('/updatematerial',data);
   }
const updateUser=async (data)=>{
    return  await api.post('/updateUser',data);
   }
const updateProduct=async (data)=>{
    return  await api.post('/updateProduct',data);
   }

   const getOrders=async ()=>{
    return  await api.get('/getOrders');
       //
   }
   
   const getOrdersbyUser=async (id)=>{
    return  await api.get('/getOrdersbyUser/'+id);
       //
   }
   const getOrdersbyPrinting=async (id)=>{
    return  await api.get('/getOrdersbyPrinting/'+id);
       //
   }
   const paymentsbyUser=async (id)=>{
    return  await api.get('/paymentsbyUser/'+id);
       //
   }
   const payments=async ()=>{
    return  await api.get('/payments');
       //
   }
   const paymentsbyCompany=async (id)=>{
    return  await api.get('/paymentsbyCompany/'+id);
       //
   }
   
   const updateOrder=async (id,status)=>{
    return  await api.get('/updateOrder/'+id+'/'+status);
       //
   }

   const checkUserEmail=async (email)=>
   {
        return await api.get('/checkUserEmail/'+email);
   }
   const loginuser=async (email,password)=>
   {
        return await api.get('/loginuser/'+email+'/'+password);
   }
   const loginprinting=async (email,password)=>
   {
        return await api.get('/loginprinting/'+email+'/'+password);
   }
   const loginadmin=async (email,password)=>
   {
        return await api.get('/loginadmin/'+email+'/'+password);
   }



   const postPtypefinishings=async (data)=>{
    return await api.post('/Ptypefinishing', data);
}
const updatePtypefinishing=async (data)=>{
    return  await api.post('/updatePtypefinishing',data);
   }

   const getPtypefinishings=async ()=>{
    return  await api.get('/Ptypefinishings');
   }

   const deletePtypefinishing=async (id)=>{
    return await api.get('/deletePtypefinishing/'+id);
}





   const postptypematerial=async (data)=>{
    return await api.post('/ptypematerial', data);
}
const updateptypematerial=async (data)=>{
    return  await api.post('/updateptypematerial',data);
   }

   const getptypematerials=async ()=>{
    return  await api.get('/ptypematerials');
   }

   const deleteptypematerial=async (id)=>{
    return await api.get('/deleteptypematerial/'+id);
}



const postptypetestrun=async (data)=>{
    return await api.post('/ptypetestrun', data);
}
const updateptypetestrun=async (data)=>{
    return  await api.post('/updateptypetestrun',data);
   }

   const getptypetestruns=async ()=>{
    return  await api.get('/ptypetestruns');
   }

   const deleteptypetestrun=async (id)=>{
    return await api.get('/deleteptypetestrun/'+id);
}

   const deleteuser=async (id)=>{
    return await api.get('/deleteuser/'+id);
}


const postptypeinformation=async (data)=>{
    return await api.post('/ptypeinformation', data);
}
const updateptypeinformation=async (data)=>{
    return  await api.post('/updateptypeinformation',data);
   }

   const getptypeinformations=async ()=>{
    return  await api.get('/ptypeinformations');
   }

   const deleteptypeinformation=async (id)=>{
    return await api.get('/deleteptypeinformation/'+id);
}



const postblog=async (data)=>{
    return await api.post('/blog', data);
}


const getUsers=async ()=>{
    return await api.get('/users');
}

const updateblog=async (data)=>{
    return  await api.post('/updateblog',data);
   }

   const blogs=async ()=>{
    return  await api.get('/blogs');
   }

   const deleteblog=async (id)=>{
    return await api.get('/deleteblog/'+id);
}

export const repository= {
    payments,
    postblog,
    deleteblog,
    deleteuser,
    blogs,
    updateblog,
    postCategory,
    getCategories,
    postProductType,
    checkUniqe,
    postCompany,
    getCategoriesWithProductTypes,
    ProductsWithCategoryName,
    printingCompanies,
    deleteCategory,
    deleteProductType,
    postproduct,
    products,
    deleteProduct,
    deletePrintingCompanies,

    deletematerial,
    postmaterial,
    getmaterials,

    getprocessings,
    deleteprocessing,
    postprocessing,

    deletefinishingeffect,
    postfinishingeffect,
    getfinishingeffects,

    deletefinishing,
    postfinishing,
    getfinishings,

    updateCategory,
    updateProductType,
    updatePrintingCompany,
    updatefinishing,
    updatefinishingeffect,
    updateprocessing,
    updatematerial,updateProduct,
    getOrders,updateOrder,checkUserEmail,postUser,getOrdersbyUser,paymentsbyUser,updateUser,getOrdersbyPrinting,
    paymentsbyCompany,
    loginuser,
    loginprinting,
    loginadmin,
    createOrder,
    CategoriesComplete,
    deleteptypeinformation,
    getptypeinformations,
updateptypeinformation,
postptypeinformation,
deleteptypetestrun,
getptypetestruns,
updateptypetestrun,
postptypetestrun,
deleteptypematerial,
getptypematerials,
updateptypematerial,
postptypematerial,
deletePtypefinishing,
getPtypefinishings,
updatePtypefinishing,
postPtypefinishings,
getproductTypes,
getUsers
}