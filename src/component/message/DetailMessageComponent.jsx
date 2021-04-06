import React, { useState, useEffect } from 'react';
import ApiService from 'api/ApiService';
import { useHistory } from 'react-router';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row',
  },
  style_box: {
    background: 'rgba(255, 255, 255, 0.438)',
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    padding: '50px',
    borderRadius: '5px',
    marginTop: '10px',
  },
  row_btn: {
    display: 'flex',
    marginTop: '20px',
    justifyContent: 'center',
    '& button': {
      padding: '15px 25px 15px 25px',
      borderRadius: '10px',
      border: '1px rgba(37, 34, 34, 0.575)',
      backgroundColor: 'rgba(37, 34, 34, 0.575)',
      color: '#fcc600',
    },
  },
}));
const DetailMessageComponent = ({ match }) => {
  const history = useHistory();
  const [sender, setSender] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    ApiService.detailMessage(match.params.uuid)
      .then((res) => {
        let message = res.data;
        setSender(message.sender);
        setTitle(message.title);
        setContent(message.content);
        setDate(message.date);
      })
      .catch((err) => {
        console.log('loadUser() Error!!', err);
      });
  });

  const goBack = () => {
    history.push(`/message`);
  };

  const classes = useStyles();

  return (
    <div>
      <div>
        <ArrowBackIcon onClick={goBack} />
      </div>
      <div className={[classes.root, classes.style_box].join(' ')}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <TextField
              label="Sender"
              type="text"
              name="sender"
              fullWidth
              margin="normal"
              value={sender}
              readOnly={true}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Date"
              type="text"
              name="date"
              fullWidth
              margin="normal"
              value={date}
              readOnly={true}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Title"
              type="text"
              name="title"
              fullWidth
              margin="normal"
              value={title}
              readOnly={true}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Content"
              multiline
              rows={15}
              type="text"
              name="content"
              fullWidth
              margin="normal"
              value={content}
              readOnly={true}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
export default DetailMessageComponent;
