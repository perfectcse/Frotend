# Day 33 — Advanced JavaScript
## Topic: Scope, Lexical Scope and Closures

**Challenge:** 2 (Days 31–60)  
**Day:** 33  
**Status:** Learning concepts completed; practical coding exercise pending.

---

## 1. What is Scope in JavaScript?

Scope determines where a variable can be accessed or used in JavaScript.

In simple words, scope defines the accessibility of variables.

JavaScript has three commonly discussed types of scope:

1. Global Scope
2. Function Scope
3. Block Scope

### 1.1 Global Scope

A variable declared outside functions and blocks can be accessed from other scopes within its applicable environment.

Example:

```js
const username = "Vishal";

function showUser() {
  console.log(username);
}

showUser();
console.log(username);
```

Output:

```text
Vishal
Vishal
```

Explanation: Both statements can access the globally declared username variable.

### 1.2 Function Scope

A variable declared inside a function can be accessed within that function, but not outside it.

Example:

```js
function showUser() {
  const username = "Vishal";

  console.log(username);
}

showUser();

console.log(username); // ReferenceError
```

Explanation: username belongs to the function scope.

### 1.3 Block Scope

Variables declared using let and const inside a block `{}` are accessible only within that block.

Example:

```js
if (true) {
  let age = 24;
  const city = "Bengaluru";

  console.log(age);
  console.log(city);
}

console.log(age); // ReferenceError
```

Explanation: let and const are block-scoped.

---

## 2. What is Lexical Scope?

Lexical scope means that a function can access variables based on where the function is defined in the code, not where it is called.

In simple words, JavaScript checks the surrounding code to find variables.

Example:

```js
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
```

Output:

```text
Google
Frontend Developer
```

Explanation:

- company belongs to global scope.
- role belongs to outerFunction scope.
- innerFunction can access both variables.
- Inner functions can access variables from their enclosing lexical scopes.

### Lexical Scope Example — DevCareer OS

```js
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
```

Output:

```text
Vishal
25
5
```

---

## 3. What is a Closure?

A closure happens when an inner function remembers and can access variables from its outer function, even after the outer function has finished executing.

In simple words:

A function remembers the variables from the place where it was created.

Example:

```js
function outerFunction() {
  const message = "Hello Vishal";

  function innerFunction() {
    console.log(message);
  }

  return innerFunction;
}

const result = outerFunction();

result();
```

Output:

```text
Hello Vishal
```

### How Closure Works

1. Call outerFunction().
2. JavaScript creates the message variable.
3. innerFunction is created and remembers its surrounding lexical environment.
4. outerFunction returns innerFunction.
5. outerFunction finishes executing.
6. Calling result() still accesses message.

The closure keeps the required lexical environment available.

---

## 4. Real-World Closure Example — Application Counter

Imagine DevCareer OS needs to count job applications.

```js
function createApplicationCounter() {
  let count = 0;

  return function () {
    count++;
    console.log(count);
  };
}

const addApplication = createApplicationCounter();

addApplication(); // 1
addApplication(); // 2
addApplication(); // 3
```

Output:

```text
1
2
3
```

Explanation:

- count is created inside createApplicationCounter.
- The returned inner function remembers count.
- Each function call increases the same count variable.
- The count remains available even after the outer function finishes.

This is a closure.

---

## 5. Closure Counter Practice — Understanding State

Example:

```js
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
```

Output:

```text
15
20
25
```

Explanation:

The same remembered count variable is updated on every call.

---

## 6. Day 33 — Key Differences

| Concept | Meaning |
|---|---|
| Global Scope | Accessible from different scopes within its applicable environment |
| Function Scope | Variable accessible within its function |
| Block Scope | let and const accessible within their block |
| Lexical Scope | Access depends on where a function is defined |
| Closure | Inner function retains access to its outer lexical environment |

---

## 7. Important Interview Questions

### Q1. What is scope in JavaScript?

Scope determines where variables can be accessed in a program.

### Q2. What are the types of scope?

Global scope, function scope and block scope.

### Q3. What is lexical scope?

Lexical scope means variable access is determined by where a function is defined.

### Q4. What is a closure?

A closure is a function that retains access to its surrounding lexical environment, even after the outer function has finished executing.

### Q5. Why are closures useful?

Closures are useful for:
- Maintaining private state.
- Creating counters.
- Data encapsulation.
- Event handlers.
- Function factories.

### Q6. Does a closure preserve its outer variables?

Yes. A closure retains access to the variables it needs from its surrounding lexical environment.

---

## 8. Practical Exercises

### Exercise 1 — Scope

Predict the output:

```js
const company = "Google";

function showCompany() {
  const role = "Frontend Developer";

  console.log(company);
  console.log(role);
}

showCompany();

console.log(company);
console.log(role);
```

Expected understanding:
- company can be accessed outside and inside the function.
- role cannot be accessed outside showCompany.
- The last statement causes a ReferenceError.

### Exercise 2 — Lexical Scope

Predict the output:

```js
const company = "Microsoft";

function outer() {
  const role = "React Developer";

  function inner() {
    const salary = "5 LPA";

    console.log(company);
    console.log(role);
    console.log(salary);
  }

  inner();
}

outer();
```

Expected output:

```text
Microsoft
React Developer
5 LPA
```

### Exercise 3 — Build Your Own Closure

Complete this function:

```js
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
```

Requirements:
1. Use a closure.
2. Increase count on every call.
3. Print the updated count.
4. Do not use global variables.

**Status:** Pending practical implementation and review.

---

## 9. What We Learned Today

- Scope controls variable accessibility.
- Global scope allows access from multiple applicable scopes.
- Function scope limits variables to their function.
- let and const follow block scope.
- Lexical scope depends on where a function is defined.
- Closures retain access to their outer lexical environment.
- Closures can maintain state between function calls.
- Practical application: job application counter.

---

## 10. Next Learning Session

Day 33 continuation:

1. Complete the application counter exercise.
2. Understand private variables using closures.
3. Practise closure interview questions.
4. Review all Day 33 concepts.
5. Complete notes and Git commit.

Next topic after Day 33: Advanced JavaScript functions and related concepts in the Day 34 roadmap.

---

**Learning Method:**

Learn → Understand → Practice → Build → Test → Explain → Document → Commit.

**Project Context:** DevCareer OS.
**Challenge:** Advanced JavaScript and Full Stack Development — Days 31–60.
