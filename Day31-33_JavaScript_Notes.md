# CHALLENGE 2 — ADVANCED JAVASCRIPT NOTES
## Days 31, 32 & 33

Project: DevCareer OS
Learning Path: Challenge 2 — Days 31–60

Learning Workflow:
Learn → Understand → Practice → Build → Test → Explain → Document → Commit

==================================================
# DAY 31 — ADVANCED JAVASCRIPT ARRAY METHODS
==================================================

## 1. map()

Definition:
map() transforms every element of an array and returns a new array.

Example:

const salaries = [5, 8, 10];

const result = salaries.map((salary) => salary * 2);

console.log(result);

Output:
[10, 16, 20]

Use: Transforming array values.

## 2. filter()

Definition:
filter() returns a new array containing elements that satisfy a condition.

Example:

const salaries = [5, 8, 10, 12];

const result = salaries.filter((salary) => salary >= 10);

console.log(result);

Output:
[10, 12]

Use: Filtering job applications based on salary, status, etc.

## 3. find()

Definition:
find() returns the first element that satisfies a condition.

Example:

const applications = [
  { company: "Google", status: "Applied" },
  { company: "Amazon", status: "Interview" }
];

const result = applications.find(
  (app) => app.status === "Interview"
);

console.log(result);

Output:
{ company: "Amazon", status: "Interview" }

If no element matches, find() returns undefined.

## 4. findIndex()

Definition:
findIndex() returns the index of the first matching element.

Example:

const numbers = [10, 20, 30];

const result = numbers.findIndex((num) => num === 20);

console.log(result);

Output:
1

If no element matches, it returns -1.

## 5. some()

Definition:
some() checks whether at least one element satisfies a condition.

Example:

const scores = [40, 55, 75];

console.log(scores.some((score) => score >= 70));

Output:
true

## 6. every()

Definition:
every() checks whether all elements satisfy a condition.

Example:

const scores = [70, 80, 90];

console.log(scores.every((score) => score >= 60));

Output:
true

## 7. Spread Syntax (...)

Definition:
Spread syntax expands array elements or object properties.

Example — Copying an array:

const original = [10, 20, 30];

const copied = [...original];

console.log(copied);

Output:
[10, 20, 30]

Combining arrays:

const first = [1, 2];
const second = [3, 4];

const combined = [...first, ...second];

console.log(combined);

Output:
[1, 2, 3, 4]

Note: Spread syntax creates shallow copies.

## 8. Destructuring

Definition:
Destructuring extracts values from arrays or properties from objects.

Example:

const application = {
  company: "Google",
  status: "Applied"
};

const { company, status } = application;

console.log(company);
console.log(status);

Output:
Google
Applied

## DAY 31 — QUICK COMPARISON

map()       — Transforms every element.
filter()    — Returns matching elements.
find()      — Returns the first matching element.
findIndex() — Returns the index of the first match.
some()      — Checks whether at least one matches.
every()     — Checks whether all match.
Spread      — Expands or copies values (shallowly).
Destructuring — Extracts values or object properties.

Practical learning:
We used job application and salary data to practise filtering and combining conditions.

Day 31 Status: COMPLETED.


==================================================
# DAY 32 — JAVASCRIPT REDUCE()
==================================================

## 1. What is reduce()?

Definition:
reduce() processes array elements and accumulates them into one final result.

Syntax:

array.reduce((acc, currentValue) => {
  return acc;
}, initialValue);

Important terms:

acc:
Accumulator. Stores the result built so far.

currentValue:
The current array element being processed.

initialValue:
The starting value of the accumulator.

return acc:
Passes the updated accumulator to the next iteration.

## 2. Calculate Array Sum

Example:

const numbers = [10, 20, 30, 40];

const total = numbers.reduce((acc, number) => {
  return acc + number;
}, 0);

console.log(total);

Output:
100

Explanation:
The accumulator starts at 0 and adds every number.

## 3. Count Application Statuses

Example:

