const applications = [
  { company: "Google", status: "Applied", salary: 8 },
  { company: "Amazon", status: "Interview", salary: 12 },
  { company: "Microsoft", status: "Applied", salary: 10 },
  { company: "Adobe", status: "Selected", salary: 15 },
];

const appliedCompanies = applications
  .filter((app) => app.status === "Applied")
  .map((app) => app.company);

console.log(appliedCompanies);

✅ Correct! Day 31 — Task 1 completed.

Your answer B) Google and Microsoft is correct.

Your reasoning is also correct. Let's trace the code:
1. filter() keeps only applications where status === "Applied" — Google and Microsoft.
2. map() extracts the company property from each remaining object.
3. The final output is:

Interview tip: Remember that filter() selects elements, while map() transforms each element. Chaining them lets you select the data you need and then reshape it.