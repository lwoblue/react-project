// import React from 'react';

// import {
//   makeStyles,
//   InputLabel,
//   MenuItem,
//   FormControl,
//   Select,
//   ListSubheader,
//   CardMedia,
// } from '@material-ui/core';

// const useStyles = makeStyles((theme) => ({
//   zIndex: {},

//   formControl: {
//     margin: theme.spacing(1),
//     minWidth: 120,
//   },
//   selectEmpty: {
//     marginTop: theme.spacing(2),
//   },
//   media: {
//     height: 0,
//     paddingTop: '17.25%', // 16:9
//   },
// }));

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// };

// export default function BarColors() {
//   const classes = useStyles();
//   const [color, setColor] = React.useState('nivo');

//   const handleChange = (event) => {
//     setColor(event.target.value);
//   };

//   return (
//     <>
//       <FormControl className={classes.formControl}>
//         <InputLabel htmlFor="grouped-select">Color</InputLabel>
//         <Select
//           className={classes.selectEmpty}
//           labelId="demo-simple-select-helper-label"
//           id="demo-simple-select-helper"
//           value={color}
//           onChange={handleChange}
//           MenuProps={MenuProps}
//         >
//           <MenuItem value="">
//             <em>None</em>
//           </MenuItem>
//           <ListSubheader>CATEGORICAL COLORS</ListSubheader>
//           <MenuItem value={'nivo'}>
//             <CardMedia
//               className={classes.media}
//               image="images/nivo.png"
//               title="nivo"
//             />
//             nivo
//           </MenuItem>
//           <MenuItem value={'category10'}>
//             <CardMedia
//               className={classes.media}
//               image="images/category10.png"
//               title="category10"
//             />
//             category10
//           </MenuItem>
//           <MenuItem value={'accent'}>accent</MenuItem>
//           <MenuItem value={'dark2'}>dark2</MenuItem>
//           <MenuItem value={'paired'}>paired</MenuItem>
//           <MenuItem value={'pastel1'}>pastel1</MenuItem>
//           <MenuItem value={'pastel2'}>pastel2</MenuItem>
//           <MenuItem value={'set1'}>set1</MenuItem>
//           <MenuItem value={'set2'}>set2</MenuItem>
//           <MenuItem value={'set3'}>set3</MenuItem>
//           <ListSubheader>DIVERGING COLORS</ListSubheader>
//           <MenuItem value={'brown_blueGreen'}>brown_blueGreen</MenuItem>
//           <MenuItem value={'purpleRed_green'}>purpleRed_green</MenuItem>
//           <MenuItem value={'pink_yellowGreen'}>pink_yellowGreen</MenuItem>
//           <MenuItem value={'purple_orange'}>purple_orange</MenuItem>
//           <MenuItem value={'red_blue'}>red_blue</MenuItem>
//           <MenuItem value={'red_grey'}>red_grey</MenuItem>
//           <MenuItem value={'red_yellow_blue'}>red_yellow_blue</MenuItem>
//           <MenuItem value={'red_yellow_green'}>red_yellow_green</MenuItem>
//           <MenuItem value={'spectral'}>spectral</MenuItem>
//           <ListSubheader>SEQUENTIAL COLORS</ListSubheader>
//           <MenuItem value={'blues'}>blues</MenuItem>
//           <MenuItem value={'greens'}>greens</MenuItem>
//           <MenuItem value={'greys'}>greys</MenuItem>
//           <MenuItem value={'oranges'}>oranges</MenuItem>
//           <MenuItem value={'purples'}>purples</MenuItem>
//           <MenuItem value={'reds'}>reds</MenuItem>
//           <MenuItem value={'blue_green'}>blue_green</MenuItem>
//           <MenuItem value={'blue_purple'}>blue_purple</MenuItem>
//           <MenuItem value={'green_blue'}>green_blue</MenuItem>
//           <MenuItem value={'orange_red'}>orange_red</MenuItem>
//           <MenuItem value={'purple_blue_green'}>purple_blue_green</MenuItem>
//           <MenuItem value={'purple_blue'}>purple_blue</MenuItem>
//           <MenuItem value={'purple_red'}>purple_red</MenuItem>
//           <MenuItem value={'red_purple'}>red_purple</MenuItem>
//           <MenuItem value={'yellow_green_blue'}>yellow_green_blue</MenuItem>
//           <MenuItem value={'yellow_green'}>yellow_green</MenuItem>
//           <MenuItem value={'yellow_orange_brown'}>yellow_orange_brown</MenuItem>
//           <MenuItem value={'yellow_orange_red'}>yellow_orange_red</MenuItem>
//         </Select>
//       </FormControl>
//     </>
//   );
// }

