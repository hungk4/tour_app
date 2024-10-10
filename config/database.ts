import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
   process.env.DATABASE_NAME, // ten database
   process.env.DATABASE_USERNAME,// username
   process.env.DATABASE_PASSWORD, // password
    {
      host: process.env.DATABASE_HOST,
      dialect: 'mysql',
      logging: false
    }
  );

sequelize.authenticate().then(() => {
   console.log('Kết nối database thành công !!!');
}).catch((error) => {
   console.error('Kết nối database thất bại !!!');
});

export default sequelize;