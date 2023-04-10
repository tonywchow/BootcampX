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
SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort
FROM assistance_requests
JOIN teachers ON teachers.id = teacher_id
JOIN students ON students.id = student_id
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name LIKE $1
ORDER BY teacher;`;

const cohortName = process.argv[2] || "JUL02";
//Store all potentially malicious values in an array.
const values = [`%${cohortName}%`];

client
  .query(queryString, values)
  .then((res) => {
    // console.log(res.rows);
    res.rows.forEach((row) => {
      console.log(`${row.cohort}: ${row.teacher}`);
    });
  })
  .catch((err) => console.error("query error", err));