import { React, useState } from 'react';
import {
  makeStyles,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  ListSubheader,
  CardMedia,
} from '@material-ui/core';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150,
  },
  media: {
    height: 0,
    paddingTop: '10.25%',
  },
}));

export default function BarColors(props) {
  const classes = useStyles();
  const [value, setValue] = useState('nivo');

  const handleChange = (event) => {
    if (event.target.value !== '') {
      setValue(event.target.value);
      props.getColors(event.target.value);
    }
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="grouped-select">Color</InputLabel>
        <Select
          defaultValue="nivo"
          id="grouped-select"
          MenuProps={MenuProps}
          value={value}
          onChange={handleChange}
        >
          <ListSubheader value="" disableSticky={true}>
            CATEGORICAL COLORS
          </ListSubheader>
          <MenuItem value={'nivo'}>
            <CardMedia
              className={classes.media}
              image="images/nivo.png"
              title="category10"
            />
            nivo
          </MenuItem>
          <MenuItem value={'category10'}>
            <CardMedia
              className={classes.media}
              image="images/category10.png"
              title="category10"
            />
            category10
          </MenuItem>
          <MenuItem value={'accent'}>
            <CardMedia
              className={classes.media}
              image="images/accent.png"
              title="accent"
            />
            accent
          </MenuItem>
          <MenuItem value={'dark2'}>
            <CardMedia
              className={classes.media}
              image="images/dark2.png"
              title="dark2"
            />
            dark2
          </MenuItem>
          <MenuItem value={'paired'}>
            <CardMedia
              className={classes.media}
              image="images/paired.png"
              title="paired"
            />
            paired
          </MenuItem>
          <MenuItem value={'pastel1'}>
            <CardMedia
              className={classes.media}
              image="images/pastel1.png"
              title="pastel1"
            />
            pastel1
          </MenuItem>
          <MenuItem value={'pastel2'}>
            <CardMedia
              className={classes.media}
              image="images/pastel2.png"
              title="pastel2"
            />
            pastel2
          </MenuItem>
          <MenuItem value={'set1'}>
            <CardMedia
              className={classes.media}
              image="images/set1.png"
              title="set1"
            />
            set1
          </MenuItem>
          <MenuItem value={'set2'}>
            <CardMedia
              className={classes.media}
              image="images/set2.png"
              title="set2"
            />
            set2
          </MenuItem>
          <ListSubheader value="" disableSticky={true}>
            DIVERGING COLORS
          </ListSubheader>
          <MenuItem value={'brown_blueGreen'}>brown_blueGreen</MenuItem>
          <MenuItem value={'purpleRed_green'}>purpleRed_green</MenuItem>
          <MenuItem value={'pink_yellowGreen'}>pink_yellowGreen</MenuItem>
          <MenuItem value={'purple_orange'}>purple_orange</MenuItem>
          <MenuItem value={'red_blue'}>red_blue</MenuItem>{' '}
          <MenuItem value={'red_grey'}>red_grey</MenuItem>
          <MenuItem value={'red_yellow_blue'}>red_yellow_blue</MenuItem>
          <MenuItem value={'red_yellow_green'}>red_yellow_green</MenuItem>
          <MenuItem value={'spectral'}>spectral</MenuItem>
          <ListSubheader value="" disableSticky={true}>
            SEQUENTIAL COLORS
          </ListSubheader>
          <MenuItem value={'blues'}>blues</MenuItem>
          <MenuItem value={'greens'}>greens</MenuItem>
          <MenuItem value={'greys'}>greys</MenuItem>
          <MenuItem value={'oranges'}>oranges</MenuItem>
          <MenuItem value={'purples'}>purples</MenuItem>
          <MenuItem value={'reds'}>reds</MenuItem>
          <MenuItem value={'blue_green'}>blue_green</MenuItem>
          <MenuItem value={'blue_purple'}>blue_purple</MenuItem>
          <MenuItem value={'green_blue'}>green_blue</MenuItem>
          <MenuItem value={'orange_red'}>orange_red</MenuItem>
          <MenuItem value={'purple_blue_green'}>purple_blue_green</MenuItem>
          <MenuItem value={'purple_blue'}>purple_blue</MenuItem>
          <MenuItem value={'purple_red'}>purple_red</MenuItem>
          <MenuItem value={'red_purple'}>red_purple</MenuItem>
          <MenuItem value={'yellow_green_blue'}>yellow_green_blue</MenuItem>
          <MenuItem value={'yellow_green'}>yellow_green</MenuItem>
          <MenuItem value={'yellow_orange_brown'}>yellow_orange_brown</MenuItem>
          <MenuItem value={'yellow_orange_red'}>yellow_orange_red</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
