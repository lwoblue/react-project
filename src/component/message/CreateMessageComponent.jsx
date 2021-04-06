import React, { useState } from 'react';
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
const CreateMessageComponent = () => {
  const sender = window.localStorage.getItem('userID');
  const [recipient, setRecipient] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const history = useHistory();

  const classes = useStyles();

  const onChangeRecipient = (e) => {
    setRecipient(e.target.value);
  };

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const onChangeContent = (e) => {
    setContent(e.target.value);
  };

  const goBack = () => {
    history.push(`/message`);
  };

  const handleClickSendMessage = (e) => {
    e.preventDefault();

    let message = {
      sender: sender,
      recipient: recipient,
      title: title,
      content: content,
    };

    ApiService.sendMessage(message)
      .then((res) => {
        history.push('/message');
      })
      .catch((err) => {
        console.log('sendMessage() Error!!', err);
      });
  };

  return (
    <div>
      <div>
        <ArrowBackIcon onClick={goBack} />
      </div>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="Recipient"
              type="text"
              name="recipient"
              fullWidth
              margin="normal"
              onChange={onChangeRecipient}
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
              onChange={onChangeTitle}
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
              onChange={onChangeContent}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
        </Grid>
      </div>
      <div className={classes.row_btn}>
        <button variant="contained" onClick={handleClickSendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};
export default CreateMessageComponent;
