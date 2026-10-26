# Challenge 2 --- Day 31 Notes

## Advanced JavaScript: Array & Object Mastery

**Status:** Completed

## 1. Array Methods Overview

  -----------------------------------------------------------------------
  Method                  Purpose                 Returns
  ----------------------- ----------------------- -----------------------
  `map()`                 Transform every element A new array

  `filter()`              Keep elements that      A new array
                          satisfy a condition     

  `find()`                Find the first matching Element or `undefined`
                          element                 

  `findIndex()`           Find the index of the   Index or `-1`
                          first matching element  

  `some()`                Check whether at least  Boolean
                          one element matches     

  `every()`               Check whether all       Boolean
                          elements match          
  -----------------------------------------------------------------------

### `map()` vs `filter()`

Use `map()` to transform every element. Use `filter()` to select
elements that satisfy a condition.

``` javascript
const numbers = [1, 2, 3, 4];

const doubled = numbers.map((number) => number * 2);
console.log(doubled); // [2, 4, 6, 8]

const evenNumbers = numbers.filter((number) => number % 2 === 0);
console.log(evenNumbers); // [2, 4]
```

### Chaining `filter()` and `map()`

``` javascript
const applications = [
  { company: "Google", status: "Applied", salary: 8 },
  { company: "Amazon", status: "Interview", salary: 12 },
  { company: "Microsoft", status: "Applied", salary: 10 },
  { company: "Adobe", status: "Selected", salary: 15 },
];

const appliedCompanies = applications
  .filter((app) => app.status === "Applied")
  .map((app) => app.company);

console.log(appliedCompanies); // ["Google", "Microsoft"]
```

First, `filter()` selects matching applications. Then `map()` extracts
the company names.

## 2. `find()` vs `findIndex()`

-   `find()` returns the first matching element.
-   `findIndex()` returns the index of the first matching element.
-   Array indexes start at `0`.

``` javascript
const applications = [
  { company: "Google", status: "Applied" },
  { company: "Amazon", status: "Interview" },
  { company: "Microsoft", status: "Applied" },
];

const result1 = applications.find((app) => app.status === "Applied");
const result2 = applications.findIndex((app) => app.status === "Applied");

console.log(result1); // { company: "Google", status: "Applied" }
console.log(result2); // 0
```

If there is no match, `find()` returns `undefined` and `findIndex()`
returns `-1`.

## 3. `some()` vs `every()`

-   `some()` returns `true` if at least one element satisfies the
    condition.
-   `every()` returns `true` only if all elements satisfy the condition.

``` javascript
const scores = [75, 82, 45, 90];

const result1 = scores.some((score) => score >= 80);
const result2 = scores.every((score) => score >= 80);

console.log(result1); // true
console.log(result2); // false
```

## 4. Spread Syntax for Objects

The spread syntax (`...`) copies enumerable properties into a new
object. Later properties can override copied values.

``` javascript
const application = {
  company: "Google",
  status: "Applied",
  salary: 8,
};

const updatedApplication = {
  ...application,
  status: "Interview",
};

console.log(updatedApplication);
// { company: "Google", status: "Interview", salary: 8 }

console.log(application.status); // "Applied"
```

The original object remains unchanged in this example. Note that spread
syntax creates a shallow copy, so nested objects may still share
references.

## 5. Object Destructuring

Destructuring extracts properties from an object into variables.

``` javascript
const updatedApplication = {
  company: "Google",
  status: "Interview",
  salary: 8,
};

const { company, salary } = updatedApplication;

console.log(company); // "Google"
console.log(salary);  // 8
```

## 6. Combining Conditions with `&&`

The logical AND operator (`&&`) requires both conditions to be true.

Filter applications where the status is `"Applied"` and salary is at
least 8 LPA:

``` javascript
const result = applications.filter(
  (app) => app.status === "Applied" && app.salary >= 8
);
```

For the sample data, Google and Microsoft match both conditions.

### Salary-based filtering and mapping

Find company names where salary is at least 10 LPA:

``` javascript
const result = applications
  .filter((app) => app.salary >= 10)
  .map((app) => app.company);

console.log(result); // ["Amazon", "Microsoft", "Adobe"]
```

**Common mistake to avoid:** Make sure your filter condition matches the
requirement. Filtering by status is not the same as filtering by salary.

## 7. Key Takeaways

1.  `map()` transforms elements; `filter()` selects elements.
2.  `find()` returns an element; `findIndex()` returns its index.
3.  `some()` checks whether at least one item matches; `every()` checks
    whether all items match.
4.  Spread syntax copies object properties into a new object; later
    properties can override earlier ones.
5.  Destructuring extracts object properties into variables.
6.  Use `&&` when all specified conditions must be true.
7.  Method chaining can make data-processing code concise and readable.

## 8. Quick Interview Revision

**Q: What is the difference between `map()` and `filter()`?**\
A: `map()` transforms every element and returns a new array. `filter()`
returns a new array containing elements that pass a condition.

