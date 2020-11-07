const typeMap = {
  m: 'margin',
  p: 'padding',
};

const directionMap = {
  t: 'Top',
  b: 'Bottom',
  l: 'Left',
  r: 'Right',
};

export default theme => {
  let classes = {};

  // margin, padding
  const types = ['m', 'p'];

  // top, bottom, left, right, x, y, all
  const directions = ['t', 'b', 'l', 'r', 'x', 'y', 'a'];
  const sizes = [...new Array(20).fill().map((_, i) => -i / 2), ...new Array(20).fill().map((_, i) => i / 2)];

  types.forEach(type => {
    directions.forEach(dir => {
      sizes.forEach(size => {
        let styles;
        switch (dir) {
          case 'x': {
            const typeName = typeMap[type];
            styles = {
              [`${typeName}Left`]: theme.spacing(size),
              [`${typeName}Right`]: theme.spacing(size),
            };
            break;
          }
          case 'y': {
            const typeName = typeMap[type];
            styles = {
              [`${typeName}Top`]: theme.spacing(size),
              [`${typeName}Bottom`]: theme.spacing(size),
            };
            break;
          }
          case 'a': {
            const typeName = typeMap[type];
            styles = {
              [`${typeName}Top`]: theme.spacing(size),
              [`${typeName}Bottom`]: theme.spacing(size),
              [`${typeName}Left`]: theme.spacing(size),
              [`${typeName}Right`]: theme.spacing(size),
            };
            break;
          }
          default: {
            const attrName = `${typeMap[type]}${directionMap[dir]}`;
            styles = {
              [attrName]: theme.spacing(size),
            };
            break;
          }
        }

        // n : negative sign, for example mt-n3 is margin-top: -24px
        // _ : decimal point, for example mt-1_5 is margin-top: 12px
        const className = `.${type}${dir}-${size.toString().replace('-', 'n').replace('.', '_')}`;
        classes[className] = styles;
      });
    });
  });
  return classes;
};
