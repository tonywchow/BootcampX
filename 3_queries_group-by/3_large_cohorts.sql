SELECT cohorts.name as cohort_name, count(students.*) AS student_count 
FROM cohorts
JOIN students ON cohorts.id = cohort_id
GROUP BY cohort_name 
HAVING count(students.*) >= 18
ORDER BY student_count;

-- Another solution:
-- SELECT cohorts.name as cohort_name, count(*) as student_count FROM students
-- JOIN cohorts ON cohorts.id = cohort_id
-- GROUP BY cohorts.name
-- HAVING count(*) >= 18
-- ORDER BY student_count ASC;
