const blessed = require('blessed')
let screen = blessed.screen({
  smartCSR: true
});

screen.title = 'test window'

let list = blessed.list({
  top: 'center',
  left: 'center',
  width: '50%',
  height: '50%',
  tags: true,
  border: {
    type: 'line'
  },
  style: {
    fg: 'white',
    bg: 'magenta',
    border: {
      fg: 'green'
    }
  },
  vi: true,
  keys: true,
  mouse: true,
  search: (cb) => {
    prompt.input("Search:",'',(err,value)=>{
      if (err) return;
      return cb(null, value);
    });
  },

  items: [
    'test 1',
    'test 2',
    'test 3'
  ],
  interactive: true
});

let add = blessed.button({
  top: '100',
  width: '100',
  height: '100',
  border: {
    type: 'line'
  },
  style: {
    fg: 'white',
    bg: 'magenta',
    border: {
      fg: 'green'
    }
  },
  keys: true,
  mouse: true,
  content: 'Add Password'
});

let prompt = blessed.prompt({
  parent: screen,
  top: 'center',
  left: 'center',
  height: 'shrink',
  width: 'shrink',
  keys: true,
  vi: true,
  mouse: true,
  tags: true,
  border: 'line',
  hidden: true
});

add.on('click', (data) => {
  list.add('test')
  screen.render();
});

screen.append(list);
screen.append(add);
screen.append(prompt);
list.focus();
screen.key(['escape','q','C-c'], function(ch, key) {
  return process.exit(0);
});
screen.render();
setTimeout(() => screen.render())