**Q: What is the difference between `find()` and `findIndex()`?**\
A: `find()` returns the first matching element, while `findIndex()`
returns its index.

**Q: What is the difference between `some()` and `every()`?**\
A: `some()` checks whether at least one element passes the condition.
`every()` checks whether all elements pass it.

**Q: What does object spread syntax do?**\
A: It copies enumerable properties into a new object; later properties
can override earlier ones.

**Q: What does object destructuring do?**\
A: It extracts selected properties from an object into variables.

**Q: How do you require two conditions to be true in a filter?**\
A: Combine the conditions with `&&`.

## Day 31 Completion Checklist

-   [x] Revised `map()` and `filter()`
-   [x] Practiced `find()` and `findIndex()`
-   [x] Practiced `some()` and `every()`
-   [x] Reviewed spread syntax and destructuring
-   [x] Filtered job applications using salary conditions
-   [x] Combined status and salary conditions with `&&`

**Next session:** Day 32 --- continue JavaScript array/object practice,
including `reduce()`, grouping data, and calculating application
statistics.

# Day 32 Notes --- JavaScript `reduce()`

## Challenge 2: Day 32/60

**Topic:** `reduce()`, accumulators, counting by status, and dashboard
statistics.

## 1. What does `reduce()` do?

`reduce()` processes an array and combines its elements into one result.
The result can be a number, object, array, or another value.

### Example: Sum numbers

``` javascript
const numbers = [10, 20, 30, 40];

const total = numbers.reduce((sum, number) => {
  return sum + number;
}, 0);

console.log(total); // 100
```

-   `sum`: accumulator that stores the running result.
-   `number`: current array element.
-   `0`: initial accumulator value.
-   `return sum + number`: updates the running total.

## 2. Count applications by status

``` javascript
const applications = [
  { company: "Google", status: "Applied" },
  { company: "Microsoft", status: "Interview" },
  { company: "Amazon", status: "Applied" },
  { company: "Adobe", status: "Rejected" },
  { company: "Infosys", status: "Interview" },
];

const result = applications.reduce((acc, app) => {
  if (acc[app.status]) {
    acc[app.status] += 1;
  } else {
    acc[app.status] = 1;
  }

  return acc;
}, {});

console.log(result);
// { Applied: 2, Interview: 2, Rejected: 1 }
```

### Shorter alternative

``` javascript
const result = applications.reduce((acc, app) => {
  acc[app.status] = (acc[app.status] || 0) + 1;
  return acc;
}, {});
```

Both approaches are valid. The `if/else` version can be easier to
explain while learning.

## 3. Calculate multiple statistics in one pass

``` javascript
const applications = [
  { company: "Google", status: "Applied", salary: 12 },
  { company: "Microsoft", status: "Interview", salary: 15 },
  { company: "Amazon", status: "Applied", salary: 18 },
  { company: "Adobe", status: "Rejected", salary: 10 },
  { company: "Infosys", status: "Interview", salary: 8 },
];

const stats = applications.reduce((acc, app) => {
  acc.totalApplications += 1;
  acc.totalSalary += app.salary;
  return acc;
}, {
  totalApplications: 0,
  totalSalary: 0
});

console.log(stats);
// { totalApplications: 5, totalSalary: 63 }
```

-   `acc.totalApplications += 1` counts each record.
-   `acc.totalSalary += app.salary` adds each salary to the running
    total.
-   The initial object sets both starting values to `0`.
-   If salary values are in LPA, the total is 63 LPA.

## 4. Important `reduce()` pattern

``` javascript
const result = array.reduce((accumulator, currentItem) => {
  // Update the accumulator
  return accumulator;
}, initialValue);
```

Remember: 1. Choose the correct initial value: `0` for a numeric total,
`{}` for a counting object, or `[]` for an array result. 2. Update the
accumulator on every iteration. 3. Return the accumulator. 4. `reduce()`
returns the final accumulated result.

## 5. Day 32 progress

Completed: - Used `reduce()` to calculate a numeric total. - Counted job
applications by status. - Calculated total applications and total salary
in one pass. - Explained the accumulator and initial value.

Still to practice: - Group company names into arrays by status using
`reduce()` and `.push()`. This final grouping exercise was not completed
in this session.

## 6. Interview questions

**Q1. What is `reduce()` used for?**\
It processes array elements to build an accumulated result, such as a
sum, object, or grouped structure.

**Q2. What is an accumulator?**\
It stores the running result as `reduce()` processes each element.

**Q3. Why provide an initial value?**\
It defines the starting accumulator value and makes the result more
predictable, especially for empty arrays.

**Q4. Can `reduce()` return an object?**\
Yes. It can build objects for counting, grouping, or calculating
multiple statistics.

**Q5. How is `reduce()` different from `map()`?**\
`map()` transforms each array element and returns a new array.
`reduce()` accumulates elements into a result that can be a number,
object, array, or another value.

## Next session

Start by reviewing the grouping exercise, then continue with the Day
31--60 roadmap in order. Do not jump ahead until the current task is
understood.
