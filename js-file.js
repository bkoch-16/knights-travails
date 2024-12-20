function knightMoves(start, end) {
  if (
    typeof start[0] === "number" &&
    typeof start[1] === "number" &&
    typeof end[0] === "number" &&
    typeof end[1] === "number"
  ) {
    if (start[0] === end[0] && start[1] === end[1]) {
      console.log(
        "You made it in 0 moves! Your start position is the same as your target position!"
      );
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
    const visitedTile = {};

    while (traversalQueue.size() > 0) {
      const currentNode = traversalQueue.dequeue();
      if (hasBeenVisited(currentNode, visitedTile)) {
        continue;
      }

      let previousLocation = findPreviousLocation(currentNode);

      if (!adjacencyList[currentNode]) {
        adjacencyList[currentNode] = [previousLocation];
      } else {
        adjacencyList[currentNode].push(potentialMove);
      }

      if (currentNode[0] === end[0] && currentNode[1] === end[1]) {
        const outputArray = createFinalPath(adjacencyList, start, end);
        console.log(
          `You made it in ${outputArray.length - 1} moves! Here is your path:`
        );
        for (let i = outputArray.length - 1; i >= 0; i--) {
          console.log(outputArray[i].toString());
        }
        return;
      }

      for (let i = 0; i < moveOptions.length; i++) {
        previousLocation = findPreviousLocation(currentNode);
        const potentialMove = [
          currentNode[0] + moveOptions[i][0],
          currentNode[1] + moveOptions[i][1],
          previousLocation,
        ];

        if (
          isInBounds(potentialMove) &&
          !hasBeenVisited(currentNode, visitedTile)
        ) {
          traversalQueue.enqueue(potentialMove);
        }
      }
      visitedTile[currentNode.slice(0, 2)] = true;
    }
  }
}

function createFinalPath(adjacencyList, start, end) {
  const finalPath = [end];
  let activeKey = [...end];
  while (
    !(
      adjacencyList[activeKey][0][0] === start[0] &&
      adjacencyList[activeKey][0][1] === start[1]
    )
  ) {
    activeKey = finalPath[finalPath.length - 1];
    finalPath.push(adjacencyList[activeKey][0]);
  }

  return finalPath;
}

function findPreviousLocation(currentNode) {
  let previousLocation;
  if (currentNode.length > 2) {
    previousLocation = currentNode.pop();
  } else {
    previousLocation = [...currentNode];
  }
  return previousLocation;
}
function hasBeenVisited(currentNode, visitedTile) {
  return visitedTile[currentNode.slice(0, 2)];
}

function isInBounds(position) {
  if (
    position[0] >= 0 &&
    position[0] <= 7 &&
    position[1] >= 0 &&
    position[1] <= 7
  ) {
    return true;
  } else return false;
}

function isAlreadyStored(adjacencyList, currentNode, potentialMove) {
  for (let i = 0; i < adjacencyList[currentNode].length; i++) {
    if (
      adjacencyList[currentNode][i][0] === potentialMove[0] &&
      adjacencyList[currentNode][i][1] === potentialMove[1]
    ) {
      return true;
    }
  }
  return false;
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
