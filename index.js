class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {
    if (!this.isAllowed()) return false;
    this.time = new Date();
    this.account.addTransaction(this);
    return true;
  }
}

// Deposit subclass
class Deposit extends Transaction {
  get value() {
    return this.amount;
  }

  isAllowed() {
    return true;
  }
}

// Withdrawal subclass
class Withdrawal extends Transaction {
  get value() {
    return -this.amount;
  }

  isAllowed() {
    return this.account.balance >= this.amount;
  }
}

// Account class
class Account {
  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    return this.transactions.reduce((sum, transaction) => {
      return sum + transaction.value;
    }, 0);
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}

// Driver Code
const myAccount = new Account("snow-patrol");

console.log("Starting balance:", myAccount.balance.toFixed(2));

const t1 = new Deposit(100.0, myAccount);
t1.commit();
console.log("Deposit 100:", myAccount.balance.toFixed(2));

const t2 = new Withdrawal(30.0, myAccount);
t2.commit();
console.log("Withdraw 30:", myAccount.balance.toFixed(2));

const t3 = new Withdrawal(100.0, myAccount); // This should fail if not enough balance
const result = t3.commit();
console.log("Attempt to withdraw 100:", result ? "Success" : "Failed");
console.log("Final balance:", myAccount.balance.toFixed(2));

// Print transaction history
console.log("\nTransaction History:");
myAccount.transactions.forEach((t, i) => {
  console.log(
    `${i + 1}. ${t.constructor.name} of $${Math.abs(t.value).toFixed(2)} on ${t.time.toLocaleString()}`
  );
});


// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected
t1 = new Withdrawal(50.25, myAccount);
t1.commit();

t2 = new Withdrawal(100, myAccount);
t2.commit();
