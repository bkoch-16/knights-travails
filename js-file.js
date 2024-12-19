function knightMoves(start, end) {
  if (
    typeof start[0] === "number" &&
    typeof start[1] === "number" &&
    typeof end[0] === "number" &&
    typeof end[1] === "number"
  ) {
    if (start[0] === end[0] && start[1] === end[1]) {
      console.log("YES");
      return;
    }
    const moveOptions = [
      [-2, -1],
      [-2, 1],
      [-1, -2],
      [-1, 2],
      [1, -2],
      [1, 2],
      [2, -1],
      [2, 1],
    ];

    const traversalQueue = new Queue();
    traversalQueue.enqueue(start);
    const adjacencyList = {};
    while (traversalQueue.size() > 0) {
      const currentNode = traversalQueue.dequeue();

      for (let i = 0; i < moveOptions.length; i++) {
        const potentialMove = [
          currentNode[0] + moveOptions[i][0],
          currentNode[1] + moveOptions[i][1],
        ];
        if (
          potentialMove[0] >= 0 &&
          potentialMove[0] <= 7 &&
          potentialMove[1] >= 0 &&
          potentialMove[1] <= 7
        ) {
          traversalQueue.enqueue(potentialMove);
          if (adjacencyList[currentNode]) {
            let alreadyStored = false;
            for (let i = 0; i < adjacencyList[currentNode].length; i++) {
              if (
                adjacencyList[currentNode][i][0] === potentialMove[0] &&
                adjacencyList[currentNode][i][1] === potentialMove[1]
              ) {
                alreadyStored = true;
                break;
              }
            }
            if (alreadyStored === false) {
              adjacencyList[currentNode].push(potentialMove);
            }
          } else {
            adjacencyList[currentNode] = [potentialMove];
          }
          if (currentNode[0] === end[0] && currentNode[1] === end[1]) {
            console.log(adjacencyList);
            console.log("Output:");
            let activeNode = [...currentNode];
            let output = [activeNode];
            while (activeNode[0] !== start[0] && activeNode[1] !== start[1]) {
              activeNode = [...adjacencyList[activeNode][0]];
              output.unshift(activeNode);
            }
            console.log(output);
            //console.log(currentNode);
            //console.log(adjacencyList[currentNode][0]);
            //console.log(adjacencyList[adjacencyList[currentNode][0]][0]);
            return;
          }
        }
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
