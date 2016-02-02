function asyncF() {
  return async function() {
    await 1;
  };
}

export default function demo() {
  return asyncF()() instanceof Promise;
}