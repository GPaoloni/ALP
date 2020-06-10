import * as mongoose from 'mongoose';
// import * as chalk from 'chalk';

beforeAll(async () => {
  const url = `mongodb://127.0.0.1/haskode-db`;
  await mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  });
  // console.log(chalk.bgGrey('\n\n Connected to database \n\n'));
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  // console.log(chalk.bgGrey('\n\n Cleared db and disconnected \n\n'));
});
