import { Request, Response } from "express"
import Tour from "../../models/tour.model";

import sequelize from "../../config/database";
import { QueryTypes } from "sequelize";


// [GET] /tours/:slugCategory
export const index = async (req: Request, res: Response) => {
  /*
    SELECT tours.*, price * (1 - discount/100) AS price_special
    FROM tours
    JOIN tours_categories ON tours.id = tours_categories.tour_id
    JOIN categories ON tours_categories.category_id = categories.id
    WHERE
      categories.slug = 'du-lich-trong-nuoc'
      AND categories.deleted = false
      AND categories.status = 'active'
      AND tours.deleted = false
      AND tours.status = 'active';
  */
    const slugCategory = req.params.slugCategory;

    const tours = await sequelize.query(`
      SELECT tours.*, ROUND(price * (1 - discount/100)) AS price_special
      FROM tours
      JOIN tours_categories ON tours.id = tours_categories.tour_id
      JOIN categories ON tours_categories.category_id = categories.id
      WHERE
        categories.slug = '${slugCategory}'
        AND categories.deleted = false
        AND categories.status = 'active'
        AND tours.deleted = false
        AND tours.status = 'active';
    `, {
      type: QueryTypes.SELECT,
    });

    for(const item of tours) {
      if(item["images"]){
        const arrayImage = JSON.parse(item["images"]);
        if(arrayImage.length > 0 ){
          item["image"] = arrayImage[0];
        }
      }

      item["price_special"] = parseInt(item["price_special"]);
    }

    
    res.render("client/pages/tours/index", {
      pageTitle: "Danh sách tour",
      tours: tours
    });
}

// [GET] /tours/detail/:slugTour
export const detail = async (req: Request, res: Response) => {
  const slugTour = req.params.slugTour;

  const tour = await Tour.findOne({
    where: {
      slug: slugTour,
      deleted: false
    },
    raw: true
  });

  const price_special = (1 - tour["discount"] / 100) * tour["price"];
  tour["price_special"] = parseInt(`${price_special}`);


  if(tour["images"]) {
    tour["images"] = JSON.parse(tour["images"]);
  }
  
  res.render("client/pages/tours/detail", {
    pageTitle: "Chi tiết tour",
    tour: tour
  })
}