function knightMoves(start, end) {
  if (
    typeof start[0] === "number" &&
    typeof start[1] === "number" &&
    typeof end[0] === "number" &&
    typeof end[1] === "number"
  ) {
    if (start[0] === end[0] && start[1] === end[1]) {
      console.log("YES");
      return 1;
    }
    const moveSum = [
      [-2, -1],
      [-2, 1],
      [-1, -2],
      [-1, 2],
      [1, -2],
      [1, 2],
      [2, -1],
      [2, 1],
    ];

    const queue = new Queue();
    queue.enqueue(start);

    while (queue.size() > 0) {
      for (let i = 0; i < moveSum.length; i++) {
        const potentialMove = [
          queue.front()[0] + moveSum[i][0],
          queue.front(1) + moveSum[i][1],
        ];
        if (potentialMove[0] >= 0 && potentialMove[1] >= 0) {
          queue.enqueue(potentialMove);
        }
      }

      if (
        queue.front()[0] + moveSum[0][0] >= 0 &&
        queue.front(1) + moveSum[0][1] >= 0
      ) {
      }
    }
  }
}

class Queue {
  constructor() {
    this.items = [];
  }

  enqueue(element) {
    this.items.push(element);
  }

  dequeue() {
    if (this.isEmpty()) {
      return "Empty";
    }

    return this.items.shift();
  }

  front() {
    if (this.isEmpty()) {
      return "No elements in queue";
    }
    return this.items[0];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }

  printQueue() {
    var string = "";
    for (let i = 0; i < this.items.length; i++) {
      string += this.items[i] + " ";
    }
    return string;
  }
}
