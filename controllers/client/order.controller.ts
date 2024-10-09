import { Request, Response } from "express";
import Order from "../../models/order.model";
import Tour from "../../models/tour.model";
import { generateOrderCode } from "../../helpers/generate.helper";
import OrderItem from "../../models/order-item.model";
// [POST] /order
export const index = async (req: Request, res: Response) => {
  const data = req.body;

  // luu data vao bang orders
  const dataOrders = {
    code: "",
    fullName: data.info.fullName,
    phone: data.info.phone,
    note: data.info.note,
    status: "initial"
  };
  
  const order = await Order.create(dataOrders);
  const orderId = order.dataValues.id;
  const code = generateOrderCode(orderId);

  await Order.update({
    code: code
  }, {
    where: {
      id: orderId
    }
  })
  // het luu bang orders
  
  // luu data vao bang order_item
  const cart = data.cart;
  for(const item of cart){
    const infoTour = await Tour.findOne({
      where: {
        id: item.tourId,
        deleted: false,
        status: 'active'
      },
      raw: true
    });

    let dataItem = {
      orderId: orderId,
      tourId: item.tourId,
      quantity: item.quantity,
      price: infoTour["price"],
      discount: infoTour["discount"],
      timeStart: infoTour["timeStart"]
    }

    await OrderItem.create(dataItem)
  }
  // het luu data vao bang order_item
  res.json({
    code: 200,
    message: "Đặt hàng thành công!",
    // orderCode: code
  });
};