# Tax Fraud Detection using Benford´s Law

You probably have heard that many companies are manipulating their financial data in order to maximize their profits by lowering the tax base. They may do so in different ways, for example by maximizing their tax-deductible expenses, so that the final amount to pay the taxes on is considerably low. That means that companies may manipulate their financial data to get the tax advantage, which is a form of a fraud.

One of the modern approaches that auditors are currently using to detect the tax fraud is to check if the financial data is conforming to so-called Benford’s Law. According to this law the unmanipulated data should always be Benford conform, which means the following: 

- Digit 1 as a first digit of the number should appear approx. 30% of the time
- Digit 2 as a first digit of the number should appear approx. 17% of the time
- Digit 3 as a first digit of the number should appear approx. 12% of the time
- Digit 4 as a first digit of the number should appear approx. 9% of the time
- and so on. 

---

## Your Task:

You will receive two tables which are per se Benford conform. 
Your task is to manipulate as much numbers as possible in a way that the total revenues will be lowered by exactly 15% (-15%). The change of total revenues and percentages are calculated automatically.

After all we will check if the changed tables are still Benford conform or not.

Please try your best to manipulate as much numbers as possible keeping in mind the Benford´s Law.