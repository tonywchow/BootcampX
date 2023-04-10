const { Client } = require("pg");

const client = new Client({
  user: "vagrant",
  password: "123",
  host: "localhost",
  database: "bootcampx",
  port: 5432,
});

client.connect().then(() => {
  console.log("Connected to database!");
});

const queryString = `
SELECT students.id as student_id, students.name as name, cohorts.name as cohort
FROM students
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name LIKE $1
LIMIT $2;
`;
const cohortName = process.argv[2];
const limit = process.argv[3] || 5;
//Store all potentially malicious values in an array.
const values = [`%${cohortName}%`, limit];

client
  .query(queryString, values)
  .then((res) => {
    // console.log(res.rows);
    res.rows.forEach((user) => {
      console.log(
        `${user.name} has an id of ${user.student_id} and was in the ${user.cohort} cohort`
      );
    });
  })
  .catch((err) => console.error("query error", err.stack));
