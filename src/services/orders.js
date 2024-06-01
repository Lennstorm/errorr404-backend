import nedb from "nedb-promises";

const database = new nedb( {filename: "orders.db", autoload: true });

export const createOrder = async (order) => {
    return database.insert(order);
};

export const getAllOrders = async () => {
    return database.find({});
};

export const getOrderById = async (id) => {
    return database.findOne({ _id: id});
};