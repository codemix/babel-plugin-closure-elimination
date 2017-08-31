function* symbolicateStackTrace(stack) {
  if (stack) {
    let foundInternalSource = 0;
    return stack.map(function(frame){
      return foundInternalSource++;
    });
  }
}

export default function demo() {
  return symbolicateStackTrace([1,2]).next().value;
}