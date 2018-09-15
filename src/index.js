class SmartCalculator {
  constructor(initialValue) {
    // your implementation
    this.stack = [initialValue];
    this.lowPriorityOperations = ["+", "-"];
    this.middleLevelPriorityOperations = ["*", "/"];
    this.highPriorityOperations = ["^"];
    this.operations = this.lowPriorityOperations.concat(this.middleLevelPriorityOperations).concat(this.highPriorityOperations)
    this.operationsFunctions = {
      "+": (f, s) => f + s,
      "-": (f, s) => f - s,
      "*": (f, s) => f * s,
      "/": (f, s) => f / s,
      "^": (f, s) => Math.pow(f, s)
    }
  }

  add(number) {
    // your implementation
    this.stack.push(number)
    this.stack.push("+")
    return this;
  }

  subtract(number) {
    // your implementation
    this.stack.push(number)
    this.stack.push("-")
    return this;
  }

  multiply(number) {
    // your implementation
    var lastIndex = this.stack.length - 1;
    if (!this.lowPriorityOperations.includes(this.stack[lastIndex]) || Number.isInteger(this.stack[lastIndex])) {
      this.stack.push(number)
      this.stack.push("*")
    } else {
      var tmpArray = [];
      while (!Number.isInteger(this.stack[lastIndex]) && this.lowPriorityOperations.includes(this.stack[lastIndex])) {
        tmpArray.push(this.stack.pop())
        lastIndex -= 1;
      }
      this.stack.push(number)
      this.stack.push("*")
      this.stack = this.stack.concat(tmpArray.reverse());
    }
    return this;
  }

  devide(number) {
    // your implementation
    var lastIndex = this.stack.length - 1;
    if (!this.lowPriorityOperations.includes(this.stack[lastIndex]) || Number.isInteger(this.stack[lastIndex])) {
      this.stack.push(number)
      this.stack.push("/")
    } else {
      var tmpArray = [];
      while (!Number.isInteger(this.stack[lastIndex]) && this.lowPriorityOperations.includes(this.stack[lastIndex])) {
        tmpArray.push(this.stack.pop())
        lastIndex -= 1;
      }
      this.stack.push(number)
      this.stack.push("/")
      this.stack = this.stack.concat(tmpArray.reverse());
    }

    return this;
  }

  pow(number) {
    // your implementation
    var lastIndex = this.stack.length - 1;
    var tmpArray = [];
    while (!Number.isInteger(this.stack[lastIndex])) {
      tmpArray.push(this.stack.pop())
      lastIndex -= 1;
    }
    this.stack.push(number)
    this.stack.push("^")
    this.stack = this.stack.concat(tmpArray.reverse());
    return this;
  }

  toString() {
    var calculationStack = [this.stack.shift()];
    while (this.stack.length > 0 || calculationStack.length > 1) {
      let value = calculationStack[calculationStack.length - 1];
      if (this.operations.includes(value)) {
        let operation = calculationStack.pop();
        let second = calculationStack.pop();
        let first = calculationStack.pop();
        calculationStack.push(this.operationsFunctions[operation](first, second));
      }
      if (this.stack.length > 0) {
        calculationStack.push(this.stack.shift());
      }
    }
    return calculationStack.pop();
  }
}

module.exports = SmartCalculator;