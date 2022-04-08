const Daos = require("../models/daos/factoryDb");

//Clase contenedora de productos
const productos = Daos.productos;

//Logs
const logs = require("../logs/loggers");
const loggerError = logs.getLogger("error");

const getPtosService = async () => {
  try {
    const response = await productos.getAll();
    if (response) return response;
  } catch (error) {
    throw Error("Error en getPtosService");
  }
};

const getPtoIdService = async (id) => {
  try {
    const ptoId = await productos.getById(id);
    //Me fijo si existe el PTO con el ID solicitado
    if (Object.keys(ptoId).length != 0) {
      //Pto con ID solicitado encontrado, envio respuesta
      return { estado: "ok", producto: ptoId };
    } else {
      //Pto con ID solicitado NO encontrado, envio error
      return { estado: "ptoFalse" };
    }
  } catch (error) {
    loggerError.error(error);
    throw Error("Error en getPtoIdService");
  }
};

const getPtoCatSevice = async (category) => {
  try {
    const ptosCat = await productos.getByCategory(category);

    //Me fijo si existen productos con la categoria solicitada
    if (Object.keys(ptosCat).length != 0) {
      //Ptos con categoria solicitada encontrado, envio respuesta
      return { estado: "ok", productos: ptosCat };
    } else {
      //Ptos con categoria solicitada NO encontrado, envio error
      return { estado: "categoryFalse" };
    }
  } catch (error) {
    loggerError.error(error);
    throw Error("Error en getPtoCatSevice");
  }
};

const createPtoService = async (newPto) => {
  try {
    const addPto = await productos.add(newPto);
    return addPto;
  } catch (error) {
    loggerError.error(error);
    throw Error("Error en createPtoService");
  }
};

const updatePtoService = async (ptoMod, id) => {
  try {
    //Me fijo si existe el PTO con el ID solicitado
    let flag = await productos.getById(id);
    if (Object.keys(flag).length != 0) {
      //Pto con ID solicitado encontrado
      //Modifico el PTO con el ID solicitado, y envio respuesta
      const pto = await productos.editById(id, ptoMod);
      return { estado: "ok", producto: pto };
    } else {
      //Pto con ID solicitado NO encontrado, envio error
      return { estado: "ptoFalse" };
    }
  } catch (error) {
    loggerError.error(error);
    throw Error("Error en put modificacion productos");
  }
};

const deletePtoService = async (id) => {
  try {
    //Me fijo si existe el PTO con el ID solicitado
    let flag = await productos.getById(id);

    if (Object.keys(flag).length != 0) {
      //Pto con ID solicitado encontrado
      //Borro el PTO con el ID solicitado, y envio respuesta
      await productos.deleteById(id);
      const ptosAll = await productos.getAll();
      return { estado: "ok", productos: ptosAll };
    } else {
      //PTO con ID no encontrado, envio error
      return { estado: "ptoFalse" };
    }
  } catch (error) {
    loggerError.error(error);
    throw Error("Error en deletePtoService");
  }
};

module.exports = {
  getPtosService,
  getPtoIdService,
  getPtoCatSevice,
  createPtoService,
  updatePtoService,
  deletePtoService,
};