const applications = [
  { company: "Google", status: "Applied" },
  { company: "Amazon", status: "Interview" },
  { company: "Microsoft", status: "Applied" },
  { company: "TCS", status: "Rejected" },
  { company: "Infosys", status: "Interview" }
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

Output:

{
  Applied: 2,
  Interview: 2,
  Rejected: 1
}

Explanation:
The accumulator is an object.
Each application status becomes an object property.
Its value stores the number of applications with that status.

## 4. Calculate Dashboard Statistics

Example:

const applications = [
  { company: "Google", salary: 10 },
  { company: "Amazon", salary: 15 },
  { company: "Microsoft", salary: 12 },
  { company: "TCS", salary: 8 },
  { company: "Infosys", salary: 18 }
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

Output:

{
  totalApplications: 5,
  totalSalary: 63
}

Explanation:
One reduce() operation calculates two statistics:
- Total applications.
- Total salary.

## 5. Group Companies by Application Status

Example:

const applications = [
  { company: "Google", status: "Applied" },
  { company: "Amazon", status: "Interview" },
  { company: "Microsoft", status: "Applied" },
  { company: "TCS", status: "Rejected" },
  { company: "Infosys", status: "Interview" },
  { company: "Wipro", status: "Applied" }
];

const result = applications.reduce((acc, app) => {
  if (acc[app.status]) {
    acc[app.status].push(app.company);
  } else {
    acc[app.status] = [app.company];
  }

  return acc;
}, {});

console.log(result);

Output:

{
  Applied: ["Google", "Microsoft", "Wipro"],
  Interview: ["Amazon", "Infosys"],
  Rejected: ["TCS"]
}

Explanation:

1. The accumulator starts as an empty object.
2. acc[app.status] checks whether a status group exists.
3. If it exists, push() adds the company.
4. Otherwise, a new array is created.
5. return acc passes the updated object to the next iteration.

## DAY 32 — INTERVIEW QUESTIONS

Q1. What is reduce()?

Answer:
reduce() processes array elements and builds a single accumulated result.

Q2. What is an accumulator?

Answer:
The accumulator stores the result built so far and carries it between iterations.

Q3. Why do we return acc?

Answer:
The returned accumulator becomes the accumulator value for the next iteration.

Q4. Why use {} as the initial value?

Answer:
Because we want to build an object containing grouped data or statistics.

Day 32 Status: COMPLETED.


==================================================
# DAY 33 — SCOPE, LEXICAL SCOPE AND CLOSURES
==================================================

## 1. What is Scope?

Definition:
Scope determines where a variable can be accessed in JavaScript.

Three commonly discussed types:

1. Global Scope.
2. Function Scope.
3. Block Scope.

## 2. Global Scope

Definition:
A variable declared outside functions and blocks is accessible within its applicable lexical environment.

Example:

const username = "Vishal";

function showUser() {
  console.log(username);
}

showUser();

console.log(username);

Output:

Vishal
Vishal

Explanation:
The username variable can be accessed inside and outside the function.

## 3. Function Scope

Definition:
A variable declared inside a function is accessible within that function, not outside it.

Example:

function showUser() {
  const username = "Vishal";

  console.log(username);
}

showUser();

console.log(username);

Output:
ReferenceError

Explanation:
username belongs to showUser() function scope.

## 4. Block Scope

Definition:
Variables declared using let and const inside a block are accessible only within that block.

Example:

if (true) {
  let age = 24;
  const city = "Bengaluru";

  console.log(age);
  console.log(city);
}

console.log(age);

Output:
ReferenceError

Explanation:
age and city are block-scoped variables.

## 5. What is Lexical Scope?

Definition:
Lexical scope means variable access is determined by where a function is defined in the source code.

Example:

const company = "Google";

function outerFunction() {
  const role = "Frontend Developer";

  function innerFunction() {
    console.log(company);
    console.log(role);
  }

  innerFunction();
}

outerFunction();

Output:

Google
Frontend Developer

Explanation:
The inner function can access:
- company from global scope.
- role from outerFunction scope.

## 6. DevCareer OS Lexical Scope Example

const user = "Vishal";

function dashboard() {
  const totalApplications = 25;

  function showStats() {
    const interviews = 5;

    console.log(user);
    console.log(totalApplications);
    console.log(interviews);
  }

  showStats();
}

dashboard();

Output:

Vishal
25
5

Explanation:
The inner function can access variables from its enclosing scopes.

## 7. What is a Closure?

Definition:
A closure happens when a function retains access to variables from its surrounding lexical environment, even after the outer function has finished executing.

Simple explanation:
A function remembers variables from the place where it was created.

Example:

function outerFunction() {
  const message = "Hello Vishal";

  function innerFunction() {
    console.log(message);
  }

  return innerFunction;
}

const result = outerFunction();

result();

Output:
Hello Vishal

Explanation:
The returned inner function retains access to message.

## 8. How Closure Works

Step 1:
outerFunction() is called.

Step 2:
The message variable is created.

Step 3:
innerFunction is created and can access the outer lexical environment.

Step 4:
outerFunction returns innerFunction.

Step 5:
The outer function finishes executing.

Step 6:
Calling result() can still access message.

Important:
A closure retains access to its lexical environment. It does not mean all outer variables are necessarily copied.

## 9. Real-World Closure — Application Counter

Example:

function createApplicationCounter() {
  let count = 0;

  return function () {
    count++;
    console.log(count);
  };
}

const addApplication = createApplicationCounter();

addApplication();
addApplication();
addApplication();

Output:

1
2
3

Explanation:
The returned inner function remembers count.
Every call updates the same count variable.

## 10. Closure — Increment by Five

Example:

function createCounter() {
  let count = 10;

  return function () {
    count += 5;
    console.log(count);
  };
}

const counter = createCounter();

counter();
counter();
counter();

Output:

15
20
25

Explanation:
The closure retains access to the same count variable.
Every call adds another five.

## DAY 33 — IMPORTANT INTERVIEW QUESTIONS

Q1. What is scope in JavaScript?

Answer:
Scope determines where variables can be accessed.

Q2. What are the common types of scope?

Answer:
Global scope, function scope and block scope.

Q3. What is lexical scope?

Answer:
Lexical scope means variable access is determined by where a function is defined.

Q4. What is a closure?

Answer:
A closure is a function together with its retained access to the surrounding lexical environment.

Q5. Why are closures useful?

Answer:
Closures can maintain private state, support data encapsulation and create function factories and callbacks.

Q6. Does a closure retain access after the outer function returns?

Answer:
Yes. While the closure remains reachable, it retains access to the relevant lexical environment.

## DAY 33 — INDEPENDENT CODING EXERCISE (PENDING)

Complete this exercise independently:

function createApplicationCounter() {
  let count = 0;

  return function () {
    // Increase count by 1.
    // Print the updated count.
  };
}

const applications = createApplicationCounter();

applications(); // 1
applications(); // 2
applications(); // 3
applications(); // 4

Requirements:

1. Use a closure.
2. Increase count by one on every call.
3. Print the updated count.
4. Do not use a global variable for the counter.
5. Explain why count remains accessible after the outer function returns.

Day 33 Status:
Concepts covered.
Independent coding exercise pending.
Final review pending.


==================================================
# COMBINED LEARNING PROGRESS
==================================================

Day 31 — Advanced Array Methods:
COMPLETED

Day 32 — JavaScript reduce():
COMPLETED

Day 33 — Scope, Lexical Scope and Closures:
CONCEPTS COVERED.
INDEPENDENT EXERCISE PENDING.

## NEXT LEARNING SESSION

1. Complete the Day 33 application-counter exercise.
2. Review closures and private state.
3. Practise closure interview questions.
4. Complete Day 33 notes and review.
5. Continue to Day 34 according to the Challenge 2 roadmap.

## PROJECT CONTEXT

DevTrack:
Completed Days 1–30 project. Keep unchanged.

DevCareer OS:
Separate full-stack project for Challenge 2.

## LEARNING METHOD

Learn → Understand → Practice → Build → Test → Explain → Document → Commit

END OF DAY 31–33 NOTES
