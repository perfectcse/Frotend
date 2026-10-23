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
