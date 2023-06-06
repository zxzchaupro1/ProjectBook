const function1 = (callback) => {
  console.log('Function 1 executed');
  callback();
};

const function2 = () => {
  console.log('Function 2 executed');
};
const handlePress = () => {
  function1(() => {
    function2();
  });
};
handlePress();