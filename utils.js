exports.mapToObj = function(strMap) {
  let obj = Object.create(null);
  for (let [k, v] of strMap) {
    obj[k] = v;
  }
  return obj;
};

exports.isPalindrome = function(str) {
  let stripped = str
    .replace(/[\s"'.,-\/#!$%\^&*;:{}=\-_`~()\\\[\]@+|?><]/g, "")
    .toLowerCase();

  return {
    originalStr: str,
    stripped: stripped,
    palindrome: stripped === stripped.split("").reverse().join("")
      ? true
      : false,
    timestamp: Date.now()
  };
};

/**
   * This operates like a very simple and inefficient LRU cache.
   * If cache is not full then add it, otherwise remove the oldest entry.
   */
exports.storePalindrome = function(store, palindromeObj) {
  let newStore = new Map(store);

  if (newStore.size < 10) {
    newStore.set(palindromeObj.stripped, palindromeObj);
  } else {
    let elementsInStore = Array.from(newStore.values());
    elementsInStore.sort(function(element1, element2) {
      return element1 - element2;
    });
    newStore.delete(elementsInStore[0].stripped);
    newStore.set(palindromeObj.stripped, palindromeObj);
  }
  return newStore;
};

exports.getLatestPalindromes = function(store) {
  let obj = Object.create(null);
  let now = Date.now();
  for (let [k, v] of store) {
    let timeDiff = v.timestamp - now;
    let elapsedMinutes = (timeDiff / (1000 * 60)).toFixed(0);
    if (elapsedMinutes < 10) {
      obj[k] = v;
    }
  }
  return obj;
};
