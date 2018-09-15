class SmartCalculator {
  constructor(initialValue) {
    this.stack = [initialValue];
    this.operations = {
      "+": {priority: 1, func: (f, s) => f + s},
      "-": {priority: 1, func: (f, s) => f - s},
      "*": {priority: 2, func: (f, s) => f * s},
      "/": {priority: 2, func: (f, s) => f / s},
      "^": {priority: 3, func: (f, s) => Math.pow(f, s)}
    }
  }

  _isPriorityHeigher(operation, operationInStack){
    return this.operations[operation].priority >= this.operations[operationInStack].priority
  }

  _appendOperation(operation, number){
    var lastIndex = this.stack.length - 1;
    var lastElement = this.stack[lastIndex];
    if(Number.isInteger(lastElement) || !this._isPriorityHeigher(operation, lastElement)){
      this.stack.push(number)
      this.stack.push(operation)
    } else {
      var tmpArray = [];
      while (!Number.isInteger(this.stack[lastIndex]) && this._isPriorityHeigher(operation, lastElement)) {
        tmpArray.push(this.stack.pop())
        lastIndex -= 1;
        lastElement = this.stack[lastIndex];
      }
      this.stack.push(number)
      this.stack.push(operation)
      this.stack = this.stack.concat(tmpArray.reverse());
    }
  }

  _calculate(){
    var calculationStack = [this.stack.shift()];
    while (this.stack.length > 0 || calculationStack.length > 1) {
      let value = calculationStack[calculationStack.length - 1];
      if (this.operations.hasOwnProperty(value)) {
        let operation = calculationStack.pop();
        let second = calculationStack.pop();
        let first = calculationStack.pop();
        calculationStack.push(this.operations[operation].func(first, second));
      }
      if (this.stack.length > 0) {
        calculationStack.push(this.stack.shift());
      }
    }
    return calculationStack.pop();
  }

  add(number) {
    this.stack.push(number)
    this.stack.push("+")
    return this;
  }

  subtract(number) {
    this.stack.push(number)
    this.stack.push("-")
    return this;
  }

  multiply(number) {
    this._appendOperation("*", number)
    return this;
  }

  devide(number) {
    this._appendOperation("/", number)
    return this;
  }

  pow(number) {
    this._appendOperation("^", number)
    return this;
  }

  toString() {
    return this._calculate();
  }
}

module.exports = SmartCalculator;
new SmartCalculator(2).multiply(2)
.pow(2)
.subtract(95)
.subtract(56)
.pow(2)
.pow(2)
.pow(1)
.multiply(1).toString()