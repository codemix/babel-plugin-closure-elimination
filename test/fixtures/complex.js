const input = [
  [
    [1, 2, 3, 4, 5],
    [1, 2, 3, 4, 5],
    [1, 2, 3, 4, 5],
    [1, 2, 3, 4, 5],
    [1, 2, 3, 4, 5]
  ],
  [
    [1, 2, 3, 4, 5],
    [1, 2, 3, 4, 5],
    [1, 2, 3, 4, 5],
    [1, 2, 3, 4, 5],
    [1, 2, 3, 4, 5]
  ],
  [
    [1, 2, 3, 4, 5],
    [1, 2, 3, 4, 5],
    [1, 2, 3, 4, 5],
    [1, 2, 3, 4, 5],
    [1, 2, 3, 4, 5]
  ]
];

function demo (input) {
  return input
    .map(col => col
      .map(row => row
        .map(cell => cell + 1)
        .filter(cell => cell % 2 === 1)
        .reduce((a, b) => a + b, 0)
      )
      .reduce((a, b) => a + b, 0)
    )
    .reduce((a, b) => a + b, 0);
}

function demoLodash (input) {
  return _.reduce(
    _.map(input, col =>
      _.reduce(
        _.map(col, row =>
          _.reduce(
            _.filter(
              _.map(row, cell => cell + 1),
              cell => cell % 2 === 1
            ),
            (a, b) => a + b,
            0
          )
        ),
        (a, b) => a + b,
        0
      )
    ),
    (a, b) => a + b,
    0
  );
}