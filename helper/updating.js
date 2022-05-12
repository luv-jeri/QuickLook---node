const data = [
  {
    name: 'John',
    age: 30,
  },
  {
    name: 'Jane',
    age: 25,
  },
  {
    name: 'Joe',
    age: 20,
  },
];
const _ = console.log;

const to_update = 'John'; //! user
const body = {
  name: 'Jennifer',
};

const index = data.findIndex((item) => item.name === to_update);

if (index == -1) {
  _('Not found');
}

_(index);

_(data[index]);

const { name, age } = body;

_(name, age);

const updatedObject = {
  name: name || data[index].name,
  age: age || data[index].age,
};

_(data[index]);

data[index] = updatedObject; //` actual update

_(data[index]);
