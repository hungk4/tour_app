import exp from "constants";
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
   process.env.DATABASE_NAME, // ten database
   process.env.DATABASE_USERNAME,// username
   process.env.DATABASE_PASSWORD, // password
    {
      host: process.env.DATABASE_HOST,
      dialect: 'mysql'
    }
  );

sequelize.authenticate().then(() => {
   console.log('Kết nối database thành công !!!');
}).catch((error) => {
   console.error('Kết nối database thất bại !!!', error);
});

export default sequelize;